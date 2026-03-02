import type { Metadata } from "next";
import MarkdownEditor from "../markdown-editor/components/MarkdownEditor";

export const metadata: Metadata = {
  title: "Free HTML to Markdown Converter Online | EveryFreeTool",
  description: "Paste HTML and get clean Markdown output. Converts tags to proper Markdown syntax including headings, lists, links, images, tables, and code blocks.",
  openGraph: { title: "Free HTML to Markdown Converter", description: "Convert HTML to clean Markdown. Headings, lists, tables, code blocks. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function HtmlToMarkdownPage() {
  const faqs = [
    { name: "How do I convert HTML to Markdown?", text: "Paste your HTML into the left pane. The right pane instantly shows the converted Markdown output. Click 'Copy' to copy the Markdown to your clipboard, or download it as a .md file." },
    { name: "What HTML tags are supported?", text: "Headings (h1-h6), paragraphs, bold/italic/strikethrough, links, images, ordered and unordered lists, tables, code blocks, blockquotes, and horizontal rules. Script and style tags are automatically removed." },
    { name: "Why convert HTML to Markdown?", text: "Migrating blog content to a Markdown-based platform. Converting web pages to readable documentation. Creating Markdown versions of HTML emails. Moving content from CMS platforms to static site generators." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "HTML to Markdown Converter", url: "https://everyfreetool.com/writing-tools/html-to-markdown", description: "Convert HTML to Markdown online. Free, client-side.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 mb-4" style={{ color: "var(--text-muted)", fontSize: "15px" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free HTML to Markdown Converter</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste HTML in the left pane and get clean Markdown in the right pane. Converts headings, lists, links, images, tables, code blocks, and more. Script and style tags are automatically stripped.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Why Convert HTML to Markdown?</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Markdown is cleaner, more portable, and easier to maintain than HTML. If you have content in HTML format &mdash; from a CMS, an email, a web page, or legacy documentation &mdash; converting it to Markdown makes it simpler to edit, version control with Git, and publish across platforms. Static site generators like Hugo, Jekyll, and Gatsby all use Markdown as their primary content format.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">What Gets Converted</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>The converter handles the most common HTML elements: <code style={{ color: "#059669" }}>&lt;h1&gt;</code> through <code style={{ color: "#059669" }}>&lt;h6&gt;</code> become <code style={{ color: "#059669" }}># Heading</code> syntax. <code style={{ color: "#059669" }}>&lt;strong&gt;</code> and <code style={{ color: "#059669" }}>&lt;em&gt;</code> become <code style={{ color: "#059669" }}>**bold**</code> and <code style={{ color: "#059669" }}>*italic*</code>. Links become <code style={{ color: "#059669" }}>[text](url)</code>. Lists, tables, code blocks, and blockquotes are all properly converted. Inline styles, scripts, and non-semantic tags are stripped.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Documentation Workflows</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-muted)" }}>Many documentation teams maintain content in Markdown for version control and simplicity, but receive content from stakeholders in HTML format (emails, Google Docs exports, web pages). This converter bridges the gap &mdash; paste the HTML, get clean Markdown, and commit it to your documentation repository.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "17px" }}>Paste your HTML in the left pane below.</p>
          </div>
        </div>
      </div>
      <MarkdownEditor title="HTML to Markdown Converter" subtitle="Paste HTML, get clean Markdown." defaultHtmlToMd={true} articleMode={true} />
    </>
  );
}
