import type { Metadata } from "next";
import FenceCalculator from "../fence-calculator/components/FenceCalculator";

export const metadata: Metadata = {
  title: "Fence Cost Estimator — Materials & Labor Cost Calculator | EveryFreeTool",
  description: "Estimate total fence project costs including materials and labor. Compare wood, vinyl, chain link, and aluminum pricing. Get a budget breakdown instantly.",
  openGraph: { title: "Fence Cost Estimator | EveryFreeTool", description: "Estimate total fence costs including materials and labor. Compare pricing by material. Free.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "How much does it cost to fence a backyard?", a: "A typical 150-foot backyard fence costs $1,200-$2,500 for chain link, $2,500-$4,500 for wood, $4,000-$7,000 for vinyl, and $4,500-$8,000 for aluminum (materials only). Professional installation adds $15-$25+ per foot." },
  { q: "How much does fence installation labor cost?", a: "Labor typically costs $15-$25 per linear foot for standard installations. Complex jobs (8ft+ fences, rocky soil, slopes) can run $25-$40 per foot. Labor usually represents 40-60% of the total professionally installed cost." },
  { q: "Is it cheaper to build a fence yourself?", a: "DIY saves 40-60% compared to professional installation — typically $1,500-$4,000 on a standard backyard fence. However, you need the right tools and skills. Post hole diggers, levels, string lines, and a helper are essential." },
  { q: "What hidden costs should I budget for?", a: "Budget for permits ($50-$200), old fence removal ($3-$5/ft), grading/slope adjustments ($500+), property survey if needed ($300-$800), and 10% extra materials for waste. Also consider stain/sealant for wood fences ($100-$300)." },
  { q: "What is the cheapest fence to install?", a: "Chain link is the most affordable at $8-$15 per foot for materials. Pressure-treated pine split rail is the cheapest wood option at $8-$15/ft. For privacy, pressure-treated pine board fencing at $12-$18/ft is the budget choice." },
  { q: "How can I save money on my fence project?", a: "Go DIY to save on labor. Choose pressure-treated pine over cedar. Use 8-foot post spacing instead of 6. Remove the old fence yourself. Shop end-of-season sales. Compare prices between big-box stores and local lumber yards." },
];

export default function FenceCostEstimatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Fence Cost Estimator", url: "https://everyfreetool.com/construction-tools/fence-cost-estimator",
        description: "Estimate total fence project costs including materials and labor for all fence types.",
        applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "Cost estimator, DIY vs professional comparison, materials breakdown, per-foot pricing",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <FenceCalculator title="Free Fence Cost Estimator" subtitle="Estimate materials and labor costs for any fence project. Compare DIY vs professional pricing." emphasisView="cost" />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Fence Cost Breakdown: What to Budget For</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p>Fence costs vary dramatically based on material, height, terrain, and whether you hire a professional or DIY. Understanding the cost components helps you budget accurately and avoid sticker shock when quotes come in.</p>
                <p><strong style={{ color: "var(--text)" }}>Materials</strong> are typically 40&ndash;60% of a professionally installed fence. Wood materials range from $12&ndash;$40 per linear foot depending on species and style. Vinyl runs $20&ndash;$40/ft. Chain link is the budget option at $8&ndash;$15/ft. Aluminum and composite are premium at $25&ndash;$55/ft.</p>
                <p><strong style={{ color: "var(--text)" }}>Labor</strong> runs $15&ndash;$25 per linear foot for standard installations. Complex jobs &mdash; 8-foot fences, sloped terrain, rocky soil &mdash; can push labor to $25&ndash;$40/ft. Getting multiple quotes (at least three) is essential, as pricing varies significantly between contractors.</p>
                <p><strong style={{ color: "var(--text)" }}>Hidden costs</strong> catch many homeowners off guard. Permits run $50&ndash;$200 in most areas. Removing an old fence adds $3&ndash;$5 per foot. A property survey ($300&ndash;$800) may be needed to confirm boundaries. Grading on sloped lots can add $500 or more. Always budget 10% extra for unexpected issues.</p>
                <p><strong style={{ color: "var(--text)" }}>DIY savings</strong> are substantial &mdash; typically 40&ndash;60% off the professionally installed price. A fence that costs $6,000 installed might cost $2,500&ndash;$3,500 in materials alone. The trade-off is your time and labor. Most DIYers can install 30&ndash;50 feet of fence per day.</p>
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
                {[{ href: "/construction-tools/fence-calculator", title: "Fence Calculator", desc: "Full materials list for any fence" }, { href: "/construction/concrete-calculator", title: "Concrete Calculator", desc: "Concrete for post footings" }, { href: "/business-tools/invoice-generator", title: "Invoice Generator", desc: "Invoice for fence work" }, { href: "/conversion-tools/unit-converter", title: "Unit Converter", desc: "Convert measurements" }].map(t => (<a key={t.href} href={t.href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}><p className="font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>{t.title}</p><p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{t.desc}</p></a>))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
