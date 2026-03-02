"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  type Category,
  type Subscription,
  SUBSCRIPTIONS,
  CATEGORIES,
  POPULAR_PRESET_IDS,
  formatCurrency,
  monthlyToYearly,
  compoundInvestment,
} from "../lib/subscriptions";
import { getComparisons, getShareText, getTwitterUrl, getLinkedInUrl } from "../lib/comparisons";
import { type ShareCardData, generateShareCard, shareCardToBlob } from "../lib/share-card";

/* ─── Dark Mode Toggle ─── */
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
    <button onClick={toggle} className="p-2 rounded-lg transition-colors" style={{ color: "var(--text-muted)" }} aria-label="Toggle dark mode">
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
      )}
    </button>
  );
}

/* ─── Animated Number ─── */
function AnimatedCost({ value, decimals = 2, className, style }: { value: number; decimals?: number; className?: string; style?: React.CSSProperties }) {
  const [displayed, setDisplayed] = useState(value);
  const animRef = useRef<number | null>(null);
  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const start = displayed;
    const diff = value - start;
    if (Math.abs(diff) < 0.01) { setDisplayed(value); return; }
    const duration = 400;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(start + diff * eased);
      if (t < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <span className={className} style={style}>{formatCurrency(displayed, decimals)}</span>;
}

/* ─── Custom Subscription Entry ─── */
interface CustomSub { id: string; name: string; price: number; }

/* ─── Share Modal ─── */
function ShareModal({ data, onClose }: { data: ShareCardData; onClose: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const text = getShareText(data.monthly, data.yearly, data.fiveYear, data.count);

  const copyText = async () => { await navigator.clipboard.writeText(text); setCopied("text"); setTimeout(() => setCopied(null), 2000); };
  const copyLink = async () => { await navigator.clipboard.writeText("https://everyfreetool.com/finance-tools/subscription-calculator"); setCopied("link"); setTimeout(() => setCopied(null), 2000); };
  const downloadImage = async () => {
    setGenerating(true);
    try {
      const canvas = generateShareCard(data);
      const blob = await shareCardToBlob(canvas);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "my-subscriptions.png"; a.click(); URL.revokeObjectURL(url);
    } finally { setGenerating(false); }
  };
  const shareNative = async () => {
    if (!navigator.share) return;
    try {
      const canvas = generateShareCard(data);
      const blob = await shareCardToBlob(canvas);
      const file = new File([blob], "my-subscriptions.png", { type: "image/png" });
      await navigator.share({ text, files: [file] });
    } catch { /* cancelled */ }
  };
  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="w-full max-w-md rounded-2xl border p-6 space-y-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>Share Results</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:opacity-70 text-xl" style={{ color: "var(--text-muted)" }} aria-label="Close">&times;</button>
        </div>
        <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: "var(--bg)", color: "var(--text-muted)" }}>{text}</div>
        <div className="grid grid-cols-1 gap-2">
          <button onClick={downloadImage} disabled={generating} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-colors" style={{ backgroundColor: "var(--color-accent)" }}>
            {generating ? "Generating..." : "Download as Image"}
          </button>
          <button onClick={copyText} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            {copied === "text" ? "Copied!" : "Copy Text Summary"}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <a href={getTwitterUrl(text)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Share on X</a>
            <a href={getLinkedInUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>LinkedIn</a>
          </div>
          <button onClick={copyLink} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            {copied === "link" ? "Copied!" : "Copy Link"}
          </button>
          {hasNativeShare && (
            <button onClick={shareNative} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-colors" style={{ backgroundColor: "#3B82F6" }}>Share...</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
interface Props {
  title: string;
  subtitle: string;
  defaultCategory?: Category | "all";
  articleMode?: boolean;
  showCancelDifficulty?: boolean;
}

export default function SubscriptionCalculator({ title, subtitle, defaultCategory = "all", articleMode = false, showCancelDifficulty = false }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({});
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">(defaultCategory);
  const [customSubs, setCustomSubs] = useState<CustomSub[]>([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const ariaRef = useRef<HTMLDivElement>(null);
  let customIdCounter = useRef(0);

  // Toggle a subscription
  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  // Select popular preset
  const selectPopular = () => {
    setChecked(new Set(POPULAR_PRESET_IDS));
    setCategory("all");
    setSearch("");
  };

  // Clear all
  const clearAll = () => { setChecked(new Set()); setCustomSubs([]); };

  // Price for a subscription (with overrides)
  const getPrice = (sub: Subscription) => priceOverrides[sub.id] ?? sub.price;

  // Filtered grid
  const filtered = useMemo(() => {
    let items = SUBSCRIPTIONS;
    if (category !== "all") items = items.filter(s => s.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(s => s.name.toLowerCase().includes(q) || s.plan.toLowerCase().includes(q));
    }
    // Sort: checked first, then by popularity
    return [...items].sort((a, b) => {
      const ac = checked.has(a.id) ? 1 : 0;
      const bc = checked.has(b.id) ? 1 : 0;
      if (ac !== bc) return bc - ac;
      return b.popularity - a.popularity;
    });
  }, [category, search, checked]);

  // Calculations
  const monthlyTotal = useMemo(() => {
    let total = 0;
    for (const sub of SUBSCRIPTIONS) {
      if (checked.has(sub.id)) total += getPrice(sub);
    }
    for (const c of customSubs) total += c.price;
    return total;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, priceOverrides, customSubs]);

  const yearlyTotal = monthlyToYearly(monthlyTotal);
  const fiveYearTotal = yearlyTotal * 5;
  const tenYearTotal = yearlyTotal * 10;
  const perDay = monthlyTotal * 12 / 365;
  const checkedCount = checked.size + customSubs.length;
  const invested10yr = compoundInvestment(monthlyTotal, 0.10, 10);

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    for (const sub of SUBSCRIPTIONS) {
      if (!checked.has(sub.id)) continue;
      const cat = CATEGORIES.find(c => c.key === sub.category);
      const label = cat?.label || sub.category;
      map.set(label, (map.get(label) || 0) + getPrice(sub));
    }
    if (customSubs.length > 0) {
      map.set("Custom", customSubs.reduce((s, c) => s + c.price, 0));
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, priceOverrides, customSubs]);

  // Top subscriptions by price
  const ranked = useMemo(() => {
    const items: { name: string; plan: string; price: number }[] = [];
    for (const sub of SUBSCRIPTIONS) {
      if (checked.has(sub.id)) items.push({ name: sub.name, plan: sub.plan, price: getPrice(sub) });
    }
    for (const c of customSubs) items.push({ name: c.name, plan: "Custom", price: c.price });
    return items.sort((a, b) => b.price - a.price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, priceOverrides, customSubs]);

  const comparisons = useMemo(() => getComparisons(yearlyTotal), [yearlyTotal]);

  // vs average
  const usAverage = 219;
  const vsAveragePercent = usAverage > 0 ? ((monthlyTotal - usAverage) / usAverage) * 100 : 0;

  // Aria live update
  useEffect(() => {
    if (ariaRef.current && checkedCount > 0) {
      ariaRef.current.textContent = `${checkedCount} subscriptions selected. Monthly total: ${formatCurrency(monthlyTotal)}.`;
    }
  }, [checkedCount, monthlyTotal]);

  // Add custom subscription
  const addCustom = () => {
    if (!newName.trim() || !newPrice) return;
    const id = `custom-${++customIdCounter.current}`;
    setCustomSubs(prev => [...prev, { id, name: newName.trim(), price: parseFloat(newPrice) || 0 }]);
    setNewName("");
    setNewPrice("");
    setShowAddCustom(false);
  };

  // Share data
  const shareData: ShareCardData = {
    monthly: monthlyTotal,
    yearly: yearlyTotal,
    fiveYear: fiveYearTotal,
    count: checkedCount,
    topThree: ranked.slice(0, 3).map(r => r.name),
  };

  // Cancel difficulty colors
  const difficultyColor = (d: string) => {
    if (d === "easy") return "#22C55E";
    if (d === "medium") return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", "--color-accent": "#16A34A" } as React.CSSProperties}>
      <div className="max-w-[1100px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <nav className="mb-2" style={{ color: "var(--text-muted)" }}>
              <a href="/" className="hover:opacity-70 transition-opacity" style={{ color: "var(--color-accent)" }}>Home</a>
              <span className="mx-1.5">/</span>
              <span>Finance Tools</span>
              <span className="mx-1.5">/</span>
              <span>Subscription Calculator</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>{title}</h1>
            <p className="text-base md:text-lg max-w-2xl" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-sm" style={{ backgroundColor: "var(--surface-alt)", color: "var(--text-muted)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              100% client-side
            </div>
            <DarkModeToggle />
          </div>
        </div>

        {/* What is this tool */}
        <p className="text-sm mb-6 max-w-2xl" style={{ color: "var(--text)" }}>
          This free subscription calculator lets you check off the services you pay for from a library of 80+ popular subscriptions with current 2026 prices pre-filled. See your true monthly, yearly, and long-term cost instantly &mdash; no typing required. All calculations happen in your browser; no data is stored.
        </p>

        {/* Punchy stat */}
        <div className="rounded-xl border p-4 mb-8 flex items-center gap-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <span className="text-2xl flex-shrink-0">{"😱"}</span>
          <p className="text-sm" style={{ color: "var(--text)" }}>
            <strong>89% of Americans underestimate their subscription spending by 2&ndash;3&times;.</strong>{" "}
            <span style={{ color: "var(--text-muted)" }}>The average household spends $219&ndash;$280/month. Check your own below.</span>
          </p>
        </div>

        {/* ─── Search + Category Pills ─── */}
        <div className="mb-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input
                type="text"
                placeholder="Search subscriptions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-accent)]/30"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={selectPopular} className="px-4 py-2 rounded-xl font-medium text-sm border transition-colors hover:opacity-80 whitespace-nowrap" style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}>
                {"⚡"} Select Popular
              </button>
              {checkedCount > 0 && (
                <button onClick={clearAll} className="px-4 py-2 rounded-xl font-medium text-sm border transition-colors hover:opacity-80 whitespace-nowrap" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  Clear All
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className="px-3 py-1.5 rounded-lg font-medium text-sm border transition-colors whitespace-nowrap flex-shrink-0"
                style={{
                  borderColor: category === c.key ? "var(--color-accent)" : "var(--border)",
                  backgroundColor: category === c.key ? "var(--color-accent)" : "var(--surface)",
                  color: category === c.key ? "#fff" : "var(--text)",
                }}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Updated date */}
        <div className="mb-4" style={{ color: "var(--text-muted)" }}>
          {"✓"} Prices verified February 2026 &mdash; {filtered.length} services shown
        </div>

        {/* ─── Subscription Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
          {filtered.map(sub => {
            const isChecked = checked.has(sub.id);
            const price = getPrice(sub);
            const isEditing = editingPrice === sub.id;
            return (
              <label
                key={sub.id}
                className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: isChecked ? sub.color : "var(--border)",
                  borderLeftWidth: isChecked ? "4px" : "1px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(sub.id)}
                  className="sr-only"
                />
                {/* Custom checkbox */}
                <div
                  className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors"
                  style={{
                    borderColor: isChecked ? sub.color : "var(--border)",
                    backgroundColor: isChecked ? sub.color : "transparent",
                  }}
                >
                  {isChecked && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  )}
                </div>
                {/* Icon */}
                <span className="text-xl flex-shrink-0">{sub.icon}</span>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>{sub.name}</div>
                  <div className="truncate" style={{ color: "var(--text-muted)" }}>
                    {sub.plan}
                    {showCancelDifficulty && (
                      <span className="ml-2 inline-flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: difficultyColor(sub.cancelDifficulty) }} />
                        <span style={{ color: difficultyColor(sub.cancelDifficulty) }}>{sub.cancelDifficulty}</span>
                      </span>
                    )}
                  </div>
                </div>
                {/* Price */}
                {isEditing ? (
                  <input
                    type="number"
                    inputMode="decimal"
                    autoFocus
                    defaultValue={price}
                    onBlur={e => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v) && v >= 0) setPriceOverrides(prev => ({ ...prev, [sub.id]: v }));
                      setEditingPrice(null);
                    }}
                    onKeyDown={e => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                    className="w-20 px-2 py-1 rounded-lg border text-sm text-right outline-none"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--color-accent)", color: "var(--text)" }}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <button
                    onClick={e => { e.preventDefault(); setEditingPrice(sub.id); }}
                    className="text-sm font-semibold tabular-nums flex-shrink-0 hover:underline"
                    style={{ color: isChecked ? sub.color : "var(--text-muted)" }}
                    title="Click to edit price"
                  >
                    ${price.toFixed(2)}
                  </button>
                )}
              </label>
            );
          })}
        </div>

        {/* Custom subscriptions */}
        {customSubs.map(c => (
          <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl border mb-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--color-accent)", borderLeftWidth: "4px" }}>
            <span className="text-xl">{"📌"}</span>
            <div className="flex-1"><span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{c.name}</span></div>
            <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--color-accent)" }}>${c.price.toFixed(2)}</span>
            <button onClick={() => setCustomSubs(prev => prev.filter(x => x.id !== c.id))} className="text-sm hover:opacity-70" style={{ color: "var(--text-muted)" }}>&times;</button>
          </div>
        ))}

        {/* Add custom */}
        {showAddCustom ? (
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border mb-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <input type="text" placeholder="Service name" value={newName} onChange={e => setNewName(e.target.value)} className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border text-sm outline-none" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
            <div className="flex items-center gap-1">
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>$</span>
              <input type="number" inputMode="decimal" placeholder="0.00" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-20 px-2 py-2 rounded-lg border text-sm outline-none" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
              <span style={{ color: "var(--text-muted)" }}>/mo</span>
            </div>
            <button onClick={addCustom} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: "var(--color-accent)" }}>Add</button>
            <button onClick={() => setShowAddCustom(false)} className="px-3 py-2 rounded-lg text-sm" style={{ color: "var(--text-muted)" }}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setShowAddCustom(true)} className="flex items-center gap-1.5 text-sm font-medium mb-6 hover:opacity-80 transition-opacity" style={{ color: "var(--color-accent)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Custom Subscription
          </button>
        )}

        {/* Aria live */}
        <div ref={ariaRef} aria-live="polite" className="sr-only" />

        {/* ═══════════════ RESULTS ═══════════════ */}
        {checkedCount > 0 && (
          <section className="space-y-6 mb-12" id="results">
            {/* Primary cost */}
            <div className="rounded-2xl border p-6 md:p-8 text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                You spend
              </div>
              <AnimatedCost value={monthlyTotal} className="text-5xl md:text-6xl font-extrabold tabular-nums block" style={{ color: "#DC2626" }} />
              <div className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                per month on {checkedCount} subscription{checkedCount !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Monthly", value: monthlyTotal, dec: 2 },
                { label: "Yearly", value: yearlyTotal, dec: 0 },
                { label: "5-Year", value: fiveYearTotal, dec: 0, highlight: true },
                { label: "10-Year", value: tenYearTotal, dec: 0, highlight: true },
              ].map(item => (
                <div key={item.label} className="rounded-xl border p-4 text-center" style={{ backgroundColor: "var(--surface)", borderColor: item.highlight ? "#DC2626" : "var(--border)" }}>
                  <div className="font-medium text-sm mb-1" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                  <div className={`font-bold tabular-nums ${item.highlight ? "text-xl md:text-2xl" : "text-lg"}`} style={{ color: item.highlight ? "#DC2626" : "var(--text)" }}>
                    {formatCurrency(item.value, item.dec)}
                  </div>
                </div>
              ))}
            </div>

            {/* Per day */}
            <div className="rounded-xl border p-4 text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text)" }}>
                You spend <strong style={{ color: "#DC2626" }}>{formatCurrency(perDay)}</strong> per day on subscriptions &mdash; before you even get out of bed.
              </span>
            </div>

            {/* Category breakdown */}
            {categoryBreakdown.length > 1 && (
              <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text)" }}>Spending by Category</h3>
                <div className="space-y-3">
                  {categoryBreakdown.map(([label, amount]) => {
                    const pct = monthlyTotal > 0 ? (amount / monthlyTotal) * 100 : 0;
                    return (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span style={{ color: "var(--text)" }}>{label}</span>
                          <span className="tabular-nums font-medium" style={{ color: "var(--text)" }}>{formatCurrency(amount)}/mo ({pct.toFixed(0)}%)</span>
                        </div>
                        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "var(--surface-alt)" }}>
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: "#DC2626" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Most expensive ranking */}
            {ranked.length > 1 && (
              <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>Your Most Expensive Subscriptions</h3>
                <div className="space-y-2">
                  {ranked.slice(0, 5).map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: i === 0 ? "#DC2626" : "var(--surface-alt)", color: i === 0 ? "#fff" : "var(--text-muted)" }}>{i + 1}</span>
                      <span className="flex-1 text-sm" style={{ color: "var(--text)" }}>
                        {r.name} <span style={{ color: "var(--text-muted)" }}>&mdash; {r.plan}</span>
                      </span>
                      <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--text)" }}>
                        {formatCurrency(r.price)}/mo
                        <span className="font-normal ml-1" style={{ color: "var(--text-muted)" }}>({formatCurrency(r.price * 12, 0)}/yr)</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* vs Average */}
            <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>vs. US Average</h3>
              <div className="flex items-end gap-4 mb-3">
                <div>
                  <div style={{ color: "var(--text-muted)" }}>Your monthly</div>
                  <div className="text-xl font-bold tabular-nums" style={{ color: "var(--text)" }}>{formatCurrency(monthlyTotal)}</div>
                </div>
                <div>
                  <div style={{ color: "var(--text-muted)" }}>US average</div>
                  <div className="text-xl font-bold tabular-nums" style={{ color: "var(--text-muted)" }}>{formatCurrency(usAverage, 0)}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className={`text-lg font-bold ${vsAveragePercent > 10 ? "text-red-500" : vsAveragePercent < -10 ? "text-green-500" : ""}`} style={{ color: Math.abs(vsAveragePercent) <= 10 ? "var(--text-muted)" : undefined }}>
                    {vsAveragePercent > 0 ? "+" : ""}{vsAveragePercent.toFixed(0)}%
                  </div>
                  <div style={{ color: "var(--text-muted)" }}>
                    {vsAveragePercent > 10 ? "above average" : vsAveragePercent < -10 ? "below average" : "about average"}
                  </div>
                </div>
              </div>
              <div className="h-4 rounded-full overflow-hidden relative" style={{ backgroundColor: "var(--surface-alt)" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (monthlyTotal / (usAverage * 2)) * 100)}%`, backgroundColor: vsAveragePercent > 10 ? "#EF4444" : vsAveragePercent < -10 ? "#22C55E" : "#F59E0B" }} />
                {/* Average marker */}
                <div className="absolute top-0 h-full w-0.5" style={{ left: "50%", backgroundColor: "var(--text-muted)" }} />
              </div>
              <div className="flex justify-between text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                <span>$0</span>
                <span>US avg: $219</span>
                <span>$438+</span>
              </div>
            </div>

            {/* Opportunity cost */}
            {comparisons.length > 0 && (
              <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Your {formatCurrency(yearlyTotal, 0)}/year in subscriptions is equivalent to:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {comparisons.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "var(--bg)" }}>
                      <span className="text-2xl flex-shrink-0">{c.icon}</span>
                      <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{c.text}</span>
                    </div>
                  ))}
                </div>
                {/* Investment highlight */}
                <div className="mt-4 p-4 rounded-xl text-center" style={{ backgroundColor: "#FEF2F2", border: "2px solid #DC2626" }}>
                  <div className="text-sm font-medium" style={{ color: "#991B1B" }}>
                    If you invested {formatCurrency(monthlyTotal)}/month at 10% annual return instead:
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold mt-1" style={{ color: "#DC2626" }}>
                    {formatCurrency(invested10yr, 0)} after 10 years
                  </div>
                </div>
              </div>
            )}

            {/* Share */}
            <div className="flex justify-center">
              <button onClick={() => setShowShare(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105" style={{ backgroundColor: "#DC2626" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                Share Your Results
              </button>
            </div>
          </section>
        )}

        {/* ─── Pro Tips ─── */}
        {!articleMode && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Pro Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { title: "The rotation strategy saves $400\u2013600/year.", text: "Instead of subscribing to 4 streaming services simultaneously, subscribe to one at a time. Binge for a month, cancel, rotate to the next. You watch everything you want and pay 75% less." },
                { title: "Check for bundle savings.", text: "Disney+/Hulu/ESPN bundle saves ~$10/mo vs. separate. Apple One bundles TV+, Music, Arcade, and iCloud+ from $19.95/mo. Your phone carrier might include free streaming you don\u2019t know about." },
                { title: "Annual billing saves 15\u201320%.", text: "Spotify, YouTube Premium, Disney+, and most SaaS tools offer annual plans at a discount. Only do this for services you\u2019re certain you\u2019ll use the full year." },
                { title: "Audit your bank statement, not your memory.", text: "Studies show people forget 2\u20133 active subscriptions on average. Pull up your credit card statement and search for recurring charges. You\u2019ll almost certainly find something you forgot about." },
                { title: "Calculate cost-per-use before canceling.", text: "Netflix at $18/mo watched 30 hours = $0.60/hr (great value). A $50/mo gym membership used 3x/month = $16.67/visit (consider canceling). Don\u2019t cut the cheap stuff you love \u2014 cut the expensive stuff you don\u2019t use." },
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }}>
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{tip.title}</div>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── SEO Content ─── */}
        {!articleMode && (
          <article className="mb-12">
            <div className="rounded-2xl border p-6 md:p-8" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>The True Cost of Your Subscriptions</h2>
              <div className="prose max-w-none space-y-4 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                <p>The average American household spends between $219 and $280 per month on subscriptions, according to surveys by C+R Research and Reviews.org. That range translates to $2,628&ndash;$3,360 per year &mdash; or $13,140&ndash;$16,800 over five years. Yet 89% of consumers dramatically underestimate their total, guessing around $80&ndash;$100 per month when the real number is double or triple that.</p>
                <p>The phenomenon is called <strong>subscription creep</strong>: individual charges of $5, $10, or $15 per month feel painless in isolation. But they compound silently. A household with Netflix, Spotify, Amazon Prime, a gym membership, iCloud+, ChatGPT Plus, and a couple of news subscriptions can easily hit $200+/month without realizing it.</p>
                <p>Perhaps most striking: <strong>42% of consumers pay for subscriptions they have forgotten about entirely</strong>. That forgotten Audible, unused gym membership, or lingering free-trial-turned-paid service can quietly drain $500&ndash;$600 per year.</p>

                <h3 className="text-lg font-semibold mt-6 mb-3">The Compound Effect of Subscription Spending</h3>
                <p>The true cost of subscriptions extends beyond the monthly charge. $200 per month invested at a 10% average annual return instead of spent on subscriptions becomes <strong>over $41,000 in 10 years</strong> and $153,000+ in 20 years. Every subscription is a trade-off against future wealth &mdash; which is fine if you genuinely use and value the service, but devastating when it is autopiloting money out of your account unused.</p>

                <h3 className="text-lg font-semibold mt-6 mb-3">How to Reduce Your Subscription Spending</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Rotate streaming services.</strong> Subscribe to one at a time, binge your shows, cancel, move to the next. This alone can save $400&ndash;$600/year.</li>
                  <li><strong>Optimize bundles.</strong> Apple One, Disney/Hulu/ESPN bundles, and carrier perks can save $10&ndash;$20/month vs. separate plans.</li>
                  <li><strong>Switch to annual billing.</strong> Most services offer 15&ndash;20% discounts for annual payment. Only commit for services you are certain to keep.</li>
                  <li><strong>Use free alternatives.</strong> Library apps like Libby provide free audiobooks and ebooks. Free tiers of Spotify, YouTube, and Canva cover most casual needs.</li>
                  <li><strong>Apply the &quot;one in, one out&quot; rule.</strong> Every time you subscribe to something new, cancel something old. Your subscription count stays flat.</li>
                </ul>

                <p>Our <a href="/finance-tools/subscription-audit" style={{ color: "var(--color-accent)" }} className="font-medium underline">subscription audit tool</a> helps you check off what you pay for and see the true impact instantly. You can also use the <a href="/business-tools/meeting-cost-calculator" style={{ color: "var(--color-accent)" }} className="font-medium underline">meeting cost calculator</a> to see how your company spends on meetings.</p>
              </div>
            </div>
          </article>
        )}

        {/* ─── FAQ ─── */}
        <section className="mb-12">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "How much does the average person spend on subscriptions?", a: "The average American household spends between $219 and $280 per month on subscriptions, including streaming, music, software, delivery memberships, gym, and more. Most people significantly underestimate their total \u2014 guessing around $80\u2013100/month when the real number is double or triple that." },
              { q: "What subscriptions do most people have?", a: "The most common subscriptions in the US are Amazon Prime (held by ~65% of households), Netflix (~55%), Spotify or Apple Music (~40%), and a cloud storage plan like iCloud or Google One (~35%). Most households have 5\u20138 active subscriptions." },
              { q: "How do I find all my subscriptions?", a: "The most reliable method is to check your bank or credit card statements for the last 3 months and search for recurring charges. You can also check Settings > Apple ID > Subscriptions on iPhone, Google Play Store payments, and search your email inbox for \"subscription,\" \"renewal,\" or \"receipt.\"" },
              { q: "Is this calculator free? Do you store my data?", a: "The subscription calculator is completely free with no signup required. All calculations happen in your browser. We do not store, collect, or transmit any of your subscription data. Close the tab and it is gone." },
              { q: "How often are the prices updated?", a: "We verify and update all subscription prices quarterly. Prices were last verified in February 2026. If you notice an outdated price, you can edit any price inline by clicking on it." },
              { q: "What\u2019s the best way to reduce subscription costs?", a: "Start by identifying subscriptions you haven\u2019t used in the past 2 weeks \u2014 those are the easiest to cut. For streaming, consider the rotation strategy: subscribe to one service at a time, binge your shows, cancel, and move to the next. Also check if your phone carrier, credit card, or internet provider includes free streaming subscriptions." },
              { q: "How much could I save by canceling unused subscriptions?", a: "The average person wastes about $500\u2013$600 per year on subscriptions they rarely or never use. A quarterly audit \u2014 just checking what you actually use \u2014 can easily save $50\u2013$100/month." },
            ].map((faq, i) => (
              <details key={i} className="group rounded-xl border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium list-none" style={{ color: "var(--text)" }}>
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 ml-4 transition-transform group-open:rotate-180" style={{ color: "var(--text-muted)" }}><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ─── Related Tools ─── */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>More Free Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Meeting Cost Calculator", desc: "See what your meetings really cost", href: "/business-tools/meeting-cost-calculator", icon: "💰" },
              { name: "Salary to Hourly Calculator", desc: "Convert annual salary to hourly rate", href: "/finance-tools/salary-calculator", icon: "💵" },
              { name: "Compound Interest Calculator", desc: "See how your money grows over time", href: "/finance-tools/compound-interest-calculator", icon: "📈" },
              { name: "Budget Planner", desc: "Plan and track your monthly budget", href: "/finance-tools/budget-planner", icon: "📊" },
              { name: "Bill Split Calculator", desc: "Split bills fairly among friends", href: "/finance-tools/bill-split-calculator", icon: "🧾" },
              { name: "Savings Goal Calculator", desc: "Plan how long to reach your goal", href: "/finance-tools/savings-goal-calculator", icon: "🎯" },
            ].map(tool => (
              <a key={tool.name} href={tool.href} className="flex items-start gap-3 p-4 rounded-xl border transition-shadow hover:shadow-md" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <span className="text-xl flex-shrink-0 mt-0.5">{tool.icon}</span>
                <div>
                  <div className="font-medium text-sm" style={{ color: "var(--text)" }}>{tool.name}</div>
                  <div style={{ color: "var(--text-muted)" }}>{tool.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 pb-4 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <p>Free Online Tools &mdash; Free calculators and tools for everyone.</p>
          <p className="mt-1">No signup required. No ads. No tracking.</p>
        </footer>
      </div>

      {showShare && <ShareModal data={shareData} onClose={() => setShowShare(false)} />}
    </div>
  );
}
