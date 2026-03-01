import type { Metadata } from "next";
import CssGradientGenerator from "./components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "Free CSS Gradient Generator — Linear, Radial, Conic & Mesh | EveryFreeTool",
  description: "Create beautiful CSS gradients with our free online generator. Supports linear, radial, conic, and mesh gradients. Copy CSS, Tailwind, or SCSS code instantly. 120+ preset gradients included.",
  openGraph: { title: "Free CSS Gradient Generator", description: "Create linear, radial, conic & mesh CSS gradients with live preview, 120+ presets, and one-click code copy. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function CssGradientGeneratorPage() {
  const faqs = [
    { name: "Is this CSS gradient generator free?", text: "Completely free, no signup, no limits. Everything runs in your browser — no data is sent to any server. Create as many gradients as you want." },
    { name: "Does this tool support Tailwind CSS?", text: "Yes. Switch to the Tailwind tab to get Tailwind utility classes for your gradient. Simple 2-3 stop linear gradients use native Tailwind utilities (bg-gradient-to-r, from-color, via-color, to-color). Complex gradients use arbitrary value syntax." },
    { name: "Can I create animated gradients?", text: "Yes. Toggle 'Animate gradient' to add CSS animations. Choose from shift, hue-rotate, or pulse effects with adjustable speed. The generated code includes the @keyframes rule." },
    { name: "How many color stops can I add?", text: "There is no hard limit. Add as many color stops as you need by clicking on the color stop bar or using the + button. Most gradients look best with 2-5 stops." },
    { name: "What browsers support CSS gradients?", text: "CSS gradients are supported in all modern browsers including Chrome, Firefox, Safari, and Edge. Linear and radial gradients have 98%+ global support. Conic gradients work in all current browsers." },
    { name: "What is a mesh gradient?", text: "A mesh gradient blends multiple colors from different positions, creating smooth organic transitions. Since native CSS mesh gradients aren't supported yet, this tool generates the effect using layered radial gradients." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "CSS Gradient Generator",
        url: "https://everyfreetool.com/design-tools/css-gradient-generator",
        description: "Create linear, radial, conic, and mesh CSS gradients with live preview and instant code output.",
        applicationCategory: "DesignApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        browserRequirements: "Requires JavaScript. Works in all modern browsers.",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <CssGradientGenerator
        title="Free CSS Gradient Generator"
        subtitle="Create linear, radial, conic, and mesh CSS gradients with live preview. Browse 120+ presets, customize colors, copy CSS/Tailwind/SCSS code instantly."
      />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What Is the CSS Gradient Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p>This is a free visual tool for creating CSS gradients without writing code by hand. It supports all four CSS gradient types &mdash; linear, radial, conic, and mesh &mdash; and generates production-ready code you can copy with one click. Pick colors from 120+ curated presets or build your own from scratch. The live preview updates instantly as you adjust angles, colors, and positions. Output formats include vanilla CSS, Tailwind utility classes, SCSS with variables, and CSS custom properties.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How to Use This Gradient Generator</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Choose a gradient type.</strong> Select Linear, Radial, Conic, or Mesh from the tab buttons at the top. Each type has its own controls.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Set your colors.</strong> Click on the color stop bar to add stops, click a stop to edit its color, and drag stops to reposition them. Use the color picker or type a hex code directly.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Adjust direction and position.</strong> For linear gradients, set the angle using the slider or direction presets. For radial and conic, click on the preview to set the center point.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 4: Copy the code.</strong> Switch between CSS, Tailwind, SCSS, and CSS Variables tabs, then click Copy Code. The code is ready to paste into your project.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 5: Explore extras.</strong> Try the animation toggle, text gradient mode, preset gallery, randomize button, or share your gradient via URL.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Four gradient types in one tool.</strong> Linear gradients follow a straight line at any angle. Radial gradients radiate outward from a center point as circles or ellipses. Conic gradients sweep around a center point like a color wheel. Mesh gradients blend four color points with organic, natural-looking transitions.</p>
              <p><strong style={{ color: "var(--text)" }}>120+ curated preset gradients.</strong> Browse a gallery of handpicked gradients organized into 10 categories: Warm, Cool, Nature, Sunset, Pastel, Dark, Neon, Monochrome, Rainbow, and Popular. Search by name or color, click any preset to load it, then customize it further.</p>
              <p><strong style={{ color: "var(--text)" }}>Multiple code output formats.</strong> Get your gradient as plain CSS, Tailwind utility classes, SCSS with named variables, or CSS custom properties for theming. Each format is copy-ready and optimized for its ecosystem.</p>
              <p><strong style={{ color: "var(--text)" }}>Animation system.</strong> Add flowing CSS animations to any gradient. Choose shift, hue-rotate, or pulse effects with adjustable speed. The generated code includes complete @keyframes rules and animation properties &mdash; no JavaScript required.</p>
              <p><strong style={{ color: "var(--text)" }}>Text gradient mode.</strong> Apply your gradient to text using the CSS background-clip technique. Adjust font size, weight, and preview your text gradient in real-time. The code output automatically includes the required text gradient properties.</p>
              <p><strong style={{ color: "var(--text)" }}>Share and randomize.</strong> Every gradient state is encoded into the URL, so you can share your creation by copying the link. The randomize button generates harmonious color combinations using HSL color theory for consistently beautiful results.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">CSS Gradient Syntax Reference</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Linear gradients</strong> use <code style={{ color: "#059669" }}>linear-gradient(angle, color1 position, color2 position)</code>. The angle defaults to 180deg (top to bottom). Use degree values (0-360) or direction keywords like <code style={{ color: "#059669" }}>to right</code> or <code style={{ color: "#059669" }}>to bottom left</code>. Add <code style={{ color: "#059669" }}>repeating-</code> prefix for striped patterns.</p>
              <p><strong style={{ color: "var(--text)" }}>Radial gradients</strong> use <code style={{ color: "#059669" }}>radial-gradient(shape size at position, color1, color2)</code>. The shape can be <code style={{ color: "#059669" }}>circle</code> or <code style={{ color: "#059669" }}>ellipse</code>. Size keywords include <code style={{ color: "#059669" }}>closest-side</code>, <code style={{ color: "#059669" }}>farthest-corner</code>, and more. Position defaults to center.</p>
              <p><strong style={{ color: "var(--text)" }}>Conic gradients</strong> use <code style={{ color: "#059669" }}>conic-gradient(from angle at position, color1 degree, color2 degree)</code>. Colors are distributed around 360 degrees from the starting angle. Perfect for color wheels and pie charts.</p>
              <p><strong style={{ color: "var(--text)" }}>Mesh gradients</strong> aren&apos;t natively supported in CSS yet. This tool simulates them by layering multiple radial gradients with different positions and blend modes, producing a similar organic multi-point color blend effect.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map(f => (
                <details key={f.name} className="rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <summary className="p-4 cursor-pointer font-semibold" style={{ fontSize: "16px" }}>{f.name}</summary>
                  <p className="px-4 pb-4" style={{ fontSize: "16px", color: "var(--text-muted)" }}>{f.text}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                ["Color Picker & Converter", "/design-tools/color-picker", "Pick colors and convert between HEX, RGB, HSL"],
                ["JSON Formatter", "/developer-tools/json-formatter", "Format and validate JSON"],
                ["Image Compressor", "/image-tools/image-compressor", "Compress images to exact file sizes"],
                ["QR Code Generator", "/utility-tools/qr-code-generator", "Create custom QR codes"],
              ].map(([name, href, desc]) => (
                <a key={name} href={href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-semibold mb-1" style={{ fontSize: "16px" }}>{name}</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>{desc}</p>
                </a>
              ))}
            </div>
          </section>

          <footer className="text-center pt-6 pb-8 border-t" style={{ borderColor: "var(--border)", color: "var(--text-muted)", fontSize: "14px" }}>
            <p>&copy; {new Date().getFullYear()} <a href="/" style={{ color: "#059669" }} className="hover:underline">EveryFreeTool.com</a> &mdash; Free tools, no signup, no nonsense.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
