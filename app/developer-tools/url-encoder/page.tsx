import type { Metadata } from "next";
import UrlEncoderDecoder from "../url-encoder-decoder/components/UrlEncoderDecoder";

export const metadata: Metadata = {
  title: "URL Encoder — Percent-Encode Text for URLs Online | EveryFreeTool",
  description: "URL encode any text instantly. Three modes: encodeURIComponent for query values, encodeURI for full URLs, full percent-encoding. UTF-8, emoji support. Free, 100% client-side.",
  openGraph: { title: "URL Encoder — Free Online", description: "Percent-encode text for URLs with three encoding modes. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function UrlEncoderPage() {
  const faqs = [
    { name: "When should I use Component vs Full URL encoding?", text: "Use Component (encodeURIComponent) for individual values like query parameters. Use Full URL (encodeURI) when encoding a complete URL that should remain structurally valid." },
    { name: "How do I URL encode in JavaScript?", text: "For query values: encodeURIComponent('value'). For full URLs: encodeURI('https://example.com/path?q=value'). For form data with + spaces: encodeURIComponent('value').replace(/%20/g, '+')." },
    { name: "Does this handle UTF-8 and emoji?", text: "Yes. All Unicode characters are first converted to UTF-8 bytes, then each byte is percent-encoded. Emoji, CJK, accented characters, and any other Unicode text works correctly." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "URL Encoder", url: "https://everyfreetool.com/developer-tools/url-encoder", description: "Percent-encode text for URLs with three encoding modes. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">URL Encoder &mdash; Percent-Encode Text for URLs Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Type or paste text and see the URL-encoded output in real time. Choose between component encoding (for query values), full URL encoding (preserves structure), or full percent-encoding (every non-alphanumeric character).</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">When to Use URL Encoding</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>URL encoding is required whenever you include user input, special characters, or non-ASCII text in a URL. Common scenarios include <strong style={{ color: "var(--text)" }}>building API query strings</strong>, <strong style={{ color: "var(--text)" }}>encoding OAuth redirect URIs</strong>, preparing <strong style={{ color: "var(--text)" }}>UTM parameters</strong> for marketing campaigns, and handling <strong style={{ color: "var(--text)" }}>file paths with spaces</strong>. Without encoding, characters like <code style={{ color: "#8BE9FD" }}>&amp;</code>, <code style={{ color: "#8BE9FD" }}>=</code>, and <code style={{ color: "#8BE9FD" }}>#</code> break URL structure.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Three Encoding Modes</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  ["Component (encodeURIComponent)", "Encodes everything except A-Z, a-z, 0-9, -, _, ., !, ~, *, ', (, ). Use for query parameter values, form data, and any single URL component."],
                  ["Full URL (encodeURI)", "Preserves URL structure characters like :, /, ?, #, &, =. Use when encoding a complete URL while keeping it navigable."],
                  ["All Characters", "Percent-encodes every non-alphanumeric character. Maximum encoding for paranoid mode or strict systems."],
                ].map(([t, d]) => (
                  <div key={t} className="flex items-start gap-2"><span style={{ color: "#8BE9FD", flexShrink: 0 }}>&#x2713;</span><span><strong style={{ color: "var(--text)" }}>{t}:</strong> {d}</span></div>
                ))}
              </div>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Code Examples</h2>
              <div className="space-y-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                <div><strong style={{ color: "var(--text)" }}>JavaScript:</strong> <code style={{ color: "#8BE9FD" }}>encodeURIComponent(&apos;hello world&apos;)</code> &rarr; <code style={{ color: "#50FA7B" }}>hello%20world</code></div>
                <div><strong style={{ color: "var(--text)" }}>Python:</strong> <code style={{ color: "#8BE9FD" }}>urllib.parse.quote(&apos;hello world&apos;)</code></div>
                <div><strong style={{ color: "var(--text)" }}>PHP:</strong> <code style={{ color: "#8BE9FD" }}>urlencode(&apos;hello world&apos;)</code> (uses + for spaces) or <code style={{ color: "#8BE9FD" }}>rawurlencode()</code> (uses %20)</div>
                <div><strong style={{ color: "var(--text)" }}>Go:</strong> <code style={{ color: "#8BE9FD" }}>url.QueryEscape(&quot;hello world&quot;)</code></div>
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Start typing below &mdash; the encoder is already active.</p>
          </div>
        </div>
      </div>
      <UrlEncoderDecoder title="URL Encoder" subtitle="Percent-encode text for safe URL usage." defaultDirection="encode" articleMode={true} />
    </>
  );
}
