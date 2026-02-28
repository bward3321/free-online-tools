import type { Metadata } from "next";
import UrlEncoderDecoder from "../url-encoder-decoder/components/UrlEncoderDecoder";

export const metadata: Metadata = {
  title: "URL Parser — Break Down and Analyze Any URL Online | EveryFreeTool",
  description: "Parse any URL into color-coded, editable components: protocol, host, port, path, query parameters, fragment. Rebuild URLs from parts. Free, no signup, 100% client-side.",
  openGraph: { title: "URL Parser — Free Online", description: "Break down any URL into editable components with color-coded visualization. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function UrlParserPage() {
  const faqs = [
    { name: "How do I parse a URL?", text: "Paste any URL in the input field. The tool instantly breaks it into protocol, host, port, path, query parameters, and fragment — each color-coded and individually editable." },
    { name: "Can I edit URL components and rebuild the URL?", text: "Yes. Every component is editable. Change the host, modify query parameters, add new parameters — the full URL rebuilds in real time from your changes." },
    { name: "Can I copy query params as a JavaScript object?", text: "Yes. Click 'Copy as Object' for a JSON object, or 'URLSearchParams' for ready-to-use JavaScript code that creates a URLSearchParams instance." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "URL Parser", url: "https://everyfreetool.com/developer-tools/url-parser", description: "Parse URLs into editable components with color-coded visualization. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">URL Parser &mdash; Break Down and Analyze Any URL Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste any URL and see it broken into color-coded components: protocol, host, port, path, query parameters, and fragment. Each part is editable &mdash; change anything and the URL rebuilds in real time.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">URL Anatomy</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Every URL follows a standard structure defined by RFC 3986: <code style={{ color: "#8BE9FD" }}>protocol://host:port/path?query#fragment</code>. The <strong style={{ color: "#FF79C6" }}>protocol</strong> (http, https, ftp) defines how to connect. The <strong style={{ color: "#8BE9FD" }}>host</strong> identifies the server. The optional <strong style={{ color: "#FFB86C" }}>port</strong> overrides the default (443 for HTTPS, 80 for HTTP). The <strong style={{ color: "#50FA7B" }}>path</strong> locates the resource. <strong style={{ color: "#F1FA8C" }}>Query parameters</strong> pass key-value data. The <strong style={{ color: "#FF5555" }}>fragment</strong> points to a section within the page.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Use Cases for URL Parsing</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  "Debugging API endpoints — understand exactly what parameters are being sent",
                  "Analyzing redirect chains — see where OAuth callbacks and deep links go",
                  "Inspecting analytics URLs — decode UTM parameters and campaign tracking",
                  "Building API requests — construct URLs from individual components",
                  "Understanding encoded query strings — see decoded parameter values",
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#8BE9FD", flexShrink: 0 }}>&#x2713;</span><span>{s}</span></div>
                ))}
              </div>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Query Parameter Management</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Query parameters are the most frequently inspected part of a URL. This tool shows each parameter as an editable key-value pair with the value <strong style={{ color: "var(--text)" }}>automatically decoded</strong>. You can add new parameters, remove existing ones, reorder them with arrow buttons, and copy all parameters as a <strong style={{ color: "var(--text)" }}>JavaScript object</strong> or <strong style={{ color: "var(--text)" }}>URLSearchParams code</strong>.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste a URL below to see it parsed into components.</p>
          </div>
        </div>
      </div>
      <UrlEncoderDecoder title="URL Parser" subtitle="Break down any URL into editable components." defaultTab="parser" articleMode={true} />
    </>
  );
}
