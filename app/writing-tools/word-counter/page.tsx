import type { Metadata } from "next";
import WordCounter from "./components/WordCounter";

export const metadata: Metadata = {
  title: "Word Counter — Count Words, Characters, and More Instantly | EveryFreeTool",
  description: "Count words, characters, sentences, paragraphs, reading time, and more in real-time. Check social media character limits, keyword density, and readability. Free, no signup.",
  openGraph: { title: "Word Counter — Instant Word & Character Count", description: "The fastest, cleanest word counter online. Real-time stats, social media limit checker, keyword density, readability scores. Free, no ads.", type: "website" },
  robots: "index, follow",
};

export default function WordCounterPage() {
  const faqs = [
    { name: "How does the word counter work?", text: "Type or paste your text into the editor. The tool counts words, characters, sentences, paragraphs, and more in real-time. All counting happens in your browser — your text is never sent to any server." },
    { name: "Does it count characters with or without spaces?", text: "Both. Total characters (including spaces) and characters without spaces are shown as separate stats. Social media platforms count spaces as characters." },
    { name: "What is reading time based on?", text: "Reading time uses the average adult reading speed of 238 words per minute (research from the Journal of Memory and Language). Speaking time uses 150 words per minute." },
    { name: "How is keyword density calculated?", text: "Keyword density is the percentage of times a word or phrase appears relative to total word count. For SEO, keep primary keyword density between 1-3%." },
    { name: "What are the social media character limits?", text: "X (Twitter): 280, Instagram caption: 2,200, LinkedIn post: 3,000, TikTok caption: 4,000, Facebook post: 63,206, Threads: 500, YouTube title: 100, YouTube description: 5,000." },
    { name: "Is my text stored?", text: "No. All processing happens in your browser. Your text is never transmitted, stored, or logged." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Word Counter",
        url: "https://everyfreetool.com/writing-tools/word-counter",
        description: "Count words, characters, sentences, paragraphs, reading time, keyword density, and readability in real-time. Free, no signup, 100% client-side.",
        applicationCategory: "UtilityApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: ["Word count", "Character count", "Sentence count", "Paragraph count", "Reading time", "Speaking time", "Keyword density", "Readability analysis", "Social media limits", "Text transformations", "File upload"],
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <WordCounter
        title="Word Counter — Count Words, Characters, and More Instantly"
        subtitle="Count words, characters, sentences, and paragraphs in real-time. Check social media limits, analyze keyword density, and measure readability. 100% client-side — your text never leaves your browser."
      />
    </>
  );
}
