import type { Metadata } from "next";
import SalaryNegotiationCalculator from "./components/SalaryNegotiationCalculator";

export const metadata: Metadata = {
  title: "Salary Negotiation Calculator \u2014 See the Lifetime Cost of Not Negotiating | EveryFreeTool",
  description: "See exactly how much money you\u2019re leaving on the table by not negotiating your salary. A 7% raise you skip today costs $247,000+ over 20 years. Free, no signup.",
  openGraph: { title: "Salary Negotiation Calculator \u2014 See the Lifetime Cost of Not Negotiating", description: "A 7% raise you skip today costs $247,000+ over 20 years with compounding. See your exact number.", type: "website" },
  robots: "index, follow",
};

export default function SalaryNegotiationCalculatorPage() {
  const faqs = [
    { name: "How much does not negotiating salary cost over a lifetime?", text: "Research from Carnegie Mellon University estimates that failing to negotiate a starting salary can cost between $1 million and $1.5 million in lifetime earnings. Even a modest $5,000 gap in starting salary can compound into $600,000\u2013$900,000 over a 40-year career." },
    { name: "What is the average raise in 2026?", text: "The average merit salary increase for US employers in 2026 is projected at 3.5%, according to surveys from Mercer, WTW, Payscale, and the Conference Board." },
    { name: "Will asking for a raise get me fired?", text: "No. Less than 1% of employers rescind offers because a candidate negotiated. 84% of managers say they expect candidates to negotiate." },
    { name: "What percentage should I negotiate?", text: "For a new job offer, counter-offering 10\u201320% above the initial offer is standard. For an internal raise, asking for 5\u201310% above the standard merit increase is reasonable with strong performance." },
    { name: "Is this calculator free? Do you store my data?", text: "Yes, completely free with no signup. All calculations happen in your browser. We don\u2019t store any data." },
    { name: "How accurate are the projections?", text: "This calculator uses constant annual raise rates to illustrate compounding effects. Real careers involve variable raises, promotions, and job changes. Use 3\u20133.5% for conservative estimates." },
    { name: "Does this factor in inflation?", text: "The default 3.5% raise rate roughly tracks US wage growth. The key insight is that the gap between scenarios grows in dollar terms regardless of inflation, because both scenarios use the same rate on different bases." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Salary Negotiation Calculator",
        url: "https://everyfreetool.com/business-tools/salary-negotiation-calculator",
        description: "Calculate the lifetime cost of not negotiating your salary. See how a single raise compounds into hundreds of thousands over your career.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <SalaryNegotiationCalculator
        title="Salary Negotiation Calculator"
        subtitle={"See the shocking lifetime cost of not negotiating your salary \u2014 with compounding."}
      />
    </>
  );
}
