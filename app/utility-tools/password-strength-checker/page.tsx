import type { Metadata } from "next";
import PasswordGenerator from "../password-generator/components/PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Strength Checker — How Long Would It Take to Crack? | EveryFreeTool",
  description: "Check how strong your password really is. See crack time estimates for online and offline attacks, pattern analysis, and entropy calculation. Powered by zxcvbn. 100% client-side.",
  openGraph: { title: "Password Strength Checker — Real Crack Time Estimates", description: "Find out how long it would take to crack your password. Powered by Dropbox's zxcvbn library. 100% client-side — your password never leaves your browser.", type: "website" },
  robots: "index, follow",
};

export default function PasswordStrengthCheckerPage() {
  const faqs = [
    { name: "How does the strength checker work?", text: "We use zxcvbn, an open-source library developed by Dropbox and peer-reviewed at USENIX Security 2016. Unlike simple rule-based checkers, zxcvbn evaluates passwords the way real attackers do — detecting dictionary words, common names, dates, keyboard patterns, l33t speak, and repeated characters." },
    { name: "Does my password leave my browser?", text: "No. All analysis runs entirely in your browser using JavaScript. No data is sent to any server. You can verify this by opening your browser's network tab while using the checker." },
    { name: "What do the crack time estimates mean?", text: "We show four attack scenarios: rate-limited online (100 attempts/hour), unrestricted online (10/second), slow offline hash (10,000/second), and fast offline hash (10 billion/second). Each represents a realistic attack scenario." },
    { name: "Why is my password weak even with symbols?", text: "Password rules like 'must have uppercase and a number' don't prevent common patterns. 'P@ssw0rd!' passes most rules but is trivially crackable. Our checker detects these patterns and evaluates actual entropy." },
    { name: "What is entropy?", text: "Entropy measures unpredictability in bits. Each bit doubles the search space. Under 28 bits is very weak (like a PIN), 60+ bits is strong, and 128+ bits is beyond any brute force capability." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Password Strength Checker",
        url: "https://everyfreetool.com/utility-tools/password-strength-checker",
        description: "Check how strong your password is with real crack time estimates. Powered by zxcvbn. 100% client-side — your password never leaves your browser.",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Password Strength Checker &mdash; How Long Would It Take to Crack Your Password?</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste or type any password to see how strong it really is. Get crack time estimates for four attack scenarios, pattern analysis, and actionable suggestions.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How Password Cracking Works</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Password cracking takes several forms. <strong style={{ color: "var(--text)" }}>Dictionary attacks</strong> try common words and known passwords from previous breaches. <strong style={{ color: "var(--text)" }}>Brute force</strong> tries every possible combination. <strong style={{ color: "var(--text)" }}>Hybrid attacks</strong> combine dictionary words with common substitutions (@ for a, 0 for o). <strong style={{ color: "var(--text)" }}>Rainbow tables</strong> use pre-computed hash lookups.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Modern GPUs can test billions of password hashes per second. An 8-character password using all character types can be cracked in under an hour. A 16-character truly random password would take centuries. The difference is entropy &mdash; the mathematical measure of unpredictability.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Why Simple Rules Fail</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Most websites check passwords against simple rules: &ldquo;must have uppercase, a number, and a symbol.&rdquo; But attackers know these rules too. <strong style={{ color: "var(--text)" }}>&ldquo;P@ssw0rd!&rdquo;</strong> passes every rule-based checker but is in every password cracking dictionary. It would be cracked in seconds.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Our checker uses zxcvbn, developed by Dropbox and presented at USENIX Security 2016. It evaluates passwords the way attackers actually work &mdash; detecting dictionary words, common names, dates, keyboard sequences, l33t substitutions, and repeated patterns. This produces far more accurate strength estimates than rule-based checking.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Enter your password below to check its strength &mdash; the checker tab is already open.</p>
          </div>
        </div>
      </div>
      <PasswordGenerator title="Password Strength Checker" subtitle="Enter any password to see how strong it really is." defaultTab="check" articleMode={true} />
    </>
  );
}
