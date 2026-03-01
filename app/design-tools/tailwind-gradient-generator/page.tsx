import type { Metadata } from "next";
import CssGradientGenerator from "../css-gradient-generator/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "Free Tailwind CSS Gradient Generator — bg-gradient-to Classes | EveryFreeTool",
  description: "Generate Tailwind CSS gradient classes instantly. Visual builder for bg-gradient-to-r, from-color, via-color, to-color utilities. Copy Tailwind classes with one click.",
  openGraph: { title: "Free Tailwind CSS Gradient Generator", description: "Generate Tailwind gradient classes with a visual builder. Copy bg-gradient-to utility classes instantly. Free.", type: "website" },
  robots: "index, follow",
};

export default function TailwindGradientGeneratorPage() {
  const faqs = [
    { name: "How do Tailwind gradient classes work?", text: "Tailwind uses three utility classes for gradients: from-{color} (start color), via-{color} (optional middle color), and to-{color} (end color). Combine with a direction class like bg-gradient-to-r (left to right) or bg-gradient-to-br (top-left to bottom-right)." },
    { name: "What direction classes are available?", text: "Tailwind provides 8 direction utilities: bg-gradient-to-t (up), bg-gradient-to-tr (top-right), bg-gradient-to-r (right), bg-gradient-to-br (bottom-right), bg-gradient-to-b (down), bg-gradient-to-bl (bottom-left), bg-gradient-to-l (left), bg-gradient-to-tl (top-left)." },
    { name: "What about gradients with 4+ stops?", text: "Tailwind's native gradient utilities support up to 3 stops (from, via, to). For gradients with more stops, radial gradients, or conic gradients, this tool generates the arbitrary value syntax: bg-[linear-gradient(...)] which works in Tailwind v3+ and v4." },
    { name: "Does this support Tailwind v4?", text: "Yes. The output works with both Tailwind v3 and v4. For Tailwind v4's CSS-first configuration approach, the CSS Variables tab provides custom properties you can reference in your @theme config." },
    { name: "Can I use custom hex colors in Tailwind gradients?", text: "Yes. Use arbitrary value syntax: from-[#667eea] via-[#8b5cf6] to-[#764ba2]. This works with any hex, rgb, or hsl color value." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Tailwind Gradient Generator", url: "https://everyfreetool.com/design-tools/tailwind-gradient-generator", description: "Generate Tailwind CSS gradient classes with a visual builder. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Tailwind CSS Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Build gradients visually and get Tailwind CSS utility classes instantly. Supports bg-gradient-to directions, from/via/to color utilities, and arbitrary values for complex gradients.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Tailwind Gradient Utilities Explained</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Tailwind&apos;s gradient system uses three main utilities: <code style={{ color: "#059669" }}>from-{"{color}"}</code> sets the start color, <code style={{ color: "#059669" }}>via-{"{color}"}</code> adds an optional middle color, and <code style={{ color: "#059669" }}>to-{"{color}"}</code> sets the end color. Combine with a direction class like <code style={{ color: "#059669" }}>bg-gradient-to-r</code> (left to right). Example: <code style={{ color: "#059669" }}>bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500</code>.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Tailwind Gradient Cheat Sheet</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Direction classes map to CSS angles: <code style={{ color: "#059669" }}>bg-gradient-to-t</code> = 0&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-tr</code> = 45&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-r</code> = 90&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-br</code> = 135&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-b</code> = 180&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-bl</code> = 225&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-l</code> = 270&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-tl</code> = 315&deg;. For arbitrary angles, use <code style={{ color: "#059669" }}>bg-[linear-gradient(135deg,#667eea,#764ba2)]</code>.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Beyond Simple Gradients in Tailwind</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>For radial, conic, or multi-stop gradients, use Tailwind&apos;s arbitrary value syntax. Radial: <code style={{ color: "#059669" }}>bg-[radial-gradient(circle,#f093fb,#f5576c)]</code>. Conic: <code style={{ color: "#059669" }}>bg-[conic-gradient(from_0deg,red,blue,red)]</code>. In Tailwind v4, you can define gradient custom properties in your CSS and reference them in utility classes. This tool generates the correct syntax for both approaches.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Build your gradient below and copy the Tailwind classes.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="Tailwind CSS Gradient Generator" subtitle="Generate Tailwind gradient utility classes." defaultCodeTab="tailwind" articleMode={true} />
    </>
  );
}
