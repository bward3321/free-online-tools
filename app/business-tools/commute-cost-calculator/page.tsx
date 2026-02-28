import type { Metadata } from "next";
import TrueHourlyRateCalculator from "../true-hourly-rate-calculator/components/TrueHourlyRateCalculator";

export const metadata: Metadata = {
  title: "Commute Cost Calculator — How Much Does Your Commute Really Cost? | EveryFreeTool",
  description: "Calculate the true cost of your commute including gas, time, car expenses, and lost hourly value. The average American spends $6,700/year and 238 hours just getting to work. Free, no signup.",
  openGraph: { title: "Commute Cost Calculator — The Real Price of Getting to Work", description: "Your commute costs more than gas money. Factor in time, vehicle costs, and lost hourly value. The average American spends $6,700/yr and 238 hours commuting.", type: "website" },
  robots: "index, follow",
};

export default function CommuteCostCalculatorPage() {
  const faqs = [
    { name: "How much does the average commute cost per year?", text: "The average American spends approximately $6,700 per year on commute-related costs including gas, insurance, maintenance, parking, and vehicle depreciation, according to Census and FinanceBuzz data. When you add the time value of commuting (238+ hours/year at the average commute), the total economic cost is significantly higher." },
    { name: "How much time does commuting cost per year?", text: "The average American commute is 27.2 minutes one-way (54.4 minutes round-trip) per day. Over 250 work days, that's approximately 227 hours per year — nearly 6 full work weeks — spent just getting to and from work. Longer commutes of 90+ minutes round-trip consume 375+ hours per year." },
    { name: "Is my commute worth it?", text: "Use this calculator to compare your commute's total cost (time + money) against your hourly rate. If your commute costs $800/month in expenses and 20 hours in time (valued at your true hourly rate), your commute effectively costs $1,300-1,800/month. A closer job or remote position paying less might actually pay you more per hour of life." },
    { name: "How much would I save working remotely?", text: "The average remote worker saves $6,000-12,000+ per year between eliminated commute costs ($3,000-7,000), reduced clothing ($600-1,800), and reduced food costs ($1,200-2,400). They also save 200-500+ hours per year in commute and prep time. Use the 'Remote job' scenario in this calculator to see your specific savings." },
    { name: "What is the average commute time by city?", text: "Commute times vary dramatically by city. New York City averages 40.6 minutes one-way, Washington DC averages 34.8 minutes, Chicago averages 34.8 minutes, while cities like Tulsa, OK and Wichita, KS average under 20 minutes. About 9.3% of Americans have 'mega-commutes' of 60+ minutes each way." },
    { name: "Is this calculator free?", text: "Yes, completely free with no signup. All calculations happen in your browser. We don't store any data." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Commute Cost Calculator",
        url: "https://everyfreetool.com/business-tools/commute-cost-calculator",
        description: "Calculate the full cost of your commute including gas, time, vehicle expenses, parking, and the impact on your true hourly rate.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      {/* Article-first with commute focus */}
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            <a href="/" className="hover:underline" style={{ color: "#DC2626" }}>Home</a>
            <span>/</span>
            <span>Business Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text)" }}>
            Commute Cost Calculator &mdash; How Much Does Your Commute Really Cost?
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            Your commute costs more than gas money. Factor in time, vehicle costs, parking, and the hidden impact on your true hourly rate.
          </p>

          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>The Full Cost of Commuting</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                Most people think their commute costs whatever they spend on gas. In reality, the average American commuter spends <strong style={{ color: "var(--text)" }}>$6,700 per year</strong> on the full range of commute costs: fuel, insurance, maintenance, depreciation, parking, and tolls (Census/FinanceBuzz data). For many urban commuters, parking alone costs $100-250/month.
              </p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                But the financial cost is only half the story. The average round-trip commute of 55 minutes per day consumes <strong style={{ color: "var(--text)" }}>238 hours per year</strong> &mdash; nearly 6 full 40-hour work weeks. That&apos;s time you&apos;re giving to your employer for free, and it dramatically reduces your true hourly rate.
              </p>
            </section>

            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>Commute Costs by the Numbers</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "$6,700", desc: "Average annual commute cost" },
                  { stat: "238 hrs", desc: "Average annual commute time" },
                  { stat: "27.2 min", desc: "Average one-way commute (2024)" },
                  { stat: "9.3%", desc: "Workers with 60+ min one-way commute" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 rounded-xl" style={{ backgroundColor: "var(--bg)" }}>
                    <p className="font-bold" style={{ fontSize: "24px", color: "#DC2626" }}>{item.stat}</p>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>Is Your Commute Worth It?</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                Here&apos;s the question most people never ask: would you accept a job that paid $6,700 less per year and required you to work 6 extra unpaid weeks? That&apos;s what a typical commute costs. For someone with a 90-minute round-trip commute, the numbers are even more dramatic: $9,000+ in expenses and 375+ hours per year.
              </p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                Use the calculator below to see exactly how much your commute costs in both time and money &mdash; and how it affects your true hourly rate. Then try the &ldquo;Remote job&rdquo; scenario to see what your rate would be without the commute.
              </p>
            </section>
          </article>

          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#DC26261a", borderColor: "#DC262640" }}>
            <p className="font-semibold" style={{ fontSize: "16px", color: "var(--text)" }}>
              Use the calculator below to see the full cost of your commute &mdash; and how going remote could change everything.
            </p>
          </div>
        </div>
      </div>
      <TrueHourlyRateCalculator
        title="Commute Cost & True Hourly Rate Calculator"
        subtitle="See how your commute costs you time, money, and hourly value. Adjust inputs to model different scenarios."
        articleMode={true}
        emphasizeCommute={true}
      />
    </>
  );
}
