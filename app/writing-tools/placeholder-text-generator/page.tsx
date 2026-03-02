import type { Metadata } from "next";
import LoremIpsumGenerator from "../lorem-ipsum-generator/components/LoremIpsumGenerator";

export const metadata: Metadata = {
  title: "Free Placeholder Text Generator — Beyond Lorem Ipsum | EveryFreeTool",
  description: "Generate placeholder text in 10 unique styles: Business, Tech, Hipster, Pirate, Legal, Foodie, Sci-Fi, and more. Copy as text, HTML, or Markdown instantly.",
  openGraph: { title: "Free Placeholder Text Generator", description: "Generate placeholder text in 10 styles beyond Lorem Ipsum. Copy as text, HTML, or Markdown. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function PlaceholderTextGeneratorPage() {
  const faqs = [
    { name: "Why use alternatives to Lorem Ipsum?", text: "Alternative placeholder text can match your project's tone. Business mockups look more realistic with corporate language, while fun projects benefit from creative alternatives like Hipster or Pirate text. It also prevents stakeholders from confusing placeholder text with real content." },
    { name: "Is the generated text real content?", text: "No. All text is randomly assembled from word banks and sentence templates. It reads naturally but is meaningless filler text designed for layout testing, not for publication." },
    { name: "Can I generate placeholder text for forms?", text: "Yes. Use the character or word count modes to generate text at specific lengths. The social media presets are also useful for testing input fields with character limits." },
    { name: "What formats can I copy the text in?", text: "Four formats: plain text, HTML with paragraph tags, Markdown, and JSON arrays. Toggle HTML tags or headings for structured output suitable for CMS testing." },
    { name: "Is this tool free to use?", text: "Completely free with no signup. All generation happens in your browser — no data leaves your device. Use the generated text in any project without restrictions." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Placeholder Text Generator", url: "https://everyfreetool.com/writing-tools/placeholder-text-generator", description: "Generate placeholder text in 10 styles beyond Lorem Ipsum. Free online tool.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Placeholder Text Generator &mdash; 10 Styles Beyond Lorem Ipsum</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate placeholder text that matches your project&apos;s personality. 10 unique styles from corporate business language to swashbuckling pirate speak.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Beyond Generic Filler Text</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Standard Lorem Ipsum works, but placeholder text that matches your project&apos;s tone creates more realistic mockups. A financial dashboard mockup looks more convincing with business-sounding text. A gaming app prototype feels more authentic with sci-fi or pirate language. This tool lets you match your filler text to your audience.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Choosing the Right Style</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Use Business English for corporate sites and presentations. Tech Startup for SaaS products and developer tools. Hipster for lifestyle brands and creative agencies. Legal for contract and document templates. Foodie for restaurant and recipe sites. Match the placeholder tone to your final content for better design decisions.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Generate placeholder text in any style below.</p>
          </div>
        </div>
      </div>
      <LoremIpsumGenerator title="Placeholder Text Generator" subtitle="Generate placeholder text in 10 unique styles." defaultFlavor="business" articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">What Is the Placeholder Text Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>This free tool generates placeholder text in 10 distinct styles that go far beyond traditional Lorem Ipsum. Choose from Business English, Tech Startup, Hipster, Pirate, Legal, Foodie, Sci-Fi, Office Jargon, Motivational, or Classic Latin. Each flavor uses hundreds of curated words and varied sentence templates. Generate by paragraph, sentence, word, or character count, then copy as plain text, HTML, Markdown, or JSON.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Choose a text style.</strong> Select the flavor that best matches your project&apos;s tone from the pill buttons at the top.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Set how much text you need.</strong> Pick a number and unit (paragraphs, sentences, words, or characters). Social media presets provide one-click fills for common character limits.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Customize and copy.</strong> Toggle HTML tags or headings for structured output, then copy in your preferred format or download as a .txt file.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Tone-matched placeholder text.</strong> Each of the 10 styles uses its own curated vocabulary and sentence patterns. Business text sounds like a real company website. Legal text reads like a contract. The tone matches your project, creating more realistic mockups.</p>
              <p><strong style={{ color: "var(--text)" }}>Varied, natural output.</strong> No two generations are identical. The algorithm varies sentence length, structure, and word choice to produce text that looks and flows like natural writing.</p>
              <p><strong style={{ color: "var(--text)" }}>Character-precise generation.</strong> Need exactly 280 characters for a Twitter mockup? The character mode generates text that ends cleanly at word boundaries, never cutting off mid-word.</p>
              <p><strong style={{ color: "var(--text)" }}>Developer-friendly output.</strong> Copy as JSON arrays for programmatic use, HTML with proper tags for CMS testing, or Markdown for documentation mockups.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Choosing the Right Placeholder Text for Your Project</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>The right placeholder text depends on your audience and project stage. In early wireframing, classic Lorem Ipsum works fine because the focus is on layout structure, not content tone. But as mockups become higher fidelity, matching the placeholder text to the expected content tone helps stakeholders evaluate the design more accurately.</p>
              <p>For client presentations, use a flavor that matches the final product. A corporate website mockup with Business English text looks far more polished than one with random Latin. For internal prototypes and testing, fun flavors like Pirate or Hipster can make the work more engaging and help team members spot layout issues because the unusual text draws attention to the content areas.</p>
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
