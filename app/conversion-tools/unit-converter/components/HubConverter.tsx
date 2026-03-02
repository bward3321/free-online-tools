"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ALL_CATEGORIES, convert, formatResult, getFormulaString, getDefaultPrecision } from "../../lib/units";
import type { CategoryDef } from "../../lib/units";
import { ALL_SPOKES } from "../../lib/spokes";

const ACCENT = "#059669";

const PRECISION_OPTIONS = [
  { label: "2 decimals", value: 2 },
  { label: "4 decimals", value: 4 },
  { label: "6 decimals", value: 6 },
  { label: "Full precision", value: -1 },
];

export default function HubConverter() {
  const [activeCat, setActiveCat] = useState<CategoryDef>(ALL_CATEGORIES[0]);
  const unitKeys = useMemo(() => Object.keys(activeCat.units), [activeCat]);

  const [fromKey, setFromKey] = useState(unitKeys[5] ?? unitKeys[0]); // foot for length
  const [toKey, setToKey] = useState(unitKeys[2] ?? unitKeys[1]); // meter for length
  const [topValue, setTopValue] = useState("1");
  const [editingField, setEditingField] = useState<"top" | "bottom">("top");
  const [precision, setPrecision] = useState(() => getDefaultPrecision(activeCat.id));
  const [copied, setCopied] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  // When category changes, reset units to first two
  const switchCategory = useCallback((cat: CategoryDef) => {
    setActiveCat(cat);
    const keys = Object.keys(cat.units);
    setFromKey(keys[0]);
    setToKey(keys[1] ?? keys[0]);
    setTopValue("1");
    setEditingField("top");
    setPrecision(getDefaultPrecision(cat.id));
  }, []);

  // Computed result
  const result = useMemo(() => {
    const val = parseFloat(topValue);
    if (isNaN(val)) return "";
    if (editingField === "top") {
      return formatResult(convert(val, fromKey, toKey, activeCat), precision, activeCat.id);
    }
    return formatResult(convert(val, toKey, fromKey, activeCat), precision, activeCat.id);
  }, [topValue, fromKey, toKey, activeCat, precision, editingField]);

  const displayTop = editingField === "top" ? topValue : result;
  const displayBottom = editingField === "top" ? result : topValue;

  const handleSwap = useCallback(() => {
    setFromKey(toKey);
    setToKey(fromKey);
    // Keep value in the top field, just swap units
  }, [fromKey, toKey]);

  const handleCopy = useCallback(() => {
    const valueToCopy = editingField === "top" ? result : topValue;
    navigator.clipboard.writeText(valueToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [result, topValue, editingField]);

  // Reference table for current unit pair
  const refTable = useMemo(() => {
    const from = activeCat.units[fromKey];
    const to = activeCat.units[toKey];
    if (!from || !to) return [];
    const values = [0.5, 1, 2, 3, 5, 10, 15, 20, 25, 50, 75, 100, 250, 500, 1000];
    return values.map((v) => ({
      from: v,
      to: formatResult(convert(v, fromKey, toKey, activeCat), precision, activeCat.id),
    }));
  }, [fromKey, toKey, activeCat, precision]);

  // Group spokes by category for popular conversions
  const spokesByCategory = useMemo(() => {
    const groups: Record<string, typeof ALL_SPOKES> = {};
    for (const s of ALL_SPOKES) {
      if (!groups[s.categoryId]) groups[s.categoryId] = [];
      groups[s.categoryId].push(s);
    }
    return groups;
  }, []);

  const formula = useMemo(() => getFormulaString(fromKey, toKey, activeCat), [fromKey, toKey, activeCat]);

  // Scroll active tab into view
  useEffect(() => {
    if (!tabsRef.current) return;
    const active = tabsRef.current.querySelector("[data-active=true]") as HTMLElement | null;
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeCat.id]);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-[900px] mx-auto px-4 py-10">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">Free Universal Unit Converter</h1>
        <p className="text-center mb-8" style={{ color: "var(--text-muted)", fontSize: "17px" }}>
          Convert between 200+ units of measurement instantly. Length, weight, temperature, volume, speed, area, digital storage, and more.
        </p>

        {/* Category tabs */}
        <div ref={tabsRef} className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
          {ALL_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCat.id;
            return (
              <button
                key={cat.id}
                data-active={isActive}
                onClick={() => switchCategory(cat)}
                className="flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
                style={{
                  backgroundColor: isActive ? ACCENT : "var(--surface)",
                  color: isActive ? "#fff" : "var(--text)",
                  border: isActive ? "none" : "1px solid var(--border)",
                }}
              >
                {cat.emoji} {cat.label}
              </button>
            );
          })}
        </div>

        {/* Converter card */}
        <div
          className="rounded-xl p-5 sm:p-6 mb-8"
          style={{ backgroundColor: "var(--surface)", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          {/* Top input */}
          <div className="flex gap-3 items-center mb-2">
            <input
              type="text"
              inputMode="decimal"
              value={displayTop}
              onChange={(e) => { setEditingField("top"); setTopValue(e.target.value); }}
              onFocus={() => { if (editingField !== "top") { setTopValue(displayTop); setEditingField("top"); } }}
              className="flex-1 rounded-lg px-4 py-3 outline-none"
              style={{
                backgroundColor: "var(--surface-alt)",
                border: "1px solid var(--border)",
                fontSize: "20px",
                color: "var(--text)",
              }}
            />
            <select
              value={fromKey}
              onChange={(e) => setFromKey(e.target.value)}
              className="rounded-lg px-3 py-3 outline-none cursor-pointer"
              style={{
                backgroundColor: "var(--surface-alt)",
                border: "1px solid var(--border)",
                fontSize: "15px",
                color: "var(--text)",
                minWidth: "140px",
              }}
            >
              {unitKeys.map((k) => (
                <option key={k} value={k}>
                  {activeCat.units[k].name} ({activeCat.units[k].abbr})
                </option>
              ))}
            </select>
          </div>

          {/* Swap button */}
          <div className="flex justify-center my-3">
            <button
              onClick={handleSwap}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
              style={{ backgroundColor: ACCENT }}
              aria-label="Swap units"
            >
              \u21C5
            </button>
          </div>

          {/* Bottom input */}
          <div className="flex gap-3 items-center mb-4">
            <input
              type="text"
              inputMode="decimal"
              value={displayBottom}
              onChange={(e) => { setEditingField("bottom"); setTopValue(e.target.value); }}
              onFocus={() => { if (editingField !== "bottom") { setTopValue(displayBottom); setEditingField("bottom"); } }}
              className="flex-1 rounded-lg px-4 py-3 outline-none"
              style={{
                backgroundColor: "var(--surface-alt)",
                border: "1px solid var(--border)",
                fontSize: "20px",
                color: "var(--text)",
              }}
            />
            <select
              value={toKey}
              onChange={(e) => setToKey(e.target.value)}
              className="rounded-lg px-3 py-3 outline-none cursor-pointer"
              style={{
                backgroundColor: "var(--surface-alt)",
                border: "1px solid var(--border)",
                fontSize: "15px",
                color: "var(--text)",
                minWidth: "140px",
              }}
            >
              {unitKeys.map((k) => (
                <option key={k} value={k}>
                  {activeCat.units[k].name} ({activeCat.units[k].abbr})
                </option>
              ))}
            </select>
          </div>

          {/* Formula + controls row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p style={{ color: "var(--text-muted)", fontSize: "14px", fontFamily: "monospace" }}>
              {formula}
            </p>
            <div className="flex items-center gap-2">
              <select
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value))}
                className="rounded-lg px-2 py-1 text-sm outline-none cursor-pointer"
                style={{
                  backgroundColor: "var(--surface-alt)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  fontSize: "13px",
                }}
              >
                {PRECISION_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <button
                onClick={handleCopy}
                className="rounded-lg px-3 py-1 text-sm"
                style={{
                  backgroundColor: copied ? ACCENT : "var(--surface-alt)",
                  color: copied ? "#fff" : "var(--text-muted)",
                  border: "1px solid var(--border)",
                  fontSize: "13px",
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Reference Table */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">
            Quick Reference: {activeCat.units[fromKey]?.name} to {activeCat.units[toKey]?.name}
          </h2>
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: ACCENT, color: "#fff" }}>
                  <th className="px-4 py-3 text-left font-semibold">{activeCat.units[fromKey]?.name} ({activeCat.units[fromKey]?.abbr})</th>
                  <th className="px-4 py-3 text-right font-semibold">{activeCat.units[toKey]?.name} ({activeCat.units[toKey]?.abbr})</th>
                </tr>
              </thead>
              <tbody>
                {refTable.map((row, i) => (
                  <tr key={row.from} style={{ backgroundColor: i % 2 === 0 ? "var(--surface)" : "var(--surface-alt)" }}>
                    <td className="px-4 py-2 tabular-nums">{row.from}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{row.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Popular Conversions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Conversions</h2>
          {ALL_CATEGORIES.map((cat) => {
            const spokes = spokesByCategory[cat.id];
            if (!spokes || spokes.length === 0) return null;
            return (
              <div key={cat.id} className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{cat.emoji} {cat.label}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {spokes.map((s) => {
                    const catDef = ALL_CATEGORIES.find((c) => c.id === s.categoryId);
                    const fromAbbr = catDef?.units[s.fromKey]?.abbr ?? "";
                    const toAbbr = catDef?.units[s.toKey]?.abbr ?? "";
                    return (
                      <a
                        key={s.slug}
                        href={`/conversion-tools/${s.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm hover:shadow-md"
                        style={{
                          backgroundColor: "var(--surface)",
                          border: "1px solid var(--border)",
                          color: "var(--text)",
                        }}
                      >
                        <span className="font-medium">{fromAbbr}</span>
                        <span style={{ color: ACCENT }}> → </span>
                        <span className="font-medium">{toAbbr}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* SEO Content */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About This Unit Converter</h2>
          <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
            <p>This free universal unit converter handles over 200 units of measurement across 11 categories: length, weight & mass, temperature, volume, speed, area, digital storage, time, energy, pressure, and fuel economy. Every conversion happens instantly as you type — no &ldquo;calculate&rdquo; button needed.</p>
            <p>All calculations run entirely in your browser. Nothing is sent to a server, so your data stays private. The converter handles edge cases like temperature (which uses formulas, not simple multiplication) and fuel economy (where L/100km has an inverse relationship with MPG).</p>
            <p>Need a specific conversion? Check out our 50+ dedicated converter pages, each with reference tables, formulas, real-world examples, and detailed explanations. They&apos;re linked in the Popular Conversions grid above.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "How accurate is this converter?", a: "All conversions use the internationally agreed-upon exact definitions where available (e.g., 1 inch = exactly 2.54 cm, 1 pound = exactly 0.45359237 kg). Results are accurate to the full precision of JavaScript floating-point arithmetic." },
              { q: "Does this tool work offline?", a: "Yes. Once the page has loaded, all calculations happen in your browser using JavaScript. No internet connection or server calls are needed for conversions." },
              { q: "Why are temperature conversions different from other units?", a: "Most unit conversions use simple multiplication (e.g., feet \u00D7 0.3048 = meters). Temperature scales have different zero points, so the conversion requires both multiplication AND addition. For example, \u00B0F = (\u00B0C \u00D7 9/5) + 32." },
              { q: "What is the difference between MB and MiB (or GB and GiB)?", a: "MB (megabyte) uses the decimal system: 1 MB = 1,000,000 bytes. MiB (mebibyte) uses the binary system: 1 MiB = 1,048,576 bytes. Storage manufacturers use MB/GB/TB, while operating systems often use MiB/GiB/TiB, which is why your hard drive appears smaller than advertised." },
              { q: "Can I convert between different categories (e.g., length to weight)?", a: "No, conversions between different physical quantities (length, mass, temperature, etc.) are not possible because they measure fundamentally different things. You can only convert between units within the same category." },
            ].map((faq) => (
              <details key={faq.q} className="rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <summary className="p-4 cursor-pointer font-semibold">{faq.q}</summary>
                <p className="px-4 pb-4" style={{ fontSize: "16px", color: "var(--text-muted)" }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">More Free Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ["Concrete Calculator", "/construction/concrete-calculator", "Calculate concrete needed for your project"],
              ["Meeting Cost Calculator", "/business-tools/meeting-cost-calculator", "Find out what that meeting really costs"],
              ["Password Generator", "/utility-tools/password-generator", "Generate strong, secure passwords"],
              ["Word Counter", "/writing-tools/word-counter", "Count words, characters & reading time"],
            ].map(([name, href, desc]) => (
              <a key={name} href={href} className="block rounded-xl border p-4 hover:shadow-md" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <h3 className="font-semibold mb-1">{name}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>{desc}</p>
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
