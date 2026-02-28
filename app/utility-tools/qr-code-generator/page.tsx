import type { Metadata } from "next";
import QrCodeGenerator from "./components/QrCodeGenerator";

export const metadata: Metadata = {
  title: "QR Code Generator — Free, No Signup, No Watermarks | EveryFreeTool",
  description: "Generate QR codes for URLs, WiFi, vCards, email, phone, and more. Add your logo free. Download as PNG, SVG, or JPEG. 100% client-side, no data stored.",
  openGraph: { title: "QR Code Generator — Free, Instant, No Limits", description: "The cleanest free QR code generator. Logo embedding, color customization, batch generation, WiFi QR codes — all free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function QrCodeGeneratorPage() {
  const faqs = [
    { name: "Is this QR code generator really free?", text: "Yes, completely free with no signup, no watermarks, no download limits, and no expiration on generated codes. All features including logo embedding, color customization, SVG export, and batch generation are available at no cost." },
    { name: "Do QR codes generated here expire?", text: "No. QR codes generated with this tool are static codes — the data is encoded directly in the image. They will work forever and don't depend on any external service." },
    { name: "Can I add my company logo to the QR code?", text: "Yes, you can upload any PNG, JPG, or SVG logo and it will be placed in the center of the QR code. The tool automatically increases error correction to Level H (30%) to ensure scannability." },
    { name: "What format should I download?", text: "PNG for most uses. SVG for print materials (infinitely scalable). JPEG for smaller file sizes without transparency." },
    { name: "How do I create a WiFi QR code?", text: "Click the WiFi tab, enter your network name and password, select encryption type, and download. Scanning the code will automatically connect devices to your WiFi." },
    { name: "Is my data safe?", text: "All QR code generation happens entirely in your browser. No data is sent to any server. We don't store URLs, WiFi passwords, contact info, or uploaded logos." },
    { name: "What's the maximum data a QR code can hold?", text: "Up to 4,296 alphanumeric characters. However, shorter content produces simpler, easier-to-scan codes. Keep URLs under 300 characters for best results." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "QR Code Generator",
        url: "https://everyfreetool.com/utility-tools/qr-code-generator",
        description: "Free QR code generator with logo embedding, color customization, WiFi QR codes, vCard contacts, batch generation, and multiple download formats. No signup, no watermarks.",
        applicationCategory: "UtilityApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: ["URL QR codes", "WiFi QR codes", "vCard contact QR codes", "Logo embedding (free)", "Color customization", "PNG, SVG, JPEG download", "Batch generation", "100% client-side"],
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <QrCodeGenerator
        title="QR Code Generator"
        subtitle="Generate QR codes for URLs, WiFi, contacts, and more. Add your logo, customize colors, and download in any format. Free, instant, no signup."
      />
    </>
  );
}
