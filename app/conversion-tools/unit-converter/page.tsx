import type { Metadata } from "next";
import HubConverter from "./components/HubConverter";

export const metadata: Metadata = {
  title: "Free Unit Converter \u2014 Length, Weight, Temperature, Volume & More | EveryFreeTool",
  description:
    "Convert between 200+ units of measurement instantly. Length, weight, temperature, volume, speed, area, data, time, and more. Free online converter with reference tables and formulas.",
  openGraph: {
    title: "Free Unit Converter \u2014 Length, Weight, Temperature, Volume & More | EveryFreeTool",
    description:
      "Convert between 200+ units of measurement instantly. Length, weight, temperature, volume, speed, area, data, time, and more.",
    type: "website",
    url: "https://everyfreetool.com/conversion-tools/unit-converter",
    siteName: "EveryFreeTool",
  },
  twitter: {
    card: "summary",
    title: "Free Unit Converter \u2014 Length, Weight, Temperature, Volume & More | EveryFreeTool",
    description:
      "Convert between 200+ units of measurement instantly. Free online converter with reference tables and formulas.",
  },
  robots: "index, follow",
};

const faqs = [
  { name: "How accurate is this unit converter?", text: "All conversions use internationally agreed-upon exact definitions where available. Results are accurate to the full precision of JavaScript floating-point arithmetic." },
  { name: "Does this converter work offline?", text: "Yes. Once the page loads, all calculations run in your browser. No server calls or internet connection needed." },
  { name: "Why are temperature conversions different?", text: "Temperature scales have different zero points, so conversion requires both multiplication and addition. For example, \u00B0F = (\u00B0C \u00D7 9/5) + 32." },
  { name: "What\u2019s the difference between MB and MiB?", text: "MB uses decimal (1 MB = 1,000,000 bytes) while MiB uses binary (1 MiB = 1,048,576 bytes). This is why hard drives appear smaller than advertised." },
  { name: "Can I convert between different categories?", text: "No. You can only convert between units of the same type (e.g., length to length). Converting between different physical quantities isn\u2019t possible." },
];

export default function UnitConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Universal Unit Converter",
            description:
              "Convert between 200+ units of measurement instantly. Length, weight, temperature, volume, speed, area, digital storage, time, energy, pressure, and fuel economy.",
            url: "https://everyfreetool.com/conversion-tools/unit-converter",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: [
              "200+ units across 11 categories",
              "Real-time bidirectional conversion",
              "Temperature formula conversion",
              "Quick reference tables",
              "Adjustable precision",
              "Copy result to clipboard",
            ],
            creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.name,
              acceptedAnswer: { "@type": "Answer", text: f.text },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://everyfreetool.com" },
              { "@type": "ListItem", position: 2, name: "Unit Converter", item: "https://everyfreetool.com/conversion-tools/unit-converter" },
            ],
          }),
        }}
      />
      <HubConverter />
    </>
  );
}
