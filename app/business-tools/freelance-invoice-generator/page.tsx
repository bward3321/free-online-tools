import type { Metadata } from "next";
import InvoiceGenerator from "../invoice-generator/components/InvoiceGenerator";

export const metadata: Metadata = {
  title: "Free Freelance Invoice Generator — Professional PDF Invoices | EveryFreeTool",
  description: "Freelancers: create polished invoices in under 60 seconds. Add your logo, hourly or project rates, and download PDF invoices. No signup, no fees.",
  openGraph: { title: "Free Freelance Invoice Generator | EveryFreeTool", description: "Create professional freelance invoices in seconds. Add your logo, rates, and download PDF. No signup.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "Is this invoice generator really free for freelancers?", a: "Yes, completely free with no hidden costs or usage limits. Create as many invoices as you need. No signup, no subscription, no credit card required." },
  { q: "Can I use hourly rates on my freelance invoice?", a: "Absolutely. Set the quantity to the number of hours worked and the rate to your hourly fee. The tool calculates the total for each line item automatically. You can mix hourly and flat-rate items on the same invoice." },
  { q: "How do I add my freelance business logo?", a: "Drag and drop your logo file onto the upload area, or click to browse. The logo appears in the invoice header and exports in the PDF. Supports PNG, JPG, SVG, and WebP up to 5 MB." },
  { q: "What payment terms should freelancers use?", a: "Net 30 is the most common, but Net 15 or Due on Receipt will get you paid faster. Choose payment terms from the dropdown and the due date is calculated automatically." },
  { q: "Can I create recurring invoices?", a: "While this tool does not send invoices automatically, it remembers your business details within a session. Duplicate a previous invoice, update the date and invoice number, and download a new PDF in seconds." },
  { q: "Is my client data private?", a: "Yes. Everything runs in your browser. No data is uploaded to any server. When you close the tab, the data is gone unless you saved the PDF." },
  { q: "What currencies can I use for international clients?", a: "The tool supports 25 currencies including USD, EUR, GBP, CAD, AUD, JPY, CHF, INR, and more. Each currency uses the correct symbol and number formatting." },
];

export default function FreelanceInvoiceGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free Freelance Invoice Generator",
        url: "https://everyfreetool.com/business-tools/freelance-invoice-generator",
        description: "Create professional freelance invoices in under 60 seconds. Add your logo, hourly or project rates, and download PDF invoices.",
        applicationCategory: "BusinessApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "PDF download, logo upload, multiple templates, tax calculation, discount, 25+ currencies",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <InvoiceGenerator title="Free Freelance Invoice Generator" subtitle="Create polished freelance invoices and download them as PDF in under 60 seconds." />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Why Freelancers Need Professional Invoices</h2>
              <p style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>Professional invoices do more than request payment — they establish credibility, create a paper trail for tax purposes, and set clear expectations with clients. A well-designed invoice with your logo, clear line items, and payment terms signals that you run a serious business. Many freelancers undercharge or get paid late simply because their invoicing process is informal or inconsistent. A professional invoice template solves both problems.</p>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>How to Create a Freelance Invoice</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Step 1 — Add your business details.</strong> Enter your name or business name, email, phone, and address. Upload your logo to brand the invoice. These details are saved within your session for future invoices.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 2 — Enter client information.</strong> Add your client&apos;s business name and address. This becomes the &quot;Bill To&quot; section on the invoice.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 3 — List your services.</strong> Add each deliverable as a line item. For hourly work, set the quantity to hours worked and the rate to your hourly fee. For project-based work, use a quantity of 1 and the total project fee as the rate.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 4 — Set payment terms and download.</strong> Choose Net 15, Net 30, or Due on Receipt. Add any applicable taxes or discounts. Review the preview and download your PDF.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Invoicing Best Practices for Freelancers</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Invoice immediately after delivery.</strong> The longer you wait to invoice, the longer you wait to get paid. Send your invoice the same day you deliver the work, or on the last day of the billing period for ongoing projects.</p>
                <p><strong style={{ color: "var(--text)" }}>Use clear, descriptive line items.</strong> Instead of &quot;Design Services,&quot; write &quot;Homepage redesign — wireframes, mockups, and final design files (3 rounds of revisions).&quot; Detailed descriptions reduce questions and disputes.</p>
                <p><strong style={{ color: "var(--text)" }}>Set shorter payment terms.</strong> Net 15 gets you paid roughly twice as fast as Net 30, and most clients will not object. For new clients or large projects, consider requiring a 50% deposit upfront.</p>
                <p><strong style={{ color: "var(--text)" }}>Include late payment terms.</strong> A simple note like &quot;Late payments are subject to a 1.5% monthly interest charge&quot; in your terms and conditions discourages delayed payments without creating friction.</p>
                <p><strong style={{ color: "var(--text)" }}>Follow up professionally.</strong> If payment is overdue, send a polite reminder at 3 days, 7 days, and 14 days. Reference the invoice number and original due date. Most late payments are due to oversight, not intent.</p>
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
                  { href: "/business-tools/meeting-cost-calculator", title: "Meeting Cost Calculator", desc: "See what meetings really cost with live timer and annual projections" },
                  { href: "/utility-tools/password-generator", title: "Password Generator", desc: "Generate uncrackable passwords and passphrases instantly" },
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
