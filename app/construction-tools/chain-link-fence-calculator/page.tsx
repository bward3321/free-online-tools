import type { Metadata } from "next";
import FenceCalculator from "../fence-calculator/components/FenceCalculator";

export const metadata: Metadata = {
  title: "Chain Link Fence Calculator — Fabric, Posts & Hardware Estimator | EveryFreeTool",
  description: "Calculate chain link fence materials: fabric, posts, top rail, tension wire, ties, and fittings. Residential and commercial gauges. Free instant estimates.",
  openGraph: { title: "Chain Link Fence Calculator | EveryFreeTool", description: "Calculate chain link fence fabric, posts, top rail, and hardware. Free instant estimates.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "How much chain link fabric do I need?", a: "Chain link fabric comes in 50-foot rolls. Divide your fenceable length (total length minus gate openings) by 50 and round up. For 150 feet of fencing: 150 / 50 = 3 rolls." },
  { q: "What gauge chain link should I use?", a: "11 gauge is standard for residential use and provides good durability. 9 gauge is heavier commercial-grade for high-security or high-traffic areas. 11.5 gauge is a lighter economy option suitable for temporary or low-stress applications." },
  { q: "How much does a chain link fence cost?", a: "Residential chain link costs $8-$15 per linear foot for materials and $15-$25 per foot installed. Vinyl-coated chain link adds about 30% to materials cost. Commercial heavy-gauge installations can reach $25+ per foot." },
  { q: "Can you add privacy to a chain link fence?", a: "Yes. Privacy slats weave into the mesh and provide 70-90% privacy. They come in various colors and materials. Alternatively, privacy screens or fabric can be attached to the outside of the fence." },
  { q: "How long does chain link fencing last?", a: "Galvanized chain link lasts 15-20 years. Vinyl-coated chain link can last 20-25+ years as the coating provides additional corrosion protection. The posts and framework typically outlast the mesh." },
  { q: "What is top rail and do I need it?", a: "Top rail is a horizontal pipe that runs along the top of the fence, connecting the posts and providing structural rigidity. It is standard and recommended for all chain link installations." },
];

export default function ChainLinkFenceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Chain Link Fence Calculator", url: "https://everyfreetool.com/construction-tools/chain-link-fence-calculator",
        description: "Calculate chain link fence materials: fabric, posts, top rail, tension wire, ties, and fittings.",
        applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "Chain link materials calculator, fabric rolls, tension bars, post calculator, cost estimator",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <FenceCalculator title="Free Chain Link Fence Calculator" subtitle="Calculate fabric, posts, top rail, hardware, and costs for your chain link fence." defaultMaterial="chainlink" />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Chain Link Fence Guide: Gauges, Coatings & Hardware</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p>Chain link is the most cost-effective fencing material for enclosing large areas. The mesh fabric is woven from galvanized steel wire and stretched between steel posts. It provides security and boundary definition while maintaining visibility &mdash; making it ideal for backyards, sports fields, and commercial properties.</p>
                <p><strong style={{ color: "var(--text)" }}>Wire gauge</strong> determines strength. Lower gauge numbers mean thicker, stronger wire. 11 gauge is the residential standard. 9 gauge is commercial-grade and significantly more durable. 11.5 gauge is an economy option for temporary fencing or low-stress applications.</p>
                <p><strong style={{ color: "var(--text)" }}>Coatings</strong> affect durability and appearance. Standard galvanized chain link is silver-colored and the most affordable. Vinyl-coated chain link comes in green, black, or brown, blends better with landscaping, and lasts longer due to the additional corrosion protection.</p>
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
                {[{ href: "/construction/concrete-calculator", title: "Concrete Calculator", desc: "Calculate concrete for post footings" }, { href: "/construction-tools/fence-calculator", title: "Fence Calculator", desc: "Compare all fence material types" }, { href: "/conversion-tools/unit-converter", title: "Unit Converter", desc: "Convert measurements" }, { href: "/business-tools/invoice-generator", title: "Invoice Generator", desc: "Invoice for fence work" }].map(t => (<a key={t.href} href={t.href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}><p className="font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>{t.title}</p><p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{t.desc}</p></a>))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
