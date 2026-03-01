import type { Metadata } from "next";
import CssGradientGenerator from "../css-gradient-generator/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "Free CSS Radial Gradient Generator Online | EveryFreeTool",
  description: "Design radial gradients with custom shapes, positions, and color stops. Free online radial gradient maker with instant CSS, Tailwind, and SCSS code.",
  openGraph: { title: "Free CSS Radial Gradient Generator", description: "Design radial gradients with custom shapes and positions. Copy CSS, Tailwind, SCSS instantly. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function RadialGradientGeneratorPage() {
  const faqs = [
    { name: "What is a CSS radial gradient?", text: "A radial gradient radiates outward from a center point in a circular or elliptical shape. Unlike linear gradients that follow a straight line, radial gradients create spotlight or orb-like effects." },
    { name: "Circle vs ellipse — when should I use each?", text: "Use circle for a perfectly round gradient that looks the same regardless of the container's aspect ratio. Use ellipse (the default) when you want the gradient to stretch to match the container shape. Circles work great for spotlight effects; ellipses blend more naturally into rectangular containers." },
    { name: "How do I change the center position?", text: "Click anywhere on the preview to set the gradient center, or type exact X% and Y% values in the position fields. Use the quick presets for common positions like center, corners, and edges." },
    { name: "What are the size keywords?", text: "CSS provides four size keywords: closest-side (gradient reaches the nearest edge), farthest-side (reaches the farthest edge), closest-corner, and farthest-corner (default). Each controls how far the gradient extends." },
    { name: "Is this radial gradient generator free?", text: "Completely free. No signup, no limits. All processing happens in your browser. Create unlimited gradients and copy code with one click." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Radial Gradient Generator", url: "https://everyfreetool.com/design-tools/radial-gradient-generator", description: "Create CSS radial gradients with custom shapes and positions. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free CSS Radial Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Design radial gradients with circle or ellipse shapes, click-to-set positioning, and multiple color stops. Copy CSS, Tailwind, or SCSS code instantly.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How CSS Radial Gradients Work</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The CSS <code style={{ color: "#059669" }}>radial-gradient()</code> function creates a gradient that radiates outward from a center point. The simplest form — <code style={{ color: "#059669" }}>radial-gradient(#f093fb, #f5576c)</code> — creates an elliptical gradient centered in the element. Colors transition from the center outward, with the first color at the center and the last color at the edges.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Circle vs Ellipse &mdash; When to Use Each</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>By default, radial gradients are elliptical — they stretch to match the container&apos;s shape. A <code style={{ color: "#059669" }}>circle</code> shape maintains equal radii regardless of the container&apos;s aspect ratio, making it ideal for spotlight effects, button highlights, and decorative orbs. Ellipses work better as background fills for rectangular containers because they feel more natural. Use <code style={{ color: "#059669" }}>radial-gradient(circle, ...)</code> or <code style={{ color: "#059669" }}>radial-gradient(ellipse, ...)</code> to specify.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Positioning and Size Keywords</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Control where the gradient originates with the <code style={{ color: "#059669" }}>at</code> keyword: <code style={{ color: "#059669" }}>radial-gradient(circle at 25% 75%, ...)</code>. The four size keywords — <code style={{ color: "#059669" }}>closest-side</code>, <code style={{ color: "#059669" }}>farthest-side</code>, <code style={{ color: "#059669" }}>closest-corner</code>, and <code style={{ color: "#059669" }}>farthest-corner</code> — control how far the gradient extends. Farthest-corner (the default) ensures the gradient covers the entire element.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Create your radial gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="CSS Radial Gradient Generator" subtitle="Design radial gradients with circle or ellipse shapes." defaultType="radial" articleMode={true} />
    </>
  );
}
