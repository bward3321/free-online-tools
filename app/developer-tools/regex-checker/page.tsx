import type { Metadata } from "next";
import RegexTester from "../regex-tester/components/RegexTester";

export const metadata: Metadata = {
  title: "Regex Checker — Check and Validate Regular Expressions Online | EveryFreeTool",
  description: "Check if your regex pattern is valid and test it against sample text instantly. Real-time validation, error messages in plain English, capture group highlighting. Free, 100% client-side.",
  openGraph: { title: "Regex Checker — Validate Regex Online", description: "Check regex patterns with real-time validation and plain-English error messages. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function RegexCheckerPage() {
  const faqs = [
    { name: "How do I check if my regex is valid?", text: "Paste your pattern into the input field. The tool instantly validates it using JavaScript's RegExp constructor. Valid patterns show a green checkmark. Invalid patterns show a red error with a human-readable explanation of what's wrong." },
    { name: "What are common regex syntax errors?", text: "The most common errors: unmatched parentheses (opening ( without closing )), unmatched brackets ([ without ]), nothing to repeat (quantifier like + or * with nothing before it), invalid escape sequences, and unescaped special characters that should be literal." },
    { name: "Should I test regex before using it in production?", text: "Always. Regex patterns can have subtle bugs — matching more or less than intended, missing edge cases, or causing performance issues with certain inputs. Testing against representative data catches these issues before they reach users." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Regex Checker", url: "https://everyfreetool.com/developer-tools/regex-checker", description: "Check and validate regex patterns online. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Regex Checker &mdash; Check and Validate Regular Expressions Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste any regex pattern to instantly check if it&apos;s valid. Get plain-English error messages for syntax mistakes, then test against your own text with real-time match highlighting.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Why Check Your Regex?</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Regex syntax is notoriously easy to get wrong. A misplaced parenthesis, a forgotten escape character, or an ambiguous quantifier can silently break your pattern. This tool validates your regex <strong style={{ color: "var(--text)" }}>as you type</strong>, catching errors before they reach your code. The error messages are translated from cryptic JavaScript exceptions into clear explanations.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Common Regex Mistakes</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The most frequent errors: <strong style={{ color: "var(--text)" }}>unmatched groups</strong> (opening parenthesis without closing), <strong style={{ color: "var(--text)" }}>nothing to repeat</strong> (quantifier with no preceding token), <strong style={{ color: "var(--text)" }}>invalid escapes</strong> (backslash followed by a character that isn&apos;t a recognized escape), and <strong style={{ color: "var(--text)" }}>unmatched character classes</strong> (opening bracket without closing). Each error is shown with a specific fix suggestion.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Real-Time Validation Feedback</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Every keystroke triggers validation using JavaScript&apos;s native RegExp constructor. Valid patterns show a green checkmark. Invalid patterns show a red indicator with a human-readable error. The tool also highlights syntax elements in different colors &mdash; character classes in cyan, groups in green, quantifiers in orange &mdash; so you can visually verify your pattern&apos;s structure.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your regex pattern below to check it.</p>
          </div>
        </div>
      </div>
      <RegexTester title="Regex Checker" subtitle="Check and validate regex patterns online." articleMode={true} />
    </>
  );
}
