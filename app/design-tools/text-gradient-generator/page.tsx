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
    { name: "Can I use custom fonts with text gradients?", text: "Yes. The text preview mode lets you change the font family, size, weight, and the text itself. The gradient effect works with any font." },
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
              <h2 className="text-xl font-bold mb-3">The CSS Text Gradient Technique</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The text gradient technique works by applying a gradient as the element&apos;s background, then clipping the background to only be visible through the text. The key properties are <code style={{ color: "#059669" }}>background: linear-gradient(...)</code>, <code style={{ color: "#059669" }}>-webkit-background-clip: text</code>, <code style={{ color: "#059669" }}>background-clip: text</code>, and <code style={{ color: "#059669" }}>color: transparent</code>.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Best Practices for Gradient Text</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Use gradient text for headings and hero text, not body copy &mdash; it&apos;s an accent effect that loses impact when overused. Bold weights (600-900) show the gradient better than regular or light weights. Larger font sizes (32px+) give the gradient room to transition smoothly.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Real-World Examples</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Major websites use gradient text for impact: Apple uses it for product headlines, Stripe uses it for feature announcements, and countless landing pages use it for hero sections. Always set a solid <code style={{ color: "#059669" }}>color</code> property as a fallback before the gradient code.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Create your text gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="CSS Text Gradient Generator" subtitle="Create gradient text effects with live preview." defaultPreviewMode="text" articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What Is the Text Gradient Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p>This free tool creates CSS gradient text effects with a live visual preview. Type your own text, choose colors, adjust the font size and weight, and see the gradient applied in real-time. The generated CSS includes all necessary properties &mdash; <code style={{ color: "#059669" }}>background-clip: text</code>, the <code style={{ color: "#059669" }}>-webkit-</code> prefix, and <code style={{ color: "#059669" }}>color: transparent</code> &mdash; ready to paste into your stylesheet. The text preview mode is pre-selected so you start in the right context immediately.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Edit the text.</strong> The preview shows &ldquo;Gradient Text&rdquo; by default. Type your own heading or tagline in the text field to see how the gradient looks on your actual content.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Choose your gradient colors.</strong> Edit the color stops to create your gradient. Try the preset gallery for quick inspiration &mdash; every preset works with text mode.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Adjust font settings.</strong> Use the font size slider and weight selector to match your design. Larger, bolder text shows the gradient effect more dramatically.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 4: Copy the code.</strong> The CSS output automatically includes the background-clip and color properties needed for text gradients. Click Copy Code to get the complete snippet.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Live text preview.</strong> See the gradient applied to your actual text in real-time. No guessing &mdash; what you see is what you get. The preview updates instantly as you change colors, angles, or font settings.</p>
              <p><strong style={{ color: "var(--text)" }}>Font customization.</strong> Adjust font size from 24px to 120px and choose from multiple font weights (regular to black). Bold, large text makes the gradient effect shine.</p>
              <p><strong style={{ color: "var(--text)" }}>Complete CSS output.</strong> The code includes all three required properties: the gradient background, <code style={{ color: "#059669" }}>-webkit-background-clip: text</code> for WebKit browsers, <code style={{ color: "#059669" }}>background-clip: text</code>, and <code style={{ color: "#059669" }}>color: transparent</code>.</p>
              <p><strong style={{ color: "var(--text)" }}>Animation support.</strong> Enable the animation toggle to create flowing or color-shifting text gradients. The animated effect works beautifully on hero headings and is pure CSS with no JavaScript.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">CSS Text Gradient Technique Explained</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p>The text gradient effect uses three CSS properties working together. First, <code style={{ color: "#059669" }}>background: linear-gradient(...)</code> applies a gradient to the element&apos;s entire background area. Then, <code style={{ color: "#059669" }}>background-clip: text</code> clips the background so it&apos;s only visible through the text glyphs. Finally, <code style={{ color: "#059669" }}>color: transparent</code> makes the text itself invisible, revealing the clipped gradient behind it.</p>
              <p>Browser support is excellent. All modern browsers support the unprefixed <code style={{ color: "#059669" }}>background-clip: text</code>. Safari still benefits from the <code style={{ color: "#059669" }}>-webkit-</code> prefix. The <code style={{ color: "#059669" }}>-webkit-text-fill-color: transparent</code> property provides an additional WebKit fallback and is included in the generated code for maximum compatibility.</p>
              <p>For accessibility, always ensure the gradient colors provide sufficient contrast against the page background. A gradient from light purple to light pink on a white background will be unreadable. Test with both light and dark modes. Include a solid <code style={{ color: "#059669" }}>color</code> value as a fallback before the gradient declarations for browsers or contexts where the technique doesn&apos;t apply (like RSS readers or text-only browsers).</p>
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
                ["CSS Gradient Generator", "/design-tools/css-gradient-generator", "All gradient types in one tool"],
                ["Color Picker & Converter", "/design-tools/color-picker", "Pick colors and convert between HEX, RGB, HSL"],
                ["Markdown Editor", "/writing-tools/markdown-editor", "Write and preview Markdown in real-time"],
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
