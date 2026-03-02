import type { Metadata } from "next";
import PixelArtEditor from "./components/PixelArtEditor";

export const metadata: Metadata = {
  title: "Free Pixel Art Editor — Draw Pixel Art Online | EveryFreeTool",
  description: "Create pixel art in your browser with a clean, modern editor. Draw, fill, mirror, use templates, and export as PNG, SVG, ICO, or GIF. 100% free, no signup.",
  openGraph: {
    title: "Free Pixel Art Editor — Draw Pixel Art Online | EveryFreeTool",
    description: "Create pixel art in your browser with a clean, modern editor. Draw, fill, mirror, use templates, and export as PNG, SVG, ICO, or GIF.",
    type: "website",
  },
};

function SEOContent() {
  const faqs = [
    { q: "What is pixel art?", a: "Pixel art is a form of digital art where images are created and edited at the individual pixel level. Each pixel is placed intentionally to create clean, crisp graphics. It originated in early video games and computer graphics when screen resolutions were limited, and has since become a beloved art style with its own aesthetic principles and techniques." },
    { q: "What canvas size should I use for pixel art?", a: "For beginners, 32x32 or 64x64 are great starting sizes. They give you enough room for detail while keeping the scope manageable. For favicons, use 16x16 or 32x32. For game sprites, 16x16 to 64x64 is standard. For detailed artwork or profile pictures, try 128x128 or larger." },
    { q: "How do I make my pixel art look good?", a: "Start with a limited color palette (8-16 colors). Focus on the silhouette first — if you can't tell what it is from the outline alone, add more definition. Use dithering for gradients and shading. Avoid anti-aliasing unless intentional. Keep line widths consistent, and study pixel art from games you admire." },
    { q: "Can I use this editor on my phone?", a: "Yes! The editor is fully responsive and supports touch input. Your finger acts as the pencil tool. The canvas takes up most of the screen on mobile, with tools accessible via a compact toolbar. You can draw, fill, pick colors, and export — all from your phone." },
    { q: "What export formats are available?", a: "You can export as PNG (at 1x, 2x, 4x, or 8x scale), SVG (scalable vector with crisp pixels), ICO (multi-resolution favicon), or download a complete favicon package as a ZIP containing all sizes and formats needed for modern websites." },
    { q: "Is my artwork saved?", a: "Your artwork exists in your browser session only. All processing is 100% client-side — nothing is uploaded to any server. Make sure to export your work before closing the tab. We recommend exporting as PNG to save your progress." },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 pb-12">
      <div className="rounded-2xl border p-6 md:p-8 mb-12" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>Getting Started with Pixel Art</h2>
        <div className="space-y-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <p>Pixel art is one of the most accessible forms of digital art. Unlike illustration or 3D modeling, you don&apos;t need years of training or expensive software to create something beautiful. Every pixel is a deliberate choice, and that constraint is what makes it so satisfying.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>A Brief History</h3>
          <p>Pixel art emerged in the 1970s and 80s when game developers and computer artists worked within severe hardware limitations. Games like Space Invaders, Super Mario Bros, and The Legend of Zelda turned those constraints into timeless visual styles. Today, pixel art thrives as an intentional aesthetic choice, celebrated in indie games like Celeste, Stardew Valley, and Shovel Knight.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Essential Techniques</h3>
          <p><strong>Start with the silhouette.</strong> Before adding color or detail, sketch the basic shape of your subject. If the silhouette is unrecognizable, no amount of detail will save it. This is especially important for small canvases like 16x16 or 32x32.</p>
          <p><strong>Use limited palettes.</strong> One of the biggest mistakes beginners make is using too many colors. Professional pixel art often uses just 8-16 carefully chosen colors. Our built-in palettes like Pico-8, Endesga 32, and Material Design give you curated color sets that work beautifully together.</p>
          <p><strong>Master dithering.</strong> Dithering is the technique of alternating two colors in a checkerboard pattern to simulate a third color or gradient. Toggle the dithering option in this editor to add depth and shading without expanding your palette.</p>
          <p><strong>Embrace symmetry.</strong> Many icons, characters, and objects are symmetrical. Use the mirror mode in this editor to automatically reflect your strokes — it cuts your work in half and produces cleaner results.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Choosing Your Canvas Size</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-2">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left py-2 pr-4">Size</th>
                  <th className="text-left py-2 pr-4">Best For</th>
                  <th className="text-left py-2">Detail Level</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["16x16", "Favicons, game tiles, tiny sprites", "Very low — focus on shape and color"],
                  ["32x32", "Standard favicons, small icons, simple sprites", "Low — basic detail possible"],
                  ["64x64", "Detailed sprites, profile pictures, icons", "Medium — good balance of detail and constraint"],
                  ["128x128", "Portraits, detailed art, large icons", "High — room for nuance and shading"],
                ].map(([size, best, detail]) => (
                  <tr key={size} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-4 font-mono font-semibold">{size}</td>
                    <td className="py-2 pr-4">{best}</td>
                    <td className="py-2">{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Tips for Your First Pixel Art</h3>
          <p>Start small. A 32x32 canvas is perfect for beginners. Choose a simple subject — a fruit, a potion bottle, a smiley face. Pick 4-5 colors max. Draw the outline first, then fill in the base colors, and finally add highlights and shadows. Export at 4x or 8x scale so each pixel is clearly visible when you share your creation.</p>
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
            { title: "Use Dithering for Depth", desc: "Toggle dithering to create the illusion of gradients and shadows with a limited color palette." },
            { title: "Stick to a Palette", desc: "Use a consistent color palette (like Pico-8 or Endesga 32) for a cohesive, professional look." },
            { title: "Silhouette First", desc: "Start with the silhouette. If it's not readable as a shape, the details won't help." },
            { title: "Export at Scale", desc: "Export at 4x or 8x scale for sharing — pixel art looks best when each pixel is clearly visible." },
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
            { name: "Favicon Generator", desc: "Design favicons with live browser preview", href: "/design-tools/favicon-generator" },
            { name: "Icon Maker", desc: "Create custom app icons for iOS and Android", href: "/design-tools/icon-maker" },
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

export default function PixelArtEditorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Pixel Art Editor",
            description: "Create pixel art in your browser with a clean, modern editor. Draw, fill, mirror, use templates, and export as PNG, SVG, ICO, or GIF.",
            applicationCategory: "DesignApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: ["Pixel-perfect drawing tools", "200+ starter icons", "Color palettes", "Mirror/symmetry mode", "Export as PNG, SVG, ICO", "Complete favicon package download", "100% client-side processing"],
          }),
        }}
      />
      <PixelArtEditor
        defaultCanvasSize={64}
        title="Free Pixel Art Editor"
        subtitle="Create pixel art in your browser. Draw, fill, mirror, and export as PNG, SVG, ICO, or complete favicon package."
      />
      <SEOContent />
    </>
  );
}
