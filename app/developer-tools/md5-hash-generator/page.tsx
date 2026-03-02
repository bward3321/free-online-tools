import type { Metadata } from "next";
import HashGenerator from "../hash-generator/components/HashGenerator";

export const metadata: Metadata = {
  title: "MD5 Hash Generator — Generate MD5 Checksums Online | EveryFreeTool",
  description: "Generate MD5 hashes instantly for text and files. 128-bit output, 32 hex character checksums. Legacy support with security warnings. Free, no signup, 100% client-side.",
  openGraph: { title: "MD5 Hash Generator — Free Online", description: "Generate MD5 checksums instantly. Legacy support with full security guidance. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Md5HashGeneratorPage() {
  const faqs = [
    { name: "What is MD5?", text: "MD5 (Message-Digest Algorithm 5) is a 128-bit cryptographic hash function that produces a 32 hex character output. Designed by Ronald Rivest in 1991, it was widely used for checksums and data verification before being found vulnerable to collision attacks." },
    { name: "Is MD5 still safe to use?", text: "No — MD5 has been cryptographically broken since 2004. Researchers can generate hash collisions (two different inputs with the same hash) in seconds. Never use MD5 for security purposes like digital signatures, certificates, or password hashing." },
    { name: "When is MD5 still acceptable?", text: "MD5 is acceptable for non-security uses: legacy system compatibility, quick file comparison where tampering isn't a concern, deduplication, and matching checksums from older systems that only provide MD5. For any security purpose, use SHA-256." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "MD5 Hash Generator", url: "https://everyfreetool.com/developer-tools/md5-hash-generator", description: "Generate MD5 checksums for text and files. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">MD5 Hash Generator &mdash; Generate MD5 Checksums Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate MD5 hashes for any text or file instantly. MD5 produces a 128-bit (32 hex character) checksum. Included for legacy compatibility with full security guidance.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">What Is MD5?</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>MD5 (Message-Digest Algorithm 5) was designed by Ronald Rivest in 1991 as a cryptographic hash function. It takes any input and produces a fixed 128-bit (16-byte) hash value, typically rendered as a 32-character hexadecimal string. For over a decade, MD5 was the go-to hash for file integrity checks, password storage, and digital signatures. The algorithm processes input in 512-bit blocks through four rounds of 16 operations each, using bitwise operations, modular addition, and nonlinear functions.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">MD5 Security Status</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>MD5 has been <strong style={{ color: "var(--text)" }}>cryptographically broken since 2004</strong> when Xiaoyun Wang demonstrated practical collision attacks. Today, MD5 collisions can be generated in seconds on a laptop. In 2008, researchers created a rogue CA certificate using MD5 collisions. <strong style={{ color: "var(--text)" }}>Never use MD5 for security purposes</strong> &mdash; digital signatures, certificate validation, password hashing, or any application where collision resistance matters.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">When MD5 Is Still Acceptable</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Despite its broken security, MD5 remains widely used for <strong style={{ color: "var(--text)" }}>non-security checksums</strong>. Many Linux package repositories still publish MD5 sums alongside SHA-256. Legacy systems, database migrations, and older APIs may require MD5 hashes. For quick file comparison where malicious tampering is not a concern, MD5 is faster than SHA-256. However, for any new system or any security-sensitive application, always use SHA-256 or SHA-512.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#FFB86C1a", borderColor: "#FFB86C40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Enter text below to generate its MD5 hash.</p>
          </div>
        </div>
      </div>
      <HashGenerator title="MD5 Hash Generator" subtitle="Generate MD5 checksums for text and files." highlightAlgo="md5" articleMode={true} />
    </>
  );
}
