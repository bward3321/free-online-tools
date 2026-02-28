import type { Metadata } from "next";
import JsonFormatter from "./components/JsonFormatter";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Format, Validate, and Convert JSON Online | EveryFreeTool",
  description: "Format, validate, minify, and convert JSON online. Tree view, diff compare, auto-fix errors, JSON→CSV/YAML/TypeScript converters. 100% client-side, zero ads.",
  openGraph: { title: "JSON Formatter & Validator — Dev Tool", description: "The fastest, cleanest JSON tool. Format, validate, minify, tree view, diff, and convert. Zero ads, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function JsonFormatterPage() {
  const faqs = [
    { name: "Is my JSON data safe?", text: "All processing happens in your browser. No data is sent to any server, stored, or logged. Your JSON never leaves your device — critical when working with API keys, tokens, or user data." },
    { name: "Can this tool fix invalid JSON?", text: "Yes. The auto-fix feature repairs common errors: trailing commas, single quotes, unquoted keys, JavaScript comments, and missing commas." },
    { name: "What's the maximum JSON size?", text: "No hard limit. Handles 10MB+ in most browsers. Formatting a 5MB file takes under a second." },
    { name: "Can I convert JSON to CSV or YAML?", text: "Yes. Built-in converters for JSON→CSV, CSV→JSON, JSON→YAML, and JSON→TypeScript interfaces." },
    { name: "What makes this different from jsonformatter.org?", text: "Zero ads, instant auto-format on paste, tree view with path copying, JSON diff/compare, auto-fix, and converters — all in one page." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "JSON Formatter & Validator",
        url: "https://everyfreetool.com/developer-tools/json-formatter",
        description: "Format, validate, minify, and convert JSON online. Tree view, diff compare, auto-fix, converters. Zero ads, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: ["JSON formatting", "JSON validation", "JSON minification", "Tree view", "JSON diff/compare", "Auto-fix errors", "JSON to CSV", "CSV to JSON", "JSON to YAML", "JSON to TypeScript"],
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <JsonFormatter
        title="JSON Formatter & Validator — Format, Validate, and Convert JSON Online"
        subtitle="Paste JSON to format, validate, minify, or convert instantly. Tree view, diff compare, auto-fix for errors. Zero ads, 100% client-side — your data never leaves the browser."
      />
    </>
  );
}
