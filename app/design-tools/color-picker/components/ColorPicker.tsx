"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Color Math ─── */
function hexToRgb(hex: string): { r: number; g: number; b: number; a: number } {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  return {
    r: parseInt(hex.slice(0, 2), 16) || 0,
    g: parseInt(hex.slice(2, 4), 16) || 0,
    b: parseInt(hex.slice(4, 6), 16) || 0,
    a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("").toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; l /= 100;
  let r: number, g: number, b: number;
  if (s === 0) { r = g = b = l; } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max, v = max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; v /= 100;
  let r = 0, g = 0, b = 0;
  const i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break; case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break; case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break; case 5: r = v; g = p; b = q; break;
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const c1 = 1 - r / 255, m1 = 1 - g / 255, y1 = 1 - b / 255, k = Math.min(c1, m1, y1);
  return { c: Math.round(((c1 - k) / (1 - k)) * 100), m: Math.round(((m1 - k) / (1 - k)) * 100), y: Math.round(((y1 - k) / (1 - k)) * 100), k: Math.round(k * 100) };
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => { c = c / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  const l1 = getRelativeLuminance(r1, g1, b1), l2 = getRelativeLuminance(r2, g2, b2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function getTextColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#000000" : "#FFFFFF";
}

/* ─── Named colors (subset for display) ─── */
const NAMED_COLORS: [string, string][] = [
  ["#FF0000", "Red"], ["#00FF00", "Lime"], ["#0000FF", "Blue"], ["#FFFF00", "Yellow"],
  ["#FF00FF", "Magenta"], ["#00FFFF", "Cyan"], ["#800000", "Maroon"], ["#808000", "Olive"],
  ["#008000", "Green"], ["#800080", "Purple"], ["#008080", "Teal"], ["#000080", "Navy"],
  ["#FFA500", "Orange"], ["#FFC0CB", "Pink"], ["#A52A2A", "Brown"], ["#808080", "Gray"],
  ["#FF6347", "Tomato"], ["#FFD700", "Gold"], ["#4169E1", "Royal Blue"], ["#DC143C", "Crimson"],
  ["#2E8B57", "Sea Green"], ["#FF4500", "Orange Red"], ["#DA70D6", "Orchid"], ["#20B2AA", "Light Sea Green"],
  ["#B22222", "Firebrick"], ["#228B22", "Forest Green"], ["#4682B4", "Steel Blue"], ["#D2691E", "Chocolate"],
  ["#CD5C5C", "Indian Red"], ["#6A5ACD", "Slate Blue"], ["#FF69B4", "Hot Pink"], ["#00CED1", "Dark Turquoise"],
  ["#9ACD32", "Yellow Green"], ["#FF8C00", "Dark Orange"], ["#BA55D3", "Medium Orchid"], ["#3CB371", "Medium Sea Green"],
  ["#000000", "Black"], ["#FFFFFF", "White"], ["#C0C0C0", "Silver"], ["#F0E68C", "Khaki"],
  ["#E6E6FA", "Lavender"], ["#F5DEB3", "Wheat"], ["#DDA0DD", "Plum"], ["#98FB98", "Pale Green"],
  ["#87CEEB", "Sky Blue"], ["#F08080", "Light Coral"], ["#ADD8E6", "Light Blue"], ["#90EE90", "Light Green"],
  ["#FFB6C1", "Light Pink"], ["#778899", "Light Slate Gray"],
];

function findNearestName(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  let best = "Custom Color", bestDist = Infinity;
  for (const [h, name] of NAMED_COLORS) {
    const c = hexToRgb(h);
    const dist = Math.sqrt((r - c.r) ** 2 + (g - c.g) ** 2 + (b - c.b) ** 2);
    if (dist < bestDist) { bestDist = dist; best = name; }
  }
  return bestDist < 60 ? best : "Custom Color";
}

/* ─── Presets ─── */
const PRESET_COLORS = ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FFA500", "#800080", "#FFC0CB", "#808080", "#A52A2A", "#000080", "#008080", "#32CD32"];

/* ─── Types ─── */
type Tab = "contrast" | "palette" | "image";
type Harmony = "complementary" | "analogous" | "triadic" | "split-complementary" | "tetradic" | "square" | "monochromatic";

interface Props {
  title: string;
  subtitle: string;
  defaultTab?: Tab;
  defaultFocusFormat?: "hex" | "rgb" | "hsl" | "rgba" | "image";
  articleMode?: boolean;
}

export default function ColorPicker({ title, subtitle, defaultTab, defaultFocusFormat, articleMode = false }: Props) {
  const [dark, setDark] = useState(false);
  // Color state in HSV (maps directly to the visual picker)
  const [hsv, setHsv] = useState({ h: 217, s: 76, v: 96 });
  const [alpha, setAlpha] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab | null>(defaultTab || null);

  // Contrast checker state
  const [fgHex, setFgHex] = useState("#1E293B");
  const [bgHex, setBgHex] = useState("#FFFFFF");

  // Palette state
  const [harmony, setHarmony] = useState<Harmony>("complementary");

  // Image state
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [dominantColors, setDominantColors] = useState<{ hex: string; pct: number }[]>([]);
  const imgCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Picker canvas refs
  const spectrumRef = useRef<HTMLCanvasElement>(null);
  const hueRef = useRef<HTMLCanvasElement>(null);
  const draggingSpectrum = useRef(false);
  const draggingHue = useRef(false);
  const nativeInputRef = useRef<HTMLInputElement>(null);

  // History
  const [history, setHistory] = useState<string[]>([]);

  // Copy state
  const [copied, setCopied] = useState("");

  // HEX input
  const [hexInput, setHexInput] = useState("");

  // Theme
  useEffect(() => {
    const html = document.documentElement;
    setDark(html.classList.contains("dark"));
    const obs = new MutationObserver(() => setDark(html.classList.contains("dark")));
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const C = {
    bg: dark ? "#1E1E2E" : "#F8F7F5",
    surface: dark ? "#282A36" : "#FFFFFF",
    surfaceAlt: dark ? "#313244" : "#F0F0F0",
    text: dark ? "#F8F8F2" : "#1A1A2E",
    muted: dark ? "#A0A0B8" : "#6B7280",
    border: dark ? "#44475A" : "#E0E0E0",
    green: "#50FA7B",
    red: "#FF5555",
  };

  // Derived color values
  const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const colorName = findNearestName(hex);
  const textOnSwatch = getTextColor(hex);

  // Keep hexInput in sync when color changes from picker (not from typing)
  const lastPickerHex = useRef(hex);
  useEffect(() => {
    if (hex !== lastPickerHex.current) {
      lastPickerHex.current = hex;
      setHexInput(hex);
    }
  }, [hex]);

  // Initialize hexInput
  useEffect(() => { setHexInput(hex); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Update color from various sources ─── */
  const setFromRgb = useCallback((r: number, g: number, b: number) => {
    const h = rgbToHsv(r, g, b);
    setHsv(h);
    addHistory(rgbToHex(r, g, b));
  }, []);

  const setFromHex = useCallback((h: string) => {
    const { r, g, b, a } = hexToRgb(h);
    setHsv(rgbToHsv(r, g, b));
    setAlpha(a);
    addHistory(rgbToHex(r, g, b));
  }, []);

  const setFromHsl = useCallback((h: number, s: number, l: number) => {
    const { r, g, b } = hslToRgb(h, s, l);
    setHsv(rgbToHsv(r, g, b));
    addHistory(rgbToHex(r, g, b));
  }, []);

  const addHistory = (hex: string) => {
    setHistory(prev => {
      const next = [hex, ...prev.filter(c => c !== hex)].slice(0, 12);
      return next;
    });
  };

  /* ─── Draw spectrum ─── */
  const drawSpectrum = useCallback(() => {
    const canvas = spectrumRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.fillStyle = `hsl(${hsv.h}, 100%, 50%)`;
    ctx.fillRect(0, 0, width, height);
    const wg = ctx.createLinearGradient(0, 0, width, 0);
    wg.addColorStop(0, "rgba(255,255,255,1)"); wg.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = wg; ctx.fillRect(0, 0, width, height);
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "rgba(0,0,0,0)"); bg.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);
  }, [hsv.h]);

  const drawHueStrip = useCallback(() => {
    const canvas = hueRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const grad = ctx.createLinearGradient(0, 0, width, 0);
    for (let i = 0; i <= 6; i++) grad.addColorStop(i / 6, `hsl(${i * 60}, 100%, 50%)`);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);
  }, []);

  useEffect(() => { drawSpectrum(); }, [drawSpectrum]);
  useEffect(() => { drawHueStrip(); }, [drawHueStrip]);

  /* ─── Spectrum interaction ─── */
  const handleSpectrumPointer = useCallback((e: React.PointerEvent | PointerEvent) => {
    const canvas = spectrumRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const newS = Math.round(x * 100);
    const newV = Math.round((1 - y) * 100);
    setHsv(prev => ({ ...prev, s: newS, v: newV }));
    const { r, g, b } = hsvToRgb(hsv.h, newS, newV);
    addHistory(rgbToHex(r, g, b));
  }, [hsv.h]);

  const handleHuePointer = useCallback((e: React.PointerEvent | PointerEvent) => {
    const canvas = hueRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHsv(prev => ({ ...prev, h: Math.round(x * 360) }));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (draggingSpectrum.current) handleSpectrumPointer(e);
      if (draggingHue.current) handleHuePointer(e);
    };
    const onUp = () => { draggingSpectrum.current = false; draggingHue.current = false; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, [handleSpectrumPointer, handleHuePointer]);

  /* ─── Copy ─── */
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  /* ─── Contrast checker ─── */
  const fgRgb = hexToRgb(fgHex);
  const bgRgb = hexToRgb(bgHex);
  const contrastRatio = getContrastRatio(fgRgb.r, fgRgb.g, fgRgb.b, bgRgb.r, bgRgb.g, bgRgb.b);
  const wcag = { aa_normal: contrastRatio >= 4.5, aa_large: contrastRatio >= 3, aaa_normal: contrastRatio >= 7, aaa_large: contrastRatio >= 4.5 };

  const suggestCompliant = (fgR: { r: number; g: number; b: number }, bgR: { r: number; g: number; b: number }, target = 4.5) => {
    const fgH = rgbToHsl(fgR.r, fgR.g, fgR.b);
    const bgLum = getRelativeLuminance(bgR.r, bgR.g, bgR.b);
    const dir = bgLum > 0.5 ? -1 : 1;
    for (let l = fgH.l; l >= 0 && l <= 100; l += dir) {
      const test = hslToRgb(fgH.h, fgH.s, l);
      const ratio = getContrastRatio(test.r, test.g, test.b, bgR.r, bgR.g, bgR.b);
      if (ratio >= target) return { hex: rgbToHex(test.r, test.g, test.b), ratio };
    }
    return null;
  };

  /* ─── Palette generation ─── */
  const generateHarmonyHues = (hue: number, type: Harmony): number[] => {
    switch (type) {
      case "complementary": return [hue, (hue + 180) % 360];
      case "analogous": return [(hue - 30 + 360) % 360, hue, (hue + 30) % 360];
      case "triadic": return [hue, (hue + 120) % 360, (hue + 240) % 360];
      case "split-complementary": return [hue, (hue + 150) % 360, (hue + 210) % 360];
      case "tetradic": return [hue, (hue + 60) % 360, (hue + 180) % 360, (hue + 240) % 360];
      case "square": return [hue, (hue + 90) % 360, (hue + 180) % 360, (hue + 270) % 360];
      case "monochromatic": return [hue];
    }
  };

  const paletteColors = (() => {
    if (harmony === "monochromatic") {
      return Array.from({ length: 7 }, (_, i) => {
        const l = 15 + i * 12;
        const { r, g, b } = hslToRgb(hsl.h, hsl.s, l);
        return rgbToHex(r, g, b);
      });
    }
    const hues = generateHarmonyHues(hsv.h, harmony);
    return hues.map(h => {
      const { r, g, b } = hsvToRgb(h, hsv.s, hsv.v);
      return rgbToHex(r, g, b);
    });
  })();

  const tintsAndShades = (() => {
    const steps = 9;
    const result: string[] = [];
    for (let i = 0; i < steps; i++) {
      const factor = i / (steps - 1);
      let r: number, g: number, b: number;
      if (factor < 0.5) {
        const t = 1 - factor * 2;
        r = Math.round(rgb.r + (255 - rgb.r) * t);
        g = Math.round(rgb.g + (255 - rgb.g) * t);
        b = Math.round(rgb.b + (255 - rgb.b) * t);
      } else {
        const t = (factor - 0.5) * 2;
        r = Math.round(rgb.r * (1 - t)); g = Math.round(rgb.g * (1 - t)); b = Math.round(rgb.b * (1 - t));
      }
      result.push(rgbToHex(r, g, b));
    }
    return result;
  })();

  /* ─── Image color picker ─── */
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImgSrc(src);
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        const canvas = imgCanvasRef.current;
        if (!canvas) return;
        const maxW = 600, maxH = 400;
        const scale = Math.min(maxW / img.width, maxH / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Extract dominant colors
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        extractColors(imageData);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const extractColors = (imageData: ImageData) => {
    const sampleRate = Math.max(1, Math.floor(imageData.data.length / (4 * 10000)));
    const colorMap: Record<string, number> = {};
    let total = 0;
    for (let i = 0; i < imageData.data.length; i += 4 * sampleRate) {
      const a = imageData.data[i + 3];
      if (a < 128) continue;
      const r = Math.round(imageData.data[i] / 16) * 16;
      const g = Math.round(imageData.data[i + 1] / 16) * 16;
      const b = Math.round(imageData.data[i + 2] / 16) * 16;
      const key = `${r},${g},${b}`;
      colorMap[key] = (colorMap[key] || 0) + 1;
      total++;
    }
    const sorted = Object.entries(colorMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
    setDominantColors(sorted.map(([key, count]) => {
      const [r, g, b] = key.split(",").map(Number);
      return { hex: rgbToHex(r, g, b), pct: Math.round((count / total) * 100) };
    }));
  };

  const handleImageClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = imgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height));
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    setFromRgb(pixel[0], pixel[1], pixel[2]);
  };

  /* ─── Styles ─── */
  const cardStyle: React.CSSProperties = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "16px" };
  const inputStyle: React.CSSProperties = { background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", color: C.text, fontFamily: "monospace", fontSize: "16px", padding: "8px 12px", outline: "none", width: "100%" };
  const smallInputStyle: React.CSSProperties = { ...inputStyle, width: "70px", textAlign: "center" as const };
  const copyBtn = (label: string) => (
    <button onClick={() => copy(label === "hex" ? hex : label === "rgb" ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : label === "hsl" ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : label === "rgba" ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : label === "hsv" ? `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` : label === "cmyk" ? `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` : label === "css" ? `--color: ${hex};` : label, label)} style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: `1px solid ${C.border}`, background: "transparent", color: copied === label ? C.green : C.muted, transition: "all 0.15s", flexShrink: 0 }}>
      {copied === label ? "\u2705" : "\uD83D\uDCCB"}
    </button>
  );

  const tabBtn = (id: Tab, label: string) => (
    <button key={id} onClick={() => setActiveTab(activeTab === id ? null : id)} style={{ padding: "8px 18px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: "pointer", border: "none", background: activeTab === id ? (hex + "33") : "transparent", color: activeTab === id ? C.text : C.muted, transition: "all 0.2s" }}>{label}</button>
  );

  const harmonyBtn = (id: Harmony, label: string) => (
    <button key={id} onClick={() => setHarmony(id)} style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: `1px solid ${harmony === id ? hex : C.border}`, background: harmony === id ? hex + "22" : "transparent", color: harmony === id ? C.text : C.muted, transition: "all 0.15s" }}>{label}</button>
  );

  const swatchBtn = (color: string, size = 36) => (
    <button key={color} onClick={() => setFromHex(color)} style={{ width: size, height: size, borderRadius: "6px", background: color, border: `2px solid ${color === hex ? C.text : C.border}`, cursor: "pointer", flexShrink: 0 }} title={color} />
  );

  const HARMONIES: { id: Harmony; label: string }[] = [
    { id: "complementary", label: "Complementary" }, { id: "analogous", label: "Analogous" },
    { id: "triadic", label: "Triadic" }, { id: "split-complementary", label: "Split Comp." },
    { id: "tetradic", label: "Tetradic" }, { id: "square", label: "Square" },
    { id: "monochromatic", label: "Monochromatic" },
  ];

  const FAQS = [
    { q: "How do I convert HEX to RGB?", a: "Paste or type your HEX code (like #3B82F6) into the HEX field and the RGB values appear instantly \u2014 R: 59, G: 130, B: 246. The first two hex characters are red, the middle two are green, the last two are blue." },
    { q: "What is a WCAG contrast ratio and why does it matter?", a: "The WCAG contrast ratio measures how distinguishable two colors are, from 1:1 (no contrast) to 21:1 (maximum). WCAG 2.1 requires a minimum of 4.5:1 for normal text (AA) and 7:1 for the highest standard (AAA). This ensures people with visual impairments can read your content." },
    { q: "What\u2019s the difference between RGB and HSL?", a: "RGB defines colors by mixing red, green, and blue light (0-255 each). HSL describes colors as Hue (color wheel position 0-360\u00B0), Saturation (vividness 0-100%), and Lightness (brightness 0-100%). HSL is more intuitive for creating color variations." },
    { q: "Is CMYK conversion accurate?", a: "Our CMYK conversion is mathematically correct but approximate. Precise CMYK values for print depend on ICC color profiles. Our conversion uses the standard formula, sufficient for digital mockups. For production print, use your print provider\u2019s color profile." },
    { q: "Can I extract colors from an image?", a: "Yes. Upload any image and click anywhere on it to pick a pixel\u2019s color, or let the tool extract the 5-6 most dominant colors automatically. The image is processed entirely in your browser \u2014 never uploaded to any server." },
    { q: "What color format should I use for web design?", a: "For CSS, HEX (#3B82F6) and RGB are both widely supported. HSL is increasingly preferred because it\u2019s easier to create color variations. For opacity, use RGBA or HSLA. Tailwind CSS uses predefined color classes like bg-blue-500." },
    { q: "How does the palette generator work?", a: "It uses color theory to find harmonious combinations. From your color\u2019s hue on the color wheel, it calculates complementary (180\u00B0 opposite), analogous (nearby), triadic (120\u00B0 apart), and other harmonies. These mathematical relationships produce colors that naturally look good together." },
    { q: "Is my data private?", a: "Nothing leaves your browser. All color calculations, conversions, and image processing happen entirely in JavaScript on your device. No data is stored on any server." },
  ];

  const RELATED = [
    { name: "Pixel Art Editor", href: "/design-tools/pixel-art-editor", emoji: "\uD83C\uDFA8" },
    { name: "Image Compressor", href: "/image-tools/image-compressor", emoji: "\uD83D\uDDBC\uFE0F" },
    { name: "JSON Formatter", href: "/developer-tools/json-formatter", emoji: "\uD83D\uDD27" },
    { name: "Password Generator", href: "/utility-tools/password-generator", emoji: "\uD83D\uDD10" },
    { name: "QR Code Generator", href: "/utility-tools/qr-code-generator", emoji: "\uD83D\uDCF1" },
  ];

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: articleMode ? undefined : "100vh" }}>
      <div className="max-w-[1100px] mx-auto px-4" style={{ paddingTop: articleMode ? "0" : "32px", paddingBottom: "48px" }}>
        {!articleMode && (
          <>
            <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: C.muted }}>
              <a href="/" className="hover:underline" style={{ color: dark ? "#8BE9FD" : "#059669" }}>Home</a>
              <span>/</span><span>Design Tools</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-lg mb-8" style={{ color: C.muted }}>{subtitle}</p>
          </>
        )}

        {/* ─── Main Picker Area ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mb-8">
          {/* LEFT: Visual Picker */}
          <div>
            {/* Spectrum */}
            <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", border: `1px solid ${C.border}` }}>
              <canvas
                ref={spectrumRef}
                width={400}
                height={300}
                style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair", aspectRatio: "4/3" }}
                onPointerDown={(e) => { draggingSpectrum.current = true; handleSpectrumPointer(e); }}
              />
              {/* Indicator */}
              <div style={{ position: "absolute", left: `${hsv.s}%`, top: `${100 - hsv.v}%`, width: 16, height: 16, borderRadius: "50%", border: "2px solid white", boxShadow: "0 0 0 1px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.3)", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
            </div>

            {/* Hue strip */}
            <div style={{ position: "relative", marginTop: "12px", borderRadius: "8px", overflow: "hidden", border: `1px solid ${C.border}` }}>
              <canvas
                ref={hueRef}
                width={400}
                height={24}
                style={{ width: "100%", height: "24px", display: "block", cursor: "pointer" }}
                onPointerDown={(e) => { draggingHue.current = true; handleHuePointer(e); }}
              />
              <div style={{ position: "absolute", left: `${(hsv.h / 360) * 100}%`, top: "50%", width: 12, height: 24, borderRadius: "3px", border: "2px solid white", boxShadow: "0 0 0 1px rgba(0,0,0,0.3)", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
            </div>

            {/* Preview swatch */}
            <div style={{ marginTop: "12px", borderRadius: "12px", overflow: "hidden", height: "120px", background: hex, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: "20px", fontWeight: 700, color: textOnSwatch }}>{colorName}</div>
              <div style={{ fontSize: "16px", fontFamily: "monospace", color: textOnSwatch, opacity: 0.8, marginTop: "4px" }}>{hex}</div>
            </div>

            {/* Native picker + use current color for contrast */}
            <div className="flex gap-2 mt-3 flex-wrap">
              <button onClick={() => nativeInputRef.current?.click()} style={{ padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: `1px solid ${C.border}`, background: C.surface, color: C.text }}>
                {"\uD83D\uDDA5\uFE0F"} System Color Picker
              </button>
              <input ref={nativeInputRef} type="color" value={hex} onChange={e => setFromHex(e.target.value)} className="hidden" />
              <button onClick={() => { setFgHex(hex); setActiveTab("contrast"); }} style={{ padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: `1px solid ${C.border}`, background: C.surface, color: C.text }}>
                Use as Foreground
              </button>
              <button onClick={() => { setBgHex(hex); setActiveTab("contrast"); }} style={{ padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: `1px solid ${C.border}`, background: C.surface, color: C.text }}>
                Use as Background
              </button>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="mt-4">
                <div style={{ fontSize: "13px", color: C.muted, marginBottom: "6px" }}>Recent</div>
                <div className="flex gap-1.5 flex-wrap">{history.map(c => swatchBtn(c, 28))}</div>
              </div>
            )}

            {/* Quick presets */}
            <div className="mt-4">
              <div style={{ fontSize: "13px", color: C.muted, marginBottom: "6px" }}>Presets</div>
              <div className="flex gap-1.5 flex-wrap">{PRESET_COLORS.map(c => swatchBtn(c, 28))}</div>
            </div>
          </div>

          {/* RIGHT: Format Inputs */}
          <div className="space-y-3">
            {/* HEX */}
            <div style={cardStyle}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.muted }}>HEX</span>
                {copyBtn("hex")}
              </div>
              <input
                value={hexInput}
                onChange={e => {
                  const v = e.target.value;
                  setHexInput(v);
                  const clean = v.replace("#", "");
                  if (/^[0-9A-Fa-f]{6}$/.test(clean) || /^[0-9A-Fa-f]{3}$/.test(clean) || /^[0-9A-Fa-f]{8}$/.test(clean)) {
                    setFromHex(v);
                    lastPickerHex.current = rgbToHex(hexToRgb(v).r, hexToRgb(v).g, hexToRgb(v).b);
                  }
                }}
                style={{ ...inputStyle, fontSize: "18px" }}
                autoFocus={defaultFocusFormat === "hex"}
              />
            </div>

            {/* RGB */}
            <div style={cardStyle}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.muted }}>RGB</span>
                {copyBtn("rgb")}
              </div>
              <div className="flex gap-2">
                {(["r", "g", "b"] as const).map(ch => (
                  <div key={ch} className="flex-1">
                    <label style={{ fontSize: "11px", color: C.muted, textTransform: "uppercase" }}>{ch}</label>
                    <input type="number" min={0} max={255} value={rgb[ch]} onChange={e => { const v = Math.max(0, Math.min(255, +e.target.value || 0)); const newRgb = { ...rgb, [ch]: v }; setFromRgb(newRgb.r, newRgb.g, newRgb.b); }} style={smallInputStyle} autoFocus={defaultFocusFormat === "rgb" && ch === "r"} />
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "12px", fontFamily: "monospace", color: C.muted, marginTop: "6px" }}>rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
            </div>

            {/* HSL */}
            <div style={cardStyle}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.muted }}>HSL</span>
                {copyBtn("hsl")}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label style={{ fontSize: "11px", color: C.muted }}>H</label>
                  <input type="number" min={0} max={360} value={hsl.h} onChange={e => setFromHsl(Math.max(0, Math.min(360, +e.target.value || 0)), hsl.s, hsl.l)} style={smallInputStyle} autoFocus={defaultFocusFormat === "hsl"} />
                </div>
                <div className="flex-1">
                  <label style={{ fontSize: "11px", color: C.muted }}>S</label>
                  <input type="number" min={0} max={100} value={hsl.s} onChange={e => setFromHsl(hsl.h, Math.max(0, Math.min(100, +e.target.value || 0)), hsl.l)} style={smallInputStyle} />
                </div>
                <div className="flex-1">
                  <label style={{ fontSize: "11px", color: C.muted }}>L</label>
                  <input type="number" min={0} max={100} value={hsl.l} onChange={e => setFromHsl(hsl.h, hsl.s, Math.max(0, Math.min(100, +e.target.value || 0)))} style={smallInputStyle} />
                </div>
              </div>
              <div style={{ fontSize: "12px", fontFamily: "monospace", color: C.muted, marginTop: "6px" }}>hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
            </div>

            {/* HSV */}
            <div style={cardStyle}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.muted }}>HSV / HSB</span>
                {copyBtn("hsv")}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label style={{ fontSize: "11px", color: C.muted }}>H</label>
                  <input type="number" min={0} max={360} value={hsv.h} onChange={e => setHsv(prev => ({ ...prev, h: Math.max(0, Math.min(360, +e.target.value || 0)) }))} style={smallInputStyle} />
                </div>
                <div className="flex-1">
                  <label style={{ fontSize: "11px", color: C.muted }}>S</label>
                  <input type="number" min={0} max={100} value={hsv.s} onChange={e => setHsv(prev => ({ ...prev, s: Math.max(0, Math.min(100, +e.target.value || 0)) }))} style={smallInputStyle} />
                </div>
                <div className="flex-1">
                  <label style={{ fontSize: "11px", color: C.muted }}>V</label>
                  <input type="number" min={0} max={100} value={hsv.v} onChange={e => setHsv(prev => ({ ...prev, v: Math.max(0, Math.min(100, +e.target.value || 0)) }))} style={smallInputStyle} />
                </div>
              </div>
            </div>

            {/* CMYK */}
            <div style={cardStyle}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.muted }}>CMYK <span style={{ fontSize: "10px", fontWeight: 400 }}>(approx)</span></span>
                {copyBtn("cmyk")}
              </div>
              <div className="flex gap-2">
                {(["c", "m", "y", "k"] as const).map(ch => (
                  <div key={ch} className="flex-1">
                    <label style={{ fontSize: "11px", color: C.muted, textTransform: "uppercase" }}>{ch}</label>
                    <input type="number" min={0} max={100} value={cmyk[ch]} readOnly style={{ ...smallInputStyle, opacity: 0.7 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* RGBA */}
            <div style={cardStyle}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.muted }}>RGBA</span>
                {copyBtn("rgba")}
              </div>
              <div className="flex gap-2 items-end">
                <div style={{ fontSize: "12px", fontFamily: "monospace", color: C.muted }}>rgba({rgb.r}, {rgb.g}, {rgb.b},</div>
                <input type="number" min={0} max={1} step={0.01} value={alpha} onChange={e => setAlpha(Math.max(0, Math.min(1, +e.target.value || 0)))} style={{ ...smallInputStyle, width: "60px" }} autoFocus={defaultFocusFormat === "rgba"} />
                <div style={{ fontSize: "12px", fontFamily: "monospace", color: C.muted }}>)</div>
              </div>
            </div>

            {/* CSS Variable */}
            <div style={cardStyle}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "13px", fontWeight: 600, color: C.muted }}>CSS Variable</span>
                {copyBtn("css")}
              </div>
              <div style={{ fontSize: "14px", fontFamily: "monospace", color: C.text }}>--color: {hex};</div>
            </div>
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabBtn("contrast", "\u2696\uFE0F Contrast Checker")}
          {tabBtn("palette", "\uD83C\uDFA8 Palette Generator")}
          {tabBtn("image", "\uD83D\uDDBC\uFE0F Image Color Picker")}
        </div>

        {/* ─── Contrast Checker ─── */}
        {activeTab === "contrast" && (
          <div style={{ ...cardStyle, marginBottom: "24px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label style={{ fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "6px" }}>Foreground (Text)</label>
                <div className="flex gap-2 items-center">
                  <div style={{ width: 48, height: 48, borderRadius: "8px", background: fgHex, border: `1px solid ${C.border}`, flexShrink: 0 }} />
                  <input value={fgHex} onChange={e => { const v = e.target.value; setFgHex(v); }} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "6px" }}>Background</label>
                <div className="flex gap-2 items-center">
                  <div style={{ width: 48, height: 48, borderRadius: "8px", background: bgHex, border: `1px solid ${C.border}`, flexShrink: 0 }} />
                  <input value={bgHex} onChange={e => { const v = e.target.value; setBgHex(v); }} style={inputStyle} />
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <button onClick={() => { const tmp = fgHex; setFgHex(bgHex); setBgHex(tmp); }} style={{ padding: "6px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: `1px solid ${C.border}`, background: C.surface, color: C.text }}>{"\u21C4"} Swap</button>
            </div>

            {/* Live preview */}
            <div style={{ padding: "24px", borderRadius: "12px", background: bgHex, border: `1px solid ${C.border}`, marginBottom: "16px" }}>
              <p style={{ color: fgHex, fontSize: "24px", marginBottom: "8px" }}>The quick brown fox jumps over the lazy dog.</p>
              <p style={{ color: fgHex, fontSize: "18px", marginBottom: "8px" }}>The quick brown fox jumps over the lazy dog.</p>
              <p style={{ color: fgHex, fontSize: "14px", marginBottom: "4px" }}>The quick brown fox jumps over the lazy dog.</p>
              <p style={{ color: fgHex, fontSize: "12px" }}>The quick brown fox jumps over the lazy dog.</p>
            </div>

            {/* Ratio */}
            <div className="text-center mb-4">
              <div style={{ fontSize: "14px", color: C.muted, marginBottom: "4px" }}>Contrast Ratio</div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: contrastRatio >= 7 ? C.green : contrastRatio >= 4.5 ? "#50FA7B" : contrastRatio >= 3 ? "#FFB86C" : C.red }}>
                {contrastRatio.toFixed(2)}:1
              </div>
            </div>

            {/* WCAG results */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "AA Normal (\u22654.5:1)", pass: wcag.aa_normal },
                { label: "AA Large (\u22653:1)", pass: wcag.aa_large },
                { label: "AAA Normal (\u22657:1)", pass: wcag.aaa_normal },
                { label: "AAA Large (\u22654.5:1)", pass: wcag.aaa_large },
              ].map(item => (
                <div key={item.label} style={{ padding: "10px", borderRadius: "8px", background: item.pass ? C.green + "18" : C.red + "18", border: `1px solid ${item.pass ? C.green + "44" : C.red + "44"}`, textAlign: "center" }}>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: item.pass ? C.green : C.red }}>{item.pass ? "\u2705 PASS" : "\u274C FAIL"}</div>
                  <div style={{ fontSize: "12px", color: C.muted, marginTop: "2px" }}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* Suggestion */}
            {!wcag.aa_normal && (() => {
              const suggestion = suggestCompliant(fgRgb, bgRgb);
              if (!suggestion) return null;
              return (
                <div style={{ marginTop: "12px", padding: "12px", borderRadius: "8px", background: C.surfaceAlt, fontSize: "14px" }}>
                  <span style={{ color: C.muted }}>{"\uD83D\uDCA1"} Try </span>
                  <button onClick={() => setFgHex(suggestion.hex)} style={{ fontFamily: "monospace", fontWeight: 700, color: C.text, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>{suggestion.hex}</button>
                  <span style={{ color: C.muted }}> for AA compliance ({suggestion.ratio.toFixed(1)}:1)</span>
                </div>
              );
            })()}
          </div>
        )}

        {/* ─── Palette Generator ─── */}
        {activeTab === "palette" && (
          <div style={{ ...cardStyle, marginBottom: "24px" }}>
            <div className="flex flex-wrap gap-2 mb-4">
              {HARMONIES.map(h => harmonyBtn(h.id, h.label))}
            </div>

            {/* Palette swatches */}
            <div className="flex flex-wrap gap-3 mb-6">
              {paletteColors.map((c, i) => (
                <button key={i} onClick={() => setFromHex(c)} style={{ width: 80, borderRadius: "10px", overflow: "hidden", border: `2px solid ${c === hex ? C.text : C.border}`, cursor: "pointer", background: "none", padding: 0 }}>
                  <div style={{ height: 60, background: c }} />
                  <div style={{ padding: "6px", fontSize: "12px", fontFamily: "monospace", textAlign: "center", background: C.surface, color: C.text }}>{c}</div>
                </button>
              ))}
            </div>

            {/* Tints & Shades */}
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>Tints &amp; Shades</div>
              <div className="flex gap-1" style={{ overflowX: "auto" }}>
                {tintsAndShades.map((c, i) => (
                  <button key={i} onClick={() => setFromHex(c)} title={c} style={{ minWidth: 48, flex: 1, borderRadius: "6px", overflow: "hidden", border: `2px solid ${c === hex ? C.text : "transparent"}`, cursor: "pointer", background: "none", padding: 0 }}>
                    <div style={{ height: 40, background: c }} />
                    <div style={{ padding: "3px", fontSize: "10px", fontFamily: "monospace", textAlign: "center", color: C.muted }}>{["50", "100", "200", "300", "400", "500", "600", "700", "800"][i]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Image Color Picker ─── */}
        {activeTab === "image" && (
          <div style={{ ...cardStyle, marginBottom: "24px" }}>
            {!imgSrc ? (
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleImageUpload(f); }}
                onClick={() => { const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*"; inp.onchange = () => { if (inp.files?.[0]) handleImageUpload(inp.files[0]); }; inp.click(); }}
                style={{ padding: "48px", textAlign: "center", cursor: "pointer", borderRadius: "8px", border: `2px dashed ${C.border}` }}
              >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>{"\uD83D\uDDBC\uFE0F"}</div>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>Drop an image here or click to upload</div>
                <div style={{ fontSize: "13px", color: C.muted, marginTop: "4px" }}>PNG, JPG, GIF, WebP</div>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: "center", marginBottom: "12px" }}>
                  <canvas
                    ref={imgCanvasRef}
                    onClick={handleImageClick}
                    style={{ maxWidth: "100%", borderRadius: "8px", cursor: "crosshair", border: `1px solid ${C.border}` }}
                  />
                </div>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => { setImgSrc(null); setDominantColors([]); }} style={{ padding: "6px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: `1px solid ${C.border}`, background: C.surface, color: C.text }}>Upload Different Image</button>
                </div>
                {dominantColors.length > 0 && (
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>Dominant Colors</div>
                    <div className="flex flex-wrap gap-2">
                      {dominantColors.map((c, i) => (
                        <button key={i} onClick={() => setFromHex(c.hex)} style={{ borderRadius: "8px", overflow: "hidden", border: `2px solid ${C.border}`, cursor: "pointer", background: "none", padding: 0, width: 72 }}>
                          <div style={{ height: 48, background: c.hex }} />
                          <div style={{ padding: "4px", fontSize: "10px", fontFamily: "monospace", textAlign: "center", background: C.surface, color: C.muted }}>{c.hex}<br />{c.pct}%</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── FAQs ─── */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <details key={i} className="group" style={{ borderRadius: "10px", border: `1px solid ${C.border}`, background: C.surface }}>
                <summary className="cursor-pointer px-5 py-4 font-semibold" style={{ fontSize: "16px", listStyle: "none" }}>
                  <span className="flex items-center justify-between"><span>{faq.q}</span><span className="ml-2 transition-transform group-open:rotate-180" style={{ color: C.muted }}>{"\u25BC"}</span></span>
                </summary>
                <div className="px-5 pb-4" style={{ fontSize: "16px", lineHeight: 1.7, color: C.muted }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* ─── Related Tools ─── */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {RELATED.map(t => (
              <a key={t.href} href={t.href} className="block p-4 rounded-xl border hover:shadow-lg transition-shadow" style={{ background: C.surface, borderColor: C.border, textDecoration: "none", color: C.text }}>
                <span className="text-xl mr-2">{t.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: "15px" }}>{t.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
