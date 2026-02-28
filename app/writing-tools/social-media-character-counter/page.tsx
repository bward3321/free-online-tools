import type { Metadata } from "next";
import WordCounter from "../word-counter/components/WordCounter";

export const metadata: Metadata = {
  title: "Social Media Character Counter — Check Limits for Every Platform | EveryFreeTool",
  description: "Check your text against character limits for Twitter, Instagram, LinkedIn, TikTok, Facebook, Threads, YouTube, and more. Real-time fit/overflow indicators. Free, no signup.",
  openGraph: { title: "Social Media Character Counter — Every Platform", description: "Write once, check against every social media platform's character limit. Real-time indicators show fit or overflow. Free, instant.", type: "website" },
  robots: "index, follow",
};

export default function SocialMediaCharacterCounterPage() {
  const faqs = [
    { name: "What social media platforms are supported?", text: "X (Twitter) posts (280), Instagram captions (2,200) and bios (150), LinkedIn posts (3,000) and articles (125,000), Facebook posts (63,206), TikTok captions (4,000), Threads posts (500), Pinterest descriptions (500), YouTube titles (100) and descriptions (5,000), Google meta titles (60) and descriptions (160), email subject lines (60), and SMS messages (160)." },
    { name: "What's the difference between max limit and optimal length?", text: "The max limit is the technical maximum a platform allows. The optimal length is what research shows generates the most engagement. For example, Twitter allows 280 characters, but posts with 70-100 characters get the most engagement. Instagram allows 2,200 characters, but only the first 125 are visible before 'More.'" },
    { name: "Why does the 'visible before fold' matter?", text: "On Instagram and LinkedIn, long posts are truncated with a 'More' or 'See more' button. Your hook — the text that convinces someone to keep reading — must fit in the visible portion. Instagram shows ~125 characters; LinkedIn shows ~210 characters before truncation." },
    { name: "Do emojis count as multiple characters?", text: "On most platforms, a single emoji counts as 2 characters (they use two UTF-16 code units). Some complex emojis (like flags or family emojis) can count as 4-7 characters. This tool counts characters as JavaScript string length, which matches how most platforms count." },
    { name: "Is my text stored?", text: "No. All checking happens in your browser. Your text is never sent to any server." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Social Media Character Counter",
        url: "https://everyfreetool.com/writing-tools/social-media-character-counter",
        description: "Check your text against character limits for Twitter, Instagram, LinkedIn, TikTok, Facebook, Threads, YouTube, and more. Real-time fit/overflow indicators.",
        applicationCategory: "UtilityApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            <a href="/" className="hover:underline" style={{ color: "#4F46E5" }}>Home</a><span>/</span><span>Writing Tools</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Social Media Character Counter &mdash; Check Limits for Every Platform</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Write your post once and instantly see whether it fits on Twitter, Instagram, LinkedIn, TikTok, Facebook, Threads, YouTube, and more. Real-time fit/overflow indicators for 15 platforms.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Platform Character Limits (2026)</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Every social media platform has different character limits, and they change frequently. Here&apos;s the current landscape:</p>
              <div className="grid grid-cols-2 gap-2" style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                {[
                  ["X (Twitter)", "280 chars"],
                  ["Instagram Caption", "2,200 chars"],
                  ["Instagram Bio", "150 chars"],
                  ["LinkedIn Post", "3,000 chars"],
                  ["Facebook Post", "63,206 chars"],
                  ["TikTok Caption", "4,000 chars"],
                  ["Threads", "500 chars"],
                  ["YouTube Title", "100 chars"],
                  ["YouTube Description", "5,000 chars"],
                  ["Pinterest Description", "500 chars"],
                ].map(([platform, limit]) => (
                  <div key={platform} className="flex justify-between py-1 border-b" style={{ borderColor: "var(--border)" }}>
                    <span>{platform}</span>
                    <span className="font-semibold">{limit}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Optimal vs. Maximum Length</h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The maximum character limit and the optimal posting length are very different. Research shows that shorter posts tend to get more engagement:</p>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {[
                  "X (Twitter): 280 max, but 70-100 chars get highest engagement",
                  "Instagram: 2,200 max, but first 125 chars visible before 'More' — put your hook there",
                  "LinkedIn: 3,000 max, but first 210 chars visible before 'See more'",
                  "Facebook: 63,206 max, but posts with 40-80 chars get 66% more engagement",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#4F46E5", flexShrink: 0 }}>&#x2713;</span><span>{tip}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#4F46E51a", borderColor: "#4F46E540" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Type or paste your post below &mdash; the social media limits panel is already open.</p>
          </div>
        </div>
      </div>
      <WordCounter title="Social Media Character Counter" subtitle="Check your text against character limits for every major platform." articleMode={true} expandSocial={true} />
    </>
  );
}
