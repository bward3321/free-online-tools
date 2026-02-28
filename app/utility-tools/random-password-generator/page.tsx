import type { Metadata } from "next";
import PasswordGenerator from "../password-generator/components/PasswordGenerator";

export const metadata: Metadata = {
  title: "Random Password Generator — Truly Random, Instantly Generated | EveryFreeTool",
  description: "Generate truly random passwords using crypto.getRandomValues() — the same CSPRNG used by password managers. Customize length, character types. Free, no signup, 100% client-side.",
  openGraph: { title: "Random Password Generator — CSPRNG-Powered", description: "Generate truly random passwords in your browser. Uses cryptographic randomness, not Math.random(). Free, instant, nothing stored.", type: "website" },
  robots: "index, follow",
};

export default function RandomPasswordGeneratorPage() {
  const faqs = [
    { name: "What makes this truly random?", text: "We use crypto.getRandomValues(), your browser's built-in Cryptographic Secure Pseudo-Random Number Generator. It draws entropy from your operating system's random number generator, which collects randomness from hardware events like mouse movements and keyboard timing. Unlike Math.random(), the output is cryptographically unpredictable." },
    { name: "Why does randomness matter for passwords?", text: "Humans are terrible at creating random passwords. We gravitate toward dictionary words, personal information, and predictable patterns. A 2024 study found '123456' and 'password' remain among the most commonly used passwords. True randomness eliminates human bias entirely." },
    { name: "How many characters should I use?", text: "16 characters minimum for important accounts. Each additional character multiplies the time needed to crack the password. An 8-character password can be cracked in under an hour with modern GPUs; a 16-character one would take centuries." },
    { name: "What character types should I include?", text: "All four types (uppercase, lowercase, numbers, symbols) by default. Each type increases the character pool, which increases entropy per character. However, length matters more than complexity — a 20-character lowercase password is stronger than an 8-character one with all types." },
    { name: "How do I store these passwords?", text: "Use a password manager like Bitwarden (free, open-source), 1Password, or KeePass. Generate a unique random password for every account, and let the password manager remember them. You only need to memorize one strong master password." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Random Password Generator",
        url: "https://everyfreetool.com/utility-tools/random-password-generator",
        description: "Generate truly random passwords using cryptographic randomness. Customize length and character types. Free, 100% client-side.",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Random Password Generator &mdash; Truly Random, Instantly Generated</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate passwords with real cryptographic randomness — not the predictable pseudo-randomness of Math.random(). Every character is selected using your browser&apos;s CSPRNG.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">&ldquo;Random&rdquo; vs. Truly Random</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Not all randomness is equal. JavaScript&apos;s <code>Math.random()</code> uses a deterministic algorithm &mdash; given the same seed, it produces the same sequence every time. An attacker who knows the algorithm and seed can predict every &ldquo;random&rdquo; value it produces.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}><code>crypto.getRandomValues()</code> is fundamentally different. It draws from your operating system&apos;s entropy pool &mdash; a mix of hardware events like mouse movements, keyboard timing, disk I/O, and thermal noise. The result is cryptographically unpredictable, even to an attacker with full knowledge of the algorithm.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Best Practices for Random Passwords</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  "Use 16+ characters — every additional character makes cracking exponentially harder",
                  "Include all character types (uppercase, lowercase, numbers, symbols) for maximum entropy per character",
                  "Generate a unique password for every account — never reuse passwords across services",
                  "Store passwords in a manager (Bitwarden, 1Password, KeePass) — don't try to memorize random strings",
                  "Enable 2FA wherever possible — even the strongest password can be phished",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#059669", flexShrink: 0 }}>&#x2713;</span><span>{tip}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>A random password is already generated below &mdash; copy it or customize the settings.</p>
          </div>
        </div>
      </div>
      <PasswordGenerator title="Random Password Generator" subtitle="Truly random passwords powered by your browser's CSPRNG. Free, instant, nothing stored." defaultMode="random" articleMode={true} />
    </>
  );
}
