"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  futureSalary,
  cumulativeEarnings,
  lifetimeLoss,
  annualGap,
  cumulativeLossAtYear,
  calcTotalImpact,
  multiNegotiationEarnings,
  getOpportunityCosts,
  getMilestoneCallout,
  formatCurrency,
  formatCompact,
  type TotalImpact,
} from "../lib/salary-math";
import {
  type SalaryShareCardData,
  generateSalaryShareCard,
  shareCardToBlob,
  getShareText,
  getTwitterUrl,
  getLinkedInUrl,
} from "../lib/share-card";

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
function AnimatedNumber({ value, prefix = "$", decimals = 0, className, style }: { value: number; prefix?: string; decimals?: number; className?: string; style?: React.CSSProperties }) {
  const [displayed, setDisplayed] = useState(value);
  const animRef = useRef<number | null>(null);
  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const start = displayed;
    const diff = value - start;
    if (Math.abs(diff) < 1) { setDisplayed(value); return; }
    const duration = 500;
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
  return <span className={className} style={style}>{prefix}{Math.round(displayed).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
}

/* ─── Share Modal ─── */
function ShareModal({ data, onClose }: { data: SalaryShareCardData; onClose: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const text = getShareText(data.raisePercent, data.totalLoss, data.years, data.perDay);

  const copyText = async () => { await navigator.clipboard.writeText(text); setCopied("text"); setTimeout(() => setCopied(null), 2000); };
  const copyLink = async () => { await navigator.clipboard.writeText("https://everyfreetool.com/business-tools/salary-negotiation-calculator"); setCopied("link"); setTimeout(() => setCopied(null), 2000); };
  const downloadImage = async () => {
    setGenerating(true);
    try {
      const canvas = generateSalaryShareCard(data);
      const blob = await shareCardToBlob(canvas);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "salary-negotiation-impact.png"; a.click(); URL.revokeObjectURL(url);
    } finally { setGenerating(false); }
  };
  const shareNative = async () => {
    if (!navigator.share) return;
    try {
      const canvas = generateSalaryShareCard(data);
      const blob = await shareCardToBlob(canvas);
      const file = new File([blob], "salary-negotiation-impact.png", { type: "image/png" });
      await navigator.share({ text, files: [file] });
    } catch { /* cancelled */ }
  };
  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="w-full max-w-md rounded-2xl border p-6 space-y-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>Share Your Results</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:opacity-70 text-xl" style={{ color: "var(--text-muted)" }} aria-label="Close">&times;</button>
        </div>
        <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: "var(--bg)", color: "var(--text-muted)" }}>{text}</div>
        <div className="grid grid-cols-1 gap-2">
          <button onClick={downloadImage} disabled={generating} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-colors" style={{ backgroundColor: "#DC2626" }}>
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

/* ─── SVG Area Chart ─── */
function GapChart({ currentSalary, negotiatedSalary, raiseRate, years }: { currentSalary: number; negotiatedSalary: number; raiseRate: number; years: number }) {
  const W = 800, H = 300, padL = 60, padR = 20, padT = 20, padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const data = useMemo(() => {
    const points: { year: number; current: number; negotiated: number; gap: number; cumLoss: number }[] = [];
    for (let y = 0; y <= years; y++) {
      points.push({
        year: y,
        current: futureSalary(currentSalary, raiseRate, y),
        negotiated: futureSalary(negotiatedSalary, raiseRate, y),
        gap: annualGap(currentSalary, negotiatedSalary, raiseRate, y),
        cumLoss: cumulativeLossAtYear(currentSalary, negotiatedSalary, raiseRate, y),
      });
    }
    return points;
  }, [currentSalary, negotiatedSalary, raiseRate, years]);

  const maxSalary = Math.max(...data.map(d => d.negotiated)) * 1.05;
  const minSalary = Math.min(...data.map(d => d.current)) * 0.95;
  const range = maxSalary - minSalary;

  const toX = (y: number) => padL + (y / years) * chartW;
  const toY = (v: number) => padT + chartH - ((v - minSalary) / range) * chartH;

  const negotiatedPath = data.map((d, i) => `${i === 0 ? "M" : "L"}${toX(d.year)},${toY(d.negotiated)}`).join(" ");
  const currentPath = data.map((d, i) => `${i === 0 ? "M" : "L"}${toX(d.year)},${toY(d.current)}`).join(" ");
  const fillPath = negotiatedPath + " " + [...data].reverse().map((d, i) => `${i === 0 ? "L" : "L"}${toX(d.year)},${toY(d.current)}`).join(" ") + " Z";

  // Y-axis labels
  const yTicks = 4;
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => minSalary + (range / yTicks) * i);

  // X-axis labels — show key milestones
  const xTicks = years <= 10 ? Array.from({ length: years + 1 }, (_, i) => i) : [0, 5, 10, 15, 20, 25, 30, 35, 40].filter(y => y <= years);

  // Milestone callouts
  const milestones = [5, 10, 20, 30].filter(y => y <= years);

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 500 }}>
        {/* Fill area between curves */}
        <path d={fillPath} fill="#DC2626" fillOpacity="0.15" />

        {/* Grid lines */}
        {yLabels.map((v, i) => (
          <g key={i}>
            <line x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)} stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4" />
            <text x={padL - 8} y={toY(v) + 4} textAnchor="end" fill="var(--text-muted)" fontSize="11" fontFamily="system-ui">{formatCompact(v)}</text>
          </g>
        ))}

        {/* X-axis labels */}
        {xTicks.map(y => (
          <text key={y} x={toX(y)} y={H - 8} textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="system-ui">Yr {y}</text>
        ))}

        {/* Negotiated line */}
        <path d={negotiatedPath} fill="none" stroke="#16A34A" strokeWidth="2.5" />

        {/* Current line */}
        <path d={currentPath} fill="none" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="6,3" />

        {/* Milestone dots & labels */}
        {milestones.map(y => {
          const d = data[y];
          if (!d) return null;
          return (
            <g key={y}>
              <circle cx={toX(y)} cy={toY(d.negotiated)} r="4" fill="#16A34A" />
              <circle cx={toX(y)} cy={toY(d.current)} r="4" fill="#DC2626" />
              {/* Gap line between the two */}
              <line x1={toX(y)} y1={toY(d.negotiated)} x2={toX(y)} y2={toY(d.current)} stroke="#DC2626" strokeWidth="1" strokeDasharray="3,2" />
              <text x={toX(y) + 6} y={(toY(d.negotiated) + toY(d.current)) / 2 + 4} fill="#DC2626" fontSize="10" fontWeight="600" fontFamily="system-ui">
                {formatCompact(d.gap)}/yr
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <line x1={padL + 10} y1={padT + 5} x2={padL + 30} y2={padT + 5} stroke="#16A34A" strokeWidth="2.5" />
        <text x={padL + 34} y={padT + 9} fill="var(--text-muted)" fontSize="11" fontFamily="system-ui">With negotiation</text>
        <line x1={padL + 160} y1={padT + 5} x2={padL + 180} y2={padT + 5} stroke="#DC2626" strokeWidth="2.5" strokeDasharray="6,3" />
        <text x={padL + 184} y={padT + 9} fill="var(--text-muted)" fontSize="11" fontFamily="system-ui">Without (current)</text>
      </svg>
    </div>
  );
}

/* ─── Multi-Scenario Chart ─── */
function ScenarioChart({ currentSalary, negotiatedSalary, raiseRate, years }: { currentSalary: number; negotiatedSalary: number; raiseRate: number; years: number }) {
  const W = 800, H = 280, padL = 60, padR = 20, padT = 20, padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const data = useMemo(() => {
    const never = Array.from({ length: years }, (_, y) => futureSalary(currentSalary, raiseRate, y));
    const once = Array.from({ length: years }, (_, y) => futureSalary(negotiatedSalary, raiseRate, y));
    const multi = multiNegotiationEarnings(negotiatedSalary, raiseRate, years, 5, 0.05);
    return { never, once, multi };
  }, [currentSalary, negotiatedSalary, raiseRate, years]);

  const allVals = [...data.never, ...data.once, ...data.multi];
  const maxVal = Math.max(...allVals) * 1.05;
  const minVal = Math.min(...allVals) * 0.95;
  const range = maxVal - minVal;

  const toX = (y: number) => padL + (y / (years - 1)) * chartW;
  const toY = (v: number) => padT + chartH - ((v - minVal) / range) * chartH;

  const makePath = (arr: number[]) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");

  const xTicks = years <= 10 ? Array.from({ length: years }, (_, i) => i) : [0, 5, 10, 15, 20, 25, 30, 35, 40].filter(y => y < years);
  const yTicks = 4;
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => minVal + (range / yTicks) * i);

  // Cumulative earnings for each scenario
  const neverTotal = data.never.reduce((s, v) => s + v, 0);
  const onceTotal = data.once.reduce((s, v) => s + v, 0);
  const multiTotal = data.multi.reduce((s, v) => s + v, 0);

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 500 }}>
          {yLabels.map((v, i) => (
            <g key={i}>
              <line x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)} stroke="var(--border)" strokeWidth="1" strokeDasharray="4,4" />
              <text x={padL - 8} y={toY(v) + 4} textAnchor="end" fill="var(--text-muted)" fontSize="11" fontFamily="system-ui">{formatCompact(v)}</text>
            </g>
          ))}
          {xTicks.map(y => (
            <text key={y} x={toX(y)} y={H - 8} textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="system-ui">Yr {y}</text>
          ))}
          <path d={makePath(data.never)} fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="6,3" />
          <path d={makePath(data.once)} fill="none" stroke="#16A34A" strokeWidth="2.5" />
          <path d={makePath(data.multi)} fill="none" stroke="#1E40AF" strokeWidth="2.5" />
          {/* Legend */}
          <line x1={padL + 10} y1={padT + 5} x2={padL + 30} y2={padT + 5} stroke="#DC2626" strokeWidth="2" strokeDasharray="6,3" />
          <text x={padL + 34} y={padT + 9} fill="var(--text-muted)" fontSize="10" fontFamily="system-ui">Never negotiate</text>
          <line x1={padL + 160} y1={padT + 5} x2={padL + 180} y2={padT + 5} stroke="#16A34A" strokeWidth="2.5" />
          <text x={padL + 184} y={padT + 9} fill="var(--text-muted)" fontSize="10" fontFamily="system-ui">Negotiate once</text>
          <line x1={padL + 300} y1={padT + 5} x2={padL + 320} y2={padT + 5} stroke="#1E40AF" strokeWidth="2.5" />
          <text x={padL + 324} y={padT + 9} fill="var(--text-muted)" fontSize="10" fontFamily="system-ui">Negotiate every 5 years</text>
        </svg>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="text-xs font-medium mb-1" style={{ color: "#DC2626" }}>Never Negotiate</div>
          <div className="text-lg font-bold" style={{ color: "var(--text)" }}>{formatCurrency(neverTotal)}</div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>total earned</div>
        </div>
        <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="text-xs font-medium mb-1" style={{ color: "#16A34A" }}>Negotiate Once</div>
          <div className="text-lg font-bold" style={{ color: "var(--text)" }}>{formatCurrency(onceTotal)}</div>
          <div className="text-xs" style={{ color: "#16A34A" }}>+{formatCurrency(onceTotal - neverTotal)}</div>
        </div>
        <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="text-xs font-medium mb-1" style={{ color: "#1E40AF" }}>Negotiate Every 5 Yrs</div>
          <div className="text-lg font-bold" style={{ color: "var(--text)" }}>{formatCurrency(multiTotal)}</div>
          <div className="text-xs" style={{ color: "#1E40AF" }}>+{formatCurrency(multiTotal - neverTotal)}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Raise Pill Button ─── */
const RAISE_PILLS = [
  { value: 5, label: "5%", desc: "Modest ask" },
  { value: 7, label: "7%", desc: "Typical negotiation" },
  { value: 10, label: "10%", desc: "Strong counter-offer" },
  { value: 15, label: "15%", desc: "New job / promotion" },
];

const YEAR_PILLS = [
  { value: 5, label: "5 yr" },
  { value: 10, label: "10 yr" },
  { value: 20, label: "20 yr" },
  { value: 30, label: "30 yr" },
  { value: 40, label: "Full Career" },
];

/* ─── Main Component ─── */
interface Props {
  title: string;
  subtitle: string;
  articleMode?: boolean;
  defaultRaise?: number;
  emphasizeLoss?: boolean;
  showScenarios?: boolean;
}

export default function SalaryNegotiationCalculator({
  title,
  subtitle,
  articleMode = false,
  defaultRaise = 7,
  emphasizeLoss = true,
  showScenarios = true,
}: Props) {
  // Inputs
  const [salary, setSalary] = useState(75000);
  const [salaryInput, setSalaryInput] = useState("75,000");
  const [raisePercent, setRaisePercent] = useState(defaultRaise);
  const [raiseRate, setRaiseRate] = useState(3.5);
  const [years, setYears] = useState(20);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bonusRate, setBonusRate] = useState(10);
  const [matchRate, setMatchRate] = useState(4);
  const [investReturn, setInvestReturn] = useState(8);
  const [showShare, setShowShare] = useState(false);

  // Derived
  const negotiatedSalary = salary * (1 + raisePercent / 100);
  const raiseAmount = negotiatedSalary - salary;
  const rateDecimal = raiseRate / 100;

  const totalLoss = useMemo(() => lifetimeLoss(salary, negotiatedSalary, rateDecimal, years), [salary, negotiatedSalary, rateDecimal, years]);
  const perYear = totalLoss / years;
  const perDay = totalLoss / (years * 365);

  const currentFutureSalary = useMemo(() => futureSalary(salary, rateDecimal, years), [salary, rateDecimal, years]);
  const negotiatedFutureSalary = useMemo(() => futureSalary(negotiatedSalary, rateDecimal, years), [negotiatedSalary, rateDecimal, years]);
  const currentCumulative = useMemo(() => cumulativeEarnings(salary, rateDecimal, years), [salary, rateDecimal, years]);
  const negotiatedCumulative = useMemo(() => cumulativeEarnings(negotiatedSalary, rateDecimal, years), [negotiatedSalary, rateDecimal, years]);

  const impact = useMemo(() => calcTotalImpact(salary, negotiatedSalary, rateDecimal, years, bonusRate / 100, matchRate / 100, investReturn / 100), [salary, negotiatedSalary, rateDecimal, years, bonusRate, matchRate, investReturn]);

  const opportunityCosts = useMemo(() => getOpportunityCosts(totalLoss), [totalLoss]);

  // Milestones for the chart
  const milestones = useMemo(() => {
    const ms = [5, 10, 20, 30].filter(y => y <= years);
    return ms.map(y => ({
      year: y,
      gap: annualGap(salary, negotiatedSalary, rateDecimal, y),
      cumLoss: cumulativeLossAtYear(salary, negotiatedSalary, rateDecimal, y),
      callout: getMilestoneCallout(cumulativeLossAtYear(salary, negotiatedSalary, rateDecimal, y), y),
    }));
  }, [salary, negotiatedSalary, rateDecimal, years]);

  // Salary input formatting
  const handleSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = parseInt(raw) || 0;
    setSalary(num);
    setSalaryInput(num.toLocaleString("en-US"));
  }, []);

  const handleSalaryBlur = useCallback(() => {
    setSalaryInput(salary.toLocaleString("en-US"));
  }, [salary]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)", ["--color-accent" as string]: "#DC2626" }}>
      <div className="max-w-[1100px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <nav className="flex items-center gap-1 text-xs mb-3" style={{ color: "var(--text-muted)" }}>
              <Link href="/" className="hover:underline" style={{ color: "var(--color-accent)" }}>Home</Link>
              <span>/</span>
              <span>Business Tools</span>
              <span>/</span>
              <span>Salary Negotiation Calculator</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>{title}</h1>
            <p className="text-base md:text-lg max-w-2xl" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <span className="text-xs px-2 py-1 rounded-full border hidden sm:flex items-center gap-1" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              100% client-side
            </span>
            <DarkModeToggle />
          </div>
        </div>

        {/* Hook stat */}
        <div className="rounded-xl border p-4 mb-8 flex items-start sm:items-center gap-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <span className="text-2xl shrink-0">💡</span>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--text)" }}>A $5,000 gap in starting salary can cost $600,000&ndash;$900,000 over a career.</strong>{" "}
            Carnegie Mellon economist Linda Babcock estimates the lifetime cost of not negotiating at $1 million to $1.5 million.
          </p>
        </div>

        {/* Main layout: Inputs + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* ─── INPUT PANEL ─── */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border p-5 space-y-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              {/* Salary */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>Current Annual Salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold" style={{ color: "var(--text-muted)" }}>$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={salaryInput}
                    onChange={handleSalaryChange}
                    onBlur={handleSalaryBlur}
                    className="w-full pl-8 pr-4 py-3 text-xl font-bold rounded-xl border focus:outline-none focus:ring-2 transition-colors"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)", "--tw-ring-color": "#DC2626" } as React.CSSProperties}
                    aria-label="Current annual salary"
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Before taxes, base salary</p>
              </div>

              {/* Raise % */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>Raise You Could Negotiate</label>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.5"
                    value={raisePercent}
                    onChange={e => setRaisePercent(parseFloat(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#16A34A" }}
                    aria-label="Raise percentage"
                  />
                  <div className="w-16 text-center text-xl font-bold" style={{ color: "#16A34A" }}>{raisePercent}%</div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {RAISE_PILLS.map(p => (
                    <button
                      key={p.value}
                      onClick={() => setRaisePercent(p.value)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                      style={{
                        backgroundColor: raisePercent === p.value ? "#16A34A" : "var(--bg)",
                        color: raisePercent === p.value ? "#fff" : "var(--text)",
                        borderColor: raisePercent === p.value ? "#16A34A" : "var(--border)",
                      }}
                    >
                      {p.label} <span className="hidden sm:inline opacity-70">{p.desc}</span>
                    </button>
                  ))}
                </div>
                <p className="text-sm font-medium" style={{ color: "#16A34A" }}>
                  That&apos;s {formatCurrency(raiseAmount)}/year more
                </p>
              </div>

              {/* Annual Raise Rate */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>Average Annual Raise Rate</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.1"
                    value={raiseRate}
                    onChange={e => setRaiseRate(parseFloat(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "var(--text-muted)" }}
                    aria-label="Annual raise rate"
                  />
                  <div className="w-14 text-center text-lg font-bold" style={{ color: "var(--text)" }}>{raiseRate}%</div>
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>US average is 3.5% for 2026. Applied to both scenarios.</p>
              </div>

              {/* Years */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>Time Horizon</label>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={years}
                    onChange={e => setYears(parseInt(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "var(--text-muted)" }}
                    aria-label="Time horizon in years"
                  />
                  <div className="w-16 text-center text-lg font-bold" style={{ color: "var(--text)" }}>{years} yr{years !== 1 ? "s" : ""}</div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {YEAR_PILLS.map(p => (
                    <button
                      key={p.value}
                      onClick={() => setYears(p.value)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                      style={{
                        backgroundColor: years === p.value ? "var(--text)" : "var(--bg)",
                        color: years === p.value ? "var(--bg)" : "var(--text)",
                        borderColor: years === p.value ? "var(--text)" : "var(--border)",
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: showAdvanced ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}><path d="M9 18l6-6-6-6" /></svg>
                  Customize Your Scenario
                </button>
                {showAdvanced && (
                  <div className="mt-3 space-y-3 p-4 rounded-xl" style={{ backgroundColor: "var(--bg)" }}>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Annual Bonus (% of salary)</label>
                      <div className="flex items-center gap-2">
                        <input type="range" min="0" max="30" step="1" value={bonusRate} onChange={e => setBonusRate(parseInt(e.target.value))} className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: "var(--text-muted)" }} />
                        <span className="w-10 text-right text-sm font-bold" style={{ color: "var(--text)" }}>{bonusRate}%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Employer 401(k) Match (%)</label>
                      <div className="flex items-center gap-2">
                        <input type="range" min="0" max="10" step="0.5" value={matchRate} onChange={e => setMatchRate(parseFloat(e.target.value))} className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: "var(--text-muted)" }} />
                        <span className="w-10 text-right text-sm font-bold" style={{ color: "var(--text)" }}>{matchRate}%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Investment Return Rate (%)</label>
                      <div className="flex items-center gap-2">
                        <input type="range" min="4" max="12" step="0.5" value={investReturn} onChange={e => setInvestReturn(parseFloat(e.target.value))} className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: "var(--text-muted)" }} />
                        <span className="w-10 text-right text-sm font-bold" style={{ color: "var(--text)" }}>{investReturn}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── RESULTS PANEL ─── */}
          <div className="lg:col-span-3 space-y-5" role="region" aria-live="polite">
            {/* Screen reader summary */}
            <div className="sr-only">
              By not negotiating, you leave {formatCurrency(totalLoss)} on the table over {years} years.
            </div>

            {/* THE BIG NUMBER */}
            <div className="rounded-2xl border p-6 text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>By not negotiating, you leave</div>
              <AnimatedNumber value={totalLoss} className="text-5xl md:text-6xl font-extrabold block my-3" style={{ color: "#DC2626" }} />
              <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>on the table over {years} years</div>
              <div className="mt-3 text-sm font-semibold" style={{ color: "#DC2626" }}>
                That&apos;s {formatCurrency(perYear)}/year you&apos;ll never get back
              </div>
            </div>

            {/* Side-by-side comparison cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", borderLeftWidth: 4, borderLeftColor: "#DC2626" }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#DC2626" }}>Without Negotiating</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>Starting salary</span><span className="font-semibold" style={{ color: "var(--text)" }}>{formatCurrency(salary)}</span></div>
                  <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>Salary in {years} years</span><span className="font-semibold" style={{ color: "var(--text)" }}>{formatCurrency(currentFutureSalary)}</span></div>
                  <div className="flex justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}><span style={{ color: "var(--text-muted)" }}>Total earned</span><span className="font-bold" style={{ color: "var(--text)" }}>{formatCurrency(currentCumulative)}</span></div>
                </div>
              </div>
              <div className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", borderLeftWidth: 4, borderLeftColor: "#16A34A" }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#16A34A" }}>With Negotiating</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>Starting salary</span><span className="font-semibold" style={{ color: "var(--text)" }}>{formatCurrency(negotiatedSalary)} <span style={{ color: "#16A34A" }}>(+{formatCurrency(raiseAmount)})</span></span></div>
                  <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>Salary in {years} years</span><span className="font-semibold" style={{ color: "var(--text)" }}>{formatCurrency(negotiatedFutureSalary)}</span></div>
                  <div className="flex justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}><span style={{ color: "var(--text-muted)" }}>Total earned</span><span className="font-bold" style={{ color: "var(--text)" }}>{formatCurrency(negotiatedCumulative)}</span></div>
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div className="rounded-xl p-4" style={{ backgroundColor: "#DC26261a" }}>
              <p className="text-sm text-center" style={{ color: "var(--text)" }}>
                <strong>The initial gap is only {formatCurrency(raiseAmount)}/year</strong>, but after {years} years of compounding raises it grows to{" "}
                <strong style={{ color: "#DC2626" }}>{formatCurrency(annualGap(salary, negotiatedSalary, rateDecimal, years))}/year</strong> and the cumulative loss is{" "}
                <strong style={{ color: "#DC2626" }}>{formatCurrency(totalLoss)}</strong>
              </p>
            </div>

            {/* Per-day callout */}
            <div className="rounded-xl border p-4 text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text)" }}>
                That&apos;s <strong style={{ color: "#DC2626" }}>${perDay.toFixed(2)} per day</strong> you&apos;re losing. Every single day. Weekends included.
              </span>
            </div>
          </div>
        </div>

        {/* ─── DIVERGING CHART ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>How the Gap Grows</h2>
          <div className="rounded-2xl border p-4 md:p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <GapChart currentSalary={salary} negotiatedSalary={negotiatedSalary} raiseRate={rateDecimal} years={years} />
            {/* Milestone callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              {milestones.map(m => (
                <div key={m.year} className="p-3 rounded-xl text-center" style={{ backgroundColor: "var(--bg)" }}>
                  <div className="text-xs font-semibold uppercase mb-1" style={{ color: "#DC2626" }}>Year {m.year}</div>
                  <div className="text-lg font-bold mb-0.5" style={{ color: "var(--text)" }}>{formatCurrency(m.cumLoss)}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{m.callout}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TOTAL IMPACT ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>Total Impact: Beyond Base Salary</h2>
          <div className="rounded-2xl border p-4 md:p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              The raise doesn&apos;t just affect base salary. It compounds across everything tied to your pay: bonuses, 401(k) match, and investment potential.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)" }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--text)" }}>Component</th>
                    <th className="text-right py-2 px-4 font-semibold" style={{ color: "#DC2626" }}>Without</th>
                    <th className="text-right py-2 px-4 font-semibold" style={{ color: "#16A34A" }}>With</th>
                    <th className="text-right py-2 pl-4 font-semibold" style={{ color: "var(--text)" }}>Lost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-4" style={{ color: "var(--text-muted)" }}>Base Salary ({years}yr)</td>
                    <td className="py-2 px-4 text-right font-medium" style={{ color: "var(--text)" }}>{formatCurrency(currentCumulative)}</td>
                    <td className="py-2 px-4 text-right font-medium" style={{ color: "var(--text)" }}>{formatCurrency(negotiatedCumulative)}</td>
                    <td className="py-2 pl-4 text-right font-bold" style={{ color: "#DC2626" }}>{formatCurrency(impact.baseLoss)}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-4" style={{ color: "var(--text-muted)" }}>Annual Bonuses ({bonusRate}%)</td>
                    <td className="py-2 px-4 text-right font-medium" style={{ color: "var(--text)" }}>{formatCurrency(currentCumulative * bonusRate / 100)}</td>
                    <td className="py-2 px-4 text-right font-medium" style={{ color: "var(--text)" }}>{formatCurrency(negotiatedCumulative * bonusRate / 100)}</td>
                    <td className="py-2 pl-4 text-right font-bold" style={{ color: "#DC2626" }}>{formatCurrency(impact.bonusLoss)}</td>
                  </tr>
                  <tr style={{ borderBottom: "2px solid var(--border)" }}>
                    <td className="py-2 pr-4" style={{ color: "var(--text-muted)" }}>401(k) Match ({matchRate}%)</td>
                    <td className="py-2 px-4 text-right font-medium" style={{ color: "var(--text)" }}>{formatCurrency(currentCumulative * matchRate / 100)}</td>
                    <td className="py-2 px-4 text-right font-medium" style={{ color: "var(--text)" }}>{formatCurrency(negotiatedCumulative * matchRate / 100)}</td>
                    <td className="py-2 pl-4 text-right font-bold" style={{ color: "#DC2626" }}>{formatCurrency(impact.matchLoss)}</td>
                  </tr>
                  <tr className="font-bold" style={{ borderBottom: "2px solid var(--border)" }}>
                    <td className="py-3 pr-4" style={{ color: "var(--text)" }}>Total Compensation Loss</td>
                    <td className="py-3 px-4" />
                    <td className="py-3 px-4" />
                    <td className="py-3 pl-4 text-right text-lg" style={{ color: "#DC2626" }}>{formatCurrency(impact.totalCompLoss)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4" style={{ color: "var(--text)" }}>
                      <span className="font-bold">If invested at {investReturn}% returns</span>
                    </td>
                    <td className="py-3 px-4" />
                    <td className="py-3 px-4" />
                    <td className="py-3 pl-4 text-right text-lg font-extrabold" style={{ color: "#DC2626" }}>{formatCurrency(impact.investedValue)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── WHAT ELSE COULD THIS BUY ─── */}
        {opportunityCosts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>What Else Could {formatCurrency(totalLoss)} Buy?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {opportunityCosts.map((item, i) => (
                <div key={i} className="rounded-xl border p-4 flex items-start gap-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <span className="text-sm" style={{ color: "var(--text)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── MULTI-NEGOTIATION SCENARIOS ─── */}
        {showScenarios && years >= 10 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>What If You Negotiate Multiple Times?</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Most people don&apos;t just negotiate once. Job hops and promotions compound the effect dramatically.
            </p>
            <div className="rounded-2xl border p-4 md:p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <ScenarioChart currentSalary={salary} negotiatedSalary={negotiatedSalary} raiseRate={rateDecimal} years={years} />
            </div>
            <div className="mt-3 rounded-xl p-4" style={{ backgroundColor: "#1E40AF1a" }}>
              <p className="text-sm text-center" style={{ color: "var(--text)" }}>
                <strong>Employees who negotiate throughout their career earn an estimated $1&ndash;$1.5 million more</strong> than those who never negotiate.{" "}
                <span style={{ color: "var(--text-muted)" }}>(Carnegie Mellon University)</span>
              </p>
            </div>
          </section>
        )}

        {/* ─── SHARE BUTTON ─── */}
        <div className="text-center mb-10">
          <button
            onClick={() => setShowShare(true)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-base font-bold text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: "#DC2626" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
            Share Your Results
          </button>
        </div>
        {showShare && (
          <ShareModal
            data={{ raisePercent, totalLoss, years, perDay }}
            onClose={() => setShowShare(false)}
          />
        )}

        {/* ─── CONFIDENCE STATS ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>The Data Is On Your Side</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { stat: "78%", text: "of people who negotiate get a better offer", source: "Resume Genius, 2025" },
              { stat: "84%", text: "of managers EXPECT you to negotiate", source: "Salary.com survey" },
              { stat: "<1%", text: "of employers rescind an offer because you negotiated", source: "Glassdoor" },
              { stat: "55%", text: "of employees didn\u2019t negotiate their last salary", source: "Resume Genius, 2025" },
              { stat: formatCurrency(raiseAmount), text: `is all it takes \u2014 a ${raisePercent}% bump on ${formatCurrency(salary)} compounds into ${formatCurrency(totalLoss)}+`, source: `over ${years} years` },
              { stat: "3.5%", text: "average US raise for 2026", source: "Mercer, WTW, Payscale" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border p-4 text-center" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: "#1E40AF" }}>{item.stat}</div>
                <div className="text-xs leading-snug" style={{ color: "var(--text)" }}>{item.text}</div>
                <div className="text-xs mt-1 italic" style={{ color: "var(--text-muted)" }}>({item.source})</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PRO TIPS ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "The best time to negotiate is BEFORE you accept.",
                text: "Once you accept an offer, you\u2019ve set your anchor. Counter-offering during the hiring process is the highest-leverage financial moment in your career. Every raise for the rest of your time there compounds from that number.",
              },
              {
                title: "Use the word \u2018disappointed\u2019 strategically.",
                text: "Studies show that expressing mild disappointment with an initial offer signals that you expected more. Try: \u201CI\u2019m excited about the role, but I was expecting something closer to $X based on my research.\u201D",
              },
              {
                title: "Never give the first number.",
                text: "If asked \u201CWhat\u2019s your salary expectation?\u201D, deflect: \u201CI\u2019d like to learn more about the role\u2019s scope before discussing compensation. What\u2019s the budgeted range?\u201D In many states, employers must disclose salary ranges.",
              },
              {
                title: "Negotiate MORE than salary.",
                text: "If base salary is capped, negotiate signing bonus, extra PTO, remote flexibility, title bump, stock/equity, professional development budget, or accelerated review timeline.",
              },
              {
                title: "Job-hopping beats loyalty for income growth.",
                text: "Employees who stay 2+ years at the same company earn less over their career than those who switch every 2\u20133 years. External offers typically come with 10\u201320% bumps; internal raises average 3.5%.",
              },
            ].map((tip, i) => (
              <div key={i} className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{tip.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SEO CONTENT ─── */}
        {!articleMode && (
          <article className="mb-10">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>The Hidden Cost of Not Negotiating Your Salary</h2>
            <div className="prose max-w-none space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              <p>
                Most people think of a salary negotiation as a one-time event with a fixed dollar outcome. You either get the raise or you don&apos;t. But that mental model is dangerously wrong. A raise isn&apos;t a one-time bonus &mdash; it&apos;s a permanent increase to your base, and every future raise, bonus, 401(k) match, and job offer compounds on that base forever.
              </p>
              <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>The Compound Effect of Salary Differences</h3>
              <p>
                Consider two employees who start at the same company on the same day. Employee A accepts the initial offer of $75,000. Employee B negotiates a 7% increase to $80,250. Both receive identical 3.5% annual raises going forward. After 20 years, Employee A earns $148,985 per year while Employee B earns $159,414 &mdash; and the cumulative gap in total earnings is over $247,000. That&apos;s from a single conversation on day one.
              </p>
              <p>
                Carnegie Mellon economist Linda Babcock estimates that failing to negotiate a starting salary can cost between $1 million and $1.5 million in lifetime earnings. A ZipRecruiter analysis found that a $5,000 gap in starting salary can compound into $750,000+ over a 45-year career at 5% annual raises. The math is unambiguous: small differences in base salary create enormous differences in lifetime wealth.
              </p>
              <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>Why Most People Don&apos;t Negotiate</h3>
              <p>
                Despite the staggering financial stakes, 55% of employees didn&apos;t negotiate their last salary offer according to Resume Genius (2025). The reasons are emotional, not rational: fear of seeming greedy, fear the offer will be rescinded, gratitude for getting the offer at all, or simply not knowing how to negotiate. Yet 78% of those who do negotiate receive a better offer, and less than 1% of employers rescind offers due to negotiation.
              </p>
              <p>
                The gender gap in negotiation rates compounds the wage gap: Carnegie Mellon research found that only 7% of female graduates negotiate initial offers versus 57% of men. This disparity in negotiation behavior contributes significantly to the persistent gender wage gap, as the effects of lower starting salaries compound throughout an entire career.
              </p>
              <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>How to Calculate Your Lifetime Loss</h3>
              <p>
                The formula is straightforward compound growth: Future Salary = Base Salary &times; (1 + Annual Raise Rate)^Years. Cumulative earnings are the sum of each year&apos;s salary. The key insight is that both salaries grow at the same <em>rate</em>, but different <em>bases</em> mean the dollar gap grows every year. A 7% difference doesn&apos;t just cost you 7% &mdash; it costs you 7% of an exponentially growing number, every single year, for the rest of your career.
              </p>
              <p>
                For 2026, the average merit salary increase for US employers is projected at 3.5% according to surveys from Mercer, WTW, Payscale, and the Conference Board. If you don&apos;t negotiate above-standard increases, you&apos;re locked into this default. Use the calculator above to see exactly what that default is costing you.
              </p>
            </div>
          </article>
        )}

        {/* ─── FAQ ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              {
                q: "How much does not negotiating salary cost over a lifetime?",
                a: "Research from Carnegie Mellon University estimates that failing to negotiate a starting salary can cost between $1 million and $1.5 million in lifetime earnings. Even a modest $5,000 gap in starting salary can compound into $600,000\u2013$900,000 over a 40-year career, because every future raise, bonus, and 401(k) match is calculated as a percentage of your base salary.",
              },
              {
                q: "What is the average raise in 2026?",
                a: "The average merit salary increase for US employers in 2026 is projected at 3.5%, according to surveys from Mercer, WTW, Payscale, and the Conference Board. Total salary increases (including promotions and market adjustments) average 3.5\u20135%. The Bureau of Labor Statistics Employment Cost Index showed wages and salaries for private industry workers increased 3.3% for the 12-month period ending December 2025.",
              },
              {
                q: "What percentage should I negotiate for a raise?",
                a: "For a new job offer, counter-offering 10\u201320% above the initial offer is standard practice. For an internal raise or performance review, asking for 5\u201310% above the standard merit increase is reasonable if you can demonstrate strong performance. Research your market rate using sites like Glassdoor, Levels.fyi, Payscale, or the BLS Occupational Employment Statistics to anchor your ask in data.",
              },
              {
                q: "Will asking for a raise get me fired or lose the offer?",
                a: "No. Less than 1% of employers rescind offers because a candidate negotiated. In fact, 84% of managers say they expect candidates to negotiate. Not asking can actually signal a lack of confidence or market awareness. As long as your counter-offer is reasonable and professional, negotiating is almost always safe.",
              },
              {
                q: "Is this calculator free? Do you store my data?",
                a: "Yes, the salary negotiation calculator is completely free with no signup required. All calculations happen in your browser using JavaScript. We don\u2019t store, collect, or transmit any of your salary or financial data. Your inputs are never saved \u2014 close the tab and they\u2019re gone.",
              },
              {
                q: "How accurate are the projections?",
                a: "This calculator provides estimates based on a constant annual raise rate applied uniformly each year. Real careers involve variable raises, promotions, job changes, and economic shifts. The calculator illustrates the compounding effect of salary differences, not exact future earnings. For a conservative estimate, use 3\u20133.5% annual raises. For an optimistic estimate, use 4\u20135%.",
              },
              {
                q: "Does this factor in inflation?",
                a: "The default 3.5% annual raise rate roughly tracks typical US wage growth and cost-of-living adjustments. The key insight is that the relative gap between the two scenarios grows in dollar terms regardless of whether raises are above or below inflation \u2014 because the gap is percentage-based on different bases.",
              },
            ].map((faq, i) => (
              <details key={i} className="rounded-xl border overflow-hidden group" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <summary className="px-4 py-3 cursor-pointer text-sm font-semibold flex items-center justify-between hover:opacity-80 list-none" style={{ color: "var(--text)" }}>
                  {faq.q}
                  <svg className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <div className="px-4 pb-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ─── RELATED TOOLS ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>More Free Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { emoji: "\ud83d\udcb0", name: "Meeting Cost Calculator", desc: "See what meetings really cost with live timer and annual projections", href: "/business-tools/meeting-cost-calculator" },
              { emoji: "\ud83d\udcb8", name: "Subscription Cost Calculator", desc: "Check off your subscriptions and see the true total", href: "/finance-tools/subscription-calculator" },
              { emoji: "\ud83e\uddf1", name: "Concrete Calculator", desc: "Calculate exactly how much concrete you need for any project", href: "/construction/concrete-calculator" },
              { emoji: "\ud83c\udfa8", name: "Pixel Art Editor", desc: "Draw pixel art, design favicons, and export icon packages", href: "/design-tools/pixel-art-editor" },
              { emoji: "\ud83d\uddbc\ufe0f", name: "Image Compressor", desc: "Compress, resize, convert, and crop images in your browser", href: "/image-tools/image-compressor" },
            ].map((tool, i) => (
              <Link key={i} href={tool.href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="text-xl mb-1">{tool.emoji}</div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text)" }}>{tool.name}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{tool.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t pt-8 pb-4 text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <p className="font-medium mb-1" style={{ color: "var(--text)" }}>Free Online Tools</p>
          <p>Free calculators and tools for everyone. No signup, no ads, no data collection.</p>
        </footer>
      </div>
    </div>
  );
}
