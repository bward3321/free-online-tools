import type { Metadata } from "next";
import SubscriptionCalculator from "../subscription-calculator/components/SubscriptionCalculator";

export const metadata: Metadata = {
  title: "Free Subscription Audit Tool \u2014 Find and Cut Wasted Subscriptions | EveryFreeTool",
  description: "Audit all your subscriptions in under 3 minutes. 80+ services pre-filled with current prices. See your total, find waste, and save hundreds per year.",
  openGraph: { title: "Free Subscription Audit Tool | EveryFreeTool", description: "Audit your subscriptions in 3 minutes. Find forgotten charges, see your real total, and save hundreds per year.", type: "website" },
  robots: "index, follow",
};

export default function SubscriptionAuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free Subscription Audit Tool",
        url: "https://everyfreetool.com/finance-tools/subscription-audit",
        description: "Audit all your subscriptions in under 3 minutes. Find forgotten charges, see your real total, and save hundreds per year.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <SubscriptionCalculator
        title="Free Subscription Audit Tool"
        subtitle="Step 1: Check your subscriptions. Step 2: See the damage. Step 3: Make cuts and save hundreds per year."
      />
    </>
  );
}
