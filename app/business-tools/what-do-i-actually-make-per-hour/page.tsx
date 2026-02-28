import type { Metadata } from "next";
import TrueHourlyRateCalculator from "../true-hourly-rate-calculator/components/TrueHourlyRateCalculator";

export const metadata: Metadata = {
  title: "What Do I Actually Make Per Hour? — True Hourly Rate Calculator | EveryFreeTool",
  description: "Find out what you ACTUALLY make per hour when you include commute time, unpaid overtime, and work expenses. The answer is probably lower than you think. Free, no signup.",
  openGraph: { title: "What Do I Actually Make Per Hour?", description: "Your salary says one thing, but your true hourly rate tells a very different story. Factor in commute, overtime, and expenses to see the real number.", type: "website" },
  robots: "index, follow",
};

export default function WhatDoIActuallyMakePage() {
  const faqs = [
    { name: "What do I actually make per hour?", text: "To find your actual hourly rate, divide your annual salary minus work-related expenses by the total hours your job consumes per year. This includes commute time, unpaid overtime, work preparation, and unpaid lunch breaks. Most people find their actual rate is 25-40% lower than the simple salary ÷ 2,080 calculation." },
    { name: "Why is my actual hourly rate so much lower than expected?", text: "The simple salary-to-hourly calculation (salary ÷ 2,080) only counts your 40 paid hours per week. In reality, your job consumes 50-60+ hours weekly when you add commuting, overtime, prep time, and lunch. Plus, work costs money — gas, parking, lunches, clothing — further reducing your effective income per hour." },
    { name: "How do I increase my actual hourly rate?", text: "The biggest levers are: reducing commute time (remote work or moving closer), eliminating unpaid overtime (setting boundaries), reducing work expenses (packing lunch, carpooling), and negotiating higher pay. Even without a raise, going remote can increase your true hourly rate by 25-40%." },
    { name: "Is a $75,000 salary good?", text: "It depends on your true hourly rate. A $75K salary with a 10-minute commute and no overtime gives you a true rate of ~$32/hr. The same salary with a 90-minute commute and 10 hours of weekly overtime drops to ~$19/hr. The salary number alone doesn't tell you much — the true hourly rate does." },
    { name: "Is this calculator free?", text: "Yes, completely free with no signup. All calculations happen in your browser. We don't store any data." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "What Do I Actually Make Per Hour Calculator",
        url: "https://everyfreetool.com/business-tools/what-do-i-actually-make-per-hour",
        description: "Find out what you actually make per hour by factoring in commute, overtime, and work expenses. See your true hourly rate.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <TrueHourlyRateCalculator
        title="What Do I Actually Make Per Hour?"
        subtitle="Your salary says one number. Your true hourly rate tells a very different story. Enter your details to find out."
      />
    </>
  );
}
