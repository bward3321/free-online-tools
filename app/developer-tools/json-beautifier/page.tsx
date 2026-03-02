import type { Metadata } from "next";
import JsonFormatter from "../json-formatter/components/JsonFormatter";

export const metadata: Metadata = {
  title: "JSON Beautifier — Pretty Print JSON Online | EveryFreeTool",
  description: "Beautify and pretty-print JSON with customizable indentation. Auto-format on paste, syntax highlighting. 2 or 4 spaces, sort keys. Free, no signup.",
  openGraph: { title: "JSON Beautifier — Pretty Print JSON Free", description: "Beautify minified JSON instantly. Auto-format on paste, customizable indentation, syntax highlighting. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function JsonBeautifierPage() {
  const faqs = [
    { name: "What is JSON beautifying?", text: "Beautifying (or pretty-printing) adds proper indentation and line breaks to JSON, making it human-readable. Minified JSON like {\"a\":1,\"b\":2} becomes a multi-line, indented format." },
    { name: "What indentation options are available?", text: "2 spaces (default), 4 spaces, or tabs. You can also sort keys alphabetically for consistent formatting." },
    { name: "Is my data safe?", text: "All formatting happens in your browser. No data is sent to any server." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "JSON Beautifier", url: "https://everyfreetool.com/developer-tools/json-beautifier",
        description: "Pretty-print JSON with customizable indentation. Auto-format on paste. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">JSON Beautifier &mdash; Pretty Print JSON Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste minified or messy JSON and get beautifully formatted output with proper indentation and syntax highlighting. Auto-formats as you paste.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">When You Need Beautified JSON</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>API responses and log files often contain minified JSON &mdash; a single line of text with no whitespace. Readable for machines, unreadable for humans. Beautifying adds indentation and line breaks so you can quickly scan the structure, find specific keys, and understand nested relationships.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Formatting vs. Validating</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Formatting changes how JSON <em>looks</em> (whitespace and indentation) without changing its data. Validation checks whether the JSON is <em>syntactically correct</em>. This tool does both: it formats valid JSON and shows detailed errors for invalid JSON.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste your JSON below to beautify it instantly.</p>
          </div>
        </div>
      </div>
      <JsonFormatter title="JSON Beautifier" subtitle="Pretty-print JSON with customizable indentation and syntax highlighting." defaultTab="format" articleMode={true} />
    </>
  );
}
