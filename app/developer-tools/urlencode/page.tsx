import type { Metadata } from "next";
import UrlEncoderDecoder from "../url-encoder-decoder/components/UrlEncoderDecoder";

export const metadata: Metadata = {
  title: "URL Encode Online — Encode Text for Safe URL Usage | EveryFreeTool",
  description: "URL encode any text instantly for safe use in URLs. Handles spaces, special characters, emoji, and international text. Three encoding modes. Free, no signup, 100% client-side.",
  openGraph: { title: "URL Encode Online — Free", description: "Encode text for safe URL usage. Handles all Unicode. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function UrlEncodePage() {
  const faqs = [
    { name: "How do I URL encode a string?", text: "Type or paste text in the input panel. The URL-encoded output appears instantly. By default, it uses encodeURIComponent which encodes everything except letters, digits, and a few safe characters." },
    { name: "What characters get encoded?", text: "In Component mode: everything except A-Z, a-z, 0-9, -, _, ., !, ~, *, ', (, ). Spaces become %20 (or + in form mode). All non-ASCII characters are encoded as UTF-8 byte sequences." },
    { name: "Why does my encoded string look different in different languages?", text: "Different languages use different encoding functions. PHP's urlencode() uses + for spaces, rawurlencode() uses %20. Python's quote() and quote_plus() differ similarly. This tool lets you choose." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "URL Encode", url: "https://everyfreetool.com/developer-tools/urlencode", description: "URL encode text for safe URL usage. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">URL Encode Online &mdash; Encode Text for Safe URL Usage</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Instantly encode any text for use in URLs. Handles spaces, special characters, emoji, and international text with full UTF-8 support.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Quick URL Encoding</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Need to quickly encode a string for a URL query parameter, API request, or form submission? Type or paste your text below and copy the encoded output. The conversion is real-time &mdash; no buttons to click, no forms to submit. This is the fastest way to get a URL-encoded string.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Most Common Characters That Need Encoding</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  "Space → %20 (or + in form data)",
                  "& (ampersand) → %26 — separates query parameters",
                  "= (equals) → %3D — separates key from value",
                  "? (question mark) → %3F — starts query string",
                  "# (hash) → %23 — starts fragment",
                  "/ (slash) → %2F — path separator",
                  "% (percent) → %25 — the escape character itself",
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#8BE9FD", flexShrink: 0 }}>&#x2713;</span><span>{s}</span></div>
                ))}
              </div>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Web Development Examples</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Building a search URL: <code style={{ color: "#8BE9FD" }}>https://api.example.com/search?q=</code> + encode(<code style={{ color: "#50FA7B" }}>café latté</code>) = <code style={{ color: "#8BE9FD" }}>https://api.example.com/search?q=caf%C3%A9%20latt%C3%A9</code>. Building an OAuth redirect: <code style={{ color: "#8BE9FD" }}>&amp;redirect_uri=</code> + encode(<code style={{ color: "#50FA7B" }}>https://myapp.com/callback</code>) = <code style={{ color: "#8BE9FD" }}>&amp;redirect_uri=https%3A%2F%2Fmyapp.com%2Fcallback</code>.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Type or paste text below to URL encode it.</p>
          </div>
        </div>
      </div>
      <UrlEncoderDecoder title="URL Encode" subtitle="Encode text for safe URL usage." defaultDirection="encode" articleMode={true} />
    </>
  );
}
