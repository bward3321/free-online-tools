// Icon data types
export interface PixelIcon {
  name: string;
  category: string;
  tags: string[];
  palette: string[];
  data: string; // 32 chars per row, rows separated by newlines. '.' = transparent, '0'-'9','a'-'v' = palette index
}

// Parse icon data string to pixel grid
import type { RGBA } from "../drawing";

const INDEX_CHARS = "0123456789abcdefghijklmnov";

export function parseIconData(icon: PixelIcon): (RGBA | null)[][] {
  const rows = icon.data.trim().split("\n").map(r => r.trim());
  const grid: (RGBA | null)[][] = [];
  for (const row of rows) {
    const pixels: (RGBA | null)[] = [];
    for (const ch of row) {
      if (ch === ".") {
        pixels.push(null);
      } else {
        const idx = INDEX_CHARS.indexOf(ch);
        if (idx >= 0 && idx < icon.palette.length) {
          const hex = icon.palette[idx];
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          pixels.push({ r, g, b, a: 255 });
        } else {
          pixels.push(null);
        }
      }
    }
    // Pad to 32 if needed
    while (pixels.length < 32) pixels.push(null);
    grid.push(pixels);
  }
  // Pad rows to 32 if needed
  while (grid.length < 32) grid.push(Array(32).fill(null));
  return grid;
}
