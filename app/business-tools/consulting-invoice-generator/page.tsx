import type { Metadata } from "next";
import InvoiceGenerator from "../invoice-generator/components/InvoiceGenerator";

export const metadata: Metadata = {
  title: "Free Consulting Invoice Generator — Hourly & Project Billing | EveryFreeTool",
  description: "Consultants: create polished invoices for hourly or project-based work. Track hours, apply rates, and download PDF invoices instantly. Free, no signup.",
  openGraph: { title: "Free Consulting Invoice Generator | EveryFreeTool", description: "Create polished consulting invoices for hourly or project-based work. Download PDF instantly. Free, no signup.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "Is this consulting invoice generator free?", a: "Yes, completely free with no limits. Create as many invoices as you need for consulting engagements. No signup, no subscription, no watermarks." },
  { q: "Can I bill by the hour and by the project on the same invoice?", a: "Yes. Add hourly line items (e.g., 'Strategy consulting — 8 hours at $200/hr') and fixed-fee items (e.g., 'Market analysis report — $2,500') on the same invoice. The tool calculates each line item independently." },
  { q: "How do I invoice for a retainer?", a: "Create a single line item for the retainer period (e.g., 'Monthly consulting retainer — March 2026') with a quantity of 1 and the retainer fee as the rate. Add additional line items for any out-of-scope work billed separately." },
  { q: "What payment terms should consultants use?", a: "Net 15 or Net 30 are standard for consulting. For new clients or high-value engagements, consider requiring a 50% deposit upfront or billing on a monthly retainer basis." },
  { q: "Can I add my consulting firm's logo?", a: "Yes. Drag and drop your logo onto the upload area or click to browse. It appears in the invoice header and in the downloaded PDF." },
  { q: "Is my client data secure?", a: "Yes. Everything runs in your browser. No data is uploaded to any server. The PDF is generated entirely on your device. Your client information stays private." },
  { q: "How do I handle multiple currencies for international clients?", a: "Select the appropriate currency from 25 options including USD, EUR, GBP, CHF, and more. Each currency uses the correct symbol and formatting. Create a separate invoice for each currency." },
];

export default function ConsultingInvoiceGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free Consulting Invoice Generator",
        url: "https://everyfreetool.com/business-tools/consulting-invoice-generator",
        description: "Create polished consulting invoices for hourly or project-based work. Track hours, apply rates, and download PDF invoices instantly.",
        applicationCategory: "BusinessApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "PDF download, logo upload, hourly and project billing, multiple templates, tax calculation, 25+ currencies",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <InvoiceGenerator title="Free Consulting Invoice Generator" subtitle="Create polished consulting invoices for hourly or project-based work. Download as PDF instantly." />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>What Is a Consulting Invoice?</h2>
              <p style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>A consulting invoice is a billing document sent by consultants, advisors, and professional service providers to clients for work performed. Unlike product invoices, consulting invoices typically itemize time-based services — hours of strategic advice, project deliverables, or monthly retainer fees. A professional consulting invoice includes clear descriptions of the work performed, the applicable rates, and payment terms.</p>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>How to Create a Consulting Invoice</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Step 1 — Add your consulting firm details.</strong> Enter your firm name, contact information, and upload your logo for professional branding.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 2 — Enter client information.</strong> Add the client&apos;s company name and billing address. Use the Reference field for the engagement or project name.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 3 — Itemize your services.</strong> For hourly billing, set the quantity to hours worked and the rate to your hourly fee. For project-based billing, describe each deliverable and set the agreed price. Mix both on the same invoice if needed.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 4 — Set terms and download.</strong> Choose your payment terms, add any applicable taxes, include payment instructions, and download the PDF.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Consulting Invoice Guide: Hourly vs Project-Based Billing</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Hourly billing</strong> works best for ongoing advisory work, uncertain scope, or engagements where the client needs flexibility. List each service category with the hours worked and your hourly rate. Be specific: &quot;Strategy workshop facilitation — 4 hours&quot; is better than &quot;Consulting — 4 hours.&quot; This transparency builds trust and justifies your fees.</p>
                <p><strong style={{ color: "var(--text)" }}>Project-based billing</strong> works best for defined deliverables with clear scope. Quote a flat fee for each deliverable (e.g., &quot;Competitive analysis report — $3,500&quot;). This approach gives clients budget certainty and frees you from tracking every hour. It also rewards efficiency — the faster you work, the higher your effective hourly rate.</p>
                <p><strong style={{ color: "var(--text)" }}>Retainer billing</strong> provides predictable monthly revenue. Create a single line item for the retainer period with the agreed monthly fee. If the engagement includes both a retainer base and hourly overflow, list the retainer as one line item and any additional hours as separate items below.</p>
                <p><strong style={{ color: "var(--text)" }}>Hybrid billing</strong> combines approaches on a single invoice. For example, a management consulting engagement might include a fixed-fee strategy phase and hourly implementation support. List each component clearly so the client understands the billing structure.</p>
                <p><strong style={{ color: "var(--text)" }}>Payment collection strategies.</strong> For new clients, request a 50% deposit before starting work. For ongoing relationships, Net 15 terms keep cash flow healthy. Include your bank details or payment link directly on the invoice to minimize friction. Follow up promptly on overdue invoices — a polite reminder at 3 days past due resolves most late payments.</p>
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
                  { href: "/utility-tools/password-generator", title: "Password Generator", desc: "Generate uncrackable passwords and passphrases instantly" },
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
