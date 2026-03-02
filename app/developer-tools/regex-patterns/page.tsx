import type { Metadata } from "next";
import RegexTester from "../regex-tester/components/RegexTester";

export const metadata: Metadata = {
  title: "Common Regex Patterns — Ready-to-Use Regular Expressions | EveryFreeTool",
  description: "30+ ready-to-use regex patterns for email, phone, URL, date, password, IP address, and more. Click to load, test, and customize. Free, 100% client-side.",
  openGraph: { title: "Common Regex Patterns — Copy & Customize", description: "30+ pre-built regex patterns. Click to load and test. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function RegexPatternsPage() {
  const faqs = [
    { name: "What patterns are included?", text: "Over 30 patterns across 7 categories: Email & Contact (email, US phone, international phone), URLs & Web (HTTP URL, domain, IPv4, IPv6, slug), Numbers & Math (integer, decimal, currency, percentage, hex), Dates & Times (ISO date, US date, 24h time, ISO datetime), Validation (password, username, credit card, SSN, ZIP, hex color), Text & Strings (HTML tag, whitespace, duplicates, markdown link, empty lines), and Code & Dev (CSS color, JSON key, import, TODO, semver, file extension)." },
    { name: "Can I modify the patterns?", text: "Absolutely. Click 'Load Pattern' to load any pattern into the tester with sample text. Then modify the pattern, flags, or test string to customize it for your specific use case. The tool validates changes in real-time." },
    { name: "Are these patterns production-ready?", text: "They're solid starting points for common use cases. For production code, always test against your specific data and edge cases. Some patterns (like email validation) are intentionally simplified — a fully RFC-compliant email regex would be thousands of characters long." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Common Regex Patterns", url: "https://everyfreetool.com/developer-tools/regex-patterns", description: "30+ ready-to-use regex patterns. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Common Regex Patterns &mdash; Ready-to-Use Regular Expressions</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>A searchable library of 30+ pre-built regex patterns for the most common tasks. Email validation, phone numbers, URLs, dates, passwords, and more. Click any pattern to load it into the tester with sample data.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Stop Reinventing the Wheel</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Most regex tasks have been solved thousands of times. Need to validate an email? Match a phone number? Extract dates from text? Instead of writing a pattern from scratch and debugging edge cases, start with a proven pattern from this library. Load it, test it against your data, customize if needed, and copy it into your code.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Patterns for Every Use Case</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>The library covers <strong style={{ color: "var(--text)" }}>7 categories</strong>: contact validation (email, phone), web (URLs, domains, IPs), numbers (integers, decimals, currency), dates and times (ISO, US format, 24-hour), input validation (passwords, usernames, credit cards), text processing (HTML tags, whitespace, duplicates), and developer patterns (imports, TODOs, semver, JSON keys).</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Each Pattern Includes Sample Data</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>When you click &quot;Load Pattern,&quot; the tool loads both the regex and a test string with <strong style={{ color: "var(--text)" }}>matching and non-matching examples</strong>. This immediately shows you what the pattern catches and what it misses. Modify the test string to add your own data and verify the pattern works for your specific case.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Browse and search patterns below.</p>
          </div>
        </div>
      </div>
      <RegexTester title="Common Regex Patterns" subtitle="30+ ready-to-use patterns. Click to load and test." defaultTab="patterns" articleMode={true} />
    </>
  );
}
