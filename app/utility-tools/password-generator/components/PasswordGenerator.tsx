"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { EFF_WORDLIST } from "../lib/wordlist";

/* ── Types ─────────────────────────────────────────────────── */
type GenMode = "random" | "passphrase" | "pin";
type MainTab = "generate" | "check";
type WordStyle = "lower" | "each" | "upper" | "random";

interface Props {
  title?: string;
  subtitle?: string;
  defaultMode?: GenMode;
  defaultTab?: MainTab;
  articleMode?: boolean;
}

/* ── CSPRNG helpers ────────────────────────────────────────── */
function secureRandomInt(max: number): number {
  const arr = new Uint32Array(1);
  const maxValid = Math.floor(0xffffffff / max) * max;
  let v: number;
  do {
    crypto.getRandomValues(arr);
    v = arr[0];
  } while (v >= maxValid);
  return v % max;
}

function secureShuffleString(str: string): string {
  const a = str.split("");
  for (let i = a.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.join("");
}

/* ── Generation functions ──────────────────────────────────── */
const DEFAULT_SYMBOLS = "!@#$%^&*()_+-=[]{}|;':,./<>?";

interface PwOpts {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  noDuplicates: boolean;
  beginWithLetter: boolean;
  customSymbols: string;
}

function generatePassword(opts: PwOpts): string {
  const upperset = opts.excludeAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerset = opts.excludeAmbiguous ? "abcdefghjkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
  const numset = opts.excludeAmbiguous ? "23456789" : "0123456789";
  let chars = "";
  const required: string[] = [];
  if (opts.uppercase) { chars += upperset; required.push(upperset); }
  if (opts.lowercase) { chars += lowerset; required.push(lowerset); }
  if (opts.numbers) { chars += numset; required.push(numset); }
  if (opts.symbols) { chars += opts.customSymbols; required.push(opts.customSymbols); }
  if (!chars) return "";
  let len = opts.length;
  if (opts.noDuplicates && len > chars.length) len = chars.length;
  const used = new Set<string>();
  let pw = "";
  for (const rs of required) {
    let c: string;
    do { c = rs[secureRandomInt(rs.length)]; } while (opts.noDuplicates && used.has(c));
    pw += c;
    if (opts.noDuplicates) used.add(c);
  }
  while (pw.length < len) {
    const c = chars[secureRandomInt(chars.length)];
    if (opts.noDuplicates) { if (used.has(c)) continue; used.add(c); }
    pw += c;
  }
  pw = secureShuffleString(pw);
  if (opts.beginWithLetter) {
    const letters = (opts.uppercase ? upperset : "") + (opts.lowercase ? lowerset : "");
    if (letters) {
      const idx = pw.split("").findIndex((c) => letters.includes(c));
      if (idx > 0) { const a = pw.split(""); [a[0], a[idx]] = [a[idx], a[0]]; pw = a.join(""); }
    }
  }
  return pw;
}

interface PPOpts { wordCount: number; separator: string; wordStyle: WordStyle; addNumber: boolean; addSymbol: boolean; }

function generatePassphrase(opts: PPOpts): string {
  const words: string[] = [];
  for (let i = 0; i < opts.wordCount; i++) {
    let w = EFF_WORDLIST[secureRandomInt(EFF_WORDLIST.length)];
    if (opts.wordStyle === "each") w = w[0].toUpperCase() + w.slice(1);
    else if (opts.wordStyle === "upper") w = w.toUpperCase();
    else if (opts.wordStyle === "random") w = w.split("").map((c) => (secureRandomInt(2) ? c.toUpperCase() : c)).join("");
    words.push(w);
  }
  if (opts.addNumber) { words.splice(secureRandomInt(words.length - 1) + 1, 0, secureRandomInt(100).toString()); }
  if (opts.addSymbol) { const s = "!@#$%^&*"; words.splice(secureRandomInt(words.length - 1) + 1, 0, s[secureRandomInt(s.length)]); }
  return words.join(opts.separator);
}

function generatePIN(len: number): string {
  let p = "";
  for (let i = 0; i < len; i++) p += secureRandomInt(10).toString();
  return p;
}

function calcEntropy(len: number, opts: PwOpts): number {
  let pool = 0;
  if (opts.uppercase) pool += opts.excludeAmbiguous ? 24 : 26;
  if (opts.lowercase) pool += opts.excludeAmbiguous ? 23 : 26;
  if (opts.numbers) pool += opts.excludeAmbiguous ? 8 : 10;
  if (opts.symbols) pool += opts.customSymbols.length;
  return pool > 0 ? len * Math.log2(pool) : 0;
}

function calcPassphraseEntropy(wc: number): number { return wc * Math.log2(7776); }

/* ── Strength colours ──────────────────────────────────────── */
const STR_LABELS = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"] as const;
const STR_COLORS = ["#DC2626", "#EA580C", "#D97706", "#65A30D", "#059669"];

function scoreFromEntropy(bits: number): number {
  if (bits < 28) return 0;
  if (bits < 36) return 1;
  if (bits < 60) return 2;
  if (bits < 80) return 3;
  return 4;
}

/* ── Clipboard ─────────────────────────────────────────────── */
async function copyText(t: string) {
  try { await navigator.clipboard.writeText(t); return true; } catch {
    const ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); return true;
  }
}

/* ── zxcvbn lazy loader ────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let zxcvbnFn: any = null;
async function getZxcvbn() {
  if (!zxcvbnFn) { const m = await import("zxcvbn"); zxcvbnFn = m.default; }
  return zxcvbnFn;
}

/* ── Colored password display ──────────────────────────────── */
function ColoredPassword({ value, mono }: { value: string; mono?: boolean }) {
  return (
    <span style={{ fontFamily: mono !== false ? "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" : undefined, wordBreak: "break-all" }}>
      {value.split("").map((c, i) => {
        let color = "var(--text)";
        if (/\d/.test(c)) color = "#2563EB";
        else if (/[^a-zA-Z0-9]/.test(c)) color = "#D97706";
        return <span key={i} style={{ color }}>{c}</span>;
      })}
    </span>
  );
}

/* ── Dark mode toggle (shared) ─────────────────────────────── */
function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };
  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className="p-2 rounded-lg border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function PasswordGenerator({ title = "Password Generator", subtitle, defaultMode = "random", defaultTab = "generate", articleMode = false }: Props) {
  /* ── State ───────────────────────────────────────────────── */
  const [mainTab, setMainTab] = useState<MainTab>(defaultTab);
  const [mode, setMode] = useState<GenMode>(defaultMode);

  // Random password opts
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [nums, setNums] = useState(true);
  const [syms, setSyms] = useState(true);
  const [exAmb, setExAmb] = useState(false);
  const [noDup, setNoDup] = useState(false);
  const [beginLetter, setBeginLetter] = useState(false);
  const [customSymbols, setCustomSymbols] = useState(DEFAULT_SYMBOLS);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Passphrase opts
  const [wordCount, setWordCount] = useState(5);
  const [separator, setSeparator] = useState("-");
  const [wordStyle, setWordStyle] = useState<WordStyle>("lower");
  const [addNum, setAddNum] = useState(false);
  const [addSym, setAddSym] = useState(false);

  // PIN opts
  const [pinLen, setPinLen] = useState(4);
  const [customPinLen, setCustomPinLen] = useState(false);

  // Generated
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [entropy, setEntropy] = useState(0);

  // Check tab
  const [checkInput, setCheckInput] = useState("");
  const [showCheck, setShowCheck] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [checkResult, setCheckResult] = useState<any>(null);
  const checkTimer = useRef<ReturnType<typeof setTimeout>>(null);

  // Bulk
  const [showBulk, setShowBulk] = useState(false);
  const [bulkCount, setBulkCount] = useState(10);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [bulkCopied, setBulkCopied] = useState<number | null>(null);
  const [bulkAllCopied, setBulkAllCopied] = useState(false);

  // Security section
  const [showSecurity, setShowSecurity] = useState(false);

  /* ── Build pw options ───────────────────────────────────── */
  const pwOpts: PwOpts = { length, uppercase: upper, lowercase: lower, numbers: nums, symbols: syms, excludeAmbiguous: exAmb, noDuplicates: noDup, beginWithLetter: beginLetter, customSymbols };

  /* ── Generate ───────────────────────────────────────────── */
  const regen = useCallback(() => {
    let pw: string, ent: number;
    if (mode === "random") {
      pw = generatePassword(pwOpts);
      ent = calcEntropy(pw.length, pwOpts);
    } else if (mode === "passphrase") {
      pw = generatePassphrase({ wordCount, separator, wordStyle, addNumber: addNum, addSymbol: addSym });
      ent = calcPassphraseEntropy(wordCount);
    } else {
      pw = generatePIN(pinLen);
      ent = pinLen * Math.log2(10);
    }
    setPassword(pw);
    setEntropy(ent);
    setCopied(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, length, upper, lower, nums, syms, exAmb, noDup, beginLetter, customSymbols, wordCount, separator, wordStyle, addNum, addSym, pinLen]);

  useEffect(() => { regen(); }, [regen]);

  /* ── Char‑type guard: at least one must be on ──────────── */
  const toggleCharType = (setter: (v: boolean) => void, current: boolean, others: boolean[]) => {
    if (current && others.every((o) => !o)) return; // prevent deselecting all
    setter(!current);
  };

  /* ── Copy ────────────────────────────────────────────────── */
  const handleCopy = async () => {
    await copyText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Check strength (debounced) ──────────────────────────── */
  useEffect(() => {
    if (!checkInput) { setCheckResult(null); return; }
    if (checkTimer.current) clearTimeout(checkTimer.current);
    checkTimer.current = setTimeout(async () => {
      const zxcvbn = await getZxcvbn();
      const r = zxcvbn(checkInput);
      setCheckResult({
        score: r.score,
        crackTimes: r.crack_times_display,
        guessesLog10: r.guesses_log10,
        entropy: Math.log2(r.guesses),
        feedback: r.feedback,
        sequence: r.sequence,
        length: checkInput.length,
        hasUpper: /[A-Z]/.test(checkInput),
        hasLower: /[a-z]/.test(checkInput),
        hasNum: /\d/.test(checkInput),
        hasSym: /[^a-zA-Z0-9]/.test(checkInput),
      });
    }, 200);
    return () => { if (checkTimer.current) clearTimeout(checkTimer.current); };
  }, [checkInput]);

  /* ── Bulk generate ──────────────────────────────────────── */
  const genBulk = () => {
    const list: string[] = [];
    for (let i = 0; i < bulkCount; i++) {
      if (mode === "random") list.push(generatePassword(pwOpts));
      else if (mode === "passphrase") list.push(generatePassphrase({ wordCount, separator, wordStyle, addNumber: addNum, addSymbol: addSym }));
      else list.push(generatePIN(pinLen));
    }
    setBulkPasswords(list);
  };

  const copyBulkItem = async (idx: number) => {
    await copyText(bulkPasswords[idx]);
    setBulkCopied(idx);
    setTimeout(() => setBulkCopied(null), 1500);
  };

  const copyAllBulk = async () => {
    await copyText(bulkPasswords.join("\n"));
    setBulkAllCopied(true);
    setTimeout(() => setBulkAllCopied(false), 2000);
  };

  const downloadBulk = () => {
    const blob = new Blob([bulkPasswords.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "passwords.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  /* ── Strength score for current password ─────────────────── */
  const score = scoreFromEntropy(entropy);

  /* ── PIN math ───────────────────────────────────────────── */
  const pinCombinations = Math.pow(10, pinLen);

  /* ── Render ──────────────────────────────────────────────── */
  const accent = "#059669";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-[1100px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        {!articleMode && (
          <>
            <nav className="flex items-center gap-1 text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              <a href="/" className="hover:underline" style={{ color: accent }}>Home</a><span>/</span><span>Utility Tools</span>
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

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-8" style={{ fontSize: "15px", color: "var(--text-muted)" }}>
          {["🔒 100% Client-Side", "🚫 No Data Stored", "🛡️ CSPRNG Secured", "📡 Zero Server Calls"].map((b) => (
            <span key={b} className="px-3 py-1.5 rounded-full border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>{b}</span>
          ))}
        </div>

        {/* Main tabs */}
        <div className="flex gap-1 mb-6">
          {(["generate", "check"] as MainTab[]).map((t) => (
            <button key={t} onClick={() => setMainTab(t)} className="px-5 py-2.5 rounded-lg font-semibold transition-colors" style={{
              fontSize: "17px",
              backgroundColor: mainTab === t ? accent : "var(--surface)",
              color: mainTab === t ? "#fff" : "var(--text-muted)",
              border: mainTab === t ? "none" : "1px solid var(--border)",
            }}>
              {t === "generate" ? "Generate" : "Check Strength"}
            </button>
          ))}
        </div>

        {/* ═══════════ GENERATE TAB ═══════════ */}
        {mainTab === "generate" && (
          <>
            {/* Mode pills */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {([["random", "🔑 Random Password"], ["passphrase", "📖 Passphrase"], ["pin", "🔢 PIN"]] as [GenMode, string][]).map(([m, label]) => (
                <button key={m} onClick={() => setMode(m)} className="px-4 py-2 rounded-lg font-semibold transition-colors" style={{
                  fontSize: "16px",
                  backgroundColor: mode === m ? accent + "1a" : "var(--surface)",
                  color: mode === m ? accent : "var(--text-muted)",
                  border: `1.5px solid ${mode === m ? accent : "var(--border)"}`,
                }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Hero password display */}
            <div className="rounded-xl border p-6 mb-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <div className="flex-1 min-w-0 text-center cursor-pointer select-all" onClick={handleCopy} title="Click to copy" style={{ fontSize: mode === "pin" ? "40px" : "26px", letterSpacing: mode === "pin" ? "0.3em" : "0.02em", fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace", lineHeight: 1.4, overflowWrap: "break-word" }}>
                  {mode === "pin" ? password.split("").join(" ") : <ColoredPassword value={password} />}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button onClick={handleCopy} className="px-4 py-2 rounded-lg font-bold transition-colors" style={{ fontSize: "16px", backgroundColor: copied ? "#059669" : accent, color: "#fff" }}>
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
                <button onClick={regen} className="px-4 py-2 rounded-lg font-bold border transition-colors" style={{ fontSize: "16px", borderColor: "var(--border)", color: "var(--text)" }}>
                  🔄 Regenerate
                </button>
              </div>
            </div>

            {/* Inline strength bar */}
            <div className="rounded-xl border p-4 mb-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1 flex-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-2 flex-1 rounded-full" style={{ backgroundColor: i <= score ? STR_COLORS[score] : "var(--border)" }} />
                  ))}
                </div>
                <span className="font-bold" style={{ fontSize: "18px", color: STR_COLORS[score] }}>{STR_LABELS[score]}</span>
              </div>
              <div className="flex flex-wrap gap-4" style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                <span>Entropy: {entropy.toFixed(1)} bits</span>
                {mode === "pin" && <span>{pinCombinations.toLocaleString()} possible combinations</span>}
              </div>
            </div>

            {/* PIN warning */}
            {mode === "pin" && (
              <div className="rounded-xl border p-4 mb-6" style={{ backgroundColor: "#FEF3C7", borderColor: "#F59E0B", color: "#92400E" }}>
                <p style={{ fontSize: "15px" }}>⚠️ PINs are suitable for phone unlock screens and 2FA codes, but should not be used as primary passwords for online accounts.</p>
              </div>
            )}

            {/* ─── Random password controls ─── */}
            {mode === "random" && (
              <div className="space-y-5 mb-6">
                {/* Length */}
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <label className="font-bold mb-3 block" style={{ fontSize: "16px" }}>Password Length: <span style={{ color: accent }}>{length}</span></label>
                  <div className="flex items-center gap-4">
                    <input type="range" min={4} max={128} value={length} onChange={(e) => setLength(+e.target.value)} className="flex-1" style={{ accentColor: accent }} />
                    <input type="number" min={4} max={128} value={length} onChange={(e) => { const v = Math.max(4, Math.min(128, +e.target.value || 4)); setLength(v); }} className="w-20 rounded-lg border p-2 text-center" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
                  </div>
                  {/* Quick presets */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[8, 12, 16, 20, 32, 64].map((n) => (
                      <button key={n} onClick={() => setLength(n)} className="px-3 py-1 rounded-lg text-sm font-semibold border transition-colors" style={{ borderColor: length === n ? accent : "var(--border)", color: length === n ? accent : "var(--text-muted)", backgroundColor: length === n ? accent + "1a" : "transparent" }}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Character types */}
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <label className="font-bold mb-3 block" style={{ fontSize: "16px" }}>Character Types</label>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      ["Uppercase (A-Z)", upper, () => toggleCharType(setUpper, upper, [lower, nums, syms])],
                      ["Lowercase (a-z)", lower, () => toggleCharType(setLower, lower, [upper, nums, syms])],
                      ["Numbers (0-9)", nums, () => toggleCharType(setNums, nums, [upper, lower, syms])],
                      ["Symbols (!@#...)", syms, () => toggleCharType(setSyms, syms, [upper, lower, nums])],
                    ] as [string, boolean, () => void][]).map(([label, checked, toggle]) => (
                      <label key={label} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "16px" }}>
                        <input type="checkbox" checked={checked} onChange={toggle} style={{ accentColor: accent, width: 18, height: 18 }} />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Advanced options */}
                <div className="rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-between p-5 font-bold" style={{ fontSize: "16px" }}>
                    <span>More Options</span>
                    <span style={{ transform: showAdvanced ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                  </button>
                  {showAdvanced && (
                    <div className="px-5 pb-5 space-y-3">
                      {([
                        ["Exclude ambiguous characters (l, 1, I, O, 0)", exAmb, setExAmb, "Avoid characters that look similar in some fonts"],
                        ["No duplicate characters", noDup, setNoDup, "Each character appears only once"],
                        ["Must begin with a letter", beginLetter, setBeginLetter, "Some systems require passwords to start with a letter"],
                      ] as [string, boolean, (v: boolean) => void, string][]).map(([label, val, set, help]) => (
                        <div key={label}>
                          <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "16px" }}>
                            <input type="checkbox" checked={val} onChange={() => set(!val)} style={{ accentColor: accent, width: 18, height: 18 }} />
                            {label}
                          </label>
                          <p className="ml-7" style={{ fontSize: "15px", color: "var(--text-muted)" }}>{help}</p>
                        </div>
                      ))}
                      <div>
                        <label className="font-semibold block mb-1" style={{ fontSize: "15px" }}>Custom Symbols</label>
                        <input type="text" value={customSymbols} onChange={(e) => setCustomSymbols(e.target.value || DEFAULT_SYMBOLS)} className="w-full rounded-lg border p-2" style={{ fontSize: "16px", fontFamily: "monospace", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
                        <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Some sites only allow certain special characters</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── Passphrase controls ─── */}
            {mode === "passphrase" && (
              <div className="space-y-5 mb-6">
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <label className="font-bold mb-3 block" style={{ fontSize: "16px" }}>Word Count: <span style={{ color: accent }}>{wordCount}</span> <span style={{ fontSize: "15px", fontWeight: 400, color: "var(--text-muted)" }}>({calcPassphraseEntropy(wordCount).toFixed(1)} bits of entropy)</span></label>
                  <div className="flex items-center gap-4">
                    <input type="range" min={3} max={10} value={wordCount} onChange={(e) => setWordCount(+e.target.value)} className="flex-1" style={{ accentColor: accent }} />
                    <input type="number" min={3} max={10} value={wordCount} onChange={(e) => setWordCount(Math.max(3, Math.min(10, +e.target.value || 3)))} className="w-20 rounded-lg border p-2 text-center" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
                  </div>
                </div>
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <label className="font-bold mb-3 block" style={{ fontSize: "16px" }}>Separator</label>
                  <div className="flex flex-wrap gap-2">
                    {(["-", " ", ".", "_", ",", ""] as string[]).map((s) => {
                      const label = s === "-" ? "Hyphen" : s === " " ? "Space" : s === "." ? "Period" : s === "_" ? "Underscore" : s === "," ? "Comma" : "None";
                      return (
                        <button key={label} onClick={() => setSeparator(s)} className="px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ borderColor: separator === s ? accent : "var(--border)", color: separator === s ? accent : "var(--text-muted)", backgroundColor: separator === s ? accent + "1a" : "transparent" }}>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <label className="font-bold mb-3 block" style={{ fontSize: "16px" }}>Word Style</label>
                  <div className="flex flex-wrap gap-2">
                    {([["lower", "lowercase"], ["each", "Capitalize Each"], ["upper", "UPPERCASE"], ["random", "rAnDoM cAsE"]] as [WordStyle, string][]).map(([v, label]) => (
                      <button key={v} onClick={() => setWordStyle(v)} className="px-3 py-1.5 rounded-lg text-sm font-semibold border" style={{ borderColor: wordStyle === v ? accent : "var(--border)", color: wordStyle === v ? accent : "var(--text-muted)", backgroundColor: wordStyle === v ? accent + "1a" : "transparent" }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <label className="font-bold mb-3 block" style={{ fontSize: "16px" }}>Additional Options</label>
                  {([
                    ["Add a random number (0-99) between words", addNum, setAddNum],
                    ["Add a random symbol between words", addSym, setAddSym],
                  ] as [string, boolean, (v: boolean) => void][]).map(([label, val, set]) => (
                    <label key={label} className="flex items-center gap-2 cursor-pointer mb-2" style={{ fontSize: "16px" }}>
                      <input type="checkbox" checked={val} onChange={() => set(!val)} style={{ accentColor: accent, width: 18, height: 18 }} />
                      {label}
                    </label>
                  ))}
                </div>
                <div className="rounded-xl border p-4" style={{ backgroundColor: accent + "0d", borderColor: accent + "40" }}>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Passphrases use random words instead of random characters. They&apos;re easier to remember and type, but just as secure. A 5-word passphrase has roughly the same strength as a 13-character random password.</p>
                </div>
              </div>
            )}

            {/* ─── PIN controls ─── */}
            {mode === "pin" && (
              <div className="space-y-5 mb-6">
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <label className="font-bold mb-3 block" style={{ fontSize: "16px" }}>PIN Length</label>
                  <div className="flex flex-wrap gap-2">
                    {[4, 6, 8].map((n) => (
                      <button key={n} onClick={() => { setPinLen(n); setCustomPinLen(false); }} className="px-4 py-2 rounded-lg font-semibold border" style={{ borderColor: pinLen === n && !customPinLen ? accent : "var(--border)", color: pinLen === n && !customPinLen ? accent : "var(--text-muted)", backgroundColor: pinLen === n && !customPinLen ? accent + "1a" : "transparent" }}>
                        {n} digits
                      </button>
                    ))}
                    <button onClick={() => setCustomPinLen(true)} className="px-4 py-2 rounded-lg font-semibold border" style={{ borderColor: customPinLen ? accent : "var(--border)", color: customPinLen ? accent : "var(--text-muted)", backgroundColor: customPinLen ? accent + "1a" : "transparent" }}>
                      Custom
                    </button>
                  </div>
                  {customPinLen && (
                    <input type="number" min={3} max={20} value={pinLen} onChange={(e) => setPinLen(Math.max(3, Math.min(20, +e.target.value || 3)))} className="mt-3 w-24 rounded-lg border p-2 text-center" style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
                  )}
                </div>
              </div>
            )}

            {/* ─── Bulk generation ─── */}
            <div className="rounded-xl border mb-8" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <button onClick={() => setShowBulk(!showBulk)} className="w-full flex items-center justify-between p-5 font-bold" style={{ fontSize: "16px" }}>
                <span>Generate Multiple Passwords</span>
                <span style={{ transform: showBulk ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
              </button>
              {showBulk && (
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-3 mb-4">
                    <label className="font-semibold" style={{ fontSize: "16px" }}>How many?</label>
                    <input type="number" min={2} max={50} value={bulkCount} onChange={(e) => setBulkCount(Math.max(2, Math.min(50, +e.target.value || 2)))} className="w-20 rounded-lg border p-2 text-center" style={{ fontSize: "16px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
                    <button onClick={genBulk} className="px-4 py-2 rounded-lg font-bold" style={{ backgroundColor: accent, color: "#fff", fontSize: "16px" }}>Generate</button>
                  </div>
                  {bulkPasswords.length > 0 && (
                    <>
                      <div className="max-h-[400px] overflow-y-auto space-y-2 mb-4">
                        {bulkPasswords.map((bp, i) => {
                          const bpScore = scoreFromEntropy(mode === "random" ? calcEntropy(bp.length, pwOpts) : mode === "passphrase" ? calcPassphraseEntropy(wordCount) : pinLen * Math.log2(10));
                          return (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
                              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: STR_COLORS[bpScore] }} />
                              <span className="flex-1 text-sm break-all" style={{ fontFamily: "monospace" }}>{bp}</span>
                              <button onClick={() => copyBulkItem(i)} className="px-2 py-1 text-sm rounded border flex-shrink-0" style={{ borderColor: "var(--border)", color: bulkCopied === i ? accent : "var(--text-muted)" }}>
                                {bulkCopied === i ? "✅" : "📋"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={copyAllBulk} className="px-4 py-2 rounded-lg font-semibold border" style={{ borderColor: "var(--border)", fontSize: "15px", color: bulkAllCopied ? accent : "var(--text)" }}>
                          {bulkAllCopied ? "✅ Copied All" : "📋 Copy All"}
                        </button>
                        <button onClick={downloadBulk} className="px-4 py-2 rounded-lg font-semibold border" style={{ borderColor: "var(--border)", fontSize: "15px" }}>
                          📥 Download as TXT
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* ═══════════ CHECK STRENGTH TAB ═══════════ */}
        {mainTab === "check" && (
          <div className="space-y-6 mb-8">
            <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <label className="font-bold mb-3 block" style={{ fontSize: "16px" }}>Enter a password to check</label>
              <div className="relative">
                <input
                  type={showCheck ? "text" : "password"}
                  value={checkInput}
                  onChange={(e) => setCheckInput(e.target.value)}
                  placeholder="Enter a password to check its strength..."
                  className="w-full rounded-lg border p-3 pr-20"
                  style={{ fontSize: "20px", fontFamily: "monospace", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button onClick={() => setShowCheck(!showCheck)} className="p-2 rounded" style={{ color: "var(--text-muted)" }}>
                    {showCheck ? "🙈" : "👁️"}
                  </button>
                  {checkInput && (
                    <button onClick={() => setCheckInput("")} className="p-2 rounded" style={{ color: "var(--text-muted)" }}>✕</button>
                  )}
                </div>
              </div>
            </div>

            {checkResult && (
              <>
                {/* Strength meter */}
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-1 flex-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-3 flex-1 rounded-full" style={{ backgroundColor: i <= checkResult.score ? STR_COLORS[checkResult.score] : "var(--border)" }} />
                      ))}
                    </div>
                    <span className="font-bold" style={{ fontSize: "24px", color: STR_COLORS[checkResult.score] }}>{STR_LABELS[checkResult.score]}</span>
                  </div>
                </div>

                {/* Crack times */}
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-bold mb-3" style={{ fontSize: "18px" }}>⏱️ Crack Time Estimates</h3>
                  <div className="space-y-2" style={{ fontSize: "15px" }}>
                    {([
                      ["Online attack (rate-limited)", checkResult.crackTimes.online_throttling_100_per_hour],
                      ["Online attack (no rate limit)", checkResult.crackTimes.online_no_throttling_10_per_second],
                      ["Offline attack (slow hash)", checkResult.crackTimes.offline_slow_hashing_1e4_per_second],
                      ["Offline attack (fast hash)", checkResult.crackTimes.offline_fast_hashing_1e10_per_second],
                    ] as [string, string][]).map(([label, time]) => (
                      <div key={label} className="flex justify-between py-1 border-b" style={{ borderColor: "var(--border)" }}>
                        <span style={{ color: "var(--text-muted)" }}>{label}</span>
                        <span className="font-semibold">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Entropy */}
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-bold mb-2" style={{ fontSize: "18px" }}>Entropy: {checkResult.entropy.toFixed(1)} bits</h3>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                    {checkResult.entropy < 28 ? "Very low — equivalent to a 4-digit PIN" :
                     checkResult.entropy < 36 ? "Low — easily cracked by modern hardware" :
                     checkResult.entropy < 60 ? "Moderate — may resist casual attacks" :
                     checkResult.entropy < 128 ? "High — strong against most attacks" :
                     "Exceptional — beyond brute force capability"}
                  </p>
                </div>

                {/* Composition */}
                <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-bold mb-3" style={{ fontSize: "18px" }}>Composition</h3>
                  <div className="grid grid-cols-2 gap-2" style={{ fontSize: "15px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Length</span><span className="font-semibold">{checkResult.length} characters</span>
                    <span style={{ color: "var(--text-muted)" }}>Uppercase</span><span>{checkResult.hasUpper ? "✅ Yes" : "❌ No"}</span>
                    <span style={{ color: "var(--text-muted)" }}>Lowercase</span><span>{checkResult.hasLower ? "✅ Yes" : "❌ No"}</span>
                    <span style={{ color: "var(--text-muted)" }}>Numbers</span><span>{checkResult.hasNum ? "✅ Yes" : "❌ No"}</span>
                    <span style={{ color: "var(--text-muted)" }}>Symbols</span><span>{checkResult.hasSym ? "✅ Yes" : "❌ No"}</span>
                  </div>
                </div>

                {/* Patterns detected */}
                {checkResult.sequence.length > 0 && (
                  <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                    <h3 className="font-bold mb-3" style={{ fontSize: "18px" }}>Patterns Detected</h3>
                    <div className="space-y-2">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {checkResult.sequence.map((s: any, i: number) => {
                        const desc = s.pattern === "dictionary" ? `Contains dictionary word: "${s.matched_word}"${s.l33t ? " (l33t substitution)" : ""}` :
                          s.pattern === "spatial" ? `Contains keyboard pattern: "${s.token}"` :
                          s.pattern === "repeat" ? `Contains repeated characters: "${s.token}"` :
                          s.pattern === "sequence" ? `Contains sequential pattern: "${s.token}"` :
                          s.pattern === "date" ? `Contains date pattern: "${s.token}"` :
                          s.pattern === "bruteforce" ? null : `Pattern: "${s.token}"`;
                        if (!desc) return null;
                        return <div key={i} className="flex items-start gap-2 py-1" style={{ fontSize: "15px" }}><span>⚠️</span><span>{desc}</span></div>;
                      })}
                    </div>
                  </div>
                )}

                {/* Feedback */}
                {(checkResult.feedback.warning || checkResult.feedback.suggestions.length > 0) && (
                  <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                    <h3 className="font-bold mb-3" style={{ fontSize: "18px" }}>Suggestions</h3>
                    {checkResult.feedback.warning && (
                      <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: "#FEF3C7", color: "#92400E", fontSize: "15px" }}>
                        ⚠️ {checkResult.feedback.warning}
                      </div>
                    )}
                    {checkResult.feedback.suggestions.map((s: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 py-1" style={{ fontSize: "15px" }}><span>💡</span><span>{s}</span></div>
                    ))}
                  </div>
                )}

                {/* Fix it */}
                {checkResult.score < 3 && (
                  <button onClick={() => { setMainTab("generate"); setMode("random"); setLength(Math.max(16, checkResult.length)); }} className="w-full py-3 rounded-xl font-bold" style={{ backgroundColor: accent, color: "#fff", fontSize: "17px" }}>
                    Generate a Stronger Password →
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* ═══════════ Security trust section ═══════════ */}
        <div className="rounded-xl border mb-8" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <button onClick={() => setShowSecurity(!showSecurity)} className="w-full flex items-center justify-between p-5 font-bold" style={{ fontSize: "18px" }}>
            <span>🛡️ How This Tool Keeps You Safe</span>
            <span style={{ transform: showSecurity ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {showSecurity && (
            <div className="px-5 pb-5 space-y-4" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>All generation happens in your browser.</strong> We use the Web Crypto API (<code>crypto.getRandomValues()</code>), the same CSPRNG used by password managers, banks, and security software. Your passwords are generated locally and never transmitted.</p>
              <p><strong style={{ color: "var(--text)" }}>Nothing is stored or logged.</strong> No cookies, no local storage, no server-side logging. When you close the tab, everything is gone.</p>
              <p><strong style={{ color: "var(--text)" }}>No server calls.</strong> Unlike many password tools that send your password to a server for &ldquo;checking,&rdquo; our strength analysis runs entirely in your browser using the open-source zxcvbn library from Dropbox.</p>
              <p><strong style={{ color: "var(--text)" }}>Open-source libraries.</strong> The strength estimation uses zxcvbn, peer-reviewed in a USENIX Security &apos;16 paper. The wordlist is from the Electronic Frontier Foundation (EFF).</p>
              <p><strong style={{ color: "var(--text)" }}>No ads, no upsells.</strong> We don&apos;t sell a password manager. This tool exists to be useful, period.</p>
            </div>
          )}
        </div>

        {/* ═══════════ Security tips ═══════════ */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Security Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["Use a unique password for every account", "If one account gets breached, every account sharing that password is compromised. A password manager makes this practical."],
              ["Length beats complexity", "A 20-character password with just lowercase letters is stronger than an 8-character password with all character types. When in doubt, make it longer."],
              ["Passphrases are your friend", "Random word combinations are both strong and memorable. Use 5+ words for serious security. Great for master passwords you type frequently."],
              ["Never reuse passwords", "Data breaches happen constantly. If your email and bank share a password, one breach exposes both. Use a password manager."],
              ["Enable two-factor authentication (2FA)", "Even the strongest password can be phished. 2FA adds a second layer requiring physical access to your phone or security key."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="font-semibold mb-1" style={{ fontSize: "16px" }}>{title}</h3>
                <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ How it works ═══════════ */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How Password Generation Works</h2>
          <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
            <p>This tool uses your browser&apos;s built-in Cryptographic Random Number Generator (CSPRNG) &mdash; specifically <code>crypto.getRandomValues()</code> &mdash; to generate passwords. This is the same source of randomness used by operating systems, encryption software, and professional security tools.</p>
            <p><strong style={{ color: "var(--text)" }}>For random passwords:</strong> The tool builds a character pool from your selected options, then picks characters using the CSPRNG. A Fisher-Yates shuffle ensures required characters are distributed randomly throughout.</p>
            <p><strong style={{ color: "var(--text)" }}>For passphrases:</strong> Words are selected from the EFF&apos;s curated wordlist of 7,776 common English words. Each word adds approximately 12.9 bits of entropy.</p>
            <p><strong style={{ color: "var(--text)" }}>For strength checking:</strong> We use zxcvbn, an open-source library from Dropbox that detects dictionary words, common names, dates, keyboard patterns, l33t speak, and repeated characters &mdash; simulating how attackers actually crack passwords.</p>
          </div>
        </section>

        {/* ═══════════ FAQs ═══════════ */}
        {!articleMode && (
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                ["Is this password generator safe to use?", "Yes. This tool generates passwords entirely in your browser using the Web Crypto API (crypto.getRandomValues()), the same CSPRNG used by password managers and security software. No passwords are transmitted to any server, stored in any database, or logged in any way."],
                ["How does this tool generate random passwords?", "We use your browser's built-in CSPRNG via crypto.getRandomValues(). This draws entropy from your operating system's random number generator, which collects randomness from hardware events. The output is unpredictable even to someone who knows the algorithm."],
                ["How long should my password be?", "Security experts now recommend a minimum of 16 characters for important accounts. For most people, 16-20 characters with all character types provides excellent security. For maximum protection, use 20+ characters or a 5-6 word passphrase."],
                ["What is a passphrase and is it as secure as a random password?", "A passphrase is a password made of random words, like \"correct-horse-battery-staple.\" A 5-word passphrase from the EFF wordlist has approximately 64.6 bits of entropy — roughly equivalent to a 10-character fully random password. A 6-word passphrase (~77.5 bits) is stronger than most 12-character random passwords."],
                ["What is entropy and why does it matter?", "Entropy measures how unpredictable a password is, expressed in bits. Each bit doubles the number of possible passwords an attacker would need to try. For reference: 40 bits is weak, 60 bits is moderate, 80 bits is strong, and 128 bits is effectively uncrackable."],
                ["Can I trust the strength checker?", "The strength analysis runs entirely in your browser using zxcvbn, an open-source library created by Dropbox. No data is sent to any server. You can verify this by opening your browser's network tab while using the checker."],
                ["Why does my password show as 'weak' even with symbols?", "Traditional rules check for character variety, but attackers know those rules. A password like \"P@ssw0rd!\" passes most requirements but is trivially common. Our checker uses zxcvbn, which evaluates passwords the way real attackers do — looking for dictionary words, substitutions, and predictable structures."],
                ["What's the difference between online and offline crack times?", "Online attacks target live services that limit attempts. Offline attacks happen when an attacker steals a hashed password database and can try billions of guesses per second on their own hardware. This is why strong passwords matter most for protecting against database breaches."],
                ["Should I use a password manager?", "Absolutely. A password manager lets you use unique, strong passwords for every account without memorizing them. Popular options include Bitwarden (free, open-source), 1Password, and KeePass."],
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
              ["Image Compressor", "/image-tools/image-compressor", "Compress, resize, and convert images in your browser"],
              ["True Hourly Rate Calculator", "/business-tools/true-hourly-rate-calculator", "Find out what you actually make per hour after all costs"],
              ["Meeting Cost Calculator", "/business-tools/meeting-cost-calculator", "See the real cost of meetings with live timer"],
              ["Subscription Calculator", "/finance-tools/subscription-calculator", "Audit your subscriptions and see annual totals"],
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
