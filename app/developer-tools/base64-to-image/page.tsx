import type { Metadata } from "next";
import Base64EncoderDecoder from "../base64-encoder-decoder/components/Base64EncoderDecoder";

export const metadata: Metadata = {
  title: "Base64 to Image Converter — Decode Base64 to Image Online | EveryFreeTool",
  description: "Convert Base64 strings to images instantly. Paste a Base64 string or data URI, see a live preview, and download the image. Auto-detects format. Free, no signup, 100% client-side.",
  openGraph: { title: "Base64 to Image Converter — Free Online", description: "Decode Base64 to viewable, downloadable images. Live preview and format detection. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Base64ToImagePage() {
  const faqs = [
    { name: "How do I convert Base64 to an image?", text: "Paste your Base64 string or data URI into the text area. If it's an image, a live preview appears immediately. Click Download to save the image file." },
    { name: "Do I need to include the data URI prefix?", text: "No. If you paste just the raw Base64 string, the tool defaults to PNG format. You can select the correct MIME type from the dropdown. If you include the data: prefix, the format is auto-detected." },
    { name: "What image formats can I decode?", text: "Any format that was Base64-encoded: PNG, JPEG, GIF, SVG, WebP, ICO, and BMP. The format is determined by the original encoding, not the Base64 string itself." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Base64 to Image Converter", url: "https://everyfreetool.com/developer-tools/base64-to-image",
        description: "Decode Base64 strings to viewable, downloadable images. Live preview and format detection. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Base64 to Image Converter &mdash; Decode Base64 to Image Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste a Base64-encoded string and see the image instantly. Auto-detects image format from data URI prefix, shows a live preview, and lets you download the decoded image file.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">When You Need Base64-to-Image Conversion</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Developers encounter Base64 images in <strong style={{ color: "var(--text)" }}>API responses</strong> that return embedded image data, <strong style={{ color: "var(--text)" }}>database records</strong> where images are stored as text blobs, <strong style={{ color: "var(--text)" }}>email sources</strong> with MIME-encoded inline images, and <strong style={{ color: "var(--text)" }}>HTML/CSS files</strong> containing data URI images that need to be extracted as files. This tool lets you paste the encoded string and instantly see and download the original image.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Format Detection</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>If your Base64 string includes a data URI prefix like <code style={{ color: "#8BE9FD" }}>data:image/png;base64,</code>, the tool automatically detects the image format. If you paste just the raw Base64 without a prefix, use the MIME type dropdown to specify the format. The tool defaults to PNG, but you can select JPEG, GIF, SVG, WebP, or other formats as needed.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Completely Private</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>All decoding happens in your browser. The Base64 string is never sent to any server. This is important when working with <strong style={{ color: "var(--text)" }}>proprietary images</strong>, <strong style={{ color: "var(--text)" }}>user-uploaded content</strong>, or any image data that shouldn&apos;t leave your machine. Close the tab and the data is gone.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste your Base64 string below to see the image.</p>
          </div>
        </div>
      </div>
      <Base64EncoderDecoder title="Base64 to Image Converter" subtitle="Decode Base64 strings to viewable images instantly." defaultMode="file" defaultDirection="decode" articleMode={true} />
    </>
  );
}
