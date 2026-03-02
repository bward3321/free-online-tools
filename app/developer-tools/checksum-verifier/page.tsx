import type { Metadata } from "next";
import HashGenerator from "../hash-generator/components/HashGenerator";

export const metadata: Metadata = {
  title: "Checksum Verifier — Verify File Checksums Online | EveryFreeTool",
  description: "Verify file integrity by comparing checksums. Drop a file, paste the expected hash, and get instant verification. Supports MD5, SHA-1, SHA-256, SHA-512. Free, 100% client-side.",
  openGraph: { title: "Checksum Verifier — Free Online", description: "Verify file checksums instantly. Drop a file and paste the expected hash. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function ChecksumVerifierPage() {
  const faqs = [
    { name: "How do I verify a checksum?", text: "1) Drop or select your file. 2) Paste the expected checksum from the publisher. 3) Click Verify. The tool auto-detects the algorithm, computes the file's hash, and shows a match or mismatch result." },
    { name: "Where do I find the official checksum?", text: "Check the software's download page — look for a SHA-256 or SHA-512 hash next to the download link. Some projects provide a separate .sha256 or .sha512 file. Linux ISOs typically list checksums on their download mirrors." },
    { name: "What does a mismatch mean?", text: "A mismatch means the file on your disk is different from what the publisher intended. This could be a corrupted download (try downloading again), a tampered file (possible security issue), or you're checking against the wrong file or algorithm." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Checksum Verifier", url: "https://everyfreetool.com/developer-tools/checksum-verifier", description: "Verify file integrity by comparing checksums. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Checksum Verifier &mdash; Verify File Checksums Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Verify downloaded files by comparing their checksums against the publisher&apos;s official hash. Drop a file, paste the expected checksum, and get instant verification.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Step-by-Step File Verification</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>Step 1:</strong> Download the file you want to verify. <strong style={{ color: "var(--text)" }}>Step 2:</strong> Find the official checksum on the publisher&apos;s website (usually on the download page or in a .sha256 file). <strong style={{ color: "var(--text)" }}>Step 3:</strong> Drop your file in the tool below. <strong style={{ color: "var(--text)" }}>Step 4:</strong> Paste the expected hash. <strong style={{ color: "var(--text)" }}>Step 5:</strong> Click Verify &mdash; the tool computes the file&apos;s hash and compares it instantly.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Finding Official Checksums</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Software publishers provide checksums in different ways. <strong style={{ color: "var(--text)" }}>Linux ISOs:</strong> Look for SHA256SUMS or SHA512SUMS files on download mirrors. <strong style={{ color: "var(--text)" }}>macOS/Windows apps:</strong> Check the &ldquo;Downloads&rdquo; or &ldquo;Releases&rdquo; page for hash values. <strong style={{ color: "var(--text)" }}>GitHub releases:</strong> Many projects include checksums in release notes or provide a CHECKSUMS file. <strong style={{ color: "var(--text)" }}>Package managers:</strong> npm, pip, and cargo verify checksums automatically.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">What a Mismatch Means</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>If the checksum doesn&apos;t match: <strong style={{ color: "var(--text)" }}>Most likely:</strong> The download was corrupted (try downloading again). <strong style={{ color: "var(--text)" }}>Possible:</strong> You&apos;re comparing against the wrong version or platform. <strong style={{ color: "var(--text)" }}>Rare but serious:</strong> The file has been tampered with. If re-downloading doesn&apos;t fix the mismatch and you&apos;re sure you have the correct expected hash, do not install the file and report the issue to the publisher.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Drop a file below and paste the expected checksum to verify.</p>
          </div>
        </div>
      </div>
      <HashGenerator title="Checksum Verifier" subtitle="Verify file integrity against expected checksums." defaultTab="compare" defaultCompareMode="file" articleMode={true} />
    </>
  );
}
