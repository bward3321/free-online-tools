import type { Metadata } from "next";
import CssGradientGenerator from "../css-gradient-generator/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "120+ Beautiful CSS Gradient Palettes — Copy & Use Free | EveryFreeTool",
  description: "Browse 120+ curated gradient color palettes. Click to preview, customize colors, and copy CSS code instantly. Free gradient inspiration for designers and developers.",
  openGraph: { title: "120+ Beautiful CSS Gradient Palettes", description: "Browse 120+ curated gradient palettes. Click to customize and copy CSS. Free gradient inspiration.", type: "website" },
  robots: "index, follow",
};

export default function GradientColorPalettePage() {
  const faqs = [
    { name: "How many gradient presets are included?", text: "Over 120 curated gradients across 10 categories: Warm, Cool, Nature, Sunset, Pastel, Dark, Neon, Monochrome, Rainbow, and Popular. Each gradient is handpicked for visual quality." },
    { name: "Can I customize the preset gradients?", text: "Yes. Click any gradient in the gallery to load it into the editor. From there, you can modify colors, add or remove stops, change the angle, switch gradient types, and more. The preset is just a starting point." },
    { name: "How do I copy the CSS for a gradient?", text: "Click a gradient preset to load it, then use the copy button on the code panel. You can copy as CSS, Tailwind, SCSS, or CSS Variables. One click copies the code to your clipboard." },
    { name: "How should I choose gradient colors?", text: "Use analogous colors (neighbors on the color wheel) for smooth, natural transitions. Complementary colors create bold contrast. Stick to 2-3 stops for most designs. Avoid mixing warm and cool colors unless you add a neutral transition color between them." },
    { name: "Can I search for specific gradient colors?", text: "Yes. Use the search bar to filter by name or color (e.g., 'purple', 'ocean', 'sunset'). Category filter pills let you browse by mood: Warm, Cool, Nature, Pastel, Dark, Neon, and more." },
    { name: "Are these gradients free to use commercially?", text: "Yes. All gradient presets are free to use in any project — personal, commercial, or open-source. No attribution required. Copy the CSS and use it however you like." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Gradient Color Palette", url: "https://everyfreetool.com/design-tools/gradient-color-palette", description: "Browse 120+ curated CSS gradient palettes. Click to customize and copy CSS.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Gradient Color Palette &mdash; 120+ Beautiful CSS Gradients</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Browse a curated collection of 120+ gradient color palettes. Click any gradient to preview it, customize colors, and copy CSS code instantly. Perfect for finding design inspiration.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Finding the Right Gradient</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Choosing the right gradient can make or break a design. Use the category filter pills to browse by mood &mdash; Warm gradients work for energetic landing pages and CTAs, Cool tones suit corporate and tech interfaces, Pastel shades are perfect for gentle, approachable designs, and Dark gradients create dramatic hero sections. Search by color name to find gradients that match your brand palette.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Color Theory for Gradients</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The best gradients follow color theory principles. Analogous colors (adjacent on the color wheel, like blue to purple) create smooth, harmonious transitions. Complementary colors (opposite, like orange to blue) create high contrast. Keep saturation and lightness consistent across stops for a professional look. When in doubt, start with a preset and adjust from there.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Gradients in Modern Web Design</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Gradients work as hero section backgrounds, button fills, text effects, card overlays, and section dividers. For hero sections, use subtle 2-color gradients at wide angles. For buttons, keep gradients subtle to maintain readability. Always check contrast when placing text over gradient backgrounds.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Browse the gradient gallery below and click any gradient to customize it.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="Gradient Color Palette" subtitle="Browse 120+ curated gradient palettes." defaultGallery={true} articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What Is the Gradient Color Palette?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p>This is a free curated collection of over 120 CSS gradient color palettes organized into 10 categories. Each gradient has been handpicked for visual quality and harmony. Click any gradient in the gallery to load it into the full editor, where you can customize colors, adjust angles, change gradient types, and copy production-ready code. Think of it as a design inspiration library with a built-in gradient builder.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Browse the gallery.</strong> Open the preset gallery and scroll through the gradient cards. Use the category pills to filter by mood (Warm, Cool, Pastel, Dark, etc.) or type in the search bar to find gradients by name or color.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Click a gradient to load it.</strong> The gradient instantly appears in the live preview and the code output updates with the CSS. The gradient&apos;s color stops, angle, and type are all loaded into the editor.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Customize (optional).</strong> Adjust the angle, add or remove color stops, change colors, or switch gradient types. The preset is a starting point &mdash; make it your own.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 4: Copy the code.</strong> Select CSS, Tailwind, SCSS, or CSS Variables format and click Copy Code.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>120+ handpicked gradients.</strong> Every preset in the gallery has been curated for visual quality. The collection covers warm sunsets, cool ocean tones, natural greens, neon vibrance, moody darks, soft pastels, and full-spectrum rainbows.</p>
              <p><strong style={{ color: "var(--text)" }}>10 category filters.</strong> Browse by mood: Warm, Cool, Nature, Sunset, Pastel, Dark, Neon, Monochrome, Rainbow, and Popular. Each category groups gradients with a consistent feel so you can find the right tone for your project quickly.</p>
              <p><strong style={{ color: "var(--text)" }}>Search by name or color.</strong> Type &ldquo;purple&rdquo;, &ldquo;ocean&rdquo;, or &ldquo;sunset&rdquo; to instantly filter the gallery. The search matches both gradient names and their visual characteristics.</p>
              <p><strong style={{ color: "var(--text)" }}>Full editor integration.</strong> Every preset loads into the complete gradient editor. Change colors, adjust angles, add animation, switch to text mode &mdash; every feature of the gradient generator works with loaded presets.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How to Choose Gradient Colors That Work Together</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Analogous harmony.</strong> Colors adjacent on the color wheel (like blue to teal, or red to orange) transition smoothly because they share underlying hues. These gradients feel natural and are safe choices for professional designs. Most of the presets in the Cool, Nature, and Warm categories use analogous color schemes.</p>
              <p><strong style={{ color: "var(--text)" }}>Complementary contrast.</strong> Colors opposite on the wheel (like purple to yellow, or blue to orange) create vibrant, high-energy gradients. Use these sparingly for call-to-action buttons, hero sections, and accent elements where you want the gradient to demand attention.</p>
              <p><strong style={{ color: "var(--text)" }}>Consistent saturation and lightness.</strong> Gradients look most polished when color stops share similar saturation (vibrancy) and lightness levels. A gradient from a bright, saturated blue to a muted, dark green will look muddy in the transition zone. Match the intensity of your colors for cleaner results.</p>
              <p><strong style={{ color: "var(--text)" }}>The two-to-three stop rule.</strong> Most effective gradients use just 2-3 color stops. Adding more than 4 stops often creates a cluttered look unless the colors are very carefully chosen. When in doubt, keep it simple.</p>
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
