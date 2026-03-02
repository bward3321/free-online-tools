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
