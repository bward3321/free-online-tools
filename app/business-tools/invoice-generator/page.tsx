import type { Metadata } from "next";
import InvoiceGenerator from "./components/InvoiceGenerator";

export const metadata: Metadata = {
  title: "Free Invoice Generator — Create & Download PDF Invoices Instantly | EveryFreeTool",
  description: "Create professional invoices in seconds. No signup required. Add your logo, line items, taxes, discounts, and notes. Download as PDF instantly. 100% free, 100% private.",
  openGraph: { title: "Free Invoice Generator — Create & Download PDF Invoices | EveryFreeTool", description: "Create professional invoices in seconds. Add your logo, line items, taxes & discounts. Download as PDF instantly. No signup required.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "Is this invoice generator really free?", a: "Yes, completely free with no hidden costs, no signup, and no limits on the number of invoices you can create. The tool runs entirely in your browser." },
  { q: "Is my data private and secure?", a: "Absolutely. Your invoice data never leaves your browser. Nothing is uploaded to any server. When you close the tab, your data is gone unless you downloaded the PDF." },
  { q: "Can I add my logo to the invoice?", a: "Yes. Drag and drop your logo (PNG, JPG, SVG, or WebP up to 5 MB) onto the upload area, or click to browse. Your logo appears in the invoice header and in the downloaded PDF." },
  { q: "What currencies are supported?", a: "The tool supports 25 currencies including USD, EUR, GBP, CAD, AUD, JPY, CHF, INR, BRL, MXN, CNY, KRW, SGD, HKD, NZD, and more. Each currency uses the correct symbol and formatting." },
  { q: "Can I customize the invoice template?", a: "Yes. Choose from four professional templates (Classic, Modern, Elegant, and Bold) and pick from eight accent colors or enter any custom hex color. Every template produces a polished PDF." },
  { q: "What is the difference between an invoice and a receipt?", a: "An invoice is a request for payment sent before or at the time of delivery. A receipt is proof that payment has been received. This tool can generate both — select Receipt as the document type and a PAID stamp is added automatically." },
  { q: "Can I save my invoices for later?", a: "Your form data persists within a browser session so you can refresh without losing work. For permanent storage, download the PDF. The tool also remembers your business details for creating multiple invoices in one session." },
];

export default function InvoiceGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free Invoice Generator",
        url: "https://everyfreetool.com/business-tools/invoice-generator",
        description: "Create professional invoices in seconds. Add your logo, line items, taxes, discounts, and notes. Download as PDF instantly.",
        applicationCategory: "BusinessApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "PDF download, logo upload, multiple templates, tax calculation, discount, 25+ currencies",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <InvoiceGenerator title="Free Invoice Generator" subtitle="Create professional invoices and download them as PDF. No signup required." />

      {/* SEO Content */}
      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>What Is an Invoice Generator?</h2>
              <p style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>An invoice generator is a tool that lets you create professional billing documents without specialized accounting software. Instead of wrestling with spreadsheet templates or paying for monthly subscriptions, you fill out a simple form and download a polished PDF in seconds. This tool runs entirely in your browser, which means your financial data never touches a server and you can create unlimited invoices for free.</p>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>How to Create an Invoice</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Step 1 — Enter your business details.</strong> Add your business name, contact information, and optionally upload your logo. These details persist within your session so you only enter them once.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 2 — Add your client information.</strong> Fill in the client&apos;s business name and address. This is the &quot;Bill To&quot; section that appears on the invoice.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 3 — Add line items.</strong> Describe each product or service, set the quantity and rate, and the tool calculates the amount automatically. Add as many line items as you need.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 4 — Configure taxes and discounts.</strong> Add percentage or flat-rate discounts, apply one or two tax lines (exclusive or inclusive), and add shipping or additional fees. The total updates in real time.</p>
                <p><strong style={{ color: "var(--text)" }}>Step 5 — Download your PDF.</strong> Choose a template and accent color, review the live preview, and click Download PDF. The file is generated instantly in your browser.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Key Features</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Four professional templates.</strong> Classic offers clean minimalism, Modern adds bold accent bars and alternating row colors, Elegant uses serif typography for a refined feel, and Bold delivers high-contrast headers that stand out. Every template produces a PDF you would be proud to send to any client.</p>
                <p><strong style={{ color: "var(--text)" }}>25 currencies with proper formatting.</strong> Switch between USD, EUR, GBP, JPY, INR, and 20 more currencies. Each one uses the correct symbol, decimal format, and thousands separator.</p>
                <p><strong style={{ color: "var(--text)" }}>Flexible tax and discount system.</strong> Add percentage or flat-rate discounts, apply up to two tax lines (with exclusive or inclusive modes), and include shipping or additional fees. The totals section recalculates instantly.</p>
                <p><strong style={{ color: "var(--text)" }}>Logo upload and branding.</strong> Drag and drop your logo onto the form. It appears in the invoice header and exports cleanly in the PDF. Supports PNG, JPG, SVG, and WebP formats up to 5 MB.</p>
                <p><strong style={{ color: "var(--text)" }}>Six document types.</strong> Generate invoices, estimates, quotes, receipts, credit notes, or proforma invoices. Each type updates the document title, and receipts automatically include a PAID stamp.</p>
                <p><strong style={{ color: "var(--text)" }}>Complete privacy.</strong> Your data stays in your browser. Nothing is uploaded, tracked, or stored on any server. When you close the tab, the data is gone.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>What to Include on Every Invoice</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p>A complete invoice should include your business name and contact details, the client&apos;s name and address, a unique invoice number, the issue date and due date, a detailed list of products or services with quantities and rates, the subtotal, any applicable taxes and discounts, the total amount due, payment terms, and your preferred payment method.</p>
                <p>Including a purchase order number or project reference helps larger clients route your invoice through their accounts payable system faster. Adding clear payment terms (Net 30, Due on Receipt, etc.) sets expectations and reduces late payments. If you accept multiple payment methods, list them all — the easier you make it to pay, the faster you get paid.</p>
                <p>Many jurisdictions require certain information on invoices, such as a tax identification number, VAT registration, or business registration number. Check your local requirements and use the Tax ID field to include this information on every invoice.</p>
              </div>
            </section>

            {/* FAQ */}
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

            {/* Related Tools */}
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
