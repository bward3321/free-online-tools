import type { Metadata } from "next";
import FenceCalculator from "../fence-calculator/components/FenceCalculator";

export const metadata: Metadata = {
  title: "Privacy Fence Calculator — Materials & Cost for 6ft Privacy Fences | EveryFreeTool",
  description: "Plan your privacy fence project. Calculate posts, rails, boards, and concrete for 6-foot and 8-foot privacy fences. Wood and vinyl options. Free instant results.",
  openGraph: { title: "Privacy Fence Calculator | EveryFreeTool", description: "Calculate materials and cost for privacy fences. 6ft and 8ft options. Free instant results.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "How tall should a privacy fence be?", a: "6 feet is the standard height for residential privacy fences — it blocks views from standing neighbors. 8 feet provides maximum privacy but may require a permit and uses more materials. Check local codes before building over 6 feet." },
  { q: "How much does a privacy fence cost?", a: "A 150-foot wood privacy fence costs $2,500-$4,500 for materials (pressure-treated pine) or $4,000-$7,000 for cedar. Vinyl privacy runs $4,000-$7,000 materials. Add $15-$25/ft for professional installation." },
  { q: "What is the best material for a privacy fence?", a: "Cedar is the best wood for privacy fences — naturally rot-resistant and ages beautifully. Vinyl is the best low-maintenance option. Pressure-treated pine is the most affordable. Composite offers the wood look with vinyl-level maintenance." },
  { q: "How far from the property line should a privacy fence be?", a: "Most jurisdictions require a 2-6 inch setback from the property line. Some areas require the 'good side' (flat side without visible rails) to face outward. Always verify with your local building department." },
  { q: "Do I need a permit for a privacy fence?", a: "Most areas require permits for fences over 6 feet. Some require permits for any fence. Privacy fences near sidewalks, driveways, or intersections often have additional height restrictions for visibility. Check local codes first." },
  { q: "What about my neighbor?", a: "Many areas have 'good neighbor' laws requiring the finished (flat) side to face the neighbor. Board-on-board style looks the same from both sides, avoiding this issue entirely. Always communicate with neighbors before building — it prevents disputes." },
  { q: "How long does a privacy fence last?", a: "Pressure-treated pine: 10-15 years. Cedar: 15-25 years. Vinyl: 20-30 years. Maintenance (staining wood every 2-3 years, replacing damaged boards) significantly extends lifespan." },
];

export default function PrivacyFenceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Privacy Fence Calculator", url: "https://everyfreetool.com/construction-tools/privacy-fence-calculator",
        description: "Calculate materials and cost for 6-foot and 8-foot privacy fences. Wood and vinyl options.",
        applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "Privacy fence materials calculator, post calculator, cost estimator, PDF download",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <FenceCalculator title="Free Privacy Fence Calculator" subtitle="Calculate materials and cost for your 6-foot or 8-foot privacy fence." defaultMaterial="wood" defaultWoodStyle="privacy" defaultHeight={6} />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Privacy Fence Planning: Height, Codes & Best Practices</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p>A privacy fence transforms your backyard into a secluded retreat. The most important decisions are height, material, and style &mdash; and each one affects your materials list, cost, and compliance with local regulations.</p>
                <p><strong style={{ color: "var(--text)" }}>Height regulations</strong> vary by jurisdiction but most areas allow 6-foot fences in backyards without a special permit. Front yard fences are typically limited to 3&ndash;4 feet. Fences over 6 feet almost always require a permit and may face additional engineering requirements. Some HOAs have their own restrictions on top of municipal codes.</p>
                <p><strong style={{ color: "var(--text)" }}>Setback requirements</strong> dictate how far your fence must be from the property line &mdash; typically 2&ndash;6 inches. Building directly on the property line can create legal disputes with neighbors. When in doubt, get a survey to confirm your exact boundaries before installation.</p>
                <p><strong style={{ color: "var(--text)" }}>Good neighbor considerations</strong> are both legal and practical. Many municipalities require the &quot;good side&quot; (flat face without visible rails and posts) to face outward. Board-on-board fencing solves this by looking identical from both sides. Regardless of legal requirements, communicating with your neighbors before building prevents costly disputes.</p>
                <p>For maximum privacy, use <strong style={{ color: "var(--text)" }}>solid board-on-board construction</strong> with zero gaps between boards. A 6-foot height blocks views from standing adults. For areas with slopes, stepped panels maintain a consistent height while following the terrain. Consider adding lattice toppers for extra height without the solid-wall appearance that some codes restrict.</p>
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
                {[{ href: "/construction/concrete-calculator", title: "Concrete Calculator", desc: "Concrete for post footings" }, { href: "/construction-tools/fence-calculator", title: "Fence Calculator", desc: "Compare all fence material types" }, { href: "/conversion-tools/unit-converter", title: "Unit Converter", desc: "Convert measurements" }, { href: "/business-tools/invoice-generator", title: "Invoice Generator", desc: "Invoice for fence work" }].map(t => (<a key={t.href} href={t.href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}><p className="font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>{t.title}</p><p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{t.desc}</p></a>))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
