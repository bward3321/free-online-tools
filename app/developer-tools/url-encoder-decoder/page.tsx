import type { Metadata } from "next";
import UrlEncoderDecoder from "./components/UrlEncoderDecoder";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder — Encode, Decode & Parse URLs Instantly | EveryFreeTool",
  description: "Encode, decode, and parse URLs instantly. Three encoding modes, URL parser with color-coded breakdown, batch mode, double-encoding detection. Free, no signup, 100% client-side.",
  openGraph: { title: "URL Encoder & Decoder — Free Online", description: "Encode, decode, and parse URLs with visual component breakdown. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function UrlEncoderDecoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "URL Encoder & Decoder", url: "https://everyfreetool.com/developer-tools/url-encoder-decoder",
        description: "Encode, decode, and parse URLs. Three encoding modes, URL parser, batch mode. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is URL encoding?", acceptedAnswer: { "@type": "Answer", text: "URL encoding (percent-encoding) replaces unsafe characters with % followed by hex byte values, as defined by RFC 3986." } },
          { "@type": "Question", name: "What's the difference between encodeURI and encodeURIComponent?", acceptedAnswer: { "@type": "Answer", text: "encodeURI() preserves URL structure characters. encodeURIComponent() encodes everything except unreserved characters." } },
          { "@type": "Question", name: "Is my data safe?", acceptedAnswer: { "@type": "Answer", text: "Yes. All processing happens in your browser. No data is sent to any server." } },
        ],
      }) }} />
      <UrlEncoderDecoder
        title="URL Encoder & Decoder — Encode, Decode & Parse URLs Instantly"
        subtitle="Paste text to encode for URLs, paste encoded strings to decode them, or drop a full URL into the parser to see every component broken down, decoded, and editable."
      />
    </>
  );
}
