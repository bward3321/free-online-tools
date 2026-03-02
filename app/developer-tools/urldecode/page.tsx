import type { Metadata } from "next";
import UrlEncoderDecoder from "../url-encoder-decoder/components/UrlEncoderDecoder";

export const metadata: Metadata = {
  title: "URL Decode Online — Decode Percent-Encoded Strings | EveryFreeTool",
  description: "URL decode any percent-encoded string instantly. Handles double-encoding, plus-as-space, UTF-8 sequences, malformed input. Free, no signup, 100% client-side.",
  openGraph: { title: "URL Decode Online — Free", description: "Decode percent-encoded strings to readable text. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function UrlDecodePage() {
  const faqs = [
    { name: "How do I URL decode a string?", text: "Paste the percent-encoded string in the input panel. The decoded text appears instantly. The tool strips whitespace, handles + as space, and processes all %XX sequences." },
    { name: "How do I spot a URL-encoded string?", text: "URL-encoded strings contain %XX patterns where XX is a two-digit hex number (0-9, A-F). Common ones: %20 (space), %26 (&), %3D (=), %2F (/). If you see lots of percent signs, it's probably encoded." },
    { name: "Can I decode URLs from server logs?", text: "Yes. Paste encoded URLs from access logs, error logs, or analytics data. For multiple URLs, use the Batch tab to decode all of them at once." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "URL Decode", url: "https://everyfreetool.com/developer-tools/urldecode", description: "URL decode percent-encoded strings. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">URL Decode Online &mdash; Decode Percent-Encoded Strings</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste any percent-encoded string and get the decoded text instantly. Automatically handles double-encoding, plus-as-space, and full UTF-8 decoding.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Quick URL Decoding</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Got an encoded string from a server log, API response, or analytics report? Paste it below and see the decoded text immediately. The output updates in real time as you type or paste &mdash; no buttons needed. The tool automatically handles <code style={{ color: "#8BE9FD" }}>%XX</code> sequences and converts them back to readable characters.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">How to Spot Encoded URLs</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Encoded URLs contain <code style={{ color: "#8BE9FD" }}>%</code> followed by two hexadecimal digits. Common patterns: <code style={{ color: "#8BE9FD" }}>%20</code> for spaces, <code style={{ color: "#8BE9FD" }}>%26</code> for ampersands, <code style={{ color: "#8BE9FD" }}>%3D</code> for equals signs, <code style={{ color: "#8BE9FD" }}>%2F</code> for slashes. Multi-byte UTF-8 characters appear as multiple percent-encoded triplets, like <code style={{ color: "#8BE9FD" }}>%C3%A9</code> for &eacute; or <code style={{ color: "#8BE9FD" }}>%E4%BD%A0</code> for Chinese characters.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Decoding Server Logs and Analytics</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Web server access logs (Apache, Nginx) and analytics platforms store URLs in their encoded form. When you need to <strong style={{ color: "var(--text)" }}>understand what queries users searched</strong>, <strong style={{ color: "var(--text)" }}>debug request parameters</strong>, or <strong style={{ color: "var(--text)" }}>analyze traffic patterns</strong>, you need to decode these URLs first. Use the Batch tab to decode hundreds of URLs from log files at once.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste your encoded string below to decode it.</p>
          </div>
        </div>
      </div>
      <UrlEncoderDecoder title="URL Decode" subtitle="Decode percent-encoded strings to readable text." defaultDirection="decode" articleMode={true} />
    </>
  );
}
