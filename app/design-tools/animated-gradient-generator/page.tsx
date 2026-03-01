import type { Metadata } from "next";
import CssGradientGenerator from "../css-gradient-generator/components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "Free Animated CSS Gradient Generator — Moving Backgrounds | EveryFreeTool",
  description: "Create eye-catching animated gradient backgrounds with CSS. Control speed, direction, and colors. Copy the animation CSS code instantly. No JavaScript required.",
  openGraph: { title: "Free Animated CSS Gradient Generator", description: "Create animated gradient backgrounds with CSS. Control speed and effects. Copy animation code instantly. Free.", type: "website" },
  robots: "index, follow",
};

export default function AnimatedGradientGeneratorPage() {
  const faqs = [
    { name: "How do CSS gradient animations work?", text: "The most common technique uses background-size: 200% 200% to create an oversized gradient, then a @keyframes animation shifts the background-position. This creates a smooth, continuous flowing effect using pure CSS — no JavaScript needed." },
    { name: "What animation types are available?", text: "Three types: Shift (background-position animation for a flowing effect), Hue Rotate (CSS filter that cycles through colors), and Pulse (opacity animation between 70% and 100%). Each type creates a distinct visual effect." },
    { name: "Will animated gradients affect performance?", text: "CSS gradient animations are GPU-accelerated in modern browsers. The shift and pulse techniques use transform-friendly properties. Hue-rotate uses CSS filters which are also hardware-accelerated. For most use cases, the performance impact is negligible." },
    { name: "Can I control the animation speed?", text: "Yes. Use the speed slider to set duration from 2 seconds (fast) to 15 seconds (slow). You can also choose forward, reverse, or alternate direction. The preview shows the animation in real-time as you adjust." },
    { name: "Where should I use animated gradients?", text: "Hero sections, loading screens, button hover states, and decorative backgrounds are ideal use cases. Use them sparingly — one animated gradient per page is usually enough. Avoid animating gradients behind text-heavy content, as the motion can be distracting." },
    { name: "Does the generated code include @keyframes?", text: "Yes. The CSS output includes the complete @keyframes rule, animation property, and background-size declaration. Copy and paste the entire block into your stylesheet — nothing else is needed." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Animated Gradient Generator", url: "https://everyfreetool.com/design-tools/animated-gradient-generator", description: "Create animated CSS gradient backgrounds. No JavaScript required. Free online tool.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Animated CSS Gradient Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Create eye-catching animated gradient backgrounds using pure CSS. Choose animation type, adjust speed and direction, then copy the complete CSS including @keyframes.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">The Background-Size Animation Technique</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>CSS gradient animations use a clever technique: create a gradient larger than the element using <code style={{ color: "#059669" }}>background-size: 200% 200%</code>, then animate the <code style={{ color: "#059669" }}>background-position</code> with <code style={{ color: "#059669" }}>@keyframes</code>. The oversized gradient scrolls behind the element, creating a smooth flowing effect at 60fps.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Three Animation Modes</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The <strong>Shift</strong> animation slides the gradient across the element &mdash; best for hero sections and backgrounds. <strong>Hue Rotate</strong> cycles the gradient through all colors using <code style={{ color: "#059669" }}>filter: hue-rotate()</code> &mdash; ideal for loading states. <strong>Pulse</strong> fades the gradient opacity &mdash; subtle enough for buttons and cards.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Performance Considerations</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Modern browsers GPU-accelerate CSS animations, so performance is generally excellent. Use <code style={{ color: "#059669" }}>will-change: background-position</code> as a hint. Longer durations (6-10s) feel more elegant. Consider the <code style={{ color: "#059669" }}>prefers-reduced-motion</code> media query to respect user preferences.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Create your animated gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="Animated CSS Gradient Generator" subtitle="Create animated gradient backgrounds with pure CSS." defaultAnimate={true} articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What Is the Animated Gradient Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p>This free tool creates animated CSS gradient backgrounds without JavaScript. Choose from three animation types &mdash; shift, hue-rotate, and pulse &mdash; adjust the speed from 2 to 15 seconds, and copy the complete CSS including the @keyframes rule. The animation is enabled by default, so you see the flowing gradient immediately. The generated code is production-ready and works in all modern browsers.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: See the animation.</strong> The tool loads with animation already enabled. You&apos;ll see a flowing gradient in the preview immediately.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Choose your colors.</strong> Edit the color stops or select a preset from the gallery. The animation applies to whatever gradient you build.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Adjust the animation.</strong> Select the animation type (shift, hue-rotate, or pulse), set the speed with the slider, and choose a direction (forward, reverse, or alternate).</p>
              <p><strong style={{ color: "var(--text)" }}>Step 4: Copy the complete CSS.</strong> The code output includes the gradient, @keyframes rule, background-size, and animation properties. Copy everything and paste into your stylesheet.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Three animation types.</strong> Shift creates a flowing movement using background-position keyframes. Hue-rotate cycles through the entire color spectrum using CSS filters. Pulse fades the gradient opacity between 70% and 100% for a breathing effect.</p>
              <p><strong style={{ color: "var(--text)" }}>Adjustable speed and direction.</strong> Control the animation duration from 2 seconds (energetic) to 15 seconds (calm, ambient). Choose forward, reverse, or alternate playback. The preview animates in real-time so you can fine-tune the feel.</p>
              <p><strong style={{ color: "var(--text)" }}>Complete code output.</strong> The generated CSS includes everything needed: the gradient declaration, <code style={{ color: "#059669" }}>background-size</code>, the <code style={{ color: "#059669" }}>@keyframes</code> rule, and the <code style={{ color: "#059669" }}>animation</code> shorthand property. One copy-paste is all it takes.</p>
              <p><strong style={{ color: "var(--text)" }}>Works with all gradient types.</strong> Animate linear, radial, conic, or mesh gradients. The shift animation works with any type. Hue-rotate and pulse work universally since they use CSS filters and opacity.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How CSS Gradient Animations Work</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "16px", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>The shift technique.</strong> Set <code style={{ color: "#059669" }}>background-size: 200% 200%</code> to make the gradient twice as large as the element. Then animate <code style={{ color: "#059669" }}>background-position</code> from <code style={{ color: "#059669" }}>0% 50%</code> to <code style={{ color: "#059669" }}>100% 50%</code> and back. The oversized gradient slides behind the element, creating continuous flowing motion. Duplicate the first color at the end of the stops list for seamless looping.</p>
              <p><strong style={{ color: "var(--text)" }}>The hue-rotate technique.</strong> Apply the gradient normally, then animate <code style={{ color: "#059669" }}>filter: hue-rotate()</code> from 0deg to 360deg. This shifts every color in the gradient through the entire spectrum. The effect is dramatic and works especially well with rainbow or analogous color schemes.</p>
              <p><strong style={{ color: "var(--text)" }}>The pulse technique.</strong> Animate <code style={{ color: "#059669" }}>opacity</code> between 0.7 and 1.0 using an ease-in-out timing function. This creates a subtle breathing effect that adds life to otherwise static gradient backgrounds. It&apos;s the least distracting animation type and works well even behind content.</p>
              <p><strong style={{ color: "var(--text)" }}>Respecting user preferences.</strong> Wrap your animation in a <code style={{ color: "#059669" }}>@media (prefers-reduced-motion: no-preference)</code> query to automatically disable it for users who prefer reduced motion. This is an accessibility best practice that ensures your animated gradient doesn&apos;t cause discomfort.</p>
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
