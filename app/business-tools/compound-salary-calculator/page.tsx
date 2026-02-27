import type { Metadata } from "next";
import SalaryNegotiationCalculator from "../salary-negotiation-calculator/components/SalaryNegotiationCalculator";

export const metadata: Metadata = {
  title: "Compound Salary Calculator \u2014 See How Your Pay Grows Over Time | EveryFreeTool",
  description: "Calculate compound salary growth over 5, 10, 20, or 40 years. Compare different starting salaries and raise rates. See the math behind why small salary differences create massive wealth gaps.",
  openGraph: { title: "Compound Salary Calculator \u2014 See How Pay Compounds Over Time", description: "Small salary differences create massive wealth gaps. See the compounding math with real projections.", type: "website" },
  robots: "index, follow",
};

export default function CompoundSalaryCalculatorPage() {
  const faqs = [
    { name: "How does compound salary growth work?", text: "Each year\u2019s raise is calculated as a percentage of your current salary, not your starting salary. This means a 3.5% raise on $75,000 (Year 1) adds $2,625, but a 3.5% raise in Year 10 (on ~$103,000) adds $3,605. The raises themselves grow, creating exponential growth." },
    { name: "What is the formula for compound salary?", text: "Future Salary = Base Salary \u00d7 (1 + Annual Raise Rate)^Years. For cumulative earnings, sum each year\u2019s salary. The key insight is that two people with different bases but the same raise rate see their dollar gap grow every year." },
    { name: "What annual raise rate should I use?", text: "The US average merit raise for 2026 is 3.5% (Mercer, WTW, Payscale). Use 3\u20133.5% for conservative estimates, 4\u20135% if you include promotions and job changes, and 5\u20137% for high-growth fields like tech." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Compound Salary Calculator",
        url: "https://everyfreetool.com/business-tools/compound-salary-calculator",
        description: "Calculate compound salary growth and compare scenarios. See how starting salary differences compound into massive gaps over 10, 20, or 40 years.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <SalaryNegotiationCalculator
        title="Compound Salary Calculator"
        subtitle={"See how your pay compounds over time \u2014 and why small salary differences create massive wealth gaps."}
        defaultRaise={7}
      />
    </>
  );
}
