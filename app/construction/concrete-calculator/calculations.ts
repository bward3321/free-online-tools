export type ShapeType =
  | "slab"
  | "wall"
  | "column"
  | "circular-slab"
  | "stairs"
  | "curb";

export type Unit = "ft" | "in" | "yd" | "m" | "cm";

const TO_FEET: Record<Unit, number> = {
  ft: 1,
  in: 1 / 12,
  yd: 3,
  m: 3.28084,
  cm: 0.0328084,
};

export function toFeet(value: number, unit: Unit): number {
  return value * TO_FEET[unit];
}

export function calcSlabVolumeCuFt(
  length: number,
  lengthUnit: Unit,
  width: number,
  widthUnit: Unit,
  thickness: number,
  thicknessUnit: Unit,
  quantity: number
): number {
  const l = toFeet(length, lengthUnit);
  const w = toFeet(width, widthUnit);
  const t = toFeet(thickness, thicknessUnit);
  return l * w * t * quantity;
}

export function calcWallVolumeCuFt(
  length: number,
  lengthUnit: Unit,
  height: number,
  heightUnit: Unit,
  thickness: number,
  thicknessUnit: Unit,
  quantity: number
): number {
  const l = toFeet(length, lengthUnit);
  const h = toFeet(height, heightUnit);
  const t = toFeet(thickness, thicknessUnit);
  return l * h * t * quantity;
}

export function calcColumnVolumeCuFt(
  diameter: number,
  diameterUnit: Unit,
  height: number,
  heightUnit: Unit,
  quantity: number
): number {
  const d = toFeet(diameter, diameterUnit);
  const h = toFeet(height, heightUnit);
  return Math.PI * Math.pow(d / 2, 2) * h * quantity;
}

export function calcCircularSlabVolumeCuFt(
  diameter: number,
  diameterUnit: Unit,
  thickness: number,
  thicknessUnit: Unit,
  quantity: number
): number {
  const d = toFeet(diameter, diameterUnit);
  const t = toFeet(thickness, thicknessUnit);
  return Math.PI * Math.pow(d / 2, 2) * t * quantity;
}

export function calcStairsVolumeCuFt(
  run: number,
  runUnit: Unit,
  rise: number,
  riseUnit: Unit,
  width: number,
  widthUnit: Unit,
  numSteps: number,
  platformDepth: number,
  platformUnit: Unit
): number {
  const r = toFeet(run, runUnit);
  const h = toFeet(rise, riseUnit);
  const w = toFeet(width, widthUnit);
  const pd = toFeet(platformDepth, platformUnit);

  // Each step is a rectangular prism of width × run × (rise × stepNumber)
  // This accounts for the full concrete below each step
  let totalVol = 0;
  for (let i = 1; i <= numSteps; i++) {
    totalVol += w * r * (h * i);
  }
  // Platform at top: width × platformDepth × (rise × numSteps)
  if (pd > 0) {
    totalVol += w * pd * (h * numSteps);
  }
  return totalVol;
}

export function calcCurbVolumeCuFt(
  curbDepth: number,
  curbDepthUnit: Unit,
  gutterWidth: number,
  gutterWidthUnit: Unit,
  curbHeight: number,
  curbHeightUnit: Unit,
  flagThickness: number,
  flagThicknessUnit: Unit,
  length: number,
  lengthUnit: Unit,
  quantity: number
): number {
  const cd = toFeet(curbDepth, curbDepthUnit);
  const gw = toFeet(gutterWidth, gutterWidthUnit);
  const ch = toFeet(curbHeight, curbHeightUnit);
  const ft = toFeet(flagThickness, flagThicknessUnit);
  const l = toFeet(length, lengthUnit);

  // L-shaped cross section: curb face + gutter flat
  const curbArea = cd * ch;
  const gutterArea = gw * ft;
  const crossSection = curbArea + gutterArea;
  return crossSection * l * quantity;
}

// Conversion utilities
export function cuFtToCuYd(cuFt: number): number {
  return cuFt / 27;
}

export function cuFtToCuM(cuFt: number): number {
  return cuFt * 0.0283168;
}

// Bag calculations
export const BAG_YIELDS = {
  40: 0.011, // cubic yards
  60: 0.017,
  80: 0.022,
} as const;

export function bagsNeeded(cuYd: number, bagSize: 40 | 60 | 80): number {
  return Math.ceil(cuYd / BAG_YIELDS[bagSize]);
}

// Weight
export function weightLbs(cuFt: number): number {
  return cuFt * 150;
}

export function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

export function formatNumber(n: number, decimals = 2): string {
  if (isNaN(n) || !isFinite(n)) return "0";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatInt(n: number): string {
  if (isNaN(n) || !isFinite(n)) return "0";
  return Math.ceil(n).toLocaleString("en-US");
}
