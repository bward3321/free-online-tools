"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import QRCode from "qrcode";

/* ─── Types ─── */

type QrTab = "url" | "wifi" | "vcard" | "email" | "phone" | "sms" | "text" | "batch";

interface WifiData { ssid: string; password: string; encryption: string; hidden: boolean; }
interface VCardData { firstName: string; lastName: string; phone: string; email: string; org: string; title: string; url: string; street: string; city: string; state: string; zip: string; }
interface EmailData { to: string; subject: string; body: string; }

const TABS: { id: QrTab; label: string; icon: string }[] = [
  { id: "url", label: "URL", icon: "\u{1F517}" },
  { id: "wifi", label: "WiFi", icon: "\u{1F4F6}" },
  { id: "vcard", label: "vCard", icon: "\u{1F464}" },
  { id: "email", label: "Email", icon: "\u2709\uFE0F" },
  { id: "phone", label: "Phone", icon: "\u{1F4F1}" },
  { id: "sms", label: "SMS", icon: "\u{1F4AC}" },
  { id: "text", label: "Text", icon: "\u{1F4DD}" },
  { id: "batch", label: "Batch", icon: "\u{1F4E6}" },
];

const FG_PRESETS = [
  { color: "#000000", label: "Black" },
  { color: "#1e3a5f", label: "Navy" },
  { color: "#166534", label: "Green" },
  { color: "#991b1b", label: "Red" },
  { color: "#6b21a8", label: "Purple" },
];

const BG_PRESETS = [
  { color: "#FFFFFF", label: "White" },
  { color: "#F3F4F6", label: "Gray" },
  { color: "#FEF9C3", label: "Yellow" },
];

const SIZE_PRESETS = [
  { value: 256, label: "Small (256)" },
  { value: 512, label: "Medium (512)" },
  { value: 1024, label: "Large (1024)" },
  { value: 2048, label: "Print (2048)" },
];

const EC_LEVELS: { value: string; label: string; desc: string }[] = [
  { value: "L", label: "L — Low (7%)", desc: "Smallest code" },
  { value: "M", label: "M — Medium (15%)", desc: "Default" },
  { value: "Q", label: "Q — Quartile (25%)", desc: "Good balance" },
  { value: "H", label: "H — High (30%)", desc: "For logos" },
];

/* ─── Helpers ─── */

function escapeWifi(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/:/g, "\\:").replace(/,/g, "\\,").replace(/"/g, '\\"');
}

function buildWifiString(d: WifiData): string {
  let s = `WIFI:T:${d.encryption === "nopass" ? "nopass" : d.encryption};S:${escapeWifi(d.ssid)};`;
  if (d.encryption !== "nopass" && d.password) s += `P:${escapeWifi(d.password)};`;
  if (d.hidden) s += "H:true;";
  s += ";";
  return s;
}

function buildVCard(c: VCardData): string {
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `N:${c.lastName};${c.firstName}`, `FN:${c.firstName} ${c.lastName}`.trim()];
  if (c.org) lines.push(`ORG:${c.org}`);
  if (c.title) lines.push(`TITLE:${c.title}`);
  if (c.phone) lines.push(`TEL:${c.phone}`);
  if (c.email) lines.push(`EMAIL:${c.email}`);
  if (c.url) lines.push(`URL:${c.url}`);
  if (c.street || c.city || c.state || c.zip) lines.push(`ADR:;;${c.street};${c.city};${c.state};${c.zip};`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

function buildEmailString(d: EmailData): string {
  let s = `mailto:${d.to}`;
  const params: string[] = [];
  if (d.subject) params.push(`subject=${encodeURIComponent(d.subject)}`);
  if (d.body) params.push(`body=${encodeURIComponent(d.body)}`);
  if (params.length) s += "?" + params.join("&");
  return s;
}

function getContrastRatio(fg: string, bg: string): number {
  const lum = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const srgb = [r, g, b].map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  };
  const l1 = lum(fg), l2 = lum(bg);
  const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function sanitizeFilename(data: string): string {
  const clean = data.replace(/[^a-zA-Z0-9-_.]/g, "").slice(0, 20) || "code";
  return `qr-code-${clean}`;
}

/* ─── Sub-Components ─── */

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
    <button onClick={toggle} className="p-2 rounded-lg" style={{ color: "var(--text-muted)" }} aria-label="Toggle dark mode">
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
      )}
    </button>
  );
}

/* ─── Props ─── */
interface Props {
  title: string;
  subtitle: string;
  defaultTab?: QrTab;
  expandLogo?: boolean;
  articleMode?: boolean;
}

/* ─── Main Component ─── */
export default function QrCodeGenerator({ title, subtitle, defaultTab = "url", expandLogo = false, articleMode = false }: Props) {
  /* ── Tab & Input State ── */
  const [activeTab, setActiveTab] = useState<QrTab>(defaultTab);
  const [urlInput, setUrlInput] = useState("https://everyfreetool.com");
  const [wifiData, setWifiData] = useState<WifiData>({ ssid: "", password: "", encryption: "WPA", hidden: false });
  const [showPassword, setShowPassword] = useState(false);
  const [vcardData, setVcardData] = useState<VCardData>({ firstName: "", lastName: "", phone: "", email: "", org: "", title: "", url: "", street: "", city: "", state: "", zip: "" });
  const [showAddress, setShowAddress] = useState(false);
  const [emailData, setEmailData] = useState<EmailData>({ to: "", subject: "", body: "" });
  const [phoneInput, setPhoneInput] = useState("");
  const [smsPhone, setSmsPhone] = useState("");
  const [smsBody, setSmsBody] = useState("");
  const [textInput, setTextInput] = useState("");
  const [batchInput, setBatchInput] = useState("");

  /* ── Customization State ── */
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [transparentBg, setTransparentBg] = useState(false);
  const [ecLevel, setEcLevel] = useState("M");
  const [qrSize, setQrSize] = useState(1024);
  const [showCustomize, setShowCustomize] = useState(true);
  const [showAdvancedEC, setShowAdvancedEC] = useState(false);

  /* ── Logo State ── */
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const [logoScale, setLogoScale] = useState(0.2);
  const [showLogo, setShowLogo] = useState(expandLogo);

  /* ── UI State ── */
  const [copied, setCopied] = useState<string | null>(null);
  const [batchGenerating, setBatchGenerating] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Derive QR data string ── */
  const qrData = useMemo(() => {
    switch (activeTab) {
      case "url": {
        let u = urlInput.trim();
        if (u && !/^https?:\/\//i.test(u) && /\.\w/.test(u)) u = "https://" + u;
        return u;
      }
      case "wifi": return wifiData.ssid ? buildWifiString(wifiData) : "";
      case "vcard": return (vcardData.firstName || vcardData.lastName) ? buildVCard(vcardData) : "";
      case "email": return emailData.to ? buildEmailString(emailData) : "";
      case "phone": return phoneInput ? `tel:${phoneInput}` : "";
      case "sms": {
        if (!smsPhone) return "";
        let s = `sms:${smsPhone}`;
        if (smsBody) s += `?body=${encodeURIComponent(smsBody)}`;
        return s;
      }
      case "text": return textInput;
      case "batch": return ""; // batch handled separately
      default: return "";
    }
  }, [activeTab, urlInput, wifiData, vcardData, emailData, phoneInput, smsPhone, smsBody, textInput]);

  const dataLength = qrData.length;
  const contrastRatio = useMemo(() => getContrastRatio(fgColor, bgColor), [fgColor, bgColor]);
  const lowContrast = contrastRatio < 3;
  const effectiveEC = logoImage ? "H" : ecLevel;

  /* ── Render QR to preview canvas ── */
  const renderPreview = useCallback(async () => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !qrData) {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = 300;
          canvas.height = 300;
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, 300, 300);
          ctx.fillStyle = "#9b9ba6";
          ctx.font = "16px -apple-system, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("Enter content to", 150, 135);
          ctx.fillText("generate QR code", 150, 160);
        }
      }
      return;
    }
    try {
      const displaySize = 300;
      await QRCode.toCanvas(canvas, qrData, {
        width: displaySize,
        margin: 2,
        color: { dark: fgColor, light: transparentBg ? "#FFFFFF00" : bgColor },
        errorCorrectionLevel: effectiveEC as "L" | "M" | "Q" | "H",
      });
      if (logoImage) {
        const ctx = canvas.getContext("2d")!;
        const size = canvas.width * logoScale;
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;
        const pad = size * 0.12;
        ctx.fillStyle = transparentBg ? "#FFFFFF" : bgColor;
        ctx.beginPath();
        ctx.roundRect(x - pad, y - pad, size + pad * 2, size + pad * 2, 8);
        ctx.fill();
        ctx.drawImage(logoImage, x, y, size, size);
      }
    } catch {
      // QR generation can fail with certain data - silently ignore
    }
  }, [qrData, fgColor, bgColor, transparentBg, effectiveEC, logoImage, logoScale]);

  /* ── Debounced render on text input, instant on options ── */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(renderPreview, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [renderPreview]);

  /* ── Instant render on option changes ── */
  useEffect(() => { renderPreview(); }, [fgColor, bgColor, transparentBg, effectiveEC, logoImage, logoScale, renderPreview]);

  /* ── Logo file handling ── */
  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Logo must be under 2MB"); return; }
    setLogoFile(file);
    const img = new Image();
    img.onload = () => { setLogoImage(img); };
    img.src = URL.createObjectURL(file);
  }, []);

  const removeLogo = useCallback(() => {
    setLogoFile(null);
    setLogoImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  /* ── Download helpers ── */
  const renderFullSize = useCallback(async (): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement("canvas");
    if (!qrData) return canvas;
    await QRCode.toCanvas(canvas, qrData, {
      width: qrSize,
      margin: 2,
      color: { dark: fgColor, light: transparentBg ? "#FFFFFF00" : bgColor },
      errorCorrectionLevel: effectiveEC as "L" | "M" | "Q" | "H",
    });
    if (logoImage) {
      const ctx = canvas.getContext("2d")!;
      const size = canvas.width * logoScale;
      const x = (canvas.width - size) / 2;
      const y = (canvas.height - size) / 2;
      const pad = size * 0.12;
      ctx.fillStyle = transparentBg ? "#FFFFFF" : bgColor;
      ctx.beginPath();
      ctx.roundRect(x - pad, y - pad, size + pad * 2, size + pad * 2, 8);
      ctx.fill();
      ctx.drawImage(logoImage, x, y, size, size);
    }
    return canvas;
  }, [qrData, qrSize, fgColor, bgColor, transparentBg, effectiveEC, logoImage, logoScale]);

  const filename = useMemo(() => sanitizeFilename(qrData), [qrData]);

  const downloadPNG = useCallback(async () => {
    const canvas = await renderFullSize();
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [renderFullSize, filename]);

  const downloadJPEG = useCallback(async () => {
    const canvas = await renderFullSize();
    const link = document.createElement("a");
    link.download = `${filename}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  }, [renderFullSize, filename]);

  const downloadSVG = useCallback(async () => {
    if (!qrData) return;
    try {
      const svgString = await QRCode.toString(qrData, {
        type: "svg",
        width: qrSize,
        margin: 2,
        color: { dark: fgColor, light: transparentBg ? "none" : bgColor },
        errorCorrectionLevel: effectiveEC as "L" | "M" | "Q" | "H",
      });
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const link = document.createElement("a");
      link.download = `${filename}.svg`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } catch { /* ignore */ }
  }, [qrData, qrSize, fgColor, bgColor, transparentBg, effectiveEC, filename]);

  const copyToClipboard = useCallback(async () => {
    if (!qrData) return;
    try {
      const canvas = await renderFullSize();
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied("image");
        setTimeout(() => setCopied(null), 2000);
      });
    } catch { /* clipboard not available */ }
  }, [qrData, renderFullSize]);

  const copyLink = useCallback(() => {
    const params = new URLSearchParams();
    params.set("type", activeTab);
    params.set("data", qrData);
    if (fgColor !== "#000000") params.set("fg", fgColor.slice(1));
    if (bgColor !== "#FFFFFF") params.set("bg", bgColor.slice(1));
    if (effectiveEC !== "M") params.set("ec", effectiveEC);
    if (qrSize !== 1024) params.set("size", String(qrSize));
    const link = `https://everyfreetool.com/utility-tools/qr-code-generator#${params.toString()}`;
    navigator.clipboard.writeText(link);
    setCopied("link");
    setTimeout(() => setCopied(null), 2000);
  }, [activeTab, qrData, fgColor, bgColor, effectiveEC, qrSize]);

  /* ── Batch download ── */
  const batchUrls = useMemo(() => batchInput.split("\n").map(l => l.trim()).filter(Boolean).slice(0, 50), [batchInput]);

  const downloadBatchZip = useCallback(async () => {
    if (!batchUrls.length) return;
    setBatchGenerating(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (let i = 0; i < batchUrls.length; i++) {
        const url = batchUrls[i];
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, url, {
          width: qrSize,
          margin: 2,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: effectiveEC as "L" | "M" | "Q" | "H",
        });
        const blob = await new Promise<Blob>((res) => canvas.toBlob(b => res(b!), "image/png"));
        const fname = sanitizeFilename(url);
        zip.file(`${fname}-${i + 1}.png`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.download = "qr-codes-batch.zip";
      link.href = URL.createObjectURL(zipBlob);
      link.click();
      URL.revokeObjectURL(link.href);
    } finally {
      setBatchGenerating(false);
    }
  }, [batchUrls, qrSize, fgColor, bgColor, effectiveEC]);

  /* ── URL hash state restore ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    try {
      const params = new URLSearchParams(hash);
      if (params.get("type")) setActiveTab(params.get("type") as QrTab);
      if (params.get("data")) {
        const data = params.get("data")!;
        const type = params.get("type") || "url";
        if (type === "url") setUrlInput(data);
        else if (type === "text") setTextInput(data);
      }
      if (params.get("fg")) setFgColor("#" + params.get("fg"));
      if (params.get("bg")) setBgColor("#" + params.get("bg"));
      if (params.get("ec")) setEcLevel(params.get("ec")!);
      if (params.get("size")) setQrSize(Number(params.get("size")));
    } catch { /* ignore bad hash */ }
  }, []);

  /* ── Wifi field updater ── */
  const updateWifi = useCallback((field: keyof WifiData, value: string | boolean) => {
    setWifiData(prev => ({ ...prev, [field]: value }));
  }, []);

  /* ── vCard field updater ── */
  const updateVcard = useCallback((field: keyof VCardData, value: string) => {
    setVcardData(prev => ({ ...prev, [field]: value }));
  }, []);

  /* ── URL validation ── */
  const urlValid = useMemo(() => {
    if (!urlInput.trim()) return null;
    try { new URL(urlInput.trim().startsWith("http") ? urlInput.trim() : "https://" + urlInput.trim()); return true; } catch { return false; }
  }, [urlInput]);

  /* ── Responsive: collapse customize on mobile ── */
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setShowCustomize(false);
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)", ["--color-accent" as string]: "#2563EB" }}>
      {/* ─── Header ─── */}
      <header className="max-w-[1200px] mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <nav className="flex items-center gap-1" style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            <Link href="/" className="hover:underline" style={{ color: "#2563EB" }}>Home</Link>
            <span>/</span>
            <span>Utility Tools</span>
            <span>/</span>
            <span>{title}</span>
          </nav>
          <DarkModeToggle />
        </div>
        <h1 className="font-bold mb-2" style={{ fontSize: "clamp(28px, 5vw, 38px)", lineHeight: 1.15 }}>{title}</h1>
        <p className="mb-4" style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "750px" }}>{subtitle}</p>
        <div className="rounded-xl border px-4 py-3 mb-6 flex items-start gap-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <span style={{ fontSize: "18px" }}>&#x1F512;</span>
          <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text)" }}>100% private.</strong> All QR codes are generated in your browser. No data is ever sent to a server. WiFi passwords, contacts, and URLs never leave your device.
          </p>
        </div>
      </header>

      {/* ─── Main Layout ─── */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 items-start">

          {/* ─── INPUT PANEL ─── */}
          <div className="space-y-5">

            {/* QR Type Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold whitespace-nowrap flex-shrink-0 transition-colors"
                  style={{
                    backgroundColor: activeTab === tab.id ? "#2563EB" : "var(--surface)",
                    color: activeTab === tab.id ? "#fff" : "var(--text)",
                    border: activeTab === tab.id ? "none" : "1px solid var(--border)",
                    fontSize: "15px",
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* ── Tab-specific inputs ── */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>

              {/* URL Tab */}
              {activeTab === "url" && (
                <div>
                  <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Website URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={e => setUrlInput(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full rounded-xl border px-4 py-3 font-medium"
                      style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: urlValid === false ? "#DC2626" : "var(--border)", color: "var(--text)" }}
                      aria-label="URL to encode"
                    />
                    {urlValid === true && <span className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#16A34A", fontSize: "20px" }}>&#x2713;</span>}
                    {urlValid === false && <span className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#DC2626", fontSize: "20px" }}>&#x2717;</span>}
                  </div>
                  <p className="mt-1.5 flex justify-between" style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                    <span>Enter any URL to generate a QR code</span>
                    <span className="tabular-nums">{dataLength} / 4,296</span>
                  </p>
                </div>
              )}

              {/* WiFi Tab */}
              {activeTab === "wifi" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Network Name (SSID)</label>
                    <input type="text" value={wifiData.ssid} onChange={e => updateWifi("ssid", e.target.value)} placeholder="MyWiFiNetwork" className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="WiFi network name" />
                  </div>
                  <div>
                    <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={wifiData.password} onChange={e => updateWifi("password", e.target.value)} placeholder="WiFi password" disabled={wifiData.encryption === "nopass"} className="w-full rounded-xl border px-4 py-3 pr-16" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)", opacity: wifiData.encryption === "nopass" ? 0.5 : 1 }} aria-label="WiFi password" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-sm font-medium" style={{ color: "#2563EB" }}>{showPassword ? "Hide" : "Show"}</button>
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Encryption</label>
                    <div className="flex flex-wrap gap-2">
                      {[{ v: "WPA", l: "WPA/WPA2" }, { v: "WPA3", l: "WPA3" }, { v: "WEP", l: "WEP" }, { v: "nopass", l: "No Password" }].map(opt => (
                        <button key={opt.v} onClick={() => updateWifi("encryption", opt.v)} className="px-4 py-2 rounded-xl font-medium" style={{ backgroundColor: wifiData.encryption === opt.v ? "#2563EB" : "var(--bg)", color: wifiData.encryption === opt.v ? "#fff" : "var(--text)", border: wifiData.encryption === opt.v ? "none" : "1px solid var(--border)", fontSize: "15px" }}>{opt.l}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateWifi("hidden", !wifiData.hidden)} className="w-11 h-6 rounded-full relative" style={{ backgroundColor: wifiData.hidden ? "#2563EB" : "var(--border)" }} aria-label="Hidden network toggle">
                      <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: wifiData.hidden ? "22px" : "2px" }} />
                    </button>
                    <span style={{ fontSize: "16px" }}>Hidden Network</span>
                  </div>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Scan this QR code to instantly connect to WiFi. Works on iPhone (iOS 11+) and Android (10+).</p>
                </div>
              )}

              {/* vCard Tab */}
              {activeTab === "vcard" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1" style={{ fontSize: "16px" }}>First Name</label>
                      <input type="text" value={vcardData.firstName} onChange={e => updateVcard("firstName", e.target.value)} className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="First name" />
                    </div>
                    <div>
                      <label className="block font-bold mb-1" style={{ fontSize: "16px" }}>Last Name</label>
                      <input type="text" value={vcardData.lastName} onChange={e => updateVcard("lastName", e.target.value)} className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Last name" />
                    </div>
                  </div>
                  {[
                    { field: "phone" as const, label: "Phone Number", type: "tel", ph: "+1 (555) 123-4567" },
                    { field: "email" as const, label: "Email", type: "email", ph: "hello@example.com" },
                    { field: "org" as const, label: "Company / Organization", type: "text", ph: "Acme Corp" },
                    { field: "title" as const, label: "Job Title", type: "text", ph: "Marketing Director" },
                    { field: "url" as const, label: "Website", type: "url", ph: "https://example.com" },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="block font-bold mb-1" style={{ fontSize: "16px" }}>{f.label}</label>
                      <input type={f.type} value={vcardData[f.field]} onChange={e => updateVcard(f.field, e.target.value)} placeholder={f.ph} className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label={f.label} />
                    </div>
                  ))}
                  <button onClick={() => setShowAddress(!showAddress)} className="font-medium" style={{ color: "#2563EB", fontSize: "15px" }}>{showAddress ? "- Hide Address" : "+ Add Address"}</button>
                  {showAddress && (
                    <div className="space-y-3">
                      <div><label className="block font-bold mb-1" style={{ fontSize: "16px" }}>Street</label><input type="text" value={vcardData.street} onChange={e => updateVcard("street", e.target.value)} className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Street address" /></div>
                      <div className="grid grid-cols-3 gap-3">
                        <div><label className="block font-bold mb-1" style={{ fontSize: "16px" }}>City</label><input type="text" value={vcardData.city} onChange={e => updateVcard("city", e.target.value)} className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "16px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="City" /></div>
                        <div><label className="block font-bold mb-1" style={{ fontSize: "16px" }}>State</label><input type="text" value={vcardData.state} onChange={e => updateVcard("state", e.target.value)} className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "16px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="State" /></div>
                        <div><label className="block font-bold mb-1" style={{ fontSize: "16px" }}>ZIP</label><input type="text" value={vcardData.zip} onChange={e => updateVcard("zip", e.target.value)} className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "16px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="ZIP code" /></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Email Tab */}
              {activeTab === "email" && (
                <div className="space-y-4">
                  <div><label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Email Address</label><input type="email" value={emailData.to} onChange={e => setEmailData(p => ({ ...p, to: e.target.value }))} placeholder="hello@example.com" className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Email address" /></div>
                  <div><label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Subject <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(optional)</span></label><input type="text" value={emailData.subject} onChange={e => setEmailData(p => ({ ...p, subject: e.target.value }))} placeholder="Subject line" className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Email subject" /></div>
                  <div><label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Body <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(optional)</span></label><textarea value={emailData.body} onChange={e => setEmailData(p => ({ ...p, body: e.target.value }))} placeholder="Email body text" rows={3} className="w-full rounded-xl border px-4 py-3 resize-y" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Email body" /></div>
                </div>
              )}

              {/* Phone Tab */}
              {activeTab === "phone" && (
                <div>
                  <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Phone Number</label>
                  <input type="tel" value={phoneInput} onChange={e => setPhoneInput(e.target.value)} placeholder="+1 (555) 123-4567" className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Phone number" />
                  <p className="mt-1.5" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Scanning will initiate a phone call to this number.</p>
                </div>
              )}

              {/* SMS Tab */}
              {activeTab === "sms" && (
                <div className="space-y-4">
                  <div><label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Phone Number</label><input type="tel" value={smsPhone} onChange={e => setSmsPhone(e.target.value)} placeholder="+1 (555) 123-4567" className="w-full rounded-xl border px-4 py-3" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="SMS phone number" /></div>
                  <div><label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Pre-filled Message <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(optional)</span></label><textarea value={smsBody} onChange={e => setSmsBody(e.target.value)} placeholder="Hello!" rows={3} className="w-full rounded-xl border px-4 py-3 resize-y" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="SMS message" /></div>
                </div>
              )}

              {/* Text Tab */}
              {activeTab === "text" && (
                <div>
                  <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Plain Text</label>
                  <textarea value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Enter any text, serial number, code, or note..." rows={5} className="w-full rounded-xl border px-4 py-3 resize-y" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Plain text content" />
                  <p className="mt-1.5 text-right tabular-nums" style={{ fontSize: "15px", color: "var(--text-muted)" }}>{textInput.length} / 4,296 characters</p>
                </div>
              )}

              {/* Batch Tab */}
              {activeTab === "batch" && (
                <div>
                  <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Paste URLs (one per line, max 50)</label>
                  <textarea value={batchInput} onChange={e => setBatchInput(e.target.value)} placeholder={"https://example.com/page1\nhttps://example.com/page2\nhttps://example.com/page3"} rows={8} className="w-full rounded-xl border px-4 py-3 resize-y font-mono" style={{ fontSize: "16px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Batch URLs" />
                  <p className="mt-1.5 flex justify-between" style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                    <span>{batchUrls.length} URL{batchUrls.length !== 1 ? "s" : ""} detected</span>
                    <span>Max 50</span>
                  </p>
                  {batchUrls.length > 0 && (
                    <button onClick={downloadBatchZip} disabled={batchGenerating} className="w-full mt-4 py-3 rounded-xl font-bold text-white transition-colors" style={{ backgroundColor: "#16A34A", fontSize: "16px", opacity: batchGenerating ? 0.7 : 1 }}>
                      {batchGenerating ? "Generating ZIP..." : `Download All ${batchUrls.length} QR Codes as ZIP`}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ── Customization Panel ── */}
            {activeTab !== "batch" && (
              <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <button onClick={() => setShowCustomize(!showCustomize)} className="w-full flex items-center justify-between p-5 font-bold text-left" style={{ fontSize: "16px" }}>
                  <span>Customize Your QR Code</span>
                  <span style={{ fontSize: "20px", color: "var(--text-muted)" }}>{showCustomize ? "\u2212" : "+"}</span>
                </button>

                {showCustomize && (
                  <div className="px-5 pb-5 space-y-6">

                    {/* Colors */}
                    <div>
                      <h3 className="font-semibold mb-3" style={{ fontSize: "16px" }}>Colors</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Foreground (dark modules)</label>
                          <div className="flex items-center gap-2 mb-2">
                            <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg border cursor-pointer" style={{ borderColor: "var(--border)" }} aria-label="Foreground color" />
                            <input type="text" value={fgColor} onChange={e => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setFgColor(e.target.value); }} className="flex-1 rounded-lg border px-3 py-2 font-mono tabular-nums" style={{ fontSize: "15px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Foreground hex color" />
                          </div>
                          <div className="flex gap-1.5">
                            {FG_PRESETS.map(p => (
                              <button key={p.color} onClick={() => setFgColor(p.color)} className="w-7 h-7 rounded-md border-2" style={{ backgroundColor: p.color, borderColor: fgColor === p.color ? "#2563EB" : "transparent" }} aria-label={p.label} title={p.label} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block mb-2" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Background</label>
                          <div className="flex items-center gap-2 mb-2">
                            <input type="color" value={bgColor} onChange={e => { setBgColor(e.target.value); setTransparentBg(false); }} className="w-10 h-10 rounded-lg border cursor-pointer" style={{ borderColor: "var(--border)" }} aria-label="Background color" />
                            <input type="text" value={transparentBg ? "transparent" : bgColor} onChange={e => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) { setBgColor(e.target.value); setTransparentBg(false); } }} className="flex-1 rounded-lg border px-3 py-2 font-mono tabular-nums" style={{ fontSize: "15px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} aria-label="Background hex color" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              {BG_PRESETS.map(p => (
                                <button key={p.color} onClick={() => { setBgColor(p.color); setTransparentBg(false); }} className="w-7 h-7 rounded-md border-2" style={{ backgroundColor: p.color, borderColor: bgColor === p.color && !transparentBg ? "#2563EB" : "var(--border)" }} aria-label={p.label} title={p.label} />
                              ))}
                            </div>
                            <button onClick={() => setTransparentBg(!transparentBg)} className="px-2 py-1 rounded-md font-medium text-sm border" style={{ borderColor: transparentBg ? "#2563EB" : "var(--border)", color: transparentBg ? "#2563EB" : "var(--text-muted)", backgroundColor: transparentBg ? "#2563EB10" : "transparent" }}>Transparent</button>
                          </div>
                        </div>
                      </div>
                      {lowContrast && (
                        <div className="mt-3 flex items-start gap-2 rounded-lg p-3" style={{ backgroundColor: "#D977060d", border: "1px solid #D9770625" }}>
                          <span style={{ fontSize: "16px" }}>&#x26A0;&#xFE0F;</span>
                          <p style={{ fontSize: "15px", color: "#D97706" }}>Low contrast may cause scanning issues on some devices. We recommend a minimum 3:1 contrast ratio.</p>
                        </div>
                      )}
                    </div>

                    {/* Logo */}
                    <div>
                      <button onClick={() => setShowLogo(!showLogo)} className="font-semibold flex items-center gap-2" style={{ fontSize: "16px", color: "var(--text)" }}>
                        <span>{showLogo ? "\u25BE" : "\u25B8"}</span> Add Logo <span className="font-normal px-2 py-0.5 rounded text-sm" style={{ backgroundColor: "#16A34A20", color: "#16A34A" }}>Free</span>
                      </button>
                      {showLogo && (
                        <div className="mt-3 space-y-3">
                          <div className="flex items-center gap-3">
                            <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2.5 rounded-xl font-medium border" style={{ fontSize: "15px", borderColor: "var(--border)", color: "#2563EB" }}>
                              {logoFile ? "Change Logo" : "Upload Logo"}
                            </button>
                            {logoFile && (
                              <>
                                <span style={{ fontSize: "15px", color: "var(--text-muted)" }}>{logoFile.name}</span>
                                <button onClick={removeLogo} style={{ color: "#DC2626", fontSize: "15px" }}>Remove</button>
                              </>
                            )}
                            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleLogoUpload} className="hidden" aria-label="Upload logo image" />
                          </div>
                          {logoImage && (
                            <div>
                              <label className="block mb-1" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Logo Size ({Math.round(logoScale * 100)}%)</label>
                              <input type="range" min={0.15} max={0.3} step={0.01} value={logoScale} onChange={e => setLogoScale(Number(e.target.value))} className="w-full accent-[#2563EB]" aria-label="Logo size" />
                            </div>
                          )}
                          <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>PNG, JPG, or SVG. Max 2MB. Error correction automatically increases to Level H when a logo is added.</p>
                        </div>
                      )}
                    </div>

                    {/* Size */}
                    <div>
                      <h3 className="font-semibold mb-2" style={{ fontSize: "16px" }}>Download Size</h3>
                      <div className="flex items-center gap-3 mb-2">
                        <input type="range" min={200} max={2048} step={8} value={qrSize} onChange={e => setQrSize(Number(e.target.value))} className="flex-1 accent-[#2563EB]" aria-label="QR code download size" />
                        <span className="font-bold tabular-nums" style={{ fontSize: "16px", minWidth: "70px", textAlign: "right" }}>{qrSize}px</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {SIZE_PRESETS.map(p => (
                          <button key={p.value} onClick={() => setQrSize(p.value)} className="px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: qrSize === p.value ? "#2563EB" : "var(--bg)", color: qrSize === p.value ? "#fff" : "var(--text)", border: qrSize === p.value ? "none" : "1px solid var(--border)", fontSize: "15px" }}>{p.label}</button>
                        ))}
                      </div>
                      <p className="mt-2" style={{ fontSize: "15px", color: "var(--text-muted)" }}>For print, use 1024px or larger. For web/social, 512px is usually sufficient.</p>
                    </div>

                    {/* Error Correction (advanced) */}
                    <div>
                      <button onClick={() => setShowAdvancedEC(!showAdvancedEC)} className="font-semibold flex items-center gap-2" style={{ fontSize: "16px", color: "var(--text)" }}>
                        <span>{showAdvancedEC ? "\u25BE" : "\u25B8"}</span> Error Correction Level
                      </button>
                      {showAdvancedEC && (
                        <div className="mt-3 space-y-2">
                          {EC_LEVELS.map(level => (
                            <button
                              key={level.value}
                              onClick={() => setEcLevel(level.value)}
                              className="w-full text-left px-4 py-2.5 rounded-xl flex justify-between items-center"
                              style={{
                                backgroundColor: (logoImage ? "H" : ecLevel) === level.value ? "#2563EB15" : "var(--bg)",
                                border: (logoImage ? "H" : ecLevel) === level.value ? "1px solid #2563EB" : "1px solid var(--border)",
                                color: "var(--text)",
                                fontSize: "15px",
                              }}
                            >
                              <span className="font-medium">{level.label}</span>
                              <span style={{ fontSize: "15px", color: "var(--text-muted)" }}>{level.desc}</span>
                            </button>
                          ))}
                          {logoImage && <p style={{ fontSize: "15px", color: "#2563EB" }}>Locked to Level H when logo is added.</p>}
                          <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Higher error correction makes the QR more reliable but slightly larger.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── PREVIEW PANEL ─── */}
          <div className="lg:sticky lg:top-4 space-y-4" role="region" aria-live="polite">
            <div className="rounded-xl border p-6 flex flex-col items-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              {/* Canvas */}
              <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: transparentBg ? "var(--bg)" : "#fff", backgroundImage: transparentBg ? "repeating-conic-gradient(#e0e0e0 0% 25%, transparent 0% 50%) 50% / 16px 16px" : "none" }}>
                <canvas ref={previewCanvasRef} width={300} height={300} style={{ display: "block", maxWidth: "100%", height: "auto" }} />
              </div>

              {/* Scan status */}
              <p className="mb-4" style={{ fontSize: "15px", color: qrData ? "#16A34A" : "var(--text-muted)" }}>
                {qrData ? "\u2705 This QR code is scannable" : "\u26A0\uFE0F Content is empty"}
              </p>

              {/* Download buttons */}
              {activeTab !== "batch" && (
                <div className="w-full space-y-2">
                  <button onClick={downloadPNG} disabled={!qrData} className="w-full py-3.5 rounded-xl font-bold text-white transition-colors disabled:opacity-40" style={{ backgroundColor: "#16A34A", fontSize: "17px" }}>
                    Download PNG
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={downloadSVG} disabled={!qrData} className="py-3 rounded-xl font-bold border transition-colors disabled:opacity-40" style={{ borderColor: "var(--border)", color: "var(--text)", fontSize: "16px" }}>
                      SVG
                    </button>
                    <button onClick={downloadJPEG} disabled={!qrData} className="py-3 rounded-xl font-bold border transition-colors disabled:opacity-40" style={{ borderColor: "var(--border)", color: "var(--text)", fontSize: "16px" }}>
                      JPEG
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={copyToClipboard} disabled={!qrData} className="py-2.5 rounded-xl font-medium border transition-colors disabled:opacity-40" style={{ borderColor: "var(--border)", color: "var(--text)", fontSize: "15px" }}>
                      {copied === "image" ? "Copied!" : "Copy to Clipboard"}
                    </button>
                    <button onClick={copyLink} disabled={!qrData} className="py-2.5 rounded-xl font-medium border transition-colors disabled:opacity-40" style={{ borderColor: "var(--border)", color: "var(--text)", fontSize: "15px" }}>
                      {copied === "link" ? "Copied!" : "Copy Link to QR"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── CONTENT SECTIONS BELOW TOOL ─── */}
        <div className="mt-12 space-y-10">

          {/* Use Cases */}
          <section>
            <h2 className="font-bold mb-5" style={{ fontSize: "28px" }}>Popular QR Code Use Cases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "\u{1F37D}\uFE0F", title: "Restaurant Menus", desc: "Link to your digital menu. Update it anytime without reprinting." },
                { icon: "\u{1F4F6}", title: "WiFi Sharing", desc: "Let guests connect instantly \u2014 perfect for Airbnbs, offices, and caf\u00E9s." },
                { icon: "\u{1F4BC}", title: "Business Cards", desc: "Add a QR code linking to your LinkedIn, portfolio, or vCard." },
                { icon: "\u{1F4E6}", title: "Product Packaging", desc: "Link customers to instructions, warranty info, or reviews." },
                { icon: "\u{1F3AB}", title: "Event Tickets", desc: "Encode ticket info or link to event details for quick scanning." },
                { icon: "\u{1F4F1}", title: "App Downloads", desc: "Link directly to your App Store or Google Play listing." },
                { icon: "\u{1F3E0}", title: "Real Estate", desc: "Add QR codes to yard signs linking to virtual tours or listings." },
                { icon: "\u{1F4B3}", title: "Payment Links", desc: "Link to Venmo, PayPal, or payment pages for quick transactions." },
              ].map((c, i) => (
                <div key={i} className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <p style={{ fontSize: "28px", marginBottom: "8px" }}>{c.icon}</p>
                  <h3 className="font-bold mb-1" style={{ fontSize: "17px" }}>{c.title}</h3>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="font-bold mb-5" style={{ fontSize: "28px" }}>Pro Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "Always test your QR code before printing.", b: "Scan it with at least 2 different phones (iPhone + Android) before sending anything to print. Different cameras handle low contrast and small sizes differently. A 30-second test can save a $500 print run." },
                { t: "Use error correction level H for challenging environments.", b: "Level H can recover up to 30% of damaged data. This is required when adding a logo and recommended for curved surfaces, low-light environments, or partially obscured codes. For simple URLs on flat surfaces, Level M is fine." },
                { t: "For print, export SVG or use at least 1024px PNG.", b: "SVG is infinitely scalable \u2014 perfect for business cards, posters, or packaging of any size. If you must use PNG, use 1024px+ resolution to avoid pixelation when printed large." },
                { t: "Keep your QR code content short.", b: "Shorter URLs produce simpler QR codes with larger modules that are easier to scan. Use a URL shortener for long links. A 20-character URL produces a much more scannable code than a 200-character one." },
                { t: "WiFi QR codes are the most underused feature.", b: "Print your WiFi QR code and tape it to your router, frame it in your guest room, or add it to restaurant table tents. Guests scan once and they\u2019re connected \u2014 no more spelling out passwords." },
              ].map((tip, i) => (
                <div key={i} className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", borderLeftWidth: "4px", borderLeftColor: "#2563EB" }}>
                  <h3 className="font-bold mb-2" style={{ fontSize: "17px" }}>{tip.t}</h3>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.6 }}>{tip.b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          {!articleMode && (
            <article className="space-y-6">
              <section>
                <h2 className="font-bold mb-4" style={{ fontSize: "28px" }}>What Is a QR Code?</h2>
                <div className="space-y-4" style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--text-muted)" }}>
                  <p>
                    QR (Quick Response) codes are two-dimensional barcodes that store data in a grid of black and white squares. Invented in 1994 by Denso Wave, a subsidiary of Toyota, they were originally designed for tracking automotive parts during manufacturing. Today, QR codes are used globally for everything from restaurant menus and WiFi sharing to contactless payments and digital business cards.
                  </p>
                  <p>
                    A single QR code can store up to <strong style={{ color: "var(--text)" }}>4,296 alphanumeric characters</strong> or 7,089 numeric characters. They include built-in error correction technology, which means they can still be scanned correctly even when partially damaged, dirty, or obscured &mdash; a feature that makes logo embedding possible.
                  </p>
                  <p>
                    QR codes use four error correction levels: <strong style={{ color: "var(--text)" }}>L (7%)</strong>, <strong style={{ color: "var(--text)" }}>M (15%)</strong>, <strong style={{ color: "var(--text)" }}>Q (25%)</strong>, and <strong style={{ color: "var(--text)" }}>H (30%)</strong>. Level H can recover up to 30% of the code&apos;s data, which is why it&apos;s used when a logo covers part of the QR code. Higher error correction produces a slightly denser code but dramatically improves reliability.
                  </p>
                  <p>
                    Modern smartphones scan QR codes natively using the camera app &mdash; no separate scanning app is needed. iPhones have supported this since iOS 11 (2017) and Android devices since Android 9 (2018). Simply point your camera at a QR code and a notification appears with the encoded action.
                  </p>
                  <p>
                    The QR codes generated by this tool are <strong style={{ color: "var(--text)" }}>static codes</strong> &mdash; the data is encoded directly in the image. They never expire, don&apos;t depend on any external service, and work forever as long as the destination URL remains active. Unlike dynamic QR codes (which require a subscription service), static codes are completely free and self-contained.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-bold mb-4" style={{ fontSize: "28px" }}>How to Create a QR Code for Free</h2>
                <div className="space-y-4" style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--text-muted)" }}>
                  <p>
                    Creating a QR code with this tool takes seconds. First, select the type of QR code you need: URL, WiFi, vCard contact, email, phone, SMS, or plain text. Each type optimizes the encoding format for that specific use case.
                  </p>
                  <p>
                    Enter your content in the input fields. The QR code preview updates in real-time as you type. For URLs, the tool automatically validates the format and prepends &ldquo;https://&rdquo; if needed. For WiFi codes, enter your network name and password, and the tool handles the proper WiFi QR encoding format.
                  </p>
                  <p>
                    Customize your QR code with colors that match your brand, add your company logo (free &mdash; competitors charge $7-12/month for this), and choose your preferred download size. For print materials, use 1024px or larger; for web and social media, 512px is usually sufficient.
                  </p>
                  <p>
                    Download your QR code as PNG, SVG, or JPEG. SVG is the best choice for print because it&apos;s a vector format that scales to any size without losing quality. Always test your QR code by scanning it with a smartphone before printing &mdash; different cameras handle contrast and sizing differently.
                  </p>
                </div>
              </section>
            </article>
          )}

          {/* FAQs */}
          <section>
            <h2 className="font-bold mb-5" style={{ fontSize: "28px" }}>Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "Is this QR code generator really free?", a: "Yes, completely free with no signup, no watermarks, no download limits, and no expiration on generated codes. All features including logo embedding, color customization, SVG export, and batch generation are available at no cost. All processing happens in your browser \u2014 we don\u2019t store any of your data." },
                { q: "Do QR codes generated here expire?", a: "No. QR codes generated with this tool are static codes \u2014 the data is encoded directly in the image. They will work forever and don\u2019t depend on any external service. As long as the destination URL is active, the QR code will work." },
                { q: "What is the best format to download my QR code?", a: "For most uses, PNG is the best choice. For print materials like business cards, posters, or packaging, SVG is ideal because it\u2019s a vector format that scales to any size without losing quality. JPEG is smaller in file size but doesn\u2019t support transparency." },
                { q: "Can I add my company logo to the QR code?", a: "Yes, you can upload any PNG, JPG, or SVG logo and it will be placed in the center of the QR code. The tool automatically increases the error correction level to H (30%) when a logo is added, ensuring the code remains scannable even with the logo covering part of it. We recommend keeping the logo under 25% of the QR code\u2019s area." },
                { q: "How do I create a WiFi QR code?", a: "Click the WiFi tab, enter your network name (SSID), password, and select your encryption type (WPA/WPA2 is the most common). The tool generates a QR code that, when scanned by a smartphone, will prompt the user to connect to your WiFi network automatically. This works on iPhone (iOS 11+) and Android (10+)." },
                { q: "What is error correction and which level should I use?", a: "Error correction allows QR codes to be read even when partially damaged or obscured. Level L recovers 7% of data, M recovers 15%, Q recovers 25%, and H recovers 30%. Use Level M for most purposes. Use Level H when adding a logo, printing on curved surfaces, or in environments where the code might get dirty or damaged." },
                { q: "How small can I print a QR code?", a: "The minimum recommended print size is 2cm \u00D7 2cm (about 0.8 \u00D7 0.8 inches) for a QR code encoding a short URL. More complex codes with more data need to be larger. Always test by scanning from the intended viewing distance before mass printing." },
                { q: "Is my data safe? Do you store anything?", a: "All QR code generation happens entirely in your browser using JavaScript. No data is sent to any server. We don\u2019t store, log, or transmit any content you enter \u2014 including URLs, WiFi passwords, contact information, or uploaded logos. Close the tab and everything is gone." },
                { q: "What\u2019s the maximum amount of data a QR code can hold?", a: "A single QR code can store up to 4,296 alphanumeric characters or 7,089 numeric characters. However, more data means a more complex (denser) QR code that\u2019s harder to scan. For best results, keep content under 300 characters. For URLs, use a URL shortener if the link is very long." },
              ].map((faq, i) => (
                <details key={i} className="rounded-xl border overflow-hidden group" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <summary className="px-5 py-4 cursor-pointer font-semibold list-none flex items-center justify-between" style={{ fontSize: "17px" }}>
                    {faq.q}
                    <span className="ml-2 flex-shrink-0 text-lg" style={{ color: "var(--text-muted)" }}>+</span>
                  </summary>
                  <div className="px-5 pb-4" style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--text-muted)" }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="font-bold mb-5" style={{ fontSize: "28px" }}>Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Image Compressor", desc: "Compress, resize, and convert images. All formats supported.", href: "/image-tools/image-compressor" },
                { name: "True Hourly Rate Calculator", desc: "See what you actually earn per hour when you factor in commute and expenses.", href: "/business-tools/true-hourly-rate-calculator" },
                { name: "Subscription Calculator", desc: "Find out how much you really spend on subscriptions per year.", href: "/finance-tools/subscription-calculator" },
                { name: "Meeting Cost Calculator", desc: "Calculate how much your meetings actually cost the company.", href: "/business-tools/meeting-cost-calculator" },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} className="rounded-xl border p-5 block hover:opacity-80 transition-opacity" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-bold mb-1" style={{ fontSize: "17px", color: "#2563EB" }}>{tool.name}</h3>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{tool.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-8" style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            <p>100% free. No signup. No watermarks. All QR codes generated in your browser.</p>
            <p className="mt-1"><Link href="/" className="hover:underline" style={{ color: "#2563EB" }}>EveryFreeTool.com</Link></p>
          </footer>
        </div>
      </div>

      {/* Hidden download canvas */}
      <canvas ref={downloadCanvasRef} className="hidden" />

      {/* Screen reader */}
      <div className="sr-only" role="status" aria-live="polite">
        {qrData ? `QR code generated for ${activeTab} content. ${dataLength} characters encoded.` : "No content entered. Enter content to generate a QR code."}
      </div>
    </div>
  );
}
