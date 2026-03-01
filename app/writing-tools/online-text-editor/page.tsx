import type { Metadata } from "next";
import MarkdownEditor from "../markdown-editor/components/MarkdownEditor";

export const metadata: Metadata = {
  title: "Free Online Text Editor — Write & Format Text Online | EveryFreeTool",
  description: "Simple free online text editor with formatting toolbar, word count, and export options. Write in Markdown or use the toolbar buttons. No signup required.",
  openGraph: { title: "Free Online Text Editor", description: "Simple text editor with formatting toolbar and word count. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function OnlineTextEditorPage() {
  const faqs = [
    { name: "Do I need to know Markdown?", text: "No. Use the formatting toolbar buttons to insert bold, italic, headings, lists, and links. The toolbar inserts the correct Markdown syntax for you, and the preview pane shows the formatted result. You can learn Markdown naturally as you use the toolbar." },
    { name: "Can I save my work?", text: "Your content auto-saves to your browser every 30 seconds. You can also press Ctrl+S to save manually. For permanent storage, download your work as a .md or .html file using the export buttons below the editor." },
    { name: "Is this editor free?", text: "Completely free, no signup, no limits. Everything runs in your browser — no data is ever sent to any server. Works offline once the page loads." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Online Text Editor", url: "https://everyfreetool.com/writing-tools/online-text-editor", description: "Free online text editor with formatting. No signup.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Online Text Editor with Formatting</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>A simple, free text editor that runs entirely in your browser. Use the formatting toolbar or write in Markdown. See your formatted text in real-time, then export as HTML, Markdown, or rich text.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Simple Text Editing Online</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Sometimes you just need a clean text editor without installing anything. Whether you&apos;re on a public computer, a Chromebook, or just want a quick scratchpad, this editor gives you a distraction-free writing environment with formatting tools. No accounts, no downloads, no ads. Open the page and start typing.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Formatting Without Complexity</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The toolbar provides one-click formatting for the most common needs: bold, italic, headings, bullet lists, numbered lists, links, and code blocks. You don&apos;t need to know any syntax &mdash; click a button and the formatting is applied. The preview pane shows you exactly how your text will look when exported.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Export Your Way</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>When you&apos;re done writing, export in the format you need. Copy as rich text to paste formatted content into Gmail, Google Docs, or Notion. Copy as HTML for web publishing. Download as a .md file for documentation. Download as .html for a standalone formatted document. All exports work with one click.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Start typing in the editor below.</p>
          </div>
        </div>
      </div>
      <MarkdownEditor title="Online Text Editor" subtitle="Write and format text online." articleMode={true} />
    </>
  );
}
