import type { Metadata } from "next";
import FenceCalculator from "../fence-calculator/components/FenceCalculator";

export const metadata: Metadata = {
  title: "Vinyl Fence Calculator — Panels, Posts & Cost Estimator | EveryFreeTool",
  description: "Estimate materials and cost for your vinyl fence project. Calculate panels, posts, caps, and concrete. Compare vinyl fence styles and get instant results.",
  openGraph: { title: "Vinyl Fence Calculator | EveryFreeTool", description: "Calculate vinyl fence panels, posts, caps, and concrete. Free instant results.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "How much does a vinyl fence cost per foot?", a: "Vinyl fence materials cost $20-$40 per linear foot for privacy panels and $15-$25 for picket styles. Professional installation adds $15-$25 per foot. A 150-foot vinyl privacy fence typically costs $4,000-$7,000 for materials or $6,000-$11,000 installed." },
  { q: "How long does a vinyl fence last?", a: "Vinyl fences typically last 20-30 years with virtually no maintenance. They won't rot, warp, or need painting. UV-stabilized vinyl resists fading and yellowing over time." },
  { q: "Is vinyl fencing cheaper than wood?", a: "Vinyl costs more upfront ($25-$40/ft vs $12-$30/ft for wood), but requires no staining, painting, or board replacement. Over a 20-year period, vinyl often costs less overall when maintenance is factored in." },
  { q: "Can vinyl fencing withstand high winds?", a: "Quality vinyl fences are engineered to withstand winds up to 75-100 mph when properly installed with concrete-set posts. Privacy panels offer more wind resistance than picket styles due to their solid surface area." },
  { q: "What colors does vinyl fencing come in?", a: "White is the most popular and affordable option. Tan, gray, and woodgrain-textured finishes are also available. Custom colors cost more and may have longer lead times." },
  { q: "How many vinyl fence panels do I need?", a: "Divide your total fence length by the panel width (typically 6 or 8 feet). For 150 feet with 6-foot panels: 150 / 6 = 25 panels. Add posts between every panel plus corners and gate posts." },
];

export default function VinylFenceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Vinyl Fence Calculator", url: "https://everyfreetool.com/construction-tools/vinyl-fence-calculator",
        description: "Estimate materials and cost for vinyl fence projects. Panels, posts, caps, and concrete.",
        applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "Vinyl fence materials calculator, panel counter, post calculator, cost estimator, PDF download",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <FenceCalculator title="Free Vinyl Fence Calculator" subtitle="Calculate panels, posts, caps, concrete, and costs for your vinyl fence project." defaultMaterial="vinyl" />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Vinyl Fence Guide: Styles, Costs & Installation</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p>Vinyl fencing has become one of the most popular residential fence materials because it offers genuine set-it-and-forget-it durability. Unlike wood, vinyl will not rot, warp, splinter, or require staining. A quality vinyl fence lasts 20&ndash;30 years with nothing more than occasional cleaning with a garden hose.</p>
                <p><strong style={{ color: "var(--text)" }}>Privacy panels</strong> are the most popular style &mdash; solid panels that provide complete visual screening. <strong style={{ color: "var(--text)" }}>Semi-privacy</strong> panels feature lattice tops or spaced boards that allow some airflow while maintaining most privacy. <strong style={{ color: "var(--text)" }}>Picket styles</strong> offer the classic look with zero maintenance. <strong style={{ color: "var(--text)" }}>Ranch rail</strong> uses 2&ndash;4 horizontal rails for an open, rural aesthetic.</p>
                <p>Vinyl panels come in standard widths of 6 or 8 feet, making installation straightforward. Posts are spaced to match panel widths, and panels slide into routed slots on the posts. The system is designed for efficient installation &mdash; many homeowners complete a vinyl fence as a weekend DIY project.</p>
              </div>
            </section>
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map(f => (<details key={f.q} className="group rounded-xl border p-4" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}><summary className="cursor-pointer font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>{f.q}</summary><p className="mt-2" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>{f.a}</p></details>))}
              </div>
            </section>
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[{ href: "/construction/concrete-calculator", title: "Concrete Calculator", desc: "Calculate concrete for fence post footings" }, { href: "/construction-tools/fence-calculator", title: "Fence Calculator", desc: "Compare all fence material types" }, { href: "/conversion-tools/unit-converter", title: "Unit Converter", desc: "Convert feet, meters, and more" }, { href: "/business-tools/invoice-generator", title: "Invoice Generator", desc: "Invoice for a fence job" }].map(t => (<a key={t.href} href={t.href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}><p className="font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>{t.title}</p><p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{t.desc}</p></a>))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
