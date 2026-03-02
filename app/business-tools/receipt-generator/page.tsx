import type { Metadata } from "next";
import InvoiceGenerator from "../invoice-generator/components/InvoiceGenerator";

export const metadata: Metadata = {
  title: "Free Receipt Generator — Create & Download PDF Receipts | EveryFreeTool",
  description: "Generate professional payment receipts instantly. Mark invoices as paid, add payment method details, and download receipt PDFs. Free, no signup required.",
  openGraph: { title: "Free Receipt Generator | EveryFreeTool", description: "Generate professional payment receipts instantly. Download receipt PDFs. Free, no signup.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "What is a receipt?", a: "A receipt is a document confirming that payment has been received. Unlike an invoice, which requests payment, a receipt serves as proof of a completed transaction. This tool generates receipts with a PAID stamp automatically applied." },
  { q: "When should I issue a receipt?", a: "Issue a receipt immediately after receiving payment. Many jurisdictions legally require businesses to provide receipts upon request. Even when not required, receipts build trust and create a clear record for both parties." },
  { q: "What is the difference between an invoice and a receipt?", a: "An invoice is sent before or at the time of delivery to request payment. A receipt is issued after payment is received to confirm the transaction. This tool can generate both — simply switch the document type." },
  { q: "Is this receipt generator free?", a: "Yes, completely free. Create unlimited receipts with no signup, no subscription, and no watermarks. The tool runs entirely in your browser." },
  { q: "Can I customize the receipt template?", a: "Yes. Choose from four professional templates (Classic, Modern, Elegant, Bold), pick an accent color, and add your logo. The PAID stamp is added automatically when Receipt is selected as the document type." },
  { q: "Is my data secure?", a: "Yes. All data stays in your browser. Nothing is uploaded to any server. The PDF is generated entirely on your device." },
  { q: "Can I include payment method details on the receipt?", a: "Yes. The Payment Information section lets you record the payment method, bank details, or any other payment notes. This information appears on the receipt for the client's records." },
];

export default function ReceiptGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free Receipt Generator",
        url: "https://everyfreetool.com/business-tools/receipt-generator",
        description: "Generate professional payment receipts instantly. Mark invoices as paid, add payment method details, and download receipt PDFs.",
        applicationCategory: "BusinessApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "PDF download, logo upload, PAID stamp, multiple templates, 25+ currencies",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <InvoiceGenerator title="Free Receipt Generator" subtitle="Create professional payment receipts and download them as PDF instantly." defaultDocType="Receipt" />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>What Is a Receipt Generator?</h2>
              <p style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>A receipt generator creates formal proof-of-payment documents that you can send to clients after receiving payment. This tool pre-selects the Receipt document type and applies a PAID stamp to the document automatically. Fill in the transaction details, choose a template, and download a professional PDF receipt in seconds — all without creating an account.</p>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>How to Create a Receipt</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Step 1 — Enter your business details.</strong> Add your business name, contact information, and logo. These identify you as the payee on the receipt.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 2 — Add the payer&apos;s information.</strong> Enter the client or customer&apos;s name and address. This is the party who made the payment.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 3 — List the items or services paid for.</strong> Add each product or service as a line item with the quantity, rate, and description. The amounts are calculated automatically.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 4 — Add payment details and download.</strong> Optionally record the payment method in the Payment Information section. Review the preview (the PAID stamp is already applied) and download your PDF receipt.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Invoice vs Receipt — What&apos;s the Difference?</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p>The distinction is simple but important. An <strong style={{ color: "var(--text)" }}>invoice</strong> is a request for payment. It is sent before payment is received, typically with a due date and payment terms. An invoice says &quot;you owe this amount.&quot;</p>
                <p>A <strong style={{ color: "var(--text)" }}>receipt</strong> is confirmation that payment has been received. It is issued after the transaction is complete. A receipt says &quot;this amount has been paid.&quot;</p>
                <p>In practice, many businesses generate an invoice first and then convert it to a receipt once payment arrives. This tool supports that workflow — create an invoice, then change the document type to Receipt when the client pays. The PAID stamp is added automatically, and you can record the payment method and date.</p>
                <p><strong style={{ color: "var(--text)" }}>When you need a receipt:</strong> After receiving any payment, for expense reimbursement claims, for tax deduction documentation, for warranty or return proof, and whenever a client or customer requests one. Many jurisdictions legally require businesses to provide receipts upon request.</p>
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
