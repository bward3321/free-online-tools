"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

/* ── types ── */
type GradientType = "linear" | "radial" | "conic" | "mesh";
type CodeTab = "css" | "tailwind" | "scss" | "vars";
type PreviewMode = "background" | "text" | "card" | "button";
type AnimType = "shift" | "hue" | "pulse";
interface Stop { color: string; pos: number; }
interface MeshPoint { x: number; y: number; color: string; }
interface Props {
  title: string;
  subtitle: string;
  articleMode?: boolean;
  defaultType?: GradientType;
  defaultCodeTab?: CodeTab;
  defaultPreviewMode?: PreviewMode;
  defaultAnimate?: boolean;
  defaultGallery?: boolean;
}

/* ── color utils ── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, "0")).join("");
}
function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => { const k = (n + h / 30) % 12; return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
  return rgbToHex(Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255));
}

/* ── presets ── */
interface Preset { name: string; stops: Stop[]; angle: number; cat: string; }
const PRESETS: Preset[] = [
  // Warm
  { name: "Sunrise Blaze", stops: [{ color: "#f12711", pos: 0 }, { color: "#f5af19", pos: 100 }], angle: 135, cat: "Warm" },
  { name: "Mango Tango", stops: [{ color: "#ffe259", pos: 0 }, { color: "#ffa751", pos: 100 }], angle: 90, cat: "Warm" },
  { name: "Coral Sunset", stops: [{ color: "#ff9a9e", pos: 0 }, { color: "#fad0c4", pos: 100 }], angle: 135, cat: "Warm" },
  { name: "Ember Glow", stops: [{ color: "#f83600", pos: 0 }, { color: "#f9d423", pos: 100 }], angle: 90, cat: "Warm" },
  { name: "Peach Fuzz", stops: [{ color: "#ffecd2", pos: 0 }, { color: "#fcb69f", pos: 100 }], angle: 135, cat: "Warm" },
  { name: "Warm Flame", stops: [{ color: "#ff9a9e", pos: 0 }, { color: "#fecfef", pos: 100 }], angle: 180, cat: "Warm" },
  { name: "Desert Mirage", stops: [{ color: "#c2185b", pos: 0 }, { color: "#ff6f00", pos: 100 }], angle: 45, cat: "Warm" },
  { name: "Papaya Whip", stops: [{ color: "#feac5e", pos: 0 }, { color: "#c779d0", pos: 50 }, { color: "#4bc0c8", pos: 100 }], angle: 135, cat: "Warm" },
  { name: "Golden Hour", stops: [{ color: "#f7971e", pos: 0 }, { color: "#ffd200", pos: 100 }], angle: 90, cat: "Warm" },
  { name: "Burnt Sienna", stops: [{ color: "#833ab4", pos: 0 }, { color: "#fd1d1d", pos: 50 }, { color: "#fcb045", pos: 100 }], angle: 45, cat: "Warm" },
  { name: "Campfire", stops: [{ color: "#a73737", pos: 0 }, { color: "#7a2828", pos: 100 }], angle: 180, cat: "Warm" },
  { name: "Autumn Leaves", stops: [{ color: "#d9453d", pos: 0 }, { color: "#f0a500", pos: 50 }, { color: "#2d7d46", pos: 100 }], angle: 90, cat: "Warm" },
  { name: "Volcano", stops: [{ color: "#eb3349", pos: 0 }, { color: "#f45c43", pos: 100 }], angle: 135, cat: "Warm" },
  { name: "Spiced Cider", stops: [{ color: "#e65c00", pos: 0 }, { color: "#f9d423", pos: 100 }], angle: 135, cat: "Warm" },
  { name: "Tangerine Dream", stops: [{ color: "#ff6a00", pos: 0 }, { color: "#ee0979", pos: 100 }], angle: 135, cat: "Warm" },
  // Cool
  { name: "Ocean Breeze", stops: [{ color: "#2193b0", pos: 0 }, { color: "#6dd5ed", pos: 100 }], angle: 135, cat: "Cool" },
  { name: "Arctic Ice", stops: [{ color: "#74ebd5", pos: 0 }, { color: "#acb6e5", pos: 100 }], angle: 135, cat: "Cool" },
  { name: "Deep Sea", stops: [{ color: "#0f0c29", pos: 0 }, { color: "#302b63", pos: 50 }, { color: "#24243e", pos: 100 }], angle: 180, cat: "Cool" },
  { name: "Frost", stops: [{ color: "#000428", pos: 0 }, { color: "#004e92", pos: 100 }], angle: 135, cat: "Cool" },
  { name: "Cool Blues", stops: [{ color: "#2193b0", pos: 0 }, { color: "#6dd5ed", pos: 100 }], angle: 90, cat: "Cool" },
  { name: "Midnight City", stops: [{ color: "#232526", pos: 0 }, { color: "#414345", pos: 100 }], angle: 180, cat: "Cool" },
  { name: "Steel Gray", stops: [{ color: "#1f1c2c", pos: 0 }, { color: "#928dab", pos: 100 }], angle: 135, cat: "Cool" },
  { name: "Electric Blue", stops: [{ color: "#0575e6", pos: 0 }, { color: "#021b79", pos: 100 }], angle: 135, cat: "Cool" },
  { name: "Royal Blue", stops: [{ color: "#536976", pos: 0 }, { color: "#292e49", pos: 100 }], angle: 180, cat: "Cool" },
  { name: "Aqua Marine", stops: [{ color: "#1a2980", pos: 0 }, { color: "#26d0ce", pos: 100 }], angle: 135, cat: "Cool" },
  { name: "Frozen Dreams", stops: [{ color: "#fdcbf1", pos: 0 }, { color: "#e6dee9", pos: 100 }], angle: 180, cat: "Cool" },
  { name: "Winter Neva", stops: [{ color: "#a1c4fd", pos: 0 }, { color: "#c2e9fb", pos: 100 }], angle: 135, cat: "Cool" },
  { name: "Blue Lagoon", stops: [{ color: "#43cea2", pos: 0 }, { color: "#185a9d", pos: 100 }], angle: 135, cat: "Cool" },
  { name: "Deep Space", stops: [{ color: "#000000", pos: 0 }, { color: "#434343", pos: 100 }], angle: 135, cat: "Cool" },
  { name: "Moonrise", stops: [{ color: "#0f2027", pos: 0 }, { color: "#203a43", pos: 50 }, { color: "#2c5364", pos: 100 }], angle: 135, cat: "Cool" },
  // Nature
  { name: "Forest", stops: [{ color: "#134e5e", pos: 0 }, { color: "#71b280", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Spring Meadow", stops: [{ color: "#b7f8db", pos: 0 }, { color: "#50a7c2", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Lush", stops: [{ color: "#56ab2f", pos: 0 }, { color: "#a8e063", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Emerald Water", stops: [{ color: "#348f50", pos: 0 }, { color: "#56b4d3", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Moss", stops: [{ color: "#4a6741", pos: 0 }, { color: "#8fb569", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Evergreen", stops: [{ color: "#11998e", pos: 0 }, { color: "#38ef7d", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Rainforest", stops: [{ color: "#0b8793", pos: 0 }, { color: "#360033", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Earth Tone", stops: [{ color: "#614385", pos: 0 }, { color: "#516395", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Sand Dune", stops: [{ color: "#c4a35a", pos: 0 }, { color: "#e7d9a8", pos: 100 }], angle: 90, cat: "Nature" },
  { name: "Cherry Blossom", stops: [{ color: "#fbc2eb", pos: 0 }, { color: "#a6c1ee", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Zen Garden", stops: [{ color: "#02aab0", pos: 0 }, { color: "#00cdac", pos: 100 }], angle: 90, cat: "Nature" },
  { name: "Tropical", stops: [{ color: "#c6ea8d", pos: 0 }, { color: "#fe90af", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Mint Fresh", stops: [{ color: "#00b09b", pos: 0 }, { color: "#96c93d", pos: 100 }], angle: 135, cat: "Nature" },
  { name: "Morning Dew", stops: [{ color: "#89f7fe", pos: 0 }, { color: "#66a6ff", pos: 100 }], angle: 135, cat: "Nature" },
  // Sunset
  { name: "California Sunset", stops: [{ color: "#e65c00", pos: 0 }, { color: "#f9d423", pos: 100 }], angle: 135, cat: "Sunset" },
  { name: "Purple Horizon", stops: [{ color: "#e8198b", pos: 0 }, { color: "#c7eafd", pos: 100 }], angle: 135, cat: "Sunset" },
  { name: "Pink Dusk", stops: [{ color: "#7f00ff", pos: 0 }, { color: "#e100ff", pos: 100 }], angle: 135, cat: "Sunset" },
  { name: "Burning Orange", stops: [{ color: "#ff416c", pos: 0 }, { color: "#ff4b2b", pos: 100 }], angle: 90, cat: "Sunset" },
  { name: "Sunrise", stops: [{ color: "#ff512f", pos: 0 }, { color: "#f09819", pos: 100 }], angle: 135, cat: "Sunset" },
  { name: "Cotton Candy Sunset", stops: [{ color: "#ee9ca7", pos: 0 }, { color: "#ffdde1", pos: 100 }], angle: 135, cat: "Sunset" },
  { name: "Blood Orange", stops: [{ color: "#d31027", pos: 0 }, { color: "#ea384d", pos: 100 }], angle: 90, cat: "Sunset" },
  { name: "Dusk", stops: [{ color: "#2c3e50", pos: 0 }, { color: "#fd746c", pos: 100 }], angle: 135, cat: "Sunset" },
  { name: "Rose Water", stops: [{ color: "#e55d87", pos: 0 }, { color: "#5fc3e4", pos: 100 }], angle: 135, cat: "Sunset" },
  { name: "Blush", stops: [{ color: "#b24592", pos: 0 }, { color: "#f15f79", pos: 100 }], angle: 135, cat: "Sunset" },
  { name: "Flare", stops: [{ color: "#f12711", pos: 0 }, { color: "#f5af19", pos: 100 }], angle: 45, cat: "Sunset" },
  // Pastel
  { name: "Cotton Candy", stops: [{ color: "#ffecd2", pos: 0 }, { color: "#fcb69f", pos: 50 }, { color: "#ee9ca7", pos: 100 }], angle: 135, cat: "Pastel" },
  { name: "Baby Blue", stops: [{ color: "#e0c3fc", pos: 0 }, { color: "#8ec5fc", pos: 100 }], angle: 135, cat: "Pastel" },
  { name: "Soft Lilac", stops: [{ color: "#c1dfc4", pos: 0 }, { color: "#deecdd", pos: 100 }], angle: 135, cat: "Pastel" },
  { name: "Gentle Pink", stops: [{ color: "#fbc2eb", pos: 0 }, { color: "#a18cd1", pos: 100 }], angle: 135, cat: "Pastel" },
  { name: "Peach", stops: [{ color: "#ffecd2", pos: 0 }, { color: "#fcb69f", pos: 100 }], angle: 135, cat: "Pastel" },
  { name: "Lavender Haze", stops: [{ color: "#e2b0ff", pos: 0 }, { color: "#9f44d3", pos: 100 }], angle: 180, cat: "Pastel" },
  { name: "Dreamy", stops: [{ color: "#ddd6f3", pos: 0 }, { color: "#faaca8", pos: 100 }], angle: 135, cat: "Pastel" },
  { name: "Fairy Dust", stops: [{ color: "#c2e59c", pos: 0 }, { color: "#64b3f4", pos: 100 }], angle: 135, cat: "Pastel" },
  { name: "Powder", stops: [{ color: "#d4fc79", pos: 0 }, { color: "#96e6a1", pos: 100 }], angle: 135, cat: "Pastel" },
  // Dark
  { name: "Obsidian", stops: [{ color: "#000000", pos: 0 }, { color: "#0f0f0f", pos: 50 }, { color: "#1a1a2e", pos: 100 }], angle: 180, cat: "Dark" },
  { name: "Charcoal", stops: [{ color: "#141e30", pos: 0 }, { color: "#243b55", pos: 100 }], angle: 135, cat: "Dark" },
  { name: "Void", stops: [{ color: "#0a0a0a", pos: 0 }, { color: "#1e1e2f", pos: 100 }], angle: 180, cat: "Dark" },
  { name: "Nighthawk", stops: [{ color: "#1a1a2e", pos: 0 }, { color: "#16213e", pos: 50 }, { color: "#0f3460", pos: 100 }], angle: 180, cat: "Dark" },
  { name: "Black Pearl", stops: [{ color: "#093028", pos: 0 }, { color: "#237a57", pos: 100 }], angle: 135, cat: "Dark" },
  { name: "Shadow", stops: [{ color: "#360033", pos: 0 }, { color: "#0b8793", pos: 100 }], angle: 135, cat: "Dark" },
  { name: "Onyx", stops: [{ color: "#232526", pos: 0 }, { color: "#414345", pos: 100 }], angle: 180, cat: "Dark" },
  { name: "Abyss", stops: [{ color: "#000046", pos: 0 }, { color: "#1cb5e0", pos: 100 }], angle: 135, cat: "Dark" },
  { name: "Dark Skies", stops: [{ color: "#4b6cb7", pos: 0 }, { color: "#182848", pos: 100 }], angle: 135, cat: "Dark" },
  { name: "Blackout", stops: [{ color: "#000000", pos: 0 }, { color: "#333333", pos: 100 }], angle: 135, cat: "Dark" },
  // Neon
  { name: "Neon Life", stops: [{ color: "#b3ffab", pos: 0 }, { color: "#12fff7", pos: 100 }], angle: 135, cat: "Neon" },
  { name: "Electric Violet", stops: [{ color: "#4776e6", pos: 0 }, { color: "#8e54e9", pos: 100 }], angle: 135, cat: "Neon" },
  { name: "Laser Lemon", stops: [{ color: "#fdfc47", pos: 0 }, { color: "#24fe41", pos: 100 }], angle: 135, cat: "Neon" },
  { name: "Cyberpunk", stops: [{ color: "#ff00cc", pos: 0 }, { color: "#333399", pos: 100 }], angle: 135, cat: "Neon" },
  { name: "Hot Pink", stops: [{ color: "#ff6a88", pos: 0 }, { color: "#ff99ac", pos: 100 }], angle: 90, cat: "Neon" },
  { name: "Neon Blue", stops: [{ color: "#1488cc", pos: 0 }, { color: "#2b32b2", pos: 100 }], angle: 135, cat: "Neon" },
  { name: "Rave", stops: [{ color: "#fc00ff", pos: 0 }, { color: "#00dbde", pos: 100 }], angle: 90, cat: "Neon" },
  { name: "Synthwave", stops: [{ color: "#e040fb", pos: 0 }, { color: "#00bcd4", pos: 100 }], angle: 135, cat: "Neon" },
  { name: "Plasma", stops: [{ color: "#7400b8", pos: 0 }, { color: "#6930c3", pos: 33 }, { color: "#5390d9", pos: 66 }, { color: "#48bfe3", pos: 100 }], angle: 90, cat: "Neon" },
  { name: "Neon Nights", stops: [{ color: "#00f260", pos: 0 }, { color: "#0575e6", pos: 100 }], angle: 135, cat: "Neon" },
  { name: "Glow", stops: [{ color: "#fc466b", pos: 0 }, { color: "#3f5efb", pos: 100 }], angle: 135, cat: "Neon" },
  { name: "UV Light", stops: [{ color: "#654ea3", pos: 0 }, { color: "#eaafc8", pos: 100 }], angle: 135, cat: "Neon" },
  // Monochrome
  { name: "Silver", stops: [{ color: "#bdc3c7", pos: 0 }, { color: "#2c3e50", pos: 100 }], angle: 135, cat: "Monochrome" },
  { name: "Titanium", stops: [{ color: "#283048", pos: 0 }, { color: "#859398", pos: 100 }], angle: 135, cat: "Monochrome" },
  { name: "Ash", stops: [{ color: "#606c88", pos: 0 }, { color: "#3f4c6b", pos: 100 }], angle: 135, cat: "Monochrome" },
  { name: "Slate", stops: [{ color: "#b8c6db", pos: 0 }, { color: "#f5f7fa", pos: 100 }], angle: 135, cat: "Monochrome" },
  { name: "Iron", stops: [{ color: "#485563", pos: 0 }, { color: "#29323c", pos: 100 }], angle: 135, cat: "Monochrome" },
  { name: "Mercury", stops: [{ color: "#e8e8e8", pos: 0 }, { color: "#c4c4c4", pos: 100 }], angle: 180, cat: "Monochrome" },
  { name: "Fog", stops: [{ color: "#accbee", pos: 0 }, { color: "#e7f0fd", pos: 100 }], angle: 135, cat: "Monochrome" },
  // Rainbow
  { name: "Full Rainbow", stops: [{ color: "#ff0000", pos: 0 }, { color: "#ff7700", pos: 20 }, { color: "#ffff00", pos: 40 }, { color: "#00ff00", pos: 60 }, { color: "#0000ff", pos: 80 }, { color: "#8b00ff", pos: 100 }], angle: 90, cat: "Rainbow" },
  { name: "Pastel Rainbow", stops: [{ color: "#a8edea", pos: 0 }, { color: "#fed6e3", pos: 25 }, { color: "#d4fc79", pos: 50 }, { color: "#96e6a1", pos: 75 }, { color: "#fbc2eb", pos: 100 }], angle: 90, cat: "Rainbow" },
  { name: "Warm Rainbow", stops: [{ color: "#f12711", pos: 0 }, { color: "#f5af19", pos: 33 }, { color: "#56ab2f", pos: 66 }, { color: "#2193b0", pos: 100 }], angle: 90, cat: "Rainbow" },
  { name: "Spectrum", stops: [{ color: "#f77062", pos: 0 }, { color: "#fe5196", pos: 25 }, { color: "#6c63ff", pos: 50 }, { color: "#3ec7e0", pos: 75 }, { color: "#7ee8fa", pos: 100 }], angle: 90, cat: "Rainbow" },
  { name: "Holographic", stops: [{ color: "#a8edea", pos: 0 }, { color: "#fed6e3", pos: 25 }, { color: "#e0c3fc", pos: 50 }, { color: "#8ec5fc", pos: 75 }, { color: "#a8edea", pos: 100 }], angle: 90, cat: "Rainbow" },
  // Popular
  { name: "Social Sunset", stops: [{ color: "#f09433", pos: 0 }, { color: "#e6683c", pos: 25 }, { color: "#dc2743", pos: 50 }, { color: "#cc2366", pos: 75 }, { color: "#bc1888", pos: 100 }], angle: 45, cat: "Popular" },
  { name: "Tech Purple", stops: [{ color: "#6441a5", pos: 0 }, { color: "#2a0845", pos: 100 }], angle: 135, cat: "Popular" },
  { name: "Startup Blue", stops: [{ color: "#0052d4", pos: 0 }, { color: "#4364f7", pos: 50 }, { color: "#6fb1fc", pos: 100 }], angle: 135, cat: "Popular" },
  { name: "SaaS Green", stops: [{ color: "#11998e", pos: 0 }, { color: "#38ef7d", pos: 100 }], angle: 135, cat: "Popular" },
  { name: "Creative Pink", stops: [{ color: "#f857a6", pos: 0 }, { color: "#ff5858", pos: 100 }], angle: 135, cat: "Popular" },
  { name: "Premium Gold", stops: [{ color: "#f7971e", pos: 0 }, { color: "#ffd200", pos: 100 }], angle: 135, cat: "Popular" },
  { name: "AI Gradient", stops: [{ color: "#667eea", pos: 0 }, { color: "#764ba2", pos: 100 }], angle: 135, cat: "Popular" },
];
const CATEGORIES = ["All", "Warm", "Cool", "Nature", "Sunset", "Pastel", "Dark", "Neon", "Monochrome", "Rainbow", "Popular"];

/* ── component ── */
export default function CssGradientGenerator({
  articleMode = false,
  defaultType = "linear",
  defaultCodeTab = "css",
  defaultPreviewMode = "background",
  defaultAnimate = false,
  defaultGallery = false,
}: Props) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
    const obs = new MutationObserver(() => setIsDark(html.classList.contains("dark")));
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const [type, setType] = useState<GradientType>(defaultType);
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([{ color: "#667eea", pos: 0 }, { color: "#764ba2", pos: 100 }]);
  const [selectedStop, setSelectedStop] = useState(0);
  const [codeTab, setCodeTab] = useState<CodeTab>(defaultCodeTab);
  const [previewMode, setPreviewMode] = useState<PreviewMode>(defaultPreviewMode);
  const [repeating, setRepeating] = useState(false);
  const [animate, setAnimate] = useState(defaultAnimate);
  const [animSpeed, setAnimSpeed] = useState(6);
  const [animType, setAnimType] = useState<AnimType>("shift");
  const [radialShape, setRadialShape] = useState<"circle" | "ellipse">("circle");
  const [radialX, setRadialX] = useState(50);
  const [radialY, setRadialY] = useState(50);
  const [meshPoints, setMeshPoints] = useState<MeshPoint[]>([
    { x: 20, y: 20, color: "#ff6b6b" }, { x: 80, y: 20, color: "#845ec2" },
    { x: 20, y: 80, color: "#00c9a7" }, { x: 80, y: 80, color: "#ffc75f" },
  ]);
  const [meshBlur, setMeshBlur] = useState(60);
  const [textContent, setTextContent] = useState("Gradient Text");
  const [textSize, setTextSize] = useState(64);
  const [textWeight, setTextWeight] = useState(700);
  const [gallerySearch, setGallerySearch] = useState("");
  const [galleryCat, setGalleryCat] = useState("All");
  const [showGallery, setShowGallery] = useState(defaultGallery);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toast, setToast] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);
  const stopsBarRef = useRef<HTMLDivElement>(null);

  // Show toast
  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2000); }, []);

  // Build gradient CSS string
  const gradientCss = useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.pos - b.pos);
    const stopsStr = sortedStops.map(s => `${s.color} ${s.pos}%`).join(", ");

    if (type === "linear") {
      const fn = repeating ? "repeating-linear-gradient" : "linear-gradient";
      return `${fn}(${angle}deg, ${stopsStr})`;
    }
    if (type === "radial") {
      const fn = repeating ? "repeating-radial-gradient" : "radial-gradient";
      return `${fn}(${radialShape} at ${radialX}% ${radialY}%, ${stopsStr})`;
    }
    if (type === "conic") {
      const fn = repeating ? "repeating-conic-gradient" : "conic-gradient";
      const conicStops = sortedStops.map(s => `${s.color} ${Math.round(s.pos * 3.6)}deg`).join(", ");
      return `${fn}(from ${angle}deg at ${radialX}% ${radialY}%, ${conicStops})`;
    }
    // mesh
    return meshPoints.map((p, i) => `radial-gradient(circle at ${p.x}% ${p.y}%, ${p.color} 0%, transparent ${meshBlur}%)`).join(", ");
  }, [type, angle, stops, repeating, radialShape, radialX, radialY, meshPoints, meshBlur]);

  // Preview style
  const previewStyle = useMemo((): React.CSSProperties => {
    const base: React.CSSProperties = { background: gradientCss };
    if (animate && type !== "mesh") {
      if (animType === "shift") {
        base.backgroundSize = "200% 200%";
        base.animation = `gradient-shift ${animSpeed}s ease infinite`;
      } else if (animType === "hue") {
        base.animation = `gradient-hue ${animSpeed}s linear infinite`;
      } else if (animType === "pulse") {
        base.animation = `gradient-pulse ${animSpeed}s ease-in-out infinite`;
      }
    }
    return base;
  }, [gradientCss, animate, animSpeed, animType, type]);

  // Code outputs
  const cssCode = useMemo(() => {
    let code = `background: ${gradientCss};`;
    if (previewMode === "text") {
      code += `\n-webkit-background-clip: text;\nbackground-clip: text;\n-webkit-text-fill-color: transparent;\ncolor: transparent;`;
    }
    if (animate && type !== "mesh") {
      if (animType === "shift") {
        code += `\nbackground-size: 200% 200%;\nanimation: gradient-shift ${animSpeed}s ease infinite;\n\n@keyframes gradient-shift {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}`;
      } else if (animType === "hue") {
        code += `\nanimation: gradient-hue ${animSpeed}s linear infinite;\n\n@keyframes gradient-hue {\n  0% { filter: hue-rotate(0deg); }\n  100% { filter: hue-rotate(360deg); }\n}`;
      } else if (animType === "pulse") {
        code += `\nanimation: gradient-pulse ${animSpeed}s ease-in-out infinite;\n\n@keyframes gradient-pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.7; }\n}`;
      }
    }
    return code;
  }, [gradientCss, previewMode, animate, animSpeed, animType, type]);

  const tailwindCode = useMemo(() => {
    if (type !== "linear" || stops.length > 3) return `/* Use inline style for complex gradients */\nstyle={{ background: "${gradientCss}" }}`;
    const dirMap: Record<number, string> = { 0: "bg-gradient-to-t", 45: "bg-gradient-to-tr", 90: "bg-gradient-to-r", 135: "bg-gradient-to-br", 180: "bg-gradient-to-b", 225: "bg-gradient-to-bl", 270: "bg-gradient-to-l", 315: "bg-gradient-to-tl" };
    const dir = dirMap[angle] || `bg-[linear-gradient(${angle}deg,...)]`;
    const from = `from-[${stops[0].color}]`;
    const to = `to-[${stops[stops.length - 1].color}]`;
    const via = stops.length === 3 ? ` via-[${stops[1].color}]` : "";
    if (!dirMap[angle]) return `/* Custom angle - use arbitrary value */\nbg-[${gradientCss.replace(/\s+/g, "_")}]`;
    return `${dir} ${from}${via} ${to}`;
  }, [type, angle, stops, gradientCss]);

  const scssCode = useMemo(() => {
    const vars = stops.map((s, i) => `$gradient-color-${i + 1}: ${s.color};`).join("\n");
    const stopsStr = stops.map((s, i) => `$gradient-color-${i + 1} ${s.pos}%`).join(", ");
    if (type === "linear") return `${vars}\n$gradient-angle: ${angle}deg;\n\nbackground: linear-gradient($gradient-angle, ${stopsStr});`;
    if (type === "radial") return `${vars}\n\nbackground: radial-gradient(${radialShape} at ${radialX}% ${radialY}%, ${stopsStr});`;
    return `${vars}\n\nbackground: ${gradientCss};`;
  }, [type, angle, stops, radialShape, radialX, radialY, gradientCss]);

  const varsCode = useMemo(() => {
    const vars = stops.map((s, i) => `  --gradient-color-${i + 1}: ${s.color};`).join("\n");
    const stopsStr = stops.map((s, i) => `var(--gradient-color-${i + 1}) ${s.pos}%`).join(", ");
    let val = "";
    if (type === "linear") val = `linear-gradient(var(--gradient-angle), ${stopsStr})`;
    else if (type === "radial") val = `radial-gradient(${radialShape} at ${radialX}% ${radialY}%, ${stopsStr})`;
    else val = gradientCss;
    return `:root {\n${vars}\n  --gradient-angle: ${angle}deg;\n}\n\n.gradient {\n  background: ${val};\n}`;
  }, [type, angle, stops, radialShape, radialX, radialY, gradientCss]);

  const codeOutput = useMemo(() => {
    switch (codeTab) {
      case "css": return cssCode;
      case "tailwind": return tailwindCode;
      case "scss": return scssCode;
      case "vars": return varsCode;
    }
  }, [codeTab, cssCode, tailwindCode, scssCode, varsCode]);

  // Actions
  const copy = useCallback(async (text: string) => { try { await navigator.clipboard.writeText(text); showToast("Copied!"); } catch {} }, [showToast]);

  const addStop = useCallback(() => {
    const sorted = [...stops].sort((a, b) => a.pos - b.pos);
    const lastTwo = sorted.slice(-2);
    const newPos = (lastTwo[0].pos + lastTwo[1].pos) / 2;
    const [r1, g1, b1] = hexToRgb(lastTwo[0].color);
    const [r2, g2, b2] = hexToRgb(lastTwo[1].color);
    const newColor = rgbToHex(Math.round((r1 + r2) / 2), Math.round((g1 + g2) / 2), Math.round((b1 + b2) / 2));
    setStops([...stops, { color: newColor, pos: Math.round(newPos) }]);
    setSelectedStop(stops.length);
  }, [stops]);

  const removeStop = useCallback((idx: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== idx));
    setSelectedStop(Math.min(selectedStop, stops.length - 2));
  }, [stops, selectedStop]);

  const reverseStops = useCallback(() => {
    setStops(stops.map(s => ({ ...s, pos: 100 - s.pos })));
  }, [stops]);

  const randomize = useCallback(() => {
    const baseHue = Math.random() * 360;
    const numStops = 2 + Math.floor(Math.random() * 3);
    const newStops: Stop[] = [];
    for (let i = 0; i < numStops; i++) {
      const hue = (baseHue + i * (360 / numStops) + Math.random() * 30 - 15) % 360;
      newStops.push({ color: hslToHex(hue, 50 + Math.random() * 50, 30 + Math.random() * 40), pos: Math.round((i / (numStops - 1)) * 100) });
    }
    setStops(newStops);
    setAngle(Math.floor(Math.random() * 8) * 45);
    setSelectedStop(0);
  }, []);

  const loadPreset = useCallback((p: Preset) => {
    setStops([...p.stops]);
    setAngle(p.angle);
    setType("linear");
    setSelectedStop(0);
  }, []);

  // Stops bar click
  const handleStopsBarClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stopsBarRef.current) return;
    const rect = stopsBarRef.current.getBoundingClientRect();
    const pos = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    if (pos < 0 || pos > 100) return;
    // Check if near existing stop
    const nearIdx = stops.findIndex(s => Math.abs(s.pos - pos) < 5);
    if (nearIdx >= 0) { setSelectedStop(nearIdx); return; }
    // Add new stop
    const [r1, g1, b1] = hexToRgb(stops[0].color);
    const [r2, g2, b2] = hexToRgb(stops[stops.length - 1].color);
    const t = pos / 100;
    const c = rgbToHex(Math.round(r1 + (r2 - r1) * t), Math.round(g1 + (g2 - g1) * t), Math.round(b1 + (b2 - b1) * t));
    setStops([...stops, { color: c, pos }]);
    setSelectedStop(stops.length);
  }, [stops]);

  // Preview click for radial/conic position
  const handlePreviewClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (type !== "radial" && type !== "conic") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setRadialX(Math.round(((e.clientX - rect.left) / rect.width) * 100));
    setRadialY(Math.round(((e.clientY - rect.top) / rect.height) * 100));
  }, [type]);

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) { previewRef.current?.requestFullscreen?.(); setIsFullscreen(true); }
    else { document.exitFullscreen?.(); setIsFullscreen(false); }
  }, [isFullscreen]);
  useEffect(() => {
    const handler = () => { if (!document.fullscreenElement) setIsFullscreen(false); };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Filtered presets
  const filteredPresets = useMemo(() => {
    let list = PRESETS;
    if (galleryCat !== "All") list = list.filter(p => p.cat === galleryCat);
    if (gallerySearch) { const q = gallerySearch.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)); }
    return list;
  }, [galleryCat, gallerySearch]);

  /* ── theme ── */
  const bg = isDark ? "#1a1a2e" : "#F8F7F5";
  const surface = isDark ? "#1f2937" : "#FFFFFF";
  const border = isDark ? "#374151" : "#E5E7EB";
  const text = isDark ? "#F3F4F6" : "#1F2937";
  const textMuted = isDark ? "#9CA3AF" : "#6B7280";
  const accent = "#059669";

  const animKeyframes = `@keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes gradient-hue { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
@keyframes gradient-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }`;

  const btnCls = "px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors";

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: text }}>
      <style dangerouslySetInnerHTML={{ __html: animKeyframes }} />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {!articleMode && (
          <nav className="flex items-center gap-1 text-sm mb-4" style={{ color: textMuted }}>
            <a href="/" className="hover:underline" style={{ color: accent }}>Home</a><span>/</span><span>Design Tools</span>
          </nav>
        )}

        {/* Type tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {(["linear", "radial", "conic", "mesh"] as GradientType[]).map(t => (
            <button key={t} onClick={() => setType(t)} className={btnCls}
              style={{ backgroundColor: type === t ? accent + "20" : "transparent", color: type === t ? accent : textMuted, border: `1px solid ${type === t ? accent + "50" : border}` }}>
              {t.charAt(0).toUpperCase() + t.slice(1)} {t === "mesh" && <span className="text-sm opacity-60 ml-1">Beta</span>}
            </button>
          ))}
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6">
          {/* Left: Preview + Controls */}
          <div>
            {/* Preview mode toggles */}
            <div className="flex gap-2 mb-3">
              {(["background", "text", "card", "button"] as PreviewMode[]).map(m => (
                <button key={m} onClick={() => setPreviewMode(m)} className="px-2.5 py-1 rounded font-semibold text-sm"
                  style={{ backgroundColor: previewMode === m ? accent + "20" : "transparent", color: previewMode === m ? accent : textMuted, border: `1px solid ${previewMode === m ? accent + "40" : border}` }}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
              <div className="flex-1" />
              <button onClick={toggleFullscreen} className="px-2 py-1 rounded text-sm" style={{ color: textMuted, border: `1px solid ${border}` }}>{"\u26F6"} Full</button>
            </div>

            {/* Preview box */}
            <div ref={previewRef} className="rounded-2xl overflow-hidden relative mb-4 cursor-crosshair"
              style={{ minHeight: "350px", backgroundImage: "linear-gradient(45deg, #80808020 25%, transparent 25%, transparent 75%, #80808020 75%), linear-gradient(45deg, #80808020 25%, transparent 25%, transparent 75%, #80808020 75%)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 10px 10px" }}
              onClick={handlePreviewClick}>
              <div className="absolute inset-0 flex items-center justify-center" style={previewStyle}>
                {previewMode === "text" && (
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: `${textSize}px`, fontWeight: textWeight, background: gradientCss, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent", padding: "20px", textAlign: "center" }}>
                    {textContent}
                  </span>
                )}
                {previewMode === "card" && (
                  <div className="rounded-xl p-8 text-white max-w-[300px]" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
                    <h3 className="text-xl font-bold mb-2">Card Title</h3>
                    <p className="text-sm opacity-90">A beautiful gradient card with frosted glass effect.</p>
                    <button className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold bg-white/20">Learn More</button>
                  </div>
                )}
                {previewMode === "button" && (
                  <button className="px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow" style={{ background: gradientCss }}>
                    Gradient Button
                  </button>
                )}
              </div>
              {(type === "radial" || type === "conic") && (
                <div className="absolute w-3 h-3 rounded-full border-2 border-white shadow-lg pointer-events-none" style={{ left: `${radialX}%`, top: `${radialY}%`, transform: "translate(-50%,-50%)" }} />
              )}
            </div>

            {/* Text controls */}
            {previewMode === "text" && (
              <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-xl border" style={{ backgroundColor: surface, borderColor: border }}>
                <input type="text" value={textContent} onChange={e => setTextContent(e.target.value)} className="col-span-2 px-3 py-2 rounded-lg border outline-none" style={{ backgroundColor: bg, borderColor: border, color: text }} placeholder="Enter text..." />
                <label className="flex items-center gap-2 text-sm"><span style={{ color: textMuted }}>Size: {textSize}px</span><input type="range" min={24} max={120} value={textSize} onChange={e => setTextSize(+e.target.value)} className="flex-1" /></label>
                <select value={textWeight} onChange={e => setTextWeight(+e.target.value)} className="px-2 py-1 rounded-lg border text-sm" style={{ backgroundColor: bg, borderColor: border, color: text }}>
                  <option value={400}>Regular</option><option value={500}>Medium</option><option value={600}>Semibold</option><option value={700}>Bold</option><option value={900}>Black</option>
                </select>
              </div>
            )}

            {/* Controls */}
            <div className="rounded-xl border p-4 space-y-4" style={{ backgroundColor: surface, borderColor: border }}>
              {/* Angle (linear/conic) */}
              {(type === "linear" || type === "conic") && (
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold" style={{ color: textMuted }}>Angle</label>
                  <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)} className="flex-1" />
                  <input type="number" min={0} max={360} value={angle} onChange={e => setAngle(+e.target.value)} className="w-16 px-2 py-1 rounded border text-center text-sm" style={{ backgroundColor: bg, borderColor: border, color: text }} />
                  <span className="text-sm" style={{ color: textMuted }}>deg</span>
                </div>
              )}

              {/* Direction presets */}
              {type === "linear" && (
                <div className="flex gap-1 flex-wrap">
                  {[{ l: "\u2192", a: 90 }, { l: "\u2190", a: 270 }, { l: "\u2193", a: 180 }, { l: "\u2191", a: 0 }, { l: "\u2198", a: 135 }, { l: "\u2197", a: 45 }, { l: "\u2199", a: 225 }, { l: "\u2196", a: 315 }].map(d => (
                    <button key={d.a} onClick={() => setAngle(d.a)} className="w-8 h-8 rounded-lg text-sm flex items-center justify-center"
                      style={{ backgroundColor: angle === d.a ? accent + "20" : "transparent", color: angle === d.a ? accent : textMuted, border: `1px solid ${angle === d.a ? accent + "40" : border}` }}>
                      {d.l}
                    </button>
                  ))}
                </div>
              )}

              {/* Radial controls */}
              {type === "radial" && (
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${border}` }}>
                    <button onClick={() => setRadialShape("circle")} className="px-3 py-1 text-sm" style={{ backgroundColor: radialShape === "circle" ? accent + "20" : "transparent", color: radialShape === "circle" ? accent : textMuted }}>Circle</button>
                    <button onClick={() => setRadialShape("ellipse")} className="px-3 py-1 text-sm" style={{ backgroundColor: radialShape === "ellipse" ? accent + "20" : "transparent", color: radialShape === "ellipse" ? accent : textMuted }}>Ellipse</button>
                  </div>
                  <label style={{ color: textMuted }}>X: <input type="number" min={0} max={100} value={radialX} onChange={e => setRadialX(+e.target.value)} className="w-14 px-1 py-0.5 rounded border text-center" style={{ backgroundColor: bg, borderColor: border, color: text }} />%</label>
                  <label style={{ color: textMuted }}>Y: <input type="number" min={0} max={100} value={radialY} onChange={e => setRadialY(+e.target.value)} className="w-14 px-1 py-0.5 rounded border text-center" style={{ backgroundColor: bg, borderColor: border, color: text }} />%</label>
                  <span className="text-sm italic" style={{ color: textMuted }}>Click preview to set position</span>
                </div>
              )}

              {/* Mesh controls */}
              {type === "mesh" && (
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm"><span style={{ color: textMuted }}>Blur: {meshBlur}%</span><input type="range" min={20} max={100} value={meshBlur} onChange={e => setMeshBlur(+e.target.value)} className="flex-1" /></label>
                  <div className="grid grid-cols-2 gap-2">
                    {meshPoints.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: bg }}>
                        <input type="color" value={p.color} onChange={e => { const n = [...meshPoints]; n[i] = { ...n[i], color: e.target.value }; setMeshPoints(n); }} className="w-8 h-8 rounded cursor-pointer" style={{ border: "none" }} />
                        <span style={{ color: textMuted }}>Point {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color stops bar */}
              {type !== "mesh" && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold" style={{ color: textMuted }}>Color Stops</span>
                    <div className="flex-1" />
                    <button onClick={addStop} className="px-2 py-1 text-sm rounded" style={{ color: accent, border: `1px solid ${accent}40` }}>+ Add</button>
                    <button onClick={reverseStops} className="px-2 py-1 text-sm rounded" style={{ color: textMuted, border: `1px solid ${border}` }}>{"\u21C4"} Reverse</button>
                    <button onClick={randomize} className="px-2 py-1 text-sm rounded" style={{ color: textMuted, border: `1px solid ${border}` }}>{"\uD83C\uDFB2"} Random</button>
                  </div>
                  {/* Visual bar */}
                  <div ref={stopsBarRef} className="h-8 rounded-lg relative cursor-pointer mb-3" style={{ background: `linear-gradient(90deg, ${[...stops].sort((a, b) => a.pos - b.pos).map(s => `${s.color} ${s.pos}%`).join(", ")})` }} onClick={handleStopsBarClick}>
                    {stops.map((s, i) => (
                      <div key={i} className="absolute top-0 w-4 h-8 -translate-x-1/2 cursor-grab" style={{ left: `${s.pos}%` }} onClick={e => { e.stopPropagation(); setSelectedStop(i); }}>
                        <div className="w-4 h-8 rounded-sm border-2 shadow-md" style={{ backgroundColor: s.color, borderColor: selectedStop === i ? "#FFF" : "#FFF8", boxShadow: selectedStop === i ? "0 0 0 2px " + accent : "none" }} />
                      </div>
                    ))}
                  </div>
                  {/* Selected stop editor */}
                  <div className="flex flex-wrap items-center gap-3">
                    <input type="color" value={stops[selectedStop]?.color || "#000000"} onChange={e => { const n = [...stops]; n[selectedStop] = { ...n[selectedStop], color: e.target.value }; setStops(n); }} className="w-10 h-10 rounded-lg cursor-pointer" style={{ border: `2px solid ${border}` }} />
                    <input type="text" value={stops[selectedStop]?.color || ""} onChange={e => { const n = [...stops]; n[selectedStop] = { ...n[selectedStop], color: e.target.value }; setStops(n); }} className="w-24 px-2 py-1.5 rounded-lg border text-sm font-mono" style={{ backgroundColor: bg, borderColor: border, color: text }} />
                    <label style={{ color: textMuted }}>Position: <input type="number" min={0} max={100} value={stops[selectedStop]?.pos || 0} onChange={e => { const n = [...stops]; n[selectedStop] = { ...n[selectedStop], pos: +e.target.value }; setStops(n); }} className="w-14 px-1 py-1 rounded border text-center" style={{ backgroundColor: bg, borderColor: border, color: text }} />%</label>
                    {stops.length > 2 && <button onClick={() => removeStop(selectedStop)} className="px-2 py-1 text-sm rounded" style={{ color: "#EF4444", border: "1px solid #EF444440" }}>{"\u2715"} Remove</button>}
                  </div>
                </div>
              )}

              {/* Global toggles */}
              <div className="flex flex-wrap gap-4 pt-2" style={{ borderTop: `1px solid ${border}` }}>
                {type !== "mesh" && (
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={repeating} onChange={e => setRepeating(e.target.checked)} className="accent-emerald-600" />
                    <span style={{ color: textMuted }}>Repeating</span>
                  </label>
                )}
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={animate} onChange={e => setAnimate(e.target.checked)} className="accent-emerald-600" />
                  <span style={{ color: textMuted }}>Animate</span>
                </label>
                {animate && (
                  <>
                    <select value={animType} onChange={e => setAnimType(e.target.value as AnimType)} className="px-2 py-1 text-sm rounded border" style={{ backgroundColor: bg, borderColor: border, color: text }}>
                      <option value="shift">Shift</option><option value="hue">Hue Rotate</option><option value="pulse">Pulse</option>
                    </select>
                    <label className="flex items-center gap-1 text-sm" style={{ color: textMuted }}>Speed: <input type="range" min={2} max={15} value={animSpeed} onChange={e => setAnimSpeed(+e.target.value)} className="w-20" /> {animSpeed}s</label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Code + Gallery */}
          <div>
            {/* Code tabs */}
            <div className="flex gap-1 mb-2">
              {(["css", "tailwind", "scss", "vars"] as CodeTab[]).map(t => (
                <button key={t} onClick={() => setCodeTab(t)} className="px-3 py-1.5 rounded-lg font-semibold text-sm"
                  style={{ backgroundColor: codeTab === t ? accent + "20" : "transparent", color: codeTab === t ? accent : textMuted, border: `1px solid ${codeTab === t ? accent + "40" : border}` }}>
                  {t === "vars" ? "CSS Vars" : t.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="rounded-xl border overflow-hidden mb-6" style={{ backgroundColor: isDark ? "#0f172a" : "#1e293b", borderColor: border }}>
              <pre className="p-4 overflow-x-auto text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#e2e8f0", lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                {codeOutput}
              </pre>
              <div className="flex justify-end px-3 pb-3">
                <button onClick={() => copy(codeOutput)} className={btnCls} style={{ backgroundColor: accent + "20", color: accent, border: `1px solid ${accent}40` }}>Copy Code</button>
              </div>
            </div>

            {/* Gallery toggle */}
            <button onClick={() => setShowGallery(!showGallery)} className="w-full py-3 rounded-xl text-sm font-semibold mb-4"
              style={{ backgroundColor: surface, color: accent, border: `1px solid ${border}` }}>
              {showGallery ? "Hide" : "Show"} Preset Gallery ({PRESETS.length} gradients)
            </button>

            {/* Gallery */}
            {showGallery && (
              <div className="rounded-xl border p-4" style={{ backgroundColor: surface, borderColor: border }}>
                <input type="text" value={gallerySearch} onChange={e => setGallerySearch(e.target.value)} placeholder="Search gradients..." className="w-full px-3 py-2 rounded-lg border outline-none mb-3 text-sm" style={{ backgroundColor: bg, borderColor: border, color: text }} />
                <div className="flex gap-1 flex-wrap mb-3">
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setGalleryCat(c)} className="px-2 py-0.5 rounded-full text-sm"
                      style={{ backgroundColor: galleryCat === c ? accent + "20" : "transparent", color: galleryCat === c ? accent : textMuted, border: `1px solid ${galleryCat === c ? accent + "40" : border}` }}>
                      {c}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto">
                  {filteredPresets.map((p, i) => (
                    <button key={i} onClick={() => loadPreset(p)} className="rounded-lg overflow-hidden hover:ring-2 hover:ring-emerald-500 transition-all group" title={p.name}>
                      <div className="h-16" style={{ background: `linear-gradient(${p.angle}deg, ${p.stops.map(s => `${s.color} ${s.pos}%`).join(", ")})` }} />
                      <div className="text-sm py-1 px-1 truncate text-center" style={{ color: textMuted }}>{p.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-semibold" style={{ backgroundColor: accent, color: "#FFF" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
