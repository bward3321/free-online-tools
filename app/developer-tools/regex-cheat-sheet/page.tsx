import type { Metadata } from "next";
import RegexTester from "../regex-tester/components/RegexTester";

export const metadata: Metadata = {
  title: "Regex Cheat Sheet — Complete Regular Expression Reference | EveryFreeTool",
  description: "Complete regex cheat sheet with character classes, anchors, quantifiers, groups, lookaheads, and flags. Click any example to test it instantly. Free, interactive.",
  openGraph: { title: "Regex Cheat Sheet — Interactive Reference", description: "Complete regex reference. Click examples to test them. Free, interactive.", type: "website" },
  robots: "index, follow",
};

export default function RegexCheatSheetPage() {
  const faqs = [
    { name: "What does this cheat sheet cover?", text: "Every JavaScript regex feature: character classes (\\d, \\w, \\s), anchors (^, $, \\b), quantifiers (*, +, ?, {n}), groups (capturing, non-capturing, named, lookahead, lookbehind), character sets ([abc], [^abc], [a-z]), and all six flags (g, i, m, s, u, y)." },
    { name: "Can I test examples from the cheat sheet?", text: "Yes. Click any row in the cheat sheet that has an example, and it loads the pattern and sample text into the tester above. You can then modify the pattern or text to experiment further." },
    { name: "Is this cheat sheet specific to JavaScript?", text: "It covers JavaScript's regex engine, but most features are universal across languages. Notable JavaScript-specific features: the s (dotAll) flag, the y (sticky) flag, named groups (?<name>...), and lookbehind assertions (?<=...) and (?<!...)." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Regex Cheat Sheet", url: "https://everyfreetool.com/developer-tools/regex-cheat-sheet", description: "Interactive regex cheat sheet. Free.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Regex Cheat Sheet &mdash; Complete Regular Expression Reference</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Everything you need to know about regex syntax in one page. Character classes, anchors, quantifiers, groups, lookaheads, lookbehinds, and flags. Click any example to load it into the tester.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">The Essential Regex Elements</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Regular expressions are built from a small set of core elements. <strong style={{ color: "var(--text)" }}>Character classes</strong> like <code style={{ color: "#8BE9FD" }}>\d</code> (digits) and <code style={{ color: "#8BE9FD" }}>\w</code> (word characters) match categories of characters. <strong style={{ color: "var(--text)" }}>Anchors</strong> like <code style={{ color: "#8BE9FD" }}>^</code> and <code style={{ color: "#8BE9FD" }}>$</code> match positions, not characters. <strong style={{ color: "var(--text)" }}>Quantifiers</strong> like <code style={{ color: "#8BE9FD" }}>+</code> and <code style={{ color: "#8BE9FD" }}>*</code> control repetition. Combined, these build patterns from simple to complex.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">JavaScript-Specific Features</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>JavaScript&apos;s regex engine includes modern features: <strong style={{ color: "var(--text)" }}>named groups</strong> <code style={{ color: "#8BE9FD" }}>(?&lt;name&gt;...)</code> for readable captures, <strong style={{ color: "var(--text)" }}>lookbehind</strong> <code style={{ color: "#8BE9FD" }}>(?&lt;=...)</code> for matching based on preceding context, the <strong style={{ color: "var(--text)" }}>s flag</strong> making <code style={{ color: "#8BE9FD" }}>.</code> match newlines, and <strong style={{ color: "var(--text)" }}>Unicode property escapes</strong> <code style={{ color: "#8BE9FD" }}>\p{'{'}Script=Greek{'}'}</code> with the u flag.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Interactive Learning</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>This isn&apos;t just a static reference &mdash; every example in the cheat sheet is <strong style={{ color: "var(--text)" }}>clickable</strong>. Click a row to load its pattern and sample text into the tester above. Modify the pattern or text to experiment. This makes it easy to learn regex by doing, not just reading.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Browse the cheat sheet below and click any example to test it.</p>
          </div>
        </div>
      </div>
      <RegexTester title="Regex Cheat Sheet" subtitle="Complete reference with interactive examples." defaultTab="cheatsheet" articleMode={true} />
    </>
  );
}
