import type { Metadata } from "next";
import RegexTester from "../regex-tester/components/RegexTester";

export const metadata: Metadata = {
  title: "Regex Validator — Validate Your Regular Expression Syntax | EveryFreeTool",
  description: "Validate regex syntax instantly with real-time feedback. See exact error positions, get fix suggestions, and test patterns against sample text. Free, 100% client-side.",
  openGraph: { title: "Regex Validator — Free Online", description: "Validate regular expression syntax with instant feedback. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function RegexValidatorPage() {
  const faqs = [
    { name: "How does regex validation work?", text: "The tool attempts to construct a JavaScript RegExp object from your pattern. If construction fails, the engine throws a specific error that we translate into a human-readable message with fix suggestions." },
    { name: "Does regex syntax differ between languages?", text: "Yes. JavaScript, Python, Java, PHP (PCRE), and .NET each have slightly different regex engines. This tool uses JavaScript's engine. Most basic features (character classes, quantifiers, groups) are universal, but lookaround support, atomic groups, and Unicode handling vary." },
    { name: "How do I write valid regex patterns?", text: "Start simple and build up. Test each piece as you add it. Common rules: escape special characters (. * + ? ^ $ { } [ ] | ( ) \\) when you want them literal, match parentheses and brackets, and avoid nested quantifiers that can cause backtracking." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Regex Validator", url: "https://everyfreetool.com/developer-tools/regex-validator", description: "Validate regex syntax online. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Regex Validator &mdash; Validate Your Regular Expression Syntax</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Type or paste any regular expression to validate its syntax instantly. The tool checks every character as you type and shows clear error messages with fix suggestions.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Regex Syntax Rules</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Regular expressions follow precise syntax rules. Special characters (<code style={{ color: "#8BE9FD" }}>. * + ? ^ $ {'{'} {'}'} [ ] | ( ) \</code>) have meaning and must be escaped with a backslash when you want them as literals. Parentheses must be balanced. Character classes must be closed. Quantifiers need a preceding element to repeat. This tool checks all these rules in real-time.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">JavaScript vs Other Regex Engines</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>This validator uses JavaScript&apos;s RegExp engine, which supports: named groups <code style={{ color: "#8BE9FD" }}>(?&lt;name&gt;...)</code>, lookbehind <code style={{ color: "#8BE9FD" }}>(?&lt;=...)</code>, the <code style={{ color: "#8BE9FD" }}>s</code> (dotAll) flag, and Unicode property escapes. Features <strong style={{ color: "var(--text)" }}>not</strong> supported: atomic groups, possessive quantifiers, conditional patterns, and recursive patterns (available in PCRE/PHP).</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Tips for Writing Valid Patterns</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Build patterns incrementally &mdash; start with a simple match and add complexity one piece at a time. Use non-capturing groups <code style={{ color: "#8BE9FD" }}>(?:...)</code> when you don&apos;t need the capture. Be specific with character classes instead of relying on <code style={{ color: "#8BE9FD" }}>.*</code>. Test against both matching and non-matching inputs to verify your pattern doesn&apos;t over-match.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Enter your regex below to validate it.</p>
          </div>
        </div>
      </div>
      <RegexTester title="Regex Validator" subtitle="Validate regex syntax with instant feedback." articleMode={true} />
    </>
  );
}
