import type { Metadata } from "next";
import SalaryNegotiationCalculator from "../salary-negotiation-calculator/components/SalaryNegotiationCalculator";

export const metadata: Metadata = {
  title: "Raise Calculator \u2014 What\u2019s Your Raise Really Worth? | EveryFreeTool",
  description: "Find out what a 3%, 5%, 7%, or 10% raise is actually worth over time. See both the immediate annual impact AND the lifetime compound effect. Free, instant results.",
  openGraph: { title: "Raise Calculator \u2014 What\u2019s a 5% Raise Really Worth?", description: "A 5% raise isn\u2019t just 5%. See the compound lifetime impact of every percentage point.", type: "website" },
  robots: "index, follow",
};

export default function RaiseCalculatorPage() {
  const faqs = [
    { name: "How much is a 5% raise worth over time?", text: "A 5% raise on a $75,000 salary ($3,750/year) compounds into approximately $171,000 in additional earnings over 20 years with 3.5% annual raises. The initial $3,750 gap grows every year because both salaries increase by the same percentage from different bases." },
    { name: "What is a good raise percentage?", text: "The average merit raise in the US for 2026 is 3.5%. A raise of 5\u20137% is above average and reflects strong performance. A raise of 10%+ typically accompanies a promotion or job change." },
    { name: "Is pushing for 5% vs 3% worth the awkwardness?", text: "Absolutely. The difference between a 3% and 5% raise on a $75,000 salary is $1,500/year initially, but compounds to over $68,000 in additional earnings over 20 years. That\u2019s well worth a brief uncomfortable conversation." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Raise Calculator",
        url: "https://everyfreetool.com/business-tools/raise-calculator",
        description: "Calculate the immediate and lifetime value of a salary raise. See how every percentage point compounds over your career.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <SalaryNegotiationCalculator
        title="Raise Calculator"
        subtitle={"What\u2019s a raise really worth? Not just this year \u2014 over your entire career."}
        defaultRaise={5}
      />
    </>
  );
}
