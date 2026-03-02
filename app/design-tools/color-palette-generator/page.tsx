import type { Metadata } from "next";
import ColorPicker from "../color-picker/components/ColorPicker";

export const metadata: Metadata = {
  title: "Color Palette Generator — Create Beautiful Color Schemes | EveryFreeTool",
  description: "Generate harmonious color palettes using color theory. Complementary, analogous, triadic, split-complementary, tetradic, square, and monochromatic schemes. Free, 100% client-side.",
  openGraph: { title: "Color Palette Generator — Free Online", description: "Generate beautiful color palettes using color theory. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function ColorPaletteGeneratorPage() {
  const faqs = [
    { name: "What are color harmonies?", text: "Color harmonies are mathematically defined relationships between colors on the color wheel. Complementary colors are 180° apart, triadic are 120° apart, analogous are adjacent. These relationships produce colors that naturally look good together." },
    { name: "When should I use each harmony type?", text: "Complementary for high contrast and energy. Analogous for calm, cohesive designs. Triadic for vibrant, balanced schemes. Monochromatic for elegant, unified looks. Split-complementary for contrast with less tension than complementary." },
    { name: "What are tints and shades?", text: "Tints are a color mixed with white (lighter), shades are mixed with black (darker). The 9-step scale from lightest to darkest is similar to Tailwind CSS's color numbering system (50 through 900)." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Color Palette Generator", url: "https://everyfreetool.com/design-tools/color-palette-generator", description: "Generate color palettes using color theory. Free, 100% client-side.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Color Palette Generator &mdash; Create Beautiful Color Schemes</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate harmonious color palettes based on color theory. Pick a base color and explore complementary, analogous, triadic, and more harmony types.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Color Theory Made Easy</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Color theory provides mathematical rules for combining colors harmoniously. These rules are based on the <strong style={{ color: "var(--text)" }}>color wheel</strong> &mdash; a circular arrangement of hues. Colors at specific angular relationships on the wheel naturally complement each other. Artists and designers have used these relationships for centuries. This tool calculates them instantly from any starting color.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Building a Brand Palette</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Start with your primary brand color. Use <strong style={{ color: "var(--text)" }}>complementary</strong> harmony to find an accent color. Use the <strong style={{ color: "var(--text)" }}>tints &amp; shades</strong> to create a full scale from light to dark (like Tailwind&apos;s 50-900 system). Add a neutral palette by desaturating your base color. This gives you a complete, cohesive design system from a single starting color.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Harmony Types Explained</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>Complementary</strong> (180&deg;): high contrast, energetic. <strong style={{ color: "var(--text)" }}>Analogous</strong> (&plusmn;30&deg;): calm, cohesive. <strong style={{ color: "var(--text)" }}>Triadic</strong> (120&deg;): vibrant, balanced. <strong style={{ color: "var(--text)" }}>Split-complementary</strong>: contrast with less tension. <strong style={{ color: "var(--text)" }}>Tetradic</strong>: rich, complex schemes. <strong style={{ color: "var(--text)" }}>Square</strong> (90&deg;): balanced four-color schemes. <strong style={{ color: "var(--text)" }}>Monochromatic</strong>: elegant single-hue variations.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Pick a color below to generate palettes.</p>
          </div>
        </div>
      </div>
      <ColorPicker title="Color Palette Generator" subtitle="Generate harmonious color palettes." defaultTab="palette" articleMode={true} />
    </>
  );
}
