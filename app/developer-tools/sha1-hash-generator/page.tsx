import type { Metadata } from "next";
import HashGenerator from "../hash-generator/components/HashGenerator";

export const metadata: Metadata = {
  title: "SHA-1 Hash Generator — Generate SHA-1 Hashes Online | EveryFreeTool",
  description: "Generate SHA-1 hashes instantly for text and files. 160-bit output, 40 hex characters. Deprecated but still used in Git and legacy systems. Free, 100% client-side.",
  openGraph: { title: "SHA-1 Hash Generator — Free Online", description: "Generate SHA-1 hashes instantly. Deprecated algorithm with legacy support guidance. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Sha1HashGeneratorPage() {
  const faqs = [
    { name: "What is SHA-1?", text: "SHA-1 (Secure Hash Algorithm 1) produces a 160-bit (40 hex character) hash value. Designed by the NSA in 1995, it was the standard hash for over two decades before being deprecated due to collision attacks." },
    { name: "Why is SHA-1 deprecated?", text: "In 2017, Google and CWI Amsterdam demonstrated the first practical SHA-1 collision (SHAttered attack), producing two different PDF files with the same SHA-1 hash. Since then, SHA-1 is considered cryptographically broken for security purposes." },
    { name: "Where is SHA-1 still used?", text: "Git uses SHA-1 for commit hashes (transitioning to SHA-256). Some legacy APIs, older certificate systems, and HMAC-SHA1 (used by GitHub webhooks) still rely on it. For new projects, always prefer SHA-256." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "SHA-1 Hash Generator", url: "https://everyfreetool.com/developer-tools/sha1-hash-generator", description: "Generate SHA-1 hashes for text and files. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">SHA-1 Hash Generator &mdash; Generate SHA-1 Hashes Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate SHA-1 hashes for any text or file. SHA-1 produces a 160-bit (40 hex character) hash. Deprecated for security but still used in Git and legacy systems.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">About SHA-1</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>SHA-1 (Secure Hash Algorithm 1) was published by NIST in 1995 as part of the Digital Signature Standard. It processes input in 512-bit blocks and produces a 160-bit hash value, typically rendered as a 40-character hexadecimal string. For over two decades, SHA-1 was the workhorse of internet security &mdash; used in SSL/TLS certificates, PGP signatures, SSH, and IPsec protocols.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">The SHAttered Attack</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>In February 2017, Google and CWI Amsterdam published the <strong style={{ color: "var(--text)" }}>SHAttered attack</strong>, demonstrating the first practical SHA-1 collision. They produced two different PDF files with identical SHA-1 hashes. The attack required about 6,500 CPU-years and 110 GPU-years of computation. Since then, SHA-1 has been <strong style={{ color: "var(--text)" }}>officially deprecated</strong> by all major browser vendors, certificate authorities, and security standards bodies.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">SHA-1 in Git</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Git&apos;s most visible use of SHA-1 is for commit identifiers &mdash; those 40-character hex strings like <code style={{ color: "#8BE9FD" }}>aaf4c61d</code>. Git is transitioning to SHA-256 via the <code style={{ color: "#8BE9FD" }}>extensions.objectFormat</code> config option, but SHA-1 remains the default. For Git&apos;s use case, SHA-1&apos;s collision vulnerability is a limited risk since Git performs additional checks, but migration to SHA-256 is recommended for new repositories.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#F1FA8C1a", borderColor: "#F1FA8C40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Enter text below to generate its SHA-1 hash.</p>
          </div>
        </div>
      </div>
      <HashGenerator title="SHA-1 Hash Generator" subtitle="Generate SHA-1 hashes for text and files." highlightAlgo="sha1" articleMode={true} />
    </>
  );
}
