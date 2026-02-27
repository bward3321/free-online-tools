import type { Metadata } from "next";
import SubscriptionCalculator from "../subscription-calculator/components/SubscriptionCalculator";

export const metadata: Metadata = {
  title: "How to Cancel Subscriptions and Save Money | EveryFreeTool",
  description: "See which subscriptions cost you the most and how hard they are to cancel. Cancel difficulty ratings, savings projections, and tips to cut your monthly bills.",
  openGraph: { title: "Cancel Subscriptions and Save Money | EveryFreeTool", description: "See which subscriptions cost you the most and how hard they are to cancel. Save hundreds per year.", type: "website" },
  robots: "index, follow",
};

export default function CancelSubscriptionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Cancel Subscriptions and Save Money",
        url: "https://everyfreetool.com/finance-tools/cancel-subscriptions-save-money",
        description: "See which subscriptions cost you the most and how hard they are to cancel. Save hundreds per year.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <SubscriptionCalculator
        title="Cancel Subscriptions &amp; Save Money"
        subtitle="Check what you pay for, see the damage, and find out which ones are easy (or hard) to cancel. Cancel difficulty ratings included."
        showCancelDifficulty
      />
    </>
  );
}
