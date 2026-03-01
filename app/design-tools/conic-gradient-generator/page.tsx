import type { Metadata } from "next";
import CssGradientGenerator from "../css-gradient-generator/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "Free CSS Conic Gradient Generator — Color Wheels & Pie Charts | EveryFreeTool",
  description: "Create conic gradients for color wheels, pie charts, and unique backgrounds. Free generator with visual controls and instant CSS output.",
  openGraph: { title: "Free CSS Conic Gradient Generator", description: "Create conic gradients for color wheels, pie charts, and backgrounds. Copy CSS instantly. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function ConicGradientGeneratorPage() {
  const faqs = [
    { name: "What is a conic gradient?", text: "A conic gradient transitions colors around a center point, like the hands of a clock. Unlike linear gradients (straight line) or radial gradients (center outward), conic gradients sweep in a circle. They're ideal for color wheels, pie charts, and decorative backgrounds." },
    { name: "How do I create a pie chart with conic gradients?", text: "Use hard color stops at the same position to create segments. For example: conic-gradient(#ff0000 0% 25%, #00ff00 25% 50%, #0000ff 50% 75%, #ffff00 75% 100%) creates four equal pie slices." },
    { name: "What does the 'from' angle do?", text: "The 'from' angle rotates the starting point of the gradient. By default (0deg), the gradient starts at the top. 'from 90deg' starts from the right side. This lets you rotate the entire gradient without changing individual color stop positions." },
    { name: "Can I change the center position?", text: "Yes. Click anywhere on the preview to set the center point, or use the X% and Y% input fields for precise positioning. This moves where the color wheel radiates from." },
    { name: "Which browsers support conic gradients?", text: "Conic gradients are supported in all modern browsers: Chrome 69+, Firefox 83+, Safari 12.1+, and Edge 79+. Global browser support is over 95%." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Conic Gradient Generator", url: "https://everyfreetool.com/design-tools/conic-gradient-generator", description: "Create CSS conic gradients for color wheels and pie charts. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free CSS Conic Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Create conic gradients for color wheels, pie charts, spinners, and unique backgrounds. Adjust the starting angle, position, and color stops visually.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How CSS Conic Gradients Work</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The CSS <code style={{ color: "#059669" }}>conic-gradient()</code> function creates a gradient that sweeps around a center point. Think of it like a color wheel: colors transition as you move clockwise (or counter-clockwise). The syntax — <code style={{ color: "#059669" }}>conic-gradient(from 0deg at 50% 50%, red, yellow, green, blue, red)</code> — specifies a starting angle, center position, and color stops distributed around the full 360 degrees.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Creative Uses for Conic Gradients</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Conic gradients are remarkably versatile. Create pure-CSS pie charts by using hard color stops at the same position. Build color wheel pickers by distributing hues evenly around 360 degrees. Design loading spinners using a single color that fades to transparent. Create starburst patterns with <code style={{ color: "#059669" }}>repeating-conic-gradient()</code>. They also make unique button backgrounds and decorative section dividers that stand out from the typical linear gradient.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">The &lsquo;from&rsquo; Angle and Position</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The <code style={{ color: "#059669" }}>from</code> keyword rotates the gradient&apos;s starting point. By default, the gradient begins at 12 o&apos;clock (0deg). Setting <code style={{ color: "#059669" }}>from 90deg</code> rotates it to start at 3 o&apos;clock. The <code style={{ color: "#059669" }}>at</code> keyword sets the center point — <code style={{ color: "#059669" }}>at 25% 75%</code> moves the center toward the bottom-left. Combining angle and position gives you precise control over the gradient&apos;s appearance.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Create your conic gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="CSS Conic Gradient Generator" subtitle="Create conic gradients for color wheels and pie charts." defaultType="conic" articleMode={true} />
    </>
  );
}
