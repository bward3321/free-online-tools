import type { Metadata } from "next";
import SubscriptionCalculator from "./components/SubscriptionCalculator";

export const metadata: Metadata = {
  title: "Free Subscription Cost Calculator \u2014 See What You Really Spend | EveryFreeTool",
  description: "Calculate the true cost of all your subscriptions with 80+ pre-filled services. Check the boxes, see your total instantly. Free, no signup required.",
  openGraph: { title: "Free Subscription Cost Calculator \u2014 See What You Really Spend | EveryFreeTool", description: "Calculate the true cost of all your subscriptions with 80+ pre-filled services. Check the boxes, see your total instantly.", type: "website" },
  robots: "index, follow",
};

export default function SubscriptionCalculatorPage() {
  const faqs = [
    { name: "How much does the average person spend on subscriptions?", text: "The average American household spends between $219 and $280 per month on subscriptions, including streaming, music, software, delivery, gym, and more." },
    { name: "Is this calculator free? Do you store my data?", text: "The subscription calculator is completely free with no signup required. All calculations happen in your browser. We do not store, collect, or transmit any of your subscription data." },
    { name: "How often are the prices updated?", text: "We verify and update all subscription prices quarterly. Prices were last verified in February 2026." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Subscription Cost Calculator",
        url: "https://everyfreetool.com/finance-tools/subscription-calculator",
        description: "Calculate the true cost of all your subscriptions with 80+ pre-filled services at current 2026 prices.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <SubscriptionCalculator
        title="Subscription Cost Calculator"
        subtitle={"Check the boxes for the services you pay for. See what you really spend \u2014 monthly, yearly, and over 5 years."}
      />
    </>
  );
}
