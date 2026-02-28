import type { Metadata } from "next";
import ColorPicker from "../color-picker/components/ColorPicker";

export const metadata: Metadata = {
  title: "Color Converter — Convert Between HEX, RGB, HSL, CMYK & More | EveryFreeTool",
  description: "Convert between HEX, RGB, HSL, HSV, CMYK, and CSS instantly. All formats update in real-time. Visual picker, contrast checker, palette generator. Free, 100% client-side.",
  openGraph: { title: "Color Converter — HEX, RGB, HSL, CMYK", description: "Convert between all color formats instantly. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function ColorConverterPage() {
  const faqs = [
    { name: "What color formats are supported?", text: "HEX, RGB, RGBA, HSL, HSLA, HSV/HSB, CMYK, and CSS custom properties. All convert bidirectionally in real-time." },
    { name: "Is the CMYK conversion exact?", text: "It uses the standard mathematical formula which is accurate for screen display. For print production, ICC color profiles are needed for precise CMYK values." },
    { name: "Which format is best for web development?", text: "HEX and RGB are universally supported in CSS. HSL is increasingly preferred for easier color manipulation. Use RGBA or HSLA when you need transparency." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Color Converter", url: "https://everyfreetool.com/design-tools/color-converter", description: "Convert between HEX, RGB, HSL, HSV, CMYK. Free, 100% client-side.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Color Converter &mdash; Convert Between HEX, RGB, HSL, CMYK &amp; More</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Convert between all color formats simultaneously. Change any value and every other format updates in real-time. HEX, RGB, HSL, HSV, CMYK, CSS variables.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">All Color Formats in One Tool</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Different tools and platforms use different color formats. CSS uses HEX, RGB, and HSL. Figma and Photoshop show HSB/HSV. Print designers need CMYK. Instead of juggling multiple converter tools, this single interface shows <strong style={{ color: "var(--text)" }}>every format simultaneously</strong> and lets you edit any one &mdash; all others update instantly.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">When to Use Each Format</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>HEX:</strong> Web design, CSS, HTML, brand guidelines. <strong style={{ color: "var(--text)" }}>RGB:</strong> Screens, digital design, JavaScript canvas. <strong style={{ color: "var(--text)" }}>HSL:</strong> Intuitive color manipulation, creating tints/shades. <strong style={{ color: "var(--text)" }}>HSV/HSB:</strong> Design tools (Photoshop, Figma). <strong style={{ color: "var(--text)" }}>CMYK:</strong> Print design (approximate without ICC profiles).</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Real-Time Bidirectional Conversion</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Every input field is both readable and editable. Type a HEX code and see the RGB, HSL, HSV, and CMYK values appear. Adjust the HSL lightness slider and watch the HEX code change. Pick a color visually and all numeric values update. This bidirectional approach means you can work in whichever format is most natural for your task.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Pick a color or enter a value in any format to convert.</p>
          </div>
        </div>
      </div>
      <ColorPicker title="Color Converter" subtitle="Convert between all color formats instantly." articleMode={true} />
    </>
  );
}
