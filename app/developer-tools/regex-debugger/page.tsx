import type { Metadata } from "next";
import RegexTester from "../regex-tester/components/RegexTester";

export const metadata: Metadata = {
  title: "Regex Debugger — Debug and Understand Regular Expressions | EveryFreeTool",
  description: "Debug regex patterns with a plain-English explainer, real-time matching, and catastrophic backtracking detection. Understand any pattern token by token. Free, 100% client-side.",
  openGraph: { title: "Regex Debugger — Free Online", description: "Debug regex with plain-English explanations and backtracking detection. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function RegexDebuggerPage() {
  const faqs = [
    { name: "How do I debug a complex regex?", text: "Paste the pattern into the input and switch to the Explainer tab. Each token is broken down into plain English with syntax coloring. This reveals the structure — where groups start and end, what each quantifier applies to, and where potential issues hide." },
    { name: "What is catastrophic backtracking?", text: "When a regex engine tries exponentially many paths through the text — usually caused by nested quantifiers like (a+)+ or overlapping alternatives. This tool runs regex in a Web Worker with a timeout, so your browser never freezes. If a pattern times out, you'll get a warning with suggestions." },
    { name: "How does the explainer work?", text: "The explainer parses your regex character by character and identifies each token type: anchors, character classes, groups, quantifiers, escape sequences, alternation, and literals. Each token gets a plain-English description. Group nesting is shown with indentation." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Regex Debugger", url: "https://everyfreetool.com/developer-tools/regex-debugger", description: "Debug regex with plain-English explanations. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Regex Debugger &mdash; Debug and Understand Regular Expressions</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Debug any regex pattern with a plain-English token-by-token explainer, real-time match highlighting, and automatic detection of catastrophic backtracking. Understand what every part of a pattern does.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">The Plain-English Explainer</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Complex regex can be unreadable even for experienced developers. The Explainer tab takes any pattern and breaks it down <strong style={{ color: "var(--text)" }}>token by token</strong>. Each piece is shown with its syntax color and a plain-English description. Group nesting is indicated with indentation. You can quickly verify that a pattern does what you think it does.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Detecting Performance Problems</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Regex patterns can have hidden performance traps. <strong style={{ color: "var(--text)" }}>Catastrophic backtracking</strong> happens when nested quantifiers create exponentially many paths: <code style={{ color: "#8BE9FD" }}>(a+)+b</code> tested against &quot;aaaaaaaaa&quot; tries 2^n combinations. This tool runs regex in a sandboxed Web Worker with a 2-second timeout. If your pattern times out, you get a warning and suggestions for restructuring.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Step-by-Step Debugging Process</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>1. <strong style={{ color: "var(--text)" }}>Paste the pattern</strong> and check if it&apos;s valid (green checkmark vs red error). 2. <strong style={{ color: "var(--text)" }}>Read the explainer</strong> to understand what each token does. 3. <strong style={{ color: "var(--text)" }}>Paste test data</strong> and verify matches highlight correctly. 4. <strong style={{ color: "var(--text)" }}>Check groups</strong> in the match list below. 5. <strong style={{ color: "var(--text)" }}>Adjust and re-test</strong> until the pattern matches exactly what you need.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your regex below to debug it.</p>
          </div>
        </div>
      </div>
      <RegexTester title="Regex Debugger" subtitle="Debug patterns with plain-English explanations." defaultTab="explainer" articleMode={true} />
    </>
  );
}
