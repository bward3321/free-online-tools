import type { Metadata } from "next";
import PasswordGenerator from "../password-generator/components/PasswordGenerator";

export const metadata: Metadata = {
  title: "Passphrase Generator — Create Memorable, Uncrackable Passphrases | EveryFreeTool",
  description: "Generate strong, memorable passphrases using the EFF Diceware wordlist. 5 random words = 64.6 bits of entropy. Customize separators, capitalization, and more. Free, no signup.",
  openGraph: { title: "Passphrase Generator — Memorable & Uncrackable", description: "Generate random word passphrases that are both strong and easy to remember. Powered by the EFF Diceware wordlist. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function PassphraseGeneratorPage() {
  const faqs = [
    { name: "What is a passphrase?", text: "A passphrase is a password made of random words, like \"correct-horse-battery-staple.\" Unlike traditional passwords, passphrases are both strong and memorable because human brains are better at remembering words than random character strings." },
    { name: "How many words do I need?", text: "4 words for moderate security (~51.7 bits), 5 words for strong security (~64.6 bits), 6 words for high security (~77.5 bits), and 7+ words for critical systems (~90+ bits). Each word adds approximately 12.9 bits of entropy." },
    { name: "What is the EFF Diceware wordlist?", text: "The Electronic Frontier Foundation created a curated list of 7,776 common English words specifically designed for passphrase generation. Each word is easy to spell, unambiguous, and familiar. The list is an industry standard for secure passphrase creation." },
    { name: "Are passphrases as strong as random passwords?", text: "Yes. A 5-word passphrase (~64.6 bits) is roughly equivalent to a 10-character fully random password. A 6-word passphrase (~77.5 bits) is stronger than most 12-character random passwords. The advantage is memorability." },
    { name: "When should I use a passphrase?", text: "Passphrases are ideal for master passwords (password manager, encryption keys), any password you need to type frequently, and situations where you can't use a password manager. They're especially good as the one password you need to memorize." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Passphrase Generator",
        url: "https://everyfreetool.com/utility-tools/passphrase-generator",
        description: "Generate strong, memorable passphrases using the EFF Diceware wordlist. Customize word count, separators, and capitalization. Free, 100% client-side.",
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
            <a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Utility Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Passphrase Generator &mdash; Create Memorable, Uncrackable Passphrases</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate random word passphrases that are both strong and easy to remember. Powered by the EFF Diceware wordlist with 7,776 carefully curated words.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Why Passphrases Beat Passwords</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The famous XKCD comic illustrated it perfectly: <strong style={{ color: "var(--text)" }}>&ldquo;correct horse battery staple&rdquo;</strong> is both easier to remember and harder to crack than <strong style={{ color: "var(--text)" }}>&ldquo;Tr0ub4dor&3&rdquo;</strong>. Random words provide high entropy while remaining memorable because our brains are wired to remember narratives, not arbitrary character strings.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Each word from the EFF wordlist adds approximately 12.9 bits of entropy (log&#8322;(7,776) &asymp; 12.92). Five words provide ~64.6 bits &mdash; equivalent to a strong random password. Six words (~77.5 bits) would take centuries to crack even with dedicated hardware.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How Many Words Do You Need?</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  "4 words (~51.7 bits) — Moderate security for low-value accounts",
                  "5 words (~64.6 bits) — Strong security, recommended minimum for important accounts",
                  "6 words (~77.5 bits) — High security for master passwords and encryption",
                  "7+ words (~90+ bits) — Maximum security for critical systems",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#059669", flexShrink: 0 }}>&#x2713;</span><span>{line}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Generate your passphrase below &mdash; passphrase mode is already selected.</p>
          </div>
        </div>
      </div>
      <PasswordGenerator title="Passphrase Generator" subtitle="Generate strong, memorable passphrases from the EFF Diceware wordlist." defaultMode="passphrase" articleMode={true} />
    </>
  );
}
