import type { Metadata } from "next";
import WordCounter from "../word-counter/components/WordCounter";

export const metadata: Metadata = {
  title: "Word Count Tool — Check Your Word Count Free Online | EveryFreeTool",
  description: "Check your word count instantly. See words, characters, sentences, paragraphs, reading time, and speaking time. Supports file upload. Free, no signup.",
  openGraph: { title: "Word Count Tool — Free Online Word Counter", description: "Check your word count in real-time. See reading time, keyword density, and readability. Free, instant, no signup.", type: "website" },
  robots: "index, follow",
};

export default function WordCountPage() {
  const faqs = [
    { name: "How does word counting work?", text: "A word is defined as any sequence of characters separated by whitespace (spaces, tabs, or line breaks). The tool splits your text on whitespace and counts the resulting segments, filtering out empty entries." },
    { name: "What is the word count for a typical blog post?", text: "SEO-optimized blog posts typically range from 1,500-2,500 words. Shorter posts (500-1,000) work for news updates. Long-form content (3,000+) is effective for comprehensive guides and pillar pages." },
    { name: "How many words is a 5-minute speech?", text: "At the average speaking rate of 150 words per minute, a 5-minute speech is approximately 750 words. A 10-minute presentation is about 1,500 words. This tool calculates speaking time for your text automatically." },
    { name: "What's the word count for a college essay?", text: "The Common App essay requires 250-650 words. Short essays are typically 500-1,000 words. Research papers range from 3,000-8,000 words depending on the field and assignment." },
    { name: "Is my text stored?", text: "No. All counting happens locally in your browser. Nothing is sent to any server." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Word Count Tool",
        url: "https://everyfreetool.com/writing-tools/word-count",
        description: "Check your word count instantly. Words, characters, sentences, paragraphs, reading time, speaking time. Free, 100% client-side.",
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
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            <a href="/" className="hover:underline" style={{ color: "#4F46E5" }}>Home</a><span>/</span><span>Writing Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Word Count Tool &mdash; Check Your Word Count Free Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste your text to see word count, character count, reading time, speaking time, and more. Real-time updates as you type.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Common Word Count Requirements</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Word counts are a standard requirement across writing contexts. <strong style={{ color: "var(--text)" }}>Academic essays</strong> typically range from 250 words (short response) to 8,000+ words (research papers). <strong style={{ color: "var(--text)" }}>Blog posts</strong> optimized for SEO typically target 1,500-2,500 words. <strong style={{ color: "var(--text)" }}>Business documents</strong> like cover letters should stay between 250-400 words.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Knowing your word count helps you meet requirements, estimate reading and speaking times, and optimize content length for your audience and platform.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Reading Time &amp; Speaking Time</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Average adults read at about <strong style={{ color: "var(--text)" }}>238 words per minute</strong> (research from the Journal of Memory and Language). A 1,000-word blog post takes about 4 minutes to read. A 5,000-word guide takes about 21 minutes.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>For presentations, the average speaking pace is <strong style={{ color: "var(--text)" }}>150 words per minute</strong>. A 10-minute talk needs about 1,500 words. This tool calculates both automatically from your word count.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#4F46E51a", borderColor: "#4F46E540" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your text below to check the word count instantly.</p>
          </div>
        </div>
      </div>
      <WordCounter title="Word Count Tool" subtitle="Check your word count, reading time, and speaking time. Free and instant." articleMode={true} />
    </>
  );
}
