import type { Metadata } from "next";
import UrlEncoderDecoder from "../url-encoder-decoder/components/UrlEncoderDecoder";

export const metadata: Metadata = {
  title: "URL Decoder — Decode Percent-Encoded URLs Online | EveryFreeTool",
  description: "Decode URL-encoded strings to readable text instantly. Handles double-encoding, UTF-8, plus-as-space. Graceful error handling for malformed input. Free, no signup, 100% client-side.",
  openGraph: { title: "URL Decoder — Free Online", description: "Decode percent-encoded URLs to readable text. Handles double-encoding and malformed input. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function UrlDecoderPage() {
  const faqs = [
    { name: "How do I decode a URL-encoded string?", text: "Paste the encoded string in the input panel. The decoded text appears instantly. The tool handles %XX sequences, plus-as-space, and UTF-8 multi-byte sequences automatically." },
    { name: "What is double encoding?", text: "Double encoding happens when an already-encoded string gets encoded again. %20 becomes %2520. This tool detects it and offers Decode Once, Decode Twice, or Decode Fully buttons." },
    { name: "Why does decoding sometimes fail?", text: "Decoding fails when the input contains invalid percent sequences like %ZZ or incomplete UTF-8 byte sequences. This tool gracefully decodes what it can and marks errors." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "URL Decoder", url: "https://everyfreetool.com/developer-tools/url-decoder", description: "Decode percent-encoded URLs to readable text. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">URL Decoder &mdash; Decode Percent-Encoded URLs Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste any URL-encoded string and see the decoded text instantly. Automatically handles double-encoding, plus-as-space, and malformed percent sequences.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Common Decoding Scenarios</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Developers frequently need to decode URLs when <strong style={{ color: "var(--text)" }}>reading server logs</strong> that show encoded request URLs, <strong style={{ color: "var(--text)" }}>debugging API responses</strong> with encoded redirect URIs, <strong style={{ color: "var(--text)" }}>analyzing analytics data</strong> with encoded UTM parameters, examining <strong style={{ color: "var(--text)" }}>OAuth callback URLs</strong>, and understanding <strong style={{ color: "var(--text)" }}>encoded query strings</strong> from browser developer tools.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Double-Encoding Explained</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Double encoding is one of the most frustrating URL issues. It happens when a string gets encoded twice &mdash; a space becomes <code style={{ color: "#8BE9FD" }}>%20</code> first, then the <code style={{ color: "#8BE9FD" }}>%</code> gets encoded to <code style={{ color: "#8BE9FD" }}>%25</code>, resulting in <code style={{ color: "#8BE9FD" }}>%2520</code>. This tool <strong style={{ color: "var(--text)" }}>automatically detects double-encoding</strong> and offers buttons to decode once, twice, or recursively until fully decoded.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Graceful Error Handling</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Not all encoded strings are valid. Malformed percent sequences (like <code style={{ color: "#8BE9FD" }}>%ZZ</code>) or incomplete UTF-8 byte sequences will cause standard decoders to throw errors. This tool <strong style={{ color: "var(--text)" }}>decodes what it can</strong> and leaves invalid sequences as-is, so you can still read the majority of the decoded content.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste your encoded string below &mdash; the decoder is already active.</p>
          </div>
        </div>
      </div>
      <UrlEncoderDecoder title="URL Decoder" subtitle="Decode percent-encoded URLs to readable text." defaultDirection="decode" articleMode={true} />
    </>
  );
}
