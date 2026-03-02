import type { Metadata } from "next";
import HashGenerator from "../hash-generator/components/HashGenerator";

export const metadata: Metadata = {
  title: "File Checksum Calculator — Verify File Integrity Online | EveryFreeTool",
  description: "Calculate file checksums with MD5, SHA-1, SHA-256, SHA-512. Drag-and-drop, streaming for large files up to 2GB. Verify downloads instantly. Free, 100% client-side.",
  openGraph: { title: "File Checksum Calculator — Free Online", description: "Calculate and verify file checksums. Drag-and-drop with progress bar. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function FileChecksumCalculatorPage() {
  const faqs = [
    { name: "How do I verify a file checksum?", text: "Drop or select your file, wait for the hashes to compute, then paste the expected checksum into the Quick Verify field. The tool auto-detects the algorithm and shows a green match or red mismatch instantly." },
    { name: "How large of a file can I hash?", text: "The tool handles files up to 2GB using chunked streaming — files are read in small pieces and never fully loaded into memory. A progress bar shows the hashing progress for large files." },
    { name: "Are my files uploaded anywhere?", text: "No. Files are read locally using your browser's File API and hashed using the Web Crypto API. Nothing is uploaded, transmitted, or stored. Your files never leave your device." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "File Checksum Calculator", url: "https://everyfreetool.com/developer-tools/file-checksum-calculator", description: "Calculate file checksums with multiple hash algorithms. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">File Checksum Calculator &mdash; Verify File Integrity Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Calculate checksums for any file using MD5, SHA-1, SHA-256, SHA-384, and SHA-512. Verify downloads, check file integrity, and generate checksums &mdash; all in your browser.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">How File Checksums Work</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>A checksum is a cryptographic hash of a file&apos;s contents &mdash; a unique fingerprint that changes if even a single byte is modified. When you download software, the publisher provides a checksum (usually SHA-256). By computing the checksum of your downloaded file and comparing it to the official value, you can verify the file is <strong style={{ color: "var(--text)" }}>authentic and uncorrupted</strong>. This protects against corrupted downloads, man-in-the-middle attacks, and tampered files.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Verifying Software Downloads</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Most software publishers provide checksums on their download pages. Linux distributions publish SHA-256 sums for ISO images. Package managers (npm, pip, cargo) verify checksums automatically. When you download critical software &mdash; operating systems, security tools, cryptocurrency wallets &mdash; always verify the checksum before installing. Drop the file here, paste the official checksum, and get instant verification.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">100% Client-Side Processing</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Your files <strong style={{ color: "var(--text)" }}>never leave your device</strong>. The tool reads files using the browser&apos;s File API and hashes them using the native Web Crypto API &mdash; the same cryptographic engine used by TLS for HTTPS connections. Files are processed in chunks, so even multi-gigabyte files work without running out of memory. A progress bar shows real-time hashing progress for large files.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Drop a file below to calculate its checksums.</p>
          </div>
        </div>
      </div>
      <HashGenerator title="File Checksum Calculator" subtitle="Calculate and verify file checksums." defaultTab="file" articleMode={true} />
    </>
  );
}
