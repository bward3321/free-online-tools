// ---------- COLOR PALETTES ----------

export interface ColorPalette {
  name: string;
  colors: string[];
}

export const PALETTES: ColorPalette[] = [
  {
    name: "Pico-8",
    colors: [
      "#000000", "#1D2B53", "#7E2553", "#008751",
      "#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8",
      "#FF004D", "#FFA300", "#FFEC27", "#00E436",
      "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA",
    ],
  },
  {
    name: "Pixel Classic",
    colors: [
      "#000000", "#FFFFFF", "#880000", "#AAFFEE",
      "#CC44CC", "#00CC55", "#0000AA", "#EEEE77",
      "#DD8855", "#664400", "#FF7777", "#333333",
      "#777777", "#AAFF66", "#0088FF", "#BBBBBB",
    ],
  },
  {
    name: "Endesga 32",
    colors: [
      "#be4a2f", "#d77643", "#ead4aa", "#e4a672",
      "#b86f50", "#733e39", "#3e2731", "#a22633",
      "#e43b44", "#f77622", "#feae34", "#fee761",
      "#63c74d", "#3e8948", "#265c42", "#193c3e",
      "#124e89", "#0099db", "#2ce8f5", "#ffffff",
      "#c0cbdc", "#8b9bb4", "#5a6988", "#3a4466",
      "#262b44", "#181425", "#ff0044", "#68386c",
      "#b55088", "#f6757a", "#e8b796", "#c28569",
    ],
  },
  {
    name: "Material",
    colors: [
      "#F44336", "#E91E63", "#9C27B0", "#673AB7",
      "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4",
      "#009688", "#4CAF50", "#8BC34A", "#CDDC39",
      "#FFEB3B", "#FFC107", "#FF9800", "#FF5722",
      "#795548", "#9E9E9E", "#607D8B", "#000000",
      "#FFFFFF", "#263238",
    ],
  },
  {
    name: "Pastel",
    colors: [
      "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9",
      "#BAE1FF", "#E8BAFF", "#FFB3DE", "#FFD4B3",
      "#D4FFB3", "#B3FFE8", "#B3D4FF", "#D4B3FF",
      "#FFFFFF", "#E0E0E0", "#A0A0A0", "#404040",
    ],
  },
  {
    name: "Monochrome",
    colors: [
      "#000000", "#1a1a1a", "#333333", "#4d4d4d",
      "#666666", "#808080", "#999999", "#b3b3b3",
      "#cccccc", "#e6e6e6", "#f2f2f2", "#FFFFFF",
    ],
  },
  {
    name: "Brand Colors",
    colors: [
      "#4285F4", "#DB4437", "#F4B400", "#0F9D58",
      "#1877F2", "#000000", "#1DA1F2", "#FF0000",
      "#FF6900", "#0A66C2", "#E4405F", "#BD081C",
      "#25D366", "#7289DA", "#6441A5", "#FFFFFF",
    ],
  },
];

export const DEFAULT_FOREGROUND = "#000000";
export const DEFAULT_BACKGROUND = "#FFFFFF";
