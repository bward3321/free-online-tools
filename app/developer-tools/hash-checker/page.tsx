import type { Metadata } from "next";
import HashGenerator from "../hash-generator/components/HashGenerator";

export const metadata: Metadata = {
  title: "Hash Checker — Compare and Verify Hashes Online | EveryFreeTool",
  description: "Compare two hashes side by side with auto-detection, case-insensitive matching, and character-level diff. Verify file checksums. Free, 100% client-side.",
  openGraph: { title: "Hash Checker — Compare Hashes Online", description: "Compare hashes with auto-detection and diff highlighting. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function HashCheckerPage() {
  const faqs = [
    { name: "How does hash comparison work?", text: "Paste two hashes side by side. The tool strips whitespace, normalizes case, auto-detects the algorithm from the hash length, and shows a green match or red mismatch with the first differing position highlighted." },
    { name: "Is the comparison case-sensitive?", text: "No. Hash comparison is case-insensitive — 'ABC' and 'abc' are treated as identical. The tool also strips any whitespace or line breaks before comparing." },
    { name: "Can I verify a file against an expected hash?", text: "Yes. Switch to 'Verify File' mode, drop your file, paste the expected hash, and the tool will compute the file's hash and compare it automatically." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Hash Checker", url: "https://everyfreetool.com/developer-tools/hash-checker", description: "Compare and verify hashes with auto-detection. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Hash Checker &mdash; Compare and Verify Hashes Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Compare two hashes side by side. Auto-detects the algorithm, strips whitespace, normalizes case, and highlights the first difference if they don&apos;t match.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Safe Hash Comparison</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Comparing hashes by eye is error-prone &mdash; 64 hexadecimal characters are easy to misread. This tool normalizes both inputs (strips whitespace, converts to lowercase) and performs a precise character-by-character comparison. If the hashes don&apos;t match, it highlights exactly where they diverge, saving you from staring at two nearly-identical strings trying to spot the difference.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Common Comparison Mistakes</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>The most common causes of false mismatches: <strong style={{ color: "var(--text)" }}>trailing newlines</strong> from copy-paste, <strong style={{ color: "var(--text)" }}>extra spaces</strong> around the hash, <strong style={{ color: "var(--text)" }}>case differences</strong> (some tools output uppercase, others lowercase), and <strong style={{ color: "var(--text)" }}>encoding confusion</strong> (comparing hex to Base64). This tool handles all of these automatically.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Auto Algorithm Detection</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>The tool automatically identifies the hash algorithm based on length: 32 hex chars = MD5, 40 = SHA-1, 64 = SHA-256, 96 = SHA-384, 128 = SHA-512. This helps you confirm both hashes are the same algorithm before comparing, catching a common error where users accidentally compare hashes from different algorithms.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste two hashes below to compare them.</p>
          </div>
        </div>
      </div>
      <HashGenerator title="Hash Checker" subtitle="Compare and verify hashes." defaultTab="compare" articleMode={true} />
    </>
  );
}
