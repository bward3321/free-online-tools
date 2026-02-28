import type { Metadata } from "next";
import WordCounter from "../word-counter/components/WordCounter";

export const metadata: Metadata = {
  title: "Letter Counter — Count Letters in Your Text Online | EveryFreeTool",
  description: "Count letters, words, characters, sentences, and paragraphs in your text. Real-time letter counting with reading time and readability analysis. Free, no signup.",
  openGraph: { title: "Letter Counter — Count Letters Online Free", description: "Count letters in any text instantly. Also shows words, characters, sentences, reading time, and readability. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function LetterCounterPage() {
  const faqs = [
    { name: "What is a letter counter?", text: "A letter counter counts the alphabetic letters (a-z, A-Z) in your text. This tool also counts total characters (including numbers, spaces, and punctuation), words, sentences, and more." },
    { name: "What's the difference between letters and characters?", text: "Letters are specifically alphabetic characters (a-z, A-Z). Characters include everything: letters, numbers, spaces, punctuation, and symbols. 'Hello 123!' has 5 letters but 10 characters." },
    { name: "When does letter count matter?", text: "Letter counting is relevant in academic contexts, Scrabble scoring, crossword construction, typography, and any situation where you need to know the exact count of alphabetic characters." },
    { name: "Is my text stored?", text: "No. All counting happens in your browser. Your text is never sent to any server or stored anywhere." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Letter Counter",
        url: "https://everyfreetool.com/writing-tools/letter-counter",
        description: "Count letters in your text online. Also counts words, characters, sentences, and paragraphs with reading time and readability analysis.",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Letter Counter &mdash; Count Letters in Your Text Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Count letters, words, characters, sentences, and paragraphs in real-time. Includes reading time estimates and readability analysis.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Letters vs. Characters</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>A <strong style={{ color: "var(--text)" }}>letter</strong> is an alphabetic character: a through z (uppercase or lowercase). A <strong style={{ color: "var(--text)" }}>character</strong> is anything that takes up a position in text: letters, numbers, spaces, punctuation marks, and special symbols.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>For example, the sentence &ldquo;Hello, World! 123&rdquo; contains <strong style={{ color: "var(--text)" }}>10 letters</strong> (H-e-l-l-o-W-o-r-l-d), but <strong style={{ color: "var(--text)" }}>17 characters</strong> (including the comma, space, exclamation mark, space, and three digits).</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">When Letter Count Matters</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  "Academic writing — some style guides specify letter counts for abstracts",
                  "Scrabble and word games — scoring depends on specific letters used",
                  "Crossword construction — grid entries must be exact letter counts",
                  "Typography and design — character width calculations for layouts",
                  "Cryptography — letter frequency analysis for codebreaking",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#4F46E5", flexShrink: 0 }}>&#x2713;</span><span>{item}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#4F46E51a", borderColor: "#4F46E540" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste or type your text below to count letters instantly.</p>
          </div>
        </div>
      </div>
      <WordCounter title="Letter Counter" subtitle="Count letters, words, characters, and more in real-time." articleMode={true} />
    </>
  );
}
