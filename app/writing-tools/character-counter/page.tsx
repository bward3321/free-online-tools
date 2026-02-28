import type { Metadata } from "next";
import WordCounter from "../word-counter/components/WordCounter";

export const metadata: Metadata = {
  title: "Character Counter — Count Characters With and Without Spaces | EveryFreeTool",
  description: "Count characters in your text with and without spaces. Check against social media limits for Twitter, Instagram, LinkedIn, and more. Real-time, free, no signup.",
  openGraph: { title: "Character Counter — Real-Time Character Count", description: "Count characters with and without spaces. Check against every social media platform's limit. Free, instant, no signup.", type: "website" },
  robots: "index, follow",
};

export default function CharacterCounterPage() {
  const faqs = [
    { name: "What is a character counter?", text: "A character counter counts every character in your text, including letters, numbers, spaces, punctuation, and special characters. This tool shows both total characters and characters without spaces." },
    { name: "Why does character count matter?", text: "Social media platforms, SMS messages, SEO meta tags, and ad copy all have character limits. Twitter allows 280 characters, Instagram captions allow 2,200, and Google meta titles should be 50-60 characters." },
    { name: "Do spaces count as characters?", text: "Yes, spaces are characters. Most platforms (Twitter, Instagram, LinkedIn) count spaces toward their character limits. This tool shows both total characters and characters without spaces." },
    { name: "What's the difference between characters and letters?", text: "Characters include everything: letters, numbers, spaces, punctuation, and symbols. Letters are specifically a-z and A-Z. This tool counts characters; use the total minus spaces, numbers, and punctuation for a letter count." },
    { name: "Is my text stored?", text: "No. All counting happens in your browser. Your text is never sent to any server." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Character Counter",
        url: "https://everyfreetool.com/writing-tools/character-counter",
        description: "Count characters with and without spaces. Check against social media platform limits. Free, real-time, 100% client-side.",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Character Counter &mdash; Count Characters With and Without Spaces</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Count characters in real-time as you type or paste. See totals with and without spaces, and check your text against every social media platform&apos;s character limit.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Why Character Count Matters</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Character limits are everywhere online. <strong style={{ color: "var(--text)" }}>X (Twitter)</strong> limits posts to 280 characters. <strong style={{ color: "var(--text)" }}>Instagram</strong> captions max out at 2,200 characters, but only the first 125 are visible before &ldquo;More.&rdquo; <strong style={{ color: "var(--text)" }}>Google</strong> truncates meta titles after about 60 characters and meta descriptions after 160.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Writing to these limits is part craft, part math. A character counter lets you see exactly where you stand against every platform simultaneously, so you can write once and check everywhere.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Characters vs. Characters Without Spaces</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Most platforms count spaces as characters. When checking against a Twitter limit of 280, &ldquo;Hello World&rdquo; counts as 11 characters (including the space), not 10. However, some contexts &mdash; like SMS billing or certain form fields &mdash; count only non-space characters.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>This tool shows both counts prominently so you always have the right number for your use case.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#4F46E51a", borderColor: "#4F46E540" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Start typing or paste your text below to count characters instantly.</p>
          </div>
        </div>
      </div>
      <WordCounter title="Character Counter" subtitle="Count characters with and without spaces. Check against social media limits." articleMode={true} expandSocial={true} />
    </>
  );
}
