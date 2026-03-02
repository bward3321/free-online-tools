// ── Unit Definitions & Conversion Logic ──────────────────────────────
// Every non-temperature category converts through a base unit:
//   value_in_target = value * fromUnit.toBase / toUnit.toBase
// Temperature & fuel economy use custom formulas.

export interface UnitDef {
  name: string;
  abbr: string;
  toBase: number; // multiplier to convert 1 of this unit into the base unit
}

export interface CategoryDef {
  id: string;
  emoji: string;
  label: string;
  baseUnit: string;
  units: Record<string, UnitDef>;
}

// ── Length (base: meter) ─────────────────────────────────────────────
export const LENGTH: CategoryDef = {
  id: "length",
  emoji: "\uD83D\uDCCF",
  label: "Length",
  baseUnit: "meter",
  units: {
    millimeter:   { name: "Millimeter",     abbr: "mm",  toBase: 0.001 },
    centimeter:   { name: "Centimeter",     abbr: "cm",  toBase: 0.01 },
    meter:        { name: "Meter",          abbr: "m",   toBase: 1 },
    kilometer:    { name: "Kilometer",      abbr: "km",  toBase: 1000 },
    inch:         { name: "Inch",           abbr: "in",  toBase: 0.0254 },
    foot:         { name: "Foot",           abbr: "ft",  toBase: 0.3048 },
    yard:         { name: "Yard",           abbr: "yd",  toBase: 0.9144 },
    mile:         { name: "Mile",           abbr: "mi",  toBase: 1609.344 },
    nauticalMile: { name: "Nautical Mile",  abbr: "nmi", toBase: 1852 },
    micrometer:   { name: "Micrometer",     abbr: "\u03BCm", toBase: 0.000001 },
    nanometer:    { name: "Nanometer",      abbr: "nm",  toBase: 1e-9 },
    lightYear:    { name: "Light Year",     abbr: "ly",  toBase: 9.461e15 },
  },
};

// ── Weight & Mass (base: kilogram) ───────────────────────────────────
export const WEIGHT: CategoryDef = {
  id: "weight",
  emoji: "\u2696\uFE0F",
  label: "Weight & Mass",
  baseUnit: "kilogram",
  units: {
    microgram:   { name: "Microgram",      abbr: "\u03BCg",        toBase: 1e-9 },
    milligram:   { name: "Milligram",      abbr: "mg",        toBase: 0.000001 },
    gram:        { name: "Gram",           abbr: "g",         toBase: 0.001 },
    kilogram:    { name: "Kilogram",       abbr: "kg",        toBase: 1 },
    metricTon:   { name: "Metric Ton",     abbr: "t",         toBase: 1000 },
    ounce:       { name: "Ounce",          abbr: "oz",        toBase: 0.028349523125 },
    pound:       { name: "Pound",          abbr: "lb",        toBase: 0.45359237 },
    stone:       { name: "Stone",          abbr: "st",        toBase: 6.35029318 },
    shortTon:    { name: "US Ton",         abbr: "short ton", toBase: 907.18474 },
    longTon:     { name: "Imperial Ton",   abbr: "long ton",  toBase: 1016.0469088 },
  },
};

// ── Temperature (special — no toBase multiplier) ─────────────────────
export const TEMPERATURE: CategoryDef = {
  id: "temperature",
  emoji: "\uD83C\uDF21\uFE0F",
  label: "Temperature",
  baseUnit: "celsius",
  units: {
    celsius:    { name: "Celsius",    abbr: "\u00B0C", toBase: 1 },
    fahrenheit: { name: "Fahrenheit", abbr: "\u00B0F", toBase: 1 },
    kelvin:     { name: "Kelvin",     abbr: "K",  toBase: 1 },
    rankine:    { name: "Rankine",    abbr: "\u00B0R", toBase: 1 },
  },
};

// ── Volume (base: liter) ─────────────────────────────────────────────
export const VOLUME: CategoryDef = {
  id: "volume",
  emoji: "\uD83E\uDDEA",
  label: "Volume",
  baseUnit: "liter",
  units: {
    milliliter:  { name: "Milliliter",     abbr: "mL",     toBase: 0.001 },
    liter:       { name: "Liter",          abbr: "L",      toBase: 1 },
    cubicMeter:  { name: "Cubic Meter",    abbr: "m\u00B3",     toBase: 1000 },
    gallonUS:    { name: "Gallon (US)",    abbr: "gal",    toBase: 3.785411784 },
    gallonUK:    { name: "Gallon (UK)",    abbr: "imp gal",toBase: 4.54609 },
    quartUS:     { name: "Quart (US)",     abbr: "qt",     toBase: 0.946352946 },
    pintUS:      { name: "Pint (US)",      abbr: "pt",     toBase: 0.473176473 },
    cupUS:       { name: "Cup (US)",       abbr: "cup",    toBase: 0.2365882365 },
    fluidOzUS:   { name: "Fluid Ounce (US)", abbr: "fl oz", toBase: 0.0295735295625 },
    tablespoon:  { name: "Tablespoon",     abbr: "tbsp",   toBase: 0.01478676478125 },
    teaspoon:    { name: "Teaspoon",       abbr: "tsp",    toBase: 0.00492892159375 },
    cubicFoot:   { name: "Cubic Foot",     abbr: "ft\u00B3",    toBase: 28.316846592 },
    cubicInch:   { name: "Cubic Inch",     abbr: "in\u00B3",    toBase: 0.016387064 },
  },
};

// ── Speed (base: m/s) ────────────────────────────────────────────────
export const SPEED: CategoryDef = {
  id: "speed",
  emoji: "\u26A1",
  label: "Speed",
  baseUnit: "metersPerSecond",
  units: {
    metersPerSecond: { name: "Meters per second", abbr: "m/s",  toBase: 1 },
    kmPerHour:       { name: "Kilometers per hour", abbr: "km/h", toBase: 0.277777778 },
    milesPerHour:    { name: "Miles per hour",    abbr: "mph",  toBase: 0.44704 },
    knot:            { name: "Knot",              abbr: "kn",   toBase: 0.514444444 },
    feetPerSecond:   { name: "Feet per second",   abbr: "ft/s", toBase: 0.3048 },
    mach:            { name: "Mach",              abbr: "Mach", toBase: 343 },
  },
};

// ── Area (base: m²) ──────────────────────────────────────────────────
export const AREA: CategoryDef = {
  id: "area",
  emoji: "\uD83D\uDCD0",
  label: "Area",
  baseUnit: "squareMeter",
  units: {
    squareMillimeter: { name: "Square Millimeter", abbr: "mm\u00B2", toBase: 0.000001 },
    squareCentimeter: { name: "Square Centimeter", abbr: "cm\u00B2", toBase: 0.0001 },
    squareMeter:      { name: "Square Meter",      abbr: "m\u00B2",  toBase: 1 },
    squareKilometer:  { name: "Square Kilometer",  abbr: "km\u00B2", toBase: 1e6 },
    squareInch:       { name: "Square Inch",       abbr: "in\u00B2", toBase: 0.00064516 },
    squareFoot:       { name: "Square Foot",       abbr: "ft\u00B2", toBase: 0.09290304 },
    squareYard:       { name: "Square Yard",       abbr: "yd\u00B2", toBase: 0.83612736 },
    squareMile:       { name: "Square Mile",       abbr: "mi\u00B2", toBase: 2589988.110336 },
    acre:             { name: "Acre",              abbr: "ac",   toBase: 4046.8564224 },
    hectare:          { name: "Hectare",           abbr: "ha",   toBase: 10000 },
  },
};

// ── Digital Storage (base: byte) ─────────────────────────────────────
export const DIGITAL_STORAGE: CategoryDef = {
  id: "digitalStorage",
  emoji: "\uD83D\uDCBE",
  label: "Digital Storage",
  baseUnit: "byte",
  units: {
    bit:      { name: "Bit",       abbr: "bit",  toBase: 0.125 },
    byte:     { name: "Byte",      abbr: "B",    toBase: 1 },
    kilobyte: { name: "Kilobyte",  abbr: "KB",   toBase: 1000 },
    megabyte: { name: "Megabyte",  abbr: "MB",   toBase: 1e6 },
    gigabyte: { name: "Gigabyte",  abbr: "GB",   toBase: 1e9 },
    terabyte: { name: "Terabyte",  abbr: "TB",   toBase: 1e12 },
    petabyte: { name: "Petabyte",  abbr: "PB",   toBase: 1e15 },
    kibibyte: { name: "Kibibyte",  abbr: "KiB",  toBase: 1024 },
    mebibyte: { name: "Mebibyte",  abbr: "MiB",  toBase: 1048576 },
    gibibyte: { name: "Gibibyte",  abbr: "GiB",  toBase: 1073741824 },
    tebibyte: { name: "Tebibyte",  abbr: "TiB",  toBase: 1099511627776 },
  },
};

// ── Time (base: second) ──────────────────────────────────────────────
export const TIME: CategoryDef = {
  id: "time",
  emoji: "\u23F1\uFE0F",
  label: "Time",
  baseUnit: "second",
  units: {
    millisecond: { name: "Millisecond", abbr: "ms",   toBase: 0.001 },
    second:      { name: "Second",      abbr: "s",    toBase: 1 },
    minute:      { name: "Minute",      abbr: "min",  toBase: 60 },
    hour:        { name: "Hour",        abbr: "hr",   toBase: 3600 },
    day:         { name: "Day",         abbr: "day",  toBase: 86400 },
    week:        { name: "Week",        abbr: "wk",   toBase: 604800 },
    month:       { name: "Month",       abbr: "mo",   toBase: 2592000 },
    year:        { name: "Year",        abbr: "yr",   toBase: 31557600 },
    decade:      { name: "Decade",      abbr: "dec",  toBase: 315576000 },
    century:     { name: "Century",     abbr: "cent", toBase: 3155760000 },
  },
};

// ── Energy (base: joule) ─────────────────────────────────────────────
export const ENERGY: CategoryDef = {
  id: "energy",
  emoji: "\uD83D\uDD0B",
  label: "Energy",
  baseUnit: "joule",
  units: {
    joule:        { name: "Joule",          abbr: "J",      toBase: 1 },
    kilojoule:    { name: "Kilojoule",      abbr: "kJ",     toBase: 1000 },
    calorie:      { name: "Calorie",        abbr: "cal",    toBase: 4.184 },
    kilocalorie:  { name: "Kilocalorie",    abbr: "kcal",   toBase: 4184 },
    wattHour:     { name: "Watt-hour",      abbr: "Wh",     toBase: 3600 },
    kilowattHour: { name: "Kilowatt-hour",  abbr: "kWh",    toBase: 3600000 },
    btu:          { name: "BTU",            abbr: "BTU",    toBase: 1055.06 },
    electronvolt: { name: "Electronvolt",   abbr: "eV",     toBase: 1.602176634e-19 },
    footPound:    { name: "Foot-pound",     abbr: "ft\u00B7lbf", toBase: 1.3558179483 },
  },
};

// ── Pressure (base: pascal) ──────────────────────────────────────────
export const PRESSURE: CategoryDef = {
  id: "pressure",
  emoji: "\uD83D\uDCCA",
  label: "Pressure",
  baseUnit: "pascal",
  units: {
    pascal:     { name: "Pascal",     abbr: "Pa",   toBase: 1 },
    kilopascal: { name: "Kilopascal", abbr: "kPa",  toBase: 1000 },
    bar:        { name: "Bar",        abbr: "bar",  toBase: 100000 },
    psi:        { name: "PSI",        abbr: "psi",  toBase: 6894.757293168 },
    atmosphere: { name: "Atmosphere", abbr: "atm",  toBase: 101325 },
    torr:       { name: "Torr",       abbr: "mmHg", toBase: 133.3223684211 },
  },
};

// ── Fuel Economy (special — inverse relationship for L/100km) ────────
export const FUEL_ECONOMY: CategoryDef = {
  id: "fuelEconomy",
  emoji: "\uD83E\uDDCA",
  label: "Fuel Economy",
  baseUnit: "mpgUS",
  units: {
    mpgUS:       { name: "Miles per gallon (US)", abbr: "mpg",      toBase: 1 },
    mpgUK:       { name: "Miles per gallon (UK)", abbr: "mpg (UK)", toBase: 1.20095 },
    kmPerLiter:  { name: "Kilometers per liter",  abbr: "km/L",     toBase: 2.352145833 },
    lPer100km:   { name: "Liters per 100 km",     abbr: "L/100km",  toBase: -1 }, // sentinel, handled in convert()
  },
};

// ── All categories in display order ──────────────────────────────────
export const ALL_CATEGORIES: CategoryDef[] = [
  LENGTH,
  WEIGHT,
  TEMPERATURE,
  VOLUME,
  SPEED,
  AREA,
  DIGITAL_STORAGE,
  TIME,
  ENERGY,
  PRESSURE,
  FUEL_ECONOMY,
];

export function getCategoryById(id: string): CategoryDef | undefined {
  return ALL_CATEGORIES.find((c) => c.id === id);
}

// ── Conversion function ──────────────────────────────────────────────
export function convert(
  value: number,
  fromKey: string,
  toKey: string,
  category: CategoryDef,
): number {
  if (category.id === "temperature") {
    return convertTemperature(value, fromKey, toKey);
  }
  if (category.id === "fuelEconomy") {
    return convertFuelEconomy(value, fromKey, toKey);
  }
  const from = category.units[fromKey];
  const to = category.units[toKey];
  if (!from || !to) return NaN;
  return (value * from.toBase) / to.toBase;
}

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;
  // Convert to Celsius first
  let celsius: number;
  switch (from) {
    case "celsius":    celsius = value; break;
    case "fahrenheit": celsius = (value - 32) * 5 / 9; break;
    case "kelvin":     celsius = value - 273.15; break;
    case "rankine":    celsius = (value - 491.67) * 5 / 9; break;
    default: return NaN;
  }
  // Convert from Celsius to target
  switch (to) {
    case "celsius":    return celsius;
    case "fahrenheit": return celsius * 9 / 5 + 32;
    case "kelvin":     return celsius + 273.15;
    case "rankine":    return (celsius + 273.15) * 9 / 5;
    default: return NaN;
  }
}

function convertFuelEconomy(value: number, from: string, to: string): number {
  if (from === to) return value;
  // Convert everything to mpgUS first
  let mpgUS: number;
  switch (from) {
    case "mpgUS":      mpgUS = value; break;
    case "mpgUK":      mpgUS = value / 1.20095; break;
    case "kmPerLiter": mpgUS = value / 2.352145833; break;
    case "lPer100km":  mpgUS = 235.215 / value; break;
    default: return NaN;
  }
  // Convert from mpgUS to target
  switch (to) {
    case "mpgUS":      return mpgUS;
    case "mpgUK":      return mpgUS * 1.20095;
    case "kmPerLiter": return mpgUS * 2.352145833;
    case "lPer100km":  return 235.215 / mpgUS;
    default: return NaN;
  }
}

// ── Formatting ───────────────────────────────────────────────────────
export function formatResult(value: number, precision: number, categoryId?: string): string {
  if (!isFinite(value)) return "—";
  // Full precision
  if (precision === -1) {
    return String(value);
  }
  // Scientific notation for very large/small numbers
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-6)) {
    return value.toExponential(precision);
  }
  // Digital storage: whole numbers when > 1
  if (categoryId === "digitalStorage" && abs >= 1) {
    if (Number.isInteger(value)) return String(value);
    return parseFloat(value.toFixed(precision)).toString();
  }
  return parseFloat(value.toFixed(precision)).toString();
}

export function getDefaultPrecision(categoryId: string): number {
  if (categoryId === "temperature") return 2;
  return 4;
}

// ── Formula string ───────────────────────────────────────────────────
export function getFormulaString(
  fromKey: string,
  toKey: string,
  category: CategoryDef,
): string {
  const from = category.units[fromKey];
  const to = category.units[toKey];
  if (!from || !to) return "";

  if (category.id === "temperature") {
    return getTemperatureFormula(fromKey, toKey);
  }
  if (category.id === "fuelEconomy" && (fromKey === "lPer100km" || toKey === "lPer100km")) {
    if (fromKey === "lPer100km") {
      return `${to.abbr} = 235.215 \u00F7 ${from.abbr}`;
    }
    return `${to.abbr} = 235.215 \u00F7 ${from.abbr}`;
  }

  const factor = from.toBase / to.toBase;
  const factorStr = formatResult(factor, 6);
  return `1 ${from.abbr} = ${factorStr} ${to.abbr}`;
}

function getTemperatureFormula(from: string, to: string): string {
  const labels: Record<string, string> = {
    celsius: "\u00B0C",
    fahrenheit: "\u00B0F",
    kelvin: "K",
    rankine: "\u00B0R",
  };
  if (from === "celsius" && to === "fahrenheit") return `${labels[to]} = (${labels[from]} \u00D7 9/5) + 32`;
  if (from === "fahrenheit" && to === "celsius") return `${labels[to]} = (${labels[from]} \u2212 32) \u00D7 5/9`;
  if (from === "celsius" && to === "kelvin") return `${labels[to]} = ${labels[from]} + 273.15`;
  if (from === "kelvin" && to === "celsius") return `${labels[to]} = ${labels[from]} \u2212 273.15`;
  if (from === "fahrenheit" && to === "kelvin") return `${labels[to]} = (${labels[from]} \u2212 32) \u00D7 5/9 + 273.15`;
  if (from === "kelvin" && to === "fahrenheit") return `${labels[to]} = (${labels[from]} \u2212 273.15) \u00D7 9/5 + 32`;
  if (from === "celsius" && to === "rankine") return `${labels[to]} = (${labels[from]} + 273.15) \u00D7 9/5`;
  if (from === "rankine" && to === "celsius") return `${labels[to]} = (${labels[from]} \u2212 491.67) \u00D7 5/9`;
  if (from === "fahrenheit" && to === "rankine") return `${labels[to]} = ${labels[from]} + 459.67`;
  if (from === "rankine" && to === "fahrenheit") return `${labels[to]} = ${labels[from]} \u2212 459.67`;
  if (from === "kelvin" && to === "rankine") return `${labels[to]} = ${labels[from]} \u00D7 9/5`;
  if (from === "rankine" && to === "kelvin") return `${labels[to]} = ${labels[from]} \u00D7 5/9`;
  return "";
}
