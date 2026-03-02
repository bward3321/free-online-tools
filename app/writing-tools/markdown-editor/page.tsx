import type { Metadata } from "next";
import MarkdownEditor from "./components/MarkdownEditor";

export const metadata: Metadata = {
  title: "Free Online Markdown Editor with Live Preview | EveryFreeTool",
  description: "Write and preview Markdown in real-time. Free online editor with formatting toolbar, table builder, export to HTML, copy as rich text, and starter templates. No signup required.",
  openGraph: { title: "Free Online Markdown Editor with Live Preview", description: "Write and preview Markdown in real-time. Formatting toolbar, table builder, rich text export. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function MarkdownEditorPage() {
  const faqs = [
    { name: "Is this Markdown editor free?", text: "Yes, completely free with no signup, no account, and no limits. All processing happens in your browser — nothing is sent to any server." },
    { name: "What Markdown flavor does this editor support?", text: "GitHub Flavored Markdown (GFM), which includes tables, strikethrough, task lists, fenced code blocks with syntax highlighting, and autolinks. This is the same Markdown used on GitHub, GitLab, and most developer platforms." },
    { name: "Can I use this for GitHub README files?", text: "Absolutely. The preview renders using GitHub-style formatting. Use the README template from the Templates dropdown for a pre-structured starting point. The output is fully compatible with GitHub repositories." },
    { name: "How do I export my Markdown as HTML?", text: "Click 'Copy HTML' to copy the rendered HTML to your clipboard, or 'Download .html' to save a complete HTML file with styling. You can also use 'Copy as Rich Text' to paste formatted content into Gmail, Google Docs, or Notion." },
    { name: "Does this tool work offline?", text: "Once the page loads, all functionality works without an internet connection. Your content is auto-saved to your browser's local storage every 30 seconds." },
    { name: "What is the 'Copy as Rich Text' feature?", text: "It copies the rendered preview as formatted rich text that pastes beautifully into Gmail, Google Docs, Notion, Slack, and any other rich text editor. Write in Markdown, paste as polished formatted text." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Free Online Markdown Editor",
        url: "https://everyfreetool.com/writing-tools/markdown-editor",
        description: "Write and preview Markdown in real-time with formatting toolbar, table builder, and rich text export.",
        applicationCategory: "UtilityApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        browserRequirements: "Requires JavaScript. Works in all modern browsers.",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <MarkdownEditor title="Free Online Markdown Editor" subtitle="Write and preview Markdown in real-time with formatting toolbar, table builder, and rich text export." />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8">
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">What Is Markdown?</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>Markdown is a lightweight markup language created by John Gruber in 2004. It lets you write formatted text using simple, readable syntax that converts to HTML. Instead of clicking toolbar buttons or writing raw HTML, you type natural symbols: <strong style={{ color: "var(--text)" }}>**bold**</strong> for bold, <em>*italic*</em> for italic, <code style={{ color: "#059669" }}># Heading</code> for headings. Markdown is used everywhere in software development: GitHub READMEs, documentation sites, blog platforms, note-taking apps, and technical writing. Its simplicity means you focus on content, not formatting.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">How to Use This Editor</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>Type Markdown in the left pane and see it rendered instantly in the right pane. Use the formatting toolbar for quick insertions &mdash; click Bold, Italic, Link, or any other button to insert the syntax at your cursor. For tables, click the Table button to open the visual builder where you can create tables by clicking cells instead of typing pipes. When you&apos;re done, export your work: Copy as Markdown, HTML, or Rich Text (which pastes perfectly into Gmail and Google Docs), or download as a file.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Key Features</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>The <strong style={{ color: "var(--text)" }}>live preview</strong> updates as you type with scroll synchronization between editor and preview. The <strong style={{ color: "var(--text)" }}>formatting toolbar</strong> makes Markdown accessible to beginners who haven&apos;t memorized the syntax. The <strong style={{ color: "var(--text)" }}>visual table builder</strong> eliminates the pain of typing pipe-delimited tables manually. <strong style={{ color: "var(--text)" }}>Copy as Rich Text</strong> is the killer feature &mdash; write in Markdown and paste beautifully formatted text into any application. Ten <strong style={{ color: "var(--text)" }}>starter templates</strong> cover READMEs, blog posts, meeting notes, changelogs, and more.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-[22px] sm:text-[28px] font-bold mb-3">Markdown Syntax Quick Reference</h2>
              <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-muted)" }}>Headings use hash symbols: <code style={{ color: "#059669" }}># H1</code>, <code style={{ color: "#059669" }}>## H2</code>, <code style={{ color: "#059669" }}>### H3</code>. Bold uses double asterisks <code style={{ color: "#059669" }}>**bold**</code>, italic uses single <code style={{ color: "#059669" }}>*italic*</code>. Links: <code style={{ color: "#059669" }}>[text](url)</code>. Images: <code style={{ color: "#059669" }}>![alt](url)</code>. Code blocks use triple backticks with an optional language. Lists start with <code style={{ color: "#059669" }}>-</code> or <code style={{ color: "#059669" }}>1.</code>. Blockquotes start with <code style={{ color: "#059669" }}>&gt;</code>. Task lists use <code style={{ color: "#059669" }}>- [x]</code> and <code style={{ color: "#059669" }}>- [ ]</code>.</p>
            </section>
          </article>
          <div className="mb-10">
            <h2 className="font-bold mb-4" style={{ fontSize: "22px" }}>Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/writing-tools/word-counter", emoji: "\uD83D\uDCDD", title: "Word Counter", desc: "Detailed word, character, and reading time analysis" },
                { href: "/developer-tools/json-formatter", emoji: "\uD83D\uDD27", title: "JSON Formatter", desc: "Format your Markdown\u2019s code blocks" },
                { href: "/utility-tools/password-generator", emoji: "\uD83D\uDD10", title: "Password Generator", desc: "Generate strong passwords" },
                { href: "/utility-tools/qr-code-generator", emoji: "\uD83D\uDCF1", title: "QR Code Generator", desc: "Share your document via QR code" },
              ].map(t => (
                <a key={t.href} href={t.href} className="p-4 rounded-xl border hover:shadow-md transition-shadow" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <span className="text-xl">{t.emoji}</span>
                  <div className="font-semibold mt-1" style={{ fontSize: "15px" }}>{t.title}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "15px" }}>{t.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
