import type { Metadata } from "next";
import PixelArtEditor from "../pixel-art-editor/components/PixelArtEditor";

export const metadata: Metadata = {
  title: "Free Pixel Art Maker — Create Retro Pixel Art Online | EveryFreeTool",
  description: "Make pixel art online for free. Simple, clean editor with pencil, fill, mirror mode, color palettes, and starter templates. Export as PNG, SVG, or GIF.",
  openGraph: {
    title: "Free Pixel Art Maker — Create Retro Pixel Art Online",
    description: "Make pixel art online for free. Simple, clean editor with pencil, fill, mirror mode, color palettes, and starter templates.",
    type: "website",
  },
};

function SEOContent() {
  const faqs = [
    { q: "What makes this different from Piskel or Pixilart?", a: "This editor is focused on simplicity and speed. While Piskel and Pixilart are great for sprite animation and game art, they can be overwhelming if you just want to draw a quick icon or pixel art piece. Our editor gives you the essential tools — pencil, fill, shapes, mirror mode, curated palettes — without the complexity of animation timelines, layers, or sprite sheets." },
    { q: "Can I make game sprites with this?", a: "Yes! While this editor doesn't have animation features, it's excellent for designing individual sprites and tiles. Draw your character or tile at 16x16, 32x32, or 64x64, export as PNG, and import into your game engine. The clean interface and pixel-perfect tools make it great for rapid sprite prototyping." },
    { q: "How do I share my pixel art?", a: "Export your artwork as PNG at 4x or 8x scale for crisp sharing on social media, forums, or messaging apps. The scaling uses nearest-neighbor interpolation to keep pixels sharp — no blurry anti-aliasing. You can also export as SVG for perfectly scalable pixel art." },
    { q: "What color palettes are included?", a: "We include 7 curated palettes: Pico-8 (the beloved 16-color palette from the Pico-8 fantasy console), Pixel Classic (retro NES-inspired 16 colors), Endesga 32 (a popular 32-color palette by Endesga), Material Design, Pastel, Monochrome, and Brand Colors. You can also create custom colors with the built-in color picker." },
    { q: "Does mirror mode work with all tools?", a: "Yes! Mirror mode works with every drawing tool — pencil, eraser, line, rectangle, circle, and even fill. Choose horizontal mirror (left-right), vertical mirror (top-bottom), or quad mirror (all four quadrants). It's incredibly useful for creating symmetrical characters, icons, and patterns." },
    { q: "Can I use pixel art I create here commercially?", a: "Absolutely. Everything you create in this editor is yours to use however you like — personal projects, commercial products, games, websites, merchandise. The starter icons from our library are also free to use and modify for any purpose." },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 pb-12">
      <div className="rounded-2xl border p-6 md:p-8 mb-12" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>Make Beautiful Pixel Art</h2>
        <div className="space-y-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <p>Pixel art isn&apos;t just nostalgia — it&apos;s a vibrant, active art form with a massive community of creators. From indie game developers to digital artists to icon designers, pixel art&apos;s deliberate, grid-based approach produces artwork with a unique charm that no other medium can match.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Why Pixel Art?</h3>
          <p>The constraint of working pixel by pixel forces you to make every element count. There&apos;s no hiding behind gradients or blur effects. Each pixel is a conscious decision about form and color. This discipline produces artwork that is clean, readable, and often more expressive than higher-resolution alternatives.</p>
          <p>Pixel art is also incredibly accessible. You don&apos;t need a drawing tablet, years of art training, or expensive software. A mouse, a good eye, and a limited palette are all you need. Many professional pixel artists started with nothing more than MS Paint.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Color Theory for Pixel Artists</h3>
          <p>Color choice is everything in pixel art. With limited space, you need colors that work hard. Here are key principles:</p>
          <p><strong>Hue shifting:</strong> Instead of just darkening a color for shadows, shift the hue as well. Warm colors shift toward purple in shadows; cool colors shift toward blue-green. This creates much richer, more natural-looking pixel art.</p>
          <p><strong>Value contrast:</strong> The most important factor in readability. Make sure your light areas are clearly lighter than your dark areas. Squint at your art — if you can still make out the forms, your value contrast is good.</p>
          <p><strong>Palette harmony:</strong> Use palettes where colors work together. Our built-in Pico-8 and Endesga 32 palettes are specifically designed for pixel art, with colors that harmonize naturally.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Advanced Techniques</h3>
          <p><strong>Sub-pixel rendering:</strong> At very small sizes, you can suggest detail that isn&apos;t actually there by carefully choosing pixel colors. A skin-tone pixel next to an eye pixel can make the eye appear to have detail at sizes where detail shouldn&apos;t be possible.</p>
          <p><strong>Anti-aliasing (manual):</strong> While pixel art typically avoids anti-aliasing, strategic placement of intermediate-color pixels along curves can smooth jagged edges without losing the pixel art feel.</p>
          <p><strong>Clustering:</strong> Group same-color pixels together when possible. Scattered single pixels create visual noise. Clean clusters create readable shapes. This is especially important at small canvas sizes.</p>
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-xl border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium" style={{ color: "var(--text)" }}>
                {faq.q}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 ml-2 transition-transform group-open:rotate-180"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div className="px-5 pb-4 text-sm" style={{ color: "var(--text-muted)" }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <div className="mb-12">
        <h2 className="text-[22px] sm:text-[28px] font-semibold mb-4" style={{ color: "var(--text)" }}>Pro Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Dithering for Depth", desc: "Use dithering to create the illusion of gradients and shadows with a limited color palette." },
            { title: "Consistent Palettes", desc: "Stick to a consistent color palette like Pico-8 or Endesga 32 for a cohesive look." },
            { title: "Silhouette Test", desc: "Start with the silhouette first. If it's not readable, no amount of detail will fix it." },
            { title: "Scale for Sharing", desc: "Export at 4x or 8x scale for sharing — pixel art looks best when each pixel is clearly visible." },
          ].map((tip) => (
            <div key={tip.title} className="rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="font-medium text-sm mb-1" style={{ color: "var(--text)" }}>{tip.title}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "15px" }}>{tip.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="mb-12">
        <h2 className="text-[22px] sm:text-[28px] font-semibold mb-4" style={{ color: "var(--text)" }}>Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Pixel Art Editor", desc: "Full-featured pixel art editor", href: "/design-tools/pixel-art-editor" },
            { name: "Favicon Generator", desc: "Design favicons with live browser preview", href: "/design-tools/favicon-generator" },
            { name: "Image Compressor", desc: "Compress images to exact file sizes", href: "/image-tools/image-compressor" },
          ].map((tool) => (
            <a key={tool.name} href={tool.href} className="flex items-start gap-3 p-4 rounded-xl border transition-shadow hover:shadow-md"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <div>
                <div className="font-medium text-sm" style={{ color: "var(--text)" }}>{tool.name}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "15px" }}>{tool.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PixelArtMakerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Pixel Art Maker",
            description: "Make pixel art online for free. Simple, clean editor with pencil, fill, mirror mode, color palettes, and starter templates.",
            applicationCategory: "DesignApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: ["Pixel-perfect drawing tools", "200+ starter icons", "7 curated color palettes", "Mirror/symmetry mode", "Dithering patterns", "Export as PNG, SVG, ICO"],
          }),
        }}
      />
      <PixelArtEditor
        defaultCanvasSize={64}
        title="Free Pixel Art Maker"
        subtitle="Create retro pixel art online. Simple, clean editor with powerful tools and curated palettes."
      />
      <SEOContent />
    </>
  );
}
