"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/* ── Types ── */
type Direction = "encode" | "decode";
type Mode = "text" | "file";

interface FileResult {
  dataURI: string;
  raw: string;
  mimeType: string;
  fileName: string;
  fileSize: number;
  base64Size: number;
  isImage: boolean;
}

interface Props {
  title?: string;
  subtitle?: string;
  defaultMode?: Mode;
  defaultDirection?: Direction;
  articleMode?: boolean;
}

/* ── Utility functions ── */

function encodeBase64(str: string, opts: { urlSafe?: boolean; lineBreaks?: boolean; padding?: boolean } = {}): string {
  const { urlSafe = false, lineBreaks = false, padding = true } = opts;
  const bytes = new TextEncoder().encode(str);
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  let b64 = btoa(bin);
  if (urlSafe) b64 = b64.replace(/\+/g, "-").replace(/\//g, "_");
  if (!padding) b64 = b64.replace(/=+$/, "");
  if (lineBreaks) b64 = (b64.match(/.{1,76}/g) || []).join("\n");
  return b64;
}

function decodeBase64(b64: string, opts: { urlSafe?: boolean } = {}): { ok: true; result: string } | { ok: false; error: string } {
  let s = b64.trim();
  if (opts.urlSafe) s = s.replace(/-/g, "+").replace(/_/g, "/");
  s = s.replace(/\s/g, "");
  while (s.length % 4 !== 0) s += "=";
  try {
    const bin = atob(s);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return { ok: true, result: new TextDecoder().decode(bytes) };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

function fmtBytes(n: number): string {
  if (n === 0) return "0 B";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

const EXT_MAP: Record<string, string> = {
  "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif",
  "image/svg+xml": "svg", "image/webp": "webp", "image/x-icon": "ico",
  "application/pdf": "pdf", "application/json": "json", "text/plain": "txt",
  "text/csv": "csv", "text/html": "html", "text/css": "css",
  "application/javascript": "js", "font/woff2": "woff2",
};

/* ── Colors ── */
const C = { accent: "#8BE9FD", encode: "#50FA7B", decode: "#BD93F9", error: "#FF5555" };

/* ── FAQs ── */
const FAQS = [
  { q: "Is my data safe? Does anything get sent to a server?", a: "No. All encoding and decoding happens entirely in your browser using JavaScript. No data is transmitted to any server, stored, or logged. This is safe for encoding sensitive data like API keys, authentication tokens, and personal information." },
  { q: "What is Base64 encoding?", a: "Base64 is a binary-to-text encoding scheme that converts binary data into a string of ASCII characters using a 64-character alphabet (A-Z, a-z, 0-9, +, /). It\u2019s used whenever binary data needs to be transmitted or stored in a text-only format." },
  { q: "Is Base64 the same as encryption?", a: "No. Base64 is encoding, not encryption. It provides zero security \u2014 anyone can decode a Base64 string instantly. If you need to protect sensitive data, use proper encryption (AES, RSA) and then optionally Base64-encode the encrypted output." },
  { q: "Why does Base64 increase file size by 33%?", a: "Base64 converts every 3 bytes of input into 4 bytes of output. The encoded output is always approximately 4/3 the size of the input \u2014 about 33% larger." },
  { q: "What is URL-safe Base64?", a: "Standard Base64 uses + and / which have special meaning in URLs. URL-safe Base64 replaces + with - and / with _ and typically omits trailing = padding. This variant is used in JWT tokens, URL query parameters, and filenames." },
  { q: "Can I convert an image to Base64?", a: "Yes. Switch to the File/Image tab, then drag and drop an image or click to upload. The tool outputs the raw Base64 string, a complete data URI, an HTML img tag, and a CSS background-image rule \u2014 all with one-click copy buttons." },
  { q: "What file types can I encode?", a: "Any file type. While images (PNG, JPG, GIF, SVG, WebP) are the most common, you can encode PDFs, fonts, JSON, text files, or any binary data. The tool auto-detects the MIME type." },
  { q: "Does this support UTF-8 and emoji?", a: "Yes. Unlike many Base64 tools that only handle ASCII, this tool fully supports UTF-8 including emoji, CJK characters, Arabic, Cyrillic, accented characters, and any other Unicode text." },
  { q: "What\u2019s the maximum file size?", a: "The tool handles files up to 10 MB. The resulting Base64 string will be about 33% larger (~13.3 MB for a 10 MB file). For very large files, consider encoding on the server side." },
];

/* ── Related tools ── */
const RELATED = [
  { href: "/developer-tools/json-formatter", emoji: "\uD83D\uDD27", title: "JSON Formatter & Validator", desc: "Format, validate, and convert JSON" },
  { href: "/utility-tools/password-generator", emoji: "\uD83D\uDD10", title: "Password Generator", desc: "Generate strong passwords and passphrases" },
  { href: "/utility-tools/qr-code-generator", emoji: "\uD83D\uDCF1", title: "QR Code Generator", desc: "Create custom QR codes with logos" },
  { href: "/image-tools/image-compressor", emoji: "\uD83D\uDDBC\uFE0F", title: "Image Compressor", desc: "Compress, resize, and convert images" },
];

const DATA_URI_PREFIXES = [
  "data:image/png;base64,", "data:image/jpeg;base64,", "data:image/gif;base64,",
  "data:image/svg+xml;base64,", "data:image/webp;base64,", "data:application/pdf;base64,",
  "data:application/json;base64,", "data:text/plain;base64,", "data:text/html;base64,",
  "data:text/css;base64,", "data:font/woff2;base64,",
];

const MONO = `"JetBrains Mono","Fira Code","Cascadia Code",Consolas,Monaco,monospace`;

/* ── Component ── */

export default function Base64EncoderDecoder({
  title = "Base64 Encoder & Decoder",
  subtitle = "Encode and decode Base64 text, files, and images instantly.",
  defaultMode = "text",
  defaultDirection = "encode",
  articleMode = false,
}: Props) {
  const [dark, setDark] = useState(true);
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [dir, setDir] = useState<Direction>(defaultDirection);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [urlSafe, setUrlSafe] = useState(false);
  const [lineBreaks, setLineBreaks] = useState(false);
  const [padding, setPadding] = useState(true);
  const [showOpts, setShowOpts] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [fileResult, setFileResult] = useState<FileResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [decInput, setDecInput] = useState("");
  const [decPreview, setDecPreview] = useState<string | null>(null);
  const [decMime, setDecMime] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Theme ── */
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* ── Real-time text conversion ── */
  useEffect(() => {
    if (mode !== "text") return;
    if (!input) { setOutput(""); setError(null); return; }
    const t = setTimeout(() => {
      if (dir === "encode") {
        try { setOutput(encodeBase64(input, { urlSafe, lineBreaks, padding })); setError(null); }
        catch (e) { setOutput(""); setError((e as Error).message); }
      } else {
        const r = decodeBase64(input, { urlSafe });
        if (r.ok) { setOutput(r.result); setError(null); }
        else { setOutput(""); setError(r.error); }
      }
    }, 150);
    return () => clearTimeout(t);
  }, [input, dir, urlSafe, lineBreaks, padding, mode]);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.shiftKey && e.key.toUpperCase() === "E") { e.preventDefault(); setDir("encode"); }
      if (mod && e.shiftKey && e.key.toUpperCase() === "D") { e.preventDefault(); setDir("decode"); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  /* ── File decode preview ── */
  useEffect(() => {
    if (mode !== "file" || dir !== "decode" || !decInput.trim()) {
      setDecPreview(null); setDecMime(""); return;
    }
    const s = decInput.trim();
    let dataURI = s;
    let mime = "";
    if (s.startsWith("data:")) {
      const m = s.match(/^data:([^;]+);base64,/);
      if (m) mime = m[1];
    } else {
      dataURI = `data:image/png;base64,${s}`;
      mime = decMime || "image/png";
    }
    if (!decMime && mime) setDecMime(mime);
    if (mime.startsWith("image/")) setDecPreview(dataURI);
    else setDecPreview(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decInput, mode, dir]);

  /* ── Handlers ── */
  const copy = useCallback(async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const handleSwap = useCallback(() => {
    setDir((d) => (d === "encode" ? "decode" : "encode"));
    const prev = input;
    setInput(output);
    setOutput(prev);
    setError(null);
  }, [input, output]);

  const handleClear = useCallback(() => {
    setInput(""); setOutput(""); setError(null);
    setFileResult(null); setDecInput(""); setDecPreview(null); setDecMime("");
  }, []);

  const handleSample = useCallback(() => {
    if (dir === "encode") {
      setInput("Hello, World! \uD83C\uDF0D\nThis is a test of Base64 encoding with full UTF-8 support.\n\u65E5\u672C\u8A9E\u30C6\u30B9\u30C8 \u00B7 \u00D1o\u00F1o \u00B7 \u00DC");
    } else {
      setInput("SGVsbG8sIFdvcmxkISDwn4yNCg==");
    }
  }, [dir]);

  const handleFile = useCallback((file: File) => {
    if (file.size > 10 * 1024 * 1024) { setError("File exceeds 10 MB limit"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const dataURI = reader.result as string;
      const raw = dataURI.split(",")[1];
      setFileResult({
        dataURI, raw, mimeType: file.type, fileName: file.name,
        fileSize: file.size, base64Size: raw.length, isImage: file.type.startsWith("image/"),
      });
      setError(null);
    };
    reader.onerror = () => setError("Failed to read file");
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const downloadDecoded = useCallback(() => {
    const s = decInput.trim();
    let raw = s;
    let mime = decMime || "application/octet-stream";
    if (s.startsWith("data:")) {
      const m = s.match(/^data:([^;]+);base64,([\s\S]+)$/);
      if (m) { mime = m[1]; raw = m[2]; }
    }
    try {
      const bin = atob(raw.replace(/\s/g, ""));
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const blob = new Blob([bytes], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `decoded-file.${EXT_MAP[mime] || "bin"}`;
      a.click(); URL.revokeObjectURL(url);
    } catch { setError("Invalid Base64 string"); }
  }, [decInput, decMime]);

  const downloadOutput = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = dir === "encode" ? "encoded.txt" : "decoded.txt";
    a.click(); URL.revokeObjectURL(url);
  }, [output, dir]);

  /* ── Computed ── */
  const inBytes = new TextEncoder().encode(input).length;
  const outBytes = new TextEncoder().encode(output).length;
  const pct = inBytes > 0 ? ((outBytes - inBytes) / inBytes) * 100 : 0;
  const editorBg = dark ? "#282A36" : "#F8F8F8";

  /* ── Render helpers ── */
  const copyBtn = (text: string, label: string, small?: boolean) => (
    <button
      onClick={() => copy(text, label)}
      className={`${small ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"} rounded-lg font-semibold transition-colors`}
      style={{ backgroundColor: copied === label ? `${C.encode}30` : `${C.accent}20`, color: copied === label ? C.encode : C.accent }}
    >
      {copied === label ? "Copied!" : "Copy"}
    </button>
  );

  const toolBtn = (label: string, onClick: () => void, active: boolean, color: string) => (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-lg font-bold text-sm transition-colors"
      style={{ backgroundColor: active ? `${color}25` : "var(--surface)", color: active ? color : "var(--text-muted)", border: `1px solid ${active ? color + "50" : "var(--border)"}` }}
    >
      {label}
    </button>
  );

  const secBtn = (label: string, onClick: () => void) => (
    <button onClick={onClick} className="px-3 py-2 rounded-lg font-bold text-sm transition-colors" style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">

        {/* ── Header ── */}
        {!articleMode && (
          <>
            <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              <a href="/" className="hover:underline" style={{ color: C.accent }}>Home</a>
              <span>/</span><span>Developer Tools</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
          </>
        )}

        {/* ── Mode tabs ── */}
        <div className="flex gap-2 mb-4">
          {([["text", "Text"], ["file", "File / Image"]] as [Mode, string][]).map(([m, label]) => (
            <button
              key={m}
              onClick={() => { setMode(m); handleClear(); }}
              className="px-5 py-2.5 rounded-xl font-semibold text-[15px] transition-colors"
              style={{
                backgroundColor: mode === m ? `${C.accent}25` : "var(--surface)",
                color: mode === m ? C.accent : "var(--text-muted)",
                border: `1px solid ${mode === m ? C.accent + "50" : "var(--border)"}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap gap-2 mb-3">
          {mode === "text" ? (
            <>
              {toolBtn("Encode", () => setDir("encode"), dir === "encode", C.encode)}
              {toolBtn("Decode", () => setDir("decode"), dir === "decode", C.decode)}
              <button onClick={handleSwap} className="px-3 py-2 rounded-lg font-bold text-sm transition-colors" style={{ backgroundColor: "var(--surface)", color: C.accent, border: "1px solid var(--border)" }}>
                ⇄ Swap
              </button>
              {output && (
                <>
                  <button onClick={() => copy(output, "output")} className="px-3 py-2 rounded-lg font-bold text-sm transition-colors" style={{ backgroundColor: "var(--surface)", color: C.accent, border: "1px solid var(--border)" }}>
                    {copied === "output" ? "Copied!" : "Copy Output"}
                  </button>
                  {secBtn("Download", downloadOutput)}
                </>
              )}
              {secBtn("Sample", handleSample)}
            </>
          ) : (
            <>
              {toolBtn("File \u2192 Base64", () => { setDir("encode"); setFileResult(null); setDecInput(""); }, dir === "encode", C.encode)}
              {toolBtn("Base64 \u2192 File", () => { setDir("decode"); setFileResult(null); setDecInput(""); }, dir === "decode", C.decode)}
            </>
          )}
          {secBtn("Clear", handleClear)}
          <button
            onClick={() => setShowOpts((v) => !v)}
            className="px-3 py-2 rounded-lg font-bold text-sm transition-colors"
            style={{ backgroundColor: showOpts ? `${C.accent}20` : "var(--surface)", color: showOpts ? C.accent : "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            Options {showOpts ? "\u25B2" : "\u25BC"}
          </button>
        </div>

        {/* ── Options ── */}
        {showOpts && (
          <div className="rounded-xl border p-4 mb-3 flex flex-wrap gap-x-6 gap-y-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={urlSafe} onChange={() => setUrlSafe((v) => !v)} className="accent-[#8BE9FD]" />
              <span>URL-safe Base64</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>(-&nbsp;_ instead of +&nbsp;/)</span>
            </label>
            {dir === "encode" && (
              <>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={lineBreaks} onChange={() => setLineBreaks((v) => !v)} className="accent-[#8BE9FD]" />
                  <span>Line breaks</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>(76 chars, MIME)</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={padding} onChange={() => setPadding((v) => !v)} className="accent-[#8BE9FD]" />
                  <span>Padding (=)</span>
                </label>
              </>
            )}
          </div>
        )}

        {/* ── Stats (text mode) ── */}
        {mode === "text" && input && (
          <div className="rounded-lg px-4 py-2 mb-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px]" style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}>
            <span>Input: <strong style={{ color: "var(--text)" }}>{fmtBytes(inBytes)}</strong></span>
            <span>\u2192</span>
            <span>Output: <strong style={{ color: "var(--text)" }}>{fmtBytes(outBytes)}</strong></span>
            {outBytes > 0 && (
              <span style={{ color: pct > 0 ? "#FFB86C" : C.encode }}>
                {pct > 0 ? "+" : ""}{pct.toFixed(1)}% size {pct > 0 ? "increase" : "reduction"}
              </span>
            )}
            {dir === "decode" && !error && output && <span style={{ color: C.encode }}>Valid Base64 \u2713</span>}
            {error && <span style={{ color: C.error }}>Invalid \u2717</span>}
          </div>
        )}

        {/* ── TEXT MODE ── */}
        {mode === "text" && (
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 md:gap-4 mb-6">
            {/* Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold" style={{ color: dir === "encode" ? C.encode : C.decode }}>
                  {dir === "encode" ? "Plain Text" : "Base64 Input"}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{fmtBytes(inBytes)}</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={dir === "encode" ? "Enter text to encode..." : "Paste Base64 to decode..."}
                className="w-full rounded-xl border p-4 resize-y focus:outline-none"
                style={{ backgroundColor: editorBg, borderColor: "var(--border)", color: "var(--text)", fontFamily: MONO, fontSize: "14px", lineHeight: "1.6", minHeight: "280px" }}
                aria-label={dir === "encode" ? "Text to encode" : "Base64 to decode"}
              />
            </div>

            {/* Direction toggle */}
            <div className="flex md:flex-col items-center justify-center py-2">
              <button
                onClick={handleSwap}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all hover:scale-110"
                style={{
                  backgroundColor: dir === "encode" ? `${C.encode}20` : `${C.decode}20`,
                  color: dir === "encode" ? C.encode : C.decode,
                  border: `2px solid ${dir === "encode" ? C.encode + "50" : C.decode + "50"}`,
                }}
                title={`Switch to ${dir === "encode" ? "decode" : "encode"}`}
              >
                {dir === "encode" ? "\u2192" : "\u2190"}
              </button>
            </div>

            {/* Output */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold" style={{ color: dir === "encode" ? C.decode : C.encode }}>
                  {dir === "encode" ? "Base64 Output" : "Decoded Text"}
                </span>
                {output && copyBtn(output, "out-inline", true)}
              </div>
              <div
                className="w-full rounded-xl border p-4 overflow-auto"
                style={{
                  backgroundColor: editorBg,
                  borderColor: error ? C.error : "var(--border)",
                  fontFamily: MONO, fontSize: "14px", lineHeight: "1.6",
                  minHeight: "280px", whiteSpace: "pre-wrap", wordBreak: "break-all",
                }}
                role="region"
                aria-label={dir === "encode" ? "Base64 output" : "Decoded output"}
                aria-live="polite"
              >
                {error ? (
                  <span style={{ color: C.error }}>{"\u26A0\uFE0F"} {error}</span>
                ) : output ? (
                  <span>{output}</span>
                ) : (
                  <span style={{ color: "var(--text-muted)" }}>
                    {dir === "encode" ? "Base64 output will appear here..." : "Decoded text will appear here..."}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── FILE MODE — ENCODE ── */}
        {mode === "file" && dir === "encode" && (
          <div className="mb-6">
            {!fileResult ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className="rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-colors"
                style={{ borderColor: dragOver ? C.accent : "var(--border)", backgroundColor: dragOver ? `${C.accent}10` : "var(--surface)" }}
              >
                <div className="text-4xl mb-3">{"\uD83D\uDCC1"}</div>
                <p className="font-semibold text-lg mb-1">Drop a file here or click to upload</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Images, PDFs, text, fonts &mdash; any file up to 10 MB</p>
                <input ref={fileRef} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              </div>
            ) : (
              <div className="space-y-4">
                {/* File info + preview */}
                <div className="rounded-xl border p-4 flex flex-col sm:flex-row gap-6 items-start" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  {fileResult.isImage && (
                    <div className="flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={fileResult.dataURI} alt="Preview" className="max-w-[200px] max-h-[200px] rounded-lg border" style={{ borderColor: "var(--border)" }} />
                    </div>
                  )}
                  <div className="text-sm space-y-1" style={{ color: "var(--text-muted)" }}>
                    <p><strong style={{ color: "var(--text)" }}>{fileResult.fileName}</strong></p>
                    <p>Type: {fileResult.mimeType || "unknown"}</p>
                    <p>Original size: {fmtBytes(fileResult.fileSize)}</p>
                    <p>Base64 size: {fmtBytes(fileResult.base64Size)} <span style={{ color: "#FFB86C" }}>(+{((fileResult.base64Size - fileResult.fileSize) / fileResult.fileSize * 100).toFixed(1)}%)</span></p>
                    <button
                      onClick={() => { setFileResult(null); if (fileRef.current) fileRef.current.value = ""; }}
                      className="mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ backgroundColor: `${C.error}20`, color: C.error }}
                    >
                      Remove &amp; Upload New
                    </button>
                  </div>
                </div>

                {/* Output blocks */}
                {[
                  { label: "Raw Base64", value: fileResult.raw },
                  { label: "Data URI", value: fileResult.dataURI },
                  ...(fileResult.isImage ? [
                    { label: "HTML <img> Tag", value: `<img src="${fileResult.dataURI}" alt="${fileResult.fileName}" />` },
                    { label: "CSS background-image", value: `background-image: url(${fileResult.dataURI});` },
                  ] : []),
                ].map((block) => (
                  <div key={block.label} className="rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
                      <span className="text-sm font-semibold">{block.label}</span>
                      {copyBtn(block.value, block.label, true)}
                    </div>
                    <div className="p-4 overflow-auto max-h-[200px]" style={{ fontFamily: MONO, fontSize: "13px", lineHeight: "1.5", wordBreak: "break-all", color: "var(--text-muted)" }}>
                      {block.value.length > 600 ? (
                        <>{block.value.slice(0, 600)}<span style={{ color: C.accent }}>&hellip; ({fmtBytes(block.value.length)} total &mdash; click Copy for full output)</span></>
                      ) : block.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {error && <p className="mt-3 text-sm" style={{ color: C.error }}>{"\u26A0\uFE0F"} {error}</p>}
          </div>
        )}

        {/* ── FILE MODE — DECODE ── */}
        {mode === "file" && dir === "decode" && (
          <div className="mb-6 space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block" style={{ color: C.decode }}>Paste Base64 String or Data URI</label>
              <textarea
                value={decInput}
                onChange={(e) => setDecInput(e.target.value)}
                placeholder="Paste a Base64 string or data URI (data:image/png;base64,...) here..."
                className="w-full rounded-xl border p-4 resize-y focus:outline-none"
                style={{ backgroundColor: editorBg, borderColor: "var(--border)", color: "var(--text)", fontFamily: MONO, fontSize: "14px", lineHeight: "1.6", minHeight: "180px" }}
              />
            </div>
            {!decInput.trim().startsWith("data:") && decInput.trim() && (
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>MIME type:</span>
                <select
                  value={decMime}
                  onChange={(e) => setDecMime(e.target.value)}
                  className="rounded-lg border px-3 py-1.5 text-sm focus:outline-none"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
                >
                  <option value="image/png">image/png</option>
                  <option value="image/jpeg">image/jpeg</option>
                  <option value="image/gif">image/gif</option>
                  <option value="image/svg+xml">image/svg+xml</option>
                  <option value="image/webp">image/webp</option>
                  <option value="application/pdf">application/pdf</option>
                  <option value="application/json">application/json</option>
                  <option value="text/plain">text/plain</option>
                  <option value="application/octet-stream">binary (unknown)</option>
                </select>
              </div>
            )}
            {decPreview && (
              <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <p className="text-sm font-semibold mb-3" style={{ color: C.encode }}>Image Preview</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={decPreview} alt="Decoded" className="max-w-full max-h-[400px] rounded-lg border" style={{ borderColor: "var(--border)" }} />
              </div>
            )}
            {decInput.trim() && (
              <button
                onClick={downloadDecoded}
                className="px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
                style={{ backgroundColor: `${C.decode}25`, color: C.decode, border: `1px solid ${C.decode}50` }}
              >
                {decMime.startsWith("image/") ? "Download Image" : "Download File"}
              </button>
            )}
            {error && <p className="mt-3 text-sm" style={{ color: C.error }}>{"\u26A0\uFE0F"} {error}</p>}
          </div>
        )}

        {/* ── Quick Reference ── */}
        <button
          onClick={() => setShowRef((v) => !v)}
          className="w-full text-left rounded-xl border px-5 py-3 mb-4 font-semibold text-[15px] transition-colors flex items-center justify-between"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <span>Base64 Quick Reference</span>
          <span>{showRef ? "\u25B2" : "\u25BC"}</span>
        </button>
        {showRef && (
          <div className="rounded-xl border p-5 mb-6 space-y-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: "16px" }}>Base64 Alphabet</h3>
              <div className="rounded-lg p-3 text-[13px]" style={{ backgroundColor: editorBg, fontFamily: MONO }}>
                A-Z (0-25), a-z (26-51), 0-9 (52-61), + (62), / (63)<br />
                Padding: =<br />
                URL-safe variant: + &rarr; -, / &rarr; _, no padding
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: "16px" }}>Common Data URI Prefixes</h3>
              <div className="rounded-lg p-3 text-[13px] space-y-0.5" style={{ backgroundColor: editorBg, fontFamily: MONO }}>
                {DATA_URI_PREFIXES.map((p) => <div key={p}>{p}</div>)}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: "16px" }}>Size Impact</h3>
              <div className="text-sm space-y-1" style={{ color: "var(--text-muted)" }}>
                <p>Base64 increases size by ~33% &mdash; formula: <code style={{ color: C.accent }}>ceil(n/3) &times; 4</code> bytes</p>
                <p>1 KB &rarr; ~1.33 KB &middot; 100 KB &rarr; ~133 KB &middot; 1 MB &rarr; ~1.33 MB</p>
              </div>
            </div>
          </div>
        )}

        {/* ── SEO Content + FAQs + Related (main page only) ── */}
        {!articleMode && (
          <>
            <article className="space-y-6 my-10">
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-2xl font-bold mb-3">What Is Base64 Encoding?</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It uses a 64-character alphabet &mdash; <strong style={{ color: "var(--text)" }}>A-Z, a-z, 0-9, +, and /</strong> &mdash; plus <strong style={{ color: "var(--text)" }}>=</strong> for padding. Every 3 bytes of input become 4 characters of output, making it safe to transmit binary data through text-only channels like JSON APIs, email (MIME), XML, HTML, and URL parameters.
                </p>
              </section>
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-2xl font-bold mb-3">When Developers Use Base64</h2>
                <div className="space-y-2" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  {[
                    ["Data URIs", "Embed images directly in HTML or CSS without extra HTTP requests \u2014 ideal for small icons and sprites"],
                    ["HTTP Basic Auth", "Encode username:password credentials for Authorization headers"],
                    ["JWT Tokens", "The header and payload sections of JSON Web Tokens are Base64url-encoded"],
                    ["Email (MIME)", "Binary attachments are Base64-encoded for safe transport through email protocols"],
                    ["API Transport", "Send binary data through JSON APIs that only support text values"],
                    ["Config & Storage", "Store binary data in text columns, environment variables, and config files"],
                  ].map(([t, d]) => (
                    <div key={t} className="flex items-start gap-2"><span style={{ color: C.accent, flexShrink: 0 }}>{"\u2713"}</span><span><strong style={{ color: "var(--text)" }}>{t}:</strong> {d}</span></div>
                  ))}
                </div>
              </section>
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-2xl font-bold mb-3">Base64 Is NOT Encryption</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  A critical distinction: Base64 is <strong style={{ color: "var(--text)" }}>encoding</strong>, not <strong style={{ color: "var(--text)" }}>encryption</strong>. It provides zero security &mdash; anyone can decode a Base64 string instantly. It&apos;s designed for data representation and transport, not protection. If you need to protect sensitive data, use proper encryption (AES-256, RSA) first, then optionally Base64-encode the encrypted output for text-safe transport. Never rely on Base64 alone to hide passwords, API keys, or personal data.
                </p>
              </section>
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-2xl font-bold mb-3">Full UTF-8 Support</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  The native JavaScript <code style={{ color: C.accent }}>btoa()</code> function only handles Latin-1 characters. This tool uses <code style={{ color: C.accent }}>TextEncoder</code> and <code style={{ color: C.accent }}>TextDecoder</code> to properly encode and decode the full range of Unicode characters including emoji ({"\uD83C\uDF0D"}), Chinese/Japanese/Korean text, Arabic, Cyrillic, accented characters (&Ntilde;, &uuml;), and any other UTF-8 content. Your Base64 output will always be correct, regardless of the input language.
                </p>
              </section>
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-2xl font-bold mb-3">100% Client-Side &mdash; Your Data Stays Private</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  All encoding and decoding runs entirely in your browser using native JavaScript APIs. No data is ever sent to a server, stored, or logged. This makes it safe to encode sensitive values like API keys, authentication tokens, and credentials. Close the tab and everything is gone.
                </p>
              </section>
            </article>

            {/* FAQs */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {FAQS.map((f, i) => (
                  <details key={i} className="rounded-xl border group" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                    <summary className="px-5 py-4 cursor-pointer font-semibold" style={{ fontSize: "16px" }}>{f.q}</summary>
                    <div className="px-5 pb-4" style={{ fontSize: "16px", color: "var(--text-muted)" }}>{f.a}</div>
                  </details>
                ))}
              </div>
            </div>

            {/* Related tools */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RELATED.map((r) => (
                  <a key={r.href} href={r.href} className="block rounded-xl border p-4 hover:shadow-lg transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                    <span className="text-xl mr-2">{r.emoji}</span>
                    <strong>{r.title}</strong>
                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{r.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
