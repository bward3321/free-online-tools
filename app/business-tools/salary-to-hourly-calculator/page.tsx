import type { Metadata } from "next";
import TrueHourlyRateCalculator from "../true-hourly-rate-calculator/components/TrueHourlyRateCalculator";

export const metadata: Metadata = {
  title: "Salary to Hourly Calculator — What Do You ACTUALLY Make Per Hour? | EveryFreeTool",
  description: "Convert your annual salary to an hourly rate — then see your TRUE hourly rate when you factor in commute, overtime, and work expenses. Free, instant, no signup.",
  openGraph: { title: "Salary to Hourly Calculator — Beyond the Simple Math", description: "The standard salary-to-hourly conversion is misleading. See your TRUE hourly rate when you factor in all the time and money your job really costs.", type: "website" },
  robots: "index, follow",
};

export default function SalaryToHourlyCalculatorPage() {
  const faqs = [
    { name: "How do you convert salary to hourly rate?", text: "The standard formula divides your annual salary by 2,080 (40 hours/week times 52 weeks). For example, $60,000 / 2,080 = $28.85/hr. However, this only counts paid hours and ignores commute time, unpaid overtime, and work-related expenses — which typically reduce the real rate by 25-40%." },
    { name: "What is the hourly rate for a $50,000 salary?", text: "At the standard calculation, $50,000 / 2,080 = $24.04/hr. But your TRUE hourly rate with a typical commute and overtime is closer to $15-18/hr when you factor in all the unpaid time and expenses your job demands." },
    { name: "What is the hourly rate for a $75,000 salary?", text: "Standard calculation: $75,000 / 2,080 = $36.06/hr. True hourly rate with a typical 55-minute commute, 5 hours of weekly overtime, and moderate work expenses: approximately $22-26/hr." },
    { name: "What is the hourly rate for a $100,000 salary?", text: "Standard calculation: $100,000 / 2,080 = $48.08/hr. True hourly rate with typical commute and overtime: approximately $30-36/hr depending on work-related expenses." },
    { name: "Why is the true hourly rate so much lower?", text: "Because the standard formula only counts 40 paid hours per week. In reality, your job consumes 50-60+ hours weekly (commute, overtime, prep, lunch). And work costs money: gas, parking, lunches, clothing. Dividing lower net income by more hours dramatically reduces the rate." },
    { name: "Is this calculator free?", text: "Yes, completely free with no signup. All calculations happen in your browser. We don't store any data." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Salary to Hourly Calculator",
        url: "https://everyfreetool.com/business-tools/salary-to-hourly-calculator",
        description: "Convert your annual salary to hourly rate, then see your TRUE hourly rate factoring in commute, overtime, and work expenses.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      {/* Article-first with salary reference table */}
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            <a href="/" className="hover:underline" style={{ color: "#DC2626" }}>Home</a>
            <span>/</span>
            <span>Business Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text)" }}>
            Salary to Hourly Calculator &mdash; What Do You ACTUALLY Make Per Hour?
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            The simple &ldquo;salary &divide; 2,080&rdquo; formula gives you a number. The <strong style={{ color: "var(--text)" }}>true hourly rate</strong> gives you the truth.
          </p>

          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>Quick Salary to Hourly Reference Table</h2>
              <p className="mb-4" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Standard conversion (salary &divide; 2,080 hours) vs. estimated true rate with a typical 55-min commute, 5hr/wk overtime, and moderate expenses:</p>
              <div className="overflow-x-auto">
                <table className="w-full" style={{ fontSize: "15px" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                      <th className="text-left py-2 pr-4 font-semibold" style={{ color: "var(--text)" }}>Annual Salary</th>
                      <th className="text-right py-2 px-4 font-semibold" style={{ color: "#16A34A" }}>Standard Rate</th>
                      <th className="text-right py-2 pl-4 font-semibold" style={{ color: "#DC2626" }}>Est. True Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                    {[
                      { salary: "$40,000", standard: "$19.23", true_rate: "$12-15" },
                      { salary: "$50,000", standard: "$24.04", true_rate: "$15-18" },
                      { salary: "$60,000", standard: "$28.85", true_rate: "$18-22" },
                      { salary: "$75,000", standard: "$36.06", true_rate: "$22-26" },
                      { salary: "$85,000", standard: "$40.87", true_rate: "$26-30" },
                      { salary: "$100,000", standard: "$48.08", true_rate: "$30-36" },
                      { salary: "$120,000", standard: "$57.69", true_rate: "$36-43" },
                      { salary: "$150,000", standard: "$72.12", true_rate: "$45-54" },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="py-2 pr-4 font-medium" style={{ color: "var(--text)" }}>{row.salary}</td>
                        <td className="py-2 px-4 text-right tabular-nums" style={{ color: "#16A34A" }}>{row.standard}/hr</td>
                        <td className="py-2 pl-4 text-right font-bold tabular-nums" style={{ color: "#DC2626" }}>{row.true_rate}/hr</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>True rate estimates assume 55-min round-trip commute, 5hr/wk unpaid overtime, 30-min prep, 30-min lunch, and $500-800/mo in work expenses. Your actual number depends on your specific situation.</p>
            </section>

            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>Beyond the Simple Conversion</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                Every payroll site offers the basic salary-to-hourly calculation: divide by 2,080 and you&apos;re done. But that number is <strong style={{ color: "var(--text)" }}>dangerously misleading</strong> because it pretends your job only takes 40 hours per week.
              </p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                In reality, the average American spends 55 minutes per day commuting (2024 Census), 48% of workers put in more than 40 hours weekly (BLS), and work-related expenses like gas, parking, lunches, and clothing average $8,000-$15,000 per year. When you divide your <em>actual take-home</em> by your <em>actual hours</em>, the result is 25-40% lower than the simple conversion suggests.
              </p>
            </section>
          </article>

          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#DC26261a", borderColor: "#DC262640" }}>
            <p className="font-semibold" style={{ fontSize: "16px", color: "var(--text)" }}>
              Use the calculator below to see your <em>true</em> salary-to-hourly conversion &mdash; the real number, not the simple one.
            </p>
          </div>
        </div>
      </div>
      <TrueHourlyRateCalculator
        title="Your True Salary-to-Hourly Rate"
        subtitle="Enter your salary and adjust the inputs to see what you actually earn per hour."
        articleMode={true}
      />
    </>
  );
}
