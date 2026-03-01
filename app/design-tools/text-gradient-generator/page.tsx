import type { Metadata } from "next";
import CssGradientGenerator from "../css-gradient-generator/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "Free CSS Text Gradient Generator — Gradient Text Effect | EveryFreeTool",
  description: "Apply beautiful gradient effects to text with CSS. Free online generator with live preview, custom fonts, and one-click code copy. Works in all modern browsers.",
  openGraph: { title: "Free CSS Text Gradient Generator", description: "Create gradient text effects with live preview and custom fonts. Copy CSS instantly. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function TextGradientGeneratorPage() {
  const faqs = [
    { name: "How do CSS text gradients work?", text: "CSS text gradients use a clever technique: apply a gradient background to the text element, then clip the background to only show through the text using background-clip: text and color: transparent. The gradient shows through the transparent text, creating the gradient text effect." },
    { name: "Which browsers support text gradients?", text: "All modern browsers support background-clip: text. Chrome, Edge, and Opera have supported it for years. Firefox supports it fully. Safari requires the -webkit- prefix. This tool generates both prefixed and unprefixed code for maximum compatibility." },
    { name: "Do text gradients work on all fonts?", text: "Yes, but they look best on bold, large text. Thin fonts don't show enough gradient surface area to be effective. For best results, use font-weight 600+ and font sizes above 32px. Headings and hero text are ideal candidates." },
    { name: "Can I animate text gradients?", text: "Yes. Toggle the animation switch to animate the gradient behind the text. The shift animation creates a flowing color effect. The hue-rotate animation cycles through all colors. Both look stunning on hero headings." },
    { name: "What's the fallback for older browsers?", text: "Use a solid color as fallback. Set color: #667eea (your gradient's dominant color) before the gradient code. Browsers that don't support background-clip: text will show the solid color instead." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Text Gradient Generator", url: "https://everyfreetool.com/design-tools/text-gradient-generator", description: "Create CSS text gradient effects with live preview and custom fonts. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free CSS Text Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Create stunning gradient text effects with CSS. Edit the text, choose fonts, adjust colors, and copy the CSS with one click. Works in all modern browsers.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">CSS Text Gradient Technique Explained</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The CSS text gradient technique works by applying a gradient as the element&apos;s background, then clipping the background to only be visible through the text. The key properties are <code style={{ color: "#059669" }}>background: linear-gradient(...)</code>, <code style={{ color: "#059669" }}>-webkit-background-clip: text</code>, <code style={{ color: "#059669" }}>background-clip: text</code>, and <code style={{ color: "#059669" }}>color: transparent</code>. This makes the gradient visible only where the text is, creating the gradient text effect.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Best Practices for Gradient Text</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Use gradient text for headings and hero text, not body copy — it&apos;s an accent effect that loses impact when overused. Bold weights (600-900) show the gradient better than regular or light weights. Larger font sizes (32px+) give the gradient room to transition smoothly. Consider readability: ensure enough contrast between the gradient colors and the background. A dark gradient on a light background (or vice versa) works best.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Gradient Text in Production</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Major websites use gradient text for impact: Apple uses it for product headlines, Stripe uses it for feature announcements, and countless landing pages use it for hero sections. When implementing, always set a solid <code style={{ color: "#059669" }}>color</code> property as a fallback before the gradient code. This ensures the text remains readable if the gradient technique isn&apos;t supported. The <code style={{ color: "#059669" }}>-webkit-text-fill-color: transparent</code> property can also be used alongside <code style={{ color: "#059669" }}>color: transparent</code> for broader WebKit support.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Create your text gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="CSS Text Gradient Generator" subtitle="Create gradient text effects with live preview." defaultPreviewMode="text" articleMode={true} />
    </>
  );
}
