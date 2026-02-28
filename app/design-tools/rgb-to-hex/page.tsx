import type { Metadata } from "next";
import ColorPicker from "../color-picker/components/ColorPicker";

export const metadata: Metadata = {
  title: "RGB to HEX Converter — Convert RGB Values to Hex Color Codes | EveryFreeTool",
  description: "Convert RGB values to HEX color codes instantly. Enter R, G, B values (0-255) and get the hex code. Visual picker, contrast checker. Free, 100% client-side.",
  openGraph: { title: "RGB to HEX Converter — Free Online", description: "Convert RGB values to hex color codes instantly. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function RgbToHexPage() {
  const faqs = [
    { name: "How do I convert RGB to HEX?", text: "Enter your R, G, B values (0-255 each) into the RGB fields. The HEX code appears instantly. Each value is converted to a two-digit hexadecimal number." },
    { name: "How is RGBA handled?", text: "RGBA adds an alpha (opacity) channel. The alpha value (0-1) converts to a two-digit hex appended to the 6-digit code, creating an 8-digit hex like #FF000080 (red at 50% opacity)." },
    { name: "Why use HEX over RGB in CSS?", text: "HEX codes are shorter (#3B82F6 vs rgb(59, 130, 246)), widely recognized, and easier to copy-paste. Both are valid in CSS and produce identical results." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "RGB to HEX Converter", url: "https://everyfreetool.com/design-tools/rgb-to-hex", description: "Convert RGB values to HEX color codes. Free, 100% client-side.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">RGB to HEX Converter &mdash; Convert RGB Values to Hex Color Codes</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Enter R, G, B values (0-255 each) and get the HEX color code instantly. Also converts RGBA with opacity to 8-digit hex.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Why Convert RGB to HEX?</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>HEX codes are the most common way to specify colors in web design. They&apos;re compact (<code style={{ color: "#059669" }}>#3B82F6</code> vs <code style={{ color: "#059669" }}>rgb(59, 130, 246)</code>), universally recognized by designers and developers, and the standard format in brand guidelines, Figma, Sketch, and CSS.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">The Conversion Process</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Each RGB value (0-255) maps to a two-digit hexadecimal number (00-FF). R: 59 becomes <code style={{ color: "#059669" }}>3B</code>, G: 130 becomes <code style={{ color: "#059669" }}>82</code>, B: 246 becomes <code style={{ color: "#059669" }}>F6</code>. Combine them with a <code style={{ color: "#059669" }}>#</code> prefix: <code style={{ color: "#059669" }}>#3B82F6</code>. For RGBA, the alpha value (0-1) is multiplied by 255 and appended as two more hex digits.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Using HEX Codes in Web Design</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>In CSS: <code style={{ color: "#059669" }}>color: #3B82F6;</code> or <code style={{ color: "#059669" }}>background-color: #3B82F6;</code>. In HTML email templates, HEX is often the only reliable format. In design tokens and CSS custom properties: <code style={{ color: "#059669" }}>--primary: #3B82F6;</code>. Tailwind CSS maps its color classes to HEX values internally.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Enter RGB values below to get the HEX code.</p>
          </div>
        </div>
      </div>
      <ColorPicker title="RGB to HEX Converter" subtitle="Convert RGB values to hex color codes." defaultFocusFormat="rgb" articleMode={true} />
    </>
  );
}
