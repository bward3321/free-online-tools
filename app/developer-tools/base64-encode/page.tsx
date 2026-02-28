import type { Metadata } from "next";
import Base64EncoderDecoder from "../base64-encoder-decoder/components/Base64EncoderDecoder";

export const metadata: Metadata = {
  title: "Base64 Encode — Convert Text to Base64 Online | EveryFreeTool",
  description: "Base64 encode any text instantly. Full UTF-8 support, URL-safe mode, MIME line breaks. Works with emoji, CJK, and all Unicode. Free, no signup, 100% client-side.",
  openGraph: { title: "Base64 Encode — Free Online", description: "Convert text to Base64 with full UTF-8 support. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Base64EncodePage() {
  const faqs = [
    { name: "How do I Base64 encode a string?", text: "Type or paste your text in the input area. The Base64-encoded output appears instantly in the output panel. Click Copy to grab the result." },
    { name: "How do I Base64 encode in JavaScript?", text: "For ASCII text: btoa('hello'). For UTF-8 text: btoa(String.fromCharCode(...new TextEncoder().encode('hello 🌍'))). This tool handles the UTF-8 conversion automatically." },
    { name: "What about Base64 encoding in other languages?", text: "Python: base64.b64encode(text.encode('utf-8')). PHP: base64_encode($text). Java: Base64.getEncoder().encodeToString(text.getBytes(StandardCharsets.UTF_8))." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Base64 Encode", url: "https://everyfreetool.com/developer-tools/base64-encode",
        description: "Base64 encode text with full UTF-8 support. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Base64 Encode &mdash; Convert Text to Base64 Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Instantly encode any text to Base64. Handles all Unicode characters including emoji, CJK text, and accented characters. Supports URL-safe output and MIME line breaks.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Quick Base64 Encoding</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Need to quickly encode a string for an API call, auth header, or config file? Type or paste below and copy the output. The conversion happens in real time as you type &mdash; no buttons to click, no forms to submit. This is the fastest way to get a Base64-encoded string.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Code Examples</h2>
              <div className="space-y-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                <div><strong style={{ color: "var(--text)" }}>JavaScript:</strong> <code style={{ color: "#8BE9FD" }}>btoa(unescape(encodeURIComponent(str)))</code></div>
                <div><strong style={{ color: "var(--text)" }}>Python:</strong> <code style={{ color: "#8BE9FD" }}>base64.b64encode(text.encode(&apos;utf-8&apos;)).decode()</code></div>
                <div><strong style={{ color: "var(--text)" }}>PHP:</strong> <code style={{ color: "#8BE9FD" }}>base64_encode($text)</code></div>
                <div><strong style={{ color: "var(--text)" }}>Java:</strong> <code style={{ color: "#8BE9FD" }}>Base64.getEncoder().encodeToString(text.getBytes(UTF_8))</code></div>
                <div><strong style={{ color: "var(--text)" }}>Go:</strong> <code style={{ color: "#8BE9FD" }}>base64.StdEncoding.EncodeToString([]byte(text))</code></div>
              </div>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Common Encoding Scenarios</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  "HTTP Basic Auth: encode username:password for Authorization header",
                  "Data URIs: embed small files inline in HTML, CSS, or JSON",
                  "Email: encode binary attachments for MIME transport",
                  "APIs: send binary data through text-only JSON endpoints",
                  "Config: store binary values in .env files or YAML configs",
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#8BE9FD", flexShrink: 0 }}>&#x2713;</span><span>{s}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Type or paste text below to encode it to Base64.</p>
          </div>
        </div>
      </div>
      <Base64EncoderDecoder title="Base64 Encode" subtitle="Convert text to Base64 instantly." defaultDirection="encode" articleMode={true} />
    </>
  );
}
