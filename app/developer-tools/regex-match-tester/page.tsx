import type { Metadata } from "next";
import RegexTester from "../regex-tester/components/RegexTester";

export const metadata: Metadata = {
  title: "Regex Match Tester — Find All Matches with Capture Groups | EveryFreeTool",
  description: "Test regex matching with color-coded capture groups, named groups, and detailed match results. See every match with its position and captured text. Free, 100% client-side.",
  openGraph: { title: "Regex Match Tester — Capture Groups & Match Results", description: "Find all regex matches with capture group highlighting. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function RegexMatchTesterPage() {
  const faqs = [
    { name: "What is global vs single matching?", text: "Without the g flag, regex.exec() finds only the first match. With g, it iterates through all matches. The g flag is enabled by default in this tool since most users want to find all matches." },
    { name: "How do capture groups work?", text: "Parentheses () create capturing groups that remember matched text. Group 1 is the first set of parens, group 2 is the second, and so on. Use them in replacements ($1, $2) or extract specific parts of a match in code." },
    { name: "What are named capture groups?", text: "Named groups use the syntax (?<name>...) to assign a name to a capture. Instead of referencing by number ($1), you can use $<name>. In code, named groups appear in match.groups as key-value pairs." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Regex Match Tester", url: "https://everyfreetool.com/developer-tools/regex-match-tester", description: "Test regex matching with capture groups. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Regex Match Tester &mdash; Find All Matches with Capture Groups</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Test your regex pattern and see every match highlighted in real-time. Each capture group gets a unique color. Named groups are displayed by name. Match positions and captured text are listed below.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How Regex Matching Works</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The regex engine scans your text from left to right, trying to match the pattern at each position. When a match is found, it records the matched text, its position (start and end index), and any captured groups. With the <strong style={{ color: "var(--text)" }}>global (g) flag</strong>, the engine continues searching from where the last match ended. Without it, only the first match is returned.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Capture Groups and Backreferences</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Capture groups <code style={{ color: "#8BE9FD" }}>()</code> do two things: they group parts of a pattern for quantifiers, and they <strong style={{ color: "var(--text)" }}>remember</strong> what they matched. Backreferences like <code style={{ color: "#8BE9FD" }}>\1</code> match the same text that group 1 captured. This lets you find repeated words: <code style={{ color: "#8BE9FD" }}>\b(\w+)\s+\1\b</code> matches &quot;the the&quot; but not &quot;the they&quot;.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Using Match Results in Code</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>In JavaScript, <code style={{ color: "#8BE9FD" }}>str.match(regex)</code> returns an array of matches (with g flag) or a single match object (without g). <code style={{ color: "#8BE9FD" }}>regex.exec(str)</code> returns detailed match objects with index and groups. <code style={{ color: "#8BE9FD" }}>str.matchAll(regex)</code> returns an iterator of all match objects &mdash; the most modern and flexible approach.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Enter a regex with capture groups to see detailed match results.</p>
          </div>
        </div>
      </div>
      <RegexTester title="Regex Match Tester" subtitle="Find all matches with capture group highlighting." articleMode={true} />
    </>
  );
}
