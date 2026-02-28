import type { Metadata } from "next";
import TrueHourlyRateCalculator from "./components/TrueHourlyRateCalculator";

export const metadata: Metadata = {
  title: "True Hourly Rate Calculator — What Do You ACTUALLY Earn Per Hour? | EveryFreeTool",
  description: "Your salary says $75K but your TRUE hourly rate is $22-26/hr when you factor in commute, overtime, and expenses. See your real number. Free, no signup.",
  openGraph: { title: "True Hourly Rate Calculator — Your Salary Is Lying To You", description: "Your $75K salary is really $22-26/hr when you factor in commute, unpaid overtime, and work expenses. See your real number.", type: "website" },
  robots: "index, follow",
};

export default function TrueHourlyRateCalculatorPage() {
  const faqs = [
    { name: "How do you calculate true hourly rate?", text: "Your true hourly rate is calculated by dividing your actual take-home work income (salary minus work-related expenses) by the total hours your job consumes each week, including commute time, unpaid overtime, work preparation, and unpaid lunch breaks. The standard salary-to-hourly calculation only divides by 40 paid hours, which significantly overstates your real earning rate per hour of life dedicated to work." },
    { name: "What is the average commute time in the US?", text: "According to 2024 US Census data, the average American one-way commute is 27.2 minutes, or about 55 minutes round-trip per day. This has increased from 25.6 minutes in 2021 during peak remote work. New York City has the longest average commute at 40.6 minutes one-way, while cities like Tulsa, OK average under 20 minutes. About 9.3% of commuters travel 60+ minutes each way." },
    { name: "How much does the average person spend on work-related expenses?", text: "The average American worker spends approximately $6,700 per year on commute costs alone, according to Census and FinanceBuzz data. Adding work lunches ($2,400-3,600/year), work clothing ($600-1,800/year), and other expenses, total work-related costs typically range from $8,000-$15,000 per year depending on commute length, industry dress code, and city." },
    { name: "How many hours do salaried workers actually work?", text: "According to the Bureau of Labor Statistics, US workers across industries average 41.9 hours per week. However, salaried workers in professional roles commonly work 45-50+ hours per week. A study found that 48% of US workers report working more than 40 hours per week, and some estimates suggest American workers average up to 9 hours of unpaid overtime weekly." },
    { name: "Is this calculator free? Do you store my data?", text: "Yes, the true hourly rate calculator is completely free with no signup required. All calculations happen in your browser using JavaScript. We don\u2019t store, collect, or transmit any of your salary or personal data. Your inputs are never saved \u2014 close the tab and they\u2019re gone." },
    { name: "Should I take a lower-paying job with a shorter commute?", text: "It depends on the true hourly rate comparison. Use this calculator to compare both offers. A job paying $70,000 with a 10-minute commute and no overtime may have a higher true hourly rate than an $85,000 job with a 90-minute commute and regular overtime. The true hourly rate reveals which job actually compensates you better for each hour of your life." },
    { name: "How does remote work affect true hourly rate?", text: "Remote work dramatically improves true hourly rate by eliminating commute time (saving 200-500+ hours/year), reducing commute costs ($3,000-7,000+/year), reducing work clothing expenses, and reducing food costs since you eat at home. For someone with a typical 55-minute commute, switching to fully remote can increase their true hourly rate by 25-40%." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "True Hourly Rate Calculator",
        url: "https://everyfreetool.com/business-tools/true-hourly-rate-calculator",
        description: "Calculate your TRUE hourly rate by factoring in commute time, unpaid overtime, work prep, lunch breaks, and work-related expenses. See what you actually earn per hour of life spent on work.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: ["Real-time true hourly rate calculation", "Commute time and cost analysis", "Work expense tracking", "Job title comparison", "What-if scenario modeling", "Shareable results card"],
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <TrueHourlyRateCalculator
        title="True Hourly Rate Calculator"
        subtitle="Your salary is lying to you. See what you ACTUALLY earn per hour when you factor in commute, overtime, and expenses."
      />
    </>
  );
}
