import type { Metadata } from "next";
import InvoiceGenerator from "../invoice-generator/components/InvoiceGenerator";

export const metadata: Metadata = {
  title: "Free Contractor Invoice Template — PDF Generator for Contractors | EveryFreeTool",
  description: "Contractors: generate professional invoices for construction, renovation, and service work. Include materials, labor, and project details. Free PDF download.",
  openGraph: { title: "Free Contractor Invoice Template | EveryFreeTool", description: "Generate professional contractor invoices with materials, labor, and project details. Free PDF download.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "Is this contractor invoice template free?", a: "Yes, completely free with no limits. Create as many invoices as you need for any type of contracting work — construction, renovation, plumbing, electrical, landscaping, and more. No signup required." },
  { q: "Can I separate materials and labor on the invoice?", a: "Yes. Add each category as a separate line item. For example, add 'Materials — Lumber and hardware' as one line and 'Labor — Framing and installation (40 hours)' as another. This gives clients a clear breakdown of where their money is going." },
  { q: "How do I handle progress billing?", a: "For large projects billed in stages, create a separate invoice for each milestone. Use the Reference field to note the project phase (e.g., 'Phase 2 — Rough Framing') and the Notes section to reference the contract terms." },
  { q: "Can I add my contractor's license number?", a: "Yes. Use the Tax ID field to include your contractor's license number, which will appear on the invoice header. You can also add it to the Notes section for additional visibility." },
  { q: "What about change orders?", a: "Create a separate invoice for change orders and reference the original invoice number in the Reference field. Describe the additional work clearly in the line items so the client understands the extra charges." },
  { q: "Is my data private?", a: "Yes. Everything runs in your browser. No data is uploaded to any server. The PDF is generated entirely on your device." },
  { q: "Can I include lien waiver language?", a: "Yes. Add lien waiver text to the Terms & Conditions section. This appears at the bottom of the invoice. Consult your state's specific lien waiver requirements for the correct language." },
];

export default function ContractorInvoiceTemplatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free Contractor Invoice Template",
        url: "https://everyfreetool.com/business-tools/contractor-invoice-template",
        description: "Generate professional contractor invoices for construction, renovation, and service work. Include materials, labor, and project details.",
        applicationCategory: "BusinessApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "PDF download, logo upload, multiple templates, materials and labor breakdown, tax calculation, 25+ currencies",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <InvoiceGenerator title="Free Contractor Invoice Template" subtitle="Generate professional contractor invoices with materials, labor, and project details." />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>What Is a Contractor Invoice?</h2>
              <p style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>A contractor invoice is a billing document used by construction professionals, tradespeople, and independent contractors to request payment for completed work. Unlike a simple service invoice, contractor invoices typically break down costs into materials and labor, reference a project or contract, and may include progress billing for larger jobs. This tool helps you create professional contractor invoices with all the details your clients expect.</p>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>How to Create a Contractor Invoice</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Step 1 — Enter your business details.</strong> Add your contracting business name, license number (in the Tax ID field), contact information, and logo.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 2 — Add the client and project details.</strong> Enter the client&apos;s name and property address. Use the Reference field for the project name or contract number.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 3 — Break down materials and labor.</strong> Add materials as one set of line items and labor as another. Include specific descriptions (e.g., &quot;Lumber — 2x4 framing, 200 board feet&quot;) so the client understands every charge.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 4 — Add taxes, fees, and terms.</strong> Apply sales tax on materials (required in most states), add permit fees as a shipping/additional fee, include lien waiver language in the terms, and download your PDF.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Contractor Invoicing: Materials, Labor & Progress Billing</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Separate materials from labor.</strong> Clients expect to see a clear breakdown. List materials with specific quantities and unit costs (e.g., &quot;Concrete — 12 cubic yards at $135/yard&quot;). List labor separately with hours and hourly rates or as flat-rate line items per phase.</p>
                <p><strong style={{ color: "var(--text)" }}>Use progress billing for large projects.</strong> For projects over $5,000, bill in stages tied to milestones: foundation, framing, rough-in, finish work, and final walkthrough. Each invoice should reference the project contract and indicate the completion percentage.</p>
                <p><strong style={{ color: "var(--text)" }}>Include permit and disposal fees.</strong> Pass through permit costs, dumpster rentals, and inspection fees as separate line items. These are legitimate project costs that clients should see itemized rather than buried in your labor rate.</p>
                <p><strong style={{ color: "var(--text)" }}>Document change orders carefully.</strong> When the scope changes mid-project, create a separate invoice or clearly mark the additional work on your next progress invoice. Reference the change order number and the client&apos;s approval date.</p>
                <p><strong style={{ color: "var(--text)" }}>Add lien waiver language.</strong> In many states, contractors must provide lien waivers with each payment request. Include the appropriate conditional or unconditional lien waiver language in the Terms &amp; Conditions section of your invoice.</p>
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
                  { href: "/construction/concrete-calculator", title: "Concrete Calculator", desc: "Calculate exactly how much concrete you need for any project" },
                  { href: "/business-tools/meeting-cost-calculator", title: "Meeting Cost Calculator", desc: "See what meetings really cost with live timer and annual projections" },
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
