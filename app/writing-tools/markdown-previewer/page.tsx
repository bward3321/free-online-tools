import type { Metadata } from "next";
import MarkdownEditor from "../markdown-editor/components/MarkdownEditor";

export const metadata: Metadata = {
  title: "Free Markdown Previewer Online — Live Render | EveryFreeTool",
  description: "Paste your Markdown and see it rendered instantly. Free online previewer with GitHub-flavored Markdown support, syntax highlighting, and export options.",
  openGraph: { title: "Free Markdown Previewer \u2014 Live Render", description: "Paste Markdown and see it rendered instantly. GFM support, syntax highlighting. Free.", type: "website" },
  robots: "index, follow",
};

export default function MarkdownPreviewerPage() {
  const faqs = [
    { name: "How do I preview a Markdown file?", text: "Paste your Markdown text into the editor pane on the left, or drag and drop a .md file onto the editor. The preview pane on the right shows the rendered output instantly, updating in real-time as you type." },
    { name: "Does this support GitHub Flavored Markdown?", text: "Yes. The previewer supports all GFM features: tables, strikethrough, task lists with checkboxes, fenced code blocks with syntax highlighting, and autolinks." },
    { name: "Can I check how my README.md will look on GitHub?", text: "Yes. The preview renders using GitHub-style typography and formatting, so what you see here closely matches how it will appear on GitHub. Use this to proof your README before pushing." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Free Markdown Previewer", url: "https://everyfreetool.com/writing-tools/markdown-previewer", description: "Preview Markdown rendered in real-time. Free, client-side.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Markdown Previewer &mdash; See Your Markdown Rendered Instantly</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste your Markdown text or drop a .md file to see it rendered with GitHub-flavored styling. Perfect for checking READMEs, documentation, and blog posts before publishing.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Preview Before You Publish</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Writing Markdown without seeing the rendered output is like coding without running the program. This previewer gives you instant visual feedback as you type or paste. Tables render as actual tables, code blocks get syntax highlighting, task lists show checkboxes, and headings display with proper hierarchy. No more pushing to GitHub just to see how your README looks.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">GitHub-Flavored Markdown</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>The previewer supports all GitHub Flavored Markdown extensions: pipe tables with alignment, strikethrough with tildes, task lists with checkboxes, fenced code blocks with language-specific syntax highlighting, and automatic URL linking. The styling matches GitHub&apos;s rendering closely, so what you see here is what your audience will see on GitHub.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Checking README Files</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Your README.md is the front page of your repository. Before every commit, paste it here to verify: Are the headings right? Do the code blocks highlight correctly? Are the links formatted properly? Does the table look good? A 30-second preview check saves you from embarrassing formatting issues in your public repo.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your Markdown below to preview it.</p>
          </div>
        </div>
      </div>
      <MarkdownEditor title="Markdown Previewer" subtitle="See your Markdown rendered instantly." defaultPreviewBias={true} articleMode={true} />
    </>
  );
}
