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
