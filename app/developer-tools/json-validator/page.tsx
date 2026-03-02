import type { Metadata } from "next";
import JsonFormatter from "../json-formatter/components/JsonFormatter";

export const metadata: Metadata = {
  title: "JSON Validator — Check If Your JSON Is Valid Instantly | EveryFreeTool",
  description: "Validate JSON syntax against RFC 8259. See line-by-line errors with human-readable messages. Auto-fix trailing commas, single quotes, unquoted keys. Free, no signup.",
  openGraph: { title: "JSON Validator — Instant Syntax Checking", description: "Validate JSON with detailed error messages and auto-fix for common mistakes. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function JsonValidatorPage() {
  const faqs = [
    { name: "What does JSON validation mean?", text: "JSON validation checks whether your text conforms to the JSON specification (ECMA-404 / RFC 8259). Valid JSON uses double quotes for keys and strings, has no trailing commas, no comments, and proper bracket matching." },
    { name: "What common errors does the auto-fix repair?", text: "Trailing commas after the last item, single quotes instead of double quotes, unquoted keys, JavaScript comments (// and /* */), and missing commas between items." },
    { name: "Is my data safe?", text: "All validation happens in your browser. No data is sent to any server." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "JSON Validator", url: "https://everyfreetool.com/developer-tools/json-validator",
        description: "Validate JSON syntax with detailed error messages and auto-fix. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">JSON Validator &mdash; Check If Your JSON Is Valid Instantly</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste any JSON to validate its syntax against the RFC 8259 standard. Get detailed error messages with line numbers and auto-fix for common mistakes.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Common JSON Errors</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>JSON is strict. Unlike JavaScript objects, JSON requires <strong style={{ color: "var(--text)" }}>double quotes</strong> around all keys and string values, <strong style={{ color: "var(--text)" }}>no trailing commas</strong> after the last item in arrays or objects, and <strong style={{ color: "var(--text)" }}>no comments</strong> of any kind. These rules trip up developers daily.</p>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Our auto-fix feature can repair most of these errors automatically. Click &ldquo;Try to Fix&rdquo; and the tool will replace single quotes, remove trailing commas, quote unquoted keys, and strip comments.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Why Validation Matters</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Malformed JSON breaks API calls, crashes parsers, and causes silent data loss. A missing comma or extra bracket can take hours to debug in a large file. This validator pinpoints the exact error location so you can fix it in seconds.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste your JSON below to validate it instantly.</p>
          </div>
        </div>
      </div>
      <JsonFormatter title="JSON Validator" subtitle="Validate JSON syntax with detailed error messages and auto-fix." defaultTab="format" articleMode={true} />
    </>
  );
}
