import type { Metadata } from "next";
import ImageToolkit from "../image-compressor/components/ImageToolkit";

export const metadata: Metadata = {
  title: "Compress Image to 100KB Online Free — Exact Size | EveryFreeTool",
  description:
    "Compress any image to exactly 100KB instantly in your browser. Perfect for passport photos, visa applications, and government forms. 100% private — no uploads.",
  openGraph: {
    title: "Compress Image to 100KB Online Free — Exact Size | EveryFreeTool",
    description:
      "Compress any image to exactly 100KB instantly in your browser. Perfect for passport photos, visa applications, and government forms. 100% private — no uploads.",
    type: "website",
  },
};

export default function CompressTo100KBPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Compress Image to 100KB",
            description: "Compress any image to exactly 100KB instantly in your browser.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: [
              "Compress to exactly 100KB",
              "Binary search compression algorithm",
              "Batch processing",
              "Before/after comparison",
              "100% client-side processing",
            ],
          }),
        }}
      />
      <ImageToolkit
        defaultTab="compress"
        defaultTargetKB={100}
        title="Compress Image to 100KB"
        subtitle="Compress any image to exactly 100KB — perfect for passport photos, visa forms, and government portals."
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
          Why You Need to Compress Images to 100KB
        </h2>
        <div className="prose max-w-none space-y-4 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          <p>
            Many government websites, visa application portals, and official forms require photographs to be under 100KB in file size. This strict limit ensures fast uploads and consistent processing across systems with limited bandwidth. Meeting this requirement exactly can be frustrating with typical image tools that only offer quality sliders.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Common 100KB Requirements</h3>
          <p>
            <strong>Passport applications:</strong> Many countries require digital passport photos to be under 100KB. The photo must still meet specific dimension and quality requirements while staying within the file size limit.
          </p>
          <p>
            <strong>Visa applications:</strong> Online visa portals for countries including India, China, and many others enforce strict file size limits, often 100KB or less. Upload forms will reject files that exceed the limit.
          </p>
          <p>
            <strong>Government portals:</strong> Tax filing systems, identification services, and public service portals frequently cap image uploads at 100KB to manage server storage and bandwidth.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">How Our 100KB Compression Works</h3>
          <p>
            Unlike simple quality sliders that make you guess the right setting, our tool uses a binary search algorithm that automatically finds the exact quality level needed to hit your target size. The process takes about 8-10 iterations to converge, typically completing in under a second. The result is a file as close to 100KB as technically possible.
          </p>
          <p>
            If your image is already under 100KB, the tool will let you know — no unnecessary recompression. If even the lowest quality setting produces a file larger than 100KB, the tool will automatically resize the image slightly to achieve the target.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Tips for Best Quality at 100KB</h3>
          <p>
            Start with a well-cropped image that contains only the necessary content. A tightly cropped passport photo will compress to 100KB with much better quality than a full-frame image with background. Consider converting to JPEG format if your source is PNG, as JPEG achieves much smaller file sizes for photographs. Remove EXIF data to save an additional 50-100KB before compression.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "How do I compress a photo to exactly 100KB?", a: "Simply upload your image and our tool automatically compresses it to 100KB using a precision algorithm. The 100KB target is pre-selected on this page. The tool finds the exact quality level that produces a file as close to 100KB as possible." },
            { q: "Will my passport photo still be clear at 100KB?", a: "Yes. A typical passport photo (600\u00d7600 pixels or similar) can be compressed to 100KB at around 60-80% JPEG quality, which is more than sufficient for passport applications. Use our before/after slider to verify the quality before downloading." },
            { q: "What if my image is already under 100KB?", a: "If your image is already smaller than 100KB, the tool will let you know and skip compression. There is no need to recompress an image that already meets the requirement." },
            { q: "Can I compress to 100KB on my phone?", a: "Yes, our tool works on all devices including smartphones and tablets. Simply open this page in your mobile browser, tap to upload or take a photo, and the compression happens right on your device." },
            { q: "Is this safe for sensitive documents like passport photos?", a: "Absolutely. Your images are processed entirely in your browser and never uploaded to any server. No one else can see your photos. Close the tab and they are gone from memory." },
            { q: "What format should I use for 100KB passport photos?", a: "JPEG (JPG) is the recommended format for passport photos compressed to 100KB. It produces the smallest files for photographic content while maintaining good visual quality. Most government portals accept JPEG format." },
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
