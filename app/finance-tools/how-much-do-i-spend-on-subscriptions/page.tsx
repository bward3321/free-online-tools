import type { Metadata } from "next";
import SubscriptionCalculator from "../subscription-calculator/components/SubscriptionCalculator";

export const metadata: Metadata = {
  title: "How Much Do I Spend on Subscriptions? Calculator + Stats | EveryFreeTool",
  description: "The average employee spends $219\u2013$280/month on subscriptions. Use our free calculator to find your real total per month, per year, and over 5 years.",
  openGraph: { title: "How Much Do I Spend on Subscriptions? | EveryFreeTool", description: "Find out what you really spend on subscriptions. 80+ services pre-filled with 2026 prices. Just check the boxes.", type: "website" },
  robots: "index, follow",
};

export default function HowMuchDoISpendPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "How Much Do I Spend on Subscriptions?",
        url: "https://everyfreetool.com/finance-tools/how-much-do-i-spend-on-subscriptions",
        description: "The average American spends $219\u2013$280/month on subscriptions. Use our free calculator to find your real total.",
        applicationCategory: "FinanceApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      {/* Article-first wrapper */}
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", "--color-accent": "#16A34A" } as React.CSSProperties}>
        <div className="max-w-[1100px] mx-auto px-4 pt-8 md:pt-12">
          <nav className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
            <a href="/" className="hover:opacity-70 transition-opacity" style={{ color: "#16A34A" }}>Home</a>
            <span className="mx-1.5">/</span><span>Finance Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>How Much Do I Spend on Subscriptions?</h1>
          <p className="text-lg mb-8 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            If you have ever wondered where your money goes each month, subscriptions are a likely culprit. Here is the data &mdash; and a tool to find your own number.
          </p>
          <article className="rounded-2xl border p-6 md:p-8 mb-8" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="prose max-w-none space-y-4 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
              <h2 className="text-xl font-bold mb-4">The Psychology of Subscription Spending</h2>
              <p>Subscriptions exploit a powerful cognitive bias: <strong>pain-of-payment avoidance</strong>. A $15/month charge feels trivial because it is small, recurring, and automatic. You do not feel it leaving your account the way you feel handing over $180 in cash at the end of the year. This is by design &mdash; subscription pricing is engineered to minimize perceived cost.</p>
              <p>Research by West Monroe found that <strong>84% of people underestimate their monthly subscription spending</strong>. The average guess is $86/month. The average actual amount is $219&ndash;$280/month. That gap &mdash; $130&ndash;$194/month of invisible spending &mdash; represents one of the easiest savings opportunities in personal finance.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">Average Spending by Category</h2>
              <p>According to 2025&ndash;2026 consumer surveys, monthly subscription spending in the US breaks down roughly as follows:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Streaming video:</strong> $46&ndash;$75/mo (2&ndash;4 services)</li>
                <li><strong>Music and audio:</strong> $11&ndash;$22/mo</li>
                <li><strong>Cloud storage and software:</strong> $7&ndash;$60/mo</li>
                <li><strong>Gym and fitness:</strong> $30&ndash;$60/mo</li>
                <li><strong>Food and delivery:</strong> $10&ndash;$70/mo</li>
                <li><strong>News and reading:</strong> $5&ndash;$40/mo</li>
                <li><strong>AI tools:</strong> $10&ndash;$50/mo (a fast-growing category since 2023)</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">Steps to Audit Your Subscriptions</h2>
              <p>The most effective method takes about 15 minutes:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Pull up 3 months of bank or credit card statements.</li>
                <li>Search for recurring charges (look for the same amount appearing monthly).</li>
                <li>Check iPhone Settings &gt; Apple ID &gt; Subscriptions and Google Play &gt; Payments.</li>
                <li>Use the calculator below to check off what you find and see the total.</li>
                <li>For each subscription, ask: &quot;Did I use this in the last 2 weeks?&quot; If not, cancel it.</li>
              </ol>
            </div>
          </article>
          <div className="rounded-xl border-2 p-6 mb-8 text-center" style={{ borderColor: "#16A34A", backgroundColor: "var(--surface)" }}>
            <p className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>Find your number</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Check the subscriptions you pay for below and see your real total instantly.</p>
          </div>
        </div>
        <SubscriptionCalculator
          title="Subscription Calculator"
          subtitle="Check the boxes for the services you pay for."
          articleMode
        />
        <div className="max-w-[1100px] mx-auto px-4 pb-8">
          <footer className="border-t pt-8 pb-4 text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
            <p>Free Online Tools &mdash; Free calculators and tools for everyone.</p>
            <p className="mt-1">No signup required. No ads. No tracking.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
