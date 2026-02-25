"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ShapeType,
  Unit,
  calcSlabVolumeCuFt,
  calcWallVolumeCuFt,
  calcColumnVolumeCuFt,
  calcCircularSlabVolumeCuFt,
  calcStairsVolumeCuFt,
  calcCurbVolumeCuFt,
  cuFtToCuYd,
  cuFtToCuM,
  bagsNeeded,
  weightLbs,
  lbsToKg,
  formatNumber,
  formatInt,
} from "../calculations";
import ShapePreview from "./ShapePreview";

// ---------- TYPES ----------

interface FieldValue {
  value: number;
  unit: Unit;
}

interface SectionState {
  id: number;
  shape: ShapeType;
  fields: Record<string, FieldValue>;
  collapsed: boolean;
}

// ---------- SHAPE CONFIGS ----------

const SHAPES: {
  id: ShapeType;
  label: string;
  icon: string;
}[] = [
  { id: "slab", label: "Slab", icon: "M2 14h20v4H2z M2 14l4-4h20l-4 4" },
  { id: "wall", label: "Wall / Footing", icon: "M4 4h4v16H4z M4 4l2-2h4l-2 2" },
  { id: "column", label: "Column (Round)", icon: "M12 4a4 4 0 100 16 4 4 0 000-16z" },
  { id: "circular-slab", label: "Circular Slab", icon: "M12 8a8 3 0 100 6 8 3 0 000-6z" },
  { id: "stairs", label: "Stairs", icon: "M4 18h4v-4h4v-4h4v-4h4v16H4z" },
  { id: "curb", label: "Curb & Gutter", icon: "M2 18h6v-8h2v4h10v4H2z" },
];

const UNIT_OPTIONS: { value: Unit; label: string }[] = [
  { value: "ft", label: "ft" },
  { value: "in", label: "in" },
  { value: "yd", label: "yd" },
  { value: "m", label: "m" },
  { value: "cm", label: "cm" },
];

function getDefaultFields(shape: ShapeType): Record<string, FieldValue> {
  switch (shape) {
    case "slab":
      return {
        length: { value: 10, unit: "ft" },
        width: { value: 10, unit: "ft" },
        thickness: { value: 4, unit: "in" },
        quantity: { value: 1, unit: "ft" },
      };
    case "wall":
      return {
        length: { value: 8, unit: "ft" },
        height: { value: 4, unit: "ft" },
        thickness: { value: 8, unit: "in" },
        quantity: { value: 1, unit: "ft" },
      };
    case "column":
      return {
        diameter: { value: 12, unit: "in" },
        height: { value: 4, unit: "ft" },
        quantity: { value: 1, unit: "ft" },
      };
    case "circular-slab":
      return {
        diameter: { value: 10, unit: "ft" },
        thickness: { value: 4, unit: "in" },
        quantity: { value: 1, unit: "ft" },
      };
    case "stairs":
      return {
        run: { value: 10, unit: "in" },
        rise: { value: 7, unit: "in" },
        width: { value: 3, unit: "ft" },
        steps: { value: 4, unit: "ft" },
        platformDepth: { value: 3, unit: "ft" },
      };
    case "curb":
      return {
        curbDepth: { value: 6, unit: "in" },
        gutterWidth: { value: 12, unit: "in" },
        curbHeight: { value: 18, unit: "in" },
        flagThickness: { value: 4, unit: "in" },
        length: { value: 10, unit: "ft" },
        quantity: { value: 1, unit: "ft" },
      };
  }
}

function getFieldConfigs(
  shape: ShapeType
): { key: string; label: string; placeholder: string; noUnit?: boolean }[] {
  switch (shape) {
    case "slab":
      return [
        { key: "length", label: "Length", placeholder: "10" },
        { key: "width", label: "Width", placeholder: "10" },
        { key: "thickness", label: "Thickness", placeholder: "4" },
        { key: "quantity", label: "Quantity", placeholder: "1", noUnit: true },
      ];
    case "wall":
      return [
        { key: "length", label: "Length", placeholder: "8" },
        { key: "height", label: "Height", placeholder: "4" },
        { key: "thickness", label: "Thickness", placeholder: "8" },
        { key: "quantity", label: "Quantity", placeholder: "1", noUnit: true },
      ];
    case "column":
      return [
        { key: "diameter", label: "Diameter", placeholder: "12" },
        { key: "height", label: "Height", placeholder: "4" },
        { key: "quantity", label: "Quantity", placeholder: "1", noUnit: true },
      ];
    case "circular-slab":
      return [
        { key: "diameter", label: "Diameter", placeholder: "10" },
        { key: "thickness", label: "Thickness", placeholder: "4" },
        { key: "quantity", label: "Quantity", placeholder: "1", noUnit: true },
      ];
    case "stairs":
      return [
        { key: "run", label: "Run (Tread Depth)", placeholder: "10" },
        { key: "rise", label: "Rise (Step Height)", placeholder: "7" },
        { key: "width", label: "Width", placeholder: "3" },
        { key: "steps", label: "Number of Steps", placeholder: "4", noUnit: true },
        { key: "platformDepth", label: "Platform Depth", placeholder: "3" },
      ];
    case "curb":
      return [
        { key: "curbDepth", label: "Curb Depth", placeholder: "6" },
        { key: "gutterWidth", label: "Gutter Width", placeholder: "12" },
        { key: "curbHeight", label: "Curb Height", placeholder: "18" },
        { key: "flagThickness", label: "Flag Thickness", placeholder: "4" },
        { key: "length", label: "Length", placeholder: "10" },
        { key: "quantity", label: "Quantity", placeholder: "1", noUnit: true },
      ];
  }
}

// ---------- CALCULATION ----------

function calculateVolumeCuFt(shape: ShapeType, fields: Record<string, FieldValue>): number {
  const f = fields;
  switch (shape) {
    case "slab":
      return calcSlabVolumeCuFt(
        f.length.value, f.length.unit,
        f.width.value, f.width.unit,
        f.thickness.value, f.thickness.unit,
        f.quantity.value
      );
    case "wall":
      return calcWallVolumeCuFt(
        f.length.value, f.length.unit,
        f.height.value, f.height.unit,
        f.thickness.value, f.thickness.unit,
        f.quantity.value
      );
    case "column":
      return calcColumnVolumeCuFt(
        f.diameter.value, f.diameter.unit,
        f.height.value, f.height.unit,
        f.quantity.value
      );
    case "circular-slab":
      return calcCircularSlabVolumeCuFt(
        f.diameter.value, f.diameter.unit,
        f.thickness.value, f.thickness.unit,
        f.quantity.value
      );
    case "stairs":
      return calcStairsVolumeCuFt(
        f.run.value, f.run.unit,
        f.rise.value, f.rise.unit,
        f.width.value, f.width.unit,
        f.steps.value,
        f.platformDepth.value, f.platformDepth.unit
      );
    case "curb":
      return calcCurbVolumeCuFt(
        f.curbDepth.value, f.curbDepth.unit,
        f.gutterWidth.value, f.gutterWidth.unit,
        f.curbHeight.value, f.curbHeight.unit,
        f.flagThickness.value, f.flagThickness.unit,
        f.length.value, f.length.unit,
        f.quantity.value
      );
  }
}

// ---------- COMPONENTS ----------

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
    <button
      onClick={toggle}
      className="p-2 rounded-lg transition-colors"
      style={{ color: "var(--text-muted)" }}
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

function InputField({
  label,
  value,
  unit,
  placeholder,
  noUnit,
  onValueChange,
  onUnitChange,
}: {
  label: string;
  value: number;
  unit: Unit;
  placeholder: string;
  noUnit?: boolean;
  onValueChange: (v: number) => void;
  onUnitChange: (u: Unit) => void;
}) {
  return (
    <div>
      <label
        className="block text-sm font-medium mb-1.5"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
          className="flex-1 px-3 py-2.5 rounded-xl border text-base outline-none transition-all focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
        {!noUnit && (
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value as Unit)}
            className="px-2 py-2.5 rounded-xl border text-sm outline-none cursor-pointer transition-all focus:ring-2 focus:ring-[var(--color-accent)]/30"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            {UNIT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

function ResultsPanel({
  cuFt,
  includeWaste,
  setIncludeWaste,
}: {
  cuFt: number;
  includeWaste: boolean;
  setIncludeWaste: (v: boolean) => void;
}) {
  const [costMode, setCostMode] = useState<"bags" | "readymix">("bags");
  const [bagPrice, setBagPrice] = useState(6.5);
  const [yardPrice, setYardPrice] = useState(150);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [copied, setCopied] = useState(false);

  const effectiveCuFt = includeWaste ? cuFt * 1.1 : cuFt;
  const cuYd = cuFtToCuYd(effectiveCuFt);
  const cuM = cuFtToCuM(effectiveCuFt);
  const bags40 = bagsNeeded(cuYd, 40);
  const bags60 = bagsNeeded(cuYd, 60);
  const bags80 = bagsNeeded(cuYd, 80);
  const wt = weightLbs(effectiveCuFt);
  const wtKg = lbsToKg(wt);

  const bagCost = bags80 * bagPrice;
  const readymixCost = cuYd * yardPrice + deliveryFee;

  const copyResults = () => {
    const text = `Concrete Calculator Results: ${formatNumber(cuYd)} yd\u00B3 (${bags80} bags of 80lb) \u2014 Estimated cost: $${formatNumber(bagCost)}${includeWaste ? " (includes 10% waste)" : ""}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (cuFt <= 0) return null;

  return (
    <div
      className="rounded-2xl border p-6 md:p-8 space-y-6"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Primary Result */}
      <div className="text-center">
        <div className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>
          You need
        </div>
        <div className="text-4xl md:text-5xl font-bold tabular-nums" style={{ color: "var(--color-accent)" }}>
          {formatNumber(cuYd)} <span className="text-2xl">yd&sup3;</span>
        </div>
        <div className="text-sm mt-2 tabular-nums" style={{ color: "var(--text-muted)" }}>
          {formatNumber(effectiveCuFt)} ft&sup3; &bull; {formatNumber(cuM)} m&sup3;
        </div>
      </div>

      {/* Waste Toggle */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setIncludeWaste(!includeWaste)}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          style={{
            backgroundColor: includeWaste ? "var(--color-accent)" : "var(--border)",
          }}
          role="switch"
          aria-checked={includeWaste}
        >
          <span
            className="inline-block h-4 w-4 rounded-full bg-white transition-transform"
            style={{
              transform: includeWaste ? "translateX(24px)" : "translateX(4px)",
            }}
          />
        </button>
        <span className="text-sm" style={{ color: "var(--text)" }}>
          Add 10% for waste and spillage
        </span>
        <div className="group relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)" }}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10" style={{ backgroundColor: "var(--text)", color: "var(--bg)" }}>
            Most contractors recommend 10% extra
          </div>
        </div>
      </div>

      {/* Bags Needed */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
          Bags Needed
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { size: 40 as const, count: bags40 },
            { size: 60 as const, count: bags60 },
            { size: 80 as const, count: bags80, recommended: true },
          ].map(({ size, count, recommended }) => (
            <div
              key={size}
              className="text-center p-4 rounded-xl border relative"
              style={{
                backgroundColor: recommended ? "var(--color-accent)" + "0D" : "var(--surface-alt)",
                borderColor: recommended ? "var(--color-accent)" + "33" : "var(--border)",
              }}
            >
              {recommended && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-accent)", color: "white" }}>
                  Popular
                </span>
              )}
              <div className="text-2xl font-bold tabular-nums" style={{ color: "var(--text)" }}>
                {formatInt(count)}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {size} lb bags
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          Based on standard yield: 40lb = 0.011 yd&sup3;, 60lb = 0.017 yd&sup3;, 80lb = 0.022 yd&sup3;
        </p>
      </div>

      {/* Cost Estimator */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
          Estimated Cost
        </h3>
        <div className="flex gap-1 mb-4 p-1 rounded-xl" style={{ backgroundColor: "var(--surface-alt)" }}>
          {(["bags", "readymix"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setCostMode(mode)}
              className="flex-1 text-sm font-medium py-2 rounded-lg transition-all"
              style={{
                backgroundColor: costMode === mode ? "var(--surface)" : "transparent",
                color: costMode === mode ? "var(--text)" : "var(--text-muted)",
                boxShadow: costMode === mode ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {mode === "bags" ? "Bags" : "Ready-Mix"}
            </button>
          ))}
        </div>

        {costMode === "bags" ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                Price per 80lb bag:
              </label>
              <div className="relative flex-1 max-w-[120px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={bagPrice}
                  onChange={(e) => setBagPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ backgroundColor: "var(--surface-alt)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>
            </div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: "var(--text)" }}>
              ${formatNumber(bagCost)}
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Prices based on average US retail. Edit to match your local prices.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                Price per yd&sup3;:
              </label>
              <div className="relative flex-1 max-w-[120px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={yardPrice}
                  onChange={(e) => setYardPrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ backgroundColor: "var(--surface-alt)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                Delivery fee:
              </label>
              <div className="relative flex-1 max-w-[120px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--text-muted)" }}>$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ backgroundColor: "var(--surface-alt)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>
            </div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: "var(--text)" }}>
              ${formatNumber(readymixCost)}
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Ready-mix is recommended for orders over 1 cubic yard.
            </p>
          </div>
        )}
      </div>

      {/* Weight */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <div>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>Total weight: </span>
          <span className="font-semibold tabular-nums" style={{ color: "var(--text)" }}>
            {formatInt(wt)} lbs
          </span>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {" "}({formatInt(wtKg)} kg)
          </span>
        </div>
        <button
          onClick={copyResults}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors hover:opacity-80"
          style={{
            borderColor: "var(--border)",
            color: copied ? "var(--color-accent)" : "var(--text-muted)",
          }}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              Copied
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
              Copy Results
            </>
          )}
        </button>
      </div>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        Based on standard concrete density of 150 lbs/ft&sup3;
      </p>
    </div>
  );
}

// ---------- MULTI-SECTION ----------

function MiniSection({
  section,
  onUpdate,
  onDelete,
  onToggle,
}: {
  section: SectionState;
  onUpdate: (fields: Record<string, FieldValue>, shape: ShapeType) => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const cuFt = calculateVolumeCuFt(section.shape, section.fields);
  const cuYd = cuFtToCuYd(cuFt);
  const fieldConfigs = getFieldConfigs(section.shape);

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              color: "var(--text-muted)",
              transform: section.collapsed ? "rotate(-90deg)" : "rotate(0deg)",
              transition: "transform 200ms",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span className="font-medium" style={{ color: "var(--text)" }}>
            {SHAPES.find((s) => s.id === section.shape)?.label}
          </span>
          <span className="text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>
            {formatNumber(cuYd)} yd&sup3;
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-muted)" }}
          aria-label="Delete section"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>

      {!section.collapsed && (
        <div className="px-4 pb-4 space-y-4">
          {/* Shape selector */}
          <div className="flex flex-wrap gap-1.5">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                onClick={() => onUpdate(getDefaultFields(s.id), s.id)}
                className="px-3 py-1.5 text-xs rounded-lg transition-all font-medium"
                style={{
                  backgroundColor:
                    section.shape === s.id
                      ? "var(--color-accent)"
                      : "var(--surface-alt)",
                  color:
                    section.shape === s.id ? "white" : "var(--text-muted)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-3">
            {fieldConfigs.map((fc) => (
              <InputField
                key={fc.key}
                label={fc.label}
                value={section.fields[fc.key]?.value || 0}
                unit={section.fields[fc.key]?.unit || "ft"}
                placeholder={fc.placeholder}
                noUnit={fc.noUnit}
                onValueChange={(v) =>
                  onUpdate(
                    {
                      ...section.fields,
                      [fc.key]: { ...section.fields[fc.key], value: v },
                    },
                    section.shape
                  )
                }
                onUnitChange={(u) =>
                  onUpdate(
                    {
                      ...section.fields,
                      [fc.key]: { ...section.fields[fc.key], unit: u },
                    },
                    section.shape
                  )
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- PRO TIPS ----------

function getProTips(shape: ShapeType): string[] {
  switch (shape) {
    case "slab":
      return [
        "Standard residential slab thickness is 4 inches. Use 5-6 inches for driveways and garage floors.",
        "For slabs over 1 cubic yard, ordering ready-mix is more cost-effective than mixing bags.",
        "Add wire mesh or rebar reinforcement for slabs larger than 8\u00d78 feet.",
        "Concrete reaches 90% of its strength in 28 days. Keep it moist for the first 7 days for best results.",
        "Always compact and level your sub-base before pouring. A 4-inch gravel base is standard.",
      ];
    case "wall":
      return [
        "Footings should be at least twice the width of the wall they support.",
        "Standard wall thickness for most residential walls is 8 inches.",
        "Use vertical rebar every 4 feet for structural walls taller than 4 feet.",
        "Pour walls in continuous sections to avoid cold joints that weaken the structure.",
        "Foundation walls should extend below the frost line in your area.",
      ];
    case "column":
      return [
        "Post hole depth should be 1/3 of total post length (e.g., 2 feet deep for a 6-foot post).",
        "Use Sonotube forms for clean, round columns with consistent dimensions.",
        "Set anchor bolts while concrete is still wet for secure post mounting.",
        "Column diameter should be at least 3 times the post width for adequate support.",
      ];
    case "circular-slab":
      return [
        "Use a stake and string to mark a perfect circle before excavating.",
        "Circular slabs work well for fire pit pads, round patios, and decorative pads.",
        "Consider stamping or staining for a decorative finish on circular patio slabs.",
        "A 4-inch thickness is standard for pedestrian traffic; use 6 inches for vehicle loads.",
      ];
    case "stairs":
      return [
        "Standard residential rise is 7-7.75 inches and run is 10-11 inches per building code.",
        "All steps must be uniform height — uneven steps are a tripping hazard and code violation.",
        "Pour stairs as a single monolithic unit for maximum strength.",
        "Add a broom finish to treads for slip resistance, especially for outdoor stairs.",
        "Include a 2% slope on treads for water drainage on exterior stairs.",
      ];
    case "curb":
      return [
        "Standard curb height is 6 inches above the gutter surface.",
        "Use flexible forms for curved curb sections.",
        "Apply curing compound immediately after finishing for best durability.",
        "Expansion joints should be placed every 10 feet for curb runs.",
      ];
  }
}

// ---------- MAIN CALCULATOR ----------

export default function Calculator() {
  const [shape, setShape] = useState<ShapeType>("slab");
  const [fields, setFields] = useState<Record<string, FieldValue>>(
    getDefaultFields("slab")
  );
  const [includeWaste, setIncludeWaste] = useState(false);
  const [sections, setSections] = useState<SectionState[]>([]);
  let nextId = sections.length > 0 ? Math.max(...sections.map((s) => s.id)) + 1 : 1;

  const changeShape = useCallback((s: ShapeType) => {
    setShape(s);
    setFields(getDefaultFields(s));
  }, []);

  const updateField = useCallback(
    (key: string, value: number) => {
      setFields((prev) => ({
        ...prev,
        [key]: { ...prev[key], value },
      }));
    },
    []
  );

  const updateUnit = useCallback(
    (key: string, unit: Unit) => {
      setFields((prev) => ({
        ...prev,
        [key]: { ...prev[key], unit },
      }));
    },
    []
  );

  const cuFt = calculateVolumeCuFt(shape, fields);
  const fieldConfigs = getFieldConfigs(shape);
  const tips = getProTips(shape);

  // Multi-section
  const addSection = () => {
    if (sections.length >= 10) return;
    setSections((prev) => [
      ...prev,
      {
        id: nextId,
        shape: "slab",
        fields: getDefaultFields("slab"),
        collapsed: false,
      },
    ]);
  };

  const totalCuFt =
    cuFt +
    sections.reduce(
      (sum, s) => sum + calculateVolumeCuFt(s.shape, s.fields),
      0
    );
  const totalWithWaste = includeWaste ? totalCuFt * 1.1 : totalCuFt;
  const totalCuYd = cuFtToCuYd(totalWithWaste);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-[1100px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: "var(--text)" }}
            >
              Free Concrete Calculator
            </h1>
            <p className="text-base md:text-lg" style={{ color: "var(--text-muted)" }}>
              Calculate exactly how much concrete you need for any project
            </p>
          </div>
          <DarkModeToggle />
        </div>

        {/* Shape Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SHAPES.map((s) => (
            <button
              key={s.id}
              onClick={() => changeShape(s.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  shape === s.id ? "var(--color-accent)" : "var(--surface)",
                color: shape === s.id ? "white" : "var(--text)",
                borderWidth: "1px",
                borderColor:
                  shape === s.id ? "var(--color-accent)" : "var(--border)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d={s.icon} />
              </svg>
              {s.label}
            </button>
          ))}
        </div>

        {/* Main Calculator Area */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Shape Preview (shows first on mobile) */}
          <div className="md:col-span-2 md:order-2">
            <ShapePreview shape={shape} dims={fields} />
          </div>

          {/* Input Fields */}
          <div className="md:col-span-3 md:order-1">
            <div
              className="rounded-2xl border p-6 space-y-4"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                Dimensions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fieldConfigs.map((fc) => (
                  <InputField
                    key={fc.key}
                    label={fc.label}
                    value={fields[fc.key]?.value || 0}
                    unit={fields[fc.key]?.unit || "ft"}
                    placeholder={fc.placeholder}
                    noUnit={fc.noUnit}
                    onValueChange={(v) => updateField(fc.key, v)}
                    onUnitChange={(u) => updateUnit(fc.key, u)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <ResultsPanel
            cuFt={cuFt}
            includeWaste={includeWaste}
            setIncludeWaste={setIncludeWaste}
          />
        </div>

        {/* Multi-Section Builder */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              Need to calculate multiple sections?
            </h2>
          </div>

          {sections.length > 0 && (
            <div className="space-y-3 mb-4">
              {sections.map((s, i) => (
                <MiniSection
                  key={s.id}
                  section={s}
                  onUpdate={(newFields, newShape) =>
                    setSections((prev) =>
                      prev.map((sec) =>
                        sec.id === s.id
                          ? { ...sec, fields: newFields, shape: newShape }
                          : sec
                      )
                    )
                  }
                  onDelete={() =>
                    setSections((prev) => prev.filter((sec) => sec.id !== s.id))
                  }
                  onToggle={() =>
                    setSections((prev) =>
                      prev.map((sec) =>
                        sec.id === s.id
                          ? { ...sec, collapsed: !sec.collapsed }
                          : sec
                      )
                    )
                  }
                />
              ))}

              {/* Combined Total */}
              <div
                className="rounded-xl border p-4 text-center"
                style={{
                  backgroundColor: "var(--color-accent)" + "0D",
                  borderColor: "var(--color-accent)" + "33",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                  Combined Total:{" "}
                </span>
                <span className="text-lg font-bold tabular-nums" style={{ color: "var(--color-accent)" }}>
                  {formatNumber(totalCuYd)} yd&sup3;
                </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {" "}&bull; {formatInt(bagsNeeded(totalCuYd, 80))} bags (80lb)
                </span>
              </div>
            </div>
          )}

          {sections.length < 10 && (
            <button
              onClick={addSection}
              className="w-full py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-all hover:opacity-80"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              + Add Another Section
            </button>
          )}
        </div>

        {/* Pro Tips */}
        <div className="mb-12">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--text)" }}
          >
            Pro Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--color-accent)" }}
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mb-12">
          <div
            className="rounded-2xl border p-6 md:p-8"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--text)" }}
            >
              How to Calculate Concrete for Your Project
            </h2>

            <div
              className="prose max-w-none space-y-4 text-sm leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              <p>
                Calculating the right amount of concrete is essential for any construction project. Too little means a second trip to the store or an additional delivery; too much means wasted money and material. The basic formula is simple: multiply length by width by thickness to get volume, then convert to cubic yards (the standard ordering unit in the US).
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Common Project Examples</h3>
              <p>
                <strong>10&times;10 patio slab (4 inches thick):</strong> 10 &times; 10 &times; 0.333 = 33.3 cubic feet = 1.23 cubic yards. You would need about 56 bags of 80lb concrete mix, or roughly one cubic yard of ready-mix.
              </p>
              <p>
                <strong>Fence post holes (8 posts, 12&Prime; diameter, 3 feet deep):</strong> Each post needs about 0.087 cubic yards. Total for 8 posts: 0.7 cubic yards, or about 32 bags of 80lb mix.
              </p>
              <p>
                <strong>Sidewalk (4 feet wide, 30 feet long, 4 inches thick):</strong> 4 &times; 30 &times; 0.333 = 40 cubic feet = 1.48 cubic yards. This is right at the threshold where ready-mix becomes more practical than bags.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Bags vs. Ready-Mix: When to Use Each</h3>
              <p>
                <strong>Use bags</strong> for small projects under 1 cubic yard: fence posts, small pads, repairs, and patches. Bags are convenient because you can mix only what you need and work at your own pace.
              </p>
              <p>
                <strong>Use ready-mix</strong> for anything over 1-2 cubic yards: driveways, patios, foundation walls, and large slabs. Ready-mix is delivered pre-mixed in a truck, saves hours of manual mixing, and produces more consistent concrete. Most suppliers have a minimum order (typically 1 yard) and charge extra for small loads.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Common Mistakes to Avoid</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Not adding waste factor:</strong> Always order 5-10% more than your calculated amount. Uneven ground, form imperfections, and spillage add up fast.
                </li>
                <li>
                  <strong>Mixing up units:</strong> Thickness is usually specified in inches (like a &ldquo;4-inch slab&rdquo;) but needs to be converted to feet for the volume formula. 4 inches = 0.333 feet.
                </li>
                <li>
                  <strong>Forgetting sub-base preparation:</strong> Concrete volume calculations assume level ground. If your ground is uneven, you may need significantly more concrete to fill low spots.
                </li>
                <li>
                  <strong>Not accounting for displacement:</strong> If you are placing rebar, wire mesh, or other reinforcement, the concrete volume needed does not decrease — these elements are embedded within the concrete.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "How many bags of concrete do I need for a 10\u00d710 slab?",
                a: "For a standard 4-inch thick 10\u00d710 foot slab, you need approximately 1.23 cubic yards of concrete, which equals about 56 bags of 80lb mix, 73 bags of 60lb mix, or 112 bags of 40lb mix. For a project this size, ordering one yard of ready-mix delivery is typically more cost-effective and much less labor-intensive than mixing bags by hand.",
              },
              {
                q: "How much does a cubic yard of concrete weigh?",
                a: "A cubic yard of concrete weighs approximately 4,050 pounds (about 1,837 kg). This is based on the standard concrete density of 150 pounds per cubic foot. Wet concrete is slightly heavier than cured concrete due to water content.",
              },
              {
                q: "What's the difference between 60lb and 80lb bags?",
                a: "The difference is simply the amount of concrete mix per bag. An 80lb bag yields about 0.6 cubic feet (0.022 cubic yards), while a 60lb bag yields about 0.45 cubic feet (0.017 cubic yards). The 80lb bags are more cost-effective per cubic foot and require fewer bags for a given project, but they are heavier to carry and mix.",
              },
              {
                q: "How thick should a concrete slab be?",
                a: "For standard residential use: 4 inches for patios and walkways, 5-6 inches for driveways and garage floors, and 6-8 inches for heavy equipment areas. Always check local building codes, as requirements vary by jurisdiction and intended use.",
              },
              {
                q: "How long does concrete take to cure?",
                a: "Concrete reaches about 70% of its rated strength in 7 days and 90% at 28 days. However, initial set occurs within 24-48 hours, after which you can typically walk on it. Full curing continues for months. Keep concrete moist for the first 7 days for optimal strength development.",
              },
              {
                q: "Should I order bags or ready-mix concrete?",
                a: "As a rule of thumb, use bags for projects under 1 cubic yard (about 45 bags of 80lb mix). For anything larger, ready-mix delivery is more practical, produces more consistent results, and is usually more cost-effective once you factor in the labor of hand-mixing dozens of bags.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border overflow-hidden"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <summary
                  className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium list-none"
                  style={{ color: "var(--text)" }}
                >
                  {faq.q}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
                    style={{ color: "var(--text-muted)" }}
                  >
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

        {/* Related Tools */}
        <div className="mb-12">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--text)" }}
          >
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                name: "Rebar Calculator",
                desc: "Calculate rebar spacing, quantity, and weight for your concrete project",
                href: "/construction/rebar-calculator",
                icon: "M4 4l16 16M4 20L20 4",
              },
              {
                name: "Gravel Calculator",
                desc: "Estimate gravel, sand, and aggregate for your sub-base or landscaping",
                href: "/construction/gravel-calculator",
                icon: "M12 2L2 22h20L12 2z",
              },
              {
                name: "Lumber Calculator",
                desc: "Calculate board feet, linear feet, and costs for lumber projects",
                href: "/construction/lumber-calculator",
                icon: "M4 6h16v12H4z M4 10h16",
              },
              {
                name: "Paint Calculator",
                desc: "Determine how much paint you need based on room dimensions",
                href: "/construction/paint-calculator",
                icon: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z",
              },
              {
                name: "Fence Calculator",
                desc: "Calculate posts, rails, and pickets for your fence project",
                href: "/construction/fence-calculator",
                icon: "M4 4v16M12 4v16M20 4v16M4 8h16M4 16h16",
              },
              {
                name: "Drywall Calculator",
                desc: "Estimate drywall sheets, joint compound, and tape needed",
                href: "/construction/drywall-calculator",
                icon: "M3 3h18v18H3zM3 12h18",
              },
            ].map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                className="flex items-start gap-3 p-4 rounded-xl border transition-shadow hover:shadow-md"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--color-accent)" }}
                >
                  <path d={tool.icon} />
                </svg>
                <div>
                  <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                    {tool.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {tool.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer
          className="border-t pt-8 pb-4 text-center text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p>Free Online Tools &mdash; Free calculators and tools for everyone.</p>
          <p className="mt-1">No signup required. No ads. No tracking.</p>
        </footer>
      </div>
    </div>
  );
}
