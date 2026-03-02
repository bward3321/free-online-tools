import type { Metadata } from "next";
import PasswordGenerator from "../password-generator/components/PasswordGenerator";

export const metadata: Metadata = {
  title: "PIN Generator — Random, Secure PINs for Any Use | EveryFreeTool",
  description: "Generate truly random PINs using cryptographic randomness. 4-digit, 6-digit, 8-digit, or custom length. For phone locks, 2FA backup codes, ATMs. Free, no signup.",
  openGraph: { title: "PIN Generator — Random, Secure PINs", description: "Generate truly random PINs for phone locks, 2FA, ATMs, and safes. CSPRNG-powered, no patterns, no bias. Free and instant.", type: "website" },
  robots: "index, follow",
};

export default function PinGeneratorPage() {
  const faqs = [
    { name: "When should I use a PIN?", text: "PINs are appropriate for phone unlock screens, 2FA backup codes, ATM cards, safe boxes, and alarm systems. They should NOT be used as primary passwords for online accounts — they don't have enough entropy to resist modern cracking." },
    { name: "How many combinations does a PIN have?", text: "A 4-digit PIN has 10,000 possible combinations. A 6-digit PIN has 1,000,000. An 8-digit PIN has 100,000,000. A computer can try all 4-digit combinations in under a second, which is why PINs rely on rate-limiting (locking after failed attempts) for security." },
    { name: "What PINs should I avoid?", text: "Never use birth years, addresses, repeated digits (1111), sequential digits (1234, 4321), or common patterns (0000, 1234, 1111, 0852). These are the first combinations attackers try. A truly random PIN avoids all patterns." },
    { name: "How is this PIN generated?", text: "Each digit is independently selected using crypto.getRandomValues(), your browser's built-in CSPRNG. This ensures no patterns, no bias, and true mathematical randomness. The PIN is generated in your browser and never sent to any server." },
    { name: "How can I remember a random PIN?", text: "Try creating a mental image or story from the digits. For example, 8372 could be '83 birds ate 72 worms.' Repetition also helps — practice entering the PIN several times. Never write it on the device it protects or store it near the device." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "PIN Generator",
        url: "https://everyfreetool.com/utility-tools/pin-generator",
        description: "Generate truly random PINs for phone locks, 2FA, ATMs, and safes. CSPRNG-powered, no patterns, no bias. Free and instant.",
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
            <a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Utility Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">PIN Generator &mdash; Random, Secure PINs for Any Use</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate truly random PINs for phone locks, 2FA backup codes, ATMs, safe boxes, and alarm systems. No patterns, no bias &mdash; just pure cryptographic randomness.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">When PINs Are Appropriate</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>PINs provide a limited level of security that relies on <strong style={{ color: "var(--text)" }}>rate-limiting</strong> &mdash; the device locks after a few failed attempts. A 4-digit PIN has only 10,000 possible combinations, which a computer could try exhaustively in under a second. But when a phone locks after 10 wrong guesses, an attacker gets 10 chances out of 10,000 &mdash; a 0.1% success rate.</p>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>This makes PINs appropriate for <strong style={{ color: "var(--text)" }}>physical devices</strong> (phones, ATMs, safes) where rate-limiting is enforced by hardware. They should never be used as passwords for online accounts, where an attacker may obtain the hashed PIN and crack it offline.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Common PIN Mistakes</h2>
              <div className="space-y-2" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
                {[
                  "Birth years (1990, 1985) — among the first guesses attackers try",
                  "Sequential digits (1234, 4321, 0123) — the most common PINs worldwide",
                  "Repeated digits (1111, 0000, 7777) — trivial to guess",
                  "Phone keypad patterns (2580, 0852) — visible as swipe patterns",
                  "Addresses or zip codes — easily found via social engineering",
                ].map((mistake, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#DC2626", flexShrink: 0 }}>✕</span><span>{mistake}</span></div>
                ))}
              </div>
              <p className="mt-3 leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>A truly random PIN avoids all of these patterns. Every digit is independently selected with equal probability.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Generate your random PIN below &mdash; PIN mode is already selected.</p>
          </div>
        </div>
      </div>
      <PasswordGenerator title="PIN Generator" subtitle="Generate truly random PINs for phone locks, 2FA, ATMs, and safes." defaultMode="pin" articleMode={true} />
    </>
  );
}
