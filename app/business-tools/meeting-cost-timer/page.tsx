import type { Metadata } from "next";
import MeetingCostCalculator from "../meeting-cost-calculator/components/MeetingCostCalculator";

export const metadata: Metadata = {
  title:
    "Live Meeting Cost Timer \u2014 Track Meeting Costs in Real Time | EveryFreeTool",
  description:
    "Run a live cost timer during your meetings. Watch the dollar counter tick up in real time. Share results with your team. Free, no signup required.",
  openGraph: {
    title:
      "Live Meeting Cost Timer \u2014 Track Meeting Costs in Real Time | EveryFreeTool",
    description:
      "Run a live cost timer during your meetings. Watch the dollar counter tick up in real time. Share results with your team. Free, no signup required.",
    type: "website",
  },
};

export default function MeetingCostTimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Live Meeting Cost Timer",
            description:
              "Run a live cost timer during your meetings. Watch the dollar counter tick up in real time.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Real-time cost ticker",
              "Fullscreen timer mode",
              "Color-coded urgency indicators",
              "Quick-start with preset roles",
              "Shareable end-of-meeting summary",
              "Wake lock to prevent screen sleep",
              "Pause and resume support",
              "Attendee adjustment during meeting",
            ],
          }),
        }}
      />
      <MeetingCostCalculator
        title="Live Meeting Cost Timer"
        subtitle="Watch the dollar counter tick up in real time. Put it on the big screen."
        defaultMode="live"
      />
    </>
  );
}
