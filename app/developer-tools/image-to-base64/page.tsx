import type { Metadata } from "next";
import Base64EncoderDecoder from "../base64-encoder-decoder/components/Base64EncoderDecoder";

export const metadata: Metadata = {
  title: "Image to Base64 Converter — Convert Images to Data URIs Online | EveryFreeTool",
  description: "Convert images to Base64 data URIs instantly. Drag and drop PNG, JPG, GIF, SVG, WebP. Get raw Base64, data URI, HTML img tag, CSS background. Free, no upload, 100% client-side.",
  openGraph: { title: "Image to Base64 Converter — Free Online", description: "Convert images to Base64 data URIs with drag and drop. Get HTML and CSS output. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function ImageToBase64Page() {
  const faqs = [
    { name: "How do I convert an image to Base64?", text: "Click the upload area or drag and drop an image file. The tool instantly generates the raw Base64 string, a complete data URI, an HTML img tag, and a CSS background-image rule — each with a one-click copy button." },
    { name: "What image formats are supported?", text: "PNG, JPG/JPEG, GIF, SVG, WebP, ICO, and BMP. The tool auto-detects the MIME type and includes it in the data URI prefix." },
    { name: "When should I use data URIs vs. regular images?", text: "Data URIs are best for small images (under 10 KB) like icons, logos, and sprites — they eliminate HTTP requests. For larger images, regular files with proper caching are more efficient since Base64 increases size by 33%." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Image to Base64 Converter", url: "https://everyfreetool.com/developer-tools/image-to-base64",
        description: "Convert images to Base64 data URIs. Drag and drop, get HTML and CSS output. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Image to Base64 Converter &mdash; Convert Images to Data URIs Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Drag and drop any image to get a Base64-encoded data URI, ready to paste directly into your HTML or CSS. Supports PNG, JPG, GIF, SVG, and WebP.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">When to Use Image Data URIs</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Data URIs let you embed images directly in your code, eliminating HTTP requests. They&apos;re ideal for <strong style={{ color: "var(--text)" }}>small icons and favicons</strong> in CSS, <strong style={{ color: "var(--text)" }}>inline images in HTML emails</strong> (which can&apos;t load external resources reliably), <strong style={{ color: "var(--text)" }}>sprites in single-page apps</strong>, embedding images in <strong style={{ color: "var(--text)" }}>JSON API responses</strong>, and <strong style={{ color: "var(--text)" }}>reducing HTTP requests</strong> for critical above-the-fold images.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Size Considerations</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Base64 encoding increases file size by approximately <strong style={{ color: "var(--text)" }}>33%</strong>. A 3 KB icon becomes ~4 KB as Base64, which is fine. But a 100 KB photo becomes ~133 KB and <strong style={{ color: "var(--text)" }}>can&apos;t be cached separately</strong> by the browser. The general rule: use data URIs for images <strong style={{ color: "var(--text)" }}>under 10 KB</strong>. For larger images, serve them as regular files with proper cache headers.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Ready-to-Use Output Formats</h2>
              <div className="space-y-2" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
                {[
                  ["Raw Base64", "The encoded string without any prefix — for APIs and custom implementations"],
                  ["Data URI", "The complete data:image/...;base64,... string ready for HTML src or CSS url()"],
                  ["HTML <img> tag", "A complete <img> element you can paste directly into your HTML"],
                  ["CSS background-image", "A background-image rule ready for your stylesheet"],
                ].map(([t, d]) => (
                  <div key={t} className="flex items-start gap-2"><span style={{ color: "#8BE9FD", flexShrink: 0 }}>&#x2713;</span><span><strong style={{ color: "var(--text)" }}>{t}:</strong> {d}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Drop your image below &mdash; the converter is ready.</p>
          </div>
        </div>
      </div>
      <Base64EncoderDecoder title="Image to Base64 Converter" subtitle="Convert images to Base64 data URIs instantly." defaultMode="file" defaultDirection="encode" articleMode={true} />
    </>
  );
}
