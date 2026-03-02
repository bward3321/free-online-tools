import type { Metadata } from "next";
import FenceCalculator from "./components/FenceCalculator";

export const metadata: Metadata = {
  title: "Free Fence Calculator — Estimate Materials, Posts & Cost Instantly | EveryFreeTool",
  description: "Calculate fence materials, posts, rails, pickets, concrete, and cost for any fence type. Wood, vinyl, chain link, aluminum. Free, instant results, no signup.",
  openGraph: { title: "Free Fence Calculator — Materials, Posts & Cost | EveryFreeTool", description: "Calculate fence materials, posts, rails, pickets, concrete, and cost. Free, instant results.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "How many fence posts do I need for 100 feet?", a: "With standard 8-foot spacing, you need about 14 posts for 100 linear feet of fencing (100 / 8 + 1 = 13.5, rounded up to 14). Add extra posts for corners, ends, and gates." },
  { q: "How deep should fence posts be?", a: "The standard rule is to bury one-third of the total post length, with a minimum of 24 inches. For a 6-foot fence, use 8-foot posts and bury 24 inches. For an 8-foot fence, bury at least 30-36 inches. Always go below your local frost line." },
  { q: "How much concrete do I need per fence post?", a: "For a standard 4x4 post in a 10-inch diameter hole, plan on 1.5 bags of 50-pound concrete or 1 bag of 80-pound concrete. For 6x6 posts, use 2.5 bags of 50-pound or 1.5 bags of 80-pound concrete." },
  { q: "What is the standard fence post spacing?", a: "Standard residential fence post spacing is 8 feet for most materials. Use 6-foot spacing for taller fences (8 feet+), high-wind areas, or when extra strength is needed. Vinyl and aluminum panels typically dictate spacing at 6 or 8 feet." },
  { q: "How much does it cost to fence a yard?", a: "A typical 150-foot wood privacy fence costs $2,500-$4,500 for materials (DIY) or $4,500-$7,500 professionally installed. Chain link is the most affordable at $8-$15 per foot for materials. Vinyl and composite are premium options at $25-$50 per foot." },
  { q: "Do I need a permit to build a fence?", a: "Most municipalities require permits for fences over 6 feet tall. Some require permits for any fence. Check with your local building department before starting. You may also need to confirm property lines and setback requirements." },
  { q: "What is the cheapest type of fence to install?", a: "Chain link is the most affordable fence type at $8-$15 per linear foot for materials. Pressure-treated pine is the cheapest wood option at $12-$18 per foot. Split rail is affordable but offers no privacy." },
];

export default function FenceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free Fence Calculator",
        url: "https://everyfreetool.com/construction-tools/fence-calculator",
        description: "Calculate fence materials, posts, rails, pickets, concrete, and cost for any fence type.",
        applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "Materials calculator, cost estimator, wood fence, vinyl fence, chain link fence, PDF download, post spacing calculator",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />

      <FenceCalculator />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>How to Plan Your Fence Project</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p>Planning a fence starts with accurate measurements. Walk your property line with a measuring wheel or long tape measure and record the total length where you want fencing. Note where gates will go and where the fence changes direction &mdash; these are your corner posts. Subtract gate widths from the total length to get the fenceable length.</p>
                <p>Before buying materials, check your local building codes. Most municipalities have rules about maximum fence height (usually 6 feet for backyards, 4 feet for front yards), setback distances from property lines (typically 2&ndash;6 inches), and permit requirements. Call 811 to have underground utilities marked before you dig &mdash; it is free and required by law in most states.</p>
                <p>Choose your material based on your priorities. Wood offers the most customization at moderate cost. Vinyl is maintenance-free but more expensive upfront. Chain link is the most affordable for large areas. Aluminum provides an elegant ornamental look. Composite gives you the appearance of wood with virtually zero maintenance.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Common Fence Calculations Explained</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Post count:</strong> Divide your fence length by the post spacing (typically 8 feet), then add 1. A 150-foot fence with 8-foot spacing needs 150 / 8 + 1 = about 20 line posts, plus corner posts and gate posts.</p>
                <p><strong style={{ color: "var(--text)" }}>Post depth:</strong> Bury at least one-third of the total post length, with a minimum of 24 inches. For a 6-foot fence, use 8-foot posts and bury 24 inches. Always go below your frost line.</p>
                <p><strong style={{ color: "var(--text)" }}>Picket count:</strong> Convert your fenceable length to inches and divide by the board width plus spacing. For a 150-foot privacy fence using 5.5-inch boards with no gaps: 1,800 inches / 5.5 = 327 pickets.</p>
                <p><strong style={{ color: "var(--text)" }}>Concrete:</strong> Each 4x4 post needs about 1.5 bags of 50-pound concrete. A 6x6 post needs about 2.5 bags. Multiply by your total post count for the full order.</p>
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
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: "/construction/concrete-calculator", title: "Concrete Calculator", desc: "Calculate exactly how much concrete you need for fence post footings" },
                  { href: "/conversion-tools/unit-converter", title: "Unit Converter", desc: "Convert between feet, meters, inches, and 200+ other units" },
                  { href: "/business-tools/invoice-generator", title: "Invoice Generator", desc: "Need to invoice for a fence job? Create professional PDFs instantly" },
                  { href: "/business-tools/meeting-cost-calculator", title: "Meeting Cost Calculator", desc: "See what meetings really cost with live timer and projections" },
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
