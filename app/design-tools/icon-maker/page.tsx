import type { Metadata } from "next";
import PixelArtEditor from "../pixel-art-editor/components/PixelArtEditor";

export const metadata: Metadata = {
  title: "Free Icon Maker — Create Custom App Icons Online | EveryFreeTool",
  description: "Design custom app icons for iOS, Android, and web. Draw pixel by pixel, preview on device mockups, export all sizes. Free, no signup required.",
  openGraph: {
    title: "Free Icon Maker — Create Custom App Icons Online",
    description: "Design custom app icons for iOS, Android, and web. Draw pixel by pixel, preview on device mockups, export all sizes.",
    type: "website",
  },
};

function SEOContent() {
  const faqs = [
    { q: "What size should my app icon be?", a: "For iOS, you need a 1024x1024 master icon (Apple will resize it). For Android, 512x512 is the Play Store requirement, with 192x192 and 48x48 for device use. For web favicons, 16x16, 32x32, and 180x180. Our tool lets you design at a manageable size (32x32 or 64x64) and exports all the sizes you need." },
    { q: "Will my pixel art icon look good on modern phones?", a: "Absolutely. Pixel art icons stand out precisely because they're different from the glossy, gradient-heavy icons that dominate app stores. The key is designing with clean shapes, strong colors, and good contrast. Use the preview panel to check how your icon looks at different sizes." },
    { q: "How does iOS icon rounding work?", a: "iOS automatically applies rounded corners to app icons using a superellipse mask. You don't need to round your icon yourself — just design a square icon and iOS handles the rest. Keep important elements away from the edges (at least 10% padding) so they don't get clipped." },
    { q: "What about Android adaptive icons?", a: "Android adaptive icons use a two-layer system (foreground and background) that allows the OS to apply different shapes (circle, squircle, rounded square). For a pixel art icon created in this tool, your design becomes the foreground layer. Make sure your design has padding and works when masked to a circle." },
    { q: "Can I use this for desktop application icons?", a: "Yes! Export your icon as ICO format for Windows applications, or as PNG at various sizes for macOS and Linux. The favicon package includes multiple sizes that work well for desktop applications too." },
    { q: "What makes a good app icon?", a: "The best app icons are simple, distinctive, and recognizable at small sizes. Use 2-4 colors maximum. Avoid text (it's unreadable at small sizes). Focus on a single, bold shape or symbol. Test your icon at 16x16 — if you can still identify it, you've got a winner." },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 pb-12">
      <div className="rounded-2xl border p-6 md:p-8 mb-12" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>Designing Great App Icons</h2>
        <div className="space-y-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <p>Your app icon is the first thing users see. It appears on home screens, in app stores, in search results, and in notifications. A great icon communicates what your app does, feels polished, and stands out in a sea of competing apps. Pixel art icons are a bold, distinctive choice that immediately grabs attention.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Icon Sizes for Every Platform</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-2">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left py-2 pr-4">Platform</th>
                  <th className="text-left py-2 pr-4">Sizes Needed</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["iOS", "1024x1024 (master), 180x180, 167x167, 152x152, 120x120, 87x87, 80x80, 76x76, 60x60, 58x58, 40x40, 29x29, 20x20", "Rounded corners applied automatically"],
                  ["Android", "512x512 (Play Store), 192x192, 144x144, 96x96, 72x72, 48x48, 36x36", "Adaptive icon system; design for circular mask"],
                  ["Web (Favicon)", "512x512, 192x192, 180x180, 48x48, 32x32, 16x16", "Include ICO for legacy support"],
                  ["Windows", "256x256, 48x48, 32x32, 24x24, 16x16", "ICO format with multiple sizes"],
                  ["macOS", "1024x1024, 512x512, 256x256, 128x128, 64x64, 32x32, 16x16", "ICNS format or PNG set"],
                ].map(([platform, sizes, notes]) => (
                  <tr key={platform} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-4 font-semibold">{platform}</td>
                    <td className="py-2 pr-4">{sizes}</td>
                    <td className="py-2">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Design Principles for Pixel Art Icons</h3>
          <p><strong>Simplicity wins.</strong> At 48x48 pixels on an Android device, your icon needs to communicate instantly. One strong shape or symbol beats a complex illustration every time. Think of the most iconic app icons — they&apos;re almost always a single, memorable element.</p>
          <p><strong>Color with purpose.</strong> Pixel art icons work best with 2-5 bold colors. Choose colors that contrast well with both light and dark backgrounds, since users may have different wallpapers. Use the preview panel&apos;s dark/light toggle to verify.</p>
          <p><strong>Padding matters.</strong> Always leave 2-4 pixels of padding from the edges of your canvas. iOS clips corners, Android may mask to various shapes, and Windows may add margins. Content too close to the edge will get cut off.</p>
          <p><strong>Test at actual size.</strong> Zoom out and look at the 16x16 and 32x32 previews in the right panel. If your icon is unrecognizable at those sizes, simplify further. The small-size preview is your honest mirror.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Why Pixel Art Icons Stand Out</h3>
          <p>In a world of glossy, gradient-heavy app icons, pixel art is refreshingly different. It signals creativity, indie spirit, and attention to craft. Games like Stardew Valley, apps like Habitica, and countless indie products have proven that pixel art icons can be both professional and eye-catching. If your brand has personality, a pixel art icon is a bold way to show it.</p>
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
            { title: "Design for the Circle", desc: "Android may display your icon in a circle. Keep key elements centered and away from corners." },
            { title: "One Strong Shape", desc: "The best app icons use a single, bold shape. Complex scenes don't scale down well." },
            { title: "Test Dark & Light", desc: "Toggle the preview background to see how your icon looks on different wallpapers and contexts." },
            { title: "Leave Padding", desc: "Keep 2-4px of space from edges. iOS rounds corners and Android may crop to different shapes." },
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
            { name: "Pixel Art Editor", desc: "Full-featured pixel art editor", href: "/design-tools/pixel-art-editor" },
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

export default function IconMakerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Icon Maker",
            description: "Design custom app icons for iOS, Android, and web. Draw pixel by pixel, preview on device mockups, export all sizes.",
            applicationCategory: "DesignApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: ["Design icons pixel by pixel", "Preview at all app icon sizes", "Export for iOS, Android, and web", "200+ starter icons", "Complete favicon package", "100% client-side"],
          }),
        }}
      />
      <PixelArtEditor
        defaultCanvasSize={32}
        title="Free Icon Maker"
        subtitle="Design custom app icons for iOS, Android, and web. Preview at every size. Export with one click."
        faviconMode
      />
      <SEOContent />
    </>
  );
}
