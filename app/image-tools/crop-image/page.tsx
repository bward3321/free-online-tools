import type { Metadata } from "next";
import ImageToolkit from "../image-compressor/components/ImageToolkit";

export const metadata: Metadata = {
  title: "Free Image Cropper — Crop Photos Online | EveryFreeTool",
  description:
    "Crop images to any aspect ratio with presets for social media, passport photos, and more. Rotate, flip, and adjust. 100% private — files never leave your device.",
  openGraph: {
    title: "Free Image Cropper — Crop Photos Online | EveryFreeTool",
    description:
      "Crop images to any aspect ratio with presets for social media, passport photos, and more. Rotate, flip, and adjust. 100% private — files never leave your device.",
    type: "website",
  },
};

export default function CropImagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Image Cropper",
            description: "Crop images to any aspect ratio with presets for social media, passport photos, and more.",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: [
              "Free-form and aspect-ratio-locked cropping",
              "Preset aspect ratios for common use cases",
              "Rotate 90 degrees left/right",
              "Flip horizontal/vertical",
              "Rule of thirds grid overlay",
              "100% client-side processing",
            ],
          }),
        }}
      />
      <ImageToolkit
        defaultTab="crop"
        title="Free Image Cropper"
        subtitle="Crop photos to any aspect ratio with presets for social media and passport photos. All in your browser."
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
          How to Crop Images Effectively
        </h2>
        <div className="prose max-w-none space-y-4 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          <p>
            Cropping is one of the most powerful and frequently used image editing operations. A well-placed crop can transform a good photo into a great one by removing distracting elements, improving composition, and fitting the image to specific dimension requirements.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Understanding Aspect Ratios</h3>
          <p>
            An aspect ratio describes the proportional relationship between an image&apos;s width and height. The most common aspect ratios are 1:1 (square), 4:3 (standard), 16:9 (widescreen), and 3:2 (classic photo). Choosing the right aspect ratio ensures your image fits perfectly into its intended display context without unwanted cropping or letterboxing.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Common Crop Sizes and Their Uses</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>1:1 (Square):</strong> Instagram feed posts, profile pictures, product thumbnails</li>
            <li><strong>4:3 (Standard):</strong> Presentations, traditional photo prints, tablets</li>
            <li><strong>16:9 (Widescreen):</strong> YouTube thumbnails, video covers, desktop wallpapers</li>
            <li><strong>3:2 (Classic):</strong> Standard photo prints (4&times;6, 6&times;9), DSLR native ratio</li>
            <li><strong>2:3 (Portrait):</strong> Vertical phone wallpapers, Pinterest pins</li>
            <li><strong>35:45 (Passport):</strong> Standard passport and visa photo dimensions</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">The Rule of Thirds</h3>
          <p>
            Our cropping tool includes a rule-of-thirds grid overlay to help you compose your crop. The rule of thirds divides the image into a 3&times;3 grid. Placing key subjects along the grid lines or at their intersections creates a more balanced, visually appealing composition than centering everything.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Passport Photo Requirements</h3>
          <p>
            Standard passport photos follow specific dimension requirements that vary by country. The most common standard is 35mm &times; 45mm, which corresponds to roughly a 7:9 aspect ratio. Our Passport preset automatically sets this ratio. For best results, ensure the subject&apos;s face is centered with appropriate headroom, against a plain white or light-colored background.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Tips for Better Crops</h3>
          <p>
            Start with the highest resolution version of your image. Cropping removes pixels permanently, so the larger your starting image, the more flexibility you have. Use the rotate and flip tools to straighten horizons or correct orientation before cropping. When cropping for social media, check the platform&apos;s current recommended dimensions, as these can change.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "What aspect ratio should I use for passport photos?", a: "Standard passport photos use a 35mm \u00d7 45mm format, which is approximately a 7:9 ratio. Our Passport preset automatically sets this ratio. Make sure the face is centered with the correct amount of headroom as specified by your country\u2019s requirements." },
            { q: "Can I crop multiple images at once?", a: "Cropping is applied to one image at a time since each image needs individual positioning of the crop area. Upload your images, select one from the grid, set your crop, and apply. Then select the next image and repeat." },
            { q: "Does cropping reduce image quality?", a: "Cropping itself does not reduce quality \u2014 it simply removes the outer pixels. However, the cropped image will have fewer total pixels (lower resolution) since you are keeping only a portion of the original." },
            { q: "Can I undo a crop?", a: "Since all processing happens in your browser, the original image is preserved until you navigate away. After applying a crop, you can see the result in the before/after view. If you want to try a different crop, simply adjust the handles and apply again." },
            { q: "Are my images uploaded to a server?", a: "No. All cropping happens directly in your browser. Your images never leave your device." },
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
