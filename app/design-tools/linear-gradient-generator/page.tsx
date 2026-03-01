import type { Metadata } from "next";
import CssGradientGenerator from "../css-gradient-generator/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "Free CSS Linear Gradient Generator Online | EveryFreeTool",
  description: "Create stunning linear gradients with custom angles, multiple color stops, and one-click CSS code. Free online tool with Tailwind and SCSS output.",
  openGraph: { title: "Free CSS Linear Gradient Generator", description: "Create linear gradients with custom angles and color stops. Copy CSS, Tailwind, SCSS instantly. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function LinearGradientGeneratorPage() {
  const faqs = [
    { name: "How does linear-gradient() work in CSS?", text: "The CSS linear-gradient() function creates a smooth transition between two or more colors along a straight line. You define a direction or angle and a list of color stops. The browser interpolates the colors between each stop." },
    { name: "What angle directions are available?", text: "Angles go from 0° (bottom to top) through 90° (left to right), 180° (top to bottom), and 270° (right to left). You can also use keywords like 'to right', 'to bottom left'. Any degree value from 0 to 360 works." },
    { name: "Can I add more than two colors?", text: "Yes. Click anywhere on the color stop bar to add new stops. Most gradients use 2-5 stops but there is no hard limit. Each stop can have a precise percentage position." },
    { name: "Is this linear gradient tool free?", text: "Completely free with no signup required. All processing happens in your browser. Create unlimited gradients and copy CSS, Tailwind, or SCSS code with one click." },
    { name: "How do I create a diagonal gradient?", text: "Use angles like 45° (bottom-left to top-right) or 135° (top-left to bottom-right). The direction preset buttons provide quick access to all 8 main directions." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Linear Gradient Generator", url: "https://everyfreetool.com/design-tools/linear-gradient-generator", description: "Create CSS linear gradients with custom angles and colors. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free CSS Linear Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Build perfect linear gradients with a visual angle picker, draggable color stops, and one-click code copy. Supports CSS, Tailwind, and SCSS output.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Understanding CSS Linear Gradients</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The CSS <code style={{ color: "#059669" }}>linear-gradient()</code> function creates a color transition along a straight line. You specify a direction or angle, followed by two or more color stops. The browser smoothly interpolates between the colors. The simplest gradient — <code style={{ color: "#059669" }}>linear-gradient(#667eea, #764ba2)</code> — transitions from top to bottom by default.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Understanding Gradient Angles and Directions</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Gradient angles start at 0° (bottom to top) and rotate clockwise: 90° goes left to right, 180° top to bottom, 270° right to left. You can also use direction keywords like <code style={{ color: "#059669" }}>to right</code>, <code style={{ color: "#059669" }}>to bottom left</code>, or <code style={{ color: "#059669" }}>to top right</code>. Diagonal gradients (45°, 135°) are popular for UI backgrounds because they add visual energy without being too aggressive.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Multi-Stop Linear Gradients</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Add more than two color stops to create rich, layered gradients. Each stop can have a percentage position: <code style={{ color: "#059669" }}>linear-gradient(90deg, #ff0000 0%, #ffff00 50%, #00ff00 100%)</code>. Place two stops at the same position to create a hard edge. Stops without explicit positions are evenly distributed between their neighbors.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Create your linear gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="CSS Linear Gradient Generator" subtitle="Create linear gradients with custom angles and colors." defaultType="linear" articleMode={true} />
    </>
  );
}
