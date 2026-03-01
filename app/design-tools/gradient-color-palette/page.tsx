import type { Metadata } from "next";
import CssGradientGenerator from "../css-gradient-generator/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "120+ Beautiful CSS Gradient Palettes — Copy & Use Free | EveryFreeTool",
  description: "Browse 120+ curated gradient color palettes. Click to preview, customize colors, and copy CSS code instantly. Free gradient inspiration for designers and developers.",
  openGraph: { title: "120+ Beautiful CSS Gradient Palettes", description: "Browse 120+ curated gradient palettes. Click to customize and copy CSS. Free gradient inspiration.", type: "website" },
  robots: "index, follow",
};

export default function GradientColorPalettePage() {
  const faqs = [
    { name: "How many gradient presets are included?", text: "Over 120 curated gradients across 10 categories: Warm, Cool, Nature, Sunset, Pastel, Dark, Neon, Monochrome, Rainbow, and Popular. Each gradient is handpicked for visual quality." },
    { name: "Can I customize the preset gradients?", text: "Yes. Click any gradient in the gallery to load it into the editor. From there, you can modify colors, add or remove stops, change the angle, switch gradient types, and more. The preset is just a starting point." },
    { name: "How do I copy the CSS for a gradient?", text: "Click a gradient preset to load it, then use the copy button on the code panel. You can copy as CSS, Tailwind, SCSS, or CSS Variables. One click copies the code to your clipboard." },
    { name: "How should I choose gradient colors?", text: "Use analogous colors (neighbors on the color wheel) for smooth, natural transitions. Complementary colors create bold contrast. Stick to 2-3 stops for most designs. Avoid mixing warm and cool colors unless you add a neutral transition color between them." },
    { name: "Can I search for specific gradient colors?", text: "Yes. Use the search bar to filter by name or color (e.g., 'purple', 'ocean', 'sunset'). Category filter pills let you browse by mood: Warm, Cool, Nature, Pastel, Dark, Neon, and more." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Gradient Color Palette", url: "https://everyfreetool.com/design-tools/gradient-color-palette", description: "Browse 120+ curated CSS gradient palettes. Click to customize and copy CSS.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Gradient Color Palette &mdash; 120+ Beautiful CSS Gradients</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Browse a curated collection of 120+ gradient color palettes. Click any gradient to preview it, customize colors, and copy CSS code instantly. Perfect for finding design inspiration.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Finding the Right Gradient</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Choosing the right gradient can make or break a design. Use the category filter pills to browse by mood — Warm gradients work for energetic landing pages and CTAs, Cool tones suit corporate and tech interfaces, Pastel shades are perfect for gentle, approachable designs, and Dark gradients create dramatic hero sections. Search by color name to find gradients that match your brand palette.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How to Choose Gradient Colors That Work Together</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The best gradients follow color theory principles. Analogous colors (adjacent on the color wheel, like blue to purple) create smooth, harmonious transitions. Complementary colors (opposite, like orange to blue) create high contrast. Keep saturation and lightness consistent across stops for a professional look. Avoid combining more than 3-4 colors — subtlety usually wins. When in doubt, start with a preset and adjust from there.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Using Gradients in Web Design</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Gradients work as hero section backgrounds, button fills, text effects, card overlays, and section dividers. For hero sections, use subtle 2-color gradients at wide angles. For buttons, keep gradients subtle to maintain readability. Text gradients work best with large, bold headings. Always check contrast when placing text over gradient backgrounds — the darkest and lightest points of the gradient both need sufficient contrast.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Browse the gradient gallery below and click any gradient to customize it.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="Gradient Color Palette" subtitle="Browse 120+ curated gradient palettes." defaultGallery={true} articleMode={true} />
    </>
  );
}
