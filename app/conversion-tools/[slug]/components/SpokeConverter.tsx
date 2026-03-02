"use client";

import { useState, useCallback, useMemo } from "react";
import { convert, formatResult, getFormulaString, getDefaultPrecision, getCategoryById } from "../../lib/units";
import type { SpokeData } from "../../lib/spokes";

const ACCENT = "#059669";

const PRECISION_OPTIONS = [
  { label: "2 decimals", value: 2 },
  { label: "4 decimals", value: 4 },
  { label: "6 decimals", value: 6 },
  { label: "Full precision", value: -1 },
];

export default function SpokeConverter({ spoke }: { spoke: SpokeData }) {
  const cat = getCategoryById(spoke.categoryId)!;
  const fromUnit = cat.units[spoke.fromKey];
  const toUnit = cat.units[spoke.toKey];

  const [topValue, setTopValue] = useState("1");
  const [editingField, setEditingField] = useState<"top" | "bottom">("top");
  const [precision, setPrecision] = useState(() => getDefaultPrecision(cat.id));
  const [copied, setCopied] = useState(false);
  const [fromKey, setFromKey] = useState(spoke.fromKey);
  const [toKey, setToKey] = useState(spoke.toKey);

  const currentFrom = cat.units[fromKey];
  const currentTo = cat.units[toKey];

  const result = useMemo(() => {
    const val = parseFloat(topValue);
    if (isNaN(val)) return "";
    if (editingField === "top") {
      return formatResult(convert(val, fromKey, toKey, cat), precision, cat.id);
    }
    return formatResult(convert(val, toKey, fromKey, cat), precision, cat.id);
  }, [topValue, fromKey, toKey, cat, precision, editingField]);

  const displayTop = editingField === "top" ? topValue : result;
  const displayBottom = editingField === "top" ? result : topValue;

  const handleSwap = useCallback(() => {
    setFromKey((prev) => {
      const old = prev;
      setToKey(old);
      return toKey;
    });
  }, [toKey]);

  const handleCopy = useCallback(() => {
    const v = editingField === "top" ? result : topValue;
    navigator.clipboard.writeText(v).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [result, topValue, editingField]);

  const formula = useMemo(() => getFormulaString(fromKey, toKey, cat), [fromKey, toKey, cat]);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-[800px] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}>
          <a href="/" style={{ color: ACCENT }} className="hover:underline">Home</a>
          <span className="mx-2">&gt;</span>
          <a href="/conversion-tools/unit-converter" style={{ color: ACCENT }} className="hover:underline">Conversion Tools</a>
          <span className="mx-2">&gt;</span>
          <span>{spoke.h1.split(" \u2014")[0]}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold mb-6">{spoke.h1}</h1>

        {/* Converter card */}
        <div className="rounded-xl p-5 sm:p-6 mb-8" style={{ backgroundColor: "var(--surface)", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          {/* Top */}
          <div className="flex gap-3 items-center mb-2">
            <input
              type="text"
              inputMode="decimal"
              value={displayTop}
              onChange={(e) => { setEditingField("top"); setTopValue(e.target.value); }}
              onFocus={() => { if (editingField !== "top") { setTopValue(displayTop); setEditingField("top"); } }}
              className="flex-1 rounded-lg px-4 py-3 outline-none"
              style={{ backgroundColor: "var(--surface-alt)", border: "1px solid var(--border)", fontSize: "20px", color: "var(--text)" }}
            />
            <span className="font-medium whitespace-nowrap" style={{ color: "var(--text-muted)", minWidth: "80px", fontSize: "15px" }}>
              {currentFrom.name} ({currentFrom.abbr})
            </span>
          </div>

          <div className="flex justify-center my-3">
            <button
              onClick={handleSwap}
              className="rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: ACCENT, width: "44px", height: "44px" }}
              aria-label="Swap units"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
            </button>
          </div>

          <div className="flex gap-3 items-center mb-4">
            <input
              type="text"
              inputMode="decimal"
              value={displayBottom}
              onChange={(e) => { setEditingField("bottom"); setTopValue(e.target.value); }}
              onFocus={() => { if (editingField !== "bottom") { setTopValue(displayBottom); setEditingField("bottom"); } }}
              className="flex-1 rounded-lg px-4 py-3 outline-none"
              style={{ backgroundColor: "var(--surface-alt)", border: "1px solid var(--border)", fontSize: "20px", color: "var(--text)" }}
            />
            <span className="font-medium whitespace-nowrap" style={{ color: "var(--text-muted)", minWidth: "80px", fontSize: "15px" }}>
              {currentTo.name} ({currentTo.abbr})
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p style={{ color: "var(--text-muted)", fontSize: "15px", fontFamily: "monospace" }}>{formula}</p>
            <div className="flex items-center gap-2">
              <select
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value))}
                className="rounded-lg px-2 py-1 outline-none cursor-pointer"
                style={{ backgroundColor: "var(--surface-alt)", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "15px" }}
              >
                {PRECISION_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <button
                onClick={handleCopy}
                className="rounded-lg px-3 py-1"
                style={{ backgroundColor: copied ? ACCENT : "var(--surface-alt)", color: copied ? "#fff" : "var(--text-muted)", border: "1px solid var(--border)", fontSize: "16px" }}
              >
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Answer Box */}
        <section className="mb-8 rounded-xl p-5" style={{ backgroundColor: "#ecfdf5", borderLeft: `4px solid ${ACCENT}` }}>
          <div className="dark-override" style={{ color: "#065f46" }}>
            <h2 className="font-semibold mb-3" style={{ fontSize: "20px" }}>Common {fromUnit.name} to {toUnit.name} Conversions</h2>
            <ul className="space-y-1">
              {spoke.quickAnswers.map((a) => (
                <li key={a} style={{ fontSize: "16px" }}>{a}</li>
              ))}
            </ul>
          </div>
          <style>{`.dark .dark-override { color: #a7f3d0 !important; } .dark section[style*="ecfdf5"] { background-color: rgba(6,78,59,0.2) !important; }`}</style>
        </section>

        {/* Reference Table */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">{fromUnit.name} to {toUnit.name} Reference Table</h2>
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full" style={{ fontSize: "16px" }}>
              <thead>
                <tr style={{ backgroundColor: ACCENT, color: "#fff" }}>
                  <th className="px-4 py-3 text-left font-semibold">{fromUnit.name} ({fromUnit.abbr})</th>
                  <th className="px-4 py-3 text-right font-semibold">{toUnit.name} ({toUnit.abbr})</th>
                </tr>
              </thead>
              <tbody>
                {spoke.referenceTable.map(([from, to], i) => (
                  <tr key={String(from)} style={{ backgroundColor: i % 2 === 0 ? "var(--surface)" : "var(--surface-alt)" }}>
                    <td className="px-4 py-2 tabular-nums">{from}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Formula Explanation */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How to Convert {fromUnit.name} to {toUnit.name}</h2>
          <div className="rounded-xl border p-5 space-y-3" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
            <p>{spoke.formulaExplanation}</p>
            <p className="font-semibold" style={{ fontFamily: "monospace", color: "var(--text)" }}>{formula}</p>
            {spoke.workedExamples.map((ex) => (
              <p key={ex}>{ex}</p>
            ))}
            <p>{spoke.reverseNote}</p>
          </div>
        </section>

        {/* Real-world comparisons */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Real-World Comparisons</h2>
          <div className="rounded-xl border p-5 space-y-2" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
            {spoke.comparisons.map((c) => (
              <p key={c.text}>\u2022 {c.text}</p>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="mb-8">
          <div className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
            <div dangerouslySetInnerHTML={{ __html: spoke.seoContent }} />
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {spoke.faq.map((f) => (
              <details key={f.q} className="rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <summary className="p-4 cursor-pointer font-semibold">{f.q}</summary>
                <p className="px-4 pb-4" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Conversions */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Related Conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {spoke.relatedSlugs.map((slug) => {
              const label = slug
                .split("-to-")
                .map((p) => p.replace(/-/g, " "))
                .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
                .join(" to ");
              return (
                <a
                  key={slug}
                  href={`/conversion-tools/${slug}`}
                  className="block rounded-xl border p-3 font-medium hover:shadow-md"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)", fontSize: "16px" }}
                >
                  {label} <span style={{ color: ACCENT }}>&rarr;</span>
                </a>
              );
            })}
          </div>
        </section>

        {/* More Free Tools */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">More Free Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ["Concrete Calculator", "/construction/concrete-calculator", "Calculate concrete needed for your project"],
              ["Meeting Cost Calculator", "/business-tools/meeting-cost-calculator", "Find out what that meeting really costs"],
              ["Password Generator", "/utility-tools/password-generator", "Generate strong, secure passwords"],
              ["Word Counter", "/writing-tools/word-counter", "Count words, characters & reading time"],
            ].map(([name, href, desc]) => (
              <a key={name} href={href} className="block rounded-xl border p-4 hover:shadow-md" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="font-semibold mb-1">{name}</h3>
                <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-6 pb-8 border-t" style={{ borderColor: "var(--border)", color: "var(--text-muted)", fontSize: "14px" }}>
          <p>&copy; {new Date().getFullYear()} <a href="/" style={{ color: ACCENT }} className="hover:underline">EveryFreeTool.com</a> &mdash; Free tools, no signup, no nonsense.</p>
        </footer>
      </div>
    </div>
  );
}
