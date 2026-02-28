import type { Metadata } from "next";
import JsonFormatter from "../json-formatter/components/JsonFormatter";

export const metadata: Metadata = {
  title: "JSON Minifier — Compress JSON by Removing Whitespace | EveryFreeTool",
  description: "Minify JSON by removing all whitespace. Reduce file size by 50-70%. See before/after size comparison. Free, no signup, 100% client-side.",
  openGraph: { title: "JSON Minifier — Compress JSON Online", description: "Remove all whitespace from JSON to minimize file size. See exact size reduction. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function JsonMinifierPage() {
  const faqs = [
    { name: "What does JSON minification do?", text: "Minification removes all unnecessary whitespace (spaces, tabs, newlines) from JSON, producing the smallest possible string. The data is identical — only formatting is removed." },
    { name: "How much smaller does minified JSON get?", text: "Typically 50-70% smaller for well-formatted JSON. A 10KB formatted file might become 3-5KB minified. The savings depend on indentation depth and amount of whitespace." },
    { name: "When should I minify JSON?", text: "For API payloads (reduce bandwidth), storage optimization, configuration embedding, and anywhere file size matters. Don't minify config files you need to read regularly." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "JSON Minifier", url: "https://everyfreetool.com/developer-tools/json-minifier",
        description: "Minify JSON by removing whitespace. See size comparison. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">JSON Minifier &mdash; Compress JSON by Removing Whitespace</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Remove all whitespace from JSON to create the smallest possible output. See the exact size reduction with before/after comparison.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Why Minify JSON?</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Every space, tab, and newline in formatted JSON adds bytes that machines don&apos;t need. In API responses, those bytes multiply across thousands of requests per second. Minifying reduces payload size by 50-70%, saving bandwidth and improving response times.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Minified vs. Formatted</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Use <strong style={{ color: "var(--text)" }}>minified JSON</strong> for production API payloads, embedded configs, and storage. Use <strong style={{ color: "var(--text)" }}>formatted JSON</strong> for debugging, code review, documentation, and any file humans need to read. This tool does both.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your JSON below &mdash; the minify view is already active.</p>
          </div>
        </div>
      </div>
      <JsonFormatter title="JSON Minifier" subtitle="Remove all whitespace from JSON. See size reduction instantly." defaultTab="minify" articleMode={true} />
    </>
  );
}
