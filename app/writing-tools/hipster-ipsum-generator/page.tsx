import type { Metadata } from "next";
import LoremIpsumGenerator from "../lorem-ipsum-generator/components/LoremIpsumGenerator";

export const metadata: Metadata = {
  title: "Free Hipster Ipsum Generator — Trendy Placeholder Text | EveryFreeTool",
  description: "Generate hipster-themed placeholder text full of craft coffee, vinyl records, and artisanal vibes. Fun alternative to Lorem Ipsum. Free and instant.",
  openGraph: { title: "Free Hipster Ipsum Generator", description: "Generate hipster placeholder text with artisanal vibes. Fun Lorem Ipsum alternative. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function HipsterIpsumGeneratorPage() {
  const faqs = [
    { name: "What is Hipster Ipsum?", text: "Hipster Ipsum is placeholder text themed around hipster culture — craft coffee, vinyl records, artisanal everything, sustainable living, and vintage aesthetics. It's a fun, engaging alternative to standard Lorem Ipsum." },
    { name: "When should I use Hipster Ipsum?", text: "Use it for creative agencies, lifestyle brands, coffee shop websites, boutique shops, design portfolios, and any project with a trendy, artisanal vibe. It makes mockups more engaging than standard Latin filler." },
    { name: "Is it appropriate for client presentations?", text: "It depends on the client. For creative and lifestyle brands, Hipster Ipsum adds personality to mockups. For corporate or financial clients, stick with Business Ipsum or classic Lorem Ipsum instead." },
    { name: "How many words are in the hipster vocabulary?", text: "The hipster word bank contains hundreds of curated terms including nouns (pour-over, vinyl, typewriter), adjectives (artisanal, small-batch, curated), verbs (curate, ferment, forage), and full phrases (Edison bulb lighting, slow living)." },
    { name: "Can I generate Hipster Ipsum as HTML?", text: "Yes. Toggle 'Include HTML tags' to wrap the output in proper HTML paragraph tags. Toggle 'Include headings' to add section headers like 'Our Philosophy' and 'The Process' between paragraphs." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Hipster Ipsum Generator", url: "https://everyfreetool.com/writing-tools/hipster-ipsum-generator", description: "Generate hipster-themed placeholder text. Fun Lorem Ipsum alternative. Free online tool.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Hipster Ipsum Generator &mdash; Artisanal Placeholder Text</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate hipster-themed placeholder text full of craft coffee, vinyl records, and artisanal vibes. A fun alternative to traditional Lorem Ipsum.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Artisanal Filler Text</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Hipster Ipsum fills your mockups with the language of craft culture &mdash; pour-over coffee, vintage typewriters, artisanal sourdough, and sustainable living. It&apos;s perfect for lifestyle brands, creative agencies, and any project that deserves more personality than generic Latin text.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">When Fun Placeholder Text Fits</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Creative projects, internal mockups, and early-stage prototypes benefit from engaging placeholder text. Team members pay more attention to layout details when the filler text is entertaining. It also helps establish visual tone &mdash; hipster vocabulary naturally pairs with the typography and imagery of lifestyle designs.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Generate artisanal placeholder text below.</p>
          </div>
        </div>
      </div>
      <LoremIpsumGenerator title="Hipster Ipsum Generator" subtitle="Generate artisanal placeholder text." defaultFlavor="hipster" articleMode={true} />
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-12">
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">What Is the Hipster Ipsum Generator?</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>This free tool generates placeholder text themed around hipster and craft culture. The vocabulary includes artisanal goods, single-origin coffee, vinyl records, sustainable living, vintage aesthetics, and minimalist lifestyle language. Each generation produces unique, natural-sounding text assembled from hundreds of curated words and varied sentence templates. Copy as plain text, HTML, Markdown, or JSON.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">How to Use This Tool</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Step 1: Set the amount.</strong> Choose paragraphs, sentences, words, or characters. The Hipster flavor is pre-selected.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 2: Customize the output.</strong> Toggle headings for section titles like &ldquo;Our Philosophy&rdquo; and &ldquo;The Process.&rdquo; Toggle HTML tags for markup output.</p>
              <p><strong style={{ color: "var(--text)" }}>Step 3: Generate and copy.</strong> Click Generate for new text each time. Copy in your preferred format.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Key Features</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p><strong style={{ color: "var(--text)" }}>Curated hipster vocabulary.</strong> Hundreds of terms spanning artisanal food, sustainable living, vintage aesthetics, craft beverages, and minimalist lifestyle. The text captures the authentic tone of hipster culture.</p>
              <p><strong style={{ color: "var(--text)" }}>Themed headings.</strong> Enable the headings toggle for titles like &ldquo;Our Philosophy,&rdquo; &ldquo;Sourcing &amp; Origins,&rdquo; &ldquo;Community,&rdquo; and &ldquo;Workshop Events&rdquo; &mdash; perfect for lifestyle brand mockups.</p>
              <p><strong style={{ color: "var(--text)" }}>Engaging and memorable.</strong> Unlike generic Latin text, hipster placeholder text is fun to read. This keeps designers and reviewers engaged during the mockup phase and helps catch layout issues that might be overlooked with boring filler text.</p>
              <p><strong style={{ color: "var(--text)" }}>All standard features included.</strong> Social media presets, character-precise generation, HTML/Markdown/JSON output, word and character counts, and download support. Everything you need for any mockup or testing scenario.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">The Rise of Fun Lorem Ipsum Alternatives</h2>
            <div className="space-y-4 rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
              <p>Hipster Ipsum is part of a broader trend of themed placeholder text generators that emerged in the early 2010s. As designers grew tired of the same Latin text, creative alternatives appeared &mdash; Bacon Ipsum, Cupcake Ipsum, Samuel L. Ipsum, and dozens more. These tools recognized that placeholder text doesn&apos;t have to be boring.</p>
              <p>Fun placeholder text serves a practical purpose beyond entertainment. When mockup text is memorable and distinct, it&apos;s harder for stakeholders to mistake it for real content. This prevents the common problem of placeholder text accidentally shipping in production. Themed text also helps establish visual tone early in the design process, making it easier to evaluate whether a layout matches the brand&apos;s personality.</p>
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
