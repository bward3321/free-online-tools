import type { Metadata } from "next";
import MeetingCostCalculator from "./components/MeetingCostCalculator";

export const metadata: Metadata = {
  title:
    "Free Meeting Cost Calculator \u2014 See What Meetings Really Cost | EveryFreeTool",
  description:
    "Calculate the true cost of your meetings with role-based attendee pricing, live timer, annual projections, and shareable results. See what your meetings really cost.",
  openGraph: {
    title:
      "Free Meeting Cost Calculator \u2014 See What Meetings Really Cost | EveryFreeTool",
    description:
      "Calculate the true cost of your meetings with role-based attendee pricing, live timer, annual projections, and shareable results. See what your meetings really cost.",
    type: "website",
  },
};

export default function MeetingCostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Meeting Cost Calculator",
            description:
              "Calculate the true cost of your meetings with role-based attendee pricing, live timer, annual projections, and shareable results.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Role-based team builder with preset salaries",
              "Real-time cost calculation",
              "Live meeting cost timer",
              "Annual cost projections",
              "Opportunity cost comparisons",
              "Side-by-side scenario comparison",
              "Shareable visual summary cards",
              "Fullscreen timer mode",
              "Dark mode support",
            ],
          }),
        }}
      />
      <MeetingCostCalculator
        title="Meeting Cost Calculator"
        subtitle="Calculate the true cost of your meetings. Plan smarter, meet less, save more."
        defaultMode="plan"
      />
    </>
  );
}
