import type { Metadata } from "next";
import ColorPicker from "../color-picker/components/ColorPicker";

export const metadata: Metadata = {
  title: "HSL to HEX Converter — Convert HSL Colors to Hex Codes | EveryFreeTool",
  description: "Convert HSL (Hue, Saturation, Lightness) values to HEX color codes instantly. Visual picker, all formats, contrast checker. Free, 100% client-side.",
  openGraph: { title: "HSL to HEX Converter — Free Online", description: "Convert HSL colors to hex codes instantly. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function HslToHexPage() {
  const faqs = [
    { name: "What is HSL?", text: "HSL stands for Hue (color wheel position, 0-360°), Saturation (vividness, 0-100%), and Lightness (brightness, 0-100%). It's more intuitive than RGB for creating color variations." },
    { name: "Why use HSL over RGB?", text: "HSL makes it easy to create lighter/darker versions by changing lightness, or more/less vivid versions by changing saturation, while keeping the same hue. This is harder with RGB." },
    { name: "How does the conversion work?", text: "HSL is first converted to RGB using a mathematical formula involving the hue sector and chroma. The RGB values are then converted to two-digit hexadecimal numbers." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "HSL to HEX Converter", url: "https://everyfreetool.com/design-tools/hsl-to-hex", description: "Convert HSL colors to HEX codes. Free, 100% client-side.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">HSL to HEX Converter &mdash; Convert HSL Colors to Hex Codes</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Enter Hue (0-360), Saturation (0-100%), and Lightness (0-100%) values to get the corresponding HEX color code. All formats update in real-time.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Why HSL Is More Intuitive</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>HSL maps directly to how humans think about color. <strong style={{ color: "var(--text)" }}>Hue</strong> is the color itself &mdash; red at 0&deg;, yellow at 60&deg;, green at 120&deg;, cyan at 180&deg;, blue at 240&deg;, magenta at 300&deg;. <strong style={{ color: "var(--text)" }}>Saturation</strong> controls vividness (0% is gray, 100% is pure color). <strong style={{ color: "var(--text)" }}>Lightness</strong> controls brightness (0% is black, 50% is pure color, 100% is white).</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">HSL in CSS</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Modern CSS fully supports HSL: <code style={{ color: "#059669" }}>color: hsl(217, 92%, 60%)</code> is equivalent to <code style={{ color: "#059669" }}>color: #3B82F6</code>. HSL is especially useful with CSS custom properties for creating theme variants: change just the lightness to get hover states, borders, and backgrounds from a single hue.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Creating Color Variations with HSL</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Starting from <code style={{ color: "#059669" }}>hsl(217, 92%, 60%)</code> (blue), reduce lightness to 40% for a darker variant, increase to 80% for a lighter tint, or reduce saturation to 30% for a muted version. This is much harder with HEX or RGB, where all three values must change simultaneously to shift lightness.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Enter HSL values below to convert to HEX.</p>
          </div>
        </div>
      </div>
      <ColorPicker title="HSL to HEX Converter" subtitle="Convert HSL colors to hex codes." defaultFocusFormat="hsl" articleMode={true} />
    </>
  );
}
