import type { Metadata } from "next";
import HashGenerator from "../hash-generator/components/HashGenerator";

export const metadata: Metadata = {
  title: "SHA-512 Hash Generator — Generate SHA-512 Hashes Online | EveryFreeTool",
  description: "Generate SHA-512 hashes instantly for text and files. 512-bit output, 128 hex characters. Maximum security for high-assurance applications. Free, 100% client-side.",
  openGraph: { title: "SHA-512 Hash Generator — Free Online", description: "Generate SHA-512 hashes instantly. Maximum security hashing. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Sha512HashGeneratorPage() {
  const faqs = [
    { name: "What is SHA-512?", text: "SHA-512 is part of the SHA-2 family and produces a 512-bit (128 hex character) hash. It provides the highest security level among the SHA-2 algorithms and is actually faster than SHA-256 on 64-bit processors." },
    { name: "When should I use SHA-512 over SHA-256?", text: "Use SHA-512 for maximum security requirements, especially on 64-bit architectures where it can be faster. It's used in TLS, SSH, government applications, and high-security environments. SHA-256 is sufficient for most general purposes." },
    { name: "Is SHA-512 slower than SHA-256?", text: "On 64-bit processors, SHA-512 is actually faster than SHA-256 because it uses 64-bit operations natively. On 32-bit processors, SHA-256 is faster. In practice, both are extremely fast for typical use cases." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "SHA-512 Hash Generator", url: "https://everyfreetool.com/developer-tools/sha512-hash-generator", description: "Generate SHA-512 hashes for text and files. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">SHA-512 Hash Generator &mdash; Generate SHA-512 Hashes Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate SHA-512 hashes for any text or file. SHA-512 produces a 512-bit (128 hex character) hash &mdash; the strongest hash in the SHA-2 family.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Maximum Security Hashing</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>SHA-512 produces the longest hash in the SHA-2 family &mdash; a 512-bit (64-byte) output rendered as 128 hexadecimal characters. Part of the SHA-2 family designed by the NSA, SHA-512 processes input in 1024-bit blocks through 80 rounds of operations using 64-bit words. This makes it <strong style={{ color: "var(--text)" }}>naturally faster on 64-bit processors</strong> than SHA-256, which uses 32-bit words despite the larger output.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">SHA-512 vs SHA-256</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Both are cryptographically secure with no known practical attacks. SHA-512 offers <strong style={{ color: "var(--text)" }}>higher collision resistance</strong> (2^256 vs 2^128 for SHA-256) and is <strong style={{ color: "var(--text)" }}>faster on 64-bit CPUs</strong>. The tradeoff is a longer output (128 vs 64 hex characters) and slightly more storage. For most applications, SHA-256 is sufficient, but SHA-512 is preferred for government, military, and high-assurance systems.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Where SHA-512 Is Used</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>TLS/SSL:</strong> Many TLS cipher suites use SHA-384 and SHA-512 for handshake integrity. <strong style={{ color: "var(--text)" }}>SSH:</strong> SHA-512 is used in SSH key fingerprints and authentication. <strong style={{ color: "var(--text)" }}>Password hashing:</strong> Linux systems use SHA-512 in <code style={{ color: "#8BE9FD" }}>crypt()</code> for <code style={{ color: "#8BE9FD" }}>/etc/shadow</code>. <strong style={{ color: "var(--text)" }}>Ed25519:</strong> The popular signing algorithm uses SHA-512 internally.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#BD93F91a", borderColor: "#BD93F940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Enter text below to generate its SHA-512 hash.</p>
          </div>
        </div>
      </div>
      <HashGenerator title="SHA-512 Hash Generator" subtitle="Generate SHA-512 hashes for text and files." highlightAlgo="sha512" articleMode={true} />
    </>
  );
}
