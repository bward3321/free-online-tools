import type { Metadata } from "next";
import SalaryNegotiationCalculator from "../salary-negotiation-calculator/components/SalaryNegotiationCalculator";

export const metadata: Metadata = {
  title: "The Cost of Not Negotiating Your Salary: How One Conversation Changes Everything | EveryFreeTool",
  description: "The average person loses $1\u2013$1.5 million by not negotiating their salary. See the real math: a $5,000 gap compounds into $600K\u2013$900K. Calculator + negotiation scripts included.",
  openGraph: { title: "The Cost of Not Negotiating Your Salary", description: "One conversation you didn\u2019t have could cost you $1 million+. See the compounding math and get negotiation scripts.", type: "website" },
  robots: "index, follow",
};

export default function CostOfNotNegotiatingPage() {
  const faqs = [
    { name: "How much does not negotiating cost over a lifetime?", text: "Carnegie Mellon economist Linda Babcock estimates $1 million to $1.5 million in lifetime lost earnings. A $5,000 starting gap compounds into $600,000\u2013$900,000 over a 40-year career." },
    { name: "Why is the cost so high?", text: "Every future raise, bonus, 401(k) match, and job offer is calculated as a percentage of your current salary. A lower base means every percentage-based increase is permanently smaller, and that gap widens exponentially over decades." },
    { name: "What stops people from negotiating?", text: "Fear (of rejection, seeming greedy, or losing the offer), gratitude, impostor syndrome, and simply not knowing how. Yet 78% who negotiate get a better offer, and less than 1% of employers rescind offers." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Cost of Not Negotiating Salary Calculator",
        url: "https://everyfreetool.com/business-tools/cost-of-not-negotiating-salary",
        description: "Calculate the true lifetime cost of not negotiating your salary. See how a single missed negotiation compounds into hundreds of thousands in lost earnings.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      {/* Article-first layout: deep content, then calculator embedded */}
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            <a href="/" className="hover:underline" style={{ color: "#DC2626" }}>Home</a>
            <span>/</span>
            <span>Business Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text)" }}>
            The Cost of Not Negotiating Your Salary: How One Conversation Changes Everything
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            If you have ever accepted a salary offer without negotiating, you are not alone &mdash; 55% of employees do the same thing. But the financial consequences are staggering.
          </p>

          <article className="space-y-6 mb-12">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>The Psychology of Not Negotiating</h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                Negotiation avoidance comes from deeply human emotions: fear of rejection, gratitude for being selected, impostor syndrome (&ldquo;I should just be happy they picked me&rdquo;), and social conditioning that frames asking for more as greedy. Women face an additional barrier &mdash; Carnegie Mellon research found only 7% of female graduates negotiate initial offers versus 57% of men.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                The irony is that the people most afraid of negotiating are often the ones who would benefit most. Managers expect it &mdash; 84% say candidates should negotiate. Offers are almost never rescinded (&lt;1%). The risk of a brief uncomfortable conversation is negligible; the cost of avoiding it is life-changing.
              </p>
            </section>

            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>The Math at Different Salary Levels</h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                The compounding effect scales with your salary. Here&apos;s what a 7% negotiation gap costs over 20 years with 3.5% annual raises:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                      <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--text)" }}>Starting Salary</th>
                      <th className="text-right py-2 px-4 font-semibold" style={{ color: "var(--text)" }}>7% Raise</th>
                      <th className="text-right py-2 pl-4 font-semibold" style={{ color: "#DC2626" }}>20-Year Loss</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                    {[
                      { salary: "$50,000", raise: "$3,500", loss: "$165,261" },
                      { salary: "$75,000", raise: "$5,250", loss: "$247,892" },
                      { salary: "$100,000", raise: "$7,000", loss: "$330,523" },
                      { salary: "$150,000", raise: "$10,500", loss: "$495,784" },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="py-2 pr-4" style={{ color: "var(--text)" }}>{row.salary}</td>
                        <td className="py-2 px-4 text-right" style={{ color: "#16A34A" }}>+{row.raise}/yr</td>
                        <td className="py-2 pl-4 text-right font-bold" style={{ color: "#DC2626" }}>{row.loss}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>Negotiation Scripts That Work</h2>
              <div className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
                  <p className="font-semibold mb-1" style={{ color: "var(--text)" }}>For a new job offer:</p>
                  <p className="italic">&ldquo;Thank you for the offer &mdash; I&apos;m genuinely excited about this role. Based on my research and the value I&apos;ll bring, I was hoping we could discuss a base salary closer to $X. Is there flexibility?&rdquo;</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
                  <p className="font-semibold mb-1" style={{ color: "var(--text)" }}>For a performance review:</p>
                  <p className="italic">&ldquo;I&apos;ve appreciated the opportunities this year, and I believe my contributions &mdash; [specific achievements] &mdash; have exceeded expectations. I&apos;d like to discuss adjusting my compensation to reflect that.&rdquo;</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
                  <p className="font-semibold mb-1" style={{ color: "var(--text)" }}>When asked &ldquo;What&apos;s your salary expectation?&rdquo;:</p>
                  <p className="italic">&ldquo;I&apos;d love to learn more about the full scope of the role before discussing numbers. What range is budgeted for this position?&rdquo;</p>
                </div>
              </div>
            </section>
          </article>

          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#DC26261a", borderColor: "#DC262640" }}>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              Use the calculator below to see your personal number &mdash; how much not negotiating is costing <em>you</em>.
            </p>
          </div>
        </div>
      </div>
      <SalaryNegotiationCalculator
        title="Calculate Your Personal Cost"
        subtitle={"Enter your salary and the raise you could have asked for."}
        articleMode={true}
        defaultRaise={7}
      />
    </>
  );
}
