import type { Metadata } from "next";
import MeetingCostCalculator from "../meeting-cost-calculator/components/MeetingCostCalculator";

export const metadata: Metadata = {
  title:
    "How Much Do Meetings Cost? Calculator + Stats | EveryFreeTool",
  description:
    "The average employee spends 31 hours/month in meetings. Use our free calculator to see what your meetings cost per session, per month, and per year.",
  openGraph: {
    title: "How Much Do Meetings Cost? Calculator + Stats | EveryFreeTool",
    description:
      "The average employee spends 31 hours/month in meetings. Use our free calculator to see what your meetings cost per session, per month, and per year.",
    type: "website",
  },
};

export default function HowMuchDoMeetingsCostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "How Much Do Meetings Cost?",
            description:
              "The average employee spends 31 hours/month in meetings. Use our free calculator to see what your meetings cost per session, per month, and per year.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Meeting cost calculator",
              "Role-based attendee pricing",
              "Annual projections",
              "Opportunity cost comparisons",
              "Meeting statistics and insights",
            ],
          }),
        }}
      />

      {/* Article wrapper with SEO content woven around the calculator */}
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--bg)", "--color-accent": "#D97706" } as React.CSSProperties}
      >
        <div className="max-w-[1100px] mx-auto px-4 pt-8 md:pt-12">
          {/* Article intro */}
          <a
            href="/"
            className="text-sm font-medium mb-3 inline-block hover:opacity-70 transition-opacity"
            style={{ color: "#D97706" }}
          >
            &larr; All Tools
          </a>
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--text)" }}
          >
            How Much Do Meetings Really Cost?
          </h1>
          <p
            className="text-lg mb-8 max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Most companies track every dollar spent on software, rent, and
            travel. But the biggest line item hiding in plain sight is the cost
            of pulling people into a room and talking.
          </p>

          {/* Article section 1 */}
          <div
            className="rounded-2xl border p-6 md:p-8 mb-8"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="prose max-w-none space-y-4 text-sm leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">
                The Numbers Are Staggering
              </h2>
              <p>
                The average professional spends <strong>31 hours per month</strong> in
                meetings. For managers, that number climbs to 50% or more of their
                entire work week. When you multiply that time by the salary of
                everyone in the room, the figures become eye-opening.
              </p>
              <p>
                Consider a typical weekly team standup: 8 people, 30 minutes,
                every week. At an average blended rate of $65/hour, that single
                meeting costs <strong>$260 per session</strong> and{" "}
                <strong>$13,520 per year</strong>. Now multiply that across the
                dozens of recurring meetings on your company&apos;s calendar.
              </p>
              <p>
                Research from Microsoft and Harvard Business School shows that
                the shift to remote work increased meeting frequency by{" "}
                <strong>252%</strong>, while average meeting duration dropped only
                slightly. The net result: more total time spent in meetings than
                ever before.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">
                It&apos;s Not Just the Time in the Room
              </h3>
              <p>
                The real cost of a meeting extends far beyond the calendar
                block. Context-switching research shows that a 30-minute meeting
                actually consumes <strong>60&ndash;90 minutes</strong> of productive
                time when you account for preparation, travel to the conference
                room (or opening Zoom), the meeting itself, and the mental
                ramp-down and ramp-back-up to deep work afterward.
              </p>
              <p>
                This means a day with four 30-minute meetings doesn&apos;t leave
                6 hours of productive time. It leaves closer to{" "}
                <strong>2&ndash;3 hours</strong> of fragmented, lower-quality work.
              </p>
            </div>
          </div>

          {/* CTA to calculator */}
          <div
            className="rounded-xl border-2 p-6 mb-8 text-center"
            style={{
              borderColor: "#D97706",
              backgroundColor: "var(--surface)",
            }}
          >
            <p
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--text)" }}
            >
              Calculate your own meeting costs
            </p>
            <p
              className="text-sm mb-0"
              style={{ color: "var(--text-muted)" }}
            >
              Use the calculator below to see what your meetings actually cost
              your organization.
            </p>
          </div>
        </div>

        {/* Embedded calculator */}
        <MeetingCostCalculator
          title="Meeting Cost Calculator"
          subtitle="Build your actual meeting team and see the real cost."
          defaultMode="plan"
          articleMode
        />

        {/* Post-calculator article content */}
        <div className="max-w-[1100px] mx-auto px-4 pb-8">
          <div
            className="rounded-2xl border p-6 md:p-8 mb-8"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="prose max-w-none space-y-4 text-sm leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">
                5 Ways to Cut Meeting Costs Without Killing Collaboration
              </h2>

              <h3 className="text-lg font-semibold mt-4 mb-3">
                1. Audit Your Recurring Meetings
              </h3>
              <p>
                Set a calendar reminder every quarter to review all recurring
                meetings. For each one, ask: &quot;If this meeting didn&apos;t exist,
                would we recreate it?&quot; If the answer is no, cancel it.
                You&apos;ll typically eliminate 20&ndash;30% of recurring meetings this
                way.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-3">
                2. Shrink the Guest List
              </h3>
              <p>
                Every additional attendee increases cost linearly but decreases
                decision-making speed exponentially. Apply Amazon&apos;s two-pizza
                rule: if you need more than two pizzas to feed the group, the
                meeting is too large. Make attendance optional for anyone who
                doesn&apos;t need to actively contribute.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-3">
                3. Default to 25 and 50 Minutes
              </h3>
              <p>
                Change your calendar defaults from 30/60 to 25/50 minutes.
                Google does this company-wide. The built-in buffer prevents
                back-to-back meeting fatigue, and Parkinson&apos;s Law means
                discussions naturally tighten to fill the shorter window.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-3">
                4. Replace Status Updates with Async
              </h3>
              <p>
                If the primary purpose of a meeting is sharing information
                rather than making decisions, it should be an async update. Use
                Slack, Loom, Notion, or a shared document. Reserve synchronous
                meetings for brainstorming, debate, and decisions.
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-3">
                5. Run a Live Timer
              </h3>
              <p>
                Nothing focuses a meeting like watching the cost tick up in
                real time. Use our{" "}
                <a
                  href="/business-tools/meeting-cost-timer"
                  style={{ color: "#D97706" }}
                  className="font-medium underline"
                >
                  Live Meeting Cost Timer
                </a>{" "}
                on a shared screen during your next meeting. Teams that see
                the cost tend to run 15&ndash;25% shorter meetings naturally.
              </p>
            </div>
          </div>

          <footer
            className="border-t pt-8 pb-4 text-center"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <p>
              Free Online Tools &mdash; Free calculators and tools for everyone.
            </p>
            <p className="mt-1">No signup required. No ads. No tracking.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
