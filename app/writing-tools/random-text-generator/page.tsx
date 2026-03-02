import type { Metadata } from "next";
import LoremIpsumGenerator from "../lorem-ipsum-generator/components/LoremIpsumGenerator";

export const metadata: Metadata = {
  title: "Free Random Text Generator Online — Custom Lengths | EveryFreeTool",
  description: "Generate random text in custom lengths. Specify exact paragraph, sentence, word, or character counts. 10 text flavors. Copy as plain text, HTML, or Markdown.",
  openGraph: { title: "Free Random Text Generator", description: "Generate random text with exact paragraph, sentence, word, or character counts. 10 styles. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function RandomTextGeneratorPage() {
  const faqs = [
    { name: "What is a random text generator used for?", text: "Random text generators are used for design mockups, testing form inputs, database seeding, layout validation, content length testing, and generating sample data for development environments." },
    { name: "Can I generate a specific number of characters?", text: "Yes. Select 'Characters' as the unit and enter your desired count. The output ends at the nearest word boundary so you never get cut-off text. Social media presets provide one-click fills for common limits." },
    { name: "Is the text truly random?", text: "The text is randomly assembled from curated word banks and sentence templates. Each generation produces different output. It reads naturally but is meaningless filler content." },
    { name: "Can I use this for testing form validation?", text: "Absolutely. Generate text at specific character counts to test input field limits, maximum lengths, and truncation behavior. The character mode is ideal for this." },
    { name: "What text styles are available?", text: "10 styles: Classic Latin (Lorem Ipsum), Business English, Tech Startup, Hipster, Pirate, Legal, Foodie, Sci-Fi, Office Jargon, and Motivational. Each has its own vocabulary and sentence patterns." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Random Text Generator", url: "https://everyfreetool.com/writing-tools/random-text-generator", description: "Generate random text with custom lengths. 10 text flavors. Free online tool.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Random Text Generator &mdash; Custom Paragraph & Sentence Lengths</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate random text with precise control over length. Set exact paragraph, sentence, word, or character counts in 10 text styles.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Random Text for Testing</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Random text is essential for testing software, validating layouts, and seeding development databases. Unlike hand-typed test data, generated text provides varied lengths and structures that expose edge cases. This tool gives you precise control over the amount &mdash; paragraphs, sentences, words, or exact character counts &mdash; in 10 distinct styles.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Precision Length Control</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Need exactly 160 characters for a meta description test? 3,000 characters for a LinkedIn post mockup? Set the exact count and the generator handles the rest, always ending at clean word boundaries. Social media presets fill common limits with one click.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Generate random text with custom lengths below.</p>
          </div>
        </div>
      </div>
      <LoremIpsumGenerator title="Random Text Generator" subtitle="Generate random text at precise lengths." articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">What Is the Random Text Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>This free tool generates random text with precise control over length and style. Specify exact paragraph, sentence, word, or character counts in any of 10 text flavors. The generated text is randomly assembled from curated word banks and sentence templates, producing natural-sounding output that&apos;s different every time. Copy as plain text, HTML, Markdown, or JSON for any testing or development need.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Choose a text flavor.</strong> Select Classic Latin or any of the 9 creative alternatives.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Set the exact amount.</strong> Enter a number and choose your unit: paragraphs, sentences, words, or characters.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Generate and copy.</strong> Click Generate, then copy in the format you need. Each generation produces unique output.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Four precision units.</strong> Generate by paragraph count for content areas, sentence count for descriptions, word count for labels, or exact character count for field testing. Character mode ends at clean word boundaries.</p>
              <p><strong style={{ color: "var(--text)" }}>Every generation is unique.</strong> The algorithm randomizes word selection, sentence structure, and paragraph length. Click Generate repeatedly and get different output each time.</p>
              <p><strong style={{ color: "var(--text)" }}>Developer-ready formats.</strong> Copy as JSON arrays for database seeding or API mocking. Use HTML output for CMS template testing. Markdown output works for documentation previews.</p>
              <p><strong style={{ color: "var(--text)" }}>Social media presets.</strong> Quick-fill buttons for Twitter/X, Instagram, LinkedIn, Meta Description, and more. One click sets the character count and auto-generates.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Common Use Cases for Random Text Generation</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Form validation testing.</strong> Generate text at specific character counts to test input field maximums, textarea limits, and truncation behavior. Does your UI gracefully handle 5,000 characters in a comment field?</p>
              <p><strong style={{ color: "var(--text)" }}>Database seeding.</strong> Copy JSON-formatted text to populate development databases with realistic-looking content. Use different flavors for different content types &mdash; Business for company descriptions, Foodie for restaurant reviews.</p>
              <p><strong style={{ color: "var(--text)" }}>Content layout testing.</strong> Fill real CMS templates with generated text to check typography, spacing, and responsive behavior. Toggle headings to test content hierarchy. Generate varying lengths to test how layouts handle short and long content.</p>
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
