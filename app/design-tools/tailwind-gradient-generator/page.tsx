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
    { name: "How do I create a radial gradient in Tailwind?", text: "Tailwind doesn't have built-in radial gradient utilities. Use the arbitrary value syntax: bg-[radial-gradient(circle,#f093fb,#f5576c)]. This tool generates the correct syntax automatically." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Tailwind Gradient Generator", url: "https://everyfreetool.com/design-tools/tailwind-gradient-generator", description: "Generate Tailwind CSS gradient classes with a visual builder. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Tailwind CSS Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Build gradients visually and get Tailwind CSS utility classes instantly. Supports bg-gradient-to directions, from/via/to color utilities, and arbitrary values for complex gradients.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Tailwind Gradient Utilities Explained</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Tailwind&apos;s gradient system uses three main utilities: <code style={{ color: "#059669" }}>from-{"{color}"}</code> sets the start color, <code style={{ color: "#059669" }}>via-{"{color}"}</code> adds an optional middle color, and <code style={{ color: "#059669" }}>to-{"{color}"}</code> sets the end color. Combine with a direction class like <code style={{ color: "#059669" }}>bg-gradient-to-r</code> (left to right).</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Direction Class Reference</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Direction classes map to CSS angles: <code style={{ color: "#059669" }}>bg-gradient-to-t</code> = 0&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-tr</code> = 45&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-r</code> = 90&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-br</code> = 135&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-b</code> = 180&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-bl</code> = 225&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-l</code> = 270&deg;, <code style={{ color: "#059669" }}>bg-gradient-to-tl</code> = 315&deg;.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Beyond Simple Gradients</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>For radial, conic, or multi-stop gradients, use Tailwind&apos;s arbitrary value syntax: <code style={{ color: "#059669" }}>bg-[radial-gradient(circle,#f093fb,#f5576c)]</code>. In Tailwind v4, you can define gradient custom properties in your CSS and reference them in utility classes.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Build your gradient below and copy the Tailwind classes.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="Tailwind CSS Gradient Generator" subtitle="Generate Tailwind gradient utility classes." defaultCodeTab="tailwind" articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">What Is the Tailwind Gradient Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>This free tool lets you build CSS gradients visually and get Tailwind CSS utility classes with one click. For simple linear gradients, it outputs native Tailwind utilities like <code style={{ color: "#059669" }}>bg-gradient-to-br from-[#667eea] to-[#764ba2]</code>. For complex gradients (radial, conic, 4+ stops), it generates the arbitrary value syntax. The Tailwind output tab is pre-selected so you can start copying classes immediately.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Build your gradient.</strong> Choose colors and set the angle using the visual controls. The Tailwind output tab is pre-selected.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Check the output.</strong> For 2-3 stop linear gradients, you&apos;ll see native Tailwind classes. For anything more complex, the tool shows the appropriate arbitrary value syntax.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Copy and paste.</strong> Click Copy Code and paste the classes directly into your JSX, HTML, or template file.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 4: Browse presets (optional).</strong> Open the preset gallery to find gradient inspiration. Every preset generates valid Tailwind output.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Smart output format.</strong> The tool detects whether your gradient can use native Tailwind utilities or needs arbitrary value syntax. Simple 2-3 stop linear gradients output clean utility classes. Complex gradients output the <code style={{ color: "#059669" }}>bg-[...]</code> syntax that works in Tailwind v3 and v4.</p>
              <p><strong style={{ color: "var(--text)" }}>Angle-to-direction mapping.</strong> Gradient angles are automatically mapped to the closest Tailwind direction class: 45&deg; becomes <code style={{ color: "#059669" }}>bg-gradient-to-tr</code>, 90&deg; becomes <code style={{ color: "#059669" }}>bg-gradient-to-r</code>, and so on.</p>
              <p><strong style={{ color: "var(--text)" }}>CSS Variables output for v4.</strong> Switch to the CSS Variables tab for custom properties that integrate with Tailwind v4&apos;s CSS-first configuration. Define gradient tokens in your theme and reference them across your project.</p>
              <p><strong style={{ color: "var(--text)" }}>Multiple format fallback.</strong> If you need vanilla CSS, SCSS, or CSS custom properties alongside the Tailwind output, just switch tabs. All four formats are generated simultaneously.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Tailwind Gradient Utilities Cheat Sheet</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Direction classes.</strong> Eight built-in directions: <code style={{ color: "#059669" }}>bg-gradient-to-t</code> (0&deg;, upward), <code style={{ color: "#059669" }}>bg-gradient-to-tr</code> (45&deg;), <code style={{ color: "#059669" }}>bg-gradient-to-r</code> (90&deg;, rightward), <code style={{ color: "#059669" }}>bg-gradient-to-br</code> (135&deg;), <code style={{ color: "#059669" }}>bg-gradient-to-b</code> (180&deg;, downward), <code style={{ color: "#059669" }}>bg-gradient-to-bl</code> (225&deg;), <code style={{ color: "#059669" }}>bg-gradient-to-l</code> (270&deg;, leftward), <code style={{ color: "#059669" }}>bg-gradient-to-tl</code> (315&deg;).</p>
              <p><strong style={{ color: "var(--text)" }}>Color stop utilities.</strong> <code style={{ color: "#059669" }}>from-blue-500</code> sets the start color with a transparent end point. <code style={{ color: "#059669" }}>to-purple-500</code> sets the end color. <code style={{ color: "#059669" }}>via-pink-500</code> inserts a midpoint color. Use arbitrary values for custom colors: <code style={{ color: "#059669" }}>from-[#667eea]</code>.</p>
              <p><strong style={{ color: "var(--text)" }}>Arbitrary gradient syntax.</strong> For anything beyond simple linear gradients, use <code style={{ color: "#059669" }}>bg-[linear-gradient(135deg,#667eea,#764ba2)]</code>. This works for radial: <code style={{ color: "#059669" }}>bg-[radial-gradient(circle,#f093fb,#f5576c)]</code> and conic: <code style={{ color: "#059669" }}>bg-[conic-gradient(from_0deg,red,blue,red)]</code>. Replace spaces with underscores in arbitrary values.</p>
              <p><strong style={{ color: "var(--text)" }}>Tailwind v4 approach.</strong> In v4, define CSS custom properties in your <code style={{ color: "#059669" }}>@theme</code> block and reference them in utilities. This keeps your gradient definitions centralized and reusable across your design system.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map(f => (
                <details key={f.name} className="rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <summary className="p-4 cursor-pointer font-semibold" style={{ fontSize: "17px" }}>{f.name}</summary>
                  <p className="px-4 pb-4" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>{f.text}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                ["CSS Gradient Generator", "/design-tools/css-gradient-generator", "All gradient types in one tool"],
                ["Color Picker & Converter", "/design-tools/color-picker", "Pick colors and convert between HEX, RGB, HSL"],
                ["JSON Formatter", "/developer-tools/json-formatter", "Format and validate JSON"],
                ["QR Code Generator", "/utility-tools/qr-code-generator", "Create custom QR codes"],
              ].map(([name, href, desc]) => (
                <a key={name} href={href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-semibold mb-1" style={{ fontSize: "17px" }}>{name}</h3>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{desc}</p>
                </a>
              ))}
            </div>
          </section>

          <footer className="text-center pt-6 pb-8 border-t" style={{ borderColor: "var(--border)", color: "var(--text-muted)", fontSize: "15px" }}>
            <p>&copy; {new Date().getFullYear()} <a href="/" style={{ color: "#059669" }} className="hover:underline">EveryFreeTool.com</a> &mdash; Free tools, no signup, no nonsense.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
