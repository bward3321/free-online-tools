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
    { name: "Can I create a spotlight effect?", text: "Yes. Use a circle shape with a light color at the center fading to a dark color at the edge. Move the center position off-center for a directional spotlight. Combine with a dark background for maximum impact." },
    { name: "Is this radial gradient generator free?", text: "Completely free. No signup, no limits. All processing happens in your browser. Create unlimited gradients and copy code with one click." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Radial Gradient Generator", url: "https://everyfreetool.com/design-tools/radial-gradient-generator", description: "Create CSS radial gradients with custom shapes and positions. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free CSS Radial Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Design radial gradients with circle or ellipse shapes, click-to-set positioning, and multiple color stops. Copy CSS, Tailwind, or SCSS code instantly.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">How CSS Radial Gradients Work</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>The CSS <code style={{ color: "#059669" }}>radial-gradient()</code> function creates a gradient that radiates outward from a center point. The simplest form &mdash; <code style={{ color: "#059669" }}>radial-gradient(#f093fb, #f5576c)</code> &mdash; creates an elliptical gradient centered in the element. Colors transition from the center outward, with the first color at the center and the last color at the edges.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Shape and Size Options</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Radial gradients support two shapes: <code style={{ color: "#059669" }}>circle</code> maintains equal radii regardless of container aspect ratio, while <code style={{ color: "#059669" }}>ellipse</code> (the default) stretches to fill the container. Four size keywords control the gradient&apos;s extent: <code style={{ color: "#059669" }}>closest-side</code>, <code style={{ color: "#059669" }}>farthest-side</code>, <code style={{ color: "#059669" }}>closest-corner</code>, and <code style={{ color: "#059669" }}>farthest-corner</code>.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Positioning the Center Point</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Control where the gradient originates with the <code style={{ color: "#059669" }}>at</code> keyword: <code style={{ color: "#059669" }}>radial-gradient(circle at 25% 75%, ...)</code>. In this tool, simply click on the preview to set the center point, or use the X/Y input fields for precise positioning.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Create your radial gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="CSS Radial Gradient Generator" subtitle="Design radial gradients with circle or ellipse shapes." defaultType="radial" articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">What Is the Radial Gradient Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>This free tool creates CSS radial gradients visually. Choose between circle and ellipse shapes, set the center point by clicking on the preview, adjust color stops with the interactive bar, and copy production-ready code in CSS, Tailwind, SCSS, or CSS Variables format. The live preview updates instantly so you can see exactly how your gradient will look before copying the code.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Select the Radial tab.</strong> The tool opens with the radial gradient type pre-selected. You can switch between circle and ellipse shapes at any time.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Position the center.</strong> Click anywhere on the gradient preview to move the center point. Alternatively, type precise X% and Y% values in the position fields.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Edit colors.</strong> Click on color stops to change their colors. Drag stops to reposition them. Click on empty space on the bar to add new stops.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 4: Copy your code.</strong> Choose your format (CSS, Tailwind, SCSS, or CSS Variables), click Copy Code, and paste it into your project.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Circle and ellipse shapes.</strong> Toggle between perfectly round circles and container-matching ellipses with a single click. The preview updates instantly to show the difference.</p>
              <p><strong style={{ color: "var(--text)" }}>Click-to-position.</strong> Click anywhere on the live preview to set the gradient&apos;s center point. This is far more intuitive than typing coordinates manually. Fine-tune with the X/Y percentage inputs if you need exact values.</p>
              <p><strong style={{ color: "var(--text)" }}>Multiple preview modes.</strong> See your radial gradient as a background fill, applied to text, on a frosted-glass card, or as a button. This helps you visualize how the gradient will look in a real UI context.</p>
              <p><strong style={{ color: "var(--text)" }}>120+ preset library.</strong> Browse curated gradients and click to load them as a starting point. Every preset can be further customized with the editor controls.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Circle vs Ellipse &mdash; When to Use Each</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>The <code style={{ color: "#059669" }}>circle</code> shape produces a perfectly round gradient with equal horizontal and vertical radii. It looks the same regardless of whether the container is square, wide, or tall. This makes circles ideal for spotlight effects, decorative orbs, and button highlights where you want consistent roundness.</p>
              <p>The <code style={{ color: "#059669" }}>ellipse</code> shape (the default) stretches to match the container&apos;s aspect ratio. In a wide container, the ellipse is wider than it is tall. This creates a more natural-looking gradient that fills the space evenly. Ellipses are the better choice for full-section backgrounds, banner images, and any element where you want the gradient to feel like it belongs in the space.</p>
              <p>A practical rule of thumb: use circles for decorative accents and small elements, use ellipses for background fills. When combining with off-center positioning, circles create dramatic directional lighting effects, while ellipses produce softer ambient glows.</p>
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
