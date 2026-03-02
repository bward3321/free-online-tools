"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  type Attendee,
  type FrequencyKey,
  ROLE_PRESETS,
  DEFAULT_ATTENDEES,
  FREQUENCIES,
  DURATION_PRESETS,
  totalAttendees,
  burnRatePerHour,
  blendedRate,
  meetingCost,
  costPerMinute,
  annualCost,
  monthlyCost,
  formatCurrency,
  nextId,
} from "../lib/roles";
import { getComparisons } from "../lib/comparisons";
import {
  type ShareData,
  generateShareCard,
  shareCardToBlob,
  getShareText,
  getTwitterUrl,
  getLinkedInUrl,
} from "../lib/share-card";

/* ─── Dark Mode Toggle ─── */
function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
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

/* ─── Privacy Badge ─── */
function PrivacyBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-sm" style={{ backgroundColor: "var(--surface-alt)", color: "var(--text-muted)" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
      100% client-side
    </div>
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

  return (
    <span className={className} style={style}>
      {formatCurrency(displayed, decimals)}
    </span>
  );
}

/* ─── Team Builder ─── */
function TeamBuilder({
  attendees,
  onChange,
}: {
  attendees: Attendee[];
  onChange: (a: Attendee[]) => void;
}) {
  const updateRow = (id: string, patch: Partial<Attendee>) => {
    onChange(attendees.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };
  const removeRow = (id: string) => {
    onChange(attendees.filter((a) => a.id !== id));
  };
  const addRow = () => {
    onChange([...attendees, { id: nextId(), role: "Mid-Level IC", rate: 50, count: 1 }]);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>
        Who&apos;s in this meeting?
      </h3>
      <div className="space-y-2">
        {attendees.map((a) => (
          <div
            key={a.id}
            className="flex flex-wrap items-center gap-2 p-3 rounded-xl border"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            {/* Role select */}
            <select
              value={ROLE_PRESETS.find((r) => r.label === a.role) ? a.role : "Custom"}
              onChange={(e) => {
                const preset = ROLE_PRESETS.find((r) => r.label === e.target.value);
                if (preset && preset.label !== "Custom") {
                  updateRow(a.id, { role: preset.label, rate: preset.rate });
                } else {
                  updateRow(a.id, { role: "Custom" });
                }
              }}
              className="flex-1 min-w-[140px] px-2 py-1.5 rounded-lg border text-sm outline-none"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
            >
              {ROLE_PRESETS.map((r) => (
                <option key={r.label} value={r.label}>
                  {r.label}{r.label !== "Custom" ? ` (~$${r.rate}/hr)` : ""}
                </option>
              ))}
            </select>

            {/* Hourly rate */}
            <div className="flex items-center gap-1">
              <span style={{ color: "var(--text-muted)" }}>$</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={a.rate || ""}
                onChange={(e) => updateRow(a.id, { rate: parseFloat(e.target.value) || 0 })}
                className="w-16 px-2 py-1.5 rounded-lg border text-sm outline-none text-center"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
              />
              <span style={{ color: "var(--text-muted)" }}>/hr</span>
            </div>

            {/* Count stepper */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateRow(a.id, { count: Math.max(1, a.count - 1) })}
                className="w-7 h-7 rounded-lg border flex items-center justify-center text-sm font-bold transition-colors hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg)" }}
                aria-label="Decrease count"
              >
                &minus;
              </button>
              <span className="w-6 text-center text-sm font-medium tabular-nums" style={{ color: "var(--text)" }}>
                {a.count}
              </span>
              <button
                onClick={() => updateRow(a.id, { count: a.count + 1 })}
                className="w-7 h-7 rounded-lg border flex items-center justify-center text-sm font-bold transition-colors hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg)" }}
                aria-label="Increase count"
              >
                +
              </button>
            </div>

            {/* Remove */}
            {attendees.length > 1 && (
              <button
                onClick={() => removeRow(a.id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-colors hover:bg-red-100 dark:hover:bg-red-900/30"
                style={{ color: "var(--text-muted)" }}
                aria-label="Remove attendee"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addRow}
        className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:opacity-80"
        style={{ color: "var(--color-accent)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        Add Role
      </button>

      {/* Summary stats */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div>
          <span style={{ color: "var(--text-muted)" }}>Attendees: </span>
          <span className="font-semibold" style={{ color: "var(--text)" }}>{totalAttendees(attendees)} people</span>
        </div>
        <div>
          <span style={{ color: "var(--text-muted)" }}>Avg rate: </span>
          <span className="font-semibold" style={{ color: "var(--text)" }}>{formatCurrency(blendedRate(attendees), 0)}/hr</span>
        </div>
        <div>
          <span style={{ color: "var(--text-muted)" }}>Burn rate: </span>
          <span className="font-semibold" style={{ color: "var(--color-accent)" }}>{formatCurrency(burnRatePerHour(attendees), 0)}/hr</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Share Modal ─── */
function ShareModal({
  data,
  onClose,
}: {
  data: ShareData;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const copyText = async () => {
    const text = getShareText(data);
    await navigator.clipboard.writeText(text);
    setCopied("text");
    setTimeout(() => setCopied(null), 2000);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText("https://everyfreetool.com/business-tools/meeting-cost-calculator");
    setCopied("link");
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadImage = async () => {
    setGenerating(true);
    try {
      const canvas = generateShareCard(data);
      const blob = await shareCardToBlob(canvas);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "meeting-cost.png";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setGenerating(false);
    }
  };

  const shareNative = async () => {
    if (!navigator.share) return;
    try {
      const canvas = generateShareCard(data);
      const blob = await shareCardToBlob(canvas);
      const file = new File([blob], "meeting-cost.png", { type: "image/png" });
      await navigator.share({
        text: getShareText(data),
        files: [file],
      });
    } catch {
      /* user cancelled */
    }
  };

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div
        className="w-full max-w-md rounded-2xl border p-6 space-y-4"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>Share Results</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:opacity-70" style={{ color: "var(--text-muted)" }} aria-label="Close">&times;</button>
        </div>

        {/* Preview text */}
        <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: "var(--bg)", color: "var(--text-muted)" }}>
          {getShareText(data)}
        </div>

        <div className="grid grid-cols-1 gap-2">
          <button onClick={downloadImage} disabled={generating} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-white" style={{ backgroundColor: "var(--color-accent)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            {generating ? "Generating..." : "Download as Image"}
          </button>
          <button onClick={copyText} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
            {copied === "text" ? "Copied!" : "Copy Text Summary"}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <a href={getTwitterUrl(data)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
              Share on X
            </a>
            <a href={getLinkedInUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
              LinkedIn
            </a>
          </div>
          <button onClick={copyLink} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
            {copied === "link" ? "Copied!" : "Copy Link"}
          </button>
          {hasNativeShare && (
            <button onClick={shareNative} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-colors" style={{ backgroundColor: "#3B82F6" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
              Share...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Results Panel (Plan mode) ─── */
function ResultsPanel({
  attendees,
  duration,
  frequency,
}: {
  attendees: Attendee[];
  duration: number;
  frequency: FrequencyKey;
}) {
  const perSession = meetingCost(attendees, duration);
  const perMin = costPerMinute(attendees);
  const monthly = monthlyCost(attendees, duration, frequency);
  const annual = annualCost(attendees, duration, frequency);
  const comparisons = getComparisons(annual);
  const [showShare, setShowShare] = useState(false);

  const freq = FREQUENCIES.find((f) => f.key === frequency);
  const isRecurring = frequency !== "once";

  const durationLabel =
    duration >= 60
      ? `${Math.floor(duration / 60)}h ${duration % 60 > 0 ? `${duration % 60}m` : ""}`.trim()
      : `${duration} min`;

  const shareData: ShareData = {
    totalCost: perSession,
    duration: durationLabel,
    attendees: totalAttendees(attendees),
    annualCost: isRecurring ? annual : null,
    frequency: isRecurring ? freq?.label.toLowerCase() || null : null,
    isLive: false,
  };

  return (
    <>
      <div className="space-y-6">
        {/* Primary cost card */}
        <div
          className="rounded-2xl border p-6 md:p-8 text-center"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
            This meeting costs
          </div>
          <AnimatedCost
            value={perSession}
            className="text-5xl md:text-6xl font-extrabold tabular-nums block"
            style={{ color: "var(--color-accent)" }}
          />
          <div className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>per session</div>
        </div>

        {/* Breakdown row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Per Minute", value: perMin, dec: 2 },
            { label: "Per Session", value: perSession, dec: 2 },
            { label: "Per Month", value: monthly, dec: 0 },
            { label: "Per Year", value: annual, dec: 0, highlight: true },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border p-4 text-center"
              style={{ backgroundColor: "var(--surface)", borderColor: item.highlight ? "var(--color-accent)" : "var(--border)" }}
            >
              <div className="font-medium text-sm mb-1" style={{ color: "var(--text-muted)" }}>
                {item.label}
              </div>
              <div
                className={`font-bold tabular-nums ${item.highlight ? "text-xl md:text-2xl" : "text-lg"}`}
                style={{ color: item.highlight ? "var(--color-accent)" : "var(--text)" }}
              >
                {formatCurrency(item.value, item.dec)}
              </div>
            </div>
          ))}
        </div>

        {/* Opportunity cost */}
        {comparisons.length > 0 && isRecurring && (
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="text-sm font-semibold mb-4" style={{ color: "var(--text)" }}>
              Your annual meeting cost of {formatCurrency(annual, 0)} is equivalent to:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {comparisons.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "var(--bg)" }}>
                  <span className="text-2xl flex-shrink-0">{c.icon}</span>
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowShare(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
            Share Results
          </button>
        </div>
      </div>

      {showShare && <ShareModal data={shareData} onClose={() => setShowShare(false)} />}
    </>
  );
}

/* ─── Comparison Mode ─── */
function ComparisonMode({
  original,
  duration,
  frequency,
}: {
  original: Attendee[];
  duration: number;
  frequency: FrequencyKey;
}) {
  const [optAttendees, setOptAttendees] = useState<Attendee[]>(() =>
    original.map((a) => ({ ...a, id: nextId() }))
  );
  const [optDuration, setOptDuration] = useState(duration);
  const [optFrequency, setOptFrequency] = useState<FrequencyKey>(frequency);

  const origAnnual = annualCost(original, duration, frequency);
  const optAnnual = annualCost(optAttendees, optDuration, optFrequency);
  const savings = origAnnual - optAnnual;
  const savingsPercent = origAnnual > 0 ? (savings / origAnnual) * 100 : 0;

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
        Compare Scenarios
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original */}
        <div>
          <div className="text-sm font-semibold mb-2 px-3 py-1.5 rounded-lg inline-block" style={{ backgroundColor: "var(--surface-alt)", color: "var(--text-muted)" }}>
            Current Meeting
          </div>
          <div className="mt-3 space-y-2 text-sm" style={{ color: "var(--text)" }}>
            <div>{totalAttendees(original)} attendees &bull; {duration} min &bull; {FREQUENCIES.find(f => f.key === frequency)?.label}</div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: "var(--text)" }}>
              {formatCurrency(origAnnual, 0)}<span className="text-sm font-normal" style={{ color: "var(--text-muted)" }}>/year</span>
            </div>
          </div>
        </div>

        {/* Optimized */}
        <div>
          <div className="text-sm font-semibold mb-2 px-3 py-1.5 rounded-lg inline-block" style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>
            Optimized Meeting
          </div>
          <div className="mt-3 space-y-3">
            <TeamBuilder attendees={optAttendees} onChange={setOptAttendees} />
            <div className="flex flex-wrap gap-2">
              {DURATION_PRESETS.map((d) => (
                <button
                  key={d}
                  onClick={() => setOptDuration(d)}
                  className="px-3 py-1 rounded-lg font-medium text-sm border transition-colors"
                  style={{
                    borderColor: optDuration === d ? "var(--color-accent)" : "var(--border)",
                    backgroundColor: optDuration === d ? "var(--color-accent)" : "var(--surface)",
                    color: optDuration === d ? "#fff" : "var(--text)",
                  }}
                >
                  {d >= 60 ? `${d / 60} hr${d > 60 ? "s" : ""}` : `${d} min`}
                </button>
              ))}
            </div>
            <select
              value={optFrequency}
              onChange={(e) => setOptFrequency(e.target.value as FrequencyKey)}
              className="px-3 py-1.5 rounded-lg border text-sm outline-none"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
            >
              {FREQUENCIES.map((f) => (
                <option key={f.key} value={f.key}>{f.label}</option>
              ))}
            </select>
            <div className="text-2xl font-bold tabular-nums" style={{ color: "var(--text)" }}>
              {formatCurrency(optAnnual, 0)}<span className="text-sm font-normal" style={{ color: "var(--text-muted)" }}>/year</span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings bar */}
      {savings > 0 && (
        <div className="mt-6 p-4 rounded-xl text-center" style={{ backgroundColor: "#F0FDF4", border: "2px solid #22C55E" }}>
          <div className="text-sm font-medium" style={{ color: "#166534" }}>
            By optimizing this meeting, you save
          </div>
          <div className="text-3xl md:text-4xl font-extrabold mt-1" style={{ color: "#16A34A" }}>
            {formatCurrency(savings, 0)}/year
          </div>
          <div className="text-sm mt-1" style={{ color: "#166534" }}>
            That&apos;s a {savingsPercent.toFixed(0)}% reduction
          </div>
          {/* Visual bar */}
          <div className="mt-3 h-4 rounded-full overflow-hidden" style={{ backgroundColor: "#FEE2E2" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(0, 100 - savingsPercent)}%`,
                backgroundColor: "#22C55E",
              }}
            />
          </div>
          <div className="flex justify-between text-sm mt-1" style={{ color: "#6b6b76" }}>
            <span>Optimized: {formatCurrency(optAnnual, 0)}</span>
            <span>Current: {formatCurrency(origAnnual, 0)}</span>
          </div>
        </div>
      )}
      {savings <= 0 && savings !== 0 && (
        <div className="mt-6 p-4 rounded-xl text-center" style={{ backgroundColor: "#FEF2F2", border: "2px solid #EF4444" }}>
          <div className="text-sm font-medium" style={{ color: "#991B1B" }}>
            The optimized version costs {formatCurrency(Math.abs(savings), 0)}/year more
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Live Timer ─── */
function LiveTimer({ initialAttendees }: { initialAttendees: Attendee[] }) {
  const [attendees, setAttendees] = useState<Attendee[]>(initialAttendees);
  const [quickMode, setQuickMode] = useState(false);
  const [quickCount, setQuickCount] = useState(6);
  const [quickRate, setQuickRate] = useState(65);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const [finished, setFinished] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const ariaRef = useRef<HTMLDivElement>(null);
  const ariaCountRef = useRef(0);

  const activeAttendees: Attendee[] = quickMode
    ? [{ id: "quick", role: "Average", rate: quickRate, count: quickCount }]
    : attendees;

  const perSecond = burnRatePerHour(activeAttendees) / 3600;
  const currentCost = perSecond * elapsed;

  // Timer logic
  useEffect(() => {
    if (running && !paused) {
      timerRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running, paused]);

  // Aria live updates every 30s
  useEffect(() => {
    if (running && !paused) {
      ariaCountRef.current++;
      if (ariaCountRef.current % 30 === 0 && ariaRef.current) {
        ariaRef.current.textContent = `Meeting cost: ${formatCurrency(currentCost)}. Elapsed: ${formatElapsed(elapsed)}.`;
      }
    }
  }, [elapsed, running, paused, currentCost]);

  // Wake lock
  useEffect(() => {
    if (running && !paused && "wakeLock" in navigator) {
      (navigator as Navigator & { wakeLock: { request: (type: string) => Promise<WakeLockSentinel> } }).wakeLock
        .request("screen")
        .then((lock: WakeLockSentinel) => { wakeLockRef.current = lock; })
        .catch(() => {});
    }
    return () => { wakeLockRef.current?.release(); };
  }, [running, paused]);

  const start = () => {
    setElapsed(0);
    setRunning(true);
    setPaused(false);
    setFinished(false);
  };

  const pause = () => setPaused(!paused);

  const end = () => {
    setRunning(false);
    setPaused(false);
    setFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reset = () => {
    setElapsed(0);
    setRunning(false);
    setPaused(false);
    setFinished(false);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const adjustAttendees = (delta: number) => {
    if (quickMode) {
      setQuickCount((c) => Math.max(1, c + delta));
    }
  };

  // Color based on elapsed time
  const getCostColor = () => {
    if (elapsed < 900) return "#22C55E"; // green < 15min
    if (elapsed < 1800) return "#F59E0B"; // amber < 30min
    return "#EF4444"; // red 30min+
  };

  const formatElapsed = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h > 0 ? String(h).padStart(2, "0") + ":" : ""}${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const durationLabel = (() => {
    const mins = Math.ceil(elapsed / 60);
    if (mins >= 60) return `${Math.floor(mins / 60)}h ${mins % 60}m`;
    return `${mins} min`;
  })();

  const shareData: ShareData = {
    totalCost: currentCost,
    duration: durationLabel,
    attendees: quickMode ? quickCount : totalAttendees(attendees),
    annualCost: null,
    frequency: null,
    isLive: true,
  };

  // ─── Finished screen ───
  if (finished) {
    return (
      <div className="space-y-6">
        <div
          className="rounded-2xl border p-6 md:p-10 text-center"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-4" style={{ color: "#22C55E" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            Meeting Complete
          </div>
          <div className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
            <div>Duration: <strong style={{ color: "var(--text)" }}>{durationLabel}</strong></div>
            <div>Attendees: <strong style={{ color: "var(--text)" }}>{quickMode ? quickCount : totalAttendees(attendees)} people</strong></div>
          </div>
          <div className="my-6">
            <div className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>Total Cost</div>
            <div className="text-5xl md:text-6xl font-extrabold tabular-nums" style={{ color: "var(--color-accent)" }}>
              {formatCurrency(currentCost)}
            </div>
            <div className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
              That&apos;s {formatCurrency(currentCost / Math.max(1, quickMode ? quickCount : totalAttendees(attendees)))} per person
            </div>
          </div>

          {/* Weekly projection */}
          <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: "var(--bg)" }}>
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>
              If this meeting happens weekly, it costs{" "}
              <strong style={{ color: "var(--color-accent)" }}>
                {formatCurrency(currentCost * 52, 0)}/year
              </strong>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
              Share Results
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border transition-colors hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              Start New Timer
            </button>
          </div>
        </div>
        {showShare && <ShareModal data={shareData} onClose={() => setShowShare(false)} />}
      </div>
    );
  }

  // ─── Running / Paused screen ───
  if (running) {
    return (
      <div ref={containerRef} className={`${isFullscreen ? "flex items-center justify-center h-screen" : ""}`} style={{ backgroundColor: isFullscreen ? "#0a0a0a" : undefined }}>
        <div className="w-full max-w-2xl mx-auto text-center p-6 md:p-10 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${paused ? "" : "animate-ping"}`} style={{ backgroundColor: paused ? "#6b6b76" : getCostColor() }} />
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: paused ? "#6b6b76" : getCostColor() }} />
            </span>
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: paused ? "var(--text-muted)" : getCostColor() }}>
              {paused ? "Paused" : "Meeting in Progress"}
            </span>
          </div>

          {/* Elapsed */}
          <div className="text-2xl md:text-3xl font-mono tabular-nums" style={{ color: "var(--text-muted)" }}>
            {formatElapsed(elapsed)}
          </div>

          {/* Cost - THE HERO */}
          <div className="relative">
            <div
              className="text-6xl md:text-8xl font-extrabold tabular-nums transition-colors duration-1000"
              style={{
                color: getCostColor(),
                textShadow: elapsed >= 1800 ? `0 0 40px ${getCostColor()}40` : "none",
              }}
            >
              {formatCurrency(currentCost)}
            </div>
            <div className="text-base mt-2" style={{ color: "var(--text-muted)" }}>
              and counting...
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>{formatCurrency(perSecond * 60, 2)}/min</span>
            <span>&bull;</span>
            <span>{quickMode ? quickCount : totalAttendees(attendees)} attendees</span>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={pause} className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>
            <button onClick={end} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors hover:opacity-90" style={{ backgroundColor: "#EF4444" }}>
              End Meeting
            </button>
            <button onClick={toggleFullscreen} className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
              {isFullscreen ? "Exit Fullscreen" : "⛶ Fullscreen"}
            </button>
          </div>

          {/* Quick attendee adjust */}
          {quickMode && (
            <div className="flex items-center justify-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <button onClick={() => adjustAttendees(-1)} className="w-8 h-8 rounded-lg border flex items-center justify-center" style={{ borderColor: "var(--border)" }}>&minus;</button>
              <span>{quickCount} attendees</span>
              <button onClick={() => adjustAttendees(1)} className="w-8 h-8 rounded-lg border flex items-center justify-center" style={{ borderColor: "var(--border)" }}>+</button>
            </div>
          )}

          {/* Aria live region */}
          <div ref={ariaRef} aria-live="polite" className="sr-only" />
        </div>
      </div>
    );
  }

  // ─── Setup screen ───
  return (
    <div className="space-y-6">
      {/* Quick/detailed toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setQuickMode(false)}
          className="px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
          style={{
            borderColor: !quickMode ? "var(--color-accent)" : "var(--border)",
            backgroundColor: !quickMode ? "var(--color-accent)" : "var(--surface)",
            color: !quickMode ? "#fff" : "var(--text)",
          }}
        >
          Detailed Setup
        </button>
        <button
          onClick={() => setQuickMode(true)}
          className="px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
          style={{
            borderColor: quickMode ? "var(--color-accent)" : "var(--border)",
            backgroundColor: quickMode ? "var(--color-accent)" : "var(--surface)",
            color: quickMode ? "#fff" : "var(--text)",
          }}
        >
          Quick Start
        </button>
      </div>

      {quickMode ? (
        <div
          className="rounded-2xl border p-6 space-y-4"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>Quick Setup</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                Number of people
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                value={quickCount}
                onChange={(e) => setQuickCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2.5 rounded-xl border text-base outline-none"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                Average hourly rate
              </label>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={quickRate || ""}
                onChange={(e) => setQuickRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border text-base outline-none"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
              />
            </div>
          </div>
          {/* Quick role buttons */}
          <div className="flex flex-wrap gap-2">
            {ROLE_PRESETS.filter((r) => r.label !== "Custom").map((r) => (
              <button
                key={r.label}
                onClick={() => setQuickRate(r.rate)}
                className="px-3 py-1 rounded-lg text-sm border transition-colors hover:opacity-80"
                style={{
                  borderColor: quickRate === r.rate ? "var(--color-accent)" : "var(--border)",
                  backgroundColor: quickRate === r.rate ? "var(--color-accent)" : "var(--surface)",
                  color: quickRate === r.rate ? "#fff" : "var(--text-muted)",
                }}
              >
                {r.label} (${r.rate})
              </button>
            ))}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            Burn rate: <strong style={{ color: "var(--color-accent)" }}>{formatCurrency(quickCount * quickRate, 0)}/hr</strong>
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl border p-6"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <TeamBuilder attendees={attendees} onChange={setAttendees} />
        </div>
      )}

      <button
        onClick={start}
        className="w-full py-4 rounded-2xl text-lg font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
        style={{ backgroundColor: "#22C55E" }}
      >
        Start Meeting
      </button>
    </div>
  );
}

/* ─── Main Component ─── */
interface MeetingCostCalculatorProps {
  title: string;
  subtitle: string;
  defaultMode?: "plan" | "live";
  articleMode?: boolean;
}

export default function MeetingCostCalculator({
  title,
  subtitle,
  defaultMode = "plan",
  articleMode = false,
}: MeetingCostCalculatorProps) {
  const [mode, setMode] = useState<"plan" | "live">(defaultMode);
  const [attendees, setAttendees] = useState<Attendee[]>(
    DEFAULT_ATTENDEES.map((a) => ({ ...a }))
  );
  const [duration, setDuration] = useState(60);
  const [customH, setCustomH] = useState(1);
  const [customM, setCustomM] = useState(0);
  const [useCustom, setUseCustom] = useState(false);
  const [frequency, setFrequency] = useState<FrequencyKey>("weekly");
  const [showComparison, setShowComparison] = useState(false);

  const activeDuration = useCustom ? customH * 60 + customM : duration;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", "--color-accent": "#D97706" } as React.CSSProperties}>
      <div className="max-w-[1100px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <a href="/" className="text-sm font-medium mb-3 inline-block hover:opacity-70 transition-opacity" style={{ color: "var(--color-accent)" }}>
              &larr; All Tools
            </a>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>
              {title}
            </h1>
            <p className="text-base md:text-lg" style={{ color: "var(--text-muted)" }}>
              {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <PrivacyBadge />
            <DarkModeToggle />
          </div>
        </div>

        {/* Punchy stat */}
        <div
          className="rounded-xl border p-4 mb-8 flex items-center gap-3"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <span className="text-2xl flex-shrink-0">{"💡"}</span>
          <p className="text-sm" style={{ color: "var(--text)" }}>
            <strong>The average company wastes $25,000/employee/year on unnecessary meetings.</strong>{" "}
            <span style={{ color: "var(--text-muted)" }}>See what your meetings really cost.</span>
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-1 p-1 rounded-xl mb-8" style={{ backgroundColor: "var(--surface-alt)" }}>
          <button
            onClick={() => setMode("plan")}
            className="flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all"
            style={{
              backgroundColor: mode === "plan" ? "var(--surface)" : "transparent",
              color: mode === "plan" ? "var(--text)" : "var(--text-muted)",
              boxShadow: mode === "plan" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            <span className="hidden sm:inline">{"📊 "}</span>Plan a Meeting
          </button>
          <button
            onClick={() => setMode("live")}
            className="flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all"
            style={{
              backgroundColor: mode === "live" ? "var(--surface)" : "transparent",
              color: mode === "live" ? "var(--text)" : "var(--text-muted)",
              boxShadow: mode === "live" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            <span className="hidden sm:inline">{"⏱ "}</span>Live Timer
          </button>
        </div>

        {/* ─── Plan Mode ─── */}
        {mode === "plan" && (
          <div className="space-y-8">
            {/* Team builder */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <TeamBuilder attendees={attendees} onChange={setAttendees} />
            </div>

            {/* Duration */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>
                Meeting Duration
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {DURATION_PRESETS.map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDuration(d); setUseCustom(false); }}
                    className="px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
                    style={{
                      borderColor: !useCustom && duration === d ? "var(--color-accent)" : "var(--border)",
                      backgroundColor: !useCustom && duration === d ? "var(--color-accent)" : "var(--surface)",
                      color: !useCustom && duration === d ? "#fff" : "var(--text)",
                    }}
                  >
                    {d >= 60 ? `${d / 60} hr${d > 60 ? "s" : ""}` : `${d} min`}
                  </button>
                ))}
                <button
                  onClick={() => setUseCustom(true)}
                  className="px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
                  style={{
                    borderColor: useCustom ? "var(--color-accent)" : "var(--border)",
                    backgroundColor: useCustom ? "var(--color-accent)" : "var(--surface)",
                    color: useCustom ? "#fff" : "var(--text)",
                  }}
                >
                  Custom
                </button>
              </div>
              {useCustom && (
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={customH}
                    onChange={(e) => setCustomH(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-16 px-2 py-1.5 rounded-lg border text-center outline-none"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                  />
                  <span style={{ color: "var(--text-muted)" }}>hours</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={59}
                    value={customM}
                    onChange={(e) => setCustomM(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="w-16 px-2 py-1.5 rounded-lg border text-center outline-none"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                  />
                  <span style={{ color: "var(--text-muted)" }}>minutes</span>
                </div>
              )}
            </div>

            {/* Frequency */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>
                How often does this meeting happen?
              </h3>
              <div className="flex flex-wrap gap-2">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFrequency(f.key)}
                    className="px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
                    style={{
                      borderColor: frequency === f.key ? "var(--color-accent)" : "var(--border)",
                      backgroundColor: frequency === f.key ? "var(--color-accent)" : "var(--surface)",
                      color: frequency === f.key ? "#fff" : "var(--text)",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <ResultsPanel attendees={attendees} duration={activeDuration} frequency={frequency} />

            {/* Comparison toggle */}
            <div>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--color-accent)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {showComparison ? <polyline points="6 15 12 9 18 15" /> : <polyline points="6 9 12 15 18 9" />}
                </svg>
                {showComparison ? "Hide" : "Compare scenarios \u2014 \u201cWhat if?\u201d"}
              </button>
              {showComparison && (
                <div className="mt-4">
                  <ComparisonMode original={attendees} duration={activeDuration} frequency={frequency} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Live Timer Mode ─── */}
        {mode === "live" && (
          <LiveTimer initialAttendees={attendees.map((a) => ({ ...a }))} />
        )}

        {/* ─── Pro Tips ─── */}
        <div className="mt-16 mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
            Pro Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: "Default to 25 or 50 minutes, not 30 or 60.", text: "This gives people a 5-minute buffer between meetings and naturally shortens discussions. Google does this company-wide. A 10-minute reduction across all meetings can save 15\u201320% of meeting costs." },
              { title: "Apply the \u201ctwo-pizza rule.\u201d", text: "If you can\u2019t feed the meeting with two pizzas, there are too many people. Every additional attendee increases cost AND decreases productivity \u2014 more opinions, slower decisions." },
              { title: "Ask: Could this be an email?", text: "Before scheduling, write out the meeting\u2019s goal in one sentence. If the goal is just sharing information (not making a decision or brainstorming), it should probably be an async update." },
              { title: "Every meeting needs a decision-maker.", text: "If nobody in the room can actually make a decision on the topic, the meeting will end with \u201clet\u2019s circle back\u201d \u2014 the most expensive two words in business." },
              { title: "Track your meeting load for one week.", text: "Most people dramatically underestimate how much time they spend in meetings. Track it for a week, multiply by your rate, and you\u2019ll never schedule an unnecessary meeting again." },
            ].map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
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

        {/* ─── SEO Content ─── */}
        {!articleMode && (
          <div className="mb-12">
            <div
              className="rounded-2xl border p-6 md:p-8"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>
                The Hidden Cost of Meetings
              </h2>
              <div className="prose max-w-none space-y-4 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                <p>
                  Meetings are one of the largest hidden expenses in every organization. While rent, salaries, and software subscriptions are tracked to the penny, the cost of pulling five, ten, or twenty people into a room for an hour rarely gets a second thought. But it should.
                </p>
                <p>
                  The average employee spends 31 hours per month in meetings they consider unproductive. For a company with just 50 employees averaging $60/hour in total compensation, that translates to over <strong>$5.5 million per year</strong> in meeting time alone. Companies with 5,000+ employees routinely waste over $100 million annually.
                </p>
                <p>
                  And the true cost is even higher than the hourly rate suggests. A 30-minute meeting doesn&apos;t just cost 30 minutes of productivity. Research shows that the context-switching cost adds 15&ndash;23 minutes of ramp-up time before AND after each meeting. That &quot;quick 30-minute sync&quot; actually consumes 60&ndash;90 minutes of deep work time.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">The Pandemic Made It Worse</h3>
                <p>
                  Remote work dramatically increased meeting frequency. Studies show that the average number of meetings per employee increased by 252% after 2020, while the average meeting duration dropped only slightly. The net effect: more total time in meetings than ever before, with many employees spending 50% or more of their workweek on video calls.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">How to Calculate Your Meeting Costs</h3>
                <p>
                  The formula is straightforward: take each attendee&apos;s hourly rate (salary &divide; 2,080 hours/year), multiply by the number of attendees and the meeting duration, then multiply by the meeting frequency to see annual impact. Our calculator handles this automatically, but understanding the math helps you make the case to leadership.
                </p>
                <p>
                  For a more accurate picture, multiply hourly rates by 1.3&ndash;1.5&times; to account for benefits, taxes, equipment, and office space. A $75/hour employee actually costs the company $97&ndash;$112/hour in fully-loaded compensation.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">How to Reduce Meeting Costs</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Audit your recurring meetings quarterly.</strong> Many recurring meetings outlive their usefulness. Cancel anything that doesn&apos;t have a clear, ongoing purpose.</li>
                  <li><strong>Implement &quot;meeting-free&quot; blocks or days.</strong> Companies like Shopify and Asana have instituted no-meeting days with dramatic productivity gains.</li>
                  <li><strong>Use async tools for status updates.</strong> Daily standups can often be replaced by a Slack bot or shared document that takes 2 minutes instead of 15.</li>
                  <li><strong>Require agendas for every meeting.</strong> No agenda, no meeting. This simple rule eliminates poorly-planned meetings and keeps focused ones on track.</li>
                  <li><strong>Set default meeting lengths to 25/50 minutes.</strong> The extra 5&ndash;10 minutes of buffer prevents back-to-back meeting fatigue and naturally tightens discussions.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ─── FAQ ─── */}
        <div className="mb-12">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "How do you calculate the cost of a meeting?",
                a: "Multiply each attendee\u2019s hourly rate by the meeting duration in hours, then sum across all attendees. For example, 5 people at an average of $60/hr in a 1-hour meeting costs $300. For recurring meetings, multiply by frequency (e.g., weekly = 52\u00d7/year) to see annual impact.",
              },
              {
                q: "What\u2019s the average cost of a one-hour meeting?",
                a: "It depends on who\u2019s in the room. A meeting of 5 mid-level employees costs around $250\u2013$375. Add a VP or C-suite executive and it jumps to $400\u2013$600+. The key insight is that seniority matters more than headcount.",
              },
              {
                q: "How much time does the average employee spend in meetings?",
                a: "Studies show the average employee spends 31 hours per month in meetings. For managers and executives, it\u2019s often 50\u201380% of their work week. Remote workers attend 252% more meetings than they did before 2020.",
              },
              {
                q: "What is the two-pizza rule for meetings?",
                a: "Popularized by Amazon\u2019s Jeff Bezos, the two-pizza rule says that if you can\u2019t feed a meeting\u2019s attendees with two pizzas (~6\u20138 people), the meeting is too large to be productive. Smaller meetings lead to faster decisions.",
              },
              {
                q: "Should I include benefits and overhead in the hourly rate?",
                a: "For the most accurate picture, yes. Benefits, payroll taxes, equipment, and office space typically add 30\u201350% on top of base salary. A $100K/year employee costs the company $130K\u2013$150K fully loaded, or roughly $63\u2013$72/hour.",
              },
              {
                q: "How do I convince my boss we have too many meetings?",
                a: "Use this calculator to put a dollar amount on your team\u2019s recurring meetings. Share the annual projection. Propose a specific alternative (async updates, shorter meetings, fewer attendees). Data-driven proposals with clear savings are hard to argue against.",
              },
              {
                q: "What are the best alternatives to meetings?",
                a: "Async video messages (Loom), shared documents with comments, Slack threads for quick decisions, email for informational updates, and collaborative tools like Notion or Linear for project tracking. Reserve synchronous meetings for brainstorming and decisions that need real-time debate.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border overflow-hidden"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium list-none" style={{ color: "var(--text)" }}>
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 ml-4 transition-transform group-open:rotate-180" style={{ color: "var(--text-muted)" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ─── Related Tools ─── */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Salary to Hourly Calculator", desc: "Convert annual salary to hourly rate", href: "/finance-tools/salary-calculator" },
              { name: "ROI Calculator", desc: "Calculate return on investment", href: "/business-tools/roi-calculator" },
              { name: "Hourly Rate Calculator", desc: "Find your true hourly rate", href: "/business-tools/hourly-rate-calculator" },
              { name: "Time Zone Converter", desc: "Convert times across time zones", href: "/utility-tools/time-zone-converter" },
              { name: "Project Cost Estimator", desc: "Estimate project costs by task", href: "/business-tools/project-cost-estimator" },
              { name: "Break Even Calculator", desc: "Calculate your break-even point", href: "/business-tools/break-even-calculator" },
            ].map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                className="flex items-start gap-3 p-4 rounded-xl border transition-shadow hover:shadow-md"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }}>
                  <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-medium text-sm" style={{ color: "var(--text)" }}>{tool.name}</div>
                  <div style={{ color: "var(--text-muted)" }}>{tool.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t pt-8 pb-4 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <p>Free Online Tools &mdash; Free calculators and tools for everyone.</p>
          <p className="mt-1">No signup required. No ads. No tracking.</p>
        </footer>
      </div>
    </div>
  );
}
