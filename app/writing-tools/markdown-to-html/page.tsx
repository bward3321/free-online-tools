import type { Metadata } from "next";
import MarkdownEditor from "../markdown-editor/components/MarkdownEditor";

export const metadata: Metadata = {
  title: "Free Markdown to HTML Converter Online | EveryFreeTool",
  description: "Convert Markdown to clean HTML instantly. Copy the HTML output or download as an .html file. Supports GitHub-flavored Markdown, tables, code blocks, and more.",
  openGraph: { title: "Free Markdown to HTML Converter", description: "Convert Markdown to clean HTML. GFM support, code highlighting. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function MarkdownToHtmlPage() {
  const faqs = [
    { name: "How do I convert Markdown to HTML?", text: "Type or paste Markdown in the editor pane. Click 'Copy HTML' to copy the rendered HTML markup to your clipboard, or 'Download .html' to save a complete HTML file with embedded styling." },
    { name: "What Markdown features are supported?", text: "All GitHub Flavored Markdown features: headings, bold, italic, strikethrough, links, images, tables, ordered and unordered lists, task lists, code blocks with syntax highlighting, blockquotes, and horizontal rules." },
    { name: "Does the HTML output include styling?", text: "When you Copy HTML, you get raw HTML tags. When you Download .html, you get a complete file with embedded CSS that looks polished when opened in any browser." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "Markdown to HTML Converter", url: "https://everyfreetool.com/writing-tools/markdown-to-html", description: "Convert Markdown to HTML online. Free, client-side.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Markdown to HTML Converter</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Convert Markdown to clean, semantic HTML instantly. See the rendered preview and raw HTML side by side. Copy or download the output for blogs, emails, CMS platforms, and documentation.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Why Convert Markdown to HTML?</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Many platforms accept HTML but not Markdown. Blog CMS platforms like WordPress, email clients, and custom websites all use HTML. This converter lets you write in Markdown&apos;s clean syntax and get production-ready HTML output. The generated HTML uses semantic tags &mdash; proper <code style={{ color: "#059669" }}>&lt;h1&gt;</code> through <code style={{ color: "#059669" }}>&lt;h6&gt;</code> headings, <code style={{ color: "#059669" }}>&lt;table&gt;</code> elements, and <code style={{ color: "#059669" }}>&lt;pre&gt;&lt;code&gt;</code> blocks.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Common Conversions</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Markdown headings (<code style={{ color: "#059669" }}># Title</code>) become <code style={{ color: "#059669" }}>&lt;h1&gt;</code> tags. Bold text (<code style={{ color: "#059669" }}>**bold**</code>) becomes <code style={{ color: "#059669" }}>&lt;strong&gt;</code>. Lists become <code style={{ color: "#059669" }}>&lt;ul&gt;</code> or <code style={{ color: "#059669" }}>&lt;ol&gt;</code> with <code style={{ color: "#059669" }}>&lt;li&gt;</code> items. Code blocks become <code style={{ color: "#059669" }}>&lt;pre&gt;&lt;code&gt;</code> with syntax highlighting classes. Tables become proper HTML tables with <code style={{ color: "#059669" }}>&lt;thead&gt;</code> and <code style={{ color: "#059669" }}>&lt;tbody&gt;</code>.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Use Cases</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Publishing blog posts from Markdown drafts. Creating HTML email content from Markdown templates. Generating documentation pages. Building static HTML pages from Markdown source. Migrating content between platforms. Embedding formatted content in CMS systems that don&apos;t support Markdown natively.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Toggle the HTML pane to see raw HTML output.</p>
          </div>
        </div>
      </div>
      <MarkdownEditor title="Markdown to HTML Converter" subtitle="Convert Markdown to clean HTML." defaultShowHtmlPane={true} articleMode={true} />
    </>
  );
}
