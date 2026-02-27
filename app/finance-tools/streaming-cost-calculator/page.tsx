import type { Metadata } from "next";
import SubscriptionCalculator from "../subscription-calculator/components/SubscriptionCalculator";

export const metadata: Metadata = {
  title: "Streaming Service Cost Calculator \u2014 Compare Prices 2026 | EveryFreeTool",
  description: "Calculate how much you spend on streaming services in 2026. Compare Netflix, Disney+, HBO Max, and more. See if cable is actually cheaper.",
  openGraph: { title: "Streaming Service Cost Calculator 2026 | EveryFreeTool", description: "Calculate how much you spend on streaming services. Compare Netflix, Disney+, HBO Max, Hulu, and more with current 2026 prices.", type: "website" },
  robots: "index, follow",
};

export default function StreamingCostCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Streaming Service Cost Calculator",
        url: "https://everyfreetool.com/finance-tools/streaming-cost-calculator",
        description: "Calculate how much you spend on streaming services with current 2026 prices.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <SubscriptionCalculator
        title="Streaming Service Cost Calculator"
        subtitle={"How much do your streaming services really cost? Check the ones you have and find out \u2014 with current 2026 prices."}
        defaultCategory="streaming"
      />
    </>
  );
}
