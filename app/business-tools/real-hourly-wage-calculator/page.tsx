import type { Metadata } from "next";
import TrueHourlyRateCalculator from "../true-hourly-rate-calculator/components/TrueHourlyRateCalculator";

export const metadata: Metadata = {
  title: "Real Hourly Wage Calculator — Your True Pay Rate Revealed | EveryFreeTool",
  description: "Calculate your REAL hourly wage by factoring in commute time, unpaid overtime, and work expenses. Inspired by the 'Your Money or Your Life' concept. Free, no signup.",
  openGraph: { title: "Real Hourly Wage Calculator — Your True Pay Rate Revealed", description: "You're not trading money for goods — you're trading LIFE HOURS. See your real hourly wage when you factor in all the unpaid time and hidden costs.", type: "website" },
  robots: "index, follow",
};

export default function RealHourlyWageCalculatorPage() {
  const faqs = [
    { name: "What is your real hourly wage?", text: "Your real hourly wage is what you actually earn per hour of life dedicated to work. Unlike the standard salary-to-hourly conversion that only divides by 40 paid hours, the real hourly wage accounts for all time your job consumes (commute, overtime, prep, lunch breaks) and subtracts work-related expenses. The concept was popularized by Vicki Robin in 'Your Money or Your Life.'" },
    { name: "How does the real hourly wage differ from regular hourly rate?", text: "The regular hourly rate divides your salary by 2,080 paid hours per year. The real hourly wage divides your net work income (salary minus work expenses) by total hours consumed (typically 2,600-3,000+ hours including commute, overtime, prep, and lunch). The real wage is typically 25-40% lower than the standard rate." },
    { name: "Why does knowing your real hourly wage matter?", text: "Knowing your real hourly wage transforms financial decisions. Instead of asking 'Can I afford this?', you ask 'Is this worth X hours of my life?' A $200 dinner isn't 5 hours of work at your paper rate — it might be 8 hours at your real wage. This reframe, central to 'Your Money or Your Life,' helps you make spending decisions aligned with your values." },
    { name: "How does remote work change your real hourly wage?", text: "Remote work dramatically increases your real hourly wage by eliminating commute time (200-500+ hours/year saved) and reducing expenses like gas, parking, work clothing, and lunch costs ($3,000-7,000+/year saved). For someone with a typical commute, going remote can increase their real hourly wage by 25-40%." },
    { name: "Is this calculator free?", text: "Yes, completely free with no signup. All calculations happen in your browser. We don't store any data." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Real Hourly Wage Calculator",
        url: "https://everyfreetool.com/business-tools/real-hourly-wage-calculator",
        description: "Calculate your real hourly wage by factoring in commute, overtime, work prep, and expenses. Based on the 'Your Money or Your Life' concept by Vicki Robin.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      {/* Article-first layout with philosophical framing */}
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)" }}>
            <a href="/" className="hover:underline" style={{ color: "#DC2626" }}>Home</a>
            <span>/</span>
            <span>Business Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text)" }}>
            Real Hourly Wage Calculator &mdash; Your True Pay Rate Revealed
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            You&apos;re not trading money for goods &mdash; you&apos;re trading <strong style={{ color: "var(--text)" }}>life hours</strong>. See what each hour of your life dedicated to work is actually worth.
          </p>

          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3" style={{ color: "var(--text)" }}>The &ldquo;Your Money or Your Life&rdquo; Concept</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
                In the groundbreaking book <em>Your Money or Your Life</em>, Vicki Robin and Joe Dominguez introduced a radical idea: every dollar you spend represents a certain amount of <strong style={{ color: "var(--text)" }}>life energy</strong> &mdash; hours of your finite life that you exchanged for money. But most people dramatically overestimate what each hour of work is worth because they use the wrong formula.
              </p>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
                The standard calculation divides salary by 2,080 paid hours. A $75,000 salary seems like $36.06/hr. But your job doesn&apos;t just take 40 hours per week &mdash; it takes 50-60+ when you count commuting (55 min/day average), unpaid overtime (48% of workers), getting ready, and lunch. And your job costs you money too: gas, parking, work clothes, lunches out. When you calculate the <strong style={{ color: "var(--text)" }}>real hourly wage</strong>, the number drops 30-40%.
              </p>
            </section>

            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3" style={{ color: "var(--text)" }}>Why This Changes Everything</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
                Once you know your real hourly wage, every purchase becomes a trade-off calculation. That $150 dinner out? At a real wage of $24/hr, that&apos;s 6.25 hours of your life. Those new shoes for $200? Over 8 hours of your actual labor. This reframe doesn&apos;t mean you shouldn&apos;t buy things &mdash; it means you can make <strong style={{ color: "var(--text)" }}>informed choices</strong> about what&apos;s truly worth your life energy.
              </p>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>
                It also transforms career decisions. A job offer with a higher salary but longer commute may actually pay you <em>less</em> per hour of life. Negotiating two remote days per week might be worth more than a $5,000 raise. The real hourly wage reveals the hidden math of work.
              </p>
            </section>
          </article>

          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#DC26261a", borderColor: "#DC262640" }}>
            <p className="font-semibold" style={{ fontSize: "17px", color: "var(--text)" }}>
              Use the calculator below to discover your <em>real hourly wage</em> &mdash; what each hour of your life devoted to work is actually worth.
            </p>
          </div>
        </div>
      </div>
      <TrueHourlyRateCalculator
        title="Calculate Your Real Hourly Wage"
        subtitle="Factor in commute, overtime, prep time, and expenses to see your true pay rate."
        articleMode={true}
      />
    </>
  );
}
