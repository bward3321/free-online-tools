"use client";

import { ShapeType, Unit, toFeet } from "../calculations";

interface Dims {
  [key: string]: { value: number; unit: Unit };
}

interface ShapePreviewProps {
  shape: ShapeType;
  dims: Dims;
}

function formatDimLabel(value: number, unit: Unit): string {
  if (!value || isNaN(value)) return "";
  const unitLabels: Record<Unit, string> = {
    ft: "ft",
    in: "in",
    yd: "yd",
    m: "m",
    cm: "cm",
  };
  return `${value} ${unitLabels[unit]}`;
}

// Isometric projection helpers
// Using 30-degree isometric (standard)
const ISO_ANGLE = Math.PI / 6; // 30 degrees
const COS30 = Math.cos(ISO_ANGLE);
const SIN30 = Math.sin(ISO_ANGLE);

function isoProject(x: number, y: number, z: number): [number, number] {
  // x = right axis, y = up axis, z = depth axis
  const screenX = (x - z) * COS30;
  const screenY = -(x + z) * SIN30 - y;
  return [screenX, screenY];
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// Normalize dimensions to fit nicely in the viewport
function normalizeDims(
  dims: { [key: string]: number },
  maxSize: number
): { [key: string]: number } {
  const values = Object.values(dims).filter((v) => v > 0);
  if (values.length === 0) return dims;
  const maxVal = Math.max(...values);
  if (maxVal === 0) return dims;
  const scale = maxSize / maxVal;
  const result: { [key: string]: number } = {};
  for (const [k, v] of Object.entries(dims)) {
    result[k] = clamp(v * scale, maxSize * 0.05, maxSize);
  }
  return result;
}

function SlabPreview({ dims: rawDims }: { dims: Dims }) {
  const lFt = toFeet(rawDims.length?.value || 10, rawDims.length?.unit || "ft");
  const wFt = toFeet(rawDims.width?.value || 10, rawDims.width?.unit || "ft");
  const tFt = toFeet(
    rawDims.thickness?.value || 4,
    rawDims.thickness?.unit || "in"
  );

  const n = normalizeDims({ l: lFt, w: wFt, t: tFt }, 100);
  // Ensure thickness is visible but proportional
  n.t = clamp(n.t, 5, 30);

  const cx = 200,
    cy = 160;

  // 8 corners of the box (length=x, thickness=y, width=z)
  const corners = {
    // Bottom face
    fbl: isoProject(0, 0, 0),
    fbr: isoProject(n.l, 0, 0),
    bbl: isoProject(0, 0, n.w),
    bbr: isoProject(n.l, 0, n.w),
    // Top face
    ftl: isoProject(0, n.t, 0),
    ftr: isoProject(n.l, n.t, 0),
    btl: isoProject(0, n.t, n.w),
    btr: isoProject(n.l, n.t, n.w),
  };

  const offset = (p: [number, number]): string =>
    `${cx + p[0]},${cy + p[1]}`;

  // Top face (lightest)
  const topFace = `${offset(corners.ftl)} ${offset(corners.ftr)} ${offset(corners.btr)} ${offset(corners.btl)}`;
  // Right face (medium)
  const rightFace = `${offset(corners.ftr)} ${offset(corners.fbr)} ${offset(corners.bbr)} ${offset(corners.btr)}`;
  // Front face (darkest)
  const frontFace = `${offset(corners.ftl)} ${offset(corners.ftr)} ${offset(corners.fbr)} ${offset(corners.fbl)}`;

  // Dimension labels
  const lengthLabel = formatDimLabel(
    rawDims.length?.value || 0,
    rawDims.length?.unit || "ft"
  );
  const widthLabel = formatDimLabel(
    rawDims.width?.value || 0,
    rawDims.width?.unit || "ft"
  );
  const thicknessLabel = formatDimLabel(
    rawDims.thickness?.value || 0,
    rawDims.thickness?.unit || "in"
  );

  // Dimension line positions
  const frontMidBottom = [
    (cx + corners.fbl[0] + cx + corners.fbr[0]) / 2,
    (cy + corners.fbl[1] + cy + corners.fbr[1]) / 2 + 20,
  ];
  const rightMidBottom = [
    (cx + corners.fbr[0] + cx + corners.bbr[0]) / 2 + 20,
    (cy + corners.fbr[1] + cy + corners.bbr[1]) / 2,
  ];
  const leftMid = [
    cx + corners.fbl[0] - 20,
    (cy + corners.fbl[1] + cy + corners.ftl[1]) / 2,
  ];

  return (
    <g>
      <polygon
        points={rightFace}
        fill="var(--concrete-right, #8a8278)"
        stroke="var(--concrete-stroke, #6d665d)"
        strokeWidth="1"
      />
      <polygon
        points={frontFace}
        fill="var(--concrete-front, #948b80)"
        stroke="var(--concrete-stroke, #6d665d)"
        strokeWidth="1"
      />
      <polygon
        points={topFace}
        fill="var(--concrete-top, #b5ad9e)"
        stroke="var(--concrete-stroke, #6d665d)"
        strokeWidth="1"
      />
      {/* Dimension labels */}
      {lengthLabel && (
        <text
          x={frontMidBottom[0]}
          y={frontMidBottom[1]}
          textAnchor="middle"
          className="tabular-nums"
          style={{
            fontSize: "11px",
            fill: "var(--text-muted)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {lengthLabel}
        </text>
      )}
      {widthLabel && (
        <text
          x={rightMidBottom[0]}
          y={rightMidBottom[1]}
          textAnchor="middle"
          className="tabular-nums"
          style={{
            fontSize: "11px",
            fill: "var(--text-muted)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {widthLabel}
        </text>
      )}
      {thicknessLabel && (
        <text
          x={leftMid[0]}
          y={leftMid[1]}
          textAnchor="middle"
          className="tabular-nums"
          style={{
            fontSize: "11px",
            fill: "var(--text-muted)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {thicknessLabel}
        </text>
      )}
    </g>
  );
}

function WallPreview({ dims: rawDims }: { dims: Dims }) {
  const lFt = toFeet(rawDims.length?.value || 8, rawDims.length?.unit || "ft");
  const hFt = toFeet(rawDims.height?.value || 4, rawDims.height?.unit || "ft");
  const tFt = toFeet(
    rawDims.thickness?.value || 8,
    rawDims.thickness?.unit || "in"
  );

  const n = normalizeDims({ l: lFt, h: hFt, t: tFt }, 100);
  n.t = clamp(n.t, 8, 40);

  const cx = 200,
    cy = 160;

  const corners = {
    fbl: isoProject(0, 0, 0),
    fbr: isoProject(n.l, 0, 0),
    bbl: isoProject(0, 0, n.t),
    bbr: isoProject(n.l, 0, n.t),
    ftl: isoProject(0, n.h, 0),
    ftr: isoProject(n.l, n.h, 0),
    btl: isoProject(0, n.h, n.t),
    btr: isoProject(n.l, n.h, n.t),
  };

  const offset = (p: [number, number]): string =>
    `${cx + p[0]},${cy + p[1]}`;

  const topFace = `${offset(corners.ftl)} ${offset(corners.ftr)} ${offset(corners.btr)} ${offset(corners.btl)}`;
  const rightFace = `${offset(corners.ftr)} ${offset(corners.fbr)} ${offset(corners.bbr)} ${offset(corners.btr)}`;
  const frontFace = `${offset(corners.ftl)} ${offset(corners.ftr)} ${offset(corners.fbr)} ${offset(corners.fbl)}`;

  const lengthLabel = formatDimLabel(rawDims.length?.value || 0, rawDims.length?.unit || "ft");
  const heightLabel = formatDimLabel(rawDims.height?.value || 0, rawDims.height?.unit || "ft");
  const thicknessLabel = formatDimLabel(rawDims.thickness?.value || 0, rawDims.thickness?.unit || "in");

  const frontMidBottom = [
    (cx + corners.fbl[0] + cx + corners.fbr[0]) / 2,
    (cy + corners.fbl[1] + cy + corners.fbr[1]) / 2 + 20,
  ];
  const rightMidTop = [
    (cx + corners.fbr[0] + cx + corners.bbr[0]) / 2 + 15,
    (cy + corners.fbr[1] + cy + corners.bbr[1]) / 2,
  ];
  const leftMid = [
    cx + corners.fbl[0] - 20,
    (cy + corners.fbl[1] + cy + corners.ftl[1]) / 2,
  ];

  return (
    <g>
      <polygon points={rightFace} fill="var(--concrete-right, #8a8278)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      <polygon points={frontFace} fill="var(--concrete-front, #948b80)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      <polygon points={topFace} fill="var(--concrete-top, #b5ad9e)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      {lengthLabel && <text x={frontMidBottom[0]} y={frontMidBottom[1]} textAnchor="middle" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{lengthLabel}</text>}
      {heightLabel && <text x={leftMid[0]} y={leftMid[1]} textAnchor="middle" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{heightLabel}</text>}
      {thicknessLabel && <text x={rightMidTop[0]} y={rightMidTop[1]} textAnchor="middle" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{thicknessLabel}</text>}
    </g>
  );
}

function ColumnPreview({ dims: rawDims }: { dims: Dims }) {
  const dFt = toFeet(rawDims.diameter?.value || 12, rawDims.diameter?.unit || "in");
  const hFt = toFeet(rawDims.height?.value || 4, rawDims.height?.unit || "ft");

  const n = normalizeDims({ d: dFt, h: hFt }, 100);
  n.d = clamp(n.d, 20, 80);

  const cx = 200, cy = 155;
  const rx = n.d / 2;
  const ry = rx * 0.4; // Ellipse foreshortening for isometric
  const bodyH = n.h;

  const diamLabel = formatDimLabel(rawDims.diameter?.value || 0, rawDims.diameter?.unit || "in");
  const heightLabel = formatDimLabel(rawDims.height?.value || 0, rawDims.height?.unit || "ft");

  return (
    <g>
      {/* Body (cylinder sides) */}
      <path
        d={`M ${cx - rx} ${cy} L ${cx - rx} ${cy - bodyH} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy - bodyH} L ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`}
        fill="var(--concrete-front, #948b80)"
        stroke="var(--concrete-stroke, #6d665d)"
        strokeWidth="1"
      />
      {/* Top ellipse */}
      <ellipse
        cx={cx}
        cy={cy - bodyH}
        rx={rx}
        ry={ry}
        fill="var(--concrete-top, #b5ad9e)"
        stroke="var(--concrete-stroke, #6d665d)"
        strokeWidth="1"
      />
      {/* Bottom ellipse (visible part) */}
      <path
        d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`}
        fill="none"
        stroke="var(--concrete-stroke, #6d665d)"
        strokeWidth="1"
        strokeDasharray="3,3"
        opacity="0.4"
      />
      {/* Labels */}
      {diamLabel && (
        <text x={cx} y={cy - bodyH - ry - 8} textAnchor="middle" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
          {diamLabel}
        </text>
      )}
      {heightLabel && (
        <text x={cx + rx + 18} y={cy - bodyH / 2} textAnchor="middle" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
          {heightLabel}
        </text>
      )}
    </g>
  );
}

function CircularSlabPreview({ dims: rawDims }: { dims: Dims }) {
  const dFt = toFeet(rawDims.diameter?.value || 10, rawDims.diameter?.unit || "ft");
  const tFt = toFeet(rawDims.thickness?.value || 4, rawDims.thickness?.unit || "in");

  const n = normalizeDims({ d: dFt, t: tFt }, 100);
  n.d = clamp(n.d, 40, 100);
  n.t = clamp(n.t, 5, 30);

  const cx = 200, cy = 165;
  const rx = n.d / 2;
  const ry = rx * 0.4;
  const bodyH = n.t;

  const diamLabel = formatDimLabel(rawDims.diameter?.value || 0, rawDims.diameter?.unit || "ft");
  const thicknessLabel = formatDimLabel(rawDims.thickness?.value || 0, rawDims.thickness?.unit || "in");

  return (
    <g>
      <path
        d={`M ${cx - rx} ${cy} L ${cx - rx} ${cy - bodyH} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy - bodyH} L ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`}
        fill="var(--concrete-front, #948b80)"
        stroke="var(--concrete-stroke, #6d665d)"
        strokeWidth="1"
      />
      <ellipse cx={cx} cy={cy - bodyH} rx={rx} ry={ry} fill="var(--concrete-top, #b5ad9e)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      {diamLabel && <text x={cx} y={cy - bodyH - ry - 8} textAnchor="middle" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{diamLabel}</text>}
      {thicknessLabel && <text x={cx + rx + 18} y={cy - bodyH / 2} textAnchor="middle" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{thicknessLabel}</text>}
    </g>
  );
}

function StairsPreview({ dims: rawDims }: { dims: Dims }) {
  const runFt = toFeet(rawDims.run?.value || 10, rawDims.run?.unit || "in");
  const riseFt = toFeet(rawDims.rise?.value || 7, rawDims.rise?.unit || "in");
  const widthFt = toFeet(rawDims.width?.value || 3, rawDims.width?.unit || "ft");
  const numSteps = rawDims.steps?.value || 4;

  // Normalize for display
  const maxDim = Math.max(runFt * numSteps, riseFt * numSteps, widthFt);
  const scale = maxDim > 0 ? 90 / maxDim : 1;
  const stepW = clamp(runFt * scale, 8, 30);
  const stepH = clamp(riseFt * scale, 6, 20);
  const depth = clamp(widthFt * scale, 20, 60);

  const cx = 200, cy = 180;
  const steps = clamp(numSteps, 1, 10);

  const stairPolygons: React.ReactElement[] = [];
  for (let i = 0; i < steps; i++) {
    const x0 = i * stepW;
    const y0 = i * stepH;

    // Front face of step
    const fl = isoProject(x0, y0, 0);
    const fr = isoProject(x0 + stepW, y0, 0);
    const ftr = isoProject(x0 + stepW, y0 + stepH, 0);
    const ftl = isoProject(x0, y0 + stepH, 0);
    const frontFace = `${cx+fl[0]},${cy+fl[1]} ${cx+fr[0]},${cy+fr[1]} ${cx+ftr[0]},${cy+ftr[1]} ${cx+ftl[0]},${cy+ftl[1]}`;

    // Top face of step
    const tfl = isoProject(x0, y0 + stepH, 0);
    const tfr = isoProject(x0 + stepW, y0 + stepH, 0);
    const tbr = isoProject(x0 + stepW, y0 + stepH, depth);
    const tbl = isoProject(x0, y0 + stepH, depth);
    const topFace = `${cx+tfl[0]},${cy+tfl[1]} ${cx+tfr[0]},${cy+tfr[1]} ${cx+tbr[0]},${cy+tbr[1]} ${cx+tbl[0]},${cy+tbl[1]}`;

    // Right face (only for the last step)
    if (i === steps - 1) {
      const rbl = isoProject(x0 + stepW, 0, 0);
      const rbr = isoProject(x0 + stepW, 0, depth);
      const rtr = isoProject(x0 + stepW, y0 + stepH, depth);
      const rtl = isoProject(x0 + stepW, y0 + stepH, 0);
      const rightFace = `${cx+rbl[0]},${cy+rbl[1]} ${cx+rbr[0]},${cy+rbr[1]} ${cx+rtr[0]},${cy+rtr[1]} ${cx+rtl[0]},${cy+rtl[1]}`;
      stairPolygons.push(
        <polygon key={`right-${i}`} points={rightFace} fill="var(--concrete-right, #8a8278)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      );
    }

    stairPolygons.push(
      <polygon key={`front-${i}`} points={frontFace} fill="var(--concrete-front, #948b80)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
    );
    stairPolygons.push(
      <polygon key={`top-${i}`} points={topFace} fill="var(--concrete-top, #b5ad9e)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
    );
  }

  const stepsLabel = `${steps} steps`;
  const riseLabel = formatDimLabel(rawDims.rise?.value || 0, rawDims.rise?.unit || "in");
  const runLabel = formatDimLabel(rawDims.run?.value || 0, rawDims.run?.unit || "in");

  return (
    <g>
      {stairPolygons}
      {stepsLabel && <text x={cx + steps * stepW * COS30 + 15} y={cy - steps * stepH * 0.5 - steps * stepW * SIN30 * 0.5} textAnchor="start" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{stepsLabel}</text>}
      {riseLabel && <text x={cx - 25} y={cy - stepH / 2} textAnchor="middle" className="tabular-nums" style={{ fontSize: "10px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{riseLabel}</text>}
      {runLabel && <text x={cx + stepW * COS30 / 2} y={cy + stepW * SIN30 / 2 + 18} textAnchor="middle" className="tabular-nums" style={{ fontSize: "10px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{runLabel}</text>}
    </g>
  );
}

function CurbPreview({ dims: rawDims }: { dims: Dims }) {
  const cdFt = toFeet(rawDims.curbDepth?.value || 6, rawDims.curbDepth?.unit || "in");
  const gwFt = toFeet(rawDims.gutterWidth?.value || 12, rawDims.gutterWidth?.unit || "in");
  const chFt = toFeet(rawDims.curbHeight?.value || 18, rawDims.curbHeight?.unit || "in");
  const ftFt = toFeet(rawDims.flagThickness?.value || 4, rawDims.flagThickness?.unit || "in");
  const lFt = toFeet(rawDims.length?.value || 10, rawDims.length?.unit || "ft");

  const maxDim = Math.max(cdFt, gwFt, chFt, ftFt, lFt);
  const scale = maxDim > 0 ? 90 / maxDim : 1;

  const cd = clamp(cdFt * scale, 8, 25);
  const gw = clamp(gwFt * scale, 15, 50);
  const ch = clamp(chFt * scale, 20, 60);
  const ft = clamp(ftFt * scale, 5, 20);
  const len = clamp(lFt * scale, 30, 90);

  const cx = 200, cy = 170;

  // L-shape: curb (vertical) + gutter (horizontal extending right)
  // Curb: cd wide, ch tall
  // Gutter: gw wide, ft tall, starts at base of curb going right

  // Front face of L-shape (2D profile extruded)
  const profilePoints = [
    [0, 0],           // bottom-left of curb
    [cd, 0],          // bottom-right of curb / top-left of gutter
    [cd, -(ch - ft)], // inner corner
    [cd + gw, -(ch - ft)], // gutter top-right
    [cd + gw, -ch],   // gutter bottom-right
    [0, -ch],          // curb top-left
  ];

  // Front face
  const frontPts = profilePoints.map(([x, y]) => {
    const [sx, sy] = isoProject(x, -y, 0);
    return `${cx + sx},${cy + sy}`;
  }).join(" ");

  // Back face (offset by length along z)
  const backPts = profilePoints.map(([x, y]) => {
    const [sx, sy] = isoProject(x, -y, len);
    return `${cx + sx},${cy + sy}`;
  }).join(" ");

  // Top faces (curb top + gutter top)
  const curbTopPts = [
    isoProject(0, ch, 0),
    isoProject(cd, ch, 0),
    isoProject(cd, ch, len),
    isoProject(0, ch, len),
  ].map(([sx, sy]) => `${cx + sx},${cy + sy}`).join(" ");

  const gutterTopPts = [
    isoProject(cd, ch - ft + ft, 0),
    isoProject(cd + gw, ch - ft + ft, 0),
    isoProject(cd + gw, ch - ft + ft, len),
    isoProject(cd, ch - ft + ft, len),
  ].map(([sx, sy]) => `${cx + sx},${cy + sy}`).join(" ");

  // Right side face (gutter right edge)
  const rightPts = [
    isoProject(cd + gw, 0, 0),
    isoProject(cd + gw, ft, 0),
    isoProject(cd + gw, ft, len),
    isoProject(cd + gw, 0, len),
  ].map(([sx, sy]) => `${cx + sx},${cy + sy}`).join(" ");

  // Ledge top (the step between curb and gutter)
  const ledgeTopPts = [
    isoProject(cd, ft, 0),
    isoProject(cd + gw, ft, 0),
    isoProject(cd + gw, ft, len),
    isoProject(cd, ft, len),
  ].map(([sx, sy]) => `${cx + sx},${cy + sy}`).join(" ");

  // Inner face (the vertical step down)
  const innerFacePts = [
    isoProject(cd, ch, 0),
    isoProject(cd, ft, 0),
    isoProject(cd, ft, len),
    isoProject(cd, ch, len),
  ].map(([sx, sy]) => `${cx + sx},${cy + sy}`).join(" ");

  const lengthLabel = formatDimLabel(rawDims.length?.value || 0, rawDims.length?.unit || "ft");
  const curbHeightLabel = formatDimLabel(rawDims.curbHeight?.value || 0, rawDims.curbHeight?.unit || "in");

  return (
    <g>
      {/* Back face (hidden mostly) */}
      <polygon points={backPts} fill="var(--concrete-right, #8a8278)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" opacity="0.3" />
      {/* Right side */}
      <polygon points={rightPts} fill="var(--concrete-right, #8a8278)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      {/* Inner face */}
      <polygon points={innerFacePts} fill="var(--concrete-right, #8a8278)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      {/* Gutter top / ledge */}
      <polygon points={ledgeTopPts} fill="var(--concrete-top, #b5ad9e)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      {/* Curb top */}
      <polygon points={curbTopPts} fill="var(--concrete-top, #b5ad9e)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      {/* Front face */}
      <polygon points={frontPts} fill="var(--concrete-front, #948b80)" stroke="var(--concrete-stroke, #6d665d)" strokeWidth="1" />
      {/* Labels */}
      {lengthLabel && <text x={cx - 20} y={cy + 25} textAnchor="middle" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{lengthLabel}</text>}
      {curbHeightLabel && <text x={cx - 30} y={cy - ch / 2} textAnchor="middle" className="tabular-nums" style={{ fontSize: "11px", fill: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>{curbHeightLabel}</text>}
    </g>
  );
}

export default function ShapePreview({ shape, dims }: ShapePreviewProps) {
  return (
    <div
      className="w-full max-w-[400px] mx-auto rounded-2xl flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--surface-alt)" }}
    >
      <svg
        viewBox="0 0 400 320"
        className="w-full h-auto"
        style={
          {
            "--concrete-top": "var(--concrete-top-color, #b5ad9e)",
            "--concrete-front": "var(--concrete-front-color, #948b80)",
            "--concrete-right": "var(--concrete-right-color, #8a8278)",
            "--concrete-stroke": "var(--concrete-stroke-color, #6d665d)",
          } as React.CSSProperties
        }
      >
        {shape === "slab" && <SlabPreview dims={dims} />}
        {shape === "wall" && <WallPreview dims={dims} />}
        {shape === "column" && <ColumnPreview dims={dims} />}
        {shape === "circular-slab" && <CircularSlabPreview dims={dims} />}
        {shape === "stairs" && <StairsPreview dims={dims} />}
        {shape === "curb" && <CurbPreview dims={dims} />}
      </svg>
    </div>
  );
}
