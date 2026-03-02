import type { Metadata } from "next";
import Base64EncoderDecoder from "../base64-encoder-decoder/components/Base64EncoderDecoder";

export const metadata: Metadata = {
  title: "Base64 Encoder — Encode Text and Files to Base64 Online | EveryFreeTool",
  description: "Encode any text or file to Base64 instantly. Full UTF-8 support for emoji and international characters, URL-safe mode, MIME line breaks. Free, no signup, 100% client-side.",
  openGraph: { title: "Base64 Encoder — Free Online", description: "Encode text and files to Base64 with UTF-8 support and URL-safe mode. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Base64EncoderPage() {
  const faqs = [
    { name: "How do I encode text to Base64?", text: "Paste or type your text in the input panel. The Base64 output appears instantly in the right panel. Click Copy to grab the result." },
    { name: "Why can't I just use btoa() in JavaScript?", text: "The native btoa() function only handles Latin-1 characters. If your text contains emoji, Chinese, Japanese, Arabic, or other non-ASCII characters, btoa() will throw an error. This tool uses TextEncoder to properly handle all UTF-8 characters." },
    { name: "What is URL-safe Base64?", text: "Standard Base64 uses + and / which break URLs. URL-safe Base64 replaces + with - and / with _ and removes = padding. Toggle this option when encoding for URLs, filenames, or JWT tokens." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Base64 Encoder", url: "https://everyfreetool.com/developer-tools/base64-encoder",
        description: "Encode text and files to Base64 with full UTF-8 support. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Base64 Encoder &mdash; Encode Text and Files to Base64 Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Type or paste text and see the Base64-encoded output in real time. Full UTF-8 support means emoji, CJK characters, and accented text all encode correctly &mdash; unlike tools that only handle ASCII.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Why Encode to Base64?</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Base64 encoding converts binary data into a text-safe format using 64 ASCII characters. Developers use it to <strong style={{ color: "var(--text)" }}>embed images as data URIs</strong> in HTML and CSS, encode credentials for <strong style={{ color: "var(--text)" }}>HTTP Basic Authentication</strong> headers, prepare binary payloads for <strong style={{ color: "var(--text)" }}>JSON APIs</strong>, and encode file attachments for <strong style={{ color: "var(--text)" }}>email (MIME)</strong>. Any time binary data needs to travel through a text-only channel, Base64 is the standard solution.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">UTF-8 Encoding Explained</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>JavaScript&apos;s native <code style={{ color: "#8BE9FD" }}>btoa()</code> function only accepts Latin-1 characters (code points 0-255). Try encoding an emoji or Chinese character and it throws an error. This tool first converts your text to UTF-8 bytes using <code style={{ color: "#8BE9FD" }}>TextEncoder</code>, then Base64-encodes those bytes. The result correctly round-trips through <code style={{ color: "#8BE9FD" }}>TextDecoder</code> on the other end, preserving every character.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Standard vs. URL-Safe Base64</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Standard Base64 uses <code style={{ color: "#8BE9FD" }}>+</code>, <code style={{ color: "#8BE9FD" }}>/</code>, and <code style={{ color: "#8BE9FD" }}>=</code> characters that have special meaning in URLs and filenames. URL-safe Base64 (also called Base64url, defined in RFC 4648) replaces <code style={{ color: "#8BE9FD" }}>+</code> with <code style={{ color: "#8BE9FD" }}>-</code>, <code style={{ color: "#8BE9FD" }}>/</code> with <code style={{ color: "#8BE9FD" }}>_</code>, and removes padding. Toggle the &quot;URL-safe&quot; option when encoding data for URLs, query parameters, JWT tokens, or filenames.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Start typing below &mdash; the encoder is already active.</p>
          </div>
        </div>
      </div>
      <Base64EncoderDecoder title="Base64 Encoder" subtitle="Encode text and files to Base64 instantly." defaultDirection="encode" articleMode={true} />
    </>
  );
}
