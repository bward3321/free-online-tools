"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Material = "wood" | "vinyl" | "chainlink" | "aluminum" | "composite";
type WoodStyle = "privacy" | "picket" | "board-on-board" | "horizontal" | "split-rail";
type VinylStyle = "privacy" | "semi-privacy" | "picket" | "ranch-rail";
type ChainLinkCoating = "galvanized" | "vinyl-coated";
type AluminumStyle = "flat-top" | "spear-top" | "puppy-picket";
type CompositeStyle = "privacy" | "horizontal-slat";
type CompositeTier = "economy" | "mid-range" | "premium";
type ResultTab = "materials" | "cost" | "tips";
type Unit = "ft" | "m";

interface GateConfig {
  walkGates: number;
  walkGateWidth: number;
  driveGates: number;
  driveGateWidth: number;
}

interface FenceState {
  material: Material;
  length: number;
  unit: Unit;
  height: number;
  gates: GateConfig;
  corners: number;
  endPosts: number;
  // wood
  woodStyle: WoodStyle;
  woodType: string;
  postSpacing: number;
  postSize: string;
  picketWidth: number;
  picketSpacing: number;
  railCount: number;
  concreteEnabled: boolean;
  concreteBagSize: number;
  // vinyl
  vinylStyle: VinylStyle;
  vinylPanelWidth: number;
  vinylPostCaps: boolean;
  // chain link
  chainGauge: number;
  chainMeshSize: string;
  chainCoating: ChainLinkCoating;
  chainTopRail: boolean;
  chainTensionWire: boolean;
  chainPrivacySlats: boolean;
  chainBarbedWire: boolean;
  chainBarbedStrands: number;
  // aluminum
  aluminumStyle: AluminumStyle;
  aluminumPanelWidth: number;
  // composite
  compositeStyle: CompositeStyle;
  compositeTier: CompositeTier;
  // results
  wasteBuffer: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const HEIGHTS: Record<Material, number[]> = {
  wood: [3, 4, 5, 6, 8],
  vinyl: [3, 4, 5, 6, 8],
  chainlink: [3, 3.5, 4, 5, 6, 8, 10, 12],
  aluminum: [3, 4, 5, 6],
  composite: [6, 8],
};

const HEIGHT_HINTS: Record<number, string> = {
  3: "Decorative border",
  3.5: "Pet containment",
  4: "Decorative, pet containment",
  5: "Semi-privacy",
  6: "Standard privacy",
  8: "Maximum privacy, wind protection",
  10: "Commercial / security",
  12: "High security",
};

const YARD_PRESETS = [
  { label: "Small Yard", value: 100 },
  { label: "Medium Yard", value: 150 },
  { label: "Large Yard", value: 250 },
  { label: "Half Acre", value: 400 },
  { label: "Full Acre", value: 835 },
];

const MATERIAL_CARDS: { id: Material; emoji: string; name: string; tagline: string; price: string }[] = [
  { id: "wood", emoji: "\uD83E\uDEB5", name: "Wood", tagline: "Classic & customizable", price: "$15\u2013$45/ft installed" },
  { id: "vinyl", emoji: "\uD83C\uDFE0", name: "Vinyl", tagline: "Maintenance-free", price: "$25\u2013$50/ft installed" },
  { id: "chainlink", emoji: "\uD83D\uDD17", name: "Chain Link", tagline: "Affordable & durable", price: "$10\u2013$25/ft installed" },
  { id: "aluminum", emoji: "\uD83D\uDD29", name: "Aluminum", tagline: "Elegant & rust-free", price: "$25\u2013$55/ft installed" },
  { id: "composite", emoji: "\uD83E\uDEA8", name: "Composite", tagline: "Wood look, zero upkeep", price: "$30\u2013$60/ft installed" },
];

// Cost constants (per linear foot, materials only)
const COSTS: Record<Material, { low: number; high: number }> = {
  wood: { low: 12, high: 30 },
  vinyl: { low: 20, high: 40 },
  chainlink: { low: 8, high: 15 },
  aluminum: { low: 25, high: 45 },
  composite: { low: 28, high: 50 },
};

const WOOD_TYPE_COSTS: Record<string, { low: number; high: number }> = {
  "Pressure-Treated Pine": { low: 12, high: 18 },
  "Cedar": { low: 18, high: 30 },
  "Redwood": { low: 25, high: 40 },
  "Spruce/Fir": { low: 10, high: 15 },
};

const LABOR_COST = { low: 15, high: 25 };
const LABOR_COST_COMPLEX = { low: 25, high: 40 };

// ── Helpers ────────────────────────────────────────────────────────────────────
function defaultState(material?: Material): FenceState {
  const m = material || "wood";
  return {
    material: m,
    length: 150,
    unit: "ft",
    height: 6,
    gates: { walkGates: 1, walkGateWidth: 3.5, driveGates: 0, driveGateWidth: 12 },
    corners: 4,
    endPosts: 0,
    woodStyle: "privacy",
    woodType: "Pressure-Treated Pine",
    postSpacing: 8,
    postSize: "4x4",
    picketWidth: 5.5,
    picketSpacing: 0,
    railCount: 3,
    concreteEnabled: true,
    concreteBagSize: 50,
    vinylStyle: "privacy",
    vinylPanelWidth: 6,
    vinylPostCaps: true,
    chainGauge: 11,
    chainMeshSize: "2",
    chainCoating: "galvanized",
    chainTopRail: true,
    chainTensionWire: true,
    chainPrivacySlats: false,
    chainBarbedWire: false,
    chainBarbedStrands: 1,
    aluminumStyle: "flat-top",
    aluminumPanelWidth: 6,
    compositeStyle: "privacy",
    compositeTier: "mid-range",
    wasteBuffer: true,
  };
}

function autoRailCount(height: number): number {
  if (height <= 4) return 2;
  if (height <= 7) return 3;
  return 4;
}

function toFeet(val: number, unit: Unit): number {
  return unit === "m" ? val * 3.28084 : val;
}

// ── Calculations ───────────────────────────────────────────────────────────────
function calculate(s: FenceState) {
  const lengthFt = toFeet(s.length, s.unit);
  const totalGateWidth = (s.gates.walkGates * s.gates.walkGateWidth) + (s.gates.driveGates * s.gates.driveGateWidth);
  const fenceableLength = Math.max(0, lengthFt - totalGateWidth);

  // Posts
  const spacing = s.material === "vinyl" ? s.vinylPanelWidth : s.material === "aluminum" ? s.aluminumPanelWidth : s.material === "composite" ? 6 : s.postSpacing;
  const fenceSections = Math.ceil(fenceableLength / spacing);
  const linePosts = Math.max(0, fenceSections + 1 - s.corners - s.endPosts);
  const gatePosts = (s.gates.walkGates * 2) + (s.gates.driveGates * 2);
  const totalPosts = linePosts + s.corners + s.endPosts + gatePosts;

  // Post depth
  const heightInches = s.height * 12;
  const burialDepth = Math.max(24, Math.ceil(heightInches / 2));
  const postLengthInches = heightInches + burialDepth;
  const postLengthFt = Math.ceil(postLengthInches / 12);
  const standardPostLength = postLengthFt <= 8 ? 8 : postLengthFt <= 10 ? 10 : 12;

  // Rails (wood, composite)
  const rails = s.material === "wood" || s.material === "composite" ? fenceSections * s.railCount : 0;

  // Pickets/boards (wood)
  let pickets = 0;
  if (s.material === "wood" && s.woodStyle !== "split-rail") {
    const fenceableLengthInches = fenceableLength * 12;
    const combinedWidth = s.picketWidth + s.picketSpacing;
    pickets = Math.ceil(fenceableLengthInches / combinedWidth);
    if (s.woodStyle === "board-on-board") pickets = Math.ceil(pickets * 1.5);
  }

  // Concrete
  const bagsPerPost = s.postSize === "6x6" ? (s.concreteBagSize === 80 ? 1.5 : 2.5) : (s.concreteBagSize === 80 ? 1 : 1.5);
  const concreteBags = s.concreteEnabled ? Math.ceil(totalPosts * bagsPerPost) : 0;

  // Hardware (wood)
  const screwsPerPicket = s.railCount * 2;
  const totalScrews = pickets * screwsPerPicket;
  const screwBoxes = Math.ceil(totalScrews / 100);
  const gateHardwareKits = s.gates.walkGates + s.gates.driveGates;

  // Vinyl
  const vinylPanels = s.material === "vinyl" ? Math.ceil(fenceableLength / s.vinylPanelWidth) : 0;
  const vinylPosts = s.material === "vinyl" ? vinylPanels + 1 + s.corners + s.endPosts + gatePosts : 0;
  const vinylPostCaps = s.vinylPostCaps ? (s.material === "vinyl" ? vinylPosts : totalPosts) : 0;
  const vinylBrackets = s.material === "vinyl" ? vinylPosts * 2 : 0;

  // Chain link
  const chainFabricLength = s.material === "chainlink" ? fenceableLength : 0;
  const chainFabricRolls = Math.ceil(chainFabricLength / 50);
  const chainTopRailSections = s.chainTopRail ? Math.ceil(fenceableLength / 10.5) : 0;
  const chainTerminalPosts = s.corners + s.endPosts + gatePosts;
  const chainTensionBars = (s.corners * 2) + s.endPosts + gatePosts;
  const chainTensionBands = chainTensionBars * (s.height + 1);
  const chainBraceBands = (s.corners * 2) + s.endPosts;
  const chainTieWires = Math.ceil(fenceableLength * 2 * s.height);
  const chainLinePostCaps = linePosts;
  const chainLoopCaps = chainTerminalPosts;
  const chainPrivacySlats = s.chainPrivacySlats ? Math.ceil(fenceableLength * 12 / (s.chainMeshSize === "2" ? 2 : 2.375)) : 0;

  // Aluminum
  const aluminumPanels = s.material === "aluminum" ? Math.ceil(fenceableLength / s.aluminumPanelWidth) : 0;
  const aluminumPosts = s.material === "aluminum" ? aluminumPanels + 1 + s.corners + s.endPosts + gatePosts : 0;

  // Composite
  const compositePanels = s.material === "composite" ? Math.ceil(fenceableLength / 6) : 0;

  // Apply 10% waste buffer
  const buf = s.wasteBuffer ? 1.10 : 1;

  // Costs
  let matCosts: Record<string, { low: number; high: number }> = {};
  let totalMatLow = 0;
  let totalMatHigh = 0;

  if (s.material === "wood") {
    const wc = WOOD_TYPE_COSTS[s.woodType] || WOOD_TYPE_COSTS["Pressure-Treated Pine"];
    const isPicketStyle = s.woodStyle === "picket" || s.woodStyle === "split-rail";
    const mult = isPicketStyle ? 0.65 : 1;
    const postCostPer = s.postSize === "6x6" ? 25 : 14;
    const railCostPer = 8;
    const picketCostPer = s.picketWidth >= 5.5 ? 4.5 : 3;
    const concreteCostPer = s.concreteBagSize === 80 ? 7 : 5;

    matCosts = {
      Posts: { low: Math.ceil(totalPosts * postCostPer * 0.85 * buf), high: Math.ceil(totalPosts * postCostPer * 1.15 * buf) },
      Rails: { low: Math.ceil(rails * railCostPer * 0.85 * buf), high: Math.ceil(rails * railCostPer * 1.15 * buf) },
      "Pickets/Boards": { low: Math.ceil(pickets * picketCostPer * mult * 0.9 * buf), high: Math.ceil(pickets * picketCostPer * mult * 1.1 * buf) },
      Concrete: { low: Math.ceil(concreteBags * concreteCostPer * 0.9), high: Math.ceil(concreteBags * concreteCostPer * 1.1) },
      "Hardware & Misc": { low: Math.ceil((screwBoxes * 12 + gateHardwareKits * 30) * 0.9), high: Math.ceil((screwBoxes * 15 + gateHardwareKits * 50) * 1.1) },
      "Gate(s)": { low: s.gates.walkGates * 60 + s.gates.driveGates * 200, high: s.gates.walkGates * 120 + s.gates.driveGates * 400 },
    };
  } else {
    const mc = COSTS[s.material];
    const baseLow = Math.ceil(fenceableLength * mc.low * buf);
    const baseHigh = Math.ceil(fenceableLength * mc.high * buf);
    matCosts = {
      "Materials": { low: baseLow, high: baseHigh },
      "Gate(s)": { low: (s.gates.walkGates * 100 + s.gates.driveGates * 300), high: (s.gates.walkGates * 200 + s.gates.driveGates * 600) },
    };
    if (s.concreteEnabled) {
      const concreteCostPer = s.concreteBagSize === 80 ? 7 : 5;
      matCosts["Concrete"] = { low: Math.ceil(concreteBags * concreteCostPer * 0.9), high: Math.ceil(concreteBags * concreteCostPer * 1.1) };
    }
  }

  for (const v of Object.values(matCosts)) { totalMatLow += v.low; totalMatHigh += v.high; }

  const isComplex = s.height >= 8;
  const labor = isComplex ? LABOR_COST_COMPLEX : LABOR_COST;
  const laborLow = Math.ceil(lengthFt * labor.low);
  const laborHigh = Math.ceil(lengthFt * labor.high);
  const proLow = totalMatLow + laborLow + 50;
  const proHigh = totalMatHigh + laborHigh + 200;
  const diySavingsLow = laborLow;
  const diySavingsHigh = laborHigh + 150;
  const perFootMatLow = lengthFt > 0 ? totalMatLow / lengthFt : 0;
  const perFootMatHigh = lengthFt > 0 ? totalMatHigh / lengthFt : 0;
  const perFootProLow = lengthFt > 0 ? proLow / lengthFt : 0;
  const perFootProHigh = lengthFt > 0 ? proHigh / lengthFt : 0;

  return {
    lengthFt, fenceableLength, totalGateWidth,
    fenceSections, linePosts, gatePosts, totalPosts, spacing,
    burialDepth, standardPostLength, postLengthFt,
    rails, pickets, concreteBags,
    screwBoxes, gateHardwareKits,
    vinylPanels, vinylPosts, vinylPostCaps, vinylBrackets,
    chainFabricRolls, chainTopRailSections, chainTerminalPosts, chainTensionBars, chainTensionBands, chainBraceBands, chainTieWires, chainLinePostCaps, chainLoopCaps, chainPrivacySlats,
    aluminumPanels, aluminumPosts,
    compositePanels,
    buf, matCosts, totalMatLow, totalMatHigh,
    laborLow, laborHigh, proLow, proHigh,
    diySavingsLow, diySavingsHigh,
    perFootMatLow, perFootMatHigh, perFootProLow, perFootProHigh,
  };
}

// ── Fence Diagram SVG ──────────────────────────────────────────────────────────
function FenceDiagram({ state, calc }: { state: FenceState; calc: ReturnType<typeof calculate> }) {
  const sections = Math.min(calc.fenceSections, 4);
  const hasGate = state.gates.walkGates > 0;
  const sectionW = 100;
  const postW = 8;
  const gateW = 50;
  const totalW = (sections * (sectionW + postW)) + postW + (hasGate ? gateW + postW * 2 : 0);
  const fenceH = 80;
  const groundY = fenceH + 20;
  const isPrivacy = state.material === "wood" && (state.woodStyle === "privacy" || state.woodStyle === "board-on-board");
  const isHorizontal = state.material === "wood" && state.woodStyle === "horizontal";
  const isPicket = state.material === "wood" && state.woodStyle === "picket";

  const drawSection = (x: number, w: number, idx: number) => {
    const elems: React.ReactElement[] = [];
    // Rails
    const rc = state.material === "wood" || state.material === "composite" ? state.railCount : state.material === "chainlink" ? 0 : 2;
    for (let r = 0; r < rc; r++) {
      const ry = 10 + (fenceH - 20) * (r / Math.max(rc - 1, 1));
      elems.push(<line key={`rail-${idx}-${r}`} x1={x} y1={ry} x2={x + w} y2={ry} stroke="var(--text-muted)" strokeWidth="1.5" opacity="0.5" />);
    }
    // Pickets / fill
    if (state.material === "chainlink") {
      // Diamond mesh pattern
      const step = 8;
      for (let cx = x + 4; cx < x + w - 4; cx += step) {
        elems.push(<line key={`cl-a-${idx}-${cx}`} x1={cx} y1={5} x2={cx + step / 2} y2={fenceH - 5} stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.35" />);
        elems.push(<line key={`cl-b-${idx}-${cx}`} x1={cx + step / 2} y1={5} x2={cx} y2={fenceH - 5} stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.35" />);
      }
    } else if (isHorizontal) {
      const boardCount = Math.max(3, Math.floor(fenceH / 12));
      for (let b = 0; b < boardCount; b++) {
        const by = 4 + (fenceH - 8) * (b / (boardCount - 1));
        elems.push(<line key={`hb-${idx}-${b}`} x1={x + 2} y1={by} x2={x + w - 2} y2={by} stroke="var(--text-muted)" strokeWidth="3" opacity="0.3" />);
      }
    } else if (isPrivacy || state.material === "vinyl" || state.material === "composite") {
      // Solid fill with vertical lines
      elems.push(<rect key={`fill-${idx}`} x={x} y={2} width={w} height={fenceH - 4} fill="var(--text-muted)" opacity="0.08" />);
      const step = isPrivacy ? 5 : 10;
      for (let px = x + step; px < x + w; px += step) {
        elems.push(<line key={`pv-${idx}-${px}`} x1={px} y1={2} x2={px} y2={fenceH - 2} stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.2" />);
      }
    } else if (isPicket || state.material === "aluminum") {
      const step = 7;
      const gap = 3;
      for (let px = x + 2; px < x + w - 2; px += step + gap) {
        const top = state.material === "aluminum" && state.aluminumStyle === "spear-top" ? 0 : 3;
        elems.push(<rect key={`pk-${idx}-${px}`} x={px} y={top} width={step} height={fenceH - top - 3} fill="var(--text-muted)" opacity="0.25" rx="1" />);
        if (state.material === "aluminum" && state.aluminumStyle === "spear-top") {
          elems.push(<polygon key={`sp-${idx}-${px}`} points={`${px},3 ${px + step},3 ${px + step / 2},-2`} fill="var(--text-muted)" opacity="0.25" />);
        }
      }
    }
    return elems;
  };

  let curX = 0;
  const elements: React.ReactElement[] = [];

  for (let i = 0; i <= sections; i++) {
    // Post
    elements.push(<rect key={`post-${i}`} x={curX} y={0} width={postW} height={groundY} fill="var(--text)" opacity="0.6" rx="1" />);
    if (i < sections) {
      // Insert gate after section 1 if gate exists
      if (i === 1 && hasGate) {
        curX += postW;
        // Gate
        elements.push(
          <rect key="gate-bg" x={curX} y={0} width={gateW} height={fenceH} fill="#059669" opacity="0.12" rx="2" />,
          <text key="gate-label" x={curX + gateW / 2} y={fenceH / 2} textAnchor="middle" dominantBaseline="middle" fill="#059669" style={{ fontSize: "11px", fontWeight: 600 }}>GATE</text>,
          <text key="gate-w" x={curX + gateW / 2} y={fenceH / 2 + 14} textAnchor="middle" fill="#059669" style={{ fontSize: "9px" }}>{state.gates.walkGateWidth}ft</text>,
        );
        curX += gateW;
        // Post after gate
        elements.push(<rect key="gate-post" x={curX} y={0} width={postW} height={groundY} fill="var(--text)" opacity="0.6" rx="1" />);
        curX += postW;
      }
      // Fence section
      elements.push(...drawSection(curX + postW, sectionW, i));
      curX += postW + sectionW;
    }
  }
  curX += postW;

  // Labels
  const labelY = groundY + 14;

  return (
    <div style={{ overflowX: "auto", padding: "16px 0" }}>
      <svg viewBox={`-10 -15 ${curX + 20} ${labelY + 30}`} style={{ width: "100%", maxWidth: "700px", minWidth: "400px", height: "auto", display: "block", margin: "0 auto" }}>
        {/* Ground line */}
        <line x1={-10} y1={groundY} x2={curX + 10} y2={groundY} stroke="var(--border)" strokeWidth="1.5" />
        {elements}
        {/* Height dimension */}
        <line x1={-6} y1={0} x2={-6} y2={fenceH} stroke="var(--text-muted)" strokeWidth="0.5" />
        <text x={-8} y={fenceH / 2} textAnchor="end" dominantBaseline="middle" fill="var(--text-muted)" style={{ fontSize: "10px" }}>{state.height}ft</text>
        {/* Bottom labels */}
        <text x={curX / 2} y={labelY} textAnchor="middle" fill="var(--text-muted)" style={{ fontSize: "11px" }}>
          Total: {calc.lengthFt.toFixed(0)} ft &nbsp;|&nbsp; {calc.totalPosts} posts &nbsp;|&nbsp; {calc.fenceSections} sections{state.gates.walkGates + state.gates.driveGates > 0 ? ` | ${state.gates.walkGates + state.gates.driveGates} gate${state.gates.walkGates + state.gates.driveGates > 1 ? "s" : ""}` : ""}
        </text>
        <text x={curX / 2} y={labelY + 14} textAnchor="middle" fill="var(--text-muted)" style={{ fontSize: "10px" }}>
          Post spacing: {calc.spacing}ft &nbsp;|&nbsp; Post length: {calc.standardPostLength}ft ({calc.burialDepth}&quot; buried)
        </text>
      </svg>
    </div>
  );
}

// ── Tips Generator ─────────────────────────────────────────────────────────────
function getTips(s: FenceState): string[] {
  const tips: string[] = [
    "Call 811 before you dig. It's free and required by law in most states. They'll mark underground utilities so you don't hit a gas line.",
    "Check your local building codes. Most areas require permits for fences over 6 feet. Some have setback requirements from property lines (often 2\u20136 inches).",
    "Set corner and gate posts first. Get those right and the rest of the fence follows.",
    "Buy 10% extra materials. Warped boards, bad cuts, and mistakes happen \u2014 even to professionals.",
  ];
  if (s.material === "wood") {
    if (s.woodType === "Pressure-Treated Pine") tips.push("Let pressure-treated lumber dry for 2\u20134 weeks before staining. Fresh PT wood won't absorb stain properly.");
    tips.push("Set posts in concrete at least 24 inches deep, or below your local frost line \u2014 whichever is deeper.");
    tips.push("Face the \u2018good side\u2019 of the fence toward your neighbor. It's the law in many areas and it's good etiquette.");
    if (s.height >= 8) tips.push("For 8-foot fences, use 6\u00d76 posts and 6-foot post spacing for maximum strength and wind resistance.");
  }
  if (s.material === "chainlink") {
    tips.push("Start with terminal posts (corners, ends, gates). Stretch the mesh from one terminal post to another for the tightest install.");
    tips.push("Tension the fabric with a come-along tool or fence puller. Hand-stretching leaves a saggy fence.");
  }
  if (s.material === "vinyl") {
    tips.push("Vinyl expands and contracts with temperature. Leave 1/8 inch between panels and don\u2019t fully tighten rail screws.");
    tips.push("Install in temperatures above 40\u00b0F. Cold vinyl is brittle and can crack.");
  }
  if (s.material === "aluminum") {
    tips.push("Aluminum fence panels are typically pre-assembled. Measure carefully and order the correct number of rackable panels if your terrain is sloped.");
  }
  if (s.material === "composite") {
    tips.push("Composite fence panels are heavy. Have a helper for installation and use a level on every post.");
  }
  return tips.slice(0, 7);
}

// ── Main Component ─────────────────────────────────────────────────────────────
interface Props {
  title?: string;
  subtitle?: string;
  defaultMaterial?: Material;
  defaultWoodStyle?: WoodStyle;
  defaultHeight?: number;
  emphasisView?: "materials" | "cost";
}

export default function FenceCalculator({ title = "Free Fence Calculator", subtitle = "Estimate fence materials, posts, rails, pickets & cost for any project.", defaultMaterial, defaultWoodStyle, defaultHeight, emphasisView }: Props) {
  const [state, setState] = useState<FenceState>(() => {
    const d = defaultState(defaultMaterial);
    if (defaultWoodStyle) d.woodStyle = defaultWoodStyle;
    if (defaultHeight) d.height = defaultHeight;
    return d;
  });
  const [activeTab, setActiveTab] = useState<ResultTab>(emphasisView === "cost" ? "cost" : "materials");
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const update = useCallback((partial: Partial<FenceState>) => {
    setState(prev => {
      const next = { ...prev, ...partial };
      // auto-adjust rail count when height changes
      if (partial.height !== undefined && partial.railCount === undefined) {
        next.railCount = autoRailCount(partial.height);
      }
      // auto-adjust post size for tall fences
      if (partial.height !== undefined && partial.height >= 8 && prev.postSize === "4x4") {
        next.postSize = "6x6";
      }
      // auto-adjust picket spacing for wood style changes
      if (partial.woodStyle === "privacy" || partial.woodStyle === "board-on-board" || partial.woodStyle === "horizontal") {
        next.picketSpacing = 0;
      } else if (partial.woodStyle === "picket") {
        next.picketSpacing = 1.5;
      }
      return next;
    });
  }, []);

  const updateGates = useCallback((partial: Partial<GateConfig>) => {
    setState(prev => ({ ...prev, gates: { ...prev.gates, ...partial } }));
  }, []);

  const calc = useMemo(() => calculate(state), [state]);
  const tips = useMemo(() => getTips(state), [state]);

  // URL hash sync
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("m", state.material);
    params.set("l", String(state.length));
    params.set("h", String(state.height));
    if (state.material === "wood") {
      params.set("ws", state.woodStyle);
      params.set("wt", state.woodType);
    }
    params.set("wg", String(state.gates.walkGates));
    params.set("dg", String(state.gates.driveGates));
    params.set("c", String(state.corners));
    window.history.replaceState(null, "", `#${params.toString()}`);
  }, [state]);

  // Shared styles
  const cardStyle: React.CSSProperties = { backgroundColor: "var(--surface)", borderColor: "var(--border)", borderWidth: "1px", borderStyle: "solid", borderRadius: "16px", padding: "24px" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "15px", fontWeight: 500, color: "var(--text-muted)", marginBottom: "6px" };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--surface)", color: "var(--text)", fontSize: "20px", outline: "none" };
  const selectStyle: React.CSSProperties = { ...inputStyle, cursor: "pointer" };
  const sectionTitle: React.CSSProperties = { fontSize: "18px", fontWeight: 600, color: "var(--text)", marginBottom: "16px" };

  const $ = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  // Copy materials list
  const copyMaterialsList = useCallback(() => {
    const lines: string[] = [`Fence Materials List \u2014 ${MATERIAL_CARDS.find(m => m.id === state.material)?.name} Fence`, `${calc.lengthFt.toFixed(0)} ft total, ${state.height}ft tall`, ""];
    if (state.material === "wood") {
      lines.push(`Posts: ${Math.ceil(calc.totalPosts * calc.buf)} (${state.postSize} \u00d7 ${calc.standardPostLength}ft)`);
      lines.push(`Rails: ${Math.ceil(calc.rails * calc.buf)}`);
      if (state.woodStyle !== "split-rail") lines.push(`Pickets/Boards: ${Math.ceil(calc.pickets * calc.buf)}`);
      if (calc.concreteBags > 0) lines.push(`Concrete (${state.concreteBagSize}lb bags): ${Math.ceil(calc.concreteBags * calc.buf)}`);
      lines.push(`Screw boxes: ${Math.ceil(calc.screwBoxes * calc.buf)}`);
    } else if (state.material === "vinyl") {
      lines.push(`Panels: ${Math.ceil(calc.vinylPanels * calc.buf)}`);
      lines.push(`Posts: ${Math.ceil(calc.vinylPosts * calc.buf)}`);
      if (state.vinylPostCaps) lines.push(`Post caps: ${Math.ceil(calc.vinylPostCaps * calc.buf)}`);
      lines.push(`Brackets: ${Math.ceil(calc.vinylBrackets * calc.buf)}`);
    } else if (state.material === "chainlink") {
      lines.push(`Fabric rolls (50ft): ${Math.ceil(calc.chainFabricRolls * calc.buf)}`);
      lines.push(`Posts: ${Math.ceil(calc.totalPosts * calc.buf)}`);
      if (state.chainTopRail) lines.push(`Top rail sections: ${Math.ceil(calc.chainTopRailSections * calc.buf)}`);
      lines.push(`Tension bars: ${Math.ceil(calc.chainTensionBars * calc.buf)}`);
    } else {
      const panels = state.material === "aluminum" ? calc.aluminumPanels : calc.compositePanels;
      const posts = state.material === "aluminum" ? calc.aluminumPosts : calc.totalPosts;
      lines.push(`Panels: ${Math.ceil(panels * calc.buf)}`);
      lines.push(`Posts: ${Math.ceil(posts * calc.buf)}`);
    }
    if (state.gates.walkGates > 0) lines.push(`Walk gates: ${state.gates.walkGates}`);
    if (state.gates.driveGates > 0) lines.push(`Drive gates: ${state.gates.driveGates}`);
    lines.push("", `Est. materials cost: ${$(calc.totalMatLow)}\u2013${$(calc.totalMatHigh)}`);
    lines.push(`Generated by EveryFreeTool.com`);
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [state, calc]);

  // PDF download
  const handleDownloadPDF = useCallback(async () => {
    if (!resultsRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const imgW = pageW - 20;
      const imgH = imgW / ratio;
      if (imgH <= pageH - 20) {
        pdf.addImage(imgData, "JPEG", 10, 10, imgW, imgH);
      } else {
        const fitH = pageH - 20;
        const fitW = fitH * ratio;
        pdf.addImage(imgData, "JPEG", 10, 10, fitW, fitH);
      }
      pdf.save(`fence-materials-list.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.print();
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", "--color-accent": "#059669" } as React.CSSProperties}>
      <div className="max-w-[900px] mx-auto px-4 pt-8 md:pt-12 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-2" style={{ fontSize: "15px", color: "var(--text-muted)" }}>
          <a href="/" className="hover:opacity-70 transition-opacity" style={{ color: "#059669" }}>Home</a>
          <span className="mx-1.5">/</span><span>Construction Tools</span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>{title}</h1>
        <p className="text-lg mb-8 max-w-2xl" style={{ color: "var(--text-muted)", fontSize: "18px" }}>{subtitle}</p>

        {/* ── STEP 1: Material ── */}
        <div style={{ ...cardStyle, marginBottom: "16px" }}>
          <h2 style={sectionTitle}>Step 1: Fence Material</h2>
          <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
            {MATERIAL_CARDS.map(mc => (
              <button
                key={mc.id}
                onClick={() => update({ material: mc.id, height: HEIGHTS[mc.id].includes(state.height) ? state.height : 6 })}
                style={{
                  flex: "0 0 auto",
                  width: "140px",
                  padding: "16px 12px",
                  borderRadius: "12px",
                  border: state.material === mc.id ? "2px solid #059669" : "1px solid var(--border)",
                  backgroundColor: state.material === mc.id ? "#05966910" : "var(--surface)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "border-color 0.15s",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>{mc.emoji}</div>
                <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--text)", marginBottom: "2px" }}>{mc.name}</div>
                <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "4px" }}>{mc.tagline}</div>
                <div style={{ fontSize: "14px", color: "#059669", fontWeight: 500 }}>{mc.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── STEP 2: Dimensions ── */}
        <div style={{ ...cardStyle, marginBottom: "16px" }}>
          <h2 style={sectionTitle}>Step 2: Dimensions & Layout</h2>

          {/* Length */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Total Fence Length</label>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input
                type="number"
                value={state.length || ""}
                onChange={e => update({ length: Number(e.target.value) || 0 })}
                placeholder="150"
                style={{ ...inputStyle, flex: 1 }}
              />
              <div style={{ display: "flex", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border)" }}>
                {(["ft", "m"] as Unit[]).map(u => (
                  <button
                    key={u}
                    onClick={() => update({ unit: u })}
                    style={{ padding: "8px 16px", fontSize: "16px", fontWeight: 500, border: "none", cursor: "pointer", backgroundColor: state.unit === u ? "#059669" : "var(--surface)", color: state.unit === u ? "#fff" : "var(--text)" }}
                  >{u}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {YARD_PRESETS.map(p => (
                <button key={p.value} onClick={() => update({ length: p.value, unit: "ft" })} style={{ padding: "6px 14px", borderRadius: "20px", border: "1px solid var(--border)", backgroundColor: state.length === p.value && state.unit === "ft" ? "#059669" : "var(--surface)", color: state.length === p.value && state.unit === "ft" ? "#fff" : "var(--text-muted)", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                  {p.label} ({p.value} ft)
                </button>
              ))}
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "6px" }}>Measure the total perimeter where you want fencing. Subtract gate openings.</p>
          </div>

          {/* Height */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Fence Height</label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {HEIGHTS[state.material].map(h => (
                <button key={h} onClick={() => update({ height: h })} style={{ padding: "8px 18px", borderRadius: "10px", border: state.height === h ? "2px solid #059669" : "1px solid var(--border)", backgroundColor: state.height === h ? "#05966910" : "var(--surface)", color: state.height === h ? "#059669" : "var(--text)", fontSize: "17px", fontWeight: 600, cursor: "pointer" }}>
                  {h} ft
                </button>
              ))}
            </div>
            {HEIGHT_HINTS[state.height] && <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "6px" }}>{state.height} ft &mdash; {HEIGHT_HINTS[state.height]}</p>}
          </div>

          {/* Gates */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Gates</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ ...labelStyle, fontSize: "14px" }}>Walk gates (3\u20135 ft)</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input type="number" min={0} value={state.gates.walkGates} onChange={e => updateGates({ walkGates: Math.max(0, Number(e.target.value)) })} style={{ ...inputStyle, width: "70px" }} />
                  <input type="number" min={3} max={5} step={0.5} value={state.gates.walkGateWidth} onChange={e => updateGates({ walkGateWidth: Number(e.target.value) })} style={{ ...inputStyle, width: "90px" }} placeholder="3.5" />
                  <span style={{ alignSelf: "center", fontSize: "14px", color: "var(--text-muted)" }}>ft wide</span>
                </div>
              </div>
              <div>
                <label style={{ ...labelStyle, fontSize: "14px" }}>Drive/double gates (8\u201316 ft)</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input type="number" min={0} value={state.gates.driveGates} onChange={e => updateGates({ driveGates: Math.max(0, Number(e.target.value)) })} style={{ ...inputStyle, width: "70px" }} />
                  <input type="number" min={8} max={16} step={1} value={state.gates.driveGateWidth} onChange={e => updateGates({ driveGateWidth: Number(e.target.value) })} style={{ ...inputStyle, width: "90px" }} />
                  <span style={{ alignSelf: "center", fontSize: "14px", color: "var(--text-muted)" }}>ft wide</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "6px" }}>Walk gates are for people. Drive gates fit vehicles, equipment, or riding mowers.</p>
          </div>

          {/* Corners & Ends */}
          <div>
            <label style={labelStyle}>Corner & End Posts</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ ...labelStyle, fontSize: "14px" }}>Corner posts</label>
                <input type="number" min={0} value={state.corners} onChange={e => update({ corners: Math.max(0, Number(e.target.value)) })} style={{ ...inputStyle, width: "90px" }} />
              </div>
              <div>
                <label style={{ ...labelStyle, fontSize: "14px" }}>End posts</label>
                <input type="number" min={0} value={state.endPosts} onChange={e => update({ endPosts: Math.max(0, Number(e.target.value)) })} style={{ ...inputStyle, width: "90px" }} />
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "6px" }}>Corner posts go where the fence changes direction. End posts are where a fence line stops.</p>
          </div>
        </div>

        {/* ── STEP 3: Style & Options ── */}
        <div style={{ ...cardStyle, marginBottom: "24px" }}>
          <h2 style={sectionTitle}>Step 3: Style & Options</h2>

          {/* WOOD options */}
          {state.material === "wood" && (
            <div className="space-y-5">
              {/* Fence Style */}
              <div>
                <label style={labelStyle}>Fence Style</label>
                <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
                  {([
                    { id: "privacy" as WoodStyle, name: "Privacy", desc: "Boards side by side, no gaps" },
                    { id: "picket" as WoodStyle, name: "Picket", desc: "Classic look with spaced pickets" },
                    { id: "board-on-board" as WoodStyle, name: "Board-on-Board", desc: "Alternating boards, privacy + airflow" },
                    { id: "horizontal" as WoodStyle, name: "Horizontal", desc: "Modern horizontal boards" },
                    { id: "split-rail" as WoodStyle, name: "Split Rail", desc: "Rustic, open. No pickets" },
                  ]).map(s => (
                    <button key={s.id} onClick={() => update({ woodStyle: s.id })} style={{ flex: "0 0 auto", padding: "12px 16px", borderRadius: "10px", border: state.woodStyle === s.id ? "2px solid #059669" : "1px solid var(--border)", backgroundColor: state.woodStyle === s.id ? "#05966910" : "var(--surface)", cursor: "pointer", textAlign: "left", minWidth: "130px" }}>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>{s.name}</div>
                      <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wood Type */}
              <div>
                <label style={labelStyle}>Wood Type</label>
                <select value={state.woodType} onChange={e => update({ woodType: e.target.value })} style={selectStyle}>
                  <option>Pressure-Treated Pine</option>
                  <option>Cedar</option>
                  <option>Redwood</option>
                  <option>Spruce/Fir</option>
                </select>
              </div>

              {/* Post Spacing & Size */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Post Spacing</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[6, 8].map(sp => (
                      <button key={sp} onClick={() => update({ postSpacing: sp })} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: state.postSpacing === sp ? "2px solid #059669" : "1px solid var(--border)", backgroundColor: state.postSpacing === sp ? "#05966910" : "var(--surface)", color: state.postSpacing === sp ? "#059669" : "var(--text)", fontSize: "17px", fontWeight: 600, cursor: "pointer" }}>
                        {sp} ft
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>{state.postSpacing === 6 ? "Stronger, recommended for tall/windy areas" : "Standard for most residential fences"}</p>
                </div>
                <div>
                  <label style={labelStyle}>Post Size</label>
                  <select value={state.postSize} onChange={e => update({ postSize: e.target.value })} style={selectStyle}>
                    <option value="4x4">4&times;4 (standard up to 6ft)</option>
                    <option value="6x6">6&times;6 (8ft fences, gates, corners)</option>
                  </select>
                  {state.height >= 8 && state.postSize === "4x4" && <p style={{ fontSize: "13px", color: "#dc2626", marginTop: "4px" }}>6&times;6 posts recommended for 8ft+ fences</p>}
                </div>
              </div>

              {/* Picket Width & Spacing (not for split rail) */}
              {state.woodStyle !== "split-rail" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={labelStyle}>Board Width</label>
                    <select value={state.picketWidth} onChange={e => update({ picketWidth: Number(e.target.value) })} style={selectStyle}>
                      <option value={3.5}>3.5&quot; (1&times;4)</option>
                      <option value={5.5}>5.5&quot; (1&times;6)</option>
                      <option value={11.25}>11.25&quot; (1&times;12)</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Board Spacing</label>
                    <select value={state.picketSpacing} onChange={e => update({ picketSpacing: Number(e.target.value) })} style={selectStyle}>
                      <option value={0}>0&quot; &mdash; Solid / Privacy</option>
                      <option value={0.25}>0.25&quot; &mdash; Minimal gap</option>
                      <option value={1}>1&quot; &mdash; Slight gap</option>
                      <option value={1.5}>1.5&quot; &mdash; Standard picket</option>
                      <option value={2}>2&quot; &mdash; Wide spacing</option>
                      <option value={2.5}>2.5&quot; &mdash; Open picket</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Rail Count */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Number of Rails</label>
                  <select value={state.railCount} onChange={e => update({ railCount: Number(e.target.value) })} style={selectStyle}>
                    <option value={2}>2 rails (under 5ft)</option>
                    <option value={3}>3 rails (5\u20137ft standard)</option>
                    <option value={4}>4 rails (8ft fences)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Concrete for Posts</label>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "4px" }}>
                    <button onClick={() => update({ concreteEnabled: !state.concreteEnabled })} style={{ width: "48px", height: "28px", borderRadius: "14px", border: "none", backgroundColor: state.concreteEnabled ? "#059669" : "var(--border)", cursor: "pointer", position: "relative", transition: "background-color 0.2s" }}>
                      <div style={{ width: "22px", height: "22px", borderRadius: "11px", backgroundColor: "#fff", position: "absolute", top: "3px", left: state.concreteEnabled ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                    </button>
                    {state.concreteEnabled && (
                      <select value={state.concreteBagSize} onChange={e => update({ concreteBagSize: Number(e.target.value) })} style={{ ...selectStyle, width: "auto" }}>
                        <option value={50}>50 lb bags</option>
                        <option value={60}>60 lb bags</option>
                        <option value={80}>80 lb bags</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VINYL options */}
          {state.material === "vinyl" && (
            <div className="space-y-5">
              <div>
                <label style={labelStyle}>Fence Style</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {([
                    { id: "privacy" as VinylStyle, name: "Privacy Panel", desc: "Solid panels, most popular" },
                    { id: "semi-privacy" as VinylStyle, name: "Semi-Privacy", desc: "Lattice top or spaced boards" },
                    { id: "picket" as VinylStyle, name: "Picket", desc: "Classic look, zero maintenance" },
                    { id: "ranch-rail" as VinylStyle, name: "Ranch Rail", desc: "2\u20134 horizontal rails, open" },
                  ]).map(s => (
                    <button key={s.id} onClick={() => update({ vinylStyle: s.id })} style={{ flex: "0 0 auto", padding: "12px 16px", borderRadius: "10px", border: state.vinylStyle === s.id ? "2px solid #059669" : "1px solid var(--border)", backgroundColor: state.vinylStyle === s.id ? "#05966910" : "var(--surface)", cursor: "pointer", textAlign: "left", minWidth: "130px" }}>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>{s.name}</div>
                      <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Panel Width</label>
                  <select value={state.vinylPanelWidth} onChange={e => update({ vinylPanelWidth: Number(e.target.value) })} style={selectStyle}>
                    <option value={6}>6 ft (standard)</option>
                    <option value={8}>8 ft</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Post Caps</label>
                  <button onClick={() => update({ vinylPostCaps: !state.vinylPostCaps })} style={{ width: "48px", height: "28px", borderRadius: "14px", border: "none", backgroundColor: state.vinylPostCaps ? "#059669" : "var(--border)", cursor: "pointer", position: "relative", marginTop: "8px" }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "11px", backgroundColor: "#fff", position: "absolute", top: "3px", left: state.vinylPostCaps ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  </button>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Concrete for Posts</label>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <button onClick={() => update({ concreteEnabled: !state.concreteEnabled })} style={{ width: "48px", height: "28px", borderRadius: "14px", border: "none", backgroundColor: state.concreteEnabled ? "#059669" : "var(--border)", cursor: "pointer", position: "relative" }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "11px", backgroundColor: "#fff", position: "absolute", top: "3px", left: state.concreteEnabled ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  </button>
                  {state.concreteEnabled && (
                    <select value={state.concreteBagSize} onChange={e => update({ concreteBagSize: Number(e.target.value) })} style={{ ...selectStyle, width: "auto" }}>
                      <option value={50}>50 lb bags</option>
                      <option value={80}>80 lb bags</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CHAIN LINK options */}
          {state.material === "chainlink" && (
            <div className="space-y-5">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Wire Gauge</label>
                  <select value={state.chainGauge} onChange={e => update({ chainGauge: Number(e.target.value) })} style={selectStyle}>
                    <option value={9}>9 gauge (heavy commercial)</option>
                    <option value={11}>11 gauge (standard residential)</option>
                    <option value={11.5}>11.5 gauge (light residential)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Mesh Size</label>
                  <select value={state.chainMeshSize} onChange={e => update({ chainMeshSize: e.target.value })} style={selectStyle}>
                    <option value="2">2&quot; (standard)</option>
                    <option value="2-3/8">2-3/8&quot;</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Coating</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {([
                    { id: "galvanized" as ChainLinkCoating, name: "Galvanized", desc: "Standard silver" },
                    { id: "vinyl-coated" as ChainLinkCoating, name: "Vinyl-Coated", desc: "Green, black, or brown (+30%)" },
                  ]).map(c => (
                    <button key={c.id} onClick={() => update({ chainCoating: c.id })} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: state.chainCoating === c.id ? "2px solid #059669" : "1px solid var(--border)", backgroundColor: state.chainCoating === c.id ? "#05966910" : "var(--surface)", cursor: "pointer", textAlign: "center" }}>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>{c.name}</div>
                      <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {([
                  { key: "chainTopRail" as const, label: "Top Rail" },
                  { key: "chainTensionWire" as const, label: "Tension Wire (bottom)" },
                  { key: "chainPrivacySlats" as const, label: "Privacy Slats" },
                  { key: "chainBarbedWire" as const, label: "Barbed Wire" },
                ]).map(t => (
                  <div key={t.key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button onClick={() => update({ [t.key]: !state[t.key] } as Partial<FenceState>)} style={{ width: "44px", height: "26px", borderRadius: "13px", border: "none", backgroundColor: state[t.key] ? "#059669" : "var(--border)", cursor: "pointer", position: "relative" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "10px", backgroundColor: "#fff", position: "absolute", top: "3px", left: state[t.key] ? "21px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                    </button>
                    <span style={{ fontSize: "15px", color: "var(--text)" }}>{t.label}</span>
                  </div>
                ))}
              </div>
              {state.chainBarbedWire && (
                <div>
                  <label style={labelStyle}>Barbed Wire Strands</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[1, 3].map(n => (
                      <button key={n} onClick={() => update({ chainBarbedStrands: n })} style={{ padding: "8px 20px", borderRadius: "10px", border: state.chainBarbedStrands === n ? "2px solid #059669" : "1px solid var(--border)", backgroundColor: state.chainBarbedStrands === n ? "#05966910" : "var(--surface)", color: state.chainBarbedStrands === n ? "#059669" : "var(--text)", fontSize: "17px", fontWeight: 600, cursor: "pointer" }}>{n}</button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label style={labelStyle}>Concrete for Posts</label>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <button onClick={() => update({ concreteEnabled: !state.concreteEnabled })} style={{ width: "48px", height: "28px", borderRadius: "14px", border: "none", backgroundColor: state.concreteEnabled ? "#059669" : "var(--border)", cursor: "pointer", position: "relative" }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "11px", backgroundColor: "#fff", position: "absolute", top: "3px", left: state.concreteEnabled ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  </button>
                  {state.concreteEnabled && (
                    <select value={state.concreteBagSize} onChange={e => update({ concreteBagSize: Number(e.target.value) })} style={{ ...selectStyle, width: "auto" }}>
                      <option value={50}>50 lb bags</option>
                      <option value={80}>80 lb bags</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ALUMINUM options */}
          {state.material === "aluminum" && (
            <div className="space-y-5">
              <div>
                <label style={labelStyle}>Style</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {([
                    { id: "flat-top" as AluminumStyle, name: "Flat Top", desc: "Clean modern look" },
                    { id: "spear-top" as AluminumStyle, name: "Spear Top", desc: "Classic ornamental" },
                    { id: "puppy-picket" as AluminumStyle, name: "Puppy Picket", desc: "Closer spacing at bottom" },
                  ]).map(s => (
                    <button key={s.id} onClick={() => update({ aluminumStyle: s.id })} style={{ flex: "0 0 auto", padding: "12px 16px", borderRadius: "10px", border: state.aluminumStyle === s.id ? "2px solid #059669" : "1px solid var(--border)", backgroundColor: state.aluminumStyle === s.id ? "#05966910" : "var(--surface)", cursor: "pointer", textAlign: "left", minWidth: "130px" }}>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>{s.name}</div>
                      <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Panel Width</label>
                  <select value={state.aluminumPanelWidth} onChange={e => update({ aluminumPanelWidth: Number(e.target.value) })} style={selectStyle}>
                    <option value={6}>6 ft (standard)</option>
                    <option value={8}>8 ft</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Concrete for Posts</label>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "8px" }}>
                    <button onClick={() => update({ concreteEnabled: !state.concreteEnabled })} style={{ width: "48px", height: "28px", borderRadius: "14px", border: "none", backgroundColor: state.concreteEnabled ? "#059669" : "var(--border)", cursor: "pointer", position: "relative" }}>
                      <div style={{ width: "22px", height: "22px", borderRadius: "11px", backgroundColor: "#fff", position: "absolute", top: "3px", left: state.concreteEnabled ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMPOSITE options */}
          {state.material === "composite" && (
            <div className="space-y-5">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Style</label>
                  <select value={state.compositeStyle} onChange={e => update({ compositeStyle: e.target.value as CompositeStyle })} style={selectStyle}>
                    <option value="privacy">Privacy</option>
                    <option value="horizontal-slat">Horizontal Slat</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Brand Tier</label>
                  <select value={state.compositeTier} onChange={e => update({ compositeTier: e.target.value as CompositeTier })} style={selectStyle}>
                    <option value="economy">Economy</option>
                    <option value="mid-range">Mid-Range</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Concrete for Posts</label>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <button onClick={() => update({ concreteEnabled: !state.concreteEnabled })} style={{ width: "48px", height: "28px", borderRadius: "14px", border: "none", backgroundColor: state.concreteEnabled ? "#059669" : "var(--border)", cursor: "pointer", position: "relative" }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "11px", backgroundColor: "#fff", position: "absolute", top: "3px", left: state.concreteEnabled ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── FENCE DIAGRAM ── */}
        {calc.fenceSections > 0 && (
          <div style={{ ...cardStyle, marginBottom: "24px" }}>
            <h2 style={sectionTitle}>Fence Layout Preview</h2>
            <FenceDiagram state={state} calc={calc} />
          </div>
        )}

        {/* ── RESULTS ── */}
        <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }} ref={resultsRef}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
            {([
              { id: "materials" as ResultTab, label: "Materials List", icon: "\uD83D\uDCCB" },
              { id: "cost" as ResultTab, label: "Cost Breakdown", icon: "\uD83D\uDCB0" },
              { id: "tips" as ResultTab, label: "Project Tips", icon: "\uD83D\uDD28" },
            ]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, padding: "14px 8px", border: "none", cursor: "pointer",
                  backgroundColor: activeTab === tab.id ? "var(--surface)" : "var(--bg)",
                  borderBottom: activeTab === tab.id ? "2px solid #059669" : "2px solid transparent",
                  color: activeTab === tab.id ? "#059669" : "var(--text-muted)",
                  fontSize: "15px", fontWeight: 600,
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: "24px" }}>
            {/* Waste buffer toggle + actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button onClick={() => update({ wasteBuffer: !state.wasteBuffer })} style={{ width: "44px", height: "26px", borderRadius: "13px", border: "none", backgroundColor: state.wasteBuffer ? "#059669" : "var(--border)", cursor: "pointer", position: "relative" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "10px", backgroundColor: "#fff", position: "absolute", top: "3px", left: state.wasteBuffer ? "21px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                </button>
                <span style={{ fontSize: "15px", color: "var(--text)" }}>Include 10% waste buffer</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={handleDownloadPDF} style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, backgroundColor: "#059669", color: "#fff", border: "none", cursor: "pointer" }}>Download PDF</button>
                <button onClick={copyMaterialsList} style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, backgroundColor: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", cursor: "pointer" }}>
                  {copied ? "Copied!" : "Copy List"}
                </button>
              </div>
            </div>

            {/* ── Materials Tab ── */}
            {activeTab === "materials" && (
              <div className="space-y-6">
                {/* Quick Reference */}
                <div style={{ padding: "16px", borderRadius: "10px", backgroundColor: "#05966910", border: "1px solid #05966930" }}>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#059669", marginBottom: "6px" }}>Quick Reference</p>
                  <div style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: "1.8" }}>
                    <div>1 fence post every {calc.spacing} feet (your spacing)</div>
                    <div>{state.height}-foot fence needs {calc.standardPostLength}-foot posts ({calc.burialDepth}&quot; buried)</div>
                    {state.concreteEnabled && <div>{(state.postSize === "6x6" ? 2.5 : 1.5).toFixed(1)} bags of {state.concreteBagSize}lb concrete per post</div>}
                    <div>{calc.lengthFt.toFixed(0)} ft of fence = {calc.totalPosts} posts{state.material === "wood" && state.woodStyle !== "split-rail" ? `, ${calc.rails} rails, ${calc.pickets} pickets` : ""}</div>
                  </div>
                </div>

                {/* Materials grouped by category */}
                {state.material === "wood" && (
                  <>
                    <MaterialGroup title="Posts" items={[
                      { name: `Line posts (${state.postSize} \u00d7 ${calc.standardPostLength}ft)`, qty: Math.ceil(calc.linePosts * calc.buf), note: `${calc.fenceSections + 1} needed minus corner/end posts` },
                      { name: `Corner posts (${state.postSize} \u00d7 ${calc.standardPostLength}ft)`, qty: state.corners },
                      state.endPosts > 0 ? { name: `End posts (${state.postSize} \u00d7 ${calc.standardPostLength}ft)`, qty: state.endPosts } : null,
                      calc.gatePosts > 0 ? { name: `Gate posts (${state.postSize} \u00d7 ${calc.standardPostLength}ft)`, qty: calc.gatePosts } : null,
                      { name: "Total posts", qty: Math.ceil(calc.totalPosts * calc.buf), bold: true },
                    ].filter(Boolean) as MaterialItem[]} />
                    <MaterialGroup title="Rails" items={[
                      { name: `Horizontal rails (2\u00d74 \u00d7 ${state.postSpacing}ft)`, qty: Math.ceil(calc.rails * calc.buf), note: `${state.railCount} rails \u00d7 ${calc.fenceSections} sections` },
                    ]} />
                    {state.woodStyle !== "split-rail" && (
                      <MaterialGroup title="Pickets / Boards" items={[
                        { name: `Fence boards (1\u00d7${state.picketWidth >= 5.5 ? "6" : "4"} \u00d7 ${state.height}ft)`, qty: Math.ceil(calc.pickets * calc.buf), note: `${calc.fenceableLength.toFixed(0)}ft \u00d7 12 / ${(state.picketWidth + state.picketSpacing).toFixed(2)}\u201d per board${state.woodStyle === "board-on-board" ? " \u00d7 1.5 overlap" : ""}` },
                      ]} />
                    )}
                    {state.concreteEnabled && (
                      <MaterialGroup title="Concrete" items={[
                        { name: `${state.concreteBagSize}lb bags quick-set concrete`, qty: Math.ceil(calc.concreteBags * calc.buf), note: `${(state.postSize === "6x6" ? 2.5 : 1.5).toFixed(1)} bags per post \u00d7 ${calc.totalPosts} posts` },
                      ]} />
                    )}
                    <MaterialGroup title="Hardware" items={[
                      { name: "Exterior wood screws (1 lb box)", qty: Math.ceil(calc.screwBoxes * calc.buf) },
                      ...(calc.gateHardwareKits > 0 ? [{ name: "Gate hardware kits", qty: calc.gateHardwareKits }] : []),
                      { name: "Post caps (optional)", qty: Math.ceil(calc.totalPosts * calc.buf) },
                    ]} />
                    {(state.gates.walkGates > 0 || state.gates.driveGates > 0) && (
                      <MaterialGroup title="Gates" items={[
                        ...(state.gates.walkGates > 0 ? [{ name: `Walk gate (${state.gates.walkGateWidth}ft wide \u00d7 ${state.height}ft tall)`, qty: state.gates.walkGates }] : []),
                        ...(state.gates.driveGates > 0 ? [{ name: `Drive gate (${state.gates.driveGateWidth}ft wide \u00d7 ${state.height}ft tall)`, qty: state.gates.driveGates }] : []),
                      ]} />
                    )}
                  </>
                )}

                {state.material === "vinyl" && (
                  <>
                    <MaterialGroup title="Panels & Posts" items={[
                      { name: `Vinyl ${state.vinylStyle} panels (${state.vinylPanelWidth}ft wide)`, qty: Math.ceil(calc.vinylPanels * calc.buf), note: `${calc.fenceableLength.toFixed(0)}ft / ${state.vinylPanelWidth}ft panel width` },
                      { name: "Vinyl posts", qty: Math.ceil(calc.vinylPosts * calc.buf) },
                      ...(state.vinylPostCaps ? [{ name: "Post caps", qty: Math.ceil(calc.vinylPostCaps * calc.buf) }] : []),
                      { name: "Brackets / clips", qty: Math.ceil(calc.vinylBrackets * calc.buf) },
                    ]} />
                    {state.concreteEnabled && (
                      <MaterialGroup title="Concrete" items={[
                        { name: `${state.concreteBagSize}lb bags quick-set concrete`, qty: Math.ceil(calc.concreteBags * calc.buf) },
                      ]} />
                    )}
                  </>
                )}

                {state.material === "chainlink" && (
                  <>
                    <MaterialGroup title="Fabric & Rail" items={[
                      { name: `Chain link fabric rolls (50ft \u00d7 ${state.height}ft, ${state.chainGauge} ga ${state.chainCoating})`, qty: Math.ceil(calc.chainFabricRolls * calc.buf), note: `${calc.fenceableLength.toFixed(0)}ft / 50ft per roll` },
                      ...(state.chainTopRail ? [{ name: "Top rail sections (10.5ft)", qty: Math.ceil(calc.chainTopRailSections * calc.buf) }] : []),
                    ]} />
                    <MaterialGroup title="Posts" items={[
                      { name: "Line posts", qty: Math.ceil(calc.linePosts * calc.buf) },
                      { name: "Terminal posts (corners + ends + gates)", qty: calc.chainTerminalPosts },
                      { name: "Total posts", qty: Math.ceil(calc.totalPosts * calc.buf), bold: true },
                    ]} />
                    <MaterialGroup title="Hardware & Fittings" items={[
                      { name: "Tension bars", qty: Math.ceil(calc.chainTensionBars * calc.buf) },
                      { name: "Tension bands", qty: Math.ceil(calc.chainTensionBands * calc.buf) },
                      { name: "Brace bands", qty: Math.ceil(calc.chainBraceBands * calc.buf) },
                      { name: "Tie wires", qty: Math.ceil(calc.chainTieWires * calc.buf) },
                      { name: "Line post caps", qty: Math.ceil(calc.chainLinePostCaps * calc.buf) },
                      { name: "Loop caps", qty: calc.chainLoopCaps },
                      ...(state.chainPrivacySlats ? [{ name: "Privacy slats", qty: Math.ceil(calc.chainPrivacySlats * calc.buf) }] : []),
                    ]} />
                    {state.concreteEnabled && (
                      <MaterialGroup title="Concrete" items={[
                        { name: `${state.concreteBagSize}lb bags concrete`, qty: Math.ceil(calc.concreteBags * calc.buf) },
                      ]} />
                    )}
                  </>
                )}

                {(state.material === "aluminum" || state.material === "composite") && (
                  <>
                    <MaterialGroup title="Panels & Posts" items={[
                      { name: `${state.material === "aluminum" ? `Aluminum ${state.aluminumStyle}` : `Composite ${state.compositeStyle}`} panels`, qty: Math.ceil((state.material === "aluminum" ? calc.aluminumPanels : calc.compositePanels) * calc.buf) },
                      { name: "Posts with caps", qty: Math.ceil((state.material === "aluminum" ? calc.aluminumPosts : calc.totalPosts) * calc.buf) },
                    ]} />
                    {state.concreteEnabled && (
                      <MaterialGroup title="Concrete" items={[
                        { name: `${state.concreteBagSize}lb bags concrete`, qty: Math.ceil(calc.concreteBags * calc.buf) },
                      ]} />
                    )}
                  </>
                )}

                {/* Waste buffer note */}
                {state.wasteBuffer && (
                  <p style={{ fontSize: "14px", color: "#b45309", padding: "12px", borderRadius: "8px", backgroundColor: "#fef3c710", border: "1px solid #fef3c740" }}>
                    Tip: All quantities above include a 10% waste buffer for bad cuts, warped boards, and mistakes.
                  </p>
                )}

                {/* Cross-link */}
                {state.concreteEnabled && (
                  <a href="/construction/concrete-calculator" style={{ display: "block", padding: "16px", borderRadius: "10px", backgroundColor: "#05966910", border: "1px solid #05966930", textDecoration: "none", fontSize: "16px", color: "#059669", fontWeight: 500 }}>
                    Need exact concrete calculations for your post holes? Use our <strong>Concrete Calculator</strong> &rarr;
                  </a>
                )}
              </div>
            )}

            {/* ── Cost Tab ── */}
            {activeTab === "cost" && (
              <div className="space-y-6">
                {/* DIY Cost */}
                <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>DIY (Materials Only)</p>
                  <p style={{ fontSize: "32px", fontWeight: 700, color: "#059669", marginBottom: "16px" }}>{$(calc.totalMatLow)} &ndash; {$(calc.totalMatHigh)}</p>
                  <div className="space-y-2">
                    {Object.entries(calc.matCosts).map(([name, range]) => (
                      <div key={name} style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "var(--text-muted)" }}>
                        <span>{name}</span>
                        <span style={{ fontWeight: 500, color: "var(--text)" }}>{$(range.low)} &ndash; {$(range.high)}</span>
                      </div>
                    ))}
                    {state.wasteBuffer && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "var(--text-muted)", borderTop: "1px solid var(--border)", paddingTop: "8px", marginTop: "8px" }}>
                        <span>Includes 10% waste buffer</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Professional Cost */}
                <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Professional Installation</p>
                  <p style={{ fontSize: "32px", fontWeight: 700, color: "var(--text)", marginBottom: "16px" }}>{$(calc.proLow)} &ndash; {$(calc.proHigh)}</p>
                  <div className="space-y-2">
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "var(--text-muted)" }}>
                      <span>Labor (${LABOR_COST.low}&ndash;${LABOR_COST.high}/ft)</span>
                      <span style={{ fontWeight: 500, color: "var(--text)" }}>{$(calc.laborLow)} &ndash; {$(calc.laborHigh)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "var(--text-muted)" }}>
                      <span>Materials</span>
                      <span style={{ fontWeight: 500, color: "var(--text)" }}>{$(calc.totalMatLow)} &ndash; {$(calc.totalMatHigh)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "var(--text-muted)" }}>
                      <span>Permits (estimated)</span>
                      <span style={{ fontWeight: 500, color: "var(--text)" }}>$50 &ndash; $200</span>
                    </div>
                  </div>
                  <div style={{ marginTop: "16px", padding: "12px", borderRadius: "8px", backgroundColor: "#05966910" }}>
                    <p style={{ fontSize: "16px", fontWeight: 600, color: "#059669" }}>
                      You save {$(calc.diySavingsLow)}&ndash;{$(calc.diySavingsHigh)} going DIY
                    </p>
                  </div>
                </div>

                {/* Per-foot cost */}
                <div style={{ padding: "16px", borderRadius: "10px", backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>Per-Foot Cost</p>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "var(--text-muted)" }}>
                    <span>Materials</span>
                    <span style={{ fontWeight: 500, color: "var(--text)" }}>${calc.perFootMatLow.toFixed(2)} &ndash; ${calc.perFootMatHigh.toFixed(2)} / ft</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", color: "var(--text-muted)" }}>
                    <span>Installed</span>
                    <span style={{ fontWeight: 500, color: "var(--text)" }}>${calc.perFootProLow.toFixed(2)} &ndash; ${calc.perFootProHigh.toFixed(2)} / ft</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── Tips Tab ── */}
            {activeTab === "tips" && (
              <div className="space-y-3">
                {tips.map((tip, i) => (
                  <div key={i} style={{ padding: "16px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--surface)", fontSize: "16px", lineHeight: "1.6", color: "var(--text)" }}>
                    {tip}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Material Group sub-component ───────────────────────────────────────────────
interface MaterialItem {
  name: string;
  qty: number;
  note?: string;
  bold?: boolean;
}

function MaterialGroup({ title, items }: { title: string; items: MaterialItem[] }) {
  return (
    <div>
      <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</p>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: "16px" }}>
              <span style={{ color: "var(--text)", fontWeight: item.bold ? 700 : 400 }}>{item.name}</span>
              <span style={{ fontWeight: 700, color: item.bold ? "#059669" : "var(--text)", fontSize: item.bold ? "20px" : "17px", whiteSpace: "nowrap", marginLeft: "12px" }}>{item.qty}</span>
            </div>
            {item.note && <p style={{ fontSize: "13px", color: "var(--text-muted)", marginLeft: "8px" }}>{item.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
