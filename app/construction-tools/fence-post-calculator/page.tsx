import type { Metadata } from "next";
import FenceCalculator from "../fence-calculator/components/FenceCalculator";

export const metadata: Metadata = {
  title: "Fence Post Calculator — Spacing, Depth & Concrete Estimator | EveryFreeTool",
  description: "Calculate how many fence posts you need, optimal spacing, post depth, and concrete bags per post. Works for wood, vinyl, metal, and chain link fences.",
  openGraph: { title: "Fence Post Calculator | EveryFreeTool", description: "Calculate fence post count, spacing, depth, and concrete. Works for all fence types.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "How many fence posts do I need?", a: "Divide your fence length by the post spacing and add 1. For 150 feet with 8-foot spacing: 150/8 + 1 = about 20 line posts. Then add corner posts (typically 4 for a rectangular yard), end posts, and gate posts (2 per gate)." },
  { q: "What is the standard fence post spacing?", a: "8 feet is standard for most residential wood and chain link fences. Vinyl and aluminum panels dictate spacing at 6 or 8 feet. Use 6-foot spacing for fences over 6 feet tall, high-wind areas, or when extra strength is needed." },
  { q: "How deep should fence posts be set?", a: "Bury at least one-third of the total post length, with a minimum of 24 inches. For a 6-foot fence: 24 inches deep. For an 8-foot fence: 30-36 inches deep. Always go below your local frost line to prevent heaving." },
  { q: "How much concrete per fence post?", a: "A 4x4 post needs about 1.5 bags of 50lb concrete (0.7 cubic feet of concrete). A 6x6 post needs about 2.5 bags. These are based on a standard 10-12 inch diameter hole at 24 inches deep." },
  { q: "When should I use 6x6 posts instead of 4x4?", a: "Use 6x6 posts for fences 8 feet or taller, gate posts (which bear extra stress from swinging), corner posts in high-wind areas, and any application where maximum strength is needed." },
  { q: "What about the frost line?", a: "Posts must be set below the frost line to prevent heaving. Frost lines range from 12 inches in the southern US to 72 inches in northern states. Check your local building code for the exact depth in your area." },
  { q: "Should I use concrete or gravel for fence posts?", a: "Concrete is recommended for most fences — it provides the strongest anchor. Gravel drainage at the bottom of the hole (2-3 inches) before the concrete helps water drain away from the post base, extending its life." },
];

export default function FencePostCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Fence Post Calculator", url: "https://everyfreetool.com/construction-tools/fence-post-calculator",
        description: "Calculate fence post count, spacing, depth, and concrete needed for any fence type.",
        applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "Post count calculator, spacing guide, depth calculator, concrete estimator, PDF download",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <FenceCalculator title="Free Fence Post Calculator" subtitle="Calculate post count, spacing, depth, and concrete for any fence project." />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Fence Post Spacing, Depth & Concrete Guide</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p>Fence posts are the foundation of any fence. Getting the spacing, depth, and concrete right determines how long your fence will stand and how well it will resist wind, ground movement, and everyday use. Here is what you need to know.</p>
                <p><strong style={{ color: "var(--text)" }}>Post spacing</strong> affects both strength and cost. The standard 8-foot spacing works for most residential fences up to 6 feet tall. For taller fences, high-wind regions, or heavy fence styles like board-on-board, reduce spacing to 6 feet. Vinyl and aluminum panels come in standard widths that dictate spacing automatically.</p>
                <p><strong style={{ color: "var(--text)" }}>Post depth</strong> follows the one-third rule: bury at least one-third of the total post length. For a 6-foot fence, use 8-foot posts and bury 24 inches. The absolute minimum depth is 24 inches, and you must always go below your local frost line to prevent heaving during freeze-thaw cycles.</p>
                <p><strong style={{ color: "var(--text)" }}>Post materials</strong> matter. Wood posts (4x4 or 6x6 pressure-treated) are standard for wood fences. Steel posts are used for chain link. Vinyl and aluminum fences use specialized posts designed for their panel systems. For wood, use 4x4 posts for fences up to 6 feet and 6x6 for anything taller or for gate and corner posts.</p>
                <p><strong style={{ color: "var(--text)" }}>Concrete</strong> secures the post in the ground. Quick-setting concrete (such as Quikrete) is the most popular choice &mdash; pour it dry into the hole around the post and add water. It sets in 20&ndash;40 minutes. Budget 1.5 bags of 50-pound concrete per 4x4 post or 2.5 bags per 6x6 post.</p>
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
                {[{ href: "/construction/concrete-calculator", title: "Concrete Calculator", desc: "Exact concrete for post holes" }, { href: "/construction-tools/fence-calculator", title: "Fence Calculator", desc: "Full materials list for any fence" }, { href: "/conversion-tools/unit-converter", title: "Unit Converter", desc: "Convert feet, meters, and more" }, { href: "/business-tools/invoice-generator", title: "Invoice Generator", desc: "Invoice for fence work" }].map(t => (<a key={t.href} href={t.href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}><p className="font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>{t.title}</p><p style={{ fontSize: "15px", color: "var(--text-muted)" }}>{t.desc}</p></a>))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
