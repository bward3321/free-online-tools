import type { Metadata } from "next";
import ColorPicker from "../color-picker/components/ColorPicker";

export const metadata: Metadata = {
  title: "HEX Color Codes — Complete Reference Guide | EveryFreeTool",
  description: "Complete guide to HEX color codes. How they work, 3-digit vs 6-digit vs 8-digit, common codes every designer should know. Interactive picker and converter. Free.",
  openGraph: { title: "HEX Color Codes — Reference Guide", description: "Everything about HEX color codes. Interactive picker and converter included. Free.", type: "website" },
  robots: "index, follow",
};

export default function HexColorCodesPage() {
  const faqs = [
    { name: "How do hex color codes work?", text: "Hex codes use base-16 (0-9, A-F) to represent colors. #RRGGBB — first pair is red, middle is green, last is blue. Each pair ranges from 00 (0) to FF (255). #FF0000 is pure red, #00FF00 is green, #0000FF is blue." },
    { name: "What is 3-digit hex shorthand?", text: "#F00 is shorthand for #FF0000. Each digit is doubled. This only works when each pair has identical digits: #ABC = #AABBCC, but there's no shorthand for #3B82F6." },
    { name: "What is 8-digit hex?", text: "8-digit hex adds alpha (opacity) as two more digits. #FF000080 is red at ~50% opacity. The alpha byte ranges from 00 (fully transparent) to FF (fully opaque)." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "HEX Color Codes Reference", url: "https://everyfreetool.com/design-tools/hex-color-codes", description: "Complete HEX color codes reference with interactive picker. Free.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">HEX Color Codes &mdash; Complete Reference Guide</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Everything you need to know about HEX color codes: how they work, shorthand notation, alpha transparency, and common codes every designer should memorize.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">The Structure of a HEX Code</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>A hex color code is a <code style={{ color: "#059669" }}>#</code> followed by six hexadecimal digits (0-9, A-F). The six digits form three pairs: <strong style={{ color: "var(--text)" }}>RR</strong> (red), <strong style={{ color: "var(--text)" }}>GG</strong> (green), <strong style={{ color: "var(--text)" }}>BB</strong> (blue). Each pair represents a value from 0 to 255 in base-16. For example, <code style={{ color: "#059669" }}>#3B82F6</code> means red=59, green=130, blue=246.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Essential HEX Codes to Know</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}><code style={{ color: "#059669" }}>#000000</code> Black. <code style={{ color: "#059669" }}>#FFFFFF</code> White. <code style={{ color: "#059669" }}>#FF0000</code> Pure red. <code style={{ color: "#059669" }}>#00FF00</code> Pure green. <code style={{ color: "#059669" }}>#0000FF</code> Pure blue. <code style={{ color: "#059669" }}>#808080</code> Medium gray. <code style={{ color: "#059669" }}>#FFA500</code> Orange. <code style={{ color: "#059669" }}>#800080</code> Purple. <code style={{ color: "#059669" }}>#333333</code> Dark gray (common text color). <code style={{ color: "#059669" }}>#F5F5F5</code> Light gray (common background).</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">HEX Across Design Tools</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>HEX codes are universal across design tools. <strong style={{ color: "var(--text)" }}>CSS/HTML:</strong> <code style={{ color: "#059669" }}>color: #3B82F6</code>. <strong style={{ color: "var(--text)" }}>Figma:</strong> paste hex directly into the color input. <strong style={{ color: "var(--text)" }}>Photoshop:</strong> enter in the color picker&apos;s hex field. <strong style={{ color: "var(--text)" }}>Email templates:</strong> HEX is the most reliable color format for HTML email.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Explore and convert any HEX color below.</p>
          </div>
        </div>
      </div>
      <ColorPicker title="HEX Color Codes" subtitle="Complete reference with interactive picker." defaultFocusFormat="hex" articleMode={true} />
    </>
  );
}
