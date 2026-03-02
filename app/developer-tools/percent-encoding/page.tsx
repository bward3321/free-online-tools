import type { Metadata } from "next";
import UrlEncoderDecoder from "../url-encoder-decoder/components/UrlEncoderDecoder";

export const metadata: Metadata = {
  title: "Percent Encoding Tool — RFC 3986 URL Encoding Online | EveryFreeTool",
  description: "Percent-encode text per RFC 3986. Three modes: component encoding, full URL encoding, full percent-encoding of every non-alphanumeric character. Free, no signup, 100% client-side.",
  openGraph: { title: "Percent Encoding — RFC 3986 URL Encoding Online", description: "RFC 3986 percent-encoding with three modes. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function PercentEncodingPage() {
  const faqs = [
    { name: "What is percent-encoding?", text: "Percent-encoding (defined by RFC 3986) replaces each byte of a character with %XX where XX is the hexadecimal value. Multi-byte UTF-8 characters produce multiple %XX sequences." },
    { name: "What are unreserved characters in RFC 3986?", text: "Unreserved characters that never need encoding: A-Z, a-z, 0-9, hyphen (-), underscore (_), period (.), and tilde (~). Everything else should be percent-encoded when used as data." },
    { name: "When do I need full percent-encoding?", text: "Full percent-encoding (every non-alphanumeric character) is needed for strict systems, binary-safe encoding, or when you can't determine which characters the receiving system treats as special." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Percent Encoding Tool", url: "https://everyfreetool.com/developer-tools/percent-encoding", description: "RFC 3986 percent-encoding with three modes. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Percent Encoding Tool &mdash; RFC 3986 URL Encoding Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Percent-encode text according to RFC 3986. Choose between standard component encoding, full URL encoding that preserves structure, or complete percent-encoding of every non-alphanumeric character.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">How Percent-Encoding Works</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Percent-encoding converts each byte of a character to a <code style={{ color: "#8BE9FD" }}>%XX</code> sequence where <code style={{ color: "#8BE9FD" }}>XX</code> is the uppercase hexadecimal representation. For ASCII characters, this is a single %XX. For UTF-8 multi-byte characters (like <code style={{ color: "#8BE9FD" }}>&eacute;</code> or emoji), each byte of the UTF-8 sequence gets its own percent-encoded triplet. The text is first encoded as UTF-8 bytes, then each byte that needs encoding is converted.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Reserved vs. Unreserved Characters</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>RFC 3986 divides characters into <strong style={{ color: "var(--text)" }}>unreserved</strong> (never need encoding: <code style={{ color: "#8BE9FD" }}>A-Z a-z 0-9 - _ . ~</code>) and <strong style={{ color: "var(--text)" }}>reserved</strong> (have special URL meaning: <code style={{ color: "#8BE9FD" }}>: / ? # [ ] @ ! $ &amp; &apos; ( ) * + , ; =</code>). Reserved characters only need encoding when used as <em>data</em> rather than as URL delimiters. The &quot;All Characters&quot; mode encodes everything regardless.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">UTF-8 and Percent-Encoding</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Before percent-encoding, text must be converted to bytes using a character encoding &mdash; almost always <strong style={{ color: "var(--text)" }}>UTF-8</strong>. The letter <code style={{ color: "#8BE9FD" }}>&eacute;</code> is two bytes in UTF-8 (<code style={{ color: "#8BE9FD" }}>0xC3 0xA9</code>), so it becomes <code style={{ color: "#8BE9FD" }}>%C3%A9</code>. A fire emoji is four bytes, becoming four percent-encoded triplets. This tool uses the standard <code style={{ color: "#8BE9FD" }}>TextEncoder</code> API to ensure correct UTF-8 encoding before percent-encoding.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Enter text below to see it percent-encoded.</p>
          </div>
        </div>
      </div>
      <UrlEncoderDecoder title="Percent Encoding" subtitle="RFC 3986 percent-encoding with three modes." defaultDirection="encode" defaultEncMode="all" articleMode={true} />
    </>
  );
}
