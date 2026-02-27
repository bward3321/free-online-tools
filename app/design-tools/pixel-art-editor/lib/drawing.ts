// ---------- DRAWING ALGORITHMS ----------

export type RGBA = { r: number; g: number; b: number; a: number } | null;
export type PixelGrid = (RGBA)[][];

export function createGrid(w: number, h: number): PixelGrid {
  return Array.from({ length: h }, () => Array.from({ length: w }, () => null));
}

export function cloneGrid(grid: PixelGrid): PixelGrid {
  return grid.map(row => row.map(p => (p ? { ...p } : null)));
}

export function colorsEqual(a: RGBA, b: RGBA): boolean {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}

export function hexToRGBA(hex: string, alpha = 255): RGBA {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
    a: alpha,
  };
}

export function rgbaToHex(c: RGBA): string {
  if (!c) return "transparent";
  return `#${c.r.toString(16).padStart(2, "0")}${c.g.toString(16).padStart(2, "0")}${c.b.toString(16).padStart(2, "0")}`.toUpperCase();
}

// Bresenham's line algorithm
export function bresenhamLine(x0: number, y0: number, x1: number, y1: number): [number, number][] {
  const points: [number, number][] = [];
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    points.push([x0, y0]);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
  return points;
}

// Midpoint circle algorithm
export function midpointCircle(cx: number, cy: number, rx: number, ry: number, filled: boolean): [number, number][] {
  const points: [number, number][] = [];
  if (rx === ry) {
    // Perfect circle
    let x = rx, y = 0, d = 1 - rx;
    const addSymmetric = (px: number, py: number) => {
      if (filled) {
        for (let i = cx - px; i <= cx + px; i++) {
          points.push([i, cy + py]);
          points.push([i, cy - py]);
        }
        for (let i = cx - py; i <= cx + py; i++) {
          points.push([i, cy + x]);
          points.push([i, cy - x]);
        }
      } else {
        points.push([cx + px, cy + py], [cx - px, cy + py]);
        points.push([cx + px, cy - py], [cx - px, cy - py]);
        points.push([cx + py, cy + px], [cx - py, cy + px]);
        points.push([cx + py, cy - px], [cx - py, cy - px]);
      }
    };
    while (x >= y) {
      addSymmetric(x, y);
      y++;
      if (d <= 0) {
        d += 2 * y + 1;
      } else {
        x--;
        d += 2 * (y - x) + 1;
      }
    }
  } else {
    // Ellipse - parametric approach
    const steps = Math.max(rx, ry) * 8;
    if (filled) {
      for (let py = cy - ry; py <= cy + ry; py++) {
        for (let px = cx - rx; px <= cx + rx; px++) {
          const dx = (px - cx) / rx;
          const dy = (py - cy) / ry;
          if (dx * dx + dy * dy <= 1) points.push([px, py]);
        }
      }
    } else {
      for (let i = 0; i < steps; i++) {
        const angle = (2 * Math.PI * i) / steps;
        const px = Math.round(cx + rx * Math.cos(angle));
        const py = Math.round(cy + ry * Math.sin(angle));
        points.push([px, py]);
      }
    }
  }
  // Deduplicate
  const seen = new Set<string>();
  return points.filter(([x, y]) => {
    const k = `${x},${y}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

// Rectangle points
export function rectanglePoints(x0: number, y0: number, x1: number, y1: number, filled: boolean): [number, number][] {
  const minX = Math.min(x0, x1), maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1), maxY = Math.max(y0, y1);
  const points: [number, number][] = [];
  if (filled) {
    for (let y = minY; y <= maxY; y++)
      for (let x = minX; x <= maxX; x++)
        points.push([x, y]);
  } else {
    for (let x = minX; x <= maxX; x++) { points.push([x, minY]); points.push([x, maxY]); }
    for (let y = minY + 1; y < maxY; y++) { points.push([minX, y]); points.push([maxX, y]); }
  }
  return points;
}

// Flood fill (4-connected)
export function floodFill(grid: PixelGrid, sx: number, sy: number, fillColor: RGBA): PixelGrid {
  const h = grid.length, w = grid[0].length;
  if (sx < 0 || sx >= w || sy < 0 || sy >= h) return grid;
  const target = grid[sy][sx];
  if (colorsEqual(target, fillColor)) return grid;
  const result = cloneGrid(grid);
  const stack: [number, number][] = [[sx, sy]];
  const visited = new Set<string>();
  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    const key = `${x},${y}`;
    if (visited.has(key)) continue;
    if (x < 0 || x >= w || y < 0 || y >= h) continue;
    if (!colorsEqual(result[y][x], target)) continue;
    visited.add(key);
    result[y][x] = fillColor ? { ...fillColor } : null;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
  return result;
}

// Apply brush (with size)
export function getBrushPoints(cx: number, cy: number, size: number): [number, number][] {
  if (size <= 1) return [[cx, cy]];
  const points: [number, number][] = [];
  const r = Math.floor(size / 2);
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      points.push([cx + dx, cy + dy]);
    }
  }
  return points;
}

// Apply mirror
export function getMirrorPoints(
  x: number, y: number, w: number, h: number,
  mode: "off" | "horizontal" | "vertical" | "quad"
): [number, number][] {
  const points: [number, number][] = [[x, y]];
  if (mode === "horizontal" || mode === "quad") {
    points.push([w - 1 - x, y]);
  }
  if (mode === "vertical" || mode === "quad") {
    points.push([x, h - 1 - y]);
  }
  if (mode === "quad") {
    points.push([w - 1 - x, h - 1 - y]);
  }
  return points;
}

// Dithering pattern check
export function shouldDither(x: number, y: number, pattern: "none" | "50" | "25"): boolean {
  if (pattern === "none") return true;
  if (pattern === "50") return (x + y) % 2 === 0;
  if (pattern === "25") return x % 2 === 0 && y % 2 === 0;
  return true;
}

// Render grid to ImageData (for canvas rendering)
export function gridToImageData(grid: PixelGrid, scale: number): ImageData {
  const h = grid.length, w = grid[0].length;
  const imgData = new ImageData(w * scale, h * scale);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = grid[y][x];
      if (!p) continue;
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          const idx = ((y * scale + sy) * w * scale + (x * scale + sx)) * 4;
          imgData.data[idx] = p.r;
          imgData.data[idx + 1] = p.g;
          imgData.data[idx + 2] = p.b;
          imgData.data[idx + 3] = p.a;
        }
      }
    }
  }
  return imgData;
}

// Render grid to a canvas (nearest-neighbor scaled)
export function renderGridToCanvas(grid: PixelGrid, targetW: number, targetH: number): HTMLCanvasElement {
  const h = grid.length, w = grid[0].length;
  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  // Draw at 1:1 first
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = w;
  tmpCanvas.height = h;
  const tmpCtx = tmpCanvas.getContext("2d")!;
  const imgData = tmpCtx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = grid[y][x];
      const idx = (y * w + x) * 4;
      if (p) {
        imgData.data[idx] = p.r;
        imgData.data[idx + 1] = p.g;
        imgData.data[idx + 2] = p.b;
        imgData.data[idx + 3] = p.a;
      } else {
        imgData.data[idx + 3] = 0;
      }
    }
  }
  tmpCtx.putImageData(imgData, 0, 0);
  ctx.drawImage(tmpCanvas, 0, 0, targetW, targetH);
  return canvas;
}
