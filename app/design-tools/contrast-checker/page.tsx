import type { Metadata } from "next";
import ColorPicker from "../color-picker/components/ColorPicker";

export const metadata: Metadata = {
  title: "WCAG Contrast Checker — Test Color Accessibility Instantly | EveryFreeTool",
  description: "Check WCAG 2.1 contrast ratios for text and background colors. AA and AAA compliance, live preview, smart suggestions for fixes. Free, 100% client-side.",
  openGraph: { title: "WCAG Contrast Checker — Free Online", description: "Test color accessibility with WCAG contrast ratios. AA and AAA compliance. Free, instant.", type: "website" },
  robots: "index, follow",
};

export default function ContrastCheckerPage() {
  const faqs = [
    { name: "What are WCAG contrast requirements?", text: "WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18px+ or 14px+ bold). Level AAA requires 7:1 for normal text and 4.5:1 for large text." },
    { name: "Why does color contrast matter?", text: "Approximately 1 in 12 men and 1 in 200 women have color vision deficiency. Low contrast text is also harder to read in bright sunlight, for aging eyes, and on low-quality displays. Meeting WCAG standards ensures your content is readable by everyone." },
    { name: "What if my colors fail the contrast check?", text: "The tool suggests the nearest compliant color by adjusting lightness while keeping the same hue and saturation. You can click the suggestion to apply it instantly." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "WCAG Contrast Checker", url: "https://everyfreetool.com/design-tools/contrast-checker", description: "Check WCAG contrast ratios for color accessibility. Free, 100% client-side.", applicationCategory: "DesignApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Design Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">WCAG Contrast Checker &mdash; Test Color Accessibility Instantly</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Pick a foreground and background color to instantly check WCAG 2.1 contrast compliance. Live text preview at multiple sizes, AA and AAA results, and smart fix suggestions.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">What Is WCAG?</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The Web Content Accessibility Guidelines (WCAG) are international standards for making web content accessible to people with disabilities. WCAG 2.1 defines minimum contrast ratios between text and background colors. <strong style={{ color: "var(--text)" }}>Level AA</strong> (the minimum standard) requires 4.5:1 for normal text. <strong style={{ color: "var(--text)" }}>Level AAA</strong> (enhanced) requires 7:1. These standards are legally required under the ADA, Section 508, and the European EN 301 549.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">How the Contrast Ratio Works</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The contrast ratio is calculated from the <strong style={{ color: "var(--text)" }}>relative luminance</strong> of two colors. Luminance measures perceived brightness, accounting for the eye&apos;s different sensitivity to red, green, and blue light. The formula produces a ratio from 1:1 (no contrast, identical colors) to 21:1 (maximum contrast, black on white). This tool calculates the exact ratio in real-time as you adjust colors.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Common Mistakes to Avoid</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}><strong style={{ color: "var(--text)" }}>Light gray text on white</strong> &mdash; #999 on #FFF is only 2.85:1 (fails AA). <strong style={{ color: "var(--text)" }}>Colored text on colored backgrounds</strong> &mdash; blue on purple, green on teal, etc. often fail even when they &ldquo;look fine.&rdquo; <strong style={{ color: "var(--text)" }}>Placeholder text</strong> &mdash; light gray placeholders in form inputs frequently fail contrast requirements. Always test with this tool before shipping.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Enter foreground and background colors below to check contrast.</p>
          </div>
        </div>
      </div>
      <ColorPicker title="WCAG Contrast Checker" subtitle="Test color accessibility instantly." defaultTab="contrast" articleMode={true} />
    </>
  );
}
