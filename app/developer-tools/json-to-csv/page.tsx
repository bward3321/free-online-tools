import type { Metadata } from "next";
import JsonFormatter from "../json-formatter/components/JsonFormatter";

export const metadata: Metadata = {
  title: "JSON to CSV Converter — Convert JSON Arrays to CSV Online | EveryFreeTool",
  description: "Convert JSON arrays to CSV format instantly. Configurable delimiters, automatic header generation, nested object flattening. Download as CSV. Free, no signup.",
  openGraph: { title: "JSON to CSV Converter — Free Online", description: "Convert JSON arrays to CSV with configurable delimiters and nested object flattening. Download as CSV. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function JsonToCsvPage() {
  const faqs = [
    { name: "What JSON format does this converter expect?", text: "An array of objects, like [{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":25}]. Each object becomes a row, and the keys become column headers." },
    { name: "How are nested objects handled?", text: "Nested objects are flattened using dot notation. For example, {\"user\":{\"name\":\"Alice\"}} becomes a column header 'user.name' with value 'Alice'." },
    { name: "Can I change the delimiter?", text: "Yes. Choose comma (default), semicolon, or tab. Semicolons are common in European locales where commas are decimal separators." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "JSON to CSV Converter", url: "https://everyfreetool.com/developer-tools/json-to-csv",
        description: "Convert JSON arrays to CSV with configurable delimiters and nested object flattening. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">JSON to CSV Converter &mdash; Convert JSON Arrays to CSV Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste a JSON array of objects and get CSV output instantly. Configurable delimiters, automatic header generation, and nested object flattening with dot notation.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">When You Need JSON to CSV</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>APIs return data as JSON, but spreadsheets, databases, and analytics tools often expect CSV. This converter bridges the gap &mdash; paste your API response, download a CSV, and open it in Excel, Google Sheets, or any data tool.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Handling Nested Objects</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>CSV is a flat format &mdash; it has rows and columns, not nested structures. When your JSON has nested objects like <code>{`{"user":{"name":"Alice","address":{"city":"NYC"}}}`}</code>, the converter flattens them using dot notation: <code>user.name</code>, <code>user.address.city</code>.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste your JSON array below &mdash; the CSV converter is already active.</p>
          </div>
        </div>
      </div>
      <JsonFormatter title="JSON to CSV Converter" subtitle="Convert JSON arrays to CSV with configurable delimiters." defaultTab="json-to-csv" articleMode={true} />
    </>
  );
}
