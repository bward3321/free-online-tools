import type { Metadata } from "next";
import HashGenerator from "../hash-generator/components/HashGenerator";

export const metadata: Metadata = {
  title: "SHA-256 Hash Generator — Generate SHA-256 Hashes Online | EveryFreeTool",
  description: "Generate SHA-256 hashes instantly for text and files. The recommended 256-bit hash for security, integrity, and verification. Free, no signup, 100% client-side via Web Crypto API.",
  openGraph: { title: "SHA-256 Hash Generator — Free Online", description: "Generate SHA-256 hashes instantly. The industry standard for security and integrity. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Sha256HashGeneratorPage() {
  const faqs = [
    { name: "What is SHA-256?", text: "SHA-256 is part of the SHA-2 family of cryptographic hash functions. It produces a 256-bit (64 hex character) hash value. Designed by the NSA, it's the recommended hash for most security applications today." },
    { name: "Why is SHA-256 recommended?", text: "SHA-256 offers an excellent balance of security and performance. No practical attacks exist against it. It's used in Bitcoin mining, TLS certificates, code signing, and file integrity verification worldwide." },
    { name: "Is SHA-256 better than MD5?", text: "Yes — significantly. MD5 is cryptographically broken with collisions found in seconds. SHA-256 has no known practical attacks. For any security-sensitive application, SHA-256 is the minimum recommended standard." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "SHA-256 Hash Generator", url: "https://everyfreetool.com/developer-tools/sha256-hash-generator", description: "Generate SHA-256 hashes for text and files. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">SHA-256 Hash Generator &mdash; Generate SHA-256 Hashes Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate SHA-256 hashes for any text or file instantly. SHA-256 is the recommended cryptographic hash function for security, integrity verification, and digital signatures.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">The Gold Standard of Hashing</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>SHA-256 (Secure Hash Algorithm 256-bit) is part of the SHA-2 family designed by the NSA. It produces a 256-bit (32-byte) hash value, rendered as a 64-character hexadecimal string. SHA-256 is the most widely used cryptographic hash in the world &mdash; it secures Bitcoin transactions, validates TLS/SSL certificates, signs software packages, and verifies file integrity across millions of systems every second.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Why SHA-256 Is Recommended</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>SHA-256 offers the ideal balance of <strong style={{ color: "var(--text)" }}>security, performance, and universal support</strong>. No practical collision or preimage attacks exist. It&apos;s fast on modern hardware (especially with hardware acceleration), produces a compact 64-character output, and is supported by every major programming language, framework, and operating system. HMAC-SHA256 is the standard for webhook verification (Stripe, GitHub, Shopify) and API authentication.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">SHA-256 Use Cases</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>File integrity:</strong> Verify downloads by comparing SHA-256 checksums. <strong style={{ color: "var(--text)" }}>Bitcoin:</strong> SHA-256 is the core of Bitcoin&apos;s proof-of-work mining. <strong style={{ color: "var(--text)" }}>TLS certificates:</strong> Modern certificates use SHA-256 signatures. <strong style={{ color: "var(--text)" }}>Code signing:</strong> Software packages are signed with SHA-256 hashes. <strong style={{ color: "var(--text)" }}>Data deduplication:</strong> SHA-256 identifies unique data blocks in storage systems.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#50FA7B1a", borderColor: "#50FA7B40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Enter text below to generate its SHA-256 hash.</p>
          </div>
        </div>
      </div>
      <HashGenerator title="SHA-256 Hash Generator" subtitle="Generate SHA-256 hashes for text and files." highlightAlgo="sha256" articleMode={true} />
    </>
  );
}
