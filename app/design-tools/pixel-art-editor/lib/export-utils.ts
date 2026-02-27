// ---------- EXPORT UTILITIES ----------
import type { PixelGrid } from "./drawing";
import { renderGridToCanvas } from "./drawing";

// Generate PNG blob at a given scale
export async function exportPNG(grid: PixelGrid, scale: number, bgColor?: string): Promise<Blob> {
  const h = grid.length, w = grid[0].length;
  const canvas = document.createElement("canvas");
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;

  if (bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = grid[y][x];
      if (!p) continue;
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }

  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b!), "image/png");
  });
}

// Generate SVG string from pixel grid
export function exportSVG(grid: PixelGrid): string {
  const h = grid.length, w = grid[0].length;
  const rects: string[] = [];

  // Optimize: merge adjacent same-color horizontal pixels
  for (let y = 0; y < h; y++) {
    let x = 0;
    while (x < w) {
      const p = grid[y][x];
      if (!p) { x++; continue; }
      const color = `#${p.r.toString(16).padStart(2, "0")}${p.g.toString(16).padStart(2, "0")}${p.b.toString(16).padStart(2, "0")}`;
      let runLen = 1;
      while (x + runLen < w) {
        const np = grid[y][x + runLen];
        if (!np || np.r !== p.r || np.g !== p.g || np.b !== p.b || np.a !== p.a) break;
        runLen++;
      }
      const opacity = p.a < 255 ? ` opacity="${(p.a / 255).toFixed(2)}"` : "";
      rects.push(`<rect x="${x}" y="${y}" width="${runLen}" height="1" fill="${color}"${opacity}/>`);
      x += runLen;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" shape-rendering="crispEdges">\n${rects.join("\n")}\n</svg>`;
}

// Generate ICO file (contains multiple PNG sizes)
export async function exportICO(grid: PixelGrid, sizes: number[] = [16, 32, 48]): Promise<Blob> {
  const pngs: Uint8Array[] = [];

  for (const size of sizes) {
    const canvas = renderGridToCanvas(grid, size, size);
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/png");
    });
    const buffer = await blob.arrayBuffer();
    pngs.push(new Uint8Array(buffer));
  }

  // Build ICO binary format
  const headerSize = 6;
  const entrySize = 16;
  const entriesSize = entrySize * sizes.length;
  let dataOffset = headerSize + entriesSize;

  const totalSize = dataOffset + pngs.reduce((sum, p) => sum + p.length, 0);
  const ico = new Uint8Array(totalSize);
  const view = new DataView(ico.buffer);

  // ICONDIR header
  view.setUint16(0, 0, true);     // reserved
  view.setUint16(2, 1, true);     // type: 1 = icon
  view.setUint16(4, sizes.length, true); // count

  // ICONDIRENTRY for each size
  for (let i = 0; i < sizes.length; i++) {
    const offset = headerSize + i * entrySize;
    const s = sizes[i] >= 256 ? 0 : sizes[i];
    ico[offset] = s;        // width (0 = 256)
    ico[offset + 1] = s;    // height
    ico[offset + 2] = 0;    // color count
    ico[offset + 3] = 0;    // reserved
    view.setUint16(offset + 4, 1, true);  // planes
    view.setUint16(offset + 6, 32, true); // bit count
    view.setUint32(offset + 8, pngs[i].length, true); // size
    view.setUint32(offset + 12, dataOffset, true);     // offset
    dataOffset += pngs[i].length;
  }

  // PNG data
  let pos = headerSize + entriesSize;
  for (const png of pngs) {
    ico.set(png, pos);
    pos += png.length;
  }

  return new Blob([ico], { type: "image/x-icon" });
}

// Generate Base64 data URI
export async function exportBase64(grid: PixelGrid, scale = 1): Promise<string> {
  const blob = await exportPNG(grid, scale);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

// Generate CSS box-shadow pixel art
export function exportCSSBoxShadow(grid: PixelGrid, pixelSize = 1): string {
  const shadows: string[] = [];
  const h = grid.length, w = grid[0].length;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = grid[y][x];
      if (!p) continue;
      const color = `rgba(${p.r},${p.g},${p.b},${(p.a / 255).toFixed(2)})`;
      shadows.push(`${(x + 1) * pixelSize}px ${(y + 1) * pixelSize}px 0 ${color}`);
    }
  }
  return `.pixel-art {\n  width: ${pixelSize}px;\n  height: ${pixelSize}px;\n  box-shadow:\n    ${shadows.join(",\n    ")};\n}`;
}

// Generate complete favicon package as ZIP
export async function exportFaviconPackage(grid: PixelGrid, siteName = "My Website"): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  // Generate all sizes
  const ico = await exportICO(grid, [16, 32, 48]);
  const png16 = await exportPNG(grid, Math.ceil(16 / grid[0].length) || 1);
  const png32 = await exportPNG(grid, Math.ceil(32 / grid[0].length) || 1);
  const png48 = await exportPNG(grid, Math.ceil(48 / grid[0].length) || 1);

  // For sizes that need upscaling
  const canvas180 = renderGridToCanvas(grid, 180, 180);
  const apple = await new Promise<Blob>(r => canvas180.toBlob(b => r(b!), "image/png"));
  const canvas192 = renderGridToCanvas(grid, 192, 192);
  const android192 = await new Promise<Blob>(r => canvas192.toBlob(b => r(b!), "image/png"));
  const canvas512 = renderGridToCanvas(grid, 512, 512);
  const android512 = await new Promise<Blob>(r => canvas512.toBlob(b => r(b!), "image/png"));
  const canvas150 = renderGridToCanvas(grid, 150, 150);
  const mstile = await new Promise<Blob>(r => canvas150.toBlob(b => r(b!), "image/png"));

  zip.file("favicon.ico", ico);
  zip.file("favicon-16x16.png", png16);
  zip.file("favicon-32x32.png", png32);
  zip.file("favicon-48x48.png", png48);
  zip.file("apple-touch-icon.png", apple);
  zip.file("android-chrome-192x192.png", android192);
  zip.file("android-chrome-512x512.png", android512);
  zip.file("mstile-150x150.png", mstile);

  const svg = exportSVG(grid);
  zip.file("safari-pinned-tab.svg", svg);

  // Web manifest
  const manifest = {
    name: siteName,
    short_name: siteName,
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
  zip.file("site.webmanifest", JSON.stringify(manifest, null, 2));

  // Browser config
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#da532c</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  zip.file("browserconfig.xml", browserConfig);

  // README with HTML snippet
  const readme = `FAVICON PACKAGE
Generated by EveryFreeTool.com Favicon Generator

INSTALLATION
============
1. Upload all files to the root of your website.
2. Add the following code to the <head> section of your HTML:

<!-- Paste this into your <head> tag -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">

FILES INCLUDED
==============
favicon.ico             - Multi-resolution ICO (16x16, 32x32, 48x48)
favicon-16x16.png       - Browser tab favicon
favicon-32x32.png       - Standard favicon
favicon-48x48.png       - High-DPI favicon
apple-touch-icon.png    - Apple Touch Icon (180x180)
android-chrome-192x192.png - Android Chrome icon
android-chrome-512x512.png - PWA / App Store icon
mstile-150x150.png      - Windows tile
safari-pinned-tab.svg   - Safari pinned tab
site.webmanifest        - Web app manifest
browserconfig.xml       - Microsoft browser config
`;
  zip.file("README.txt", readme);

  return zip.generateAsync({ type: "blob" });
}

// Generate HTML snippet for favicon installation
export function getFaviconHTML(): string {
  return `<!-- Favicon Package - Generated by EveryFreeTool.com -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">`;
}
