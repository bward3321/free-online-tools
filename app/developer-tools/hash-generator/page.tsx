import type { Metadata } from "next";
import HashGenerator from "./components/HashGenerator";

export const metadata: Metadata = {
  title: "Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online | EveryFreeTool",
  description: "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes instantly. File checksums, HMAC signatures, hash comparison. 100% client-side via Web Crypto API.",
  openGraph: { title: "Hash Generator — MD5, SHA-256, SHA-512 Online", description: "Generate and verify hashes for text and files. HMAC signatures, checksum verification. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function HashGeneratorPage() {
  const faqs = [
    { name: "Is my data safe? Is anything sent to a server?", text: "No data leaves your browser. All hashing uses the Web Crypto API built into your browser (for SHA algorithms) or a local JavaScript implementation (for MD5). Files are read locally and never uploaded." },
    { name: "Which hash algorithm should I use?", text: "For most purposes, use SHA-256. It's the industry standard for TLS certificates, Bitcoin, code signing, and file integrity. Use SHA-512 for maximum security. Only use MD5 or SHA-1 for legacy compatibility." },
    { name: "What is HMAC and when do I need it?", text: "HMAC combines a secret key with a hash function to produce an authentication code. Essential for webhook verification (Stripe, GitHub, Shopify) and API authentication." },
    { name: "Can I hash large files?", text: "Yes. The tool reads files in chunks using streaming APIs, handling files up to 2GB. A progress bar shows hashing progress. All processing happens locally." },
    { name: "Is hashing the same as encryption?", text: "No. Hashing is one-way — you cannot reverse a hash. Encryption is two-way — data can be decrypted with the correct key. Hashing provides integrity, not confidentiality." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Hash Generator",
        url: "https://everyfreetool.com/developer-tools/hash-generator",
        description: "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes for text and files. HMAC signatures, checksum verification. 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: ["MD5 hashing", "SHA-1 hashing", "SHA-256 hashing", "SHA-384 hashing", "SHA-512 hashing", "File checksums", "HMAC signatures", "Hash comparison", "Checksum verification"],
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <HashGenerator
        title="Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online"
        subtitle="Generate cryptographic hashes for text and files instantly. All algorithms computed simultaneously. HMAC signatures, checksum verification, hash comparison — all 100% client-side."
      />
    </>
  );
}
