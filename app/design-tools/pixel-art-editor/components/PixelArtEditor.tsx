"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import type { RGBA, PixelGrid } from "../lib/drawing";
import {
  createGrid, cloneGrid, hexToRGBA, rgbaToHex, colorsEqual,
  bresenhamLine, midpointCircle, rectanglePoints, floodFill,
  getBrushPoints, getMirrorPoints, shouldDither, renderGridToCanvas,
} from "../lib/drawing";
import { PALETTES, DEFAULT_FOREGROUND, DEFAULT_BACKGROUND } from "../lib/palettes";
import { exportPNG, exportSVG, exportICO, exportBase64, exportCSSBoxShadow, exportFaviconPackage, getFaviconHTML } from "../lib/export-utils";
import { ALL_ICONS, ICON_CATEGORIES, parseIconData } from "../lib/icons";
import type { PixelIcon } from "../lib/icons";

// ========== TYPES ==========
type ToolType = "pencil" | "eraser" | "fill" | "eyedropper" | "line" | "rect" | "circle" | "select" | "move";
type MirrorMode = "off" | "horizontal" | "vertical" | "quad";
type DitherPattern = "none" | "50" | "25";
type CanvasSize = { w: number; h: number; label: string };

interface HistoryEntry {
  grid: PixelGrid;
}

interface Selection {
  x: number; y: number; w: number; h: number;
}

interface EditorProps {
  defaultCanvasSize?: number;
  defaultTab?: "favicon" | "art" | "icon";
  title: string;
  subtitle: string;
  faviconMode?: boolean;
}

// ========== CONSTANTS ==========
const CANVAS_SIZES: CanvasSize[] = [
  { w: 16, h: 16, label: "16 x 16" },
  { w: 32, h: 32, label: "32 x 32" },
  { w: 48, h: 48, label: "48 x 48" },
  { w: 64, h: 64, label: "64 x 64" },
  { w: 128, h: 128, label: "128 x 128" },
];

const TOOL_CONFIG: { id: ToolType; label: string; icon: string; shortcut: string }[] = [
  { id: "pencil", label: "Pencil", icon: "M3 21l1.65-3.8a2 2 0 01.44-.59L17 4.7a2.12 2.12 0 013 3L8.4 19.5a2 2 0 01-.6.45L4 21.6z", shortcut: "B" },
  { id: "eraser", label: "Eraser", icon: "M20 20H7L3 16c-.8-.8-.8-2 0-2.8L13.2 3a2 2 0 012.8 0L21 8a2 2 0 010 2.8L11.8 20", shortcut: "E" },
  { id: "fill", label: "Fill", icon: "M2.5 21.5l5-5M12 2l6.4 6.4a2 2 0 010 2.8L10 19.6a2 2 0 01-2.8 0L2 14.4a2 2 0 010-2.8L9.6 4", shortcut: "G" },
  { id: "eyedropper", label: "Eyedropper", icon: "M2 22l1-1h3l9-9M17.5 2.5l4 4M21 3l-9.5 9.5", shortcut: "I" },
  { id: "line", label: "Line", icon: "M4 20L20 4", shortcut: "L" },
  { id: "rect", label: "Rectangle", icon: "M3 3h18v18H3z", shortcut: "R" },
  { id: "circle", label: "Circle", icon: "M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z", shortcut: "C" },
  { id: "select", label: "Select", icon: "M5 3h14v14H5zM9 3v14M5 9h14", shortcut: "M" },
];

const ACCENT = "#7C3AED";

// ========== SUB-COMPONENTS ==========

function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button onClick={toggle} className="p-2 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}>
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text)" }}><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text)" }}><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>
      )}
    </button>
  );
}

function PrivacyBadge() {
  return (
    <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--surface)" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      100% client-side
    </div>
  );
}

// ========== ICON PREVIEW RENDERER ==========
function IconPreview({ icon, size = 48 }: { icon: PixelIcon; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, size, size);
    const grid = parseIconData(icon);
    const h = grid.length, w = grid[0].length;
    const sx = size / w, sy = size / h;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const p = grid[y][x];
        if (!p) continue;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
        ctx.fillRect(x * sx, y * sy, Math.ceil(sx), Math.ceil(sy));
      }
    }
  }, [icon, size]);
  return <canvas ref={canvasRef} width={size} height={size} style={{ imageRendering: "pixelated" }} />;
}

// ========== MAIN COMPONENT ==========
export default function PixelArtEditor({ defaultCanvasSize = 32, title, subtitle, faviconMode = false }: EditorProps) {
  // ----- Canvas state -----
  const [canvasW, setCanvasW] = useState(defaultCanvasSize);
  const [canvasH, setCanvasH] = useState(defaultCanvasSize);
  const [grid, setGrid] = useState<PixelGrid>(() => createGrid(defaultCanvasSize, defaultCanvasSize));

  // ----- Tool state -----
  const [activeTool, setActiveTool] = useState<ToolType>("pencil");
  const [brushSize, setBrushSize] = useState(1);
  const [shapeFilled, setShapeFilled] = useState(false);
  const [mirrorMode, setMirrorMode] = useState<MirrorMode>("off");
  const [ditherPattern, setDitherPattern] = useState<DitherPattern>("none");

  // ----- Color state -----
  const [fgColor, setFgColor] = useState(DEFAULT_FOREGROUND);
  const [bgColor, setBgColor] = useState(DEFAULT_BACKGROUND);
  const [activePalette, setActivePalette] = useState(0);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editingColor, setEditingColor] = useState<"fg" | "bg">("fg");
  const [customHex, setCustomHex] = useState(DEFAULT_FOREGROUND);

  // ----- Canvas display -----
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [hoverPixel, setHoverPixel] = useState<{ x: number; y: number } | null>(null);

  // ----- Drawing state -----
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [tempGrid, setTempGrid] = useState<PixelGrid | null>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // ----- History -----
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // ----- Selection -----
  const [selection, setSelection] = useState<Selection | null>(null);

  // ----- Export -----
  const [exporting, setExporting] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [copiedHTML, setCopiedHTML] = useState(false);
  const [siteName, setSiteName] = useState("My Website");

  // ----- Preview -----
  const [previewBgDark, setPreviewBgDark] = useState(false);

  // ----- Icon Library -----
  const [iconSearch, setIconSearch] = useState("");
  const [iconCategory, setIconCategory] = useState("all");
  const [showLoadConfirm, setShowLoadConfirm] = useState<PixelIcon | null>(null);

  // ----- Import -----
  const [showImport, setShowImport] = useState(false);

  // ----- Mobile -----
  const [showPreviewDrawer, setShowPreviewDrawer] = useState(false);
  const [showMobileTools, setShowMobileTools] = useState(true);

  // ----- Refs -----
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate pixel size based on container
  const basePixelSize = Math.min(Math.floor(480 / Math.max(canvasW, canvasH)), 30);
  const pixelSize = Math.max(basePixelSize * zoom, 2);
  const canvasPixelW = canvasW * pixelSize;
  const canvasPixelH = canvasH * pixelSize;

  // ----- History management -----
  const pushHistory = useCallback((newGrid: PixelGrid) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, historyIndex + 1);
      const next = [...trimmed, { grid: cloneGrid(newGrid) }];
      if (next.length > 100) next.shift();
      return next;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 99));
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setGrid(cloneGrid(prev.grid));
      setHistoryIndex(i => i - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setGrid(cloneGrid(next.grid));
      setHistoryIndex(i => i + 1);
    }
  }, [history, historyIndex]);

  // Initialize history
  useEffect(() => {
    setHistory([{ grid: cloneGrid(grid) }]);
    setHistoryIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----- Color helpers -----
  const addToColorHistory = useCallback((hex: string) => {
    setColorHistory(prev => {
      const filtered = prev.filter(c => c !== hex);
      return [hex, ...filtered].slice(0, 12);
    });
  }, []);

  const swapColors = useCallback(() => {
    setFgColor(bgColor);
    setBgColor(fgColor);
  }, [fgColor, bgColor]);

  // ----- Grid to pixel coordinate -----
  const getPixelCoord = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = Math.floor((clientX - rect.left - panOffset.x) / pixelSize);
    const y = Math.floor((clientY - rect.top - panOffset.y) / pixelSize);
    if (x < 0 || x >= canvasW || y < 0 || y >= canvasH) return null;
    return { x, y };
  }, [pixelSize, panOffset, canvasW, canvasH]);

  // ----- Apply a single pixel with color -----
  const paintPixels = useCallback((targetGrid: PixelGrid, points: [number, number][], color: RGBA): PixelGrid => {
    const result = cloneGrid(targetGrid);
    for (const [x, y] of points) {
      if (x < 0 || x >= canvasW || y < 0 || y >= canvasH) continue;
      // Apply mirror
      const mirrorPts = getMirrorPoints(x, y, canvasW, canvasH, mirrorMode);
      for (const [mx, my] of mirrorPts) {
        if (mx < 0 || mx >= canvasW || my < 0 || my >= canvasH) continue;
        // Apply brush size
        const brushPts = getBrushPoints(mx, my, brushSize);
        for (const [bx, by] of brushPts) {
          if (bx < 0 || bx >= canvasW || by < 0 || by >= canvasH) continue;
          // Apply dither
          if (shouldDither(bx, by, ditherPattern)) {
            result[by][bx] = color ? { ...color } : null;
          }
        }
      }
    }
    return result;
  }, [canvasW, canvasH, mirrorMode, brushSize, ditherPattern]);

  // ----- Drawing handlers -----
  const handlePointerDown = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ("touches" in e) e.preventDefault();
    const coord = getPixelCoord(e);
    if (!coord) return;

    setIsDrawing(true);
    setDrawStart(coord);
    lastPoint.current = coord;

    const color = activeTool === "eraser" ? null : hexToRGBA(fgColor);

    switch (activeTool) {
      case "pencil":
      case "eraser": {
        const newGrid = paintPixels(grid, [[coord.x, coord.y]], color);
        setGrid(newGrid);
        break;
      }
      case "fill": {
        const newGrid = floodFill(grid, coord.x, coord.y, color);
        setGrid(newGrid);
        pushHistory(newGrid);
        setIsDrawing(false);
        break;
      }
      case "eyedropper": {
        const p = grid[coord.y][coord.x];
        if (p) {
          const hex = rgbaToHex(p);
          setFgColor(hex);
          addToColorHistory(hex);
        }
        setIsDrawing(false);
        break;
      }
      case "line":
      case "rect":
      case "circle":
        setTempGrid(cloneGrid(grid));
        break;
      case "select":
        setSelection(null);
        break;
    }
  }, [getPixelCoord, activeTool, fgColor, grid, paintPixels, pushHistory, addToColorHistory]);

  const handlePointerMove = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ("touches" in e) e.preventDefault();
    const coord = getPixelCoord(e);
    if (!coord) { setHoverPixel(null); return; }
    setHoverPixel(coord);

    if (!isDrawing || !drawStart) return;

    const color = activeTool === "eraser" ? null : hexToRGBA(fgColor);

    switch (activeTool) {
      case "pencil":
      case "eraser": {
        // Draw line from last point to current for smooth strokes
        const prev = lastPoint.current || coord;
        const linePoints = bresenhamLine(prev.x, prev.y, coord.x, coord.y);
        const newGrid = paintPixels(grid, linePoints, color);
        setGrid(newGrid);
        lastPoint.current = coord;
        break;
      }
      case "line": {
        if (!tempGrid) return;
        const linePoints = bresenhamLine(drawStart.x, drawStart.y, coord.x, coord.y);
        const newGrid = paintPixels(tempGrid, linePoints, color);
        setGrid(newGrid);
        break;
      }
      case "rect": {
        if (!tempGrid) return;
        const pts = rectanglePoints(drawStart.x, drawStart.y, coord.x, coord.y, shapeFilled);
        const newGrid = paintPixels(tempGrid, pts, color);
        setGrid(newGrid);
        break;
      }
      case "circle": {
        if (!tempGrid) return;
        const cx = Math.round((drawStart.x + coord.x) / 2);
        const cy = Math.round((drawStart.y + coord.y) / 2);
        const rx = Math.abs(coord.x - drawStart.x) / 2;
        const ry = Math.abs(coord.y - drawStart.y) / 2;
        const pts = midpointCircle(cx, cy, Math.round(rx), Math.round(ry), shapeFilled);
        const newGrid = paintPixels(tempGrid, pts, color);
        setGrid(newGrid);
        break;
      }
      case "select": {
        const minX = Math.min(drawStart.x, coord.x);
        const minY = Math.min(drawStart.y, coord.y);
        const maxX = Math.max(drawStart.x, coord.x);
        const maxY = Math.max(drawStart.y, coord.y);
        setSelection({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
        break;
      }
    }
  }, [getPixelCoord, isDrawing, drawStart, activeTool, fgColor, grid, tempGrid, paintPixels, shapeFilled]);

  const handlePointerUp = useCallback(() => {
    if (isDrawing) {
      pushHistory(grid);
      setIsDrawing(false);
      setDrawStart(null);
      setTempGrid(null);
      lastPoint.current = null;
      if (activeTool === "pencil" || activeTool === "eraser") {
        addToColorHistory(activeTool === "eraser" ? bgColor : fgColor);
      }
    }
  }, [isDrawing, grid, pushHistory, activeTool, fgColor, bgColor, addToColorHistory]);

  // ----- Canvas rendering -----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvasPixelW;
    const h = canvasPixelH;
    canvas.width = w;
    canvas.height = h;
    ctx.imageSmoothingEnabled = false;

    // Checkerboard background
    const checkSize = Math.max(pixelSize / 2, 4);
    for (let y = 0; y < h; y += checkSize) {
      for (let x = 0; x < w; x += checkSize) {
        const ix = Math.floor(x / checkSize);
        const iy = Math.floor(y / checkSize);
        ctx.fillStyle = (ix + iy) % 2 === 0 ? "#e8e8e8" : "#d0d0d0";
        ctx.fillRect(x, y, checkSize, checkSize);
      }
    }

    // Draw pixels
    for (let y = 0; y < canvasH; y++) {
      for (let x = 0; x < canvasW; x++) {
        const p = grid[y]?.[x];
        if (!p) continue;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }

    // Grid lines
    if (showGrid && pixelSize >= 4) {
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= canvasW; x++) {
        ctx.beginPath();
        ctx.moveTo(x * pixelSize, 0);
        ctx.lineTo(x * pixelSize, h);
        ctx.stroke();
      }
      for (let y = 0; y <= canvasH; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * pixelSize);
        ctx.lineTo(w, y * pixelSize);
        ctx.stroke();
      }
    }

    // Mirror lines
    if (mirrorMode === "horizontal" || mirrorMode === "quad") {
      ctx.strokeStyle = "rgba(124,58,237,0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (mirrorMode === "vertical" || mirrorMode === "quad") {
      ctx.strokeStyle = "rgba(124,58,237,0.4)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Hover pixel highlight
    if (hoverPixel && !isDrawing) {
      ctx.strokeStyle = "rgba(124,58,237,0.6)";
      ctx.lineWidth = 2;
      ctx.strokeRect(hoverPixel.x * pixelSize, hoverPixel.y * pixelSize, pixelSize, pixelSize);
    }

    // Selection (marching ants)
    if (selection) {
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(
        selection.x * pixelSize,
        selection.y * pixelSize,
        selection.w * pixelSize,
        selection.h * pixelSize
      );
      ctx.setLineDash([]);
    }
  }, [grid, pixelSize, canvasPixelW, canvasPixelH, canvasW, canvasH, showGrid, hoverPixel, isDrawing, mirrorMode, selection]);

  // ----- Preview rendering -----
  const [previewDataUrl, setPreviewDataUrl] = useState<string>("");
  useEffect(() => {
    if (typeof document === "undefined") return;
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = canvasW;
    tmpCanvas.height = canvasH;
    const ctx = tmpCanvas.getContext("2d")!;
    for (let y = 0; y < canvasH; y++) {
      for (let x = 0; x < canvasW; x++) {
        const p = grid[y]?.[x];
        if (!p) continue;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    setPreviewDataUrl(tmpCanvas.toDataURL());
  }, [grid, canvasW, canvasH]);

  // ----- Keyboard shortcuts -----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === "z") { e.preventDefault(); if (e.shiftKey) redo(); else undo(); return; }
      if (ctrl && e.key === "y") { e.preventDefault(); redo(); return; }
      switch (e.key.toLowerCase()) {
        case "b": setActiveTool("pencil"); break;
        case "e": setActiveTool("eraser"); break;
        case "g": setActiveTool("fill"); break;
        case "i": setActiveTool("eyedropper"); break;
        case "l": setActiveTool("line"); break;
        case "r": if (!ctrl) setActiveTool("rect"); break;
        case "c": if (!ctrl) setActiveTool("circle"); break;
        case "x": swapColors(); break;
        case "[": setBrushSize(s => Math.max(1, s - 1)); break;
        case "]": setBrushSize(s => Math.min(4, s + 1)); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, swapColors]);

  // ----- Canvas resize -----
  const handleResize = useCallback((newW: number, newH: number) => {
    const newGrid = createGrid(newW, newH);
    // Copy existing pixels
    for (let y = 0; y < Math.min(canvasH, newH); y++) {
      for (let x = 0; x < Math.min(canvasW, newW); x++) {
        newGrid[y][x] = grid[y]?.[x] || null;
      }
    }
    setCanvasW(newW);
    setCanvasH(newH);
    setGrid(newGrid);
    pushHistory(newGrid);
    setZoom(1);
  }, [canvasW, canvasH, grid, pushHistory]);

  const clearCanvas = useCallback(() => {
    const newGrid = createGrid(canvasW, canvasH);
    setGrid(newGrid);
    pushHistory(newGrid);
    setSelection(null);
  }, [canvasW, canvasH, pushHistory]);

  // ----- Load icon -----
  const loadIcon = useCallback((icon: PixelIcon) => {
    const iconGrid = parseIconData(icon);
    const newW = iconGrid[0].length;
    const newH = iconGrid.length;
    setCanvasW(newW);
    setCanvasH(newH);
    setGrid(iconGrid);
    pushHistory(iconGrid);
    setShowLoadConfirm(null);
    // Scroll to top
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pushHistory]);

  const handleIconClick = useCallback((icon: PixelIcon) => {
    // Check if canvas is empty
    const isEmpty = grid.every(row => row.every(p => p === null));
    if (isEmpty) {
      loadIcon(icon);
    } else {
      setShowLoadConfirm(icon);
    }
  }, [grid, loadIcon]);

  // ----- Import image -----
  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = canvasW;
        tmpCanvas.height = canvasH;
        const ctx = tmpCanvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, canvasW, canvasH);
        const imgData = ctx.getImageData(0, 0, canvasW, canvasH);
        const newGrid = createGrid(canvasW, canvasH);
        for (let y = 0; y < canvasH; y++) {
          for (let x = 0; x < canvasW; x++) {
            const idx = (y * canvasW + x) * 4;
            const a = imgData.data[idx + 3];
            if (a < 10) continue;
            newGrid[y][x] = {
              r: imgData.data[idx],
              g: imgData.data[idx + 1],
              b: imgData.data[idx + 2],
              a: imgData.data[idx + 3],
            };
          }
        }
        setGrid(newGrid);
        pushHistory(newGrid);
        setShowImport(false);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }, [canvasW, canvasH, pushHistory]);

  // ----- Export handlers -----
  const handleExportPNG = useCallback(async (scale: number) => {
    const blob = await exportPNG(grid, scale);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pixel-art-${canvasW}x${canvasH}-${scale}x.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, [grid, canvasW, canvasH]);

  const handleExportICO = useCallback(async () => {
    const blob = await exportICO(grid);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicon.ico";
    a.click();
    URL.revokeObjectURL(url);
  }, [grid]);

  const handleExportSVG = useCallback(() => {
    const svg = exportSVG(grid);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pixel-art-${canvasW}x${canvasH}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [grid, canvasW, canvasH]);

  const handleExportFaviconPackage = useCallback(async () => {
    setExporting(true);
    try {
      const blob = await exportFaviconPackage(grid, siteName);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "favicon-package.zip";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }, [grid, siteName]);

  const handleCopyHTML = useCallback(() => {
    navigator.clipboard.writeText(getFaviconHTML());
    setCopiedHTML(true);
    setTimeout(() => setCopiedHTML(false), 2000);
  }, []);

  // ----- Icon library filtering -----
  const filteredIcons = useMemo(() => {
    let icons = ALL_ICONS;
    if (iconCategory !== "all") {
      icons = icons.filter(i => i.category === iconCategory);
    }
    if (iconSearch) {
      const q = iconSearch.toLowerCase();
      icons = icons.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q)) ||
        i.category.toLowerCase().includes(q)
      );
    }
    return icons;
  }, [iconCategory, iconSearch]);

  // ========== RENDER ==========
  return (
    <div className="min-h-screen" style={{ "--color-accent": ACCENT } as React.CSSProperties} ref={containerRef}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>EveryFreeTool</a>
          <div className="flex items-center gap-2">
            <PrivacyBadge />
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-6 md:py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "var(--text)" }}>{title}</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
        </div>

        {/* Canvas controls row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Canvas size */}
          <select
            value={`${canvasW}x${canvasH}`}
            onChange={(e) => {
              const [w, h] = e.target.value.split("x").map(Number);
              handleResize(w, h);
            }}
            className="px-3 py-1.5 rounded-lg border text-sm outline-none"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
          >
            {CANVAS_SIZES.map(s => (
              <option key={s.label} value={`${s.w}x${s.h}`}>{s.label}</option>
            ))}
          </select>

          {/* Grid toggle */}
          <button onClick={() => setShowGrid(!showGrid)} className={`px-3 py-1.5 rounded-lg border text-sm ${showGrid ? "font-semibold" : ""}`}
            style={{ backgroundColor: showGrid ? ACCENT : "var(--surface)", color: showGrid ? "#fff" : "var(--text)", borderColor: showGrid ? ACCENT : "var(--border)" }}>
            Grid
          </button>

          {/* Mirror mode */}
          <select value={mirrorMode} onChange={(e) => setMirrorMode(e.target.value as MirrorMode)}
            className="px-3 py-1.5 rounded-lg border text-sm outline-none"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>
            <option value="off">Mirror: Off</option>
            <option value="horizontal">Mirror: H</option>
            <option value="vertical">Mirror: V</option>
            <option value="quad">Mirror: Quad</option>
          </select>

          {/* Dither */}
          <select value={ditherPattern} onChange={(e) => setDitherPattern(e.target.value as DitherPattern)}
            className="px-3 py-1.5 rounded-lg border text-sm outline-none"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>
            <option value="none">Dither: Off</option>
            <option value="50">Dither: 50%</option>
            <option value="25">Dither: 25%</option>
          </select>

          {/* Zoom */}
          <div className="flex items-center gap-1 ml-auto">
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="px-2 py-1.5 rounded-lg border text-sm"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>-</button>
            <span className="text-xs w-12 text-center" style={{ color: "var(--text-muted)" }}>{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(4, z + 0.25))} className="px-2 py-1.5 rounded-lg border text-sm"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>+</button>
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <button onClick={undo} disabled={historyIndex <= 0} className="px-2 py-1.5 rounded-lg border text-sm disabled:opacity-30"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }} title="Undo (Ctrl+Z)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10h10a5 5 0 015 5v0a5 5 0 01-5 5H7"/><path d="M7 6L3 10l4 4"/></svg>
            </button>
            <button onClick={redo} disabled={historyIndex >= history.length - 1} className="px-2 py-1.5 rounded-lg border text-sm disabled:opacity-30"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }} title="Redo (Ctrl+Y)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10H11a5 5 0 00-5 5v0a5 5 0 005 5h6"/><path d="M17 6l4 4-4 4"/></svg>
            </button>
          </div>

          {/* Import */}
          <label className="px-3 py-1.5 rounded-lg border text-sm cursor-pointer"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>
            Import
            <input type="file" accept="image/*" className="hidden" onChange={handleImport} />
          </label>

          {/* Clear */}
          <button onClick={clearCanvas} className="px-3 py-1.5 rounded-lg border text-sm"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>
            Clear
          </button>
        </div>

        {/* Main workspace */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* LEFT SIDEBAR — Tools + Colors */}
          <div className="w-full lg:w-[180px] flex-shrink-0 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-2">
              {/* Tools */}
              <div className="rounded-xl border p-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-xs font-semibold mb-2 hidden lg:block" style={{ color: "var(--text-muted)" }}>Tools</div>
                <div className="flex lg:flex-col flex-wrap gap-1">
                  {TOOL_CONFIG.map(tool => (
                    <button key={tool.id} onClick={() => setActiveTool(tool.id)}
                      className="p-2 rounded-lg transition-colors"
                      style={{
                        backgroundColor: activeTool === tool.id ? ACCENT : "transparent",
                        color: activeTool === tool.id ? "#fff" : "var(--text)",
                      }}
                      title={`${tool.label} (${tool.shortcut})`} aria-label={tool.label}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={tool.icon} />
                      </svg>
                    </button>
                  ))}
                </div>

                {/* Brush size */}
                {(activeTool === "pencil" || activeTool === "eraser") && (
                  <div className="mt-2 pt-2 border-t hidden lg:block" style={{ borderColor: "var(--border)" }}>
                    <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Brush: {brushSize}px</div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(s => (
                        <button key={s} onClick={() => setBrushSize(s)}
                          className="w-7 h-7 rounded-md text-xs font-semibold"
                          style={{
                            backgroundColor: brushSize === s ? ACCENT : "var(--surface-alt)",
                            color: brushSize === s ? "#fff" : "var(--text)",
                          }}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shape fill toggle */}
                {(activeTool === "rect" || activeTool === "circle") && (
                  <div className="mt-2 pt-2 border-t hidden lg:block" style={{ borderColor: "var(--border)" }}>
                    <button onClick={() => setShapeFilled(!shapeFilled)} className="text-xs px-2 py-1 rounded-md"
                      style={{ backgroundColor: shapeFilled ? ACCENT : "var(--surface-alt)", color: shapeFilled ? "#fff" : "var(--text)" }}>
                      {shapeFilled ? "Filled" : "Outline"}
                    </button>
                  </div>
                )}
              </div>

              {/* Colors */}
              <div className="rounded-xl border p-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-xs font-semibold mb-2 hidden lg:block" style={{ color: "var(--text-muted)" }}>Colors</div>

                {/* FG/BG swap */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-12 h-12">
                    <button onClick={() => { setEditingColor("fg"); setShowColorPicker(true); setCustomHex(fgColor); }}
                      className="absolute top-0 left-0 w-8 h-8 rounded-md border-2 z-10"
                      style={{ backgroundColor: fgColor, borderColor: "var(--surface)" }} title="Foreground color" />
                    <button onClick={() => { setEditingColor("bg"); setShowColorPicker(true); setCustomHex(bgColor); }}
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-md border-2"
                      style={{ backgroundColor: bgColor, borderColor: "var(--surface)" }} title="Background color" />
                  </div>
                  <button onClick={swapColors} className="text-xs px-2 py-1 rounded border"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }} title="Swap colors (X)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4"/></svg>
                  </button>
                </div>

                {/* Hex input */}
                {showColorPicker && (
                  <div className="mb-2 p-2 rounded-lg" style={{ backgroundColor: "var(--surface-alt)" }}>
                    <input type="color" value={customHex} onChange={(e) => {
                      setCustomHex(e.target.value);
                      if (editingColor === "fg") setFgColor(e.target.value);
                      else setBgColor(e.target.value);
                    }} className="w-full h-8 rounded cursor-pointer" />
                    <input type="text" value={customHex} onChange={(e) => {
                      const v = e.target.value;
                      setCustomHex(v);
                      if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
                        if (editingColor === "fg") setFgColor(v);
                        else setBgColor(v);
                      }
                    }} className="mt-1 w-full px-2 py-1 rounded border text-xs font-mono outline-none"
                      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }} />
                    <button onClick={() => setShowColorPicker(false)} className="mt-1 text-xs w-full py-1 rounded"
                      style={{ backgroundColor: ACCENT, color: "#fff" }}>Done</button>
                  </div>
                )}

                {/* Palette selector */}
                <select value={activePalette} onChange={(e) => setActivePalette(Number(e.target.value))}
                  className="w-full px-2 py-1 rounded border text-xs outline-none mb-2"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>
                  {PALETTES.map((p, i) => (
                    <option key={p.name} value={i}>{p.name}</option>
                  ))}
                </select>

                {/* Palette colors */}
                <div className="grid grid-cols-4 gap-1">
                  {PALETTES[activePalette].colors.map((c, i) => (
                    <button key={`${c}-${i}`} onClick={() => { setFgColor(c); addToColorHistory(c); }}
                      onContextMenu={(e) => { e.preventDefault(); setBgColor(c); }}
                      className="w-7 h-7 rounded-md border"
                      style={{ backgroundColor: c, borderColor: fgColor === c ? ACCENT : "var(--border)" }}
                      title={c} />
                  ))}
                </div>

                {/* Color history */}
                {colorHistory.length > 0 && (
                  <div className="mt-2 pt-2 border-t hidden lg:block" style={{ borderColor: "var(--border)" }}>
                    <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Recent</div>
                    <div className="flex flex-wrap gap-1">
                      {colorHistory.map((c, i) => (
                        <button key={`${c}-${i}`} onClick={() => { setFgColor(c); }}
                          className="w-5 h-5 rounded border"
                          style={{ backgroundColor: c, borderColor: "var(--border)" }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CENTER — Canvas */}
          <div className="flex-1 min-w-0 order-1 lg:order-2">
            <div className="rounded-xl border p-4 flex flex-col items-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              {/* Coordinate display */}
              <div className="text-xs mb-2 font-mono" style={{ color: "var(--text-muted)" }}>
                {hoverPixel ? `X: ${hoverPixel.x}, Y: ${hoverPixel.y}` : `${canvasW} x ${canvasH}`}
                {historyIndex >= 0 && ` | Step ${historyIndex + 1}/${history.length}`}
              </div>

              {/* Canvas container */}
              <div className="overflow-auto max-w-full" style={{ maxHeight: "60vh", touchAction: "none" }}>
                <canvas
                  ref={canvasRef}
                  width={canvasPixelW}
                  height={canvasPixelH}
                  onMouseDown={handlePointerDown}
                  onMouseMove={handlePointerMove}
                  onMouseUp={handlePointerUp}
                  onMouseLeave={() => { setHoverPixel(null); if (isDrawing) handlePointerUp(); }}
                  onTouchStart={handlePointerDown}
                  onTouchMove={handlePointerMove}
                  onTouchEnd={handlePointerUp}
                  className="block cursor-crosshair"
                  style={{ imageRendering: "pixelated" }}
                  role="img"
                  aria-label="Pixel art canvas"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR — Preview + Export */}
          <div className="w-full lg:w-[260px] flex-shrink-0 order-3">
            {/* Mobile toggle */}
            <button onClick={() => setShowPreviewDrawer(!showPreviewDrawer)} className="lg:hidden w-full mb-2 px-4 py-2 rounded-xl border text-sm font-medium"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>
              {showPreviewDrawer ? "Hide" : "Show"} Preview & Export
            </button>

            <div className={`${showPreviewDrawer ? "block" : "hidden"} lg:block space-y-3`}>
              {/* Live Preview */}
              <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Live Preview</div>
                  <button onClick={() => setPreviewBgDark(!previewBgDark)} className="text-xs px-2 py-0.5 rounded border"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    {previewBgDark ? "Light" : "Dark"} BG
                  </button>
                </div>

                {/* Browser tab mockup */}
                <div className="mb-3">
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Browser Tab</div>
                  <div className="rounded-t-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                    <div className="px-2 py-1.5 flex items-center gap-2" style={{ backgroundColor: previewBgDark ? "#2d2d30" : "#e8e8e8" }}>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#28c840" }} />
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs" style={{ backgroundColor: previewBgDark ? "#1e1e22" : "#fff", color: previewBgDark ? "#ccc" : "#333" }}>
                        <img src={previewDataUrl} width="14" height="14" alt="" style={{ imageRendering: "pixelated" }} />
                        <span className="truncate max-w-[120px]">{siteName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google search mockup */}
                <div className="mb-3">
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Google Search</div>
                  <div className="rounded-lg border p-2" style={{ borderColor: "var(--border)", backgroundColor: previewBgDark ? "#1e1e22" : "#fff" }}>
                    <div className="flex items-center gap-2">
                      <img src={previewDataUrl} width="28" height="28" alt="" style={{ imageRendering: "pixelated" }} />
                      <div>
                        <div className="text-xs font-medium" style={{ color: previewBgDark ? "#8ab4f8" : "#1a0dab" }}>{siteName}</div>
                        <div className="text-xs" style={{ color: previewBgDark ? "#bdc1c6" : "#4d5156" }}>mysite.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Size previews */}
                <div className="space-y-2">
                  {[
                    { size: 16, label: "16px - Tab" },
                    { size: 32, label: "32px - Bookmark" },
                    { size: 48, label: "48px - Search" },
                    { size: 64, label: "64px - App" },
                  ].map(({ size, label }) => (
                    <div key={size} className="flex items-center gap-3">
                      <div className="flex-shrink-0 rounded" style={{ backgroundColor: previewBgDark ? "#2d2d30" : "#f0f0f0", padding: "4px" }}>
                        <img src={previewDataUrl} width={size} height={size} alt="" style={{ imageRendering: "pixelated" }} />
                      </div>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Site name */}
                <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                  <label className="text-xs" style={{ color: "var(--text-muted)" }}>Site Name</label>
                  <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)}
                    className="w-full mt-1 px-2 py-1 rounded border text-xs outline-none"
                    style={{ backgroundColor: "var(--surface-alt)", borderColor: "var(--border)", color: "var(--text)" }} />
                </div>
              </div>

              {/* Export */}
              <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>Export</div>

                {/* Primary CTA */}
                <button onClick={handleExportFaviconPackage} disabled={exporting}
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-white mb-3 disabled:opacity-50 transition-transform active:scale-[0.98]"
                  style={{ backgroundColor: ACCENT }}>
                  {exporting ? "Generating..." : "Download Favicon Package"}
                </button>

                {/* HTML snippet */}
                <div className="mb-3">
                  <button onClick={handleCopyHTML} className="w-full px-3 py-1.5 rounded-lg border text-xs font-medium"
                    style={{ borderColor: "var(--border)", color: "var(--text)", backgroundColor: "var(--surface-alt)" }}>
                    {copiedHTML ? "Copied!" : "Copy HTML Snippet"}
                  </button>
                </div>

                {/* Individual exports */}
                <button onClick={() => setShowExportOptions(!showExportOptions)} className="text-xs mb-2"
                  style={{ color: ACCENT }}>
                  {showExportOptions ? "Hide" : "More"} export options
                </button>

                {showExportOptions && (
                  <div className="space-y-1.5">
                    {[1, 2, 4, 8].map(s => (
                      <button key={s} onClick={() => handleExportPNG(s)}
                        className="w-full px-3 py-1 rounded border text-xs text-left"
                        style={{ borderColor: "var(--border)", color: "var(--text)", backgroundColor: "var(--surface)" }}>
                        PNG {s}x ({canvasW * s}x{canvasH * s})
                      </button>
                    ))}
                    <button onClick={handleExportICO} className="w-full px-3 py-1 rounded border text-xs text-left"
                      style={{ borderColor: "var(--border)", color: "var(--text)", backgroundColor: "var(--surface)" }}>
                      ICO (multi-resolution)
                    </button>
                    <button onClick={handleExportSVG} className="w-full px-3 py-1 rounded border text-xs text-left"
                      style={{ borderColor: "var(--border)", color: "var(--text)", backgroundColor: "var(--surface)" }}>
                      SVG (scalable)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========== ICON LIBRARY ========== */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>Icon Library</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            {ALL_ICONS.length}+ pixel art icons. Click any icon to load it into the editor and make it yours.
          </p>

          {/* Search */}
          <input type="text" placeholder="Search icons... (e.g. arrow, shopping, music)"
            value={iconSearch} onChange={(e) => setIconSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none mb-3"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }} />

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5 mb-4 overflow-x-auto pb-2">
            {ICON_CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setIconCategory(cat.id)}
                className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: iconCategory === cat.id ? ACCENT : "var(--surface-alt)",
                  color: iconCategory === cat.id ? "#fff" : "var(--text-muted)",
                }}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Icon grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {filteredIcons.map((icon, i) => (
              <button key={`${icon.name}-${i}`} onClick={() => handleIconClick(icon)}
                className="flex flex-col items-center gap-1 p-2 rounded-xl border transition-all hover:shadow-md"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                title={`${icon.name} — Click to load`}>
                <IconPreview icon={icon} size={48} />
                <span className="text-xs truncate w-full text-center" style={{ color: "var(--text-muted)" }}>{icon.name}</span>
              </button>
            ))}
          </div>

          {filteredIcons.length === 0 && (
            <div className="text-center py-8 text-sm" style={{ color: "var(--text-muted)" }}>
              No icons found for &ldquo;{iconSearch}&rdquo;. Try a different search term, or draw your own from scratch!
            </div>
          )}
        </div>

        {/* Load confirm modal */}
        {showLoadConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowLoadConfirm(null)}>
            <div className="rounded-2xl p-6 max-w-sm w-full" style={{ backgroundColor: "var(--surface)" }} onClick={(e) => e.stopPropagation()}>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>Load this icon?</h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Your current work will be replaced.</p>
              <div className="flex items-center justify-center mb-4">
                <IconPreview icon={showLoadConfirm} size={96} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowLoadConfirm(null)} className="flex-1 px-4 py-2 rounded-xl border text-sm"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }}>Cancel</button>
                <button onClick={() => loadIcon(showLoadConfirm)} className="flex-1 px-4 py-2 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: ACCENT }}>Load Icon</button>
              </div>
            </div>
          </div>
        )}

        {/* ========== KEYBOARD SHORTCUTS ========== */}
        <div className="mt-12 rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>Keyboard Shortcuts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {[
              ["B", "Pencil/Brush"], ["E", "Eraser"], ["G", "Fill (Bucket)"], ["I", "Eyedropper"],
              ["L", "Line Tool"], ["R", "Rectangle"], ["C", "Circle"], ["X", "Swap Colors"],
              ["Ctrl+Z", "Undo"], ["Ctrl+Y", "Redo"], ["[ ]", "Brush Size"],
            ].map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded border font-mono" style={{ backgroundColor: "var(--surface-alt)", borderColor: "var(--border)", color: "var(--text)" }}>{key}</kbd>
                <span style={{ color: "var(--text-muted)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
        <p>All processing happens in your browser. Your images never leave your device.</p>
      </footer>
    </div>
  );
}
