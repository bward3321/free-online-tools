import type { Metadata } from "next";
import Base64EncoderDecoder from "../base64-encoder-decoder/components/Base64EncoderDecoder";

export const metadata: Metadata = {
  title: "Base64 Decoder — Decode Base64 Strings to Text Online | EveryFreeTool",
  description: "Decode Base64 strings to readable text instantly. Handles URL-safe Base64, MIME line breaks, and invalid padding. Auto-detects encoding issues. Free, no signup, 100% client-side.",
  openGraph: { title: "Base64 Decoder — Free Online", description: "Decode Base64 to text instantly. Handles URL-safe, MIME, and padding issues. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Base64DecoderPage() {
  const faqs = [
    { name: "How do I decode Base64 to text?", text: "Paste your Base64 string in the input panel. The decoded text appears instantly in the output panel. The tool handles standard and URL-safe Base64 automatically." },
    { name: "How do I identify a Base64 string?", text: "Base64 strings contain only A-Z, a-z, 0-9, +, and / characters (or - and _ for URL-safe). They often end with = or == padding. The length is always a multiple of 4 (with padding)." },
    { name: "What if my Base64 string is invalid?", text: "The tool shows a clear error message when decoding fails. Common issues include missing padding (toggle the URL-safe option), extra whitespace (automatically stripped), or corrupted characters." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Base64 Decoder", url: "https://everyfreetool.com/developer-tools/base64-decoder",
        description: "Decode Base64 strings to readable text. Handles URL-safe, MIME, and padding issues. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Base64 Decoder &mdash; Decode Base64 Strings to Text Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste any Base64 string and see the decoded text instantly. Automatically handles URL-safe encoding, MIME line breaks, and missing padding.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Common Decoding Scenarios</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Developers frequently need to decode Base64 when <strong style={{ color: "var(--text)" }}>debugging API responses</strong> that contain encoded payloads, <strong style={{ color: "var(--text)" }}>inspecting JWT tokens</strong> (the header and payload are Base64url-encoded JSON), reading <strong style={{ color: "var(--text)" }}>HTTP Basic Auth</strong> headers, extracting data from <strong style={{ color: "var(--text)" }}>email MIME attachments</strong>, or examining <strong style={{ color: "var(--text)" }}>webhook payloads</strong> from services like GitHub, Stripe, or AWS.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Handling Decoding Errors</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The most common Base64 decoding errors come from <strong style={{ color: "var(--text)" }}>URL-safe encoding</strong> (uses - and _ instead of + and /), <strong style={{ color: "var(--text)" }}>missing padding</strong> (some encoders strip trailing = characters), and <strong style={{ color: "var(--text)" }}>embedded whitespace</strong> (MIME-encoded data has line breaks every 76 characters). This tool handles all these cases automatically &mdash; toggle URL-safe mode if standard decoding fails, and whitespace is always stripped before decoding.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Decoding JWT Tokens</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>JWT tokens have three Base64url-encoded parts separated by dots: <code style={{ color: "#8BE9FD" }}>header.payload.signature</code>. Copy just the middle part (payload) and paste it here with URL-safe mode enabled to see the decoded JSON claims. For formatted output, decode here, then open the result in our <a href="/developer-tools/json-formatter" style={{ color: "#8BE9FD" }} className="underline">JSON Formatter</a>.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your Base64 string below &mdash; the decoder is already active.</p>
          </div>
        </div>
      </div>
      <Base64EncoderDecoder title="Base64 Decoder" subtitle="Decode Base64 strings to readable text instantly." defaultDirection="decode" articleMode={true} />
    </>
  );
}
