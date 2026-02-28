import type { Metadata } from "next";
import Base64EncoderDecoder from "../base64-encoder-decoder/components/Base64EncoderDecoder";

export const metadata: Metadata = {
  title: "Base64 Decode — Convert Base64 to Text Online | EveryFreeTool",
  description: "Base64 decode any string to readable text instantly. Handles URL-safe encoding, missing padding, MIME line breaks. Full UTF-8 output. Free, no signup, 100% client-side.",
  openGraph: { title: "Base64 Decode — Free Online", description: "Decode Base64 to readable text instantly. Handles URL-safe and MIME formats. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Base64DecodePage() {
  const faqs = [
    { name: "How do I Base64 decode a string?", text: "Paste the Base64 string in the input panel. The decoded text appears instantly. If it's URL-safe Base64 (contains - or _ characters), toggle the URL-safe option." },
    { name: "How do I Base64 decode in JavaScript?", text: "For ASCII: atob('aGVsbG8='). For UTF-8: new TextDecoder().decode(Uint8Array.from(atob(b64), c => c.charCodeAt(0))). This tool handles UTF-8 automatically." },
    { name: "What if decoding fails?", text: "Check for invisible characters, make sure the string only contains valid Base64 characters (A-Z, a-z, 0-9, +, /, =), and try toggling URL-safe mode. The tool strips whitespace automatically." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Base64 Decode", url: "https://everyfreetool.com/developer-tools/base64-decode",
        description: "Base64 decode strings to readable text. Handles URL-safe and MIME. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Base64 Decode &mdash; Convert Base64 to Text Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste any Base64 string and get the decoded text instantly. Automatically handles URL-safe encoding, missing padding, MIME line breaks, and full UTF-8 output.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Quick Base64 Decoding</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Got a Base64 string from an API response, a JWT payload, or a log file? Paste it below and see the decoded text immediately. No buttons to click &mdash; the output updates in real time as you type or paste. The tool automatically strips whitespace and handles missing padding.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Code Examples</h2>
              <div className="space-y-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                <div><strong style={{ color: "var(--text)" }}>JavaScript:</strong> <code style={{ color: "#8BE9FD" }}>atob(base64String)</code> <span className="text-sm">(ASCII only)</span></div>
                <div><strong style={{ color: "var(--text)" }}>Python:</strong> <code style={{ color: "#8BE9FD" }}>base64.b64decode(b64_string).decode(&apos;utf-8&apos;)</code></div>
                <div><strong style={{ color: "var(--text)" }}>PHP:</strong> <code style={{ color: "#8BE9FD" }}>base64_decode($base64_string)</code></div>
                <div><strong style={{ color: "var(--text)" }}>Java:</strong> <code style={{ color: "#8BE9FD" }}>new String(Base64.getDecoder().decode(b64), UTF_8)</code></div>
                <div><strong style={{ color: "var(--text)" }}>Go:</strong> <code style={{ color: "#8BE9FD" }}>base64.StdEncoding.DecodeString(b64)</code></div>
              </div>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Handling Encoding Errors</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>If decoding fails, the most common causes are: <strong style={{ color: "var(--text)" }}>URL-safe encoding</strong> &mdash; the string uses <code style={{ color: "#8BE9FD" }}>-</code> and <code style={{ color: "#8BE9FD" }}>_</code> instead of <code style={{ color: "#8BE9FD" }}>+</code> and <code style={{ color: "#8BE9FD" }}>/</code> (toggle URL-safe mode); <strong style={{ color: "var(--text)" }}>missing padding</strong> &mdash; some encoders strip trailing <code style={{ color: "#8BE9FD" }}>=</code> characters (this tool adds them back automatically); or <strong style={{ color: "var(--text)" }}>non-Base64 characters</strong> in the input. Whitespace and line breaks are always stripped before decoding.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your Base64 string below to decode it.</p>
          </div>
        </div>
      </div>
      <Base64EncoderDecoder title="Base64 Decode" subtitle="Decode Base64 strings to readable text instantly." defaultDirection="decode" articleMode={true} />
    </>
  );
}
