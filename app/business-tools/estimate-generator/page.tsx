import type { Metadata } from "next";
import InvoiceGenerator from "../invoice-generator/components/InvoiceGenerator";

export const metadata: Metadata = {
  title: "Free Estimate Generator — Create & Download PDF Estimates | EveryFreeTool",
  description: "Create professional project estimates and quotes. List services, costs, and terms. Download as PDF to send to prospective clients. Free, no signup.",
  openGraph: { title: "Free Estimate Generator | EveryFreeTool", description: "Create professional project estimates and quotes. Download as PDF. Free, no signup.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "What is the difference between an estimate and a quote?", a: "An estimate is an approximation of costs that may change as the project progresses. A quote is a fixed price commitment. This tool can generate both — use Estimate for approximate pricing or Quote for fixed pricing. The document title updates accordingly." },
  { q: "Is this estimate generator free?", a: "Yes, completely free with no limits. Create as many estimates as you need without signing up, paying, or dealing with watermarks." },
  { q: "Can I convert an estimate to an invoice?", a: "Yes. Create your estimate, then change the document type to Invoice when the client approves. Update the dates and invoice number, and you have a ready-to-send invoice based on the approved estimate." },
  { q: "Should I include tax on estimates?", a: "It depends on your industry and client expectations. Including tax gives the client a more accurate total and avoids sticker shock when the invoice arrives. Use the tax toggle to add sales tax, VAT, or GST to your estimate." },
  { q: "How do I make my estimates more likely to be accepted?", a: "Break down costs into clear line items so the client understands what they are paying for. Include a brief description for each item. Set a reasonable validity period. And present the estimate professionally — a polished PDF with your logo makes a strong impression." },
  { q: "Can I add my logo to the estimate?", a: "Yes. Drag and drop your logo onto the upload area or click to browse. It appears in the header of the estimate and in the downloaded PDF." },
  { q: "Is my data private?", a: "Yes. Everything runs in your browser. No data is uploaded to any server. The PDF is generated entirely on your device." },
];

export default function EstimateGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free Estimate Generator",
        url: "https://everyfreetool.com/business-tools/estimate-generator",
        description: "Create professional project estimates and quotes. List services, costs, and terms. Download as PDF instantly.",
        applicationCategory: "BusinessApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "PDF download, logo upload, multiple templates, tax calculation, discount, 25+ currencies",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <InvoiceGenerator title="Free Estimate Generator" subtitle="Create professional project estimates and download them as PDF instantly." defaultDocType="Estimate" />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>What Is an Estimate Generator?</h2>
              <p style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>An estimate generator helps you create professional cost proposals for potential clients. Instead of sending informal numbers in an email, you produce a polished PDF document with your branding, detailed line items, and clear terms. A well-presented estimate signals professionalism and increases the likelihood that the client will approve the project.</p>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>How to Create an Estimate</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Step 1 — Add your business details.</strong> Enter your business name, contact information, and logo. This identifies you as the provider on the estimate.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 2 — Enter the prospective client&apos;s details.</strong> Add the client&apos;s business name and address. This is who the estimate is addressed to.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 3 — Break down the project into line items.</strong> List each service or deliverable with a description, quantity, and rate. Be as specific as possible — detailed breakdowns help clients understand the value.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 4 — Add terms and download.</strong> Include any applicable taxes or discounts, add notes about the estimate&apos;s validity period, and download the PDF to send to your client.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>How to Write Estimates That Win Clients</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Be specific about scope.</strong> Vague estimates create problems later. Instead of &quot;Website Design — $5,000,&quot; break it down: wireframes, mockups, development, testing, and launch support. When the client sees exactly what they are getting, the price feels justified.</p>
                <p><strong style={{ color: "var(--text)" }}>Include what is not covered.</strong> Use the Notes section to clarify exclusions. If the estimate covers design but not copywriting, say so. This prevents scope creep and sets clear expectations from the start.</p>
                <p><strong style={{ color: "var(--text)" }}>Set a validity period.</strong> Add a note like &quot;This estimate is valid for 30 days&quot; in the Terms section. This creates urgency and protects you from price changes in materials or subcontractor rates.</p>
                <p><strong style={{ color: "var(--text)" }}>Present it professionally.</strong> A polished estimate with your logo, consistent formatting, and clear totals makes a stronger impression than a number in an email. It signals that you take your work seriously, which builds client confidence.</p>
                <p><strong style={{ color: "var(--text)" }}>Offer options when appropriate.</strong> Consider creating two or three estimates at different price points (basic, standard, premium). This gives the client a sense of control and often results in them choosing the middle option rather than the cheapest.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <details key={f.q} className="group rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                    <summary className="cursor-pointer font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>{f.q}</summary>
                    <p className="mt-2" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>More Free Business & Productivity Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: "/business-tools/invoice-generator", title: "Invoice Generator", desc: "Create professional invoices with your logo, line items, taxes & discounts" },
                  { href: "/business-tools/meeting-cost-calculator", title: "Meeting Cost Calculator", desc: "See what meetings really cost with live timer and annual projections" },
                  { href: "/writing-tools/word-counter", title: "Word & Character Counter", desc: "Count words, characters, sentences, and paragraphs" },
                  { href: "/utility-tools/qr-code-generator", title: "QR Code Generator", desc: "Create custom QR codes with colors, logos, and batch generation" },
                ].map((t) => (
                  <a key={t.href} href={t.href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                    <p className="font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>{t.title}</p>
                    <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{t.desc}</p>
                  </a>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
