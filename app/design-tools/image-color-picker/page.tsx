import type { Metadata } from "next";
import ColorPicker from "../color-picker/components/ColorPicker";

export const metadata: Metadata = {
  title: "Image Color Picker — Extract Colors from Any Image | EveryFreeTool",
  description: "Upload any image and pick colors by clicking pixels or auto-extract dominant colors. Get HEX, RGB, HSL values. 100% client-side — images never leave your device.",
  openGraph: { title: "Image Color Picker — Free Online", description: "Extract colors from any image. Click pixels or auto-extract dominant colors. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function ImageColorPickerPage() {
  const faqs = [
    { name: "How do I pick a color from an image?", text: "Upload an image by dragging it or clicking the upload area. Then click anywhere on the image to pick that pixel's exact color. The HEX, RGB, and HSL values update instantly." },
    { name: "How does dominant color extraction work?", text: "The tool samples pixels from the image, groups similar colors together, and identifies the most common color groups. This gives you the 5-6 most representative colors from the image." },
    { name: "Are my images uploaded anywhere?", text: "No. Images are processed entirely in your browser using the Canvas API. They're never uploaded to any server, stored, or transmitted. When you close the tab, they're gone." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Image Color Picker", url: "https://everyfreetool.com/design-tools/image-color-picker", description: "Extract colors from images. Free, 100% client-side.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Image Color Picker &mdash; Extract Colors from Any Image</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Upload any image and click to pick specific pixel colors, or auto-extract the dominant color palette. All processing happens in your browser.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Design Inspiration from Images</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Some of the best color palettes come from photographs, artwork, and nature. Upload a sunset photo and extract its warm oranges and purples. Use a product photo to match exact brand colors. Sample colors from a competitor&apos;s website screenshot. This tool turns any image into a starting point for your color palette.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How Color Extraction Works</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The tool reads pixel data from your image using the HTML Canvas API. For dominant color extraction, it samples thousands of pixels, quantizes similar colors into groups, and returns the most frequent color groups. This identifies the image&apos;s key colors without processing every single pixel, keeping extraction fast even for large images.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">100% Private Processing</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Your images <strong style={{ color: "var(--text)" }}>never leave your device</strong>. The browser reads the file locally, renders it to a canvas element, and extracts pixel data &mdash; all in JavaScript. No server upload, no API calls, no storage. This means you can safely use it with confidential design files, unreleased branding, and private photos.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Upload an image below to extract colors.</p>
          </div>
        </div>
      </div>
      <ColorPicker title="Image Color Picker" subtitle="Extract colors from any image." defaultTab="image" defaultFocusFormat="image" articleMode={true} />
    </>
  );
}
