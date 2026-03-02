import type { Metadata } from "next";
import HashGenerator from "../hash-generator/components/HashGenerator";

export const metadata: Metadata = {
  title: "HMAC Generator — Generate HMAC-SHA256 Signatures Online | EveryFreeTool",
  description: "Generate HMAC signatures with SHA-256, SHA-512, SHA-1, and MD5. Verify Stripe, GitHub, and Shopify webhooks. Key encoding: UTF-8, hex, Base64. Free, 100% client-side.",
  openGraph: { title: "HMAC Generator — Free Online", description: "Generate HMAC signatures for webhook verification and API authentication. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function HmacGeneratorPage() {
  const faqs = [
    { name: "What is HMAC?", text: "HMAC (Hash-based Message Authentication Code) combines a secret key with a hash function to produce an authentication code. Unlike a plain hash, HMAC proves both data integrity and authenticity — the message came from someone with the secret key." },
    { name: "How do I verify a Stripe webhook?", text: "Use your Stripe webhook secret (whsec_...) as the key, HMAC-SHA256 as the algorithm, and the format {timestamp}.{raw_body} as the message. Compare the hex output to the v1= value in the Stripe-Signature header." },
    { name: "What key encoding should I use?", text: "Use UTF-8 for text secrets (most webhooks). Use Hex if your key is a hex string. Use Base64 if your key is Base64-encoded (some APIs provide keys this way)." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "HMAC Generator", url: "https://everyfreetool.com/developer-tools/hmac-generator", description: "Generate HMAC signatures for webhook verification and API auth. Free, 100% client-side.", applicationCategory: "DeveloperApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">HMAC Generator &mdash; Generate HMAC-SHA256 Signatures Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate HMAC signatures for webhook verification and API authentication. Supports HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, and HMAC-MD5 with multiple key encodings.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">What Is HMAC?</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>HMAC (Hash-based Message Authentication Code) is defined in RFC 2104. It combines a <strong style={{ color: "var(--text)" }}>secret key</strong> with a <strong style={{ color: "var(--text)" }}>hash function</strong> to produce a message authentication code. While a regular hash only proves integrity (the data hasn&apos;t changed), HMAC also proves <strong style={{ color: "var(--text)" }}>authenticity</strong> &mdash; the message was created by someone who possesses the secret key. This makes HMAC essential for webhook verification and API authentication.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Webhook Verification</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>Stripe:</strong> Uses HMAC-SHA256. The signature is <code style={{ color: "#8BE9FD" }}>v1=&lt;hex&gt;</code> where the message is <code style={{ color: "#8BE9FD" }}>{"{timestamp}.{raw_body}"}</code>. <strong style={{ color: "var(--text)" }}>GitHub:</strong> Uses HMAC-SHA256 with the <code style={{ color: "#8BE9FD" }}>X-Hub-Signature-256</code> header in format <code style={{ color: "#8BE9FD" }}>sha256=&lt;hex&gt;</code>. <strong style={{ color: "var(--text)" }}>Shopify:</strong> Uses HMAC-SHA256, Base64-encoded in the <code style={{ color: "#8BE9FD" }}>X-Shopify-Hmac-Sha256</code> header.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">HMAC vs Regular Hashing</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>A regular hash like <code style={{ color: "#8BE9FD" }}>SHA256(message)</code> can be computed by anyone. An attacker could modify the message and recompute the hash. HMAC requires the secret key: <code style={{ color: "#8BE9FD" }}>HMAC-SHA256(key, message)</code>. Without the key, an attacker cannot forge a valid HMAC. This is why webhook services use HMAC &mdash; it proves the webhook came from the service, not an attacker.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Enter your secret key and message below to generate an HMAC signature.</p>
          </div>
        </div>
      </div>
      <HashGenerator title="HMAC Generator" subtitle="Generate HMAC signatures for webhook verification." defaultTab="hmac" articleMode={true} />
    </>
  );
}
