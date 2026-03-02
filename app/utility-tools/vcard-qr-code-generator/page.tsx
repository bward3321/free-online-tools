import type { Metadata } from "next";
import QrCodeGenerator from "../qr-code-generator/components/QrCodeGenerator";

export const metadata: Metadata = {
  title: "vCard QR Code Generator — Create a Digital Business Card | EveryFreeTool",
  description: "Generate a vCard QR code with your name, phone, email, company, and website. Scanning adds your contact info instantly. Free, no signup.",
  openGraph: { title: "vCard QR Code Generator — Digital Business Card", description: "Create a QR code that adds your contact information to any phone when scanned. Name, phone, email, company, website — all encoded in one code.", type: "website" },
  robots: "index, follow",
};

export default function VCardQrCodeGeneratorPage() {
  const faqs = [
    { name: "What is a vCard QR code?", text: "A vCard QR code encodes contact information in the standard vCard 3.0 format. When scanned, the phone automatically opens the Contacts app with all your information pre-filled — name, phone number, email, company, job title, website, and address. The user simply taps 'Save' to add you as a contact." },
    { name: "What information can I include?", text: "You can include: first and last name, phone number, email address, company/organization, job title, website URL, and full mailing address (street, city, state, ZIP). All fields except name are optional." },
    { name: "Which devices support vCard QR codes?", text: "vCard QR codes work on iPhones (iOS 11+), Android phones (Android 9+), and most modern smartphones. They're also compatible with email clients like Outlook and Google Contacts when opened on desktop." },
    { name: "Where should I put my vCard QR code?", text: "Great places include: printed business cards (back side), email signatures, portfolio websites, resumes/CVs, LinkedIn profiles, conference name badges, and marketing materials." },
    { name: "Is my contact information stored?", text: "No. All vCard QR codes are generated entirely in your browser. Your name, phone number, email, and other contact details are never sent to any server." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "vCard QR Code Generator",
        url: "https://everyfreetool.com/utility-tools/vcard-qr-code-generator",
        description: "Create a vCard QR code with your contact information. Scanning adds your name, phone, email, and more to any phone's contacts instantly.",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">vCard QR Code Generator &mdash; Create a Digital Business Card</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Generate a QR code that adds your contact info to any phone when scanned. Include your name, phone, email, company, website, and address.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">What Is a vCard?</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>vCard (Virtual Card) is a standardized file format for sharing contact information electronically. Originally developed in 1995, the <strong style={{ color: "var(--text)" }}>vCard 3.0 format</strong> is now universally supported by iOS Contacts, Android Contacts, Google Contacts, Microsoft Outlook, and virtually every contact management application.</p>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>When encoded in a QR code, scanning it with any modern smartphone automatically opens the Contacts app with all your information pre-filled. The recipient simply taps &ldquo;Save&rdquo; &mdash; no manual typing, no misspelled email addresses, no forgotten details.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Where to Use Your vCard QR Code</h2>
              <div className="grid grid-cols-2 gap-3" style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                {["Business cards (back side)", "Email signature", "Portfolio website", "Resume / CV", "LinkedIn profile", "Conference badge", "Marketing materials", "Networking events"].map((place, i) => (
                  <div key={i} className="flex items-center gap-2 py-1"><span style={{ color: "#16A34A" }}>&#x2713;</span><span>{place}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#2563EB1a", borderColor: "#2563EB40" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Fill in your contact details below to generate your vCard QR code.</p>
          </div>
        </div>
      </div>
      <QrCodeGenerator title="vCard QR Code Generator" subtitle="Enter your contact information to create a digital business card QR code." defaultTab="vcard" articleMode={true} />
    </>
  );
}
