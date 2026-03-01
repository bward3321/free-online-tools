import type { Metadata } from "next";
import CssGradientGenerator from "../css-gradient-generator/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "Free CSS Linear Gradient Generator Online | EveryFreeTool",
  description: "Create stunning linear gradients with custom angles, multiple color stops, and one-click CSS code. Free online tool with Tailwind and SCSS output.",
  openGraph: { title: "Free CSS Linear Gradient Generator", description: "Create linear gradients with custom angles and color stops. Copy CSS, Tailwind, SCSS instantly. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function LinearGradientGeneratorPage() {
  const faqs = [
    { name: "How does linear-gradient() work in CSS?", text: "The CSS linear-gradient() function creates a smooth transition between two or more colors along a straight line. You define a direction or angle and a list of color stops. The browser interpolates the colors between each stop." },
    { name: "What angle directions are available?", text: "Angles go from 0° (bottom to top) through 90° (left to right), 180° (top to bottom), and 270° (right to left). You can also use keywords like 'to right', 'to bottom left'. Any degree value from 0 to 360 works." },
    { name: "Can I add more than two colors?", text: "Yes. Click anywhere on the color stop bar to add new stops. Most gradients use 2-5 stops but there is no hard limit. Each stop can have a precise percentage position." },
    { name: "How do I create a repeating linear gradient?", text: "Toggle the 'Repeating' option. This wraps your gradient using repeating-linear-gradient(), which tiles the color pattern to create stripes and geometric patterns." },
    { name: "Is this linear gradient tool free?", text: "Completely free with no signup required. All processing happens in your browser. Create unlimited gradients and copy CSS, Tailwind, or SCSS code with one click." },
    { name: "How do I create a diagonal gradient?", text: "Use angles like 45° (bottom-left to top-right) or 135° (top-left to bottom-right). The direction preset buttons provide quick access to all 8 main directions." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Linear Gradient Generator", url: "https://everyfreetool.com/design-tools/linear-gradient-generator", description: "Create CSS linear gradients with custom angles and colors. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free CSS Linear Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Build perfect linear gradients with a visual angle picker, draggable color stops, and one-click code copy. Supports CSS, Tailwind, and SCSS output.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Understanding CSS Linear Gradients</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The CSS <code style={{ color: "#059669" }}>linear-gradient()</code> function creates a color transition along a straight line. You specify a direction or angle, followed by two or more color stops. The browser smoothly interpolates between the colors. The simplest gradient &mdash; <code style={{ color: "#059669" }}>linear-gradient(#667eea, #764ba2)</code> &mdash; transitions from top to bottom by default.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Angle System Explained</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Gradient angles start at 0&deg; (bottom to top) and rotate clockwise: 90&deg; goes left to right, 180&deg; top to bottom, 270&deg; right to left. You can also use direction keywords like <code style={{ color: "#059669" }}>to right</code>, <code style={{ color: "#059669" }}>to bottom left</code>, or <code style={{ color: "#059669" }}>to top right</code>. Diagonal gradients (45&deg;, 135&deg;) are popular for UI backgrounds because they add visual energy without being too aggressive.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Working with Multiple Color Stops</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Add more than two color stops to create rich, layered gradients. Each stop can have a percentage position: <code style={{ color: "#059669" }}>linear-gradient(90deg, #ff0000 0%, #ffff00 50%, #00ff00 100%)</code>. Place two stops at the same position to create a hard edge. Stops without explicit positions are evenly distributed between their neighbors.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Create your linear gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="CSS Linear Gradient Generator" subtitle="Create linear gradients with custom angles and colors." defaultType="linear" articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What Is the Linear Gradient Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p>This free tool lets you build CSS linear gradients visually without writing code by hand. Set the angle with a slider or direction presets, add and position color stops on an interactive bar, and see results in real-time. The generated code is available in CSS, Tailwind, SCSS, and CSS custom property formats, each copyable with a single click. Whether you need a simple two-color background or a complex multi-stop gradient, the visual interface makes it fast and intuitive.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Set the angle.</strong> Use the angle slider, type a degree value, or click one of the 8 direction preset buttons to quickly set common angles like 90&deg; (left to right) or 135&deg; (diagonal).</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Edit color stops.</strong> Click on a color stop marker to select it and change its color. Drag stops along the bar to reposition them. Click empty space on the bar to add a new stop at that position.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Fine-tune.</strong> Use the reverse button to flip the gradient direction. Toggle repeating mode for striped patterns. Try the randomize button for instant inspiration.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 4: Copy your code.</strong> Select the output format you need (CSS, Tailwind, SCSS, or CSS Variables) and click Copy Code. Paste it directly into your stylesheet.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Precise angle control.</strong> Set gradient direction with a slider from 0&deg; to 360&deg;, type an exact value, or click one of 8 direction presets. The preview updates in real-time as you adjust.</p>
              <p><strong style={{ color: "var(--text)" }}>Interactive color stop bar.</strong> The visual bar shows your current gradient with draggable markers. Add stops by clicking, remove them by selecting and pressing delete. Each stop displays its percentage position.</p>
              <p><strong style={{ color: "var(--text)" }}>Four code output formats.</strong> Vanilla CSS for any project. Tailwind utility classes that map angles to direction classes like <code style={{ color: "#059669" }}>bg-gradient-to-br</code>. SCSS with named variables for design systems. CSS custom properties for dynamic theming.</p>
              <p><strong style={{ color: "var(--text)" }}>Preview modes.</strong> See your gradient as a full background, applied to text, on a mock card component, or as a button. This helps visualize how the gradient will look in actual UI contexts.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Understanding Gradient Angles and Directions</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p>CSS gradient angles use a compass-like system where 0&deg; points up (north), 90&deg; points right (east), 180&deg; points down (south), and 270&deg; points left (west). The gradient line starts at the opposite side of the specified angle: a 0&deg; gradient places the first color at the bottom and transitions upward to the last color.</p>
              <p>Direction keywords provide a more readable alternative: <code style={{ color: "#059669" }}>to right</code> equals 90&deg;, <code style={{ color: "#059669" }}>to bottom</code> equals 180&deg;, and <code style={{ color: "#059669" }}>to bottom right</code> equals approximately 135&deg;. However, keyword directions differ slightly from degree values on non-square elements because keywords point toward corners or edges exactly, while degree values follow the mathematical angle.</p>
              <p>For hero sections, 135&deg; and 45&deg; diagonals create dynamic visual flow. For horizontal elements like navbars, 90&deg; (left to right) works naturally. Vertical cards benefit from 180&deg; (top to bottom) gradients. Experimentation is the best way to find the right angle for your specific design context.</p>
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
