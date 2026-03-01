import type { Metadata } from "next";
import RegexTester from "../regex-tester/components/RegexTester";

export const metadata: Metadata = {
  title: "Regex Replace Tester — Test Search and Replace with Regex | EveryFreeTool",
  description: "Test regex search and replace patterns with real-time preview. Group references ($1, $2), named groups, diff view. See original and result side by side. Free, 100% client-side.",
  openGraph: { title: "Regex Replace Tester — Free Online", description: "Test regex replacements with group references and real-time preview. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function RegexReplaceTesterPage() {
  const faqs = [
    { name: "How does regex replacement work?", text: "String.replace(regex, replacement) finds matches and substitutes them with the replacement string. Special tokens in the replacement reference captured groups: $1 for group 1, $2 for group 2, $& for the entire match, $` for text before, $' for text after." },
    { name: "What are common replacement patterns?", text: "$1, $2... reference captured groups by number. $<name> references named groups. $& inserts the entire match. $` inserts text before the match. $' inserts text after. $$ inserts a literal dollar sign." },
    { name: "Can I test replacements before running them on real data?", text: "That's exactly what this tool is for. Enter your pattern and replacement, paste sample data, and see the result instantly. Experiment with different replacement strings until you get the output you need, then use the same pattern in your code." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Regex Replace Tester", url: "https://everyfreetool.com/developer-tools/regex-replace-tester", description: "Test regex search and replace online. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Regex Replace Tester &mdash; Test Search and Replace with Regex</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Test regex-based search and replace with real-time preview. Use group references ($1, $2, $&amp;) in your replacement string and see the result instantly. Original and result displayed side by side.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How Regex Replacement Works</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>JavaScript&apos;s <code style={{ color: "#8BE9FD" }}>String.replace()</code> takes a regex pattern and a replacement string. The regex finds matches, and each match is substituted with the replacement. With the <strong style={{ color: "var(--text)" }}>global (g) flag</strong>, all matches are replaced. Without it, only the first match is replaced. The replacement string supports special tokens for referencing captured groups.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Replacement Tokens Reference</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}><code style={{ color: "#8BE9FD" }}>$1, $2, $3...</code> insert captured group values by number. <code style={{ color: "#8BE9FD" }}>$&lt;name&gt;</code> inserts a named group. <code style={{ color: "#8BE9FD" }}>$&amp;</code> inserts the entire match. <code style={{ color: "#8BE9FD" }}>$`</code> inserts text before the match. <code style={{ color: "#8BE9FD" }}>$&apos;</code> inserts text after the match. <code style={{ color: "#8BE9FD" }}>$$</code> inserts a literal dollar sign.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Real-World Use Cases</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Reformatting dates from <code style={{ color: "#8BE9FD" }}>MM/DD/YYYY</code> to <code style={{ color: "#8BE9FD" }}>YYYY-MM-DD</code>. Swapping first and last names. Converting camelCase to snake_case. Cleaning CSV data. Removing HTML tags. Normalizing phone numbers. Adding markup to plain text. All of these are regex replace operations you can test here before running on real data.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Enter your pattern and replacement string below.</p>
          </div>
        </div>
      </div>
      <RegexTester title="Regex Replace Tester" subtitle="Test search and replace with group references." defaultTab="replace" articleMode={true} />
    </>
  );
}
