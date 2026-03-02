import type { Metadata } from "next";
import LoremIpsumGenerator from "../lorem-ipsum-generator/components/LoremIpsumGenerator";

export const metadata: Metadata = {
  title: "Free Dummy Text Generator — Filler Text for Design Mockups | EveryFreeTool",
  description: "Generate dummy text for design mockups, wireframes, and prototypes. 10 text styles, multiple formats, custom lengths. Free and instant.",
  openGraph: { title: "Free Dummy Text Generator", description: "Generate dummy text for design mockups and prototypes. 10 styles, multiple formats. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function DummyTextGeneratorPage() {
  const faqs = [
    { name: "What is dummy text used for?", text: "Dummy text fills content areas in design mockups, wireframes, and prototypes before real content is written. It helps designers evaluate typography, spacing, and layout without waiting for copywriting." },
    { name: "Can I use this for Figma or Sketch mockups?", text: "Yes. Generate the text here, copy it, and paste directly into your design tool. Use character or word count modes to match specific text field sizes in your mockups." },
    { name: "Is this better than Figma's built-in Lorem Ipsum?", text: "This tool offers 10 text flavors instead of just standard Latin, plus HTML, Markdown, and JSON output. You can also generate exact character counts for testing input fields and character limits." },
    { name: "How do I generate text for a specific layout?", text: "Use paragraph mode for body content areas, sentence mode for short descriptions, word mode for labels and tags, and character mode for fields with strict length limits. The heading toggle adds h2/h3 structure for testing content hierarchy." },
    { name: "Is the generated text random each time?", text: "Yes. Every click of Generate produces different output. The algorithm varies sentence length, word choice, and structure so you never get identical blocks of text." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Dummy Text Generator", url: "https://everyfreetool.com/writing-tools/dummy-text-generator", description: "Generate dummy text for design mockups and prototypes. 10 styles. Free online tool.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Dummy Text Generator for Designers & Developers</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate filler text for design mockups, wireframes, and prototypes. 10 text styles, multiple formats, custom lengths.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Dummy Text for Design Workflows</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Dummy text is essential for evaluating typography, spacing, and content hierarchy in mockups. It shows how a design will look with real content before the content exists. This tool generates filler text in 10 distinct styles, letting you match the placeholder&apos;s tone to your project for more realistic prototypes.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Tips for Realistic Mockups</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Use paragraph counts that match expected content length. Vary the amount per section &mdash; hero text needs 1-2 sentences, body sections need 2-3 paragraphs, and sidebars need short snippets. Enable headings to test content hierarchy. Matching the placeholder length to real-world content makes design reviews more productive.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Generate dummy text for your mockups below.</p>
          </div>
        </div>
      </div>
      <LoremIpsumGenerator title="Dummy Text Generator" subtitle="Generate filler text for mockups and prototypes." articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">What Is the Dummy Text Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>This free tool generates dummy text for design and development workflows. Choose from 10 text flavors &mdash; from classic Lorem Ipsum to Business, Tech, Pirate, and more &mdash; to create filler text that matches your project&apos;s personality. Generate by paragraph, sentence, word, or exact character count, then copy as text, HTML, Markdown, or JSON. Ideal for Figma mockups, wireframes, prototypes, and layout testing.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Select a text style.</strong> Pick a flavor that fits your project. Classic Latin for traditional mockups, Business for corporate designs, or a creative alternative for personality-driven projects.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Set the length.</strong> Choose paragraphs for body content areas, sentences for descriptions, words for labels, or characters for input field testing.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Copy in your preferred format.</strong> Plain text for design tools, HTML for CMS testing, Markdown for documentation, or JSON for programmatic use.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Design-ready output.</strong> Generate text at precise lengths for specific mockup areas. Need exactly 3 paragraphs for a blog post section? 280 characters for a tweet mockup? Set the count and the tool delivers the exact amount.</p>
              <p><strong style={{ color: "var(--text)" }}>Structured content testing.</strong> Toggle headings to insert h2 and h3 elements between paragraphs. This tests your typography hierarchy with realistic content structure, not just flat paragraphs.</p>
              <p><strong style={{ color: "var(--text)" }}>Multiple copy formats.</strong> One generation, four export options. Copy as plain text to paste into Figma. Copy HTML for CMS templates. Copy Markdown for documentation. Copy JSON for data-driven components.</p>
              <p><strong style={{ color: "var(--text)" }}>Instant word and character counts.</strong> The live counter in the output area shows the exact word and character count, saving you from having to count manually when filling specific layout areas.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Best Practices for Using Dummy Text in Design</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>The most important rule: use dummy text at realistic lengths. If your final blog posts will be 800 words, don&apos;t mockup with 2 sentences. If product descriptions will be 50 words, don&apos;t fill the space with 3 paragraphs. Realistic lengths expose real layout issues &mdash; text overflow, truncation problems, and spacing inconsistencies.</p>
              <p>Test edge cases too. Generate very short text (1-2 words) and very long text (20+ paragraphs) for the same layout. This reveals how your design handles extremes. Many designs look perfect with medium-length content but break with single-word titles or extremely long descriptions.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map(f => (
                <details key={f.name} className="rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <summary className="p-4 cursor-pointer font-semibold" style={{ fontSize: "17px" }}>{f.name}</summary>
                  <p className="px-4 pb-4" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>{f.text}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
