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
              <h2 className="text-xl font-bold mb-3">How CSS Gradient Animations Work</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>CSS gradient animations use a clever technique: create a gradient larger than the element using <code style={{ color: "#059669" }}>background-size: 200% 200%</code>, then animate the <code style={{ color: "#059669" }}>background-position</code> with <code style={{ color: "#059669" }}>@keyframes</code>. The oversized gradient scrolls behind the element, creating a smooth flowing effect. No JavaScript needed — it&apos;s pure CSS that runs at 60fps.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Animation Types and When to Use Them</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The <strong>Shift</strong> animation slides the gradient across the element — best for hero sections and backgrounds where you want subtle movement. <strong>Hue Rotate</strong> cycles the gradient through all colors using <code style={{ color: "#059669" }}>filter: hue-rotate()</code> — ideal for eye-catching loading states. <strong>Pulse</strong> fades the gradient opacity between 70% and 100% — subtle enough for buttons and cards without being distracting.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Performance Tips for Animated Gradients</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Modern browsers GPU-accelerate CSS animations, so performance is generally excellent. A few tips: use <code style={{ color: "#059669" }}>will-change: background-position</code> to hint at the browser for optimization. Keep animations to one per page to avoid visual overload. Longer durations (6-10s) feel more elegant than fast animations. Consider using the <code style={{ color: "#059669" }}>prefers-reduced-motion</code> media query to disable animations for users who prefer reduced motion.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Create your animated gradient below.</p>
          </div>
        </div>
      </div>
      <CssGradientGenerator title="Animated CSS Gradient Generator" subtitle="Create animated gradient backgrounds with pure CSS." defaultAnimate={true} articleMode={true} />
    </>
  );
}
