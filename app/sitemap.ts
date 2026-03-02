import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://everyfreetool.com";

// Main tool pages — the primary version of each tool
const mainToolRoutes = [
  "/business-tools/salary-negotiation-calculator",
  "/business-tools/meeting-cost-calculator",
  "/business-tools/true-hourly-rate-calculator",
  "/construction/concrete-calculator",
  "/design-tools/pixel-art-editor",
  "/finance-tools/subscription-calculator",
  "/image-tools/image-compressor",
  "/utility-tools/qr-code-generator",
  "/utility-tools/password-generator",
  "/writing-tools/word-counter",
  "/developer-tools/json-formatter",
  "/developer-tools/base64-encoder-decoder",
  "/developer-tools/url-encoder-decoder",
  "/developer-tools/hash-generator",
  "/design-tools/color-picker",
  "/developer-tools/regex-tester",
  "/writing-tools/markdown-editor",
  "/design-tools/css-gradient-generator",
  "/writing-tools/lorem-ipsum-generator",
  "/conversion-tools/unit-converter",
  "/business-tools/invoice-generator",
  "/construction-tools/fence-calculator",
];

// SEO variant routes — alternate entry points for the same tools
const variantRoutes = [
  // Salary negotiation variants
  "/business-tools/compound-salary-calculator",
  "/business-tools/cost-of-not-negotiating-salary",
  "/business-tools/lifetime-salary-calculator",
  "/business-tools/raise-calculator",
  // Meeting cost variants
  "/business-tools/how-much-do-meetings-cost",
  "/business-tools/meeting-cost-timer",
  // True hourly rate variants
  "/business-tools/real-hourly-wage-calculator",
  "/business-tools/salary-to-hourly-calculator",
  "/business-tools/what-do-i-actually-make-per-hour",
  "/business-tools/commute-cost-calculator",
  // Design tool variants
  "/design-tools/favicon-generator",
  "/design-tools/icon-maker",
  "/design-tools/pixel-art-maker",
  // Color picker variants
  "/design-tools/hex-to-rgb",
  "/design-tools/rgb-to-hex",
  "/design-tools/color-converter",
  "/design-tools/color-palette-generator",
  "/design-tools/contrast-checker",
  "/design-tools/hsl-to-hex",
  "/design-tools/hex-color-codes",
  "/design-tools/rgba-to-hex",
  "/design-tools/image-color-picker",
  // Finance tool variants
  "/finance-tools/cancel-subscriptions-save-money",
  "/finance-tools/how-much-do-i-spend-on-subscriptions",
  "/finance-tools/streaming-cost-calculator",
  "/finance-tools/subscription-audit",
  // Image tool variants
  "/image-tools/compress-image-to-100kb",
  "/image-tools/compress-image-to-200kb",
  "/image-tools/convert-image",
  "/image-tools/crop-image",
  "/image-tools/resize-image",
  // QR code generator variants
  "/utility-tools/wifi-qr-code-generator",
  "/utility-tools/free-qr-code-generator",
  "/utility-tools/qr-code-generator-with-logo",
  "/utility-tools/vcard-qr-code-generator",
  "/utility-tools/bulk-qr-code-generator",
  // Password generator variants
  "/utility-tools/password-strength-checker",
  "/utility-tools/passphrase-generator",
  "/utility-tools/random-password-generator",
  "/utility-tools/strong-password-generator",
  "/utility-tools/pin-generator",
  // Word counter variants
  "/writing-tools/character-counter",
  "/writing-tools/letter-counter",
  "/writing-tools/word-count",
  "/writing-tools/text-counter",
  "/writing-tools/social-media-character-counter",
  // JSON formatter variants
  "/developer-tools/json-validator",
  "/developer-tools/json-beautifier",
  "/developer-tools/json-minifier",
  "/developer-tools/json-viewer",
  "/developer-tools/json-to-csv",
  "/developer-tools/json-to-yaml",
  "/developer-tools/csv-to-json",
  // Base64 encoder/decoder variants
  "/developer-tools/base64-encoder",
  "/developer-tools/base64-decoder",
  "/developer-tools/image-to-base64",
  "/developer-tools/base64-to-image",
  "/developer-tools/base64-encode",
  "/developer-tools/base64-decode",
  // Hash generator variants
  "/developer-tools/md5-hash-generator",
  "/developer-tools/sha256-hash-generator",
  "/developer-tools/sha1-hash-generator",
  "/developer-tools/sha512-hash-generator",
  "/developer-tools/file-checksum-calculator",
  "/developer-tools/hmac-generator",
  "/developer-tools/hash-checker",
  "/developer-tools/checksum-verifier",
  // URL encoder/decoder variants
  "/developer-tools/url-encoder",
  "/developer-tools/url-decoder",
  "/developer-tools/url-parser",
  "/developer-tools/percent-encoding",
  "/developer-tools/urlencode",
  "/developer-tools/urldecode",
  // Regex tester variants
  "/developer-tools/regex-checker",
  "/developer-tools/regex-validator",
  "/developer-tools/regex-match-tester",
  "/developer-tools/regex-replace-tester",
  "/developer-tools/regex-cheat-sheet",
  "/developer-tools/regex-patterns",
  "/developer-tools/regex-debugger",
  // Markdown editor variants
  "/writing-tools/markdown-previewer",
  "/writing-tools/markdown-to-html",
  "/writing-tools/html-to-markdown",
  "/writing-tools/markdown-table-generator",
  "/writing-tools/readme-editor",
  "/writing-tools/online-text-editor",
  // CSS gradient generator variants
  "/design-tools/linear-gradient-generator",
  "/design-tools/radial-gradient-generator",
  "/design-tools/conic-gradient-generator",
  "/design-tools/gradient-color-palette",
  "/design-tools/tailwind-gradient-generator",
  "/design-tools/text-gradient-generator",
  "/design-tools/animated-gradient-generator",
  // Lorem Ipsum generator variants
  "/writing-tools/placeholder-text-generator",
  "/writing-tools/dummy-text-generator",
  "/writing-tools/random-text-generator",
  "/writing-tools/business-ipsum-generator",
  "/writing-tools/hipster-ipsum-generator",
  // Unit converter spoke pages
  "/conversion-tools/feet-to-meters",
  "/conversion-tools/meters-to-feet",
  "/conversion-tools/inches-to-cm",
  "/conversion-tools/cm-to-inches",
  "/conversion-tools/km-to-miles",
  "/conversion-tools/miles-to-km",
  "/conversion-tools/yards-to-meters",
  "/conversion-tools/meters-to-yards",
  "/conversion-tools/mm-to-inches",
  "/conversion-tools/inches-to-mm",
  "/conversion-tools/feet-to-cm",
  "/conversion-tools/cm-to-feet",
  "/conversion-tools/kg-to-lbs",
  "/conversion-tools/lbs-to-kg",
  "/conversion-tools/grams-to-ounces",
  "/conversion-tools/ounces-to-grams",
  "/conversion-tools/stone-to-kg",
  "/conversion-tools/kg-to-stone",
  "/conversion-tools/lbs-to-stone",
  "/conversion-tools/grams-to-kg",
  "/conversion-tools/celsius-to-fahrenheit",
  "/conversion-tools/fahrenheit-to-celsius",
  "/conversion-tools/celsius-to-kelvin",
  "/conversion-tools/liters-to-gallons",
  "/conversion-tools/gallons-to-liters",
  "/conversion-tools/cups-to-ml",
  "/conversion-tools/ml-to-cups",
  "/conversion-tools/tablespoons-to-ml",
  "/conversion-tools/fluid-ounces-to-ml",
  "/conversion-tools/pints-to-liters",
  "/conversion-tools/mph-to-kmh",
  "/conversion-tools/kmh-to-mph",
  "/conversion-tools/knots-to-mph",
  "/conversion-tools/knots-to-kmh",
  "/conversion-tools/acres-to-sq-feet",
  "/conversion-tools/sq-feet-to-sq-meters",
  "/conversion-tools/hectares-to-acres",
  "/conversion-tools/sq-meters-to-sq-feet",
  "/conversion-tools/mb-to-gb",
  "/conversion-tools/gb-to-tb",
  "/conversion-tools/gb-to-mb",
  "/conversion-tools/tb-to-gb",
  "/conversion-tools/hours-to-minutes",
  "/conversion-tools/days-to-hours",
  "/conversion-tools/weeks-to-days",
  "/conversion-tools/calories-to-joules",
  "/conversion-tools/kwh-to-joules",
  "/conversion-tools/psi-to-bar",
  "/conversion-tools/bar-to-psi",
  "/conversion-tools/mpg-to-l-per-100km",
  // Invoice generator variants
  "/business-tools/freelance-invoice-generator",
  "/business-tools/receipt-generator",
  "/business-tools/estimate-generator",
  "/business-tools/contractor-invoice-template",
  "/business-tools/consulting-invoice-generator",
  // Fence calculator variants
  "/construction-tools/wood-fence-calculator",
  "/construction-tools/vinyl-fence-calculator",
  "/construction-tools/chain-link-fence-calculator",
  "/construction-tools/fence-post-calculator",
  "/construction-tools/fence-cost-estimator",
  "/construction-tools/privacy-fence-calculator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  const homepage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const mainTools: MetadataRoute.Sitemap = mainToolRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const variants: MetadataRoute.Sitemap = variantRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...homepage, ...mainTools, ...variants];
}
