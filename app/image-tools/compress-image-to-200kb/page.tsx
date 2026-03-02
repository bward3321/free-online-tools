import type { Metadata } from "next";
import ImageToolkit from "../image-compressor/components/ImageToolkit";

export const metadata: Metadata = {
  title: "Compress Image to 200KB Online Free — Exact Size | EveryFreeTool",
  description:
    "Compress any image to exactly 200KB instantly in your browser. Perfect for job applications, online forms, and HR portals. 100% private — no uploads.",
  openGraph: {
    title: "Compress Image to 200KB Online Free — Exact Size | EveryFreeTool",
    description:
      "Compress any image to exactly 200KB instantly in your browser. Perfect for job applications, online forms, and HR portals. 100% private — no uploads.",
    type: "website",
  },
};

export default function CompressTo200KBPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Compress Image to 200KB",
            description: "Compress any image to exactly 200KB instantly in your browser.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: [
              "Compress to exactly 200KB",
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
        defaultTargetKB={200}
        title="Compress Image to 200KB"
        subtitle="Compress any image to exactly 200KB — ideal for job applications, HR portals, and online forms."
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
        <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>
          Why You Need to Compress Images to 200KB
        </h2>
        <div className="prose max-w-none space-y-4 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          <p>
            A 200KB file size limit is one of the most common requirements you will encounter when uploading images to online forms, job application portals, and professional platforms. This size strikes a balance between image quality and practical file handling.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Common 200KB Requirements</h3>
          <p>
            <strong>Job applications:</strong> Many HR platforms and applicant tracking systems limit profile photo uploads to 200KB. This includes popular platforms used by major employers worldwide. Exceeding the limit typically results in a rejected upload with no clear error message.
          </p>
          <p>
            <strong>Educational portals:</strong> University application systems, online exam portals, and student registration forms frequently require photographs under 200KB. Entrance exam admit cards and student ID applications commonly enforce this limit.
          </p>
          <p>
            <strong>Professional networking:</strong> While LinkedIn and similar platforms handle compression automatically, many professional directories and internal company portals require pre-compressed images under 200KB.
          </p>
          <p>
            <strong>Online forms and surveys:</strong> Government services, insurance claims, and official document submissions often cap image attachments at 200KB per file.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">200KB vs 100KB — What&apos;s the Difference?</h3>
          <p>
            At 200KB, you get noticeably better image quality than at 100KB. A typical portrait photo at 200KB can maintain 80-85% JPEG quality, which is virtually indistinguishable from the original to the human eye. At 100KB, quality drops to around 60-70%, which is still acceptable but may show slight softening in fine details.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">How to Get the Best Quality at 200KB</h3>
          <p>
            Crop your image to include only the necessary content before compressing. A photo that is 1000x1000 pixels will look significantly better at 200KB than one that is 4000x4000 pixels, because the compression has fewer pixels to work with. For profile photos, crop tightly around your head and shoulders. Use JPEG format for the best compression ratio with photographic content.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "How do I compress a photo to exactly 200KB?", a: "Upload your image and our tool automatically compresses it to 200KB. The 200KB target is pre-selected on this page. Our precision algorithm finds the exact quality level that produces a file as close to 200KB as possible, typically within 5% of the target." },
            { q: "Is 200KB enough for a clear photo?", a: "Yes. At 200KB, a typical portrait or profile photo maintains excellent visual quality (around 80-85% JPEG quality). The image will look crisp and professional for job applications, ID photos, and online profiles." },
            { q: "What dimensions should my photo be before compressing to 200KB?", a: "For best results, resize your image to around 600-800 pixels on the longest side before compressing to 200KB. This gives you the best quality-to-size ratio. Larger images will still compress to 200KB but with slightly lower quality." },
            { q: "Can I compress multiple photos to 200KB at once?", a: "Yes, upload up to 50 images and they will all be compressed to 200KB simultaneously. Download all results as a single ZIP file." },
            { q: "My image is already under 200KB. Will the tool recompress it?", a: "No. If your image is already smaller than 200KB, the tool will show a notice that no compression is needed and skip the file. Your image remains unchanged." },
            { q: "Is this tool safe for job application photos?", a: "Absolutely. Your photos are processed entirely in your browser and never uploaded to any server. This is actually safer than most online compression tools that upload your files to their servers for processing." },
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
