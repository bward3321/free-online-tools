import type { Metadata } from "next";
import QrCodeGenerator from "../qr-code-generator/components/QrCodeGenerator";

export const metadata: Metadata = {
  title: "Free QR Code Generator — No Signup, No Watermark, No Limits | EveryFreeTool",
  description: "The best free QR code generator online. Logo embedding, color customization, WiFi codes, batch generation — all free. No signup, no watermark, no limits.",
  openGraph: { title: "Free QR Code Generator — Everything Free, No Catch", description: "Logo embedding, WiFi codes, batch generation, SVG export — features competitors charge $7-12/month for, completely free.", type: "website" },
  robots: "index, follow",
};

export default function FreeQrCodeGeneratorPage() {
  const faqs = [
    { name: "What features are free?", text: "Everything. URL QR codes, WiFi QR codes, vCard contacts, logo embedding, color customization, SVG/PNG/JPEG download, batch generation — all features are completely free with no account required. There is no paid tier." },
    { name: "How does this compare to paid QR code generators?", text: "Most paid QR generators (QR TIGER, QRCode Monkey Pro, ME-QR) charge $7-12/month for features we offer free: logo embedding, custom colors, SVG download, and batch generation. The only feature paid tools offer that we don't is dynamic QR codes (trackable, editable URLs)." },
    { name: "Is there a catch?", text: "No. All QR code generation happens in your browser using JavaScript. We don't store any data, require any account, or add any watermarks. The tool is funded by the site's other content and tools." },
    { name: "Are there download limits?", text: "No. Generate and download as many QR codes as you want. Batch mode supports up to 50 codes at once with ZIP download." },
    { name: "Do the QR codes expire?", text: "Never. These are static QR codes — the data is encoded directly in the image. They work forever without depending on any service." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free QR Code Generator",
        url: "https://everyfreetool.com/utility-tools/free-qr-code-generator",
        description: "Completely free QR code generator with logo embedding, color customization, WiFi codes, batch generation, and SVG export. No signup, no watermarks, no limits.",
        applicationCategory: "UtilityApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            <a href="/" className="hover:underline" style={{ color: "#2563EB" }}>Home</a><span>/</span><span>Utility Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free QR Code Generator &mdash; No Signup, No Watermark, No Limits</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Every feature that competitors charge $7-12/month for &mdash; logo embedding, color customization, batch generation, SVG export &mdash; completely free, forever.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">What You Get Free (That Others Charge For)</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  { f: "Logo embedding", c: "$7-12/mo at QR TIGER, QRCode Monkey Pro" },
                  { f: "Custom colors & branding", c: "Paid tier at most generators" },
                  { f: "SVG vector download", c: "Premium feature at ME-QR, Canva" },
                  { f: "Batch generation (up to 50)", c: "Enterprise tier at most services" },
                  { f: "WiFi QR codes", c: "Free at some, premium at others" },
                  { f: "vCard contact cards", c: "Paid at QR TIGER, Adobe Express" },
                  { f: "No watermarks on downloads", c: "Many free tiers add watermarks" },
                  { f: "No account required", c: "Most require email signup" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#16A34A", flexShrink: 0 }}>&#x2713;</span><span><strong style={{ color: "var(--text)" }}>{item.f}</strong> &mdash; {item.c}</span></div>
                ))}
              </div>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">100% Private &amp; Client-Side</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Unlike most QR generators that process your data on their servers (and may log URLs, WiFi passwords, and contact info), this tool runs <strong style={{ color: "var(--text)" }}>entirely in your browser</strong>. No data is ever transmitted. Your WiFi passwords, contact details, and business URLs stay on your device. Close the tab and everything is gone.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#2563EB1a", borderColor: "#2563EB40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Start generating QR codes below &mdash; all features, completely free.</p>
          </div>
        </div>
      </div>
      <QrCodeGenerator title="Free QR Code Generator" subtitle="All features free. No signup. No watermarks. No limits. No catch." articleMode={true} />
    </>
  );
}
