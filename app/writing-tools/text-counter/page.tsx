import type { Metadata } from "next";
import WordCounter from "../word-counter/components/WordCounter";

export const metadata: Metadata = {
  title: "Text Counter — Analyze Any Text Instantly | EveryFreeTool",
  description: "Comprehensive text analysis: word count, character count, readability scores, keyword density, social media limits, and more. Real-time, free, no signup.",
  openGraph: { title: "Text Counter — Comprehensive Text Analysis", description: "Analyze any text instantly: words, characters, readability, keyword density, and social media fit. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function TextCounterPage() {
  const faqs = [
    { name: "What does this text counter analyze?", text: "Words, characters (with and without spaces), sentences, paragraphs, lines, reading time, speaking time, average word length, average sentence length, keyword density, Flesch readability score, grade level, and social media character limits." },
    { name: "How can text analysis improve my writing?", text: "Readability scores help you write for your audience — aim for Flesch 60-70 for general audiences. Keyword density helps with SEO optimization. Average sentence length reveals complexity — shorter sentences are generally clearer." },
    { name: "What is the Flesch Reading Ease score?", text: "A 0-100 scale measuring readability. Higher = easier. 60-70 is standard (8th-9th grade). Above 80 is very easy. Below 30 is graduate-level. It factors in sentence length and syllable count." },
    { name: "Is my text stored?", text: "No. All analysis happens in your browser using JavaScript. Nothing is transmitted or stored anywhere." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Text Counter",
        url: "https://everyfreetool.com/writing-tools/text-counter",
        description: "Comprehensive text analysis: words, characters, readability, keyword density, and social media limits. Free, 100% client-side.",
        applicationCategory: "UtilityApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)" }}>
            <a href="/" className="hover:underline" style={{ color: "#4F46E5" }}>Home</a><span>/</span><span>Writing Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Text Counter &mdash; Analyze Any Text Instantly</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Go beyond simple counting. Analyze your text for readability, keyword density, social media fit, and more &mdash; all in real-time as you type.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">More Than Just Counting</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Simple word counters tell you how many words you have. This tool tells you how your text <em>performs</em>. <strong style={{ color: "var(--text)" }}>Readability scores</strong> reveal whether your audience can easily understand your writing. <strong style={{ color: "var(--text)" }}>Keyword density</strong> shows whether your SEO keywords appear at the right frequency. <strong style={{ color: "var(--text)" }}>Social media checks</strong> tell you if your text fits within platform limits.</p>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Think of it as a writing dashboard: paste your text once, get insights across every dimension that matters.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Using Text Analysis to Improve Writing</h2>
              <div className="space-y-2" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
                {[
                  "Aim for Flesch Reading Ease of 60-70 for general audience content",
                  "Keep average sentence length under 20 words for clarity",
                  "Target 1-3% keyword density for primary SEO keywords",
                  "Check social media limits before publishing — write once, verify everywhere",
                  "Use reading time to set expectations in your content (e.g., '5-minute read')",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#4F46E5", flexShrink: 0 }}>&#x2713;</span><span>{tip}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#4F46E51a", borderColor: "#4F46E540" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste your text below for comprehensive analysis.</p>
          </div>
        </div>
      </div>
      <WordCounter title="Text Counter" subtitle="Comprehensive text analysis — words, characters, readability, keyword density, and more." articleMode={true} />
    </>
  );
}
