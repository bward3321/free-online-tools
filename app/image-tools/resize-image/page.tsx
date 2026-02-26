import type { Metadata } from "next";
import ImageToolkit from "../image-compressor/components/ImageToolkit";

export const metadata: Metadata = {
  title: "Free Image Resizer — Resize Photos Online to Any Size | EveryFreeTool",
  description:
    "Resize images to exact dimensions or social media presets instantly in your browser. Supports Instagram, Facebook, Twitter sizes. Batch resize, high quality. 100% private.",
  openGraph: {
    title: "Free Image Resizer — Resize Photos Online to Any Size | EveryFreeTool",
    description:
      "Resize images to exact dimensions or social media presets instantly in your browser. Supports Instagram, Facebook, Twitter sizes. Batch resize, high quality. 100% private.",
    type: "website",
  },
};

export default function ResizeImagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Image Resizer",
            description:
              "Resize images to exact dimensions or social media presets instantly in your browser.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: [
              "Resize by exact dimensions",
              "Resize by percentage",
              "Social media preset sizes",
              "Batch image resizing",
              "Aspect ratio lock",
              "High-quality Lanczos downscaling",
              "100% client-side processing",
            ],
          }),
        }}
      />
      <ImageToolkit
        defaultTab="resize"
        title="Free Image Resizer"
        subtitle="Resize images to any dimensions with social media presets. All processing happens in your browser."
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
          How to Resize Images for Any Platform
        </h2>
        <div className="prose max-w-none space-y-4 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          <p>
            Resizing images is one of the most common image editing tasks. Whether you need to fit a photo into a specific dimension requirement for a website, social media platform, or document, getting the right size matters for both appearance and performance.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Understanding Image Dimensions</h3>
          <p>
            Image dimensions are measured in pixels (px) — the width and height of the image. A 1920x1080 image is 1920 pixels wide and 1080 pixels tall. The aspect ratio is the proportional relationship between width and height. Common aspect ratios include 16:9 (widescreen), 4:3 (standard), and 1:1 (square).
          </p>
          <p>
            When resizing, maintaining the aspect ratio prevents your image from looking stretched or squashed. Our tool locks the aspect ratio by default — when you change the width, the height automatically adjusts proportionally, and vice versa.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Social Media Image Sizes</h3>
          <p>
            Each social media platform has optimal image dimensions. Using the right size ensures your images display correctly without cropping or quality loss from the platform&apos;s auto-resizing.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Instagram Post:</strong> 1080 &times; 1080 px (square) for feed posts</li>
            <li><strong>Instagram Story:</strong> 1080 &times; 1920 px (9:16 vertical)</li>
            <li><strong>Facebook Cover:</strong> 820 &times; 312 px</li>
            <li><strong>Twitter/X Header:</strong> 1500 &times; 500 px</li>
            <li><strong>LinkedIn Banner:</strong> 1584 &times; 396 px</li>
            <li><strong>YouTube Thumbnail:</strong> 1280 &times; 720 px</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">Resize Quality: Why Method Matters</h3>
          <p>
            Our tool offers three resize algorithms. <strong>Lanczos</strong> produces the sharpest results by downscaling in multiple steps — it is slower but recommended for photographs and detailed images. <strong>Bilinear</strong> is faster and produces smooth results suitable for most use cases. <strong>Nearest Neighbor</strong> preserves hard edges without smoothing and is ideal for pixel art, icons, and retro graphics.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Tips for Best Results</h3>
          <p>
            Always resize down from a larger original rather than scaling up. Enlarging images creates blurriness because the algorithm must invent pixels that did not exist in the original. For web use, images wider than 1920px are rarely necessary — resizing to 1200-1600px significantly reduces file size while maintaining visual quality on virtually all screens.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "What size should I use for Instagram posts?", a: "Instagram posts display best at 1080\u00d71080 pixels (square format). For landscape posts, use 1080\u00d7566 pixels, and for portrait posts, use 1080\u00d71350 pixels. Our Social Media presets include all standard Instagram sizes." },
            { q: "Will resizing reduce image quality?", a: "Resizing down (making smaller) preserves quality well, especially with the Lanczos method. Resizing up (making larger) will reduce quality because the tool must create new pixels. For best results, always start with the largest version of your image." },
            { q: "Can I resize multiple images at once?", a: "Yes, you can upload up to 50 images and resize them all with the same settings in one batch. All images will be resized to the same dimensions or percentage, and you can download them all as a ZIP file." },
            { q: "What does 'lock aspect ratio' mean?", a: "When aspect ratio is locked (the default), changing the width automatically adjusts the height proportionally, and vice versa. This prevents your image from being stretched or distorted. Unlock it when you need specific non-proportional dimensions." },
            { q: "Are my images uploaded to a server?", a: "No. All resizing happens directly in your browser using the Canvas API. Your images never leave your device, are never stored anywhere, and are never seen by anyone else." },
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
