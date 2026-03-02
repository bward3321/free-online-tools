import type { Metadata } from "next";
import LoremIpsumGenerator from "./components/LoremIpsumGenerator";

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator — 10 Text Styles & Multiple Formats | EveryFreeTool",
  description: "Generate Lorem Ipsum and creative placeholder text in 10 styles. Classic Latin, Business English, Tech, Hipster, Pirate & more. Copy as plain text, HTML, or Markdown. Free, instant, no signup.",
  openGraph: { title: "Free Lorem Ipsum Generator", description: "Generate placeholder text in 10 styles. Classic Latin, Business, Tech, Hipster, Pirate & more. Copy as text, HTML, or Markdown. Free.", type: "website" },
  robots: "index, follow",
};

export default function LoremIpsumGeneratorPage() {
  const faqs = [
    { name: "Is this Lorem Ipsum generator free?", text: "Completely free, no signup, no limits. Everything runs in your browser — nothing is sent to any server. Generate as much text as you need." },
    { name: "How is this different from lipsum.com?", text: "This generator offers 10 text flavors beyond classic Latin, including Business, Tech, Hipster, Pirate, Legal, and more. It also outputs in multiple formats (HTML, Markdown, JSON) and includes social media character presets." },
    { name: "Can I use the generated text commercially?", text: "Yes. All generated text is random placeholder content with no copyright restrictions. Use it freely in any project — personal, commercial, or open-source." },
    { name: "What output formats are available?", text: "Four formats: Plain Text, HTML (with paragraph tags), Markdown, and JSON (array of paragraphs). You can also toggle HTML tags and headings in the output." },
    { name: "How many paragraphs can I generate at once?", text: "Up to 50 paragraphs, sentences, or words per generation. For character-based generation, you can specify exact character counts." },
    { name: "Does the generator work offline?", text: "Yes. Once the page loads, all text generation happens locally in your browser with zero external API calls. It works without an internet connection." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Lorem Ipsum Generator",
        url: "https://everyfreetool.com/writing-tools/lorem-ipsum-generator",
        description: "Generate Lorem Ipsum and placeholder text in 10 styles. Copy as text, HTML, Markdown, or JSON.",
        applicationCategory: "UtilityApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        browserRequirements: "Requires JavaScript. Works in all modern browsers.",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <LoremIpsumGenerator
        title="Free Lorem Ipsum Generator"
        subtitle="Generate placeholder text in 10 styles — Classic Latin, Business, Tech, Hipster, Pirate & more. Copy as text, HTML, Markdown, or JSON."
      />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">What Is the Lorem Ipsum Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>This free tool generates placeholder text in 10 distinct styles. The classic Lorem Ipsum Latin text is included alongside creative alternatives like Business English, Tech Startup jargon, Hipster speak, Pirate language, Legal terminology, Foodie vocabulary, Sci-Fi prose, Office jargon, and Motivational phrases. Generate by paragraph, sentence, word, or exact character count. Copy as plain text, HTML with tags, Markdown, or JSON. Social media presets instantly fill common character limits.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How to Use This Generator</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Pick a flavor.</strong> Select from 10 text styles. Classic Latin for traditional mockups, Business for corporate designs, or any creative alternative that matches your project&apos;s personality.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Set the amount.</strong> Choose how many paragraphs, sentences, words, or characters to generate. Use social media presets for quick character-limit fills.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Customize options.</strong> Toggle &ldquo;Start with Lorem ipsum&rdquo; for the classic opening, &ldquo;Include HTML tags&rdquo; for markup output, or &ldquo;Include headings&rdquo; to add heading structure.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 4: Copy or download.</strong> Click Copy Text for plain text, Copy HTML for tagged output, Copy Markdown, Copy JSON, or Download as a .txt file.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>10 text flavors.</strong> Go beyond standard Latin lorem ipsum. Business English sounds like a real company website. Tech Startup reads like a pitch deck. Pirate text adds swashbuckling fun to mockups. Each flavor uses hundreds of curated words and varied sentence templates to produce natural-sounding output.</p>
              <p><strong style={{ color: "var(--text)" }}>Multiple output formats.</strong> Copy as plain text, HTML with proper paragraph tags, Markdown with heading syntax, or JSON arrays for programmatic use. The HTML and heading toggles let you generate structured content ready for CMS testing.</p>
              <p><strong style={{ color: "var(--text)" }}>Social media presets.</strong> One-click presets for Twitter/X (280 chars), Instagram (2,200 chars), LinkedIn (3,000 chars), Meta Description (160 chars), and more. Instantly fill common character limits without manual counting.</p>
              <p><strong style={{ color: "var(--text)" }}>Flexible generation units.</strong> Generate by paragraphs (1-50), sentences, words, or exact character count. Character mode truncates cleanly at word boundaries so you never get cut-off text.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">The History of Lorem Ipsum</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>Lorem Ipsum traces its origins to a work by the Roman philosopher Cicero, written in 45 BC. The text comes from sections 1.10.32 and 1.10.33 of &ldquo;De Finibus Bonorum et Malorum&rdquo; (On the Ends of Good and Evil), a treatise on the theory of ethics. A Latin scholar named Richard McClintock discovered the connection in the 1960s by tracing the word &ldquo;consectetur&rdquo; back to the original passage.</p>
              <p>The standard Lorem Ipsum passage used since the 1500s is a scrambled version of Cicero&apos;s text. A typesetter likely scrambled it to create a specimen book of type. By the 1960s, Letraset transfer sheets popularized it, and desktop publishing software like Aldus PageMaker adopted it in the 1980s. Today it remains the industry standard for placeholder text in web design, print layout, and application mockups.</p>
              <p>While classic Lorem Ipsum works well because readers don&apos;t mistake it for real content, modern alternatives like those in this tool can match your project&apos;s tone. A business mockup looks more realistic with corporate-sounding placeholder text. A playful app feels more authentic with fun alternatives.</p>
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
