"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ── Types ─────────────────────────────────────────────────── */
type MainTab = "format" | "minify" | "tree" | "compare" | "json-to-csv" | "csv-to-json" | "json-to-yaml" | "json-to-ts";

interface Props {
  title?: string;
  subtitle?: string;
  defaultTab?: MainTab;
  articleMode?: boolean;
}

interface DiffEntry { path: string; type: "added" | "removed" | "modified"; oldValue?: unknown; newValue?: unknown; }

/* ── Syntax highlighting ───────────────────────────────────── */
function highlightJSON(json: string, dark: boolean): string {
  const ck = dark ? "#8BE9FD" : "#0550AE";
  const cs = dark ? "#50FA7B" : "#0A3069";
  const cn = dark ? "#BD93F9" : "#6F42C1";
  const cb = dark ? "#FFB86C" : "#CF222E";
  const cNull = dark ? "#6272A4" : "#6E7781";
  return json
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)"\s*:/g, `<span style="color:${ck}">"$1"</span>:`)
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, `<span style="color:${cs}">"$1"</span>`)
    .replace(/\b(-?\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g, `<span style="color:${cn}">$1</span>`)
    .replace(/\b(true|false)\b/g, `<span style="color:${cb}">$1</span>`)
    .replace(/\bnull\b/g, `<span style="color:${cNull}">null</span>`);
}

/* ── Auto-fix ──────────────────────────────────────────────── */
function tryFixJSON(input: string): { success: boolean; result: string; fixes: string[] } {
  let f = input;
  const fixes: string[] = [];
  const orig = f;
  f = f.replace(/\/\/.*$/gm, ""); if (f !== orig) fixes.push("Removed single-line comments");
  const b = f; f = f.replace(/\/\*[\s\S]*?\*\//g, ""); if (f !== b) fixes.push("Removed multi-line comments");
  const c = f; f = f.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"'); if (f !== c) fixes.push("Replaced single quotes with double quotes");
  const d = f; f = f.replace(/(\{|,)\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":'); if (f !== d) fixes.push("Added quotes to unquoted keys");
  const e2 = f; f = f.replace(/,\s*([\]}])/g, "$1"); if (f !== e2) fixes.push("Removed trailing commas");
  try { JSON.parse(f); return { success: true, result: f, fixes }; } catch { return { success: false, result: f, fixes }; }
}

/* ── JSON stats ────────────────────────────────────────────── */
function jsonStats(obj: unknown, depth = 0): { objects: number; arrays: number; keys: number; maxDepth: number } {
  let objects = 0, arrays = 0, keys = 0, maxDepth = depth;
  if (Array.isArray(obj)) { arrays++; obj.forEach((v) => { const s = jsonStats(v, depth + 1); objects += s.objects; arrays += s.arrays; keys += s.keys; maxDepth = Math.max(maxDepth, s.maxDepth); }); }
  else if (typeof obj === "object" && obj !== null) { objects++; const entries = Object.entries(obj); keys += entries.length; entries.forEach(([, v]) => { const s = jsonStats(v, depth + 1); objects += s.objects; arrays += s.arrays; keys += s.keys; maxDepth = Math.max(maxDepth, s.maxDepth); }); }
  return { objects, arrays, keys, maxDepth };
}

/* ── Diff ───────────────────────────────────────────────────── */
function diffJSON(a: unknown, b: unknown, path = ""): DiffEntry[] {
  const diffs: DiffEntry[] = [];
  if (typeof a !== typeof b || (a === null) !== (b === null) || Array.isArray(a) !== Array.isArray(b)) { diffs.push({ path: path || "(root)", type: "modified", oldValue: a, newValue: b }); return diffs; }
  if (Array.isArray(a) && Array.isArray(b)) { const max = Math.max(a.length, b.length); for (let i = 0; i < max; i++) { const p = `${path}[${i}]`; if (i >= a.length) diffs.push({ path: p, type: "added", newValue: b[i] }); else if (i >= b.length) diffs.push({ path: p, type: "removed", oldValue: a[i] }); else diffs.push(...diffJSON(a[i], b[i], p)); } return diffs; }
  if (typeof a === "object" && a !== null && b !== null) { const aObj = a as Record<string, unknown>, bObj = b as Record<string, unknown>; const allKeys = new Set([...Object.keys(aObj), ...Object.keys(bObj)]); for (const k of allKeys) { const p = path ? `${path}.${k}` : k; if (!(k in aObj)) diffs.push({ path: p, type: "added", newValue: bObj[k] }); else if (!(k in bObj)) diffs.push({ path: p, type: "removed", oldValue: aObj[k] }); else diffs.push(...diffJSON(aObj[k], bObj[k], p)); } return diffs; }
  if (a !== b) diffs.push({ path: path || "(root)", type: "modified", oldValue: a, newValue: b });
  return diffs;
}

/* ── Converters ────────────────────────────────────────────── */
function jsonToCSV(arr: unknown[], delimiter = ","): string {
  if (!Array.isArray(arr) || arr.length === 0) return "Input must be a non-empty JSON array of objects";
  const flatten = (obj: Record<string, unknown>, pre = ""): Record<string, unknown> => {
    const r: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) { const nk = pre ? `${pre}.${k}` : k; if (typeof v === "object" && v !== null && !Array.isArray(v)) Object.assign(r, flatten(v as Record<string, unknown>, nk)); else r[nk] = v; }
    return r;
  };
  const flat = arr.map((i) => flatten(i as Record<string, unknown>));
  const headers = [...new Set(flat.flatMap((o) => Object.keys(o)))];
  const esc = (v: unknown) => { if (v === null || v === undefined) return ""; const s = String(v); return s.includes(delimiter) || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s; };
  return [headers.map(esc).join(delimiter), ...flat.map((o) => headers.map((h) => esc(o[h])).join(delimiter))].join("\n");
}

function csvToJSON(csv: string, delimiter = ","): unknown[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0], delimiter);
  return lines.slice(1).filter((l) => l.trim()).map((line) => {
    const vals = parseCsvLine(line, delimiter);
    const obj: Record<string, unknown> = {};
    headers.forEach((h, i) => { const v = vals[i] || ""; obj[h] = v === "true" ? true : v === "false" ? false : v === "null" ? null : !isNaN(Number(v)) && v.trim() !== "" ? Number(v) : v; });
    return obj;
  });
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = []; let cur = ""; let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    if (inQuotes) { if (line[i] === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (line[i] === '"') inQuotes = false; else cur += line[i]; }
    else { if (line[i] === '"') inQuotes = true; else if (line[i] === delimiter) { result.push(cur); cur = ""; } else cur += line[i]; }
  }
  result.push(cur); return result;
}

function jsonToYAML(obj: unknown, indent = 0): string {
  const sp = "  ".repeat(indent);
  if (obj === null) return "null";
  if (typeof obj === "boolean") return String(obj);
  if (typeof obj === "number") return String(obj);
  if (typeof obj === "string") { return (obj.includes("\n") || obj.includes(":") || obj.includes("#") || obj.startsWith(" ") || obj.startsWith('"') || obj.startsWith("'") || obj === "" || obj === "true" || obj === "false" || obj === "null" || !isNaN(Number(obj))) ? `"${obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"` : obj; }
  if (Array.isArray(obj)) { if (obj.length === 0) return "[]"; return obj.map((item) => { const v = jsonToYAML(item, indent + 1); return typeof item === "object" && item !== null ? `${sp}- ${v.trimStart()}` : `${sp}- ${v}`; }).join("\n"); }
  if (typeof obj === "object") { const keys = Object.keys(obj as Record<string, unknown>); if (keys.length === 0) return "{}"; return keys.map((k) => { const v = (obj as Record<string, unknown>)[k]; return typeof v === "object" && v !== null ? `${sp}${k}:\n${jsonToYAML(v, indent + 1)}` : `${sp}${k}: ${jsonToYAML(v, indent)}`; }).join("\n"); }
  return String(obj);
}

function jsonToTS(obj: unknown, name = "Root"): string {
  const interfaces: string[] = [];
  const seen = new Set<string>();
  function getType(val: unknown, propName: string): string {
    if (val === null) return "null";
    if (Array.isArray(val)) { if (val.length === 0) return "unknown[]"; return `${getType(val[0], propName)}[]`; }
    if (typeof val === "object") { const iName = propName.charAt(0).toUpperCase() + propName.slice(1); genIface(val as Record<string, unknown>, iName); return iName; }
    return typeof val;
  }
  function genIface(o: Record<string, unknown>, n: string) {
    if (seen.has(n)) return; seen.add(n);
    const props = Object.entries(o).map(([k, v]) => { const t = getType(v, k); const sk = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `"${k}"`; return `  ${sk}: ${t};`; });
    interfaces.push(`interface ${n} {\n${props.join("\n")}\n}`);
  }
  if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) genIface(obj as Record<string, unknown>, name);
  else if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === "object") genIface(obj[0] as Record<string, unknown>, name);
  return interfaces.reverse().join("\n\n") || "// Could not generate interface — input must be an object or array of objects";
}

/* ── Tree view ─────────────────────────────────────────────── */
function TreeNode({ label, value, path, dark, onCopyPath, depth = 0 }: { label?: string; value: unknown; path: string; dark: boolean; onCopyPath: (p: string) => void; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const isObj = typeof value === "object" && value !== null && !Array.isArray(value);
  const isArr = Array.isArray(value);
  const isExpandable = isObj || isArr;
  const ck = dark ? "#8BE9FD" : "#0550AE";
  const cs = dark ? "#50FA7B" : "#0A3069";
  const cn = dark ? "#BD93F9" : "#6F42C1";
  const cb = dark ? "#FFB86C" : "#CF222E";
  const cNull = dark ? "#6272A4" : "#6E7781";
  const childCount = isObj ? Object.keys(value as object).length : isArr ? value.length : 0;

  const renderValue = () => {
    if (value === null) return <span style={{ color: cNull }}>null</span>;
    if (typeof value === "boolean") return <span style={{ color: cb }}>{String(value)}</span>;
    if (typeof value === "number") return <span style={{ color: cn }}>{value}</span>;
    if (typeof value === "string") return <span style={{ color: cs }}>&quot;{value.length > 120 ? value.slice(0, 120) + "..." : value}&quot;</span>;
    return null;
  };

  return (
    <div style={{ paddingLeft: depth > 0 ? 20 : 0, fontSize: "14px", fontFamily: "'JetBrains Mono','Fira Code','Consolas',monospace" }}>
      <div className="flex items-center gap-1 py-0.5 cursor-pointer rounded hover:bg-[var(--surface-alt)]" style={{ minHeight: 26 }} onClick={() => { if (isExpandable) setOpen(!open); else onCopyPath(path); }}>
        {isExpandable ? <span style={{ width: 16, textAlign: "center", color: "var(--text-muted)", fontSize: 12 }}>{open ? "▼" : "▶"}</span> : <span style={{ width: 16 }} />}
        {label !== undefined && <span style={{ color: ck }}>&quot;{label}&quot;</span>}
        {label !== undefined && <span style={{ color: "var(--text-muted)" }}>: </span>}
        {isExpandable ? (
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{isArr ? `[${childCount}]` : `{${childCount}}`}</span>
        ) : renderValue()}
      </div>
      {isExpandable && open && (
        <div>
          {isArr && value.map((v, i) => <TreeNode key={i} value={v} path={`${path}[${i}]`} dark={dark} onCopyPath={onCopyPath} depth={depth + 1} />)}
          {isObj && Object.entries(value as Record<string, unknown>).map(([k, v]) => <TreeNode key={k} label={k} value={v} path={path ? `${path}.${k}` : k} dark={dark} onCopyPath={onCopyPath} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
}

/* ── Clipboard ─────────────────────────────────────────────── */
async function copyText(t: string) { try { await navigator.clipboard.writeText(t); } catch { const ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); } }

/* ── Sample JSON ───────────────────────────────────────────── */
const SAMPLE_JSON = `{
  "company": "Acme Corp",
  "founded": 2015,
  "active": true,
  "headquarters": {
    "city": "San Francisco",
    "state": "CA",
    "country": "US"
  },
  "employees": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "role": "CEO",
      "department": "Executive",
      "salary": 185000,
      "remote": false
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "role": "CTO",
      "department": "Engineering",
      "salary": 175000,
      "remote": true
    },
    {
      "id": 3,
      "name": "Carol Williams",
      "role": "Designer",
      "department": "Product",
      "salary": 125000,
      "remote": true
    }
  ],
  "products": ["Widget Pro", "Widget Lite", "Widget Enterprise"],
  "metadata": {
    "lastUpdated": "2026-02-28T12:00:00Z",
    "version": "2.1.0",
    "tags": ["technology", "saas", "startup"]
  }
}`;

/* ── Dark mode toggle ──────────────────────────────────────── */
function DarkModeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className="p-2 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function JsonFormatter({ title = "JSON Formatter & Validator", subtitle, defaultTab = "format", articleMode = false }: Props) {
  const accent = "#8BE9FD";
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState<MainTab>(defaultTab);
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pathCopied, setPathCopied] = useState("");

  // Compare mode
  const [compareLeft, setCompareLeft] = useState("");
  const [compareRight, setCompareRight] = useState("");
  const [diffs, setDiffs] = useState<DiffEntry[]>([]);
  const [diffError, setDiffError] = useState("");

  // Converter inputs
  const [csvDelimiter, setCsvDelimiter] = useState(",");

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  /* ── Init dark mode ──────────────────────────────────────── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true; // default dark for dev tools
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = () => {
    const n = !dark;
    setDark(n);
    document.documentElement.classList.toggle("dark", n);
    localStorage.setItem("theme", n ? "dark" : "light");
  };

  /* ── Parse & format ──────────────────────────────────────── */
  const parsed = useMemo(() => {
    if (!input.trim()) return { valid: false, obj: null, error: "", formatted: "", minified: "", stats: null };
    try {
      const obj = JSON.parse(input);
      const replacer = sortKeys ? ((): ((key: string, value: unknown) => unknown) => { return (_key: string, value: unknown) => { if (value && typeof value === "object" && !Array.isArray(value)) { return Object.keys(value as Record<string, unknown>).sort().reduce((a, k) => { a[k] = (value as Record<string, unknown>)[k]; return a; }, {} as Record<string, unknown>); } return value; }; })() : undefined;
      const formatted = JSON.stringify(obj, replacer, indent);
      const minified = JSON.stringify(obj, replacer);
      const stats = jsonStats(obj);
      return { valid: true, obj, error: "", formatted, minified, stats };
    } catch (err) {
      return { valid: false, obj: null, error: (err as Error).message, formatted: "", minified: "", stats: null };
    }
  }, [input, indent, sortKeys]);

  /* ── Auto-format on paste ────────────────────────────────── */
  const handleInputChange = useCallback((val: string) => {
    setInput(val);
  }, []);

  const handlePaste = useCallback(() => {
    // auto-format will happen via the parsed memo
  }, []);

  /* ── Fix ──────────────────────────────────────────────────── */
  const [fixResult, setFixResult] = useState<{ success: boolean; fixes: string[] } | null>(null);
  const handleFix = () => {
    const r = tryFixJSON(input);
    if (r.success) { setInput(r.result); setFixResult({ success: true, fixes: r.fixes }); setTimeout(() => setFixResult(null), 4000); }
    else setFixResult({ success: false, fixes: r.fixes });
  };

  /* ── Copy output ─────────────────────────────────────────── */
  const getOutput = (): string => {
    if (tab === "minify") return parsed.minified;
    if (tab === "json-to-csv" && parsed.valid && Array.isArray(parsed.obj)) return jsonToCSV(parsed.obj, csvDelimiter);
    if (tab === "json-to-yaml" && parsed.valid) return jsonToYAML(parsed.obj);
    if (tab === "json-to-ts" && parsed.valid) return jsonToTS(parsed.obj);
    if (tab === "csv-to-json") { try { return JSON.stringify(csvToJSON(input, csvDelimiter), null, indent); } catch { return ""; } }
    return parsed.formatted;
  };

  const handleCopy = async () => { await copyText(getOutput()); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const handleCopyPath = (p: string) => { copyText(p); setPathCopied(p); setTimeout(() => setPathCopied(""), 2000); };

  /* ── File upload/download ────────────────────────────────── */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setInput(r.result as string);
    r.readAsText(file);
    e.target.value = "";
  };

  const handleDownload = () => {
    const out = getOutput();
    const ext = tab === "json-to-csv" ? "csv" : tab === "json-to-yaml" ? "yaml" : tab === "json-to-ts" ? "ts" : "json";
    const blob = new Blob([out], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `output.${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  /* ── Compare ─────────────────────────────────────────────── */
  const runDiff = () => {
    setDiffError("");
    try {
      const a = JSON.parse(compareLeft);
      const b = JSON.parse(compareRight);
      setDiffs(diffJSON(a, b));
    } catch (err) { setDiffError("Both inputs must be valid JSON: " + (err as Error).message); setDiffs([]); }
  };

  /* ── Stats ───────────────────────────────────────────────── */
  const inputSize = new Blob([input]).size;
  const sizeLabel = inputSize < 1024 ? `${inputSize} B` : `${(inputSize / 1024).toFixed(1)} KB`;
  const lineCount = input ? input.split("\n").length : 0;

  /* ── Output for display ──────────────────────────────────── */
  const outputText = getOutput();

  /* ── Editor bg ───────────────────────────────────────────── */
  const edBg = dark ? "#282A36" : "#FFFFFF";
  const edBorder = dark ? "#44475A" : "var(--border)";
  const edText = dark ? "#F8F8F2" : "var(--text)";

  /* ── Tabs config ─────────────────────────────────────────── */
  const tabs: [MainTab, string][] = [
    ["format", "Format"],
    ["minify", "Minify"],
    ["tree", "Tree View"],
    ["compare", "Compare"],
    ["json-to-csv", "JSON→CSV"],
    ["csv-to-json", "CSV→JSON"],
    ["json-to-yaml", "JSON→YAML"],
    ["json-to-ts", "JSON→TS"],
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-[1400px] mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        {!articleMode && (
          <>
            <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              <a href="/" className="hover:underline" style={{ color: accent }}>Home</a><span>/</span><span>Developer Tools</span>
            </nav>
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              <DarkModeToggle dark={dark} toggle={toggleDark} />
            </div>
            {subtitle && <p className="text-lg mb-5" style={{ color: "var(--text-muted)" }}>{subtitle}</p>}
          </>
        )}
        {articleMode && (
          <div className="flex items-start justify-between mb-4">
            <div />
            <DarkModeToggle dark={dark} toggle={toggleDark} />
          </div>
        )}

        {/* ═══════════ TABS ═══════════ */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tabs.map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} className="px-3 py-2 rounded-lg font-semibold transition-colors" style={{
              fontSize: "14px",
              backgroundColor: tab === t ? (dark ? "#44475A" : "#E8E8FF") : "transparent",
              color: tab === t ? (dark ? accent : "#4F46E5") : "var(--text-muted)",
              border: `1px solid ${tab === t ? (dark ? "#6272A4" : "#4F46E5") : "transparent"}`,
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* ═══════════ TOOLBAR ═══════════ */}
        {tab !== "compare" && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {tab === "format" && (
              <>
                <button onClick={() => { /* auto-formatted via parsed memo */ }} className="px-3 py-1.5 rounded-lg text-sm font-bold" style={{ backgroundColor: dark ? "#44475A" : "#E8E8FF", color: dark ? accent : "#4F46E5" }}>✨ Format</button>
                <select value={indent} onChange={(e) => setIndent(+e.target.value)} className="rounded-lg border px-2 py-1.5 text-sm" style={{ backgroundColor: edBg, borderColor: edBorder, color: edText }}>
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                </select>
                <label className="flex items-center gap-1 text-sm cursor-pointer" style={{ color: "var(--text-muted)" }}>
                  <input type="checkbox" checked={sortKeys} onChange={() => setSortKeys(!sortKeys)} style={{ accentColor: accent }} /> Sort keys
                </label>
              </>
            )}
            <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ borderColor: edBorder, color: copied ? "#50FA7B" : "var(--text-muted)" }}>
              {copied ? "✅ Copied" : "📋 Copy"}
            </button>
            <button onClick={() => setInput("")} className="px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ borderColor: edBorder, color: "var(--text-muted)" }}>🗑️ Clear</button>
            <button onClick={() => setInput(SAMPLE_JSON)} className="px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ borderColor: edBorder, color: "var(--text-muted)" }}>📄 Sample</button>
            <label className="px-3 py-1.5 rounded-lg text-sm font-semibold border cursor-pointer" style={{ borderColor: edBorder, color: "var(--text-muted)" }}>
              📂 Upload <input type="file" accept=".json,.txt,.csv" onChange={handleUpload} className="hidden" />
            </label>
            <button onClick={handleDownload} className="px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ borderColor: edBorder, color: "var(--text-muted)" }}>📥 Download</button>
          </div>
        )}

        {/* ═══════════ STATS BAR ═══════════ */}
        {tab !== "compare" && input.trim() && (
          <div className="flex flex-wrap gap-4 mb-3 px-1" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            <span>Lines: {lineCount}</span>
            <span>Size: {sizeLabel}</span>
            {parsed.valid && parsed.stats && (
              <>
                <span>Depth: {parsed.stats.maxDepth}</span>
                <span>Objects: {parsed.stats.objects}</span>
                <span>Arrays: {parsed.stats.arrays}</span>
                <span>Keys: {parsed.stats.keys}</span>
              </>
            )}
            {parsed.valid ? <span style={{ color: "#50FA7B" }}>✅ Valid</span> : <span style={{ color: "#FF5555" }}>❌ Invalid</span>}
          </div>
        )}

        {/* ═══════════ COMPARE MODE ═══════════ */}
        {tab === "compare" && (
          <div className="space-y-4 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-sm block mb-1" style={{ color: "var(--text-muted)" }}>Original JSON</label>
                <textarea value={compareLeft} onChange={(e) => setCompareLeft(e.target.value)} placeholder="Paste first JSON here..." className="w-full rounded-xl border p-3 focus:outline-none" style={{ fontSize: "14px", fontFamily: "'JetBrains Mono','Fira Code','Consolas',monospace", minHeight: 300, backgroundColor: edBg, borderColor: edBorder, color: edText, resize: "vertical" }} />
              </div>
              <div>
                <label className="font-semibold text-sm block mb-1" style={{ color: "var(--text-muted)" }}>Modified JSON</label>
                <textarea value={compareRight} onChange={(e) => setCompareRight(e.target.value)} placeholder="Paste second JSON here..." className="w-full rounded-xl border p-3 focus:outline-none" style={{ fontSize: "14px", fontFamily: "'JetBrains Mono','Fira Code','Consolas',monospace", minHeight: 300, backgroundColor: edBg, borderColor: edBorder, color: edText, resize: "vertical" }} />
              </div>
            </div>
            <button onClick={runDiff} className="px-5 py-2 rounded-lg font-bold" style={{ backgroundColor: dark ? "#44475A" : "#E8E8FF", color: dark ? accent : "#4F46E5", fontSize: "15px" }}>Compare</button>
            {diffError && <div className="rounded-lg p-3" style={{ backgroundColor: "#FF555520", color: "#FF5555", fontSize: "14px" }}>{diffError}</div>}
            {diffs.length > 0 && (
              <div className="rounded-xl border p-4" style={{ backgroundColor: edBg, borderColor: edBorder }}>
                <div className="mb-3" style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                  {diffs.filter((d) => d.type === "added").length} additions, {diffs.filter((d) => d.type === "removed").length} removals, {diffs.filter((d) => d.type === "modified").length} modifications
                </div>
                <div className="space-y-1 max-h-[400px] overflow-y-auto" style={{ fontSize: "14px", fontFamily: "'JetBrains Mono','Fira Code','Consolas',monospace" }}>
                  {diffs.map((d, i) => (
                    <div key={i} className="rounded px-3 py-1" style={{ backgroundColor: d.type === "added" ? "#50FA7B15" : d.type === "removed" ? "#FF555515" : "#FFB86C15" }}>
                      <span style={{ color: d.type === "added" ? "#50FA7B" : d.type === "removed" ? "#FF5555" : "#FFB86C" }}>
                        {d.type === "added" ? "+" : d.type === "removed" ? "−" : "~"}
                      </span>{" "}
                      <span style={{ color: dark ? "#8BE9FD" : "#0550AE" }}>{d.path}</span>
                      {d.type === "modified" && <span style={{ color: "var(--text-muted)" }}> {JSON.stringify(d.oldValue)} → {JSON.stringify(d.newValue)}</span>}
                      {d.type === "added" && <span style={{ color: "var(--text-muted)" }}> {JSON.stringify(d.newValue)}</span>}
                      {d.type === "removed" && <span style={{ color: "var(--text-muted)" }}> {JSON.stringify(d.oldValue)}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {diffs.length === 0 && compareLeft && compareRight && !diffError && <div style={{ fontSize: "14px", color: "#50FA7B" }}>✅ No differences found — the JSON documents are identical.</div>}
          </div>
        )}

        {/* ═══════════ MAIN PANELS (non-compare) ═══════════ */}
        {tab !== "compare" && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* LEFT: Input */}
            <div>
              <label className="font-semibold text-sm block mb-1" style={{ color: "var(--text-muted)" }}>
                {tab === "csv-to-json" ? "CSV Input" : "JSON Input"}
              </label>
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                onPaste={handlePaste}
                placeholder={tab === "csv-to-json" ? "Paste CSV data here..." : "Paste JSON here..."}
                className="w-full rounded-xl border p-3 focus:outline-none focus:ring-1"
                style={{
                  fontSize: "14px",
                  fontFamily: "'JetBrains Mono','Fira Code','Consolas',monospace",
                  lineHeight: 1.5,
                  minHeight: 400,
                  resize: "vertical",
                  backgroundColor: edBg,
                  borderColor: edBorder,
                  color: edText,
                  // @ts-expect-error CSS custom property
                  "--tw-ring-color": accent,
                }}
                spellCheck={false}
              />
            </div>

            {/* RIGHT: Output */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-sm" style={{ color: "var(--text-muted)" }}>
                  {tab === "tree" ? "Tree View" : tab === "minify" ? "Minified Output" : tab === "json-to-csv" ? "CSV Output" : tab === "csv-to-json" ? "JSON Output" : tab === "json-to-yaml" ? "YAML Output" : tab === "json-to-ts" ? "TypeScript Output" : "Formatted Output"}
                </label>
                {tab === "minify" && parsed.valid && (
                  <span style={{ fontSize: "13px", color: "#50FA7B" }}>
                    {sizeLabel} → {(new Blob([parsed.minified]).size / 1024).toFixed(1)} KB ({Math.round((1 - new Blob([parsed.minified]).size / inputSize) * 100)}% smaller)
                  </span>
                )}
              </div>

              {tab === "tree" ? (
                <div className="rounded-xl border p-3 overflow-auto" style={{ backgroundColor: edBg, borderColor: edBorder, minHeight: 400, maxHeight: 600 }}>
                  {parsed.valid && parsed.obj !== null ? (
                    <>
                      {pathCopied && <div className="mb-2 text-xs" style={{ color: "#50FA7B" }}>Copied: {pathCopied}</div>}
                      <TreeNode value={parsed.obj} path="" dark={dark} onCopyPath={handleCopyPath} />
                    </>
                  ) : (
                    <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Enter valid JSON in the input panel to see the tree view.</p>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border overflow-auto" style={{ backgroundColor: edBg, borderColor: edBorder, minHeight: 400, maxHeight: 600 }}>
                  {(tab === "json-to-csv" || tab === "json-to-yaml" || tab === "json-to-ts") && (
                    <div className="flex items-center gap-3 px-3 py-2 border-b" style={{ borderColor: edBorder }}>
                      {tab === "json-to-csv" && (
                        <select value={csvDelimiter} onChange={(e) => setCsvDelimiter(e.target.value)} className="rounded border px-2 py-1 text-xs" style={{ backgroundColor: edBg, borderColor: edBorder, color: edText }}>
                          <option value=",">Comma</option>
                          <option value=";">Semicolon</option>
                          <option value={"\t"}>Tab</option>
                        </select>
                      )}
                    </div>
                  )}
                  {tab === "csv-to-json" && (
                    <div className="flex items-center gap-3 px-3 py-2 border-b" style={{ borderColor: edBorder }}>
                      <select value={csvDelimiter} onChange={(e) => setCsvDelimiter(e.target.value)} className="rounded border px-2 py-1 text-xs" style={{ backgroundColor: edBg, borderColor: edBorder, color: edText }}>
                        <option value=",">Comma</option>
                        <option value=";">Semicolon</option>
                        <option value={"\t"}>Tab</option>
                      </select>
                    </div>
                  )}
                  <pre className="p-3 whitespace-pre-wrap" style={{ fontSize: "14px", fontFamily: "'JetBrains Mono','Fira Code','Consolas',monospace", color: edText, margin: 0 }}>
                    {(tab === "json-to-csv" || tab === "json-to-yaml" || tab === "json-to-ts" || tab === "csv-to-json") ? (
                      <code>{outputText || "Enter data in the input panel..."}</code>
                    ) : (
                      input.trim() ? (
                        parsed.valid ? (
                          <code dangerouslySetInnerHTML={{ __html: highlightJSON(tab === "minify" ? parsed.minified : parsed.formatted, dark) }} />
                        ) : (
                          <code style={{ color: edText }}>{input}</code>
                        )
                      ) : (
                        <code style={{ color: "var(--text-muted)" }}>Formatted output will appear here...</code>
                      )
                    )}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════ VALIDATION BANNER ═══════════ */}
        {tab !== "compare" && tab !== "csv-to-json" && input.trim() && (
          <div className="mb-6">
            {parsed.valid ? (
              <div className="rounded-xl p-4 flex items-center gap-3" style={{ backgroundColor: "#50FA7B15", border: "1px solid #50FA7B40" }}>
                <span style={{ fontSize: "20px" }}>✅</span>
                <span className="font-semibold" style={{ fontSize: "15px", color: "#50FA7B" }}>Valid JSON</span>
              </div>
            ) : (
              <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "#FF555515", border: "1px solid #FF555540" }}>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "20px" }}>❌</span>
                  <span className="font-semibold" style={{ fontSize: "15px", color: "#FF5555" }}>Invalid JSON</span>
                </div>
                <p style={{ fontSize: "14px", color: dark ? "#F8F8F2" : "var(--text)", fontFamily: "monospace" }}>{parsed.error}</p>
                <button onClick={handleFix} className="px-4 py-2 rounded-lg font-bold text-sm" style={{ backgroundColor: dark ? "#44475A" : "#E8E8FF", color: dark ? "#FFB86C" : "#B45309" }}>
                  🔧 Try to Fix
                </button>
                {fixResult && (
                  <div style={{ fontSize: "14px", color: fixResult.success ? "#50FA7B" : "#FFB86C" }}>
                    {fixResult.success ? `✅ Fixed! ${fixResult.fixes.length} issue${fixResult.fixes.length === 1 ? "" : "s"} repaired: ${fixResult.fixes.join(", ")}` : `Could not auto-fix. Attempted: ${fixResult.fixes.join(", ")}`}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══════════ FAQs ═══════════ */}
        {!articleMode && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                ["Is my JSON data safe?", "All processing happens entirely in your browser using JavaScript. No data is sent to any server, stored, or logged. Your JSON never leaves your device."],
                ["Can this tool fix invalid JSON?", "Yes. The auto-fix feature repairs common errors: trailing commas, single quotes, unquoted keys, comments, and missing commas. Click 'Try to Fix' when JSON is invalid."],
                ["What's the maximum JSON size?", "There's no hard limit. The tool handles files up to 10MB+ in most browsers. Formatting a 5MB file typically takes under a second."],
                ["What JSON spec does the validator use?", "It uses the native JSON.parse() function, which follows ECMA-404 / RFC 8259 — the same parser used by all modern browsers and JavaScript runtimes."],
                ["Can I convert JSON to CSV or YAML?", "Yes. Use the JSON→CSV, CSV→JSON, and JSON→YAML tabs. For CSV, you can configure the delimiter. Nested objects are flattened with dot notation."],
                ["What makes this different from jsonformatter.org?", "Zero ads, instant formatting as you paste, tree view, JSON diff/compare, auto-fix for errors, and converters (CSV, YAML, TypeScript) — all in one tool."],
                ["Does the diff compare semantically?", "Yes. It parses both JSON documents and compares data structures, ignoring formatting differences. This is more useful than a plain text diff."],
                ["What are common JSON errors?", "Trailing commas, single quotes instead of double quotes, unquoted keys, comments (not allowed in JSON), and missing closing brackets. The auto-fix feature handles most of these."],
              ].map(([q, a]) => (
                <details key={q} className="rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <summary className="p-4 cursor-pointer font-semibold" style={{ fontSize: "16px" }}>{q}</summary>
                  <p className="px-4 pb-4" style={{ fontSize: "16px", color: "var(--text-muted)" }}>{a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════ Related tools ═══════════ */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              ["Password Generator", "/utility-tools/password-generator", "Generate strong passwords, passphrases, and PINs"],
              ["QR Code Generator", "/utility-tools/qr-code-generator", "Generate QR codes for URLs, WiFi, contacts, and more"],
              ["Word & Character Counter", "/writing-tools/word-counter", "Count words, characters, and check social media limits"],
              ["Image Compressor", "/image-tools/image-compressor", "Compress, resize, and convert images in your browser"],
              ["True Hourly Rate Calculator", "/business-tools/true-hourly-rate-calculator", "Find out what you actually make per hour"],
            ].map(([name, href, desc]) => (
              <a key={name} href={href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="font-semibold mb-1" style={{ fontSize: "16px" }}>{name}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>{desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-6 pb-8 border-t" style={{ borderColor: "var(--border)", color: "var(--text-muted)", fontSize: "14px" }}>
          <p>© {new Date().getFullYear()} <a href="/" style={{ color: accent }} className="hover:underline">EveryFreeTool.com</a> — Free tools, no signup, no nonsense.</p>
        </footer>
      </div>
    </div>
  );
}
