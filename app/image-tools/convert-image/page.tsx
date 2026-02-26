import type { Metadata } from "next";
import ImageToolkit from "../image-compressor/components/ImageToolkit";

export const metadata: Metadata = {
  title: "Free Image Converter — Convert JPG, PNG, WebP Online | EveryFreeTool",
  description:
    "Convert images between JPG, PNG, and WebP formats instantly in your browser. Batch convert, adjust quality, reduce colors. 100% private — files never leave your device.",
  openGraph: {
    title: "Free Image Converter — Convert JPG, PNG, WebP Online | EveryFreeTool",
    description:
      "Convert images between JPG, PNG, and WebP formats instantly in your browser. Batch convert, adjust quality, reduce colors. 100% private — files never leave your device.",
    type: "website",
  },
};

export default function ConvertImagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Image Converter",
            description: "Convert images between JPG, PNG, and WebP formats instantly in your browser.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: [
              "Convert between JPG, PNG, and WebP",
              "Batch format conversion",
              "Quality control for lossy formats",
              "Color reduction for PNG",
              "100% client-side processing",
            ],
          }),
        }}
      />
      <ImageToolkit
        defaultTab="convert"
        title="Free Image Converter"
        subtitle="Convert images between JPG, PNG, and WebP formats instantly. No uploads required."
      />
      <SEOContent />
    </>
  );
}

function SEOContent() {
  return (
    <div
      className="max-w-[1100px] mx-auto px-4 pb-12"
      style={{ "--color-accent": "#2563EB" } as React.CSSProperties}
    >
      <div
        className="rounded-2xl border p-6 md:p-8 mb-12"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>
          Image Format Guide: JPG vs PNG vs WebP
        </h2>
        <div className="prose max-w-none space-y-4 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          <p>
            Choosing the right image format is crucial for balancing file size, quality, and feature support. Each format has strengths that make it ideal for specific use cases.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">JPEG (JPG) — The Photography Standard</h3>
          <p>
            JPEG has been the standard format for photographs since the 1990s. It uses lossy compression, meaning it permanently removes some image data to reduce file size. At quality levels above 80%, the visual loss is virtually undetectable. JPEG is universally supported and produces the smallest file sizes for photographic content. Its main limitation is the lack of transparency support.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">PNG — Lossless Quality with Transparency</h3>
          <p>
            PNG uses lossless compression, preserving every pixel exactly. This makes it perfect for screenshots, logos, icons, diagrams, and any image with text or sharp edges. PNG supports full transparency (alpha channel), allowing images to be placed on any background. The trade-off is larger file sizes compared to JPEG for photographic content.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">WebP — The Modern Choice</h3>
          <p>
            Developed by Google, WebP combines the benefits of both JPEG and PNG. It supports both lossy and lossless compression, transparency, and animation. WebP files are typically 25-35% smaller than JPEG at equivalent quality, making it the recommended format for web use. As of 2026, WebP is supported by all major browsers including Chrome, Firefox, Safari, and Edge.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Quick Format Selection Guide</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Photographs:</strong> Use JPEG for maximum compatibility, WebP for best compression</li>
            <li><strong>Logos and icons:</strong> Use PNG to preserve sharp edges and transparency</li>
            <li><strong>Screenshots:</strong> Use PNG for pixel-perfect accuracy</li>
            <li><strong>Web images:</strong> Use WebP for best performance (with JPEG fallback)</li>
            <li><strong>Graphics with transparency:</strong> Use PNG or WebP</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">Important Notes on Format Conversion</h3>
          <p>
            Converting from a lossy format (JPEG) to a lossless format (PNG) will not improve quality — the quality was already lost during the original JPEG compression. The file will actually be larger in PNG format with no visual benefit. Converting from PNG to JPEG will reduce file size significantly but will permanently remove transparency and may introduce compression artifacts on sharp edges and text.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "Will converting JPG to PNG improve quality?", a: "No. Converting from a lossy format (JPEG) to a lossless format (PNG) cannot recover quality that was already lost. The file will actually be larger with no visual improvement. Quality is only preserved when you start with the original uncompressed source." },
            { q: "What happens to transparency when converting PNG to JPG?", a: "JPEG does not support transparency. When you convert a PNG with transparent areas to JPG, the transparent areas will be filled with white. Our tool warns you about this before conversion." },
            { q: "Is WebP supported by all browsers?", a: "Yes, as of 2026, WebP is supported by over 97% of browsers in use, including all versions of Chrome, Firefox, Safari (14.1+), and Edge. It is safe to use WebP for virtually all web applications." },
            { q: "Can I convert multiple images at once?", a: "Yes, you can upload up to 50 images and convert them all to the same format in one batch. Download all converted images as a ZIP file." },
            { q: "Are my images uploaded to a server for conversion?", a: "No. All conversion happens directly in your browser using the Canvas API. Your images never leave your device." },
          ].map((faq, i) => (
            <details key={i} className="group rounded-xl border overflow-hidden" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium list-none" style={{ color: "var(--text)" }}>
                {faq.q}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 ml-4 group-open:rotate-180" style={{ color: "var(--text-muted)" }}><polyline points="6 9 12 15 18 9" /></svg>
              </summary>
              <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
