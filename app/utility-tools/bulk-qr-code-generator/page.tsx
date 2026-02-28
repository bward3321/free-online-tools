import type { Metadata } from "next";
import QrCodeGenerator from "../qr-code-generator/components/QrCodeGenerator";

export const metadata: Metadata = {
  title: "Bulk QR Code Generator — Create Multiple QR Codes at Once | EveryFreeTool",
  description: "Generate up to 50 QR codes at once. Paste URLs, download all as a ZIP file. Free batch QR generation — no signup, no limits.",
  openGraph: { title: "Bulk QR Code Generator — Batch Create QR Codes Free", description: "Paste up to 50 URLs and generate all QR codes at once. Download as a ZIP file. Free feature that competitors charge for.", type: "website" },
  robots: "index, follow",
};

export default function BulkQrCodeGeneratorPage() {
  const faqs = [
    { name: "How many QR codes can I generate at once?", text: "You can generate up to 50 QR codes in a single batch. Paste your URLs (one per line) into the text area, and the tool will generate a QR code for each one. Click 'Download All as ZIP' to get all codes in a single download." },
    { name: "What format are batch QR codes?", text: "Batch QR codes are downloaded as PNG files inside a ZIP archive. Each file is named based on the URL content for easy identification. All codes use your selected foreground/background colors and error correction level." },
    { name: "Is batch generation really free?", text: "Yes. Most QR code generators charge $15-50/month for batch/bulk generation as an enterprise feature. Our tool does all processing in your browser, so there's no server cost to pass on to you." },
    { name: "What are common use cases for bulk QR codes?", text: "Marketing campaigns (unique URLs per channel), product labels (one code per SKU), inventory tracking, event management (unique ticket codes), real estate (one code per listing), and educational materials (one code per resource)." },
    { name: "Can I customize batch QR codes?", text: "Yes. Color customization and error correction settings apply to all QR codes in the batch. Logo embedding is not available in batch mode to keep file sizes manageable." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Bulk QR Code Generator",
        url: "https://everyfreetool.com/utility-tools/bulk-qr-code-generator",
        description: "Generate up to 50 QR codes at once from a list of URLs. Download all as a ZIP file. Free batch QR generation with no signup.",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Bulk QR Code Generator &mdash; Create Multiple QR Codes at Once</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste up to 50 URLs and generate all QR codes in one click. Download as a ZIP file. A premium feature at other tools &mdash; free here.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How Batch Generation Works</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Paste your URLs into the text area, one per line. The tool generates a QR code for each URL using your selected colors and error correction level. Click <strong style={{ color: "var(--text)" }}>&ldquo;Download All as ZIP&rdquo;</strong> to get every QR code as a PNG in a single ZIP archive.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>All generation happens in your browser &mdash; no URLs are sent to any server. The ZIP file is created client-side using JSZip and downloaded directly.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Common Use Cases</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  "Marketing campaigns — unique QR per channel or ad placement",
                  "Product labels — one QR code per SKU linking to product info",
                  "Inventory tracking — scannable codes for warehouse management",
                  "Event management — unique codes per ticket or registration",
                  "Real estate — one QR per listing for yard signs and flyers",
                  "Education — QR codes linking to resources, videos, or assignments",
                ].map((use, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#16A34A", flexShrink: 0 }}>&#x2713;</span><span>{use}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#2563EB1a", borderColor: "#2563EB40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your URLs below to generate QR codes in bulk &mdash; batch mode is already selected.</p>
          </div>
        </div>
      </div>
      <QrCodeGenerator title="Bulk QR Code Generator" subtitle="Paste up to 50 URLs (one per line) and download all QR codes as a ZIP." defaultTab="batch" articleMode={true} />
    </>
  );
}
