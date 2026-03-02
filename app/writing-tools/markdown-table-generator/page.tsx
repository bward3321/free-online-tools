import type { Metadata } from "next";
import MarkdownEditor from "../markdown-editor/components/MarkdownEditor";

export const metadata: Metadata = {
  title: "Free Markdown Table Generator — Visual Table Builder | EveryFreeTool",
  description: "Create Markdown tables visually. Click to add rows and columns, type in cells, and copy the perfectly formatted Markdown table syntax. No memorizing pipe syntax.",
  openGraph: { title: "Free Markdown Table Generator", description: "Create Markdown tables visually. Add rows, columns, set alignment. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function MarkdownTableGeneratorPage() {
  const faqs = [
    { name: "How do I create a Markdown table?", text: "Click the Table button in the toolbar (or it opens automatically on this page). Select your table dimensions, type content into cells, set column alignment, then click 'Insert Table' or 'Copy Markdown' to get the formatted syntax." },
    { name: "How does Markdown table alignment work?", text: "Alignment is set in the separator row using colons. Left-align: |---| (default). Center: |:---:|. Right: |---:|. Click the alignment button on each column header in the table builder to cycle through options." },
    { name: "Can I create complex tables?", text: "Markdown tables support headers, alignment, and any number of rows and columns. However, Markdown doesn't support merged cells, nested tables, or multi-line cell content. For those cases, use raw HTML tables." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Markdown Table Generator", url: "https://everyfreetool.com/writing-tools/markdown-table-generator", description: "Create Markdown tables visually. Free, client-side.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Markdown Table Generator</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Create Markdown tables visually without memorizing pipe syntax. Click to add rows and columns, type directly into cells, set column alignment, and copy the perfectly formatted table.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Markdown Table Syntax</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Markdown tables use pipes (<code style={{ color: "#059669" }}>|</code>) to separate columns and hyphens (<code style={{ color: "#059669" }}>---</code>) to create the header separator row. The first row is always the header. Alignment is controlled with colons in the separator: <code style={{ color: "#059669" }}>:---</code> for left, <code style={{ color: "#059669" }}>:---:</code> for center, <code style={{ color: "#059669" }}>---:</code> for right. This syntax is supported across GitHub, GitLab, and most Markdown renderers.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Why Use a Visual Table Builder?</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Typing Markdown tables by hand is tedious and error-prone. Miscounting pipes, misaligning columns, and forgetting the separator row are common mistakes. The visual builder eliminates these issues &mdash; you type content directly into cells, and the tool generates correctly formatted Markdown. Add or remove rows and columns with a click.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Tips for Better Tables</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Keep header text short and descriptive. Use alignment to improve readability &mdash; center column headers, right-align numbers. For tables with many columns, consider splitting into multiple smaller tables. If you need merged cells or complex layouts, Markdown tables won&apos;t suffice &mdash; use raw HTML tables instead.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>The table builder opens automatically below. Fill in your cells and copy the Markdown.</p>
          </div>
        </div>
      </div>
      <MarkdownEditor title="Markdown Table Generator" subtitle="Create tables visually." defaultTableBuilder={true} articleMode={true} />
    </>
  );
}
