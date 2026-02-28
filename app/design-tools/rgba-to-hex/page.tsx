import type { Metadata } from "next";
import ColorPicker from "../color-picker/components/ColorPicker";

export const metadata: Metadata = {
  title: "RGBA to HEX Converter — Convert RGBA Colors with Opacity to Hex | EveryFreeTool",
  description: "Convert RGBA colors with opacity to 8-digit HEX codes instantly. Alpha transparency conversion, visual picker, all formats. Free, 100% client-side.",
  openGraph: { title: "RGBA to HEX Converter — Free Online", description: "Convert RGBA with opacity to 8-digit hex. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function RgbaToHexPage() {
  const faqs = [
    { name: "How does RGBA alpha convert to hex?", text: "The alpha value (0-1) is multiplied by 255 and converted to a two-digit hex number. For example, 0.5 opacity = 128 in decimal = 80 in hex, giving #FF000080 for red at 50%." },
    { name: "What are common opacity hex values?", text: "100% = FF, 90% = E6, 75% = BF, 50% = 80, 25% = 40, 10% = 1A, 0% = 00. These are appended to the standard 6-digit hex." },
    { name: "Where are 8-digit hex codes used?", text: "CSS supports 8-digit hex (#RRGGBBAA). Android development uses #AARRGGBB format. Some design tools use 8-digit hex for colors with transparency." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "RGBA to HEX Converter", url: "https://everyfreetool.com/design-tools/rgba-to-hex", description: "Convert RGBA colors to 8-digit hex. Free, 100% client-side.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">RGBA to HEX Converter &mdash; Convert RGBA Colors with Opacity to Hex</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Convert RGBA colors with transparency to 8-digit HEX codes. Adjust the alpha channel and see the hex output update in real-time.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Understanding the Alpha Channel</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The alpha channel controls <strong style={{ color: "var(--text)" }}>opacity</strong> &mdash; how transparent or opaque a color is. In RGBA, alpha is a decimal from 0 (fully transparent) to 1 (fully opaque). In 8-digit hex, alpha is the last two digits, ranging from 00 (transparent) to FF (opaque). The conversion: multiply the decimal alpha by 255 and convert to hexadecimal.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Common Alpha Values</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                <code style={{ color: "#059669" }}>1.0</code> = FF (100% opaque).
                <code style={{ color: "#059669" }}> 0.9</code> = E6 (90%).
                <code style={{ color: "#059669" }}> 0.75</code> = BF (75%).
                <code style={{ color: "#059669" }}> 0.5</code> = 80 (50%).
                <code style={{ color: "#059669" }}> 0.25</code> = 40 (25%).
                <code style={{ color: "#059669" }}> 0.1</code> = 1A (10%).
                <code style={{ color: "#059669" }}> 0.0</code> = 00 (transparent).
                These are the most commonly needed values when converting between RGBA and hex.
              </p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">8-Digit Hex in CSS and Development</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>CSS supports 8-digit hex natively: <code style={{ color: "#059669" }}>background-color: #3B82F680;</code> gives blue at 50% opacity. In Android development, the format is <code style={{ color: "#059669" }}>#AARRGGBB</code> (alpha first). Some design tools and game engines use 8-digit hex for storing colors with transparency in a single compact value.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Adjust the RGBA alpha value below to convert.</p>
          </div>
        </div>
      </div>
      <ColorPicker title="RGBA to HEX Converter" subtitle="Convert RGBA colors with opacity to hex." defaultFocusFormat="rgba" articleMode={true} />
    </>
  );
}
