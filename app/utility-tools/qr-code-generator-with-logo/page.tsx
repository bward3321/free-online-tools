import type { Metadata } from "next";
import QrCodeGenerator from "../qr-code-generator/components/QrCodeGenerator";

export const metadata: Metadata = {
  title: "QR Code Generator With Logo — Add Your Brand Free | EveryFreeTool",
  description: "Add your company logo to a QR code for free. No signup, no watermark. Upload PNG, JPG, or SVG. Error correction ensures scannability. Download as PNG, SVG, or JPEG.",
  openGraph: { title: "QR Code Generator With Logo — Free Logo Embedding", description: "Add your brand logo to any QR code. Free feature that competitors charge $7-12/month for. Upload and download instantly.", type: "website" },
  robots: "index, follow",
};

export default function QrCodeWithLogoPage() {
  const faqs = [
    { name: "How does logo embedding work in QR codes?", text: "QR codes include built-in error correction that allows them to be read even when partially damaged. When you add a logo, the tool increases error correction to Level H (30% recovery), meaning up to 30% of the QR code can be obscured and it will still scan correctly. The logo is placed in the center with white padding to ensure maximum readability." },
    { name: "What logo formats are supported?", text: "PNG, JPG, and SVG files up to 2MB. For best results, use a simple logo with high contrast on a transparent or white background. Square or circular logos work best." },
    { name: "How large can the logo be?", text: "We recommend keeping the logo between 15-25% of the QR code's area (adjustable with the size slider). Larger logos obscure more of the code, increasing the risk of scanning failure. The tool defaults to 20%, which is the optimal balance of visibility and reliability." },
    { name: "Will the QR code still scan with a logo?", text: "Yes, as long as the logo is within the recommended size range. The tool automatically uses Level H error correction (30% data recovery) when a logo is present, ensuring reliable scanning even with the logo covering part of the code." },
    { name: "Why do other sites charge for this?", text: "Logo embedding requires higher error correction and careful positioning. Many QR code generators offer this as a premium feature ($7-12/month). Our tool does all processing client-side with no server costs, so we can offer it free." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "QR Code Generator With Logo",
        url: "https://everyfreetool.com/utility-tools/qr-code-generator-with-logo",
        description: "Add your company logo to QR codes for free. Upload PNG, JPG, or SVG. Automatic error correction ensures scannability.",
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
            <a href="/" className="hover:underline" style={{ color: "#2563EB" }}>Home</a><span>/</span><span>Utility Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">QR Code Generator With Logo &mdash; Add Your Brand Free</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Add your company logo to any QR code &mdash; a feature competitors charge $7-12/month for. Upload your logo, customize colors, and download instantly.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">How Logo Embedding Works</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>QR codes have a remarkable feature: <strong style={{ color: "var(--text)" }}>error correction</strong>. At the highest level (Level H), a QR code can recover up to 30% of its data even when that portion is damaged, dirty, or &mdash; in this case &mdash; covered by a logo.</p>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>When you add a logo, the tool automatically switches to Level H error correction and places the logo in the center of the code with white padding. The center is the optimal position because QR code readers start scanning from the three corner finder patterns (the large squares), so the center is the last area needed.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Logo Design Best Practices</h2>
              <div className="space-y-2" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Keep it simple.</strong> Detailed logos with fine text may be hard to see at small sizes. Icons and simple wordmarks work best.</p>
                <p><strong style={{ color: "var(--text)" }}>Use high contrast.</strong> Your logo should stand out clearly against the white padding area. Dark logos on white work best.</p>
                <p><strong style={{ color: "var(--text)" }}>Go square or circular.</strong> Square and circular logos fit naturally in the QR code&apos;s center. Wide rectangular logos may need to be cropped.</p>
                <p><strong style={{ color: "var(--text)" }}>Stay under 25%.</strong> Keep logo size between 15-25% of the QR code area for reliable scanning.</p>
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#2563EB1a", borderColor: "#2563EB40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Create your branded QR code below &mdash; the logo section is already open for you.</p>
          </div>
        </div>
      </div>
      <QrCodeGenerator title="QR Code Generator With Logo" subtitle="Upload your logo and create a branded QR code. Free, no signup." expandLogo={true} articleMode={true} />
    </>
  );
}
