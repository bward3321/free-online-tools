import type { Metadata } from "next";
import PixelArtEditor from "../pixel-art-editor/components/PixelArtEditor";

export const metadata: Metadata = {
  title: "Free Favicon Generator — Draw & Download Complete Favicon Package | EveryFreeTool",
  description: "Create a favicon from scratch or import your logo. Draw pixel by pixel, preview in browser tab mockup, download complete favicon package with ICO, PNG, Apple Touch Icon, and HTML code.",
  openGraph: {
    title: "Free Favicon Generator — Draw & Download Complete Favicon Package",
    description: "Create a favicon from scratch or import your logo. Draw pixel by pixel, preview in browser tab mockup, download complete favicon package.",
    type: "website",
  },
};

function SEOContent() {
  const faqs = [
    { q: "What sizes do I need for a favicon?", a: "A complete favicon setup includes: 16x16 (browser tabs), 32x32 (browser bookmark bars), 48x48 (Windows site shortcuts), 180x180 (Apple Touch Icon for iOS), 192x192 (Android Chrome), and 512x512 (PWA splash screens). Our favicon package includes all of these automatically." },
    { q: "How do I add a favicon to my website?", a: "Upload the favicon files to your website's root directory, then add the HTML link tags to your <head> section. Our 'Download Favicon Package' button generates all the files you need plus the exact HTML code to paste. It's truly one-click." },
    { q: "What's the difference between ICO and PNG favicons?", a: "ICO is the traditional format that can contain multiple sizes in one file (16x16, 32x32, 48x48). PNG favicons are simpler but require separate files for each size. Modern browsers support both, but ICO has the widest compatibility. Our package includes both formats." },
    { q: "Do I need an Apple Touch Icon?", a: "Yes, if you want your site to look good when saved to an iOS home screen. Without one, Safari will use a screenshot of your page instead of your icon. The Apple Touch Icon should be 180x180 pixels. Our favicon package includes this automatically." },
    { q: "Can I import my existing logo?", a: "Absolutely. Click the 'Import' button and select any image file (PNG, JPG, SVG, etc.). The image will be resized to your canvas dimensions, and you can then refine it pixel by pixel to ensure it looks crisp at small sizes." },
    { q: "What is the web app manifest (site.webmanifest)?", a: "The web app manifest is a JSON file that tells browsers about your web application. It includes your app's name, icons, theme color, and display preferences. It's required for Progressive Web Apps (PWAs) and used by Android Chrome for the home screen icon. Our package includes a pre-configured manifest." },
    { q: "How do I make a favicon for WordPress/Shopify/Squarespace?", a: "Most CMS platforms have a built-in favicon upload option. In WordPress, go to Appearance > Customize > Site Identity. In Shopify, go to Online Store > Themes > Customize > Theme Settings. In Squarespace, go to Design > Browser Icon. Upload the 32x32 or 512x512 PNG from our package." },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 pb-12">
      <div className="rounded-2xl border p-6 md:p-8 mb-12" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <h2 className="text-[22px] sm:text-[28px] font-bold mb-6" style={{ color: "var(--text)" }}>What is a Favicon and Why Does Your Website Need One?</h2>
        <div className="space-y-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <p>A favicon (short for &ldquo;favorites icon&rdquo;) is the small icon that appears in browser tabs, bookmarks, and search results next to your website&apos;s name. It&apos;s one of the most important yet overlooked branding elements of any website. A well-designed favicon makes your site look professional, helps users find your tab among dozens of open tabs, and reinforces brand recognition.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Every Favicon Size You Need</h3>
          <p>Modern browsers and devices use favicons at many different sizes. Providing the right sizes ensures your icon looks crisp everywhere:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-2">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left py-2 pr-4">Size</th>
                  <th className="text-left py-2 pr-4">File</th>
                  <th className="text-left py-2">Used By</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["16x16", "favicon-16x16.png", "Browser tabs, address bar"],
                  ["32x32", "favicon-32x32.png", "Bookmark bars, Windows taskbar"],
                  ["48x48", "favicon-48x48.png", "Windows site shortcuts"],
                  ["180x180", "apple-touch-icon.png", "iOS home screen, Safari"],
                  ["192x192", "android-chrome-192x192.png", "Android Chrome home screen"],
                  ["512x512", "android-chrome-512x512.png", "PWA splash screens, app stores"],
                  ["Multi-size", "favicon.ico", "Legacy browsers, universal fallback"],
                ].map(([size, file, used]) => (
                  <tr key={size} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-4 font-mono font-semibold">{size}</td>
                    <td className="py-2 pr-4 font-mono">{file}</td>
                    <td className="py-2">{used}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>ICO vs PNG vs SVG Favicons</h3>
          <p><strong>ICO</strong> is the traditional format. It&apos;s a container that holds multiple sizes (16x16, 32x32, 48x48) in a single file. It has the widest browser compatibility and is the safest choice for the primary favicon.</p>
          <p><strong>PNG</strong> favicons are simpler to create and widely supported by modern browsers. You need separate files for each size, but the quality is excellent. Most sites use PNG favicons alongside an ICO fallback.</p>
          <p><strong>SVG</strong> favicons are scalable and look perfect at any size, but browser support is still limited. They&apos;re great for simple geometric designs but can&apos;t capture the hand-crafted charm of pixel art.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>How to Install Your Favicon</h3>
          <p>After downloading the favicon package from this tool, follow these steps:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Upload all files to the root directory of your website</li>
            <li>Add the HTML snippet (included in the package) to your site&apos;s &lt;head&gt; tag</li>
            <li>Clear your browser cache and reload to see the new favicon</li>
            <li>Test on different devices and browsers to verify it appears correctly</li>
          </ol>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: "var(--text)" }}>Favicon Design Tips</h3>
          <p>The best favicons are simple, recognizable, and high-contrast. Since favicons display at just 16x16 pixels in browser tabs, complex designs become unreadable. Stick to 2-4 colors maximum. Many successful favicons are just a single letter or a bold geometric shape. Use this tool&apos;s live browser tab preview to see exactly how your favicon will look in context.</p>
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
            { title: "Keep It Simple", desc: "Favicons display at 16x16px in browser tabs. Complex designs become unreadable. Stick to 2-4 colors max." },
            { title: "Use Symmetry", desc: "Enable horizontal mirror mode to create balanced icons fast — most great favicons are symmetrical." },
            { title: "Test Both Backgrounds", desc: "Use the dark/light toggle in the preview panel to check your favicon on both backgrounds." },
            { title: "Think Multi-Context", desc: "Your favicon appears in tabs, bookmarks, Google results, and home screens. Make sure it reads well everywhere." },
            { title: "Bold Contrast", desc: "The most recognizable favicons use strong contrast. A dark icon on light, or light on dark, stands out." },
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
            { name: "Pixel Art Editor", desc: "Full-featured pixel art editor for any project", href: "/design-tools/pixel-art-editor" },
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

export default function FaviconGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Favicon Generator",
            description: "Create a favicon from scratch or import your logo. Draw pixel by pixel, preview in browser tab mockup, download complete favicon package.",
            applicationCategory: "DesignApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: ["Draw favicons pixel by pixel", "Live browser tab preview", "Complete favicon package download", "ICO, PNG, SVG export", "200+ starter icons", "Import existing logo"],
          }),
        }}
      />
      <PixelArtEditor
        defaultCanvasSize={32}
        title="Free Favicon Generator"
        subtitle="Draw your favicon pixel by pixel. Preview in a live browser tab mockup. Download a complete favicon package with one click."
        faviconMode
      />
      <SEOContent />
    </>
  );
}
