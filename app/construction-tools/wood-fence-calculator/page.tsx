import type { Metadata } from "next";
import FenceCalculator from "../fence-calculator/components/FenceCalculator";

export const metadata: Metadata = {
  title: "Wood Fence Calculator — Posts, Pickets, Rails & Cost Estimator | EveryFreeTool",
  description: "Calculate exactly how many posts, rails, pickets, and concrete bags you need for your wood fence. Privacy, picket, and board-on-board styles. Free instant results.",
  openGraph: { title: "Wood Fence Calculator | EveryFreeTool", description: "Calculate posts, rails, pickets, and concrete for your wood fence. Free instant results.", type: "website" },
  robots: "index, follow",
};

const faqs = [
  { q: "How many pickets do I need for a 6-foot wood privacy fence?", a: "For a 150-foot privacy fence using standard 5.5-inch (1x6) boards with no gaps, you need about 327 pickets. The formula is: fence length in inches / board width. Add 10% extra for waste and bad cuts." },
  { q: "What is the best wood for a fence?", a: "Cedar is the best all-around choice — naturally rot-resistant, beautiful, and long-lasting (15-25 years). Pressure-treated pine is the most affordable and lasts 10-15 years. Redwood is premium quality but expensive and mostly available in the western US." },
  { q: "How long does a wood fence last?", a: "Pressure-treated pine lasts 10-15 years, cedar 15-25 years, and redwood 20-30 years. Proper maintenance (staining every 2-3 years, replacing damaged boards promptly) can extend lifespan significantly." },
  { q: "Should I use 4x4 or 6x6 fence posts?", a: "Use 4x4 posts for fences up to 6 feet tall. Use 6x6 posts for 8-foot fences, gate posts, corner posts in high-wind areas, and when you want maximum durability. 6x6 posts cost more but provide significantly more strength." },
  { q: "How much does a wood fence cost per foot?", a: "Materials only: pressure-treated pine costs $12-$18 per linear foot for a privacy fence, cedar $18-$30, and redwood $25-$40. Professional installation adds $15-$25 per foot for standard fences." },
  { q: "What is board-on-board fencing?", a: "Board-on-board (also called shadowbox) has alternating boards on both sides of the rails, creating a fence that looks the same from either side. It provides privacy while allowing some airflow. It uses about 50% more boards than a standard privacy fence." },
  { q: "How many rails does a wood fence need?", a: "Use 2 rails for fences under 5 feet, 3 rails for 5-7 foot fences (standard), and 4 rails for 8-foot fences. More rails mean more strength and less board warping." },
];

export default function WoodFenceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Wood Fence Calculator", url: "https://everyfreetool.com/construction-tools/wood-fence-calculator",
        description: "Calculate posts, rails, pickets, and concrete for wood fences. Privacy, picket, board-on-board styles.",
        applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: "Wood fence materials calculator, picket counter, post calculator, cost estimator, PDF download",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />

      <FenceCalculator title="Free Wood Fence Calculator" subtitle="Calculate posts, rails, pickets, concrete, and costs for your wood fence project." defaultMaterial="wood" />

      <div className="min-h-0" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[800px] mx-auto px-4 pb-16">
          <article className="space-y-8">
            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Wood Fence Types & Lumber Guide</h2>
              <div className="space-y-3" style={{ fontSize: "17px", lineHeight: "1.75", color: "var(--text-muted)" }}>
                <p><strong style={{ color: "var(--text)" }}>Privacy fences</strong> use boards placed side by side with no gaps, providing complete visual and physical separation. They are the most popular residential style for backyards. Standard height is 6 feet, using 1x6 boards on three horizontal rails.</p>
                <p><strong style={{ color: "var(--text)" }}>Picket fences</strong> are the classic American fence &mdash; shorter (3&ndash;4 feet), with evenly spaced pointed or dog-eared boards. They define property lines and contain pets without blocking views. Typical spacing is 1.5&ndash;2.5 inches between pickets.</p>
                <p><strong style={{ color: "var(--text)" }}>Board-on-board (shadowbox)</strong> alternates boards on both sides of the rails. The result is a fence that looks attractive from both sides, allows some airflow while maintaining privacy, and avoids the &quot;ugly side faces the neighbor&quot; problem. It uses roughly 50% more lumber than a standard privacy fence.</p>
                <p><strong style={{ color: "var(--text)" }}>Horizontal fences</strong> run boards horizontally for a modern, contemporary look. They are popular in newer construction and use the same amount of lumber as vertical fences but require more careful installation to prevent sagging.</p>
                <p>For lumber, <strong style={{ color: "var(--text)" }}>pressure-treated pine</strong> is the most affordable and widely available. <strong style={{ color: "var(--text)" }}>Cedar</strong> is naturally rot-resistant with a beautiful grain &mdash; it costs 50&ndash;80% more than pine but lasts longer and ages gracefully. <strong style={{ color: "var(--text)" }}>Redwood</strong> is the premium choice with the best natural durability but is expensive and primarily available in the western United States.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map(f => (
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
                  { href: "/construction/concrete-calculator", title: "Concrete Calculator", desc: "Calculate concrete for fence post footings" },
                  { href: "/conversion-tools/unit-converter", title: "Unit Converter", desc: "Convert feet, meters, inches, and more" },
                  { href: "/business-tools/invoice-generator", title: "Invoice Generator", desc: "Invoice for a fence job" },
                  { href: "/construction-tools/fence-calculator", title: "Fence Calculator", desc: "Compare all fence material types" },
                ].map(t => (
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
