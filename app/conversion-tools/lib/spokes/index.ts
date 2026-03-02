export type { SpokeData } from "./types";
import { lengthSpokes } from "./length";
import { weightSpokes } from "./weight";
import { temperatureSpokes } from "./temperature";
import { volumeSpokes } from "./volume";
import { speedSpokes } from "./speed";
import { areaSpokes, digitalStorageSpokes, timeSpokes, energySpokes, pressureSpokes, fuelEconomySpokes } from "./remaining";

export const ALL_SPOKES = [
  ...lengthSpokes,
  ...weightSpokes,
  ...temperatureSpokes,
  ...volumeSpokes,
  ...speedSpokes,
  ...areaSpokes,
  ...digitalStorageSpokes,
  ...timeSpokes,
  ...energySpokes,
  ...pressureSpokes,
  ...fuelEconomySpokes,
];

export function getSpokeBySlug(slug: string) {
  return ALL_SPOKES.find((s) => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return ALL_SPOKES.map((s) => s.slug);
}
