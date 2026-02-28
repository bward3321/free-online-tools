import type { Metadata } from "next";
import Base64EncoderDecoder from "./components/Base64EncoderDecoder";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Encode and Decode Base64 Instantly | EveryFreeTool",
  description: "Encode and decode Base64 text, files, and images instantly. Full UTF-8 support, URL-safe mode, data URI output, image preview. Free, no signup, 100% client-side.",
  openGraph: { title: "Base64 Encoder & Decoder — Free Online", description: "Encode and decode Base64 text, files, and images instantly. UTF-8, URL-safe, data URIs. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function Base64EncoderDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Base64 Encoder & Decoder", url: "https://everyfreetool.com/developer-tools/base64-encoder-decoder",
        description: "Encode and decode Base64 text, files, and images. Full UTF-8 support, URL-safe mode, data URI output. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Is my data safe?", acceptedAnswer: { "@type": "Answer", text: "All encoding and decoding happens entirely in your browser. No data is sent to any server." } },
          { "@type": "Question", name: "What is Base64 encoding?", acceptedAnswer: { "@type": "Answer", text: "Base64 is a binary-to-text encoding scheme using a 64-character alphabet (A-Z, a-z, 0-9, +, /) to represent binary data as ASCII text." } },
          { "@type": "Question", name: "Is Base64 the same as encryption?", acceptedAnswer: { "@type": "Answer", text: "No. Base64 is encoding, not encryption. Anyone can decode it instantly. Use proper encryption for security." } },
          { "@type": "Question", name: "Does this support UTF-8 and emoji?", acceptedAnswer: { "@type": "Answer", text: "Yes. Full UTF-8 support including emoji, CJK characters, and all Unicode text." } },
          { "@type": "Question", name: "Can I convert images to Base64?", acceptedAnswer: { "@type": "Answer", text: "Yes. Upload any image to get raw Base64, data URI, HTML img tag, and CSS background output." } },
        ],
      }) }} />
      <Base64EncoderDecoder
        title="Base64 Encoder & Decoder — Encode and Decode Base64 Instantly"
        subtitle="Paste text or drop a file to encode to Base64 — or paste Base64 to decode it. Real-time conversion with full UTF-8 support, URL-safe mode, and data URI output for images."
      />
    </>
  );
}
