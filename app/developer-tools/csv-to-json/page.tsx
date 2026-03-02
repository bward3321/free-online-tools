import type { Metadata } from "next";
import JsonFormatter from "../json-formatter/components/JsonFormatter";

export const metadata: Metadata = {
  title: "CSV to JSON Converter — Convert CSV Data to JSON Online | EveryFreeTool",
  description: "Convert CSV data to JSON arrays instantly. Auto-detects headers, handles quoted values, configurable delimiters. Free, no signup, 100% client-side.",
  openGraph: { title: "CSV to JSON Converter — Free Online", description: "Convert CSV to JSON arrays with automatic type detection. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function CsvToJsonPage() {
  const faqs = [
    { name: "How does CSV to JSON conversion work?", text: "The first row of CSV is treated as column headers. Each subsequent row becomes a JSON object with the headers as keys. For example, 'name,age\\nAlice,30' becomes [{\"name\":\"Alice\",\"age\":30}]." },
    { name: "Does it detect data types?", text: "Yes. Numbers are converted to numeric types, 'true'/'false' to booleans, and 'null' to null. Everything else remains as a string." },
    { name: "Can I use semicolons or tabs as delimiters?", text: "Yes. Choose comma (default), semicolon, or tab. Semicolons are common in European CSV files where commas are used as decimal separators." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "CSV to JSON Converter", url: "https://everyfreetool.com/developer-tools/csv-to-json",
        description: "Convert CSV data to JSON arrays. Auto-detects headers and data types. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">CSV to JSON Converter &mdash; Convert CSV Data to JSON Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste CSV data and get a JSON array of objects instantly. Automatic header detection, type inference for numbers and booleans, and configurable delimiters.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">When You Need CSV to JSON</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Spreadsheet data lives in CSV. APIs consume JSON. When you need to import Excel or Google Sheets data into a web application, database seeding script, or API request body, this converter bridges the gap. Paste your CSV, copy the JSON output, and you&apos;re ready to go.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Automatic Type Detection</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>CSV treats everything as text. This converter automatically detects <strong style={{ color: "var(--text)" }}>numbers</strong> (integers and decimals), <strong style={{ color: "var(--text)" }}>booleans</strong> (true/false), and <strong style={{ color: "var(--text)" }}>null</strong> values, converting them to their proper JSON types. Everything else stays as a string.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste your CSV data below &mdash; the converter is already active.</p>
          </div>
        </div>
      </div>
      <JsonFormatter title="CSV to JSON Converter" subtitle="Convert CSV data to JSON arrays with automatic type detection." defaultTab="csv-to-json" articleMode={true} />
    </>
  );
}
