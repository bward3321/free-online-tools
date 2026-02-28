import type { Metadata } from "next";
import PasswordGenerator from "./components/PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Generator — Create Strong, Random Passwords Instantly | EveryFreeTool",
  description: "Generate strong random passwords, memorable passphrases, and PINs. Check password strength with crack time estimates. 100% client-side, CSPRNG-powered. Free, no signup.",
  openGraph: { title: "Password Generator — Strong Passwords in 2 Seconds", description: "Generate uncrackable passwords, memorable passphrases, and PINs. Check strength with real crack time estimates. Free, no signup, nothing stored.", type: "website" },
  robots: "index, follow",
};

export default function PasswordGeneratorPage() {
  const faqs = [
    { name: "Is this password generator safe to use?", text: "Yes. This tool generates passwords entirely in your browser using the Web Crypto API (crypto.getRandomValues()), the same CSPRNG used by password managers and security software. No passwords are transmitted to any server, stored in any database, or logged in any way." },
    { name: "How does this tool generate random passwords?", text: "We use your browser's built-in CSPRNG via crypto.getRandomValues(). This draws entropy from your operating system's random number generator, collecting randomness from hardware events. The output is unpredictable even to someone who knows the algorithm." },
    { name: "How long should my password be?", text: "Security experts recommend a minimum of 16 characters for important accounts. 16-20 characters with all character types provides excellent security. For maximum protection, use 20+ characters or a 5-6 word passphrase." },
    { name: "What is a passphrase?", text: "A passphrase is a password made of random words, like \"correct-horse-battery-staple.\" A 5-word passphrase has approximately 64.6 bits of entropy — roughly equivalent to a 10-character fully random password." },
    { name: "What is entropy?", text: "Entropy measures how unpredictable a password is, expressed in bits. Each bit doubles the number of possible passwords an attacker would need to try. 40 bits is weak, 60 moderate, 80 strong, and 128 bits is effectively uncrackable." },
    { name: "Should I use a password manager?", text: "Absolutely. A password manager lets you use unique, strong passwords for every account without memorizing them. Popular options include Bitwarden (free, open-source), 1Password, and KeePass." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Password Generator & Strength Checker",
        url: "https://everyfreetool.com/utility-tools/password-generator",
        description: "Generate strong random passwords, memorable passphrases, and PINs. Check password strength with crack time estimates. 100% client-side, CSPRNG-powered.",
        applicationCategory: "UtilityApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: ["Random password generation", "Passphrase generation", "PIN generation", "Password strength checker", "Crack time estimates", "Bulk generation", "100% client-side"],
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <PasswordGenerator
        title="Password Generator — Create Strong, Random Passwords Instantly"
        subtitle="Generate uncrackable passwords, memorable passphrases, and PINs — then check how long they'd take to crack. 100% client-side, nothing ever leaves your browser."
      />
    </>
  );
}
