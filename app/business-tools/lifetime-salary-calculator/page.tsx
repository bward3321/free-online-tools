import type { Metadata } from "next";
import SalaryNegotiationCalculator from "../salary-negotiation-calculator/components/SalaryNegotiationCalculator";

export const metadata: Metadata = {
  title: "Lifetime Salary Calculator \u2014 How Much Will You Earn Over Your Career? | EveryFreeTool",
  description: "Calculate your total lifetime earnings and see how a higher starting salary compounds into hundreds of thousands more. Free career earnings calculator with real-time projections.",
  openGraph: { title: "Lifetime Salary Calculator \u2014 Total Career Earnings Projection", description: "See your total career earnings and how a higher starting salary compounds into massive differences over time.", type: "website" },
  robots: "index, follow",
};

export default function LifetimeSalaryCalculatorPage() {
  const faqs = [
    { name: "How much will I earn over my entire career?", text: "A person earning $75,000 at age 25 with 3.5% annual raises will earn approximately $4.3 million in total career earnings by age 65. Higher starting salaries compound to dramatically higher totals." },
    { name: "How much does starting salary affect lifetime earnings?", text: "A $5,000 difference in starting salary can result in $600,000 to $900,000 in additional lifetime earnings due to compounding. Every future raise is a percentage of your base." },
    { name: "Is this calculator free?", text: "Yes, completely free with no signup required. All calculations happen in your browser. No data is stored or collected." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Lifetime Salary Calculator",
        url: "https://everyfreetool.com/business-tools/lifetime-salary-calculator",
        description: "Calculate your total lifetime career earnings and see how starting salary affects your wealth over 10, 20, 30, or 40 years.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <SalaryNegotiationCalculator
        title="Lifetime Salary Calculator"
        subtitle={"Project your total career earnings \u2014 and see what a higher starting salary is really worth."}
        defaultRaise={7}
      />
    </>
  );
}
