import type { Metadata } from "next";
import QrCodeGenerator from "../qr-code-generator/components/QrCodeGenerator";

export const metadata: Metadata = {
  title: "WiFi QR Code Generator — Share Your WiFi Password Instantly | EveryFreeTool",
  description: "Create a WiFi QR code that lets guests connect to your network instantly. Perfect for restaurants, Airbnbs, offices, and home. Free, no signup.",
  openGraph: { title: "WiFi QR Code Generator — Share WiFi Instantly", description: "Create a scannable QR code for your WiFi network. Guests scan and connect — no more spelling passwords. Free.", type: "website" },
  robots: "index, follow",
};

export default function WifiQrCodeGeneratorPage() {
  const faqs = [
    { name: "How do WiFi QR codes work?", text: "WiFi QR codes use the standard WIFI: string format to encode your network name (SSID), password, and encryption type. When a smartphone camera scans the code, it prompts the user to join the network automatically — no manual typing required." },
    { name: "What devices support WiFi QR codes?", text: "iPhones running iOS 11 or later (2017+) and Android devices running Android 10 or later (2019+) support WiFi QR codes natively through the camera app. Most modern devices work seamlessly." },
    { name: "Is it safe to share my WiFi password via QR code?", text: "A WiFi QR code contains the same information you'd share verbally — your network name and password. The QR code is generated entirely in your browser and never transmitted to any server. The password is encoded in the image, so treat the printed QR code as you would a written password." },
    { name: "Where should I display my WiFi QR code?", text: "Great places include: restaurant table tents, Airbnb welcome books, office lobby signs, hotel room info cards, home guest bedrooms, coffee shop counters, and coworking space desks." },
    { name: "Does this work with hidden networks?", text: "Yes. Toggle the 'Hidden Network' option when creating your WiFi QR code. The QR code will include the hidden flag, telling the scanning device to search for the network even though it doesn't broadcast its name." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "WiFi QR Code Generator",
        url: "https://everyfreetool.com/utility-tools/wifi-qr-code-generator",
        description: "Create a QR code that connects devices to your WiFi network instantly. Enter your SSID and password, download the QR code, and share with guests.",
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
            <a href="/" className="hover:underline" style={{ color: "#2563EB" }}>Home</a><span>/</span><span>Utility Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">WiFi QR Code Generator &mdash; Share Your WiFi Password Instantly</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Create a QR code that lets anyone scan and connect to your WiFi &mdash; no more spelling out passwords. Perfect for restaurants, Airbnbs, offices, and home.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How WiFi QR Codes Work</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>WiFi QR codes use a standardized format (<code>WIFI:T:WPA;S:NetworkName;P:Password;;</code>) recognized by smartphone cameras. When scanned, the phone automatically prompts the user to join the network without any manual typing. This format was developed as part of the ZXing barcode library specification and is now supported natively on all modern smartphones.</p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The QR code encodes your network name (SSID), password, encryption type (WPA/WPA2, WPA3, or WEP), and whether the network is hidden. Special characters in your network name or password are automatically escaped so the code works correctly.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Where to Display Your WiFi QR Code</h2>
              <div className="grid grid-cols-2 gap-3" style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                {["Restaurant table tents", "Airbnb welcome book", "Office lobby sign", "Hotel room card", "Coffee shop counter", "Guest bedroom frame", "Coworking desk", "Event registration"].map((place, i) => (
                  <div key={i} className="flex items-center gap-2 py-1"><span style={{ color: "#16A34A" }}>&#x2713;</span><span>{place}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#2563EB1a", borderColor: "#2563EB40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Create your WiFi QR code below &mdash; just enter your network name and password.</p>
          </div>
        </div>
      </div>
      <QrCodeGenerator title="WiFi QR Code Generator" subtitle="Enter your WiFi details below. The QR code updates in real-time." defaultTab="wifi" articleMode={true} />
    </>
  );
}
