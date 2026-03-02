"use client";

import { useState, useCallback, useEffect, Fragment } from "react";

/* ── Types ── */
type Tab = "encode" | "parser" | "batch";
type Direction = "encode" | "decode";
type EncMode = "component" | "fullurl" | "all";
interface Param { id: number; key: string; val: string }
interface Parts { protocol: string; host: string; port: string; path: string; params: Param[]; fragment: string }
interface Props { title?: string; subtitle?: string; defaultTab?: Tab; defaultDirection?: Direction; defaultEncMode?: EncMode; articleMode?: boolean }

/* ── Utility functions ── */

function urlEncode(str: string, mode: EncMode, spaceAs: string): string {
  let r: string;
  switch (mode) {
    case "component": r = encodeURIComponent(str); break;
    case "fullurl": r = encodeURI(str); break;
    case "all":
      r = Array.from(new TextEncoder().encode(str))
        .map((b) => "%" + b.toString(16).toUpperCase().padStart(2, "0")).join("");
      break;
  }
  if (spaceAs === "+" && mode !== "all") r = r.replace(/%20/g, "+");
  return r;
}

function urlDecode(str: string, spaceAs: string): { ok: true; result: string } | { ok: false; error: string; partial: string } {
  try {
    let s = str;
    if (spaceAs === "+") s = s.replace(/\+/g, " ");
    return { ok: true, result: decodeURIComponent(s) };
  } catch (e) {
    return { ok: false, error: (e as Error).message, partial: tryPartialDecode(str) };
  }
}

function tryPartialDecode(str: string): string {
  return str.replace(/%([0-9A-Fa-f]{2})/g, (match) => {
    try { return decodeURIComponent(match); } catch { return match; }
  });
}

function decodeFully(str: string): string {
  let cur = str;
  for (let i = 0; i < 10; i++) {
    try { const n = decodeURIComponent(cur); if (n === cur) break; cur = n; } catch { break; }
  }
  return cur;
}

function isDoubleEncoded(str: string): boolean { return /%25[0-9A-Fa-f]{2}/.test(str); }

function getDefaultPort(protocol: string): string {
  return ({ http: "80", https: "443", ftp: "21" } as Record<string, string>)[protocol] || "";
}

function parseURL(str: string): { ok: true; parts: Parts } | { ok: false; error: string } {
  let s = str.trim();
  if (!s) return { ok: false, error: "" };
  if (!/^[a-zA-Z]+:\/\//.test(s)) s = "https://" + s;
  try {
    const u = new URL(s);
    let pid = 0;
    const params: Param[] = [];
    u.searchParams.forEach((val, key) => params.push({ id: pid++, key, val }));
    return { ok: true, parts: { protocol: u.protocol.replace(":", ""), host: u.hostname, port: u.port, path: u.pathname, params, fragment: u.hash.slice(1) } };
  } catch (e) { return { ok: false, error: (e as Error).message }; }
}

function rebuildURL(p: Parts): string {
  let url = `${p.protocol}://${p.host}`;
  if (p.port && p.port !== getDefaultPort(p.protocol)) url += `:${p.port}`;
  url += p.path || "/";
  if (p.params.length > 0) url += "?" + p.params.map((pr) => `${encodeURIComponent(pr.key)}=${encodeURIComponent(pr.val)}`).join("&");
  if (p.fragment) url += `#${p.fragment}`;
  return url;
}

/* ── Constants ── */
const MONO = `"JetBrains Mono","Fira Code","Cascadia Code",Consolas,Monaco,monospace`;
const C = { accent: "#8BE9FD", encode: "#50FA7B", decode: "#BD93F9", error: "#FF5555", protocol: "#FF79C6", host: "#8BE9FD", port: "#FFB86C", path: "#50FA7B", paramKey: "#F1FA8C", paramVal: "#BD93F9", fragment: "#FF5555" };

const FAQS = [
  { q: "What is URL encoding?", a: "URL encoding (percent-encoding) replaces characters not allowed in URLs with % followed by two hex digits representing the byte value. Spaces become %20, ampersands become %26. Defined by RFC 3986." },
  { q: "What\u2019s the difference between encodeURI and encodeURIComponent?", a: "encodeURI() preserves URL structure characters (/, ?, #, &, =) \u2014 use for full URLs. encodeURIComponent() encodes everything except unreserved chars \u2014 use for individual values like query parameters." },
  { q: "Should I use %20 or + for spaces?", a: "%20 is the RFC 3986 standard and works everywhere. + comes from HTML form encoding (application/x-www-form-urlencoded). Use %20 as default \u2014 it\u2019s more universally compatible." },
  { q: "What is double encoding and how do I fix it?", a: "Double encoding happens when you encode an already-encoded string. A space becomes %20 first, then %2520. This tool detects double-encoded strings and offers to decode them the correct number of times." },
  { q: "Is my data safe?", a: "Yes. All encoding and decoding happens entirely in your browser using JavaScript. No data is sent to any server, stored, or logged. Safe for encoding API keys, tokens, and passwords." },
  { q: "What characters need URL encoding?", a: "Everything except unreserved characters: A-Z, a-z, 0-9, -, _, ., ~. Reserved characters like /, ?, #, & only need encoding when used as data, not as URL structure." },
  { q: "Can I parse and edit URL components?", a: "Yes. The URL Parser tab breaks any URL into protocol, host, port, path, query parameters, and fragment. Each part is color-coded and editable \u2014 change any part and the URL rebuilds in real time." },
  { q: "Can I encode/decode multiple strings at once?", a: "Yes. The Batch tab processes up to 100 lines at once. Lines with errors are flagged individually without affecting the rest." },
];

const RELATED = [
  { href: "/developer-tools/base64-encoder-decoder", emoji: "\uD83D\uDD04", title: "Base64 Encoder & Decoder", desc: "Encode and decode Base64 text and files" },
  { href: "/developer-tools/json-formatter", emoji: "\uD83D\uDD27", title: "JSON Formatter & Validator", desc: "Format, validate, and convert JSON" },
  { href: "/utility-tools/password-generator", emoji: "\uD83D\uDD10", title: "Password Generator", desc: "Generate strong passwords and passphrases" },
  { href: "/utility-tools/qr-code-generator", emoji: "\uD83D\uDCF1", title: "QR Code Generator", desc: "Create custom QR codes with logos" },
];

const ENC_MODES: [EncMode, string, string][] = [
  ["component", "Component", "encodeURIComponent \u2014 for query values"],
  ["fullurl", "Full URL", "encodeURI \u2014 preserves URL structure"],
  ["all", "All Characters", "Percent-encode every non-alphanumeric"],
];

const COMMON_ENCODINGS: [string, string][] = [
  ["Space", "%20"], ["!", "%21"], ["#", "%23"], ["$", "%24"], ["&", "%26"],
  ["'", "%27"], ["(", "%28"], [")", "%29"], ["*", "%2A"], ["+", "%2B"],
  [",", "%2C"], ["/", "%2F"], [":", "%3A"], [";", "%3B"], ["=", "%3D"],
  ["?", "%3F"], ["@", "%40"], ["[", "%5B"], ["]", "%5D"], ["%", "%25"],
];

const URI_COMPARE: [string, string, string][] = [
  ["/", "/", "%2F"], ["?", "?", "%3F"], ["#", "#", "%23"],
  ["&", "&", "%26"], ["=", "=", "%3D"], [":", ":", "%3A"],
  ["@", "@", "%40"], ["+", "+", "%2B"],
];

/* ── Component ── */

export default function UrlEncoderDecoder({
  title = "URL Encoder & Decoder",
  subtitle = "Encode, decode, and parse URLs instantly.",
  defaultTab = "encode",
  defaultDirection = "encode",
  defaultEncMode = "component",
  articleMode = false,
}: Props) {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState<Tab>(defaultTab);

  // Encode/Decode
  const [dir, setDir] = useState<Direction>(defaultDirection);
  const [encMode, setEncMode] = useState<EncMode>(defaultEncMode);
  const [spaceAs, setSpaceAs] = useState<"%20" | "+">("+");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Parser
  const [parserUrl, setParserUrl] = useState("");
  const [parts, setParts] = useState<Parts | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [nextPid, setNextPid] = useState(0);

  // Batch
  const [batchIn, setBatchIn] = useState("");
  const [batchOut, setBatchOut] = useState("");
  const [batchDir, setBatchDir] = useState<Direction>(defaultDirection);
  const [batchMode, setBatchMode] = useState<EncMode>(defaultEncMode);
  const [batchStats, setBatchStats] = useState({ total: 0, ok: 0, err: 0 });

  // UI
  const [showRef, setShowRef] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  /* ── Theme ── */
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* ── Real-time encode/decode ── */
  useEffect(() => {
    if (tab !== "encode" || !input) { setOutput(""); setError(null); return; }
    const t = setTimeout(() => {
      if (dir === "encode") {
        try { setOutput(urlEncode(input, encMode, spaceAs)); setError(null); }
        catch (e) { setOutput(""); setError((e as Error).message); }
      } else {
        const r = urlDecode(input, spaceAs);
        if (r.ok) { setOutput(r.result); setError(null); }
        else { setOutput(r.partial); setError(r.error); }
      }
    }, 100);
    return () => clearTimeout(t);
  }, [input, dir, encMode, spaceAs, tab]);

  /* ── URL parser ── */
  useEffect(() => {
    if (tab !== "parser" || !parserUrl.trim()) { setParts(null); setParseError(null); return; }
    const t = setTimeout(() => {
      const r = parseURL(parserUrl);
      if (r.ok) { setParts(r.parts); setNextPid(r.parts.params.length); setParseError(null); }
      else if (r.error) setParseError(r.error);
    }, 200);
    return () => clearTimeout(t);
  }, [parserUrl, tab]);

  /* ── Batch ── */
  useEffect(() => {
    if (tab !== "batch" || !batchIn.trim()) { setBatchOut(""); setBatchStats({ total: 0, ok: 0, err: 0 }); return; }
    const t = setTimeout(() => {
      const lines = batchIn.split("\n").slice(0, 100);
      let ok = 0, err = 0;
      const results = lines.map((line) => {
        if (!line.trim()) return "";
        if (batchDir === "encode") { try { ok++; return urlEncode(line, batchMode, "%20"); } catch { err++; return "\u26A0\uFE0F Error encoding"; } }
        else { const r = urlDecode(line, "%20"); if (r.ok) { ok++; return r.result; } else { err++; return `\u26A0\uFE0F ${r.error}`; } }
      });
      setBatchOut(results.join("\n"));
      setBatchStats({ total: lines.filter((l) => l.trim()).length, ok, err });
    }, 100);
    return () => clearTimeout(t);
  }, [batchIn, batchDir, batchMode, tab]);

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

  /* ── Handlers ── */
  const copy = useCallback(async (text: string, label: string) => {
    await navigator.clipboard.writeText(text); setCopied(label); setTimeout(() => setCopied(null), 2000);
  }, []);

  const handleSwap = useCallback(() => {
    setDir((d) => (d === "encode" ? "decode" : "encode"));
    const prev = input; setInput(output); setOutput(prev); setError(null);
  }, [input, output]);

  const handleClear = useCallback(() => {
    setInput(""); setOutput(""); setError(null);
    setParserUrl(""); setParts(null); setParseError(null);
    setBatchIn(""); setBatchOut(""); setBatchStats({ total: 0, ok: 0, err: 0 });
  }, []);

  const handleSample = useCallback(() => {
    if (tab === "encode") {
      if (dir === "encode") setInput("Hello World! This is a test with special characters: caf\u00E9, na\u00EFve, r\u00E9sum\u00E9, \u00FCber, and emoji: \uD83C\uDF89\uD83D\uDE80\nQuery params: name=John Doe&city=New York&price=$49.99&discount=20%&redirect=https://example.com/callback?token=abc123");
      else setInput("Hello%20World%21%20caf%C3%A9%20latt%C3%A9%20%F0%9F%8E%89");
    } else if (tab === "parser") {
      setParserUrl("https://api.example.com:8080/v1/users/search?name=John%20Doe&role=admin&status=active&sort=created_at&order=desc&page=1&limit=25#results");
    } else {
      setBatchIn("Hello%20World\ncaf%C3%A9%20latt%C3%A9\nprice%3D%2449.99\nhttps%3A%2F%2Fexample.com%2Fpath\nJohn%20Doe%20%26%20Jane%20Doe\n%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C");
      setBatchDir("decode");
    }
  }, [tab, dir]);

  const updatePart = useCallback(<K extends keyof Parts>(field: K, value: Parts[K]) => {
    setParts((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, []);

  const updateParam = useCallback((id: number, field: "key" | "val", value: string) => {
    setParts((prev) => prev ? { ...prev, params: prev.params.map((p) => (p.id === id ? { ...p, [field]: value } : p)) } : prev);
  }, []);

  const addParam = useCallback(() => {
    setParts((prev) => { if (!prev) return prev; const id = nextPid; setNextPid(id + 1); return { ...prev, params: [...prev.params, { id, key: "", val: "" }] }; });
  }, [nextPid]);

  const removeParam = useCallback((id: number) => {
    setParts((prev) => (prev ? { ...prev, params: prev.params.filter((p) => p.id !== id) } : prev));
  }, []);

  const moveParam = useCallback((id: number, d: -1 | 1) => {
    setParts((prev) => {
      if (!prev) return prev;
      const idx = prev.params.findIndex((p) => p.id === id);
      const ni = idx + d;
      if (idx < 0 || ni < 0 || ni >= prev.params.length) return prev;
      const params = [...prev.params];
      [params[idx], params[ni]] = [params[ni], params[idx]];
      return { ...prev, params };
    });
  }, []);

  const downloadOutput = useCallback(() => {
    const text = tab === "batch" ? batchOut : output;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = dir === "encode" ? "encoded.txt" : "decoded.txt";
    a.click(); URL.revokeObjectURL(url);
  }, [output, batchOut, dir, tab]);

  /* ── Computed ── */
  const dblEncoded = dir === "decode" && tab === "encode" && isDoubleEncoded(input);
  const rebuiltUrl = parts ? rebuildURL(parts) : "";
  const editorBg = dark ? "#282A36" : "#F8F8F8";

  /* ── Render helpers ── */
  const copyBtn = (text: string, label: string, small?: boolean) => (
    <button onClick={() => copy(text, label)} className={`${small ? "px-2 py-1 text-sm" : "px-3 py-1.5 text-sm"} rounded-lg font-semibold transition-colors`}
      style={{ backgroundColor: copied === label ? `${C.encode}30` : `${C.accent}20`, color: copied === label ? C.encode : C.accent }}>
      {copied === label ? "Copied!" : "Copy"}
    </button>
  );

  const toolBtn = (label: string, onClick: () => void, active: boolean, color: string) => (
    <button onClick={onClick} className="px-3 py-2 rounded-lg font-bold text-sm transition-colors"
      style={{ backgroundColor: active ? `${color}25` : "var(--surface)", color: active ? color : "var(--text-muted)", border: `1px solid ${active ? color + "50" : "var(--border)"}` }}>
      {label}
    </button>
  );

  const secBtn = (label: string, onClick: () => void) => (
    <button onClick={onClick} className="px-3 py-2 rounded-lg font-bold text-sm transition-colors"
      style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">

        {/* ── Header ── */}
        {!articleMode && (
          <>
            <nav className="flex items-center gap-1 text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              <a href="/" className="hover:underline" style={{ color: C.accent }}>Home</a><span>/</span><span>Developer Tools</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
          </>
        )}

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-4">
          {([["encode", "Encode / Decode"], ["parser", "URL Parser"], ["batch", "Batch"]] as [Tab, string][]).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} className="px-5 py-2.5 rounded-xl font-semibold text-[15px] transition-colors"
              style={{ backgroundColor: tab === t ? `${C.accent}25` : "var(--surface)", color: tab === t ? C.accent : "var(--text-muted)", border: `1px solid ${tab === t ? C.accent + "50" : "var(--border)"}` }}>
              {label}
            </button>
          ))}
        </div>

        {/* ══════════════ ENCODE / DECODE TAB ══════════════ */}
        {tab === "encode" && (
          <>
            {/* Encoding mode */}
            <div className="flex flex-wrap gap-2 mb-3">
              {ENC_MODES.map(([m, label, desc]) => (
                <button key={m} onClick={() => setEncMode(m)} className="px-3 py-2 rounded-lg text-sm transition-colors text-left"
                  style={{ backgroundColor: encMode === m ? `${C.accent}15` : "var(--surface)", color: encMode === m ? C.accent : "var(--text-muted)", border: `1px solid ${encMode === m ? C.accent + "50" : "var(--border)"}` }}>
                  <span className="font-bold block">{label}</span>
                  <span className="text-sm">{desc}</span>
                </button>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span style={{ color: "var(--text-muted)" }}>Spaces:</span>
              {(["%20", "+"] as const).map((s) => (
                <button key={s} onClick={() => setSpaceAs(s)} className="px-2 py-1 rounded text-sm font-bold"
                  style={{ backgroundColor: spaceAs === s ? `${C.accent}20` : "var(--surface)", color: spaceAs === s ? C.accent : "var(--text-muted)" }}>
                  {s}
                </button>
              ))}
              <span className="mx-1 border-l h-6 inline-block" style={{ borderColor: "var(--border)" }} />
              {toolBtn("Encode", () => setDir("encode"), dir === "encode", C.encode)}
              {toolBtn("Decode", () => setDir("decode"), dir === "decode", C.decode)}
              <button onClick={handleSwap} className="px-3 py-2 rounded-lg font-bold text-sm" style={{ backgroundColor: "var(--surface)", color: C.accent, border: "1px solid var(--border)" }}>{"\u21C4"} Swap</button>
              {output && (
                <>
                  <button onClick={() => copy(output, "output")} className="px-3 py-2 rounded-lg font-bold text-sm" style={{ backgroundColor: "var(--surface)", color: C.accent, border: "1px solid var(--border)" }}>{copied === "output" ? "Copied!" : "Copy"}</button>
                  {secBtn("Download", downloadOutput)}
                </>
              )}
              {secBtn("Sample", handleSample)}
              {secBtn("Clear", handleClear)}
            </div>

            {/* Stats */}
            {input && (
              <div className="rounded-lg px-4 py-2 mb-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px]" style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}>
                <span>Input: <strong style={{ color: "var(--text)" }}>{input.length} chars</strong></span>
                <span>{"\u2192"}</span>
                <span>Output: <strong style={{ color: "var(--text)" }}>{output.length} chars</strong></span>
                {output.length > 0 && input.length > 0 && (
                  <span style={{ color: output.length > input.length ? "#FFB86C" : C.encode }}>
                    {output.length > input.length ? "+" : ""}{((output.length - input.length) / input.length * 100).toFixed(1)}%
                  </span>
                )}
                <span>Mode: {encMode === "component" ? "Component" : encMode === "fullurl" ? "Full URL" : "All Chars"}</span>
              </div>
            )}

            {/* Double-encoding warning */}
            {dblEncoded && (
              <div className="rounded-xl border p-3 mb-4 flex flex-wrap items-center gap-2 text-sm" style={{ backgroundColor: "#FFB86C15", borderColor: "#FFB86C40" }}>
                <span>{"\u26A0\uFE0F"} Double-encoded input detected</span>
                <button onClick={() => { const r = urlDecode(input, spaceAs); if (r.ok) setInput(r.result); }} className="px-2 py-1 rounded text-sm font-bold" style={{ backgroundColor: `${C.decode}20`, color: C.decode }}>Decode Once</button>
                <button onClick={() => { let s = input; for (let i = 0; i < 2; i++) { const r = urlDecode(s, spaceAs); if (r.ok) s = r.result; else break; } setInput(s); }} className="px-2 py-1 rounded text-sm font-bold" style={{ backgroundColor: `${C.decode}20`, color: C.decode }}>Decode Twice</button>
                <button onClick={() => setInput(decodeFully(input))} className="px-2 py-1 rounded text-sm font-bold" style={{ backgroundColor: `${C.decode}20`, color: C.decode }}>Decode Fully</button>
              </div>
            )}

            {/* Panels */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 md:gap-4 mb-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: dir === "encode" ? C.encode : C.decode }}>{dir === "encode" ? "Plain Text" : "Encoded Input"}</span>
                  <span style={{ color: "var(--text-muted)" }}>{input.length} chars</span>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder={dir === "encode" ? "Enter text to encode..." : "Paste URL-encoded text to decode..."}
                  className="w-full rounded-xl border p-4 resize-y focus:outline-none"
                  style={{ backgroundColor: editorBg, borderColor: "var(--border)", color: "var(--text)", fontFamily: MONO, fontSize: "15px", lineHeight: "1.6", minHeight: "280px" }}
                  aria-label={dir === "encode" ? "Text to encode" : "Encoded text to decode"} />
              </div>
              <div className="flex md:flex-col items-center justify-center py-2">
                <button onClick={handleSwap} className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all hover:scale-110"
                  style={{ backgroundColor: dir === "encode" ? `${C.encode}20` : `${C.decode}20`, color: dir === "encode" ? C.encode : C.decode, border: `2px solid ${dir === "encode" ? C.encode + "50" : C.decode + "50"}` }}
                  title={`Switch to ${dir === "encode" ? "decode" : "encode"}`}>
                  {dir === "encode" ? "\u2192" : "\u2190"}
                </button>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: dir === "encode" ? C.decode : C.encode }}>{dir === "encode" ? "Encoded Output" : "Decoded Text"}</span>
                  {output && copyBtn(output, "out-inline", true)}
                </div>
                <div className="w-full rounded-xl border p-4 overflow-auto"
                  style={{ backgroundColor: editorBg, borderColor: error ? C.error : "var(--border)", fontFamily: MONO, fontSize: "15px", lineHeight: "1.6", minHeight: "280px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}
                  role="region" aria-label="Output" aria-live="polite">
                  {error ? <span style={{ color: C.error }}>{"\u26A0\uFE0F"} {error}</span> : output ? <span>{output}</span> : <span style={{ color: "var(--text-muted)" }}>{dir === "encode" ? "Encoded output appears here\u2026" : "Decoded text appears here\u2026"}</span>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════ URL PARSER TAB ══════════════ */}
        {tab === "parser" && (
          <>
            <div className="flex flex-wrap gap-2 mb-3">
              {secBtn("Sample", handleSample)}
              {secBtn("Clear", () => { setParserUrl(""); setParts(null); setParseError(null); })}
              {parts && copyBtn(rebuiltUrl, "rebuilt")}
              {parts && <button onClick={() => copy(rebuiltUrl, "rebuilt-url")} className="px-3 py-2 rounded-lg font-bold text-sm" style={{ backgroundColor: "var(--surface)", color: C.accent, border: "1px solid var(--border)" }}>{copied === "rebuilt-url" ? "Copied!" : "Copy Rebuilt URL"}</button>}
            </div>
            <input value={parserUrl} onChange={(e) => setParserUrl(e.target.value)}
              placeholder="https://api.example.com:8080/v1/users/search?name=John%20Doe&role=admin#results"
              className="w-full rounded-xl border px-4 py-3 mb-4 focus:outline-none"
              style={{ backgroundColor: editorBg, borderColor: parseError ? C.error : "var(--border)", color: "var(--text)", fontFamily: MONO, fontSize: "15px" }}
              aria-label="URL to parse" />
            {parseError && <p className="text-sm mb-4" style={{ color: C.error }}>{"\u26A0\uFE0F"} {parseError}</p>}

            {parts && (
              <div className="space-y-4 mb-6">
                {/* Color-coded URL */}
                <div className="rounded-xl border p-4 overflow-auto" style={{ backgroundColor: editorBg, borderColor: "var(--border)", fontFamily: MONO, fontSize: "15px", lineHeight: "1.8", wordBreak: "break-all" }}>
                  <span style={{ color: C.protocol }}>{parts.protocol}</span>
                  <span style={{ color: "var(--text-muted)" }}>://</span>
                  <span style={{ color: C.host }}>{parts.host}</span>
                  {parts.port && <><span style={{ color: "var(--text-muted)" }}>:</span><span style={{ color: C.port }}>{parts.port}</span></>}
                  <span style={{ color: C.path }}>{parts.path}</span>
                  {parts.params.length > 0 && (
                    <>
                      <span style={{ color: "var(--text-muted)" }}>?</span>
                      {parts.params.map((p, i) => (
                        <Fragment key={p.id}>
                          {i > 0 && <span style={{ color: "var(--text-muted)" }}>&amp;</span>}
                          <span style={{ color: C.paramKey }}>{encodeURIComponent(p.key)}</span>
                          <span style={{ color: "var(--text-muted)" }}>=</span>
                          <span style={{ color: C.paramVal }}>{encodeURIComponent(p.val)}</span>
                        </Fragment>
                      ))}
                    </>
                  )}
                  {parts.fragment && <><span style={{ color: "var(--text-muted)" }}>#</span><span style={{ color: C.fragment }}>{parts.fragment}</span></>}
                </div>

                {/* Component cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {([
                    ["PROTOCOL", "protocol", C.protocol, parts.protocol] as const,
                    ["HOST", "host", C.host, parts.host] as const,
                    ["PORT", "port", C.port, parts.port || getDefaultPort(parts.protocol)] as const,
                    ["PATH", "path", C.path, parts.path] as const,
                    ["FRAGMENT", "fragment", C.fragment, parts.fragment] as const,
                  ]).map(([label, field, color, value]) => (
                    <div key={label} className="rounded-xl border p-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                      <label className="text-[11px] font-bold tracking-widest uppercase mb-1.5 block" style={{ color }}>{label}</label>
                      <input value={value} onChange={(e) => updatePart(field, e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
                        style={{ backgroundColor: editorBg, borderColor: "var(--border)", color: "var(--text)", fontFamily: MONO }} />
                    </div>
                  ))}
                </div>

                {/* Query parameters */}
                <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <label className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.paramKey }}>QUERY PARAMETERS</label>
                    <div className="flex flex-wrap gap-2">
                      {parts.params.length > 0 && (
                        <>
                          <button onClick={() => copy(JSON.stringify(Object.fromEntries(parts.params.map((p) => [p.key, p.val])), null, 2), "obj")}
                            className="px-2 py-1 text-sm rounded-lg font-semibold"
                            style={{ backgroundColor: copied === "obj" ? `${C.encode}30` : `${C.accent}20`, color: copied === "obj" ? C.encode : C.accent }}>
                            {copied === "obj" ? "Copied!" : "Copy as Object"}
                          </button>
                          <button onClick={() => copy(["const params = new URLSearchParams();", ...parts.params.map((p) => `params.set(${JSON.stringify(p.key)}, ${JSON.stringify(p.val)});`)].join("\n"), "usp")}
                            className="px-2 py-1 text-sm rounded-lg font-semibold"
                            style={{ backgroundColor: copied === "usp" ? `${C.encode}30` : `${C.accent}20`, color: copied === "usp" ? C.encode : C.accent }}>
                            {copied === "usp" ? "Copied!" : "URLSearchParams"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {parts.params.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {parts.params.map((p, i) => (
                        <div key={p.id} className="flex items-center gap-2">
                          <input value={p.key} onChange={(e) => updateParam(p.id, "key", e.target.value)} placeholder="key"
                            className="flex-1 min-w-0 rounded-lg border px-3 py-1.5 text-sm focus:outline-none"
                            style={{ backgroundColor: editorBg, borderColor: "var(--border)", color: C.paramKey, fontFamily: MONO }} />
                          <span className="flex-shrink-0" style={{ color: "var(--text-muted)" }}>=</span>
                          <input value={p.val} onChange={(e) => updateParam(p.id, "val", e.target.value)} placeholder="value"
                            className="flex-1 min-w-0 rounded-lg border px-3 py-1.5 text-sm focus:outline-none"
                            style={{ backgroundColor: editorBg, borderColor: "var(--border)", color: C.paramVal, fontFamily: MONO }} />
                          <button onClick={() => moveParam(p.id, -1)} disabled={i === 0} className="flex-shrink-0 px-1.5 py-1 rounded text-sm disabled:opacity-30" style={{ color: "var(--text-muted)" }}>{"\u25B2"}</button>
                          <button onClick={() => moveParam(p.id, 1)} disabled={i === parts.params.length - 1} className="flex-shrink-0 px-1.5 py-1 rounded text-sm disabled:opacity-30" style={{ color: "var(--text-muted)" }}>{"\u25BC"}</button>
                          <button onClick={() => removeParam(p.id)} className="flex-shrink-0 px-1.5 py-1 rounded text-sm" style={{ color: C.error }}>{"\u2715"}</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button onClick={addParam} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: `${C.accent}15`, color: C.accent }}>+ Add Parameter</button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ══════════════ BATCH TAB ══════════════ */}
        {tab === "batch" && (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {toolBtn("Encode", () => setBatchDir("encode"), batchDir === "encode", C.encode)}
              {toolBtn("Decode", () => setBatchDir("decode"), batchDir === "decode", C.decode)}
              <span className="mx-1 border-l h-6 inline-block" style={{ borderColor: "var(--border)" }} />
              {(["component", "fullurl", "all"] as EncMode[]).map((m) => (
                <button key={m} onClick={() => setBatchMode(m)} className="px-2 py-1.5 rounded-lg text-sm font-bold"
                  style={{ backgroundColor: batchMode === m ? `${C.accent}20` : "var(--surface)", color: batchMode === m ? C.accent : "var(--text-muted)", border: "1px solid var(--border)" }}>
                  {m === "component" ? "Component" : m === "fullurl" ? "Full URL" : "All"}
                </button>
              ))}
              <span className="mx-1 border-l h-6 inline-block" style={{ borderColor: "var(--border)" }} />
              {batchOut && <button onClick={() => copy(batchOut, "batch")} className="px-3 py-2 rounded-lg font-bold text-sm" style={{ backgroundColor: "var(--surface)", color: C.accent, border: "1px solid var(--border)" }}>{copied === "batch" ? "Copied!" : "Copy All"}</button>}
              {batchOut && secBtn("Download", downloadOutput)}
              {secBtn("Sample", handleSample)}
              {secBtn("Clear", () => { setBatchIn(""); setBatchOut(""); setBatchStats({ total: 0, ok: 0, err: 0 }); })}
            </div>

            {batchStats.total > 0 && (
              <div className="rounded-lg px-4 py-2 mb-3 text-[13px]" style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}>
                {batchStats.total} lines | <span style={{ color: C.encode }}>{batchStats.ok} successful</span>
                {batchStats.err > 0 && <> | <span style={{ color: C.error }}>{batchStats.err} errors</span></>}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: batchDir === "encode" ? C.encode : C.decode }}>Input (one per line)</label>
                <textarea value={batchIn} onChange={(e) => setBatchIn(e.target.value)} placeholder="Enter one string per line..."
                  className="w-full rounded-xl border p-4 resize-y focus:outline-none"
                  style={{ backgroundColor: editorBg, borderColor: "var(--border)", color: "var(--text)", fontFamily: MONO, fontSize: "15px", lineHeight: "1.6", minHeight: "280px" }} />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: batchDir === "encode" ? C.decode : C.encode }}>Output</label>
                <div className="w-full rounded-xl border p-4 overflow-auto"
                  style={{ backgroundColor: editorBg, borderColor: "var(--border)", fontFamily: MONO, fontSize: "15px", lineHeight: "1.6", minHeight: "280px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                  {batchOut || <span style={{ color: "var(--text-muted)" }}>Results appear here&hellip;</span>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════ QUICK REFERENCE ══════════════ */}
        <button onClick={() => setShowRef((v) => !v)} className="w-full text-left rounded-xl border px-5 py-3 mb-4 font-semibold text-[15px] flex items-center justify-between"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <span>URL Encoding Quick Reference</span><span>{showRef ? "\u25B2" : "\u25BC"}</span>
        </button>
        {showRef && (
          <div className="rounded-xl border p-5 mb-6 space-y-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: "16px" }}>Unreserved Characters (no encoding needed)</h3>
              <div className="rounded-lg p-3 text-[13px]" style={{ backgroundColor: editorBg, fontFamily: MONO }}>A-Z &nbsp; a-z &nbsp; 0-9 &nbsp; - &nbsp; _ &nbsp; . &nbsp; ~</div>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: "16px" }}>Reserved Characters</h3>
              <div className="rounded-lg p-3 text-[13px]" style={{ backgroundColor: editorBg, fontFamily: MONO }}>: &nbsp; / &nbsp; ? &nbsp; # &nbsp; [ &nbsp; ] &nbsp; @ &nbsp; ! &nbsp; $ &nbsp; &amp; &nbsp; &apos; &nbsp; ( &nbsp; ) &nbsp; * &nbsp; + &nbsp; , &nbsp; ; &nbsp; =</div>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: "16px" }}>Common Encodings</h3>
              <div className="rounded-lg p-3 text-[13px] grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1" style={{ backgroundColor: editorBg, fontFamily: MONO }}>
                {COMMON_ENCODINGS.map(([ch, enc]) => (
                  <div key={ch + enc}><span style={{ color: "var(--text-muted)" }}>{ch}</span> <span style={{ color: C.accent }}>&rarr;</span> {enc}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ fontSize: "16px" }}>encodeURI vs encodeURIComponent</h3>
              <div className="rounded-lg p-3 text-[13px] overflow-auto" style={{ backgroundColor: editorBg, fontFamily: MONO }}>
                <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                  <div className="font-bold" style={{ color: "var(--text-muted)" }}>Char</div>
                  <div className="font-bold" style={{ color: "var(--text-muted)" }}>encodeURI</div>
                  <div className="font-bold" style={{ color: "var(--text-muted)" }}>encodeURIComponent</div>
                  {URI_COMPARE.map(([ch, uri, comp]) => (
                    <Fragment key={ch}>
                      <div>{ch}</div><div>{uri}</div><div style={{ color: C.accent }}>{comp}</div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ SEO + FAQs + Related ══════════════ */}
        {!articleMode && (
          <>
            <article className="space-y-6 my-10">
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">What Is URL Encoding?</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  URL encoding, also called <strong style={{ color: "var(--text)" }}>percent-encoding</strong>, is the process of replacing characters that aren&apos;t allowed in URLs with a <code style={{ color: C.accent }}>%</code> followed by two hexadecimal digits representing the character&apos;s byte value. For example, a space becomes <code style={{ color: C.accent }}>%20</code> and an ampersand becomes <code style={{ color: C.accent }}>%26</code>. This is defined by RFC 3986 and is essential for constructing valid URLs that contain special characters, international text, or reserved characters used as data.
                </p>
              </section>
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">encodeURIComponent vs encodeURI</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  JavaScript provides two URL encoding functions that confuse many developers. <code style={{ color: C.accent }}>encodeURI()</code> encodes a <strong style={{ color: "var(--text)" }}>complete URL</strong> while preserving characters that have structural meaning (<code style={{ color: C.accent }}>/ ? # &amp; =</code>). Use it when you have a full URL and want to make it safe without breaking its structure. <code style={{ color: C.accent }}>encodeURIComponent()</code> encodes <strong style={{ color: "var(--text)" }}>everything except unreserved characters</strong> &mdash; use it when encoding a single component like a query parameter value. Using the wrong one is a common bug: if you use <code style={{ color: C.accent }}>encodeURI</code> on a query value containing <code style={{ color: C.accent }}>&amp;</code>, it won&apos;t encode it, breaking your URL structure.
                </p>
              </section>
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">The Space Encoding Debate: %20 vs +</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  Both <code style={{ color: C.accent }}>%20</code> and <code style={{ color: C.accent }}>+</code> represent spaces in URLs, but they come from different standards. <code style={{ color: C.accent }}>%20</code> is the RFC 3986 standard and works everywhere. <code style={{ color: C.accent }}>+</code> comes from the older <code style={{ color: C.accent }}>application/x-www-form-urlencoded</code> format used by HTML form submissions. In practice, most servers accept both in query strings. Use <code style={{ color: C.accent }}>%20</code> as the default &mdash; it&apos;s more universally compatible, especially in path segments where <code style={{ color: C.accent }}>+</code> is treated as a literal plus sign.
                </p>
              </section>
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Common Use Cases</h2>
                <div className="space-y-2" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  {[
                    ["API Query Strings", "Encode parameter values when building REST API requests"],
                    ["OAuth Redirect URIs", "Callback URLs must be fully encoded when passed as query parameters"],
                    ["UTM Parameters", "Marketing campaign names with spaces and special characters need encoding"],
                    ["File Paths", "Encode paths with spaces, accented characters, or special symbols"],
                    ["International URLs", "Non-ASCII characters (emoji, CJK, accented letters) require percent-encoding"],
                  ].map(([t, d]) => (
                    <div key={t} className="flex items-start gap-2"><span style={{ color: C.accent, flexShrink: 0 }}>{"\u2713"}</span><span><strong style={{ color: "var(--text)" }}>{t}:</strong> {d}</span></div>
                  ))}
                </div>
              </section>
              <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">100% Client-Side &mdash; Your Data Stays Private</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>
                  All encoding, decoding, and URL parsing runs entirely in your browser using native JavaScript APIs. No data is ever sent to a server, stored, or logged. This makes it safe to encode sensitive values like API keys, authentication tokens, OAuth callback URLs, and query strings containing personal data. Close the tab and everything is gone.
                </p>
              </section>
            </article>

            <div className="mb-10">
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {FAQS.map((f, i) => (
                  <details key={i} className="rounded-xl border group" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                    <summary className="px-5 py-4 cursor-pointer font-semibold" style={{ fontSize: "16px" }}>{f.q}</summary>
                    <div className="px-5 pb-4" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>{f.a}</div>
                  </details>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RELATED.map((r) => (
                  <a key={r.href} href={r.href} className="block rounded-xl border p-4 hover:shadow-lg transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                    <span className="text-xl mr-2">{r.emoji}</span><strong>{r.title}</strong>
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
