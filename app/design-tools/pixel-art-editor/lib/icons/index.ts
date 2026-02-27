export type { PixelIcon } from "./types";
export { parseIconData } from "./types";
import { LETTER_ICONS, NUMBER_ICONS } from "./letters";
import {
  ARROW_ICONS,
  SOCIAL_ICONS,
  BUSINESS_ICONS,
  TECH_ICONS,
  SHOPPING_ICONS,
  MEDIA_ICONS,
  NATURE_ICONS,
  FOOD_ICONS,
  TRAVEL_ICONS,
  HEALTH_ICONS,
  UI_ICONS,
  SHAPE_ICONS,
  EMOJI_ICONS,
  ANIMAL_ICONS,
} from "./misc-icons";

export const ALL_ICONS = [
  ...LETTER_ICONS,
  ...NUMBER_ICONS,
  ...ARROW_ICONS,
  ...SOCIAL_ICONS,
  ...BUSINESS_ICONS,
  ...TECH_ICONS,
  ...SHOPPING_ICONS,
  ...MEDIA_ICONS,
  ...NATURE_ICONS,
  ...FOOD_ICONS,
  ...TRAVEL_ICONS,
  ...HEALTH_ICONS,
  ...UI_ICONS,
  ...SHAPE_ICONS,
  ...EMOJI_ICONS,
  ...ANIMAL_ICONS,
];

export const ICON_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "letters", label: "Letters & Numbers" },
  { id: "arrows", label: "Arrows & Navigation" },
  { id: "social", label: "Social & Communication" },
  { id: "business", label: "Business & Finance" },
  { id: "technology", label: "Technology & Dev" },
  { id: "shopping", label: "Shopping & Commerce" },
  { id: "media", label: "Media & Entertainment" },
  { id: "nature", label: "Nature & Weather" },
  { id: "food", label: "Food & Drink" },
  { id: "travel", label: "Travel & Transport" },
  { id: "health", label: "Health & Fitness" },
  { id: "ui", label: "UI & Interface" },
  { id: "shapes", label: "Shapes & Badges" },
  { id: "emoji", label: "Emoji & Expressions" },
  { id: "animals", label: "Animals" },
];
