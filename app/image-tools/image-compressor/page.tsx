import type { Metadata } from "next";
import ImageToolkit from "./components/ImageToolkit";

export const metadata: Metadata = {
  title: "Free Image Compressor — Reduce Image Size Online | EveryFreeTool",
  description:
    "Compress JPG, PNG, and WebP images instantly in your browser. Target exact file sizes, batch process up to 50 images, with before/after preview. 100% private — files never leave your device.",
  openGraph: {
    title: "Free Image Compressor — Reduce Image Size Online | EveryFreeTool",
    description:
      "Compress JPG, PNG, and WebP images instantly in your browser. Target exact file sizes, batch process up to 50 images, with before/after preview. 100% private — files never leave your device.",
    type: "website",
  },
};

export default function ImageCompressorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Image Compressor",
            description:
              "Compress JPG, PNG, and WebP images instantly in your browser. Target exact file sizes, batch process up to 50 images, with before/after preview.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Compress to exact target file size",
              "Batch image compression",
              "Before/after split-view comparison",
              "JPG, PNG, WebP format support",
              "100% client-side processing",
              "No file uploads required",
              "ZIP download for batch results",
            ],
          }),
        }}
      />
      <ImageToolkit
        defaultTab="compress"
        title="Free Image Compressor"
        subtitle="Compress images to exact file sizes instantly in your browser. No uploads, 100% private."
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
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--text)" }}
        >
          How Image Compression Works
        </h2>
        <div
          className="prose max-w-none space-y-4 text-sm leading-relaxed"
          style={{ color: "var(--text)" }}
        >
          <p>
            Image compression reduces file size by removing redundant data from your image files. There are two main types of compression: lossy and lossless. Understanding the difference helps you choose the right settings for your needs.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Lossy vs. Lossless Compression</h3>
          <p>
            <strong>Lossy compression</strong> (used by JPEG and WebP) permanently removes some image data to achieve smaller file sizes. At quality levels above 70-80%, the visual difference is nearly impossible to detect with the naked eye, even though the file might be 5-10x smaller. This is the recommended approach for photographs and most web images.
          </p>
          <p>
            <strong>Lossless compression</strong> (used by PNG) preserves every pixel exactly as the original. File sizes are larger, but there is zero quality loss. This is ideal for screenshots, logos, diagrams, and any image where pixel-perfect accuracy matters.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">When to Use Each Format</h3>
          <p>
            <strong>JPEG (JPG)</strong> is the best choice for photographs and complex images with many colors and gradients. It offers the best compression ratios for photographic content but does not support transparency.
          </p>
          <p>
            <strong>PNG</strong> is ideal for screenshots, logos, icons, and graphics with text or sharp edges. It supports transparency (alpha channel) and preserves crisp lines that JPEG would blur. File sizes are larger than JPEG for photographs.
          </p>
          <p>
            <strong>WebP</strong> is a modern format that combines the best of both worlds. It supports both lossy and lossless compression, transparency, and produces files 25-35% smaller than JPEG at equivalent quality. It is supported by all modern browsers and is the recommended format for web use.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Common File Size Requirements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)" }}>
                  <th className="text-left py-2 pr-4 font-semibold">Use Case</th>
                  <th className="text-left py-2 pr-4 font-semibold">Max Size</th>
                  <th className="text-left py-2 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Passport / Visa applications", "100 KB", "Government portals often require exactly 100KB or less"],
                  ["Job application forms", "200 KB", "Many HR portals cap photo uploads at 200KB"],
                  ["Email attachments", "500 KB", "Keep images under 500KB for fast email delivery"],
                  ["Website images", "100-300 KB", "Larger images slow down page load times"],
                  ["Social media uploads", "1-5 MB", "Most platforms auto-compress, but smaller uploads process faster"],
                ].map(([useCase, size, notes], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-4">{useCase}</td>
                    <td className="py-2 pr-4 font-medium">{size}</td>
                    <td className="py-2" style={{ color: "var(--text-muted)" }}>{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3">Why Client-Side Processing Matters</h3>
          <p>
            Most online image compressors upload your files to their servers for processing. This raises privacy concerns, especially for sensitive documents like passport photos, medical images, or personal photographs. Our compressor processes everything directly in your browser using the Canvas API — your images never leave your device, are never stored anywhere, and are never seen by anyone else.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--text)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {[
            {
              q: "How do I compress an image to exactly 100KB?",
              a: "Select the Compress tab, choose \"Target Size\" mode, and either type 100 in the input field or click the \"100 KB\" preset button. Our tool uses a binary search algorithm to find the exact quality level that produces a file as close to 100KB as possible. The result is typically within 5% of your target.",
            },
            {
              q: "Is it safe to compress images online?",
              a: "With our tool, absolutely. Unlike most online compressors that upload your files to their servers, our tool processes everything directly in your browser. Your images never leave your device — they are never uploaded, stored, or transmitted anywhere. When you close the tab, the images are gone.",
            },
            {
              q: "What's the difference between JPG and PNG?",
              a: "JPG (JPEG) uses lossy compression and is best for photographs — it produces much smaller files but doesn't support transparency. PNG uses lossless compression and is best for screenshots, logos, and graphics — it supports transparency and preserves sharp edges but produces larger files. For web use, WebP is recommended as it combines the advantages of both.",
            },
            {
              q: "Will compressing reduce my image quality?",
              a: "Lossy compression (JPEG, WebP) does reduce quality, but at settings above 70-80%, the difference is typically invisible to the naked eye. Our before/after split-view lets you compare the original and compressed versions so you can verify the quality is acceptable before downloading.",
            },
            {
              q: "How many images can I compress at once?",
              a: "You can process up to 50 images at once. All images are processed in parallel using your browser's capabilities, so batch processing is fast. You can download all processed images as a single ZIP file.",
            },
            {
              q: "Do you store or save my images?",
              a: "No. Your images are never uploaded to any server. All processing happens locally in your browser using the Canvas API. We have no server infrastructure to receive or store images. When you close the tab or navigate away, your images are automatically removed from browser memory.",
            },
            {
              q: "What does 'EXIF data' mean and should I remove it?",
              a: "EXIF data is metadata embedded in your image files by your camera or phone. It can include your GPS location, camera model, date/time, and other information. Removing EXIF data reduces file size (typically by 50-100KB) and protects your privacy by stripping location data from photos you share online.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border overflow-hidden"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <summary
                className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium list-none"
                style={{ color: "var(--text)" }}
              >
                {faq.q}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 ml-4 group-open:rotate-180"
                  style={{ color: "var(--text-muted)" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div
                className="px-5 pb-4 text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
