"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";

/* ── Types ─────────────────────────────────────────────────── */
interface Props {
  title?: string;
  subtitle?: string;
  articleMode?: boolean;
  expandSocial?: boolean;
}

interface Stats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
  speakingTime: string;
  avgWordLength: string;
  avgSentenceLength: string;
}

interface KeywordEntry { keyword: string; count: number; density: string; }

/* ── Stop words ────────────────────────────────────────────── */
const STOP_WORDS = new Set([
  "the","be","to","of","and","a","in","that","have","i","it","for","not","on","with","he","as","you","do","at",
  "this","but","his","by","from","they","we","say","her","she","or","an","will","my","one","all","would","there",
  "their","what","so","up","out","if","about","who","get","which","go","me","when","make","can","like","time","no",
  "just","him","know","take","people","into","year","your","good","some","could","them","see","other","than","then",
  "now","look","only","come","its","over","think","also","back","after","use","two","how","our","work","first",
  "well","way","even","new","want","because","any","these","give","day","most","us","are","was","were","been","has",
  "had","did","does","is","am","being","more","very","much","too","such","own","each","every","both","few","those",
]);

/* ── Social media limits ───────────────────────────────────── */
const SOCIAL_LIMITS = [
  { name: "X (Twitter) Post", icon: "𝕏", limit: 280, optimal: "70-100 characters for highest engagement" },
  { name: "Instagram Caption", icon: "📸", limit: 2200, optimal: "First 125 characters visible before 'More'" },
  { name: "Instagram Bio", icon: "📸", limit: 150, optimal: null },
  { name: "LinkedIn Post", icon: "💼", limit: 3000, optimal: "First 210 characters visible before 'See more'" },
  { name: "LinkedIn Article", icon: "💼", limit: 125000, optimal: null },
  { name: "Facebook Post", icon: "📘", limit: 63206, optimal: "40-80 characters get 66% more engagement" },
  { name: "TikTok Caption", icon: "🎵", limit: 4000, optimal: null },
  { name: "Threads Post", icon: "🧵", limit: 500, optimal: null },
  { name: "Pinterest Description", icon: "📌", limit: 500, optimal: null },
  { name: "YouTube Title", icon: "▶️", limit: 100, optimal: null },
  { name: "YouTube Description", icon: "▶️", limit: 5000, optimal: null },
  { name: "Google Meta Title", icon: "🔍", limit: 60, optimal: "50-60 characters for full display" },
  { name: "Google Meta Description", icon: "🔍", limit: 160, optimal: "150-160 characters for full display" },
  { name: "Email Subject Line", icon: "✉️", limit: 60, optimal: null },
  { name: "SMS Message", icon: "💬", limit: 160, optimal: null },
];

/* ── Helpers ───────────────────────────────────────────────── */
function formatTime(minutes: number): string {
  if (minutes < 1) {
    const s = Math.ceil(minutes * 60);
    return s <= 0 ? "0 min" : `${s} sec`;
  }
  if (minutes < 60) return `${Math.ceil(minutes)} min`;
  const h = Math.floor(minutes / 60);
  const m = Math.ceil(minutes % 60);
  return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
}

function calcStats(text: string): Stats {
  if (!text || !text.trim()) {
    return { characters: 0, charactersNoSpaces: 0, words: 0, sentences: 0, paragraphs: 0, lines: 0, readingTime: "0 min", speakingTime: "0 min", avgWordLength: "0", avgSentenceLength: "0" };
  }
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const paragraphCount = paragraphs.length || (text.trim().length > 0 ? 1 : 0);
  const lineCount = text.split(/\n/).length;
  const totalCharInWords = words.reduce((s, w) => s + w.length, 0);
  return {
    characters,
    charactersNoSpaces,
    words: wordCount,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    lines: lineCount,
    readingTime: formatTime(wordCount / 238),
    speakingTime: formatTime(wordCount / 150),
    avgWordLength: wordCount > 0 ? (totalCharInWords / wordCount).toFixed(1) : "0",
    avgSentenceLength: sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : "0",
  };
}

function countSyllables(word: string): number {
  let w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  w = w.replace(/^y/, "");
  const m = w.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function calcReadability(text: string, wordCount: number, sentenceCount: number) {
  if (wordCount < 10 || sentenceCount < 1) return null;
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const totalSyllables = words.reduce((s, w) => s + countSyllables(w), 0);
  const asl = wordCount / sentenceCount;
  const asw = totalSyllables / wordCount;
  const flesch = 206.835 - 1.015 * asl - 84.6 * asw;
  const grade = 0.39 * asl + 11.8 * asw - 15.59;
  return { flesch: Math.round(flesch * 10) / 10, grade: Math.round(grade * 10) / 10 };
}

function fleschLabel(score: number): string {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Difficult";
  if (score >= 30) return "Difficult";
  return "Very Confusing";
}

function fleschColor(score: number): string {
  if (score >= 70) return "#059669";
  if (score >= 50) return "#D97706";
  return "#DC2626";
}

function getKeywordDensity(text: string, includeBigrams: boolean, includeTrigrams: boolean, excludeCommon: boolean): KeywordEntry[] {
  const words = text.toLowerCase().replace(/[^\w\s'-]/g, " ").split(/\s+/).filter((w) => w.length >= 3);
  const totalWords = words.length;
  if (totalWords === 0) return [];
  const counts: Record<string, number> = {};
  for (const w of words) {
    if (excludeCommon && STOP_WORDS.has(w)) continue;
    counts[w] = (counts[w] || 0) + 1;
  }
  if (includeBigrams) {
    for (let i = 0; i < words.length - 1; i++) {
      if (excludeCommon && (STOP_WORDS.has(words[i]) || STOP_WORDS.has(words[i + 1]))) continue;
      const bg = `${words[i]} ${words[i + 1]}`;
      counts[bg] = (counts[bg] || 0) + 1;
    }
  }
  if (includeTrigrams) {
    for (let i = 0; i < words.length - 2; i++) {
      if (excludeCommon && (STOP_WORDS.has(words[i]) || STOP_WORDS.has(words[i + 1]) || STOP_WORDS.has(words[i + 2]))) continue;
      const tg = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      counts[tg] = (counts[tg] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([keyword, count]) => ({ keyword, count, density: ((count / totalWords) * 100).toFixed(1) + "%" }));
}

/* ── Case converters ───────────────────────────────────────── */
function toTitleCase(s: string): string { return s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()); }
function toSentenceCase(s: string): string { return s.replace(/(^\s*\w|[.!?]\s+\w)/gm, (c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase()); }

/* ── Clipboard ─────────────────────────────────────────────── */
async function copyText(t: string) {
  try { await navigator.clipboard.writeText(t); } catch {
    const ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
  }
}

/* ── Dark mode toggle ──────────────────────────────────────── */
function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggle = () => { const n = !dark; document.documentElement.classList.toggle("dark", n); localStorage.setItem("theme", n ? "dark" : "light"); setDark(n); };
  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className="p-2 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function WordCounter({ title = "Word Counter", subtitle, articleMode = false, expandSocial = false }: Props) {
  const accent = "#4F46E5";
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findVal, setFindVal] = useState("");
  const [replaceVal, setReplaceVal] = useState("");
  const [showSecondary, setShowSecondary] = useState(false);
  const [showSocial, setShowSocial] = useState(expandSocial);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showReadability, setShowReadability] = useState(false);
  const [showTransforms, setShowTransforms] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [includeBigrams, setIncludeBigrams] = useState(true);
  const [includeTrigrams, setIncludeTrigrams] = useState(false);
  const [excludeCommon, setExcludeCommon] = useState(true);

  // Debounced heavy calculations
  const [keywords, setKeywords] = useState<KeywordEntry[]>([]);
  const [readability, setReadability] = useState<{ flesch: number; grade: number } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  /* ── Stats (instant) ─────────────────────────────────────── */
  const stats = useMemo(() => calcStats(text), [text]);

  /* ── Debounced heavy calcs ───────────────────────────────── */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const delay = stats.words > 5000 ? 300 : 0;
    debounceRef.current = setTimeout(() => {
      setKeywords(getKeywordDensity(text, includeBigrams, includeTrigrams, excludeCommon));
      setReadability(calcReadability(text, stats.words, stats.sentences));
    }, delay);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [text, stats.words, stats.sentences, includeBigrams, includeTrigrams, excludeCommon]);

  /* ── Toolbar actions ─────────────────────────────────────── */
  const handleClear = () => {
    if (text.length > 100 && !confirm("Clear all text?")) return;
    setText("");
    textareaRef.current?.focus();
  };
  const handleCopy = async () => { await copyText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handlePaste = async () => {
    try { const t = await navigator.clipboard.readText(); setText((p) => p + t); } catch { /* clipboard not available */ }
  };
  const handleSelectAll = () => { textareaRef.current?.select(); };

  const doReplace = useCallback((all: boolean) => {
    if (!findVal) return;
    if (all) { setText((t) => t.split(findVal).join(replaceVal)); }
    else { setText((t) => { const i = t.indexOf(findVal); return i === -1 ? t : t.slice(0, i) + replaceVal + t.slice(i + findVal.length); }); }
  }, [findVal, replaceVal]);

  const applyTransform = (fn: (s: string) => string) => { setText(fn(text)); };

  /* ── File upload ─────────────────────────────────────────── */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "txt" || ext === "md") {
      const r = new FileReader();
      r.onload = () => setText(r.result as string);
      r.readAsText(file);
    } else if (ext === "docx") {
      try {
        const mammoth = (await import("mammoth")).default;
        const buf = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: buf });
        setText(result.value);
      } catch { alert("Could not read .docx file."); }
    } else { alert("Supported formats: .txt, .md, .docx"); }
    e.target.value = "";
  };

  /* ── Social media sort (over-limit first) ────────────────── */
  const sortedSocial = useMemo(() => {
    const charCount = stats.characters;
    return [...SOCIAL_LIMITS].sort((a, b) => {
      const aOver = charCount > a.limit ? 1 : 0;
      const bOver = charCount > b.limit ? 1 : 0;
      return bOver - aOver;
    });
  }, [stats.characters]);

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-[1100px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        {!articleMode && (
          <>
            <nav className="flex items-center gap-1 text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              <a href="/" className="hover:underline" style={{ color: accent }}>Home</a><span>/</span><span>Writing Tools</span>
            </nav>
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              <DarkModeToggle />
            </div>
            {subtitle && <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>{subtitle}</p>}
          </>
        )}
        {articleMode && (
          <div className="flex items-start justify-between mb-6">
            <div />
            <DarkModeToggle />
          </div>
        )}

        {/* ═══════════ STATS BAR ═══════════ */}
        <div className="rounded-xl border p-4 mb-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center" aria-live="polite" aria-atomic="true">
            {([
              ["Words", stats.words],
              ["Characters", stats.characters.toLocaleString()],
              ["Sentences", stats.sentences],
              ["Paragraphs", stats.paragraphs],
              ["Reading Time", stats.readingTime],
            ] as [string, string | number][]).map(([label, val]) => (
              <div key={label}>
                <div className="font-bold" style={{ fontSize: "26px", color: accent }}>{val}</div>
                <div className="uppercase tracking-wider" style={{ fontSize: "15px", color: "var(--text-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
          {/* Secondary stats toggle */}
          <button onClick={() => setShowSecondary(!showSecondary)} className="mt-3 text-sm w-full text-center" style={{ color: "var(--text-muted)" }}>
            {showSecondary ? "▲ Hide details" : "▼ More stats"}
          </button>
          {showSecondary && (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
              {([
                ["Chars (no spaces)", stats.charactersNoSpaces.toLocaleString()],
                ["Speaking Time", stats.speakingTime],
                ["Lines", stats.lines],
                ["Avg Word Length", stats.avgWordLength + " chars"],
                ["Avg Sentence Length", stats.avgSentenceLength + " words"],
              ] as [string, string][]).map(([label, val]) => (
                <div key={label}>
                  <div className="font-bold" style={{ fontSize: "22px" }}>{val}</div>
                  <div className="uppercase tracking-wider" style={{ fontSize: "15px", color: "var(--text-muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════ TOOLBAR ═══════════ */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {([
            ["🗑️ Clear", handleClear],
            [copied ? "✅ Copied" : "📋 Copy", handleCopy],
            ["📋+ Paste", handlePaste],
            ["Select All", handleSelectAll],
          ] as [string, () => void][]).map(([label, fn]) => (
            <button key={label} onClick={fn} className="px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--text-muted)" }}>
              {label}
            </button>
          ))}
          <button onClick={() => setShowFindReplace(!showFindReplace)} className="px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ borderColor: showFindReplace ? accent : "var(--border)", backgroundColor: "var(--surface)", color: showFindReplace ? accent : "var(--text-muted)" }}>
            🔍 Find & Replace
          </button>
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--text-muted)" }}>
              Aa Case ▾
            </button>
            <div className="hidden group-hover:block absolute left-0 top-full mt-1 rounded-lg border shadow-lg z-10 min-w-[180px]" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              {([
                ["UPPERCASE", (s: string) => s.toUpperCase()],
                ["lowercase", (s: string) => s.toLowerCase()],
                ["Title Case", toTitleCase],
                ["Sentence case", toSentenceCase],
              ] as [string, (s: string) => string][]).map(([label, fn]) => (
                <button key={label} onClick={() => applyTransform(fn)} className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg)] transition-colors" style={{ color: "var(--text)" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Find & Replace panel */}
        {showFindReplace && (
          <div className="rounded-xl border p-4 mb-2 flex flex-wrap items-center gap-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <input type="text" value={findVal} onChange={(e) => setFindVal(e.target.value)} placeholder="Find..." className="rounded-lg border px-3 py-2 flex-1 min-w-[120px]" style={{ fontSize: "15px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
            <input type="text" value={replaceVal} onChange={(e) => setReplaceVal(e.target.value)} placeholder="Replace..." className="rounded-lg border px-3 py-2 flex-1 min-w-[120px]" style={{ fontSize: "15px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
            <button onClick={() => doReplace(false)} className="px-3 py-2 rounded-lg text-sm font-semibold" style={{ backgroundColor: accent, color: "#fff" }}>Replace</button>
            <button onClick={() => doReplace(true)} className="px-3 py-2 rounded-lg text-sm font-semibold border" style={{ borderColor: accent, color: accent }}>Replace All</button>
          </div>
        )}

        {/* ═══════════ TEXTAREA ═══════════ */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full rounded-xl border p-4 mb-2 focus:outline-none focus:ring-2"
          style={{
            fontSize: "18px",
            lineHeight: 1.65,
            minHeight: "400px",
            resize: "vertical",
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
            // @ts-expect-error CSS custom property
            "--tw-ring-color": accent,
          }}
        />

        {/* File upload */}
        <div className="mb-6">
          <label className="text-sm cursor-pointer hover:underline" style={{ color: accent }}>
            📁 Upload file (.txt, .md, .docx)
            <input type="file" accept=".txt,.md,.docx" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* ═══════════ SOCIAL MEDIA LIMITS ═══════════ */}
        <div className="rounded-xl border mb-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <button onClick={() => setShowSocial(!showSocial)} className="w-full flex items-center justify-between p-5 font-bold" style={{ fontSize: "18px" }}>
            <span>📱 Social Media Character Limits</span>
            <span style={{ transform: showSocial ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {showSocial && (
            <div className="px-5 pb-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sortedSocial.map((pl) => {
                const count = stats.characters;
                const pct = Math.min((count / pl.limit) * 100, 100);
                const over = count > pl.limit;
                const atLimit = count === pl.limit;
                const barColor = over ? "#DC2626" : atLimit ? "#D97706" : "#059669";
                const icon = over ? "❌" : atLimit ? "⚠️" : "✅";
                const remaining = pl.limit - count;
                return (
                  <div key={pl.name} className="rounded-lg border p-3" style={{ borderColor: over ? "#DC262640" : "var(--border)", backgroundColor: over ? "#DC26260a" : "transparent" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: "15px" }}>{pl.icon} {pl.name}</span>
                      <span style={{ fontSize: "15px" }}>{icon}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: "var(--border)" }}>
                        <div className="h-2 rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }} />
                      </div>
                      <span className="font-semibold text-sm whitespace-nowrap" style={{ color: barColor }}>
                        {count.toLocaleString()} / {pl.limit.toLocaleString()}
                      </span>
                    </div>
                    <div style={{ fontSize: "15px", color: over ? "#DC2626" : "var(--text-muted)" }}>
                      {over ? `${Math.abs(remaining).toLocaleString()} characters over` : `${remaining.toLocaleString()} characters remaining`}
                    </div>
                    {pl.optimal && <div style={{ fontSize: "15px", color: "var(--text-muted)", marginTop: "2px" }}>{pl.optimal}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ═══════════ KEYWORD DENSITY ═══════════ */}
        <div className="rounded-xl border mb-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <button onClick={() => setShowKeywords(!showKeywords)} className="w-full flex items-center justify-between p-5 font-bold" style={{ fontSize: "18px" }}>
            <span>🔑 Keyword Density</span>
            <span style={{ transform: showKeywords ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {showKeywords && (
            <div className="px-5 pb-5">
              <div className="flex flex-wrap gap-3 mb-4">
                {([
                  ["Include bigrams", includeBigrams, setIncludeBigrams],
                  ["Include trigrams", includeTrigrams, setIncludeTrigrams],
                  ["Exclude common words", excludeCommon, setExcludeCommon],
                ] as [string, boolean, (v: boolean) => void][]).map(([label, val, set]) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "15px" }}>
                    <input type="checkbox" checked={val} onChange={() => set(!val)} style={{ accentColor: accent }} />
                    {label}
                  </label>
                ))}
              </div>
              {keywords.length === 0 ? (
                <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Enter more text to see keyword density analysis.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left" style={{ fontSize: "15px" }}>
                    <thead>
                      <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                        <th className="py-2 pr-4 font-semibold" style={{ color: "var(--text-muted)" }}>Keyword</th>
                        <th className="py-2 pr-4 font-semibold text-right" style={{ color: "var(--text-muted)" }}>Count</th>
                        <th className="py-2 font-semibold text-right" style={{ color: "var(--text-muted)" }}>Density</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keywords.map((k) => (
                        <tr key={k.keyword} className="border-b" style={{ borderColor: "var(--border)" }}>
                          <td className="py-2 pr-4">{k.keyword}</td>
                          <td className="py-2 pr-4 text-right font-semibold">{k.count}</td>
                          <td className="py-2 text-right" style={{ color: "var(--text-muted)" }}>{k.density}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ═══════════ READABILITY ═══════════ */}
        <div className="rounded-xl border mb-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <button onClick={() => setShowReadability(!showReadability)} className="w-full flex items-center justify-between p-5 font-bold" style={{ fontSize: "18px" }}>
            <span>📊 Readability Analysis</span>
            <span style={{ transform: showReadability ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {showReadability && (
            <div className="px-5 pb-5">
              {!readability ? (
                <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Enter at least 10 words with complete sentences for readability analysis.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
                    <div className="font-bold mb-1" style={{ fontSize: "15px", color: "var(--text-muted)" }}>FLESCH READING EASE</div>
                    <div className="font-bold" style={{ fontSize: "36px", color: fleschColor(readability.flesch) }}>{readability.flesch}</div>
                    <div className="font-semibold" style={{ fontSize: "16px", color: fleschColor(readability.flesch) }}>{fleschLabel(readability.flesch)}</div>
                    <div className="mt-2 h-3 rounded-full" style={{ backgroundColor: "var(--border)" }}>
                      <div className="h-3 rounded-full" style={{ width: `${Math.max(0, Math.min(100, readability.flesch))}%`, backgroundColor: fleschColor(readability.flesch) }} />
                    </div>
                  </div>
                  <div className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
                    <div className="font-bold mb-1" style={{ fontSize: "15px", color: "var(--text-muted)" }}>GRADE LEVEL</div>
                    <div className="font-bold" style={{ fontSize: "36px", color: accent }}>{readability.grade}</div>
                    <div style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                      {readability.grade <= 6 ? "Elementary school level" :
                       readability.grade <= 8 ? `Readable by an average ${Math.round(readability.grade)}th grader` :
                       readability.grade <= 12 ? "High school level" :
                       readability.grade <= 16 ? "College level" : "Graduate level"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ═══════════ TEXT TRANSFORMATIONS ═══════════ */}
        <div className="rounded-xl border mb-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <button onClick={() => setShowTransforms(!showTransforms)} className="w-full flex items-center justify-between p-5 font-bold" style={{ fontSize: "18px" }}>
            <span>🔧 Text Transformations</span>
            <span style={{ transform: showTransforms ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {showTransforms && (
            <div className="px-5 pb-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {([
                ["UPPERCASE", (s: string) => s.toUpperCase()],
                ["lowercase", (s: string) => s.toLowerCase()],
                ["Title Case", toTitleCase],
                ["Sentence case", toSentenceCase],
                ["Remove Extra Spaces", (s: string) => s.replace(/  +/g, " ").trim()],
                ["Remove Line Breaks", (s: string) => s.replace(/\n+/g, " ")],
                ["Add Line Breaks", (s: string) => s.replace(/([.!?])\s+/g, "$1\n")],
                ["Remove Duplicate Lines", (s: string) => [...new Set(s.split("\n"))].join("\n")],
                ["Sort Lines A-Z", (s: string) => s.split("\n").sort((a, b) => a.localeCompare(b)).join("\n")],
                ["Sort Lines Z-A", (s: string) => s.split("\n").sort((a, b) => b.localeCompare(a)).join("\n")],
                ["Reverse Text", (s: string) => s.split("").reverse().join("")],
                ["Trim Each Line", (s: string) => s.split("\n").map((l) => l.trim()).join("\n")],
              ] as [string, (s: string) => string][]).map(([label, fn]) => (
                <button key={label} onClick={() => applyTransform(fn)} className="px-3 py-2 rounded-lg text-sm font-semibold border transition-colors hover:shadow-sm" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════ DOCUMENT LENGTH REFERENCE ═══════════ */}
        <div className="rounded-xl border mb-8" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <button onClick={() => setShowRef(!showRef)} className="w-full flex items-center justify-between p-5 font-bold" style={{ fontSize: "18px" }}>
            <span>📏 Document Length Reference</span>
            <span style={{ transform: showRef ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {showRef && (
            <div className="px-5 pb-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {([
                ["📱 Social Media", [
                  ["X (Twitter) post", "280 characters"],
                  ["Instagram caption", "2,200 chars (125 visible)"],
                  ["LinkedIn post", "3,000 chars (210 visible)"],
                  ["TikTok caption", "4,000 characters"],
                  ["Threads post", "500 characters"],
                ]],
                ["🔍 SEO", [
                  ["Meta title", "50-60 characters"],
                  ["Meta description", "150-160 characters"],
                  ["URL slug", "Under 75 characters"],
                  ["Blog post (SEO)", "1,500-2,500 words"],
                ]],
                ["📄 Academic", [
                  ["College essay (Common App)", "250-650 words"],
                  ["Short essay", "500-1,000 words"],
                  ["Research paper", "3,000-8,000 words"],
                  ["Thesis", "15,000-50,000 words"],
                  ["Dissertation", "50,000-100,000 words"],
                ]],
                ["📖 Publishing", [
                  ["Short story", "1,000-7,500 words"],
                  ["Novella", "17,500-40,000 words"],
                  ["Novel", "70,000-100,000 words"],
                  ["Blog post", "1,000-2,000 words"],
                  ["Newsletter", "200-500 words"],
                ]],
                ["💼 Business", [
                  ["Email", "50-200 words"],
                  ["Cover letter", "250-400 words"],
                  ["Resume", "400-800 words"],
                  ["Executive summary", "200-500 words"],
                  ["Press release", "300-500 words"],
                ]],
              ] as [string, string[][]][]).map(([cat, items]) => (
                <div key={cat} className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
                  <h3 className="font-bold mb-2" style={{ fontSize: "16px" }}>{cat}</h3>
                  <div className="space-y-1">
                    {items.map(([label, val]) => (
                      <div key={label} className="flex justify-between" style={{ fontSize: "15px" }}>
                        <span style={{ color: "var(--text-muted)" }}>{label}</span>
                        <span className="font-semibold ml-2 text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════ FAQs ═══════════ */}
        {!articleMode && (
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                ["How does the word counter work?", "Simply type or paste your text into the editor. The tool counts words, characters, sentences, paragraphs, and more in real-time as you type. No buttons to click — results update instantly. All counting happens in your browser; your text is never sent to any server."],
                ["Does it count characters with or without spaces?", "Both. The tool displays characters (total, including spaces) and characters without spaces as separate stats. Social media platforms typically count spaces as characters, so the total character count is what you should check against platform limits."],
                ["What is reading time based on?", "Reading time is calculated using the widely-cited average adult reading speed of 238 words per minute. Speaking time uses an average of 150 words per minute, the typical pace for presentations."],
                ["How is keyword density calculated?", "Keyword density is the percentage of times a word or phrase appears relative to the total word count. For SEO, experts recommend keeping primary keyword density between 1-3% to signal relevance without appearing spammy."],
                ["What are the character limits for social media?", "Current limits (2026): X (Twitter) 280 characters, Instagram captions 2,200 (125 visible before 'More'), LinkedIn posts 3,000 (210 visible before 'See more'), TikTok captions 4,000, Facebook 63,206, Threads 500, YouTube titles 100, YouTube descriptions 5,000."],
                ["What is a Flesch Reading Ease score?", "The Flesch Reading Ease measures readability on a 0-100 scale. Higher = easier. 60-70 is standard for general audiences (8th-9th grade). Scores above 80 are very easy; below 30 are academic/professional."],
                ["Can I upload a document?", "Yes. Click the upload button to load text from .txt, .md, or .docx files. The tool extracts text content and loads it into the editor for counting and analysis."],
                ["Is my text stored or sent anywhere?", "No. All processing happens entirely in your browser using JavaScript. Your text is never transmitted to any server, stored in any database, or logged. When you close the tab, the text is gone."],
                ["What's the maximum text length?", "There's no hard limit. The tool handles 100,000+ words. For very large texts, advanced features like keyword density may have a brief delay, but basic counts always update instantly."],
              ].map(([q, a]) => (
                <details key={q} className="rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <summary className="p-4 cursor-pointer font-semibold" style={{ fontSize: "16px" }}>{q}</summary>
                  <p className="px-4 pb-4" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>{a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════ Related tools ═══════════ */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              ["QR Code Generator", "/utility-tools/qr-code-generator", "Generate QR codes for URLs, WiFi, contacts, and more"],
              ["Password Generator", "/utility-tools/password-generator", "Generate strong passwords, passphrases, and PINs"],
              ["Image Compressor", "/image-tools/image-compressor", "Compress, resize, and convert images in your browser"],
              ["True Hourly Rate Calculator", "/business-tools/true-hourly-rate-calculator", "Find out what you actually make per hour"],
              ["Meeting Cost Calculator", "/business-tools/meeting-cost-calculator", "See the real cost of meetings with live timer"],
            ].map(([name, href, desc]) => (
              <a key={name} href={href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="font-semibold mb-1" style={{ fontSize: "16px" }}>{name}</h3>
                <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-6 pb-8 border-t" style={{ borderColor: "var(--border)", color: "var(--text-muted)", fontSize: "15px" }}>
          <p>© {new Date().getFullYear()} <a href="/" style={{ color: accent }} className="hover:underline">EveryFreeTool.com</a> — Free tools, no signup, no nonsense.</p>
        </footer>
      </div>
    </div>
  );
}
