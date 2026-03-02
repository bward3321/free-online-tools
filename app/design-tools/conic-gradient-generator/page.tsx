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
    { name: "Can I create loading spinners with conic gradients?", text: "Yes. Use a conic gradient from a solid color to transparent, then animate its rotation with CSS @keyframes and transform: rotate(). No JavaScript needed." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Conic Gradient Generator", url: "https://everyfreetool.com/design-tools/conic-gradient-generator", description: "Create CSS conic gradients for color wheels and pie charts. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free CSS Conic Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Create conic gradients for color wheels, pie charts, spinners, and unique backgrounds. Adjust the starting angle, position, and color stops visually.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">How CSS Conic Gradients Work</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>The CSS <code style={{ color: "#059669" }}>conic-gradient()</code> function creates a gradient that sweeps around a center point. Think of it like a color wheel: colors transition as you move clockwise. The syntax &mdash; <code style={{ color: "#059669" }}>conic-gradient(from 0deg at 50% 50%, red, yellow, green, blue, red)</code> &mdash; specifies a starting angle, center position, and color stops distributed around the full 360 degrees.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Pie Charts with Pure CSS</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Create CSS-only pie charts using hard color stops. Place two stops at the same degree position to create a sharp boundary between segments: <code style={{ color: "#059669" }}>conic-gradient(#ff0000 0% 33%, #00ff00 33% 66%, #0000ff 66% 100%)</code>. This creates three equal slices. Combine with <code style={{ color: "#059669" }}>border-radius: 50%</code> for a round pie chart.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">The Starting Angle</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>The <code style={{ color: "#059669" }}>from</code> keyword rotates the gradient&apos;s starting point. By default, the gradient begins at 12 o&apos;clock (0deg). Setting <code style={{ color: "#059669" }}>from 90deg</code> rotates it to start at 3 o&apos;clock. Combine the starting angle with the <code style={{ color: "#059669" }}>at</code> keyword to control both rotation and center position.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Create your conic gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="CSS Conic Gradient Generator" subtitle="Create conic gradients for color wheels and pie charts." defaultType="conic" articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">What Is the Conic Gradient Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>This free tool creates CSS conic gradients visually. Set the starting angle, click on the preview to position the center point, and add color stops that distribute around 360 degrees. The live preview shows your gradient in real-time, and you can copy the generated code in CSS, Tailwind, SCSS, or CSS custom property format. Conic gradients are the foundation for color wheels, pie charts, loading spinners, and geometric patterns.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Select the Conic tab.</strong> The tool opens with the conic gradient type pre-selected. You&apos;ll see a color wheel gradient by default.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Set the starting angle.</strong> Adjust the &ldquo;from&rdquo; angle to rotate the gradient&apos;s starting point. Use the slider or type a precise degree value.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Position the center.</strong> Click on the preview to set the gradient&apos;s center, or use the X/Y percentage fields for exact placement.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 4: Customize color stops.</strong> Edit, add, or remove stops on the bar. For pie chart effects, position two stops at the same degree to create hard edges between segments.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 5: Copy the code.</strong> Select your output format and click Copy Code.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>360-degree color distribution.</strong> Color stops are positioned in degrees rather than percentages, wrapping around the full circle. The default rainbow preset demonstrates the full spectrum sweep.</p>
              <p><strong style={{ color: "var(--text)" }}>Starting angle control.</strong> Rotate the entire gradient without changing individual color positions. This is especially useful for pie charts where you want the first segment to start at a specific clock position.</p>
              <p><strong style={{ color: "var(--text)" }}>Click-to-set center position.</strong> Click anywhere on the live preview to move the gradient&apos;s origin point. Off-center positioning creates dramatic asymmetric effects.</p>
              <p><strong style={{ color: "var(--text)" }}>Repeating mode.</strong> Enable repeating-conic-gradient() to create starburst and checkerboard patterns. With just two color stops, you can generate complex geometric designs.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Creative Uses for Conic Gradients</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Color wheel pickers.</strong> Distribute hue values evenly around 360 degrees to create a full-spectrum color wheel. Add a radial gradient overlay (white center fading to transparent) for a saturation-aware picker. This is the foundation of many pure-CSS color picker UIs.</p>
              <p><strong style={{ color: "var(--text)" }}>Progress indicators and gauges.</strong> Create donut charts and progress rings by combining a conic gradient with a circular cutout (using a pseudo-element or mask). Animate the percentage stop to show loading progress without any JavaScript.</p>
              <p><strong style={{ color: "var(--text)" }}>Decorative patterns.</strong> Use <code style={{ color: "#059669" }}>repeating-conic-gradient()</code> to generate checkerboards, starbursts, and ray patterns. Combining multiple repeating conic gradients with different starting angles produces complex kaleidoscope effects that would be difficult to achieve with any other CSS technique.</p>
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
                ["Image Compressor", "/image-tools/image-compressor", "Compress images to exact file sizes"],
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
