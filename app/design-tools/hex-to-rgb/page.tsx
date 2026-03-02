import type { Metadata } from "next";
import ColorPicker from "../color-picker/components/ColorPicker";

export const metadata: Metadata = {
  title: "HEX to RGB Converter — Convert Hex Color Codes to RGB Instantly | EveryFreeTool",
  description: "Convert HEX color codes to RGB values instantly. Supports 3-digit, 6-digit, and 8-digit hex. Visual picker, contrast checker, palette generator. Free, 100% client-side.",
  openGraph: { title: "HEX to RGB Converter — Free Online", description: "Convert hex color codes to RGB instantly. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function HexToRgbPage() {
  const faqs = [
    { name: "How do I convert HEX to RGB?", text: "Type your hex code (like #3B82F6) into the HEX field. The RGB values appear instantly: R: 59, G: 130, B: 246. Each pair of hex digits represents one RGB channel." },
    { name: "What's the difference between 3-digit and 6-digit hex?", text: "#F00 is shorthand for #FF0000. Each digit is doubled: F becomes FF, 0 becomes 00. 8-digit hex adds alpha transparency." },
    { name: "Why would I need to convert HEX to RGB?", text: "Some CSS properties and JavaScript APIs use RGB values. Design tools like Figma show both. API responses may use one format while your code needs the other." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "HEX to RGB Converter", url: "https://everyfreetool.com/design-tools/hex-to-rgb", description: "Convert HEX color codes to RGB. Free, 100% client-side.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">HEX to RGB Converter &mdash; Convert Hex Color Codes to RGB Instantly</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Type any HEX color code and see the RGB values instantly. Supports 3-digit shorthand (#F00), 6-digit (#FF0000), and 8-digit with alpha (#FF000080).</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">How HEX Color Codes Work</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>HEX color codes use the base-16 (hexadecimal) number system to represent colors. A 6-digit hex code like <code style={{ color: "#059669" }}>#3B82F6</code> contains three pairs of digits: the first pair (<code style={{ color: "#059669" }}>3B</code>) represents red (59 in decimal), the middle pair (<code style={{ color: "#059669" }}>82</code>) represents green (130), and the last pair (<code style={{ color: "#059669" }}>F6</code>) represents blue (246). Each channel ranges from 00 (0) to FF (255).</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">The Conversion Formula</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Converting HEX to RGB is straightforward: split the 6-character hex string into three 2-character pairs, then convert each pair from hexadecimal to decimal. For example, <code style={{ color: "#059669" }}>#FF6347</code> (Tomato) becomes R: 255 (FF), G: 99 (63), B: 71 (47), giving <code style={{ color: "#059669" }}>rgb(255, 99, 71)</code>. Three-digit shorthand like <code style={{ color: "#059669" }}>#F63</code> doubles each digit first: FF6633.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Common HEX to RGB Conversions</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}><code style={{ color: "#059669" }}>#FFFFFF</code> = rgb(255, 255, 255) White. <code style={{ color: "#059669" }}>#000000</code> = rgb(0, 0, 0) Black. <code style={{ color: "#059669" }}>#FF0000</code> = rgb(255, 0, 0) Red. <code style={{ color: "#059669" }}>#00FF00</code> = rgb(0, 255, 0) Green. <code style={{ color: "#059669" }}>#0000FF</code> = rgb(0, 0, 255) Blue. <code style={{ color: "#059669" }}>#3B82F6</code> = rgb(59, 130, 246) Tailwind blue-500.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Type a HEX code below to convert it to RGB.</p>
          </div>
        </div>
      </div>
      <ColorPicker title="HEX to RGB Converter" subtitle="Convert hex color codes to RGB values instantly." defaultFocusFormat="hex" articleMode={true} />
    </>
  );
}
