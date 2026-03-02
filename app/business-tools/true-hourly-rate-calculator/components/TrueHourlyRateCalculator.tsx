"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  type TrueRateShareCardData,
  generateTrueRateShareCard,
  shareCardToBlob,
  getShareText,
  getTwitterUrl,
  getLinkedInUrl,
} from "../lib/share-card";

/* ─── Constants ─── */

const JOB_COMPARISONS = [
  { rate: 10, title: "Fast food worker", icon: "\u{1F354}" },
  { rate: 13, title: "Retail cashier", icon: "\u{1F6D2}" },
  { rate: 15, title: "Warehouse worker", icon: "\u{1F4E6}" },
  { rate: 18, title: "Office receptionist", icon: "\u{1F4DE}" },
  { rate: 20, title: "Dental assistant", icon: "\u{1F9B7}" },
  { rate: 22, title: "Retail store manager", icon: "\u{1F3EA}" },
  { rate: 25, title: "Bank teller supervisor", icon: "\u{1F3E6}" },
  { rate: 28, title: "HVAC technician", icon: "\u{1F527}" },
  { rate: 32, title: "Graphic designer", icon: "\u{1F3A8}" },
  { rate: 36, title: "Registered nurse", icon: "\u{1F469}\u200D\u2695\uFE0F" },
  { rate: 40, title: "Accountant", icon: "\u{1F4CA}" },
  { rate: 45, title: "Marketing manager", icon: "\u{1F4C8}" },
  { rate: 50, title: "Software developer", icon: "\u{1F4BB}" },
  { rate: 60, title: "Senior engineer", icon: "\u2699\uFE0F" },
  { rate: 75, title: "Product director", icon: "\u{1F3AF}" },
  { rate: 100, title: "Senior attorney", icon: "\u2696\uFE0F" },
  { rate: 125, title: "Specialist physician", icon: "\u{1FA7A}" },
];

const COMMUTE_PILLS = [
  { value: 20, label: "20 min", desc: "Very short" },
  { value: 40, label: "40 min", desc: "Short" },
  { value: 55, label: "55 min", desc: "Average" },
  { value: 90, label: "90 min", desc: "Long" },
  { value: 120, label: "120 min", desc: "Extreme" },
];

const OVERTIME_PILLS = [
  { value: 0, label: "0 hr", desc: "None" },
  { value: 3, label: "3 hr", desc: "Some emails" },
  { value: 5, label: "5 hr", desc: "Typical" },
  { value: 10, label: "10 hr", desc: "Heavy" },
  { value: 15, label: "15 hr", desc: "Startup life" },
];

const PREP_PILLS = [
  { value: 10, label: "10 min", desc: "Quick" },
  { value: 20, label: "20 min", desc: "Casual" },
  { value: 30, label: "30 min", desc: "Average" },
  { value: 45, label: "45 min", desc: "Business formal" },
  { value: 60, label: "60 min", desc: "Full routine" },
];

const LUNCH_PILLS = [
  { value: 0, label: "0 min", desc: "Paid lunch" },
  { value: 30, label: "30 min", desc: "" },
  { value: 45, label: "45 min", desc: "" },
  { value: 60, label: "60 min", desc: "" },
];

const DAYS_OPTIONS = [4, 5, 6];

interface Expense {
  id: string;
  label: string;
  category: string;
  amount: number;
  enabled: boolean;
  defaultAmount: number;
}

const DEFAULT_EXPENSES: Expense[] = [
  { id: "gas", label: "Gas / Fuel", category: "Commute", amount: 200, enabled: false, defaultAmount: 200 },
  { id: "car-payment", label: "Car Payment", category: "Commute", amount: 400, enabled: false, defaultAmount: 400 },
  { id: "car-insurance", label: "Car Insurance", category: "Commute", amount: 150, enabled: false, defaultAmount: 150 },
  { id: "parking", label: "Parking", category: "Commute", amount: 150, enabled: false, defaultAmount: 150 },
  { id: "tolls", label: "Tolls", category: "Commute", amount: 50, enabled: false, defaultAmount: 50 },
  { id: "transit", label: "Public Transit Pass", category: "Commute", amount: 130, enabled: false, defaultAmount: 130 },
  { id: "car-maintenance", label: "Car Maintenance", category: "Commute", amount: 100, enabled: false, defaultAmount: 100 },
  { id: "lunches", label: "Lunches Out", category: "Food", amount: 220, enabled: false, defaultAmount: 220 },
  { id: "coffee", label: "Coffee / Snacks", category: "Food", amount: 80, enabled: false, defaultAmount: 80 },
  { id: "clothing", label: "Work Clothing", category: "Appearance", amount: 100, enabled: false, defaultAmount: 100 },
  { id: "dry-cleaning", label: "Dry Cleaning", category: "Appearance", amount: 60, enabled: false, defaultAmount: 60 },
  { id: "childcare", label: "Before/After Care", category: "Childcare", amount: 400, enabled: false, defaultAmount: 400 },
  { id: "phone", label: "Work Phone / Plan", category: "Other", amount: 50, enabled: false, defaultAmount: 50 },
  { id: "dues", label: "Professional Dues", category: "Other", amount: 25, enabled: false, defaultAmount: 25 },
  { id: "other", label: "Other Work Expenses", category: "Other", amount: 0, enabled: false, defaultAmount: 0 },
];

const PURCHASE_ITEMS = [
  { name: "New iPhone", price: 999 },
  { name: "Weekly groceries", price: 200 },
  { name: "Netflix (yearly)", price: 216 },
  { name: "Family vacation", price: 3000 },
  { name: "New car", price: 35000 },
];

const SCENARIO_PRESETS = [
  { id: "remote", label: "Remote job (same salary)", desc: "Zero commute, less clothing & lunch spending" },
  { id: "short-commute", label: "10-minute commute", desc: "20 min round-trip instead" },
  { id: "no-overtime", label: "No unpaid overtime", desc: "Strict 40hr/week" },
];

/* ─── Helpers ─── */

function formatCurrency(n: number, decimals = 0): string {
  return "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function findJobMatch(rate: number) {
  return JOB_COMPARISONS.reduce((closest, job) =>
    Math.abs(job.rate - rate) < Math.abs(closest.rate - rate) ? job : closest
  );
}

function calcTotalWeeklyHours(paidHours: number, unpaidOT: number, commuteMins: number, prepMins: number, lunchMins: number, days: number) {
  return paidHours + unpaidOT + (commuteMins / 60) * days + (prepMins / 60) * days + (lunchMins / 60) * days;
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
    <button onClick={toggle} className="p-2 rounded-lg transition-colors" style={{ color: "var(--text-muted)" }} aria-label="Toggle dark mode">
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
      )}
    </button>
  );
}

function AnimatedNumber({ value, prefix = "$", suffix = "", decimals = 2, className, style }: { value: number; prefix?: string; suffix?: string; decimals?: number; className?: string; style?: React.CSSProperties }) {
  const [displayed, setDisplayed] = useState(value);
  const animRef = useRef<number | null>(null);
  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const start = displayed;
    const diff = value - start;
    if (Math.abs(diff) < 0.01) { setDisplayed(value); return; }
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
  const formatted = Math.abs(displayed).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span className={className} style={style}>{prefix}{formatted}{suffix}</span>;
}

function ShareModal({ data, onClose }: { data: TrueRateShareCardData; onClose: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const text = getShareText(data);

  const copyText = async () => { await navigator.clipboard.writeText(text); setCopied("text"); setTimeout(() => setCopied(null), 2000); };
  const copyLink = async () => { await navigator.clipboard.writeText("https://everyfreetool.com/business-tools/true-hourly-rate-calculator"); setCopied("link"); setTimeout(() => setCopied(null), 2000); };
  const downloadImage = async () => {
    setGenerating(true);
    try {
      const canvas = generateTrueRateShareCard(data);
      const blob = await shareCardToBlob(canvas);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "true-hourly-rate.png"; a.click(); URL.revokeObjectURL(url);
    } finally { setGenerating(false); }
  };
  const shareNative = async () => {
    if (!navigator.share) return;
    try {
      const canvas = generateTrueRateShareCard(data);
      const blob = await shareCardToBlob(canvas);
      const file = new File([blob], "true-hourly-rate.png", { type: "image/png" });
      await navigator.share({ text, files: [file] });
    } catch { /* cancelled */ }
  };
  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="w-full max-w-md rounded-2xl border p-6 space-y-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold" style={{ color: "var(--text)", fontSize: "20px" }}>Share Your Results</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:opacity-70 text-xl" style={{ color: "var(--text-muted)" }} aria-label="Close">&times;</button>
        </div>
        <div className="p-3 rounded-xl" style={{ backgroundColor: "var(--bg)", color: "var(--text-muted)", fontSize: "15px" }}>{text}</div>
        <div className="grid grid-cols-1 gap-2">
          <button onClick={downloadImage} disabled={generating} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-white transition-colors" style={{ backgroundColor: "#DC2626", fontSize: "16px" }}>
            {generating ? "Generating..." : "Download as Image"}
          </button>
          <button onClick={copyText} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)", fontSize: "16px" }}>
            {copied === "text" ? "Copied!" : "Copy Text Summary"}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <a href={getTwitterUrl(text)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)", fontSize: "15px" }}>Share on X</a>
            <a href={getLinkedInUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)", fontSize: "15px" }}>LinkedIn</a>
          </div>
          <button onClick={copyLink} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)", fontSize: "15px" }}>
            {copied === "link" ? "Copied!" : "Copy Link"}
          </button>
          {hasNativeShare && (
            <button onClick={shareNative} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium border transition-colors hover:opacity-80" style={{ borderColor: "var(--border)", color: "var(--text)", fontSize: "16px" }}>
              Share via...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Pill Button ─── */
function PillButton({ active, label, desc, onClick }: { active: boolean; label: string; desc?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-lg font-medium transition-colors text-center"
      style={{
        backgroundColor: active ? "#DC2626" : "var(--bg)",
        color: active ? "#fff" : "var(--text)",
        border: active ? "none" : "1px solid var(--border)",
        fontSize: "15px",
        minWidth: "60px",
      }}
    >
      <div>{label}</div>
      {desc && <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "2px" }}>{desc}</div>}
    </button>
  );
}

/* ─── Props ─── */
interface Props {
  title: string;
  subtitle: string;
  articleMode?: boolean;
  emphasizeCommute?: boolean;
}

/* ─── Main Component ─── */
export default function TrueHourlyRateCalculator({ title, subtitle, articleMode = false, emphasizeCommute = false }: Props) {
  /* ─── Phase 1 State ─── */
  const [inputMode, setInputMode] = useState<"salary" | "hourly">("salary");
  const [salary, setSalary] = useState(75000);
  const [salaryInput, setSalaryInput] = useState("75,000");
  const [hourlyInput, setHourlyInput] = useState("36.06");
  const [commuteMins, setCommuteMins] = useState(emphasizeCommute ? 90 : 55);
  const [unpaidOT, setUnpaidOT] = useState(5);
  const [prepMins, setPrepMins] = useState(30);
  const [lunchMins, setLunchMins] = useState(30);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  /* ─── Phase 2 State ─── */
  const [showExpenses, setShowExpenses] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>(DEFAULT_EXPENSES.map(e => ({ ...e })));
  const [customExpenses, setCustomExpenses] = useState<{ label: string; amount: number }[]>([]);

  /* ─── UI State ─── */
  const [showShare, setShowShare] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [customPurchase, setCustomPurchase] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  /* ─── Salary / Hourly sync ─── */
  const handleSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = parseInt(raw) || 0;
    setSalary(num);
    setSalaryInput(num.toLocaleString("en-US"));
  }, []);

  const handleHourlyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setHourlyInput(raw);
    const num = parseFloat(raw) || 0;
    setSalary(Math.round(num * 40 * 52));
    setSalaryInput(Math.round(num * 40 * 52).toLocaleString("en-US"));
  }, []);

  /* ─── Expense handlers ─── */
  const toggleExpense = useCallback((id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, enabled: !e.enabled } : e));
  }, []);

  const updateExpenseAmount = useCallback((id: string, amount: number) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, amount } : e));
  }, []);

  const addCustomExpense = useCallback(() => {
    setCustomExpenses(prev => [...prev, { label: "Custom expense", amount: 0 }]);
  }, []);

  const updateCustomExpense = useCallback((index: number, field: "label" | "amount", value: string | number) => {
    setCustomExpenses(prev => prev.map((e, i) => i === index ? { ...e, [field]: value } : e));
  }, []);

  const removeCustomExpense = useCallback((index: number) => {
    setCustomExpenses(prev => prev.filter((_, i) => i !== index));
  }, []);

  /* ─── Core Calculations ─── */
  const paperRate = useMemo(() => salary / (40 * 52), [salary]);

  const totalWeeklyHrs = useMemo(() =>
    calcTotalWeeklyHours(40, unpaidOT, commuteMins, prepMins, lunchMins, daysPerWeek),
    [unpaidOT, commuteMins, prepMins, lunchMins, daysPerWeek]
  );

  const totalAnnualHrs = useMemo(() => totalWeeklyHrs * 52, [totalWeeklyHrs]);

  const monthlyExpenses = useMemo(() => {
    const base = expenses.filter(e => e.enabled).reduce((sum, e) => sum + e.amount, 0);
    const custom = customExpenses.reduce((sum, e) => sum + e.amount, 0);
    return base + custom;
  }, [expenses, customExpenses]);

  const annualExpenses = useMemo(() => monthlyExpenses * 12, [monthlyExpenses]);

  const trueRate = useMemo(() => {
    const netIncome = salary - annualExpenses;
    return netIncome / totalAnnualHrs;
  }, [salary, annualExpenses, totalAnnualHrs]);

  const percentDrop = useMemo(() => {
    if (paperRate === 0) return 0;
    return ((paperRate - trueRate) / paperRate) * 100;
  }, [paperRate, trueRate]);

  const unpaidHrsPerWeek = useMemo(() => totalWeeklyHrs - 40, [totalWeeklyHrs]);
  const unpaidHrsPerYear = useMemo(() => unpaidHrsPerWeek * 52, [unpaidHrsPerWeek]);
  const unpaidValuePerYear = useMemo(() => paperRate * unpaidHrsPerYear, [paperRate, unpaidHrsPerYear]);

  const commuteHrsWeek = useMemo(() => (commuteMins / 60) * daysPerWeek, [commuteMins, daysPerWeek]);
  const prepHrsWeek = useMemo(() => (prepMins / 60) * daysPerWeek, [prepMins, daysPerWeek]);
  const lunchHrsWeek = useMemo(() => (lunchMins / 60) * daysPerWeek, [lunchMins, daysPerWeek]);

  const jobMatch = useMemo(() => findJobMatch(trueRate), [trueRate]);
  const paperJobMatch = useMemo(() => findJobMatch(paperRate), [paperRate]);

  const dailyExpenseCost = useMemo(() => {
    const workDaysPerYear = daysPerWeek * 52;
    return annualExpenses / workDaysPerYear;
  }, [annualExpenses, daysPerWeek]);

  /* ─── Expense categories for breakdown ─── */
  const expensesByCategory = useMemo(() => {
    const cats: Record<string, number> = {};
    expenses.filter(e => e.enabled).forEach(e => {
      cats[e.category] = (cats[e.category] || 0) + e.amount * 12;
    });
    customExpenses.forEach(e => {
      cats["Other"] = (cats["Other"] || 0) + e.amount * 12;
    });
    return Object.entries(cats).sort((a, b) => b[1] - a[1]);
  }, [expenses, customExpenses]);

  /* ─── Scenario Calculations ─── */
  const scenarioResults = useMemo(() => {
    const scenarios: Record<string, { trueRate: number; weeklyHrs: number; annualExpenses: number }> = {};

    // Remote: no commute, reduce clothing by 75%, reduce lunches by 60%
    const remoteExpenses = expenses.map(e => {
      if (!e.enabled) return e;
      if (["gas", "car-payment", "car-insurance", "parking", "tolls", "transit", "car-maintenance"].includes(e.id)) return { ...e, amount: 0 };
      if (e.id === "clothing" || e.id === "dry-cleaning") return { ...e, amount: Math.round(e.amount * 0.25) };
      if (e.id === "lunches") return { ...e, amount: Math.round(e.amount * 0.4) };
      return e;
    });
    const remoteMonthly = remoteExpenses.filter(e => e.enabled).reduce((s, e) => s + e.amount, 0) + customExpenses.reduce((s, e) => s + e.amount, 0);
    const remoteWeekly = calcTotalWeeklyHours(40, unpaidOT, 0, 15, lunchMins, daysPerWeek);
    scenarios.remote = { trueRate: (salary - remoteMonthly * 12) / (remoteWeekly * 52), weeklyHrs: remoteWeekly, annualExpenses: remoteMonthly * 12 };

    // Short commute: 20 min round trip
    const shortWeekly = calcTotalWeeklyHours(40, unpaidOT, 20, prepMins, lunchMins, daysPerWeek);
    scenarios["short-commute"] = { trueRate: (salary - annualExpenses) / (shortWeekly * 52), weeklyHrs: shortWeekly, annualExpenses };

    // No overtime
    const noOTWeekly = calcTotalWeeklyHours(40, 0, commuteMins, prepMins, lunchMins, daysPerWeek);
    scenarios["no-overtime"] = { trueRate: (salary - annualExpenses) / (noOTWeekly * 52), weeklyHrs: noOTWeekly, annualExpenses };

    return scenarios;
  }, [salary, annualExpenses, expenses, customExpenses, unpaidOT, commuteMins, prepMins, lunchMins, daysPerWeek]);

  /* ─── Custom Purchase ─── */
  const customPurchaseNum = useMemo(() => parseFloat(customPurchase.replace(/[^0-9.]/g, "")) || 0, [customPurchase]);

  /* ─── Share Data ─── */
  const shareData = useMemo<TrueRateShareCardData>(() => ({
    salary,
    paperRate,
    trueRate,
    jobTitle: jobMatch.title,
    unpaidHrsPerWeek: unpaidHrsPerWeek,
    annualExpenses,
  }), [salary, paperRate, trueRate, jobMatch, unpaidHrsPerWeek, annualExpenses]);

  /* ─── Time breakdown bar widths ─── */
  const timeBreakdown = useMemo(() => {
    const items = [
      { label: "Paid work", hours: 40, color: "#16A34A" },
      { label: "Unpaid overtime", hours: unpaidOT, color: "#DC2626" },
      { label: "Commuting", hours: commuteHrsWeek, color: "#EA580C" },
      { label: "Work prep", hours: prepHrsWeek, color: "#D97706" },
      { label: "Unpaid lunch", hours: lunchHrsWeek, color: "#CA8A04" },
    ].filter(i => i.hours > 0);
    return items;
  }, [unpaidOT, commuteHrsWeek, prepHrsWeek, lunchHrsWeek]);

  /* ─── Job scale for gauge ─── */
  const gaugeJobs = useMemo(() => {
    const minRate = Math.min(trueRate, paperRate, 10);
    const maxRate = Math.max(trueRate, paperRate, 50);
    return JOB_COMPARISONS.filter(j => j.rate >= minRate * 0.6 && j.rate <= maxRate * 1.4);
  }, [trueRate, paperRate]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      {/* ─── Header ─── */}
      <header className="max-w-[1100px] mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <nav className="flex items-center gap-1" style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            <Link href="/" className="hover:underline" style={{ color: "#DC2626" }}>Home</Link>
            <span>/</span>
            <span>Business Tools</span>
            <span>/</span>
            <span>{title}</span>
          </nav>
          <DarkModeToggle />
        </div>

        <h1 className="font-bold mb-2" style={{ fontSize: "clamp(28px, 5vw, 38px)", lineHeight: 1.15 }}>{title}</h1>
        <p className="mb-5" style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "700px" }}>{subtitle}</p>

        {/* Hook stat */}
        <div className="rounded-xl border px-5 py-4 mb-6" style={{ backgroundColor: "#DC26260d", borderColor: "#DC262630" }}>
          <p className="font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>
            The average American&apos;s TRUE hourly rate is <span style={{ color: "#DC2626" }}>35% lower</span> than their &ldquo;official&rdquo; rate when you account for commute time, unpaid overtime, and work expenses.
          </p>
        </div>
      </header>

      {/* ─── Main Layout: Inputs + Results ─── */}
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6 items-start">

          {/* ─── INPUT PANEL ─── */}
          <div className="space-y-5">

            {/* Salary Input */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                  <button
                    onClick={() => setInputMode("salary")}
                    className="px-3 py-1.5 font-medium"
                    style={{
                      backgroundColor: inputMode === "salary" ? "#DC2626" : "transparent",
                      color: inputMode === "salary" ? "#fff" : "var(--text-muted)",
                      fontSize: "15px",
                    }}
                  >Annual Salary</button>
                  <button
                    onClick={() => setInputMode("hourly")}
                    className="px-3 py-1.5 font-medium"
                    style={{
                      backgroundColor: inputMode === "hourly" ? "#DC2626" : "transparent",
                      color: inputMode === "hourly" ? "#fff" : "var(--text-muted)",
                      fontSize: "15px",
                    }}
                  >Hourly Rate</button>
                </div>
              </div>

              {inputMode === "salary" ? (
                <div>
                  <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Annual Salary</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold" style={{ fontSize: "20px", color: "var(--text-muted)" }}>$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={salaryInput}
                      onChange={handleSalaryChange}
                      className="w-full rounded-xl border px-4 py-3 pl-8 font-bold tabular-nums"
                      style={{ fontSize: "20px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                      aria-label="Annual salary"
                    />
                  </div>
                  <p className="mt-1.5" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Before taxes, base salary</p>
                </div>
              ) : (
                <div>
                  <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>Hourly Rate</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold" style={{ fontSize: "20px", color: "var(--text-muted)" }}>$</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={hourlyInput}
                      onChange={handleHourlyChange}
                      className="w-full rounded-xl border px-4 py-3 pl-8 font-bold tabular-nums"
                      style={{ fontSize: "20px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                      aria-label="Hourly rate"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>/hr</span>
                  </div>
                  <p className="mt-1.5" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Converts to {formatCurrency(salary, 0)}/year at 40 hrs/week</p>
                </div>
              )}
            </div>

            {/* Commute */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <label className="block font-bold mb-1" style={{ fontSize: "16px" }}>Commute Time <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(round-trip, per day)</span></label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="range" min={0} max={180} step={5} value={commuteMins}
                  onChange={e => setCommuteMins(Number(e.target.value))}
                  className="flex-1 accent-[#DC2626]"
                  aria-label="Commute time in minutes"
                />
                <div className="font-bold tabular-nums" style={{ fontSize: "20px", minWidth: "80px", textAlign: "right" }}>{commuteMins} min</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {COMMUTE_PILLS.map(p => (
                  <PillButton key={p.value} active={commuteMins === p.value} label={p.label} desc={p.desc} onClick={() => setCommuteMins(p.value)} />
                ))}
              </div>
              <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                That&apos;s <strong style={{ color: "var(--text)" }}>{commuteHrsWeek.toFixed(1)} hours/week</strong> and <strong style={{ color: "var(--text)" }}>{Math.round(commuteHrsWeek * 52)} hours/year</strong> commuting
              </p>
            </div>

            {/* Unpaid Overtime */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <label className="block font-bold mb-1" style={{ fontSize: "16px" }}>Unpaid Overtime <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(hours/week beyond 40)</span></label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="range" min={0} max={30} step={1} value={unpaidOT}
                  onChange={e => setUnpaidOT(Number(e.target.value))}
                  className="flex-1 accent-[#DC2626]"
                  aria-label="Unpaid overtime hours per week"
                />
                <div className="font-bold tabular-nums" style={{ fontSize: "20px", minWidth: "60px", textAlign: "right" }}>{unpaidOT} hr</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {OVERTIME_PILLS.map(p => (
                  <PillButton key={p.value} active={unpaidOT === p.value} label={p.label} desc={p.desc} onClick={() => setUnpaidOT(p.value)} />
                ))}
              </div>
              <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>48% of US workers report working more than 40 hours per week</p>
            </div>

            {/* Work Prep */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <label className="block font-bold mb-1" style={{ fontSize: "16px" }}>Work Prep Time <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(daily)</span></label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="range" min={0} max={90} step={5} value={prepMins}
                  onChange={e => setPrepMins(Number(e.target.value))}
                  className="flex-1 accent-[#DC2626]"
                  aria-label="Work preparation time in minutes"
                />
                <div className="font-bold tabular-nums" style={{ fontSize: "20px", minWidth: "80px", textAlign: "right" }}>{prepMins} min</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {PREP_PILLS.map(p => (
                  <PillButton key={p.value} active={prepMins === p.value} label={p.label} desc={p.desc} onClick={() => setPrepMins(p.value)} />
                ))}
              </div>
            </div>

            {/* Unpaid Lunch */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <label className="block font-bold mb-1" style={{ fontSize: "16px" }}>Unpaid Lunch Break <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(daily)</span></label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="range" min={0} max={90} step={5} value={lunchMins}
                  onChange={e => setLunchMins(Number(e.target.value))}
                  className="flex-1 accent-[#DC2626]"
                  aria-label="Unpaid lunch break in minutes"
                />
                <div className="font-bold tabular-nums" style={{ fontSize: "20px", minWidth: "80px", textAlign: "right" }}>{lunchMins} min</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {LUNCH_PILLS.map(p => (
                  <PillButton key={p.value} active={lunchMins === p.value} label={p.label} desc={p.desc} onClick={() => setLunchMins(p.value)} />
                ))}
              </div>
            </div>

            {/* Days Per Week */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <label className="block font-bold mb-3" style={{ fontSize: "16px" }}>Days Worked Per Week</label>
              <div className="flex gap-2">
                {DAYS_OPTIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => setDaysPerWeek(d)}
                    className="flex-1 py-3 rounded-xl font-bold transition-colors"
                    style={{
                      backgroundColor: daysPerWeek === d ? "#DC2626" : "var(--bg)",
                      color: daysPerWeek === d ? "#fff" : "var(--text)",
                      border: daysPerWeek === d ? "none" : "1px solid var(--border)",
                      fontSize: "18px",
                    }}
                  >{d} days</button>
                ))}
              </div>
            </div>

            {/* Phase 2: Expenses */}
            <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <button
                onClick={() => setShowExpenses(!showExpenses)}
                className="w-full flex items-center justify-between p-5 font-bold text-left"
                style={{ fontSize: "16px" }}
              >
                <span>Factor In Work Expenses</span>
                <span style={{ fontSize: "20px", color: "var(--text-muted)" }}>{showExpenses ? "\u2212" : "+"}</span>
              </button>

              {showExpenses && (
                <div className="px-5 pb-5 space-y-3">
                  {["Commute", "Food", "Appearance", "Childcare", "Other"].map(cat => {
                    const catExpenses = expenses.filter(e => e.category === cat);
                    if (catExpenses.length === 0) return null;
                    return (
                      <div key={cat}>
                        <h4 className="font-semibold mb-2 uppercase tracking-wide" style={{ fontSize: "15px", color: "var(--text-muted)" }}>{cat}</h4>
                        <div className="space-y-2">
                          {catExpenses.map(exp => (
                            <div key={exp.id} className="flex items-center gap-3">
                              <button
                                onClick={() => toggleExpense(exp.id)}
                                className="flex-shrink-0 w-6 h-6 rounded border flex items-center justify-center"
                                style={{
                                  backgroundColor: exp.enabled ? "#DC2626" : "transparent",
                                  borderColor: exp.enabled ? "#DC2626" : "var(--border)",
                                  color: "#fff",
                                }}
                                aria-label={`Toggle ${exp.label}`}
                              >
                                {exp.enabled && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                              </button>
                              <span className="flex-1" style={{ fontSize: "15px", color: exp.enabled ? "var(--text)" : "var(--text-muted)" }}>{exp.label}</span>
                              <div className="relative" style={{ width: "100px" }}>
                                <span className="absolute left-2 top-1/2 -translate-y-1/2" style={{ fontSize: "15px", color: "var(--text-muted)" }}>$</span>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={exp.enabled ? exp.amount : ""}
                                  onChange={e => updateExpenseAmount(exp.id, parseInt(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                                  disabled={!exp.enabled}
                                  className="w-full rounded-lg border px-2 py-1.5 pl-6 tabular-nums text-right"
                                  style={{
                                    fontSize: "15px",
                                    backgroundColor: exp.enabled ? "var(--bg)" : "transparent",
                                    borderColor: exp.enabled ? "var(--border)" : "transparent",
                                    color: exp.enabled ? "var(--text)" : "var(--text-muted)",
                                    opacity: exp.enabled ? 1 : 0.4,
                                  }}
                                  aria-label={`${exp.label} monthly cost`}
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2" style={{ fontSize: "15px", color: "var(--text-muted)" }}>/mo</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Custom expenses */}
                  {customExpenses.map((exp, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={exp.label}
                        onChange={e => updateCustomExpense(i, "label", e.target.value)}
                        className="flex-1 rounded-lg border px-3 py-1.5"
                        style={{ fontSize: "15px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                        aria-label="Custom expense name"
                      />
                      <div className="relative" style={{ width: "100px" }}>
                        <span className="absolute left-2 top-1/2 -translate-y-1/2" style={{ fontSize: "15px", color: "var(--text-muted)" }}>$</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={exp.amount || ""}
                          onChange={e => updateCustomExpense(i, "amount", parseInt(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                          className="w-full rounded-lg border px-2 py-1.5 pl-6 tabular-nums text-right"
                          style={{ fontSize: "15px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                          aria-label="Custom expense amount"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2" style={{ fontSize: "15px", color: "var(--text-muted)" }}>/mo</span>
                      </div>
                      <button onClick={() => removeCustomExpense(i)} className="p-1 rounded hover:opacity-70" style={{ color: "var(--text-muted)" }}>&times;</button>
                    </div>
                  ))}

                  <button onClick={addCustomExpense} className="font-medium py-2 px-4 rounded-lg border" style={{ fontSize: "15px", borderColor: "var(--border)", color: "#DC2626" }}>
                    + Add Custom Expense
                  </button>

                  {/* Running total */}
                  <div className="rounded-xl p-4 mt-3" style={{ backgroundColor: "var(--bg)" }}>
                    <p className="font-bold" style={{ fontSize: "16px" }}>
                      Total work-related expenses: <span style={{ color: "#DC2626" }}>{formatCurrency(monthlyExpenses)}/month</span> ({formatCurrency(annualExpenses)}/year)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ─── RESULTS PANEL ─── */}
          <div ref={resultsRef} className="space-y-5 lg:sticky lg:top-4" role="region" aria-live="polite">

            {/* Hero Comparison */}
            <div className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="grid grid-cols-2 gap-4 text-center mb-4">
                <div>
                  <p className="uppercase tracking-wide font-semibold mb-1" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Your &ldquo;Paper&rdquo; Rate</p>
                  <AnimatedNumber
                    value={paperRate}
                    className="tabular-nums font-bold"
                    style={{ fontSize: "clamp(36px, 5vw, 48px)", color: "#16A34A", textDecoration: "line-through", textDecorationColor: "#16A34A40" }}
                  />
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>/hr</p>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Based on salary &divide; 40 hrs/week</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide font-semibold mb-1" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Your TRUE Rate</p>
                  <AnimatedNumber
                    value={trueRate}
                    className="tabular-nums font-bold"
                    style={{ fontSize: "clamp(44px, 6vw, 64px)", color: "#DC2626" }}
                  />
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>/hr</p>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>What you ACTUALLY earn per hour of your life spent on work</p>
                </div>
              </div>

              {/* Drop callout */}
              <div className="text-center rounded-xl py-3 px-4" style={{ backgroundColor: "#D9770610", border: "1px solid #D9770630" }}>
                <p className="font-bold" style={{ fontSize: "18px", color: "#D97706" }}>
                  That&apos;s <AnimatedNumber value={percentDrop} prefix="" suffix="%" className="tabular-nums" style={{ color: "#D97706" }} /> less than you think
                </p>
              </div>
            </div>

            {/* Job Title Comparison */}
            <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-3" style={{ fontSize: "20px" }}>Your True Rate Equals...</h3>
              <div className="text-center py-4 px-3 rounded-xl mb-4" style={{ backgroundColor: "var(--bg)" }}>
                <p style={{ fontSize: "40px", marginBottom: "4px" }}>{jobMatch.icon}</p>
                <p className="font-bold" style={{ fontSize: "18px" }}>
                  Your true hourly rate of <span style={{ color: "#DC2626" }}>{formatCurrency(trueRate, 2)}/hr</span> is equivalent to what a <span style={{ color: "#DC2626" }}>{jobMatch.title.toLowerCase()}</span> earns.
                </p>
              </div>

              {/* Rate Scale / Gauge */}
              <div className="relative py-6">
                <div className="h-2 rounded-full mb-1" style={{ backgroundColor: "var(--border)" }}>
                  {gaugeJobs.length > 0 && (() => {
                    const minR = gaugeJobs[0].rate;
                    const maxR = gaugeJobs[gaugeJobs.length - 1].rate;
                    const range = maxR - minR || 1;
                    const paperPos = Math.max(0, Math.min(100, ((paperRate - minR) / range) * 100));
                    const truePos = Math.max(0, Math.min(100, ((trueRate - minR) / range) * 100));
                    return (
                      <>
                        {/* Green marker (paper rate) */}
                        <div className="absolute top-4" style={{ left: `${paperPos}%`, transform: "translateX(-50%)" }}>
                          <div className="w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: "#16A34A" }} />
                          <p className="absolute top-5 font-bold whitespace-nowrap" style={{ fontSize: "15px", color: "#16A34A", left: "50%", transform: "translateX(-50%)" }}>{formatCurrency(paperRate, 2)}</p>
                        </div>
                        {/* Red marker (true rate) */}
                        <div className="absolute top-4" style={{ left: `${truePos}%`, transform: "translateX(-50%)" }}>
                          <div className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: "#DC2626" }} />
                          <p className="absolute top-6 font-bold whitespace-nowrap" style={{ fontSize: "15px", color: "#DC2626", left: "50%", transform: "translateX(-50%)" }}>{formatCurrency(trueRate, 2)}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                {/* Job labels */}
                <div className="flex justify-between mt-10 overflow-hidden">
                  {gaugeJobs.filter((_, i) => i % Math.max(1, Math.floor(gaugeJobs.length / 5)) === 0).slice(0, 6).map(j => (
                    <div key={j.rate} className="text-center" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      <div>{j.icon}</div>
                      <div>${j.rate}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Share Button */}
            <button
              onClick={() => setShowShare(true)}
              className="w-full py-4 rounded-xl font-bold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#DC2626", fontSize: "18px" }}
            >
              Share Your Results
            </button>
          </div>
        </div>

        {/* ─── BREAKDOWN SECTION ─── */}
        <div className="mt-10 space-y-8">

          {/* How We Calculated It */}
          <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="font-bold mb-5" style={{ fontSize: "28px" }}>How We Calculated It</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time Budget */}
              <div>
                <h3 className="font-semibold mb-3 uppercase tracking-wide" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Your Time Budget (per week)</h3>
                <div className="space-y-2 font-mono tabular-nums" style={{ fontSize: "16px" }}>
                  <div className="flex justify-between"><span>Paid work hours:</span><span>40.0 hrs</span></div>
                  <div className="flex justify-between" style={{ color: "#DC2626" }}><span>+ Unpaid overtime:</span><span>+ {unpaidOT.toFixed(1)} hrs</span></div>
                  <div className="flex justify-between" style={{ color: "#EA580C" }}><span>+ Commute:</span><span>+ {commuteHrsWeek.toFixed(1)} hrs</span></div>
                  <div className="flex justify-between" style={{ color: "#D97706" }}><span>+ Work prep:</span><span>+ {prepHrsWeek.toFixed(1)} hrs</span></div>
                  <div className="flex justify-between" style={{ color: "#CA8A04" }}><span>+ Unpaid lunch:</span><span>+ {lunchHrsWeek.toFixed(1)} hrs</span></div>
                  <div className="border-t pt-2 mt-2 font-bold flex justify-between" style={{ borderColor: "var(--border)" }}>
                    <span>TOTAL hours for work:</span>
                    <span>{totalWeeklyHrs.toFixed(1)} hrs/week</span>
                  </div>
                  <div className="flex justify-between" style={{ color: "var(--text-muted)" }}>
                    <span></span>
                    <span>{Math.round(totalAnnualHrs).toLocaleString()} hrs/year</span>
                  </div>
                </div>
              </div>

              {/* Money Budget */}
              <div>
                <h3 className="font-semibold mb-3 uppercase tracking-wide" style={{ fontSize: "15px", color: "var(--text-muted)" }}>Your Money (annual)</h3>
                <div className="space-y-2 font-mono tabular-nums" style={{ fontSize: "16px" }}>
                  <div className="flex justify-between"><span>Gross salary:</span><span>{formatCurrency(salary)}</span></div>
                  {annualExpenses > 0 && (
                    <div className="flex justify-between" style={{ color: "#DC2626" }}><span>- Work expenses:</span><span>- {formatCurrency(annualExpenses)}/year</span></div>
                  )}
                  <div className="border-t pt-2 mt-2 font-bold flex justify-between" style={{ borderColor: "var(--border)" }}>
                    <span>Net work income:</span>
                    <span>{formatCurrency(salary - annualExpenses)}/year</span>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: "var(--bg)" }}>
                  <p className="font-bold" style={{ fontSize: "16px", color: "#DC2626" }}>
                    TRUE HOURLY RATE: {formatCurrency(salary - annualExpenses)} &divide; {Math.round(totalAnnualHrs).toLocaleString()} hrs = {formatCurrency(trueRate, 2)}/hr
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Time Theft Visualization */}
          <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="font-bold mb-5" style={{ fontSize: "28px" }}>Your Work Week: {totalWeeklyHrs.toFixed(1)} Hours</h2>
            <div className="space-y-3">
              {timeBreakdown.map(item => {
                const pct = (item.hours / totalWeeklyHrs) * 100;
                return (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1" style={{ fontSize: "16px" }}>
                      <span className="font-medium">{item.label}</span>
                      <span className="tabular-nums" style={{ color: "var(--text-muted)" }}>{item.hours.toFixed(1)} hrs ({pct.toFixed(1)}%)</span>
                    </div>
                    <div className="h-6 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: item.color, minWidth: pct > 0 ? "8px" : "0" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Callout */}
            {unpaidHrsPerWeek > 0 && (
              <div className="mt-5 rounded-xl p-5" style={{ backgroundColor: "#DC26260a", border: "1px solid #DC262625" }}>
                <p className="font-bold mb-1" style={{ fontSize: "18px", color: "#DC2626" }}>
                  You give {unpaidHrsPerWeek.toFixed(1)} UNPAID hours per week to your employer.
                </p>
                <p style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                  That&apos;s <strong style={{ color: "var(--text)" }}>{Math.round(unpaidHrsPerYear)} hours per year</strong> &mdash; the equivalent of <strong style={{ color: "var(--text)" }}>{(unpaidHrsPerYear / 40).toFixed(0)} full work weeks</strong>.
                  At your paper rate, those unpaid hours are worth <strong style={{ color: "#DC2626" }}>{formatCurrency(unpaidValuePerYear)}/year</strong>.
                </p>
              </div>
            )}
          </section>

          {/* Annual Cost of Working */}
          {annualExpenses > 0 && (
            <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="font-bold mb-5" style={{ fontSize: "28px" }}>Your Job Costs You {formatCurrency(annualExpenses)} Per Year</h2>
              <div className="space-y-3">
                {expensesByCategory.map(([cat, amount]) => {
                  const pct = (amount / annualExpenses) * 100;
                  return (
                    <div key={cat}>
                      <div className="flex justify-between mb-1" style={{ fontSize: "16px" }}>
                        <span className="font-medium">{cat}</span>
                        <span className="tabular-nums" style={{ color: "var(--text-muted)" }}>{formatCurrency(amount)}/yr ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className="h-5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#D97706", minWidth: "8px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: "#D977060a", border: "1px solid #D9770625" }}>
                <p className="font-bold" style={{ fontSize: "17px", color: "#D97706" }}>
                  Before you earn a single dollar, your job costs you <strong>{formatCurrency(dailyExpenseCost, 2)} per working day</strong> just to show up.
                </p>
              </div>
            </section>
          )}

          {/* What If? Comparator */}
          <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="font-bold mb-2" style={{ fontSize: "28px" }}>What If You Had a Different Job?</h2>
            <p className="mb-5" style={{ fontSize: "16px", color: "var(--text-muted)" }}>See how changes to your work situation would affect your true hourly rate.</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {SCENARIO_PRESETS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(activeScenario === s.id ? null : s.id)}
                  className="px-4 py-2.5 rounded-xl font-medium transition-colors"
                  style={{
                    backgroundColor: activeScenario === s.id ? "#DC2626" : "var(--bg)",
                    color: activeScenario === s.id ? "#fff" : "var(--text)",
                    border: activeScenario === s.id ? "none" : "1px solid var(--border)",
                    fontSize: "15px",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {activeScenario && scenarioResults[activeScenario] && (() => {
              const sc = scenarioResults[activeScenario];
              const rateIncrease = sc.trueRate - trueRate;
              const pctIncrease = trueRate > 0 ? (rateIncrease / trueRate) * 100 : 0;
              const hrsSaved = totalWeeklyHrs - sc.weeklyHrs;
              const annualSaved = annualExpenses - sc.annualExpenses;
              const preset = SCENARIO_PRESETS.find(p => p.id === activeScenario)!;
              const scJobMatch = findJobMatch(sc.trueRate);

              return (
                <div className="rounded-xl p-5 space-y-4" style={{ backgroundColor: "var(--bg)" }}>
                  <p className="font-semibold" style={{ fontSize: "16px", color: "var(--text-muted)" }}>{preset.desc}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                      <p className="font-bold tabular-nums" style={{ fontSize: "28px", color: "#16A34A" }}>{formatCurrency(sc.trueRate, 2)}</p>
                      <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>New true rate</p>
                    </div>
                    <div className="text-center p-3 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                      <p className="font-bold tabular-nums" style={{ fontSize: "28px", color: "#16A34A" }}>+{pctIncrease.toFixed(0)}%</p>
                      <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Rate increase</p>
                    </div>
                    <div className="text-center p-3 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                      <p className="font-bold tabular-nums" style={{ fontSize: "28px", color: "#16A34A" }}>{hrsSaved.toFixed(1)}</p>
                      <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Hrs/week saved</p>
                    </div>
                    <div className="text-center p-3 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                      <p className="font-bold tabular-nums" style={{ fontSize: "28px", color: "#16A34A" }}>{formatCurrency(annualSaved)}</p>
                      <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Annual savings</p>
                    </div>
                  </div>

                  <div className="rounded-xl p-4" style={{ backgroundColor: "#16A34A0d", border: "1px solid #16A34A25" }}>
                    <p className="font-bold" style={{ fontSize: "17px", color: "#16A34A" }}>
                      {preset.label} would raise your true hourly rate from {formatCurrency(trueRate, 2)} to {formatCurrency(sc.trueRate, 2)} &mdash; a {pctIncrease.toFixed(0)}% increase.
                      Your new rate would be equivalent to a {scJobMatch.title.toLowerCase()} {scJobMatch.icon}.
                    </p>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* Purchase Power Section */}
          <section className="rounded-xl border p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <h2 className="font-bold mb-2" style={{ fontSize: "28px" }}>How Long Things REALLY Take To Earn</h2>
            <p className="mb-5" style={{ fontSize: "16px", color: "var(--text-muted)" }}>At your true hourly rate, here&apos;s how long common purchases actually take to earn:</p>

            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: "16px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)" }}>
                    <th className="text-left py-3 pr-4 font-semibold" style={{ color: "var(--text)" }}>Item</th>
                    <th className="text-right py-3 px-3 font-semibold" style={{ color: "#16A34A" }}>At &ldquo;Paper&rdquo; Rate</th>
                    <th className="text-right py-3 px-3 font-semibold" style={{ color: "#DC2626" }}>At TRUE Rate</th>
                    <th className="text-right py-3 pl-3 font-semibold" style={{ color: "#D97706" }}>Extra Time</th>
                  </tr>
                </thead>
                <tbody>
                  {PURCHASE_ITEMS.map(item => {
                    const paperHrs = paperRate > 0 ? item.price / paperRate : 0;
                    const trueHrs = trueRate > 0 ? item.price / trueRate : 0;
                    const extra = trueHrs - paperHrs;
                    return (
                      <tr key={item.name} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td className="py-3 pr-4 font-medium">{item.name} ({formatCurrency(item.price)})</td>
                        <td className="py-3 px-3 text-right tabular-nums" style={{ color: "#16A34A" }}>{paperHrs.toFixed(1)} hrs</td>
                        <td className="py-3 px-3 text-right tabular-nums font-bold" style={{ color: "#DC2626" }}>{trueHrs.toFixed(1)} hrs</td>
                        <td className="py-3 pl-3 text-right tabular-nums" style={{ color: "#D97706" }}>+{extra.toFixed(1)} hrs</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Custom purchase */}
            <div className="mt-5 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
              <label className="block font-bold mb-2" style={{ fontSize: "16px" }}>How long does a custom amount take to earn?</label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1" style={{ maxWidth: "200px" }}>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold" style={{ color: "var(--text-muted)" }}>$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={customPurchase}
                    onChange={e => setCustomPurchase(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full rounded-xl border px-3 py-2.5 pl-7 tabular-nums"
                    style={{ fontSize: "18px", backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                    aria-label="Custom purchase amount"
                  />
                </div>
                {customPurchaseNum > 0 && (
                  <div style={{ fontSize: "16px" }}>
                    <span style={{ color: "#16A34A" }}>{(customPurchaseNum / paperRate).toFixed(1)} hrs</span>
                    <span style={{ color: "var(--text-muted)" }}> at paper rate vs </span>
                    <span className="font-bold" style={{ color: "#DC2626" }}>{(customPurchaseNum / trueRate).toFixed(1)} hrs</span>
                    <span style={{ color: "var(--text-muted)" }}> at true rate</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Stat Cards */}
          <section>
            <h2 className="font-bold mb-5" style={{ fontSize: "28px" }}>The Numbers Behind Your True Rate</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { stat: "27.2 min", desc: "Average one-way US commute in 2024", source: "US Census Bureau" },
                { stat: "45 hrs", desc: "Average hours salaried US workers actually work per week", source: "BLS" },
                { stat: "$6,700", desc: "Average annual commute cost for US workers", source: "Census/FinanceBuzz" },
                { stat: "48%", desc: "of US workers report working more than 40 hours per week", source: "TMetric/BLS analysis" },
                { stat: "759 hrs", desc: "Average unpaid work hours per year with typical commute + 5hr/wk overtime", source: "" },
                { stat: "$10-15", desc: "Average cost of buying lunch at work per day ($2,400-3,600/year)", source: "" },
              ].map((card, i) => (
                <div key={i} className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <p className="font-bold tabular-nums" style={{ fontSize: "36px", color: "#DC2626" }}>{card.stat}</p>
                  <p className="mt-1" style={{ fontSize: "16px", color: "var(--text)" }}>{card.desc}</p>
                  {card.source && <p className="mt-1" style={{ fontSize: "15px", color: "var(--text-muted)" }}>{card.source}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="font-bold mb-5" style={{ fontSize: "28px" }}>Pro Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Remote work is a 15-30% raise in disguise.", body: "Eliminating a 55-minute commute saves you 238 hours/year and $4,800+ in commute costs. That\u2019s the equivalent of a $7,000-$12,000 raise in true hourly value \u2014 without your employer paying a penny more." },
                { title: "A higher-paying job isn\u2019t always a better deal.", body: "A $90K job with a 90-minute commute and 10 hours of overtime may have a lower true hourly rate than a $75K job that\u2019s fully remote with strict 40-hour weeks. Always calculate the true rate before accepting an offer." },
                { title: "Pack lunch 3x a week to give yourself a $2,000 raise.", body: "The average worker spends $10-15 per lunch eating out. Bringing lunch from home costs $3-5. Packing lunch just 3 days a week saves $1,500-2,400/year \u2014 money that goes directly into your pocket." },
                { title: "Negotiate your commute, not just your salary.", body: "If you can\u2019t get a bigger salary, negotiate 1-2 remote days per week. Two remote days saves 4+ hours of commuting weekly \u2014 equivalent to earning $4,000-6,000 more per year in true hourly value." },
                { title: "Track your ACTUAL hours for one week.", body: "Most people underestimate how much time their job really takes. For one week, track everything: the alarm going off, getting ready, commuting, working, staying late, answering evening emails, commuting home. The real number is always higher than you think." },
              ].map((tip, i) => (
                <div key={i} className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", borderLeftWidth: "4px", borderLeftColor: "#DC2626" }}>
                  <h3 className="font-bold mb-2" style={{ fontSize: "17px" }}>{tip.title}</h3>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.6 }}>{tip.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          {!articleMode && (
            <article className="space-y-6">
              <section>
                <h2 className="font-bold mb-4" style={{ fontSize: "28px" }}>What Is Your True Hourly Rate?</h2>
                <div className="space-y-4" style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--text-muted)" }}>
                  <p>
                    Most people calculate their hourly rate by dividing their annual salary by 2,080 &mdash; the standard number of paid work hours in a year (40 hours per week times 52 weeks). A $75,000 salary works out to $36.06 per hour by that simple math. But that number is <strong style={{ color: "var(--text)" }}>deeply misleading</strong>.
                  </p>
                  <p>
                    The standard calculation only counts the 40 hours you&apos;re officially paid for. It completely ignores the <strong style={{ color: "var(--text)" }}>additional 10-20+ hours per week</strong> your job actually demands: the commute (averaging 55 minutes round-trip per day according to 2024 Census data), unpaid overtime (salaried workers average 42-45 hours per week according to the BLS), getting ready for work, and unpaid lunch breaks.
                  </p>
                  <p>
                    When you factor in all the time your job actually consumes, a typical 40-hour-per-week job really takes <strong style={{ color: "var(--text)" }}>50-60 hours per week</strong> of your life. And that&apos;s before accounting for the money your job costs you &mdash; commute expenses averaging $6,700/year, work lunches at $200-400/month, professional clothing, and more.
                  </p>
                  <p>
                    Your true hourly rate divides your <em>actual take-home work income</em> (salary minus work-related expenses) by the <em>total hours your job consumes</em>. For a typical $75,000 salary, this drops the hourly rate from $36.06 to roughly $22-26/hr &mdash; <strong style={{ color: "#DC2626" }}>30-40% less</strong> than the &ldquo;paper&rdquo; rate.
                  </p>
                  <p>
                    This reframe matters for real financial decisions: evaluating job offers, negotiating remote work, deciding whether overtime is &ldquo;worth it,&rdquo; and understanding the true cost of career decisions. A $90,000 job with a brutal commute may actually pay you less per hour of life than a $72,000 fully-remote position.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-bold mb-4" style={{ fontSize: "28px" }}>How to Calculate Your Real Hourly Wage</h2>
                <div className="space-y-4" style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--text-muted)" }}>
                  <p>
                    The formula is straightforward: <strong style={{ color: "var(--text)" }}>(Annual Salary - Annual Work Expenses) &divide; Total Annual Hours Consumed by Work</strong>.
                  </p>
                  <p>
                    Let&apos;s walk through an example. Sarah earns $80,000 per year. Her commute is 50 minutes round-trip, she works about 5 hours of unpaid overtime per week, spends 30 minutes getting ready for work each day, and has a 30-minute unpaid lunch break.
                  </p>
                  <p>
                    Her weekly time budget: 40 paid hours + 5 hours overtime + 4.2 hours commuting + 2.5 hours prep + 2.5 hours lunch = <strong style={{ color: "var(--text)" }}>54.2 hours per week</strong>. Over 52 weeks, that&apos;s 2,818 hours per year &mdash; compared to 2,080 hours in the standard calculation.
                  </p>
                  <p>
                    Her work expenses: $200/month gas + $150/month parking + $200/month lunches + $80/month coffee + $100/month work clothes = $730/month or $8,760/year. Net work income: $80,000 - $8,760 = $71,240.
                  </p>
                  <p>
                    Sarah&apos;s paper rate: $80,000 &divide; 2,080 = <strong style={{ color: "#16A34A" }}>$38.46/hr</strong>. Her true rate: $71,240 &divide; 2,818 = <strong style={{ color: "#DC2626" }}>$25.28/hr</strong>. That&apos;s a <strong style={{ color: "#D97706" }}>34% drop</strong> &mdash; the hourly rate of a bank teller supervisor, not the professional salary she expected. Understanding this number transforms how Sarah evaluates her next career move, negotiation, or remote work request.
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
                { q: "How do you calculate true hourly rate?", a: "Your true hourly rate is calculated by dividing your actual take-home work income (salary minus work-related expenses) by the total hours your job consumes each week, including commute time, unpaid overtime, work preparation, and unpaid lunch breaks. The standard salary-to-hourly calculation only divides by 40 paid hours, which significantly overstates your real earning rate per hour of life dedicated to work." },
                { q: "What is the average commute time in the US?", a: "According to 2024 US Census data, the average American one-way commute is 27.2 minutes, or about 55 minutes round-trip per day. This has increased from 25.6 minutes in 2021 during peak remote work. New York City has the longest average commute at 40.6 minutes one-way, while cities like Tulsa, OK average under 20 minutes. About 9.3% of commuters travel 60+ minutes each way." },
                { q: "How much does the average person spend on work-related expenses?", a: "The average American worker spends approximately $6,700 per year on commute costs alone, according to Census and FinanceBuzz data. Adding work lunches ($2,400-3,600/year), work clothing ($600-1,800/year), and other expenses, total work-related costs typically range from $8,000-$15,000 per year depending on commute length, industry dress code, and city." },
                { q: "How many hours do salaried workers actually work?", a: "According to the Bureau of Labor Statistics, US workers across industries average 41.9 hours per week. However, salaried workers in professional roles commonly work 45-50+ hours per week. A study found that 48% of US workers report working more than 40 hours per week, and some estimates suggest American workers average up to 9 hours of unpaid overtime weekly." },
                { q: "Is this calculator free? Do you store my data?", a: "Yes, the true hourly rate calculator is completely free with no signup required. All calculations happen in your browser using JavaScript. We don\u2019t store, collect, or transmit any of your salary or personal data. Your inputs are never saved \u2014 close the tab and they\u2019re gone." },
                { q: "Should I take a lower-paying job with a shorter commute?", a: "It depends on the true hourly rate comparison. Use this calculator to compare both offers. A job paying $70,000 with a 10-minute commute and no overtime may have a higher true hourly rate than an $85,000 job with a 90-minute commute and regular overtime. The true hourly rate reveals which job actually compensates you better for each hour of your life." },
                { q: "How does remote work affect true hourly rate?", a: "Remote work dramatically improves true hourly rate by eliminating commute time (saving 200-500+ hours/year), reducing commute costs ($3,000-7,000+/year), reducing work clothing expenses, and reducing food costs since you eat at home. For someone with a typical 55-minute commute, switching to fully remote can increase their true hourly rate by 25-40%." },
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
                { name: "Salary Negotiation Calculator", desc: "See the lifetime cost of not negotiating your salary.", href: "/business-tools/salary-negotiation-calculator" },
                { name: "Subscription Audit Calculator", desc: "Find out how much you spend on subscriptions per year.", href: "/finance-tools/subscription-calculator" },
                { name: "Meeting Cost Calculator", desc: "Calculate how much your meetings actually cost the company.", href: "/business-tools/meeting-cost-calculator" },
                { name: "Lifetime Salary Loss Calculator", desc: "See how a single missed raise compounds over decades.", href: "/business-tools/cost-of-not-negotiating-salary" },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} className="rounded-xl border p-5 block hover:opacity-80 transition-opacity" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-bold mb-1" style={{ fontSize: "17px", color: "#DC2626" }}>{tool.name}</h3>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{tool.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-8" style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            <p>100% free. No signup. All calculations happen in your browser.</p>
            <p className="mt-1">
              <Link href="/" className="hover:underline" style={{ color: "#DC2626" }}>EveryFreeTool.com</Link>
            </p>
          </footer>
        </div>
      </div>

      {/* ─── Mobile Sticky Bar ─── */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden border-t py-3 px-4 flex items-center justify-between z-40" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <div>
          <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Your True Rate</p>
          <p className="font-bold tabular-nums" style={{ fontSize: "24px", color: "#DC2626" }}>{formatCurrency(trueRate, 2)}/hr</p>
        </div>
        <div className="text-right">
          <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>Paper Rate</p>
          <p className="font-bold tabular-nums line-through" style={{ fontSize: "18px", color: "#16A34A", textDecorationColor: "#16A34A40" }}>{formatCurrency(paperRate, 2)}/hr</p>
        </div>
      </div>

      {/* Bottom padding for sticky bar on mobile */}
      <div className="h-20 lg:hidden" />

      {/* Share Modal */}
      {showShare && <ShareModal data={shareData} onClose={() => setShowShare(false)} />}

      {/* Screen reader summary */}
      <div className="sr-only" role="status" aria-live="polite">
        Your paper hourly rate is {formatCurrency(paperRate, 2)} per hour. Your true hourly rate is {formatCurrency(trueRate, 2)} per hour, which is {percentDrop.toFixed(1)}% less. You spend {totalWeeklyHrs.toFixed(1)} hours per week on work-related activities.
      </div>
    </div>
  );
}
