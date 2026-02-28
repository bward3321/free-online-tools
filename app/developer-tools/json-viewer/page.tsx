import type { Metadata } from "next";
import JsonFormatter from "../json-formatter/components/JsonFormatter";

export const metadata: Metadata = {
  title: "JSON Viewer — Explore JSON Data in Tree View | EveryFreeTool",
  description: "View JSON as a collapsible tree. Navigate nested objects, expand/collapse nodes, copy JSON paths. Perfect for debugging complex API responses. Free, no signup.",
  openGraph: { title: "JSON Viewer — Interactive Tree View", description: "Explore JSON as a collapsible tree. Click to copy paths. Perfect for debugging. Free, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function JsonViewerPage() {
  const faqs = [
    { name: "What is a JSON tree view?", text: "A tree view represents JSON data as a hierarchical, collapsible structure. Objects and arrays can be expanded or collapsed, making it easy to navigate deeply nested data without scrolling through thousands of lines." },
    { name: "Can I copy JSON paths?", text: "Yes. Click any key in the tree to copy its full path (e.g., data.users[0].name) to your clipboard. Use these paths directly in your code." },
    { name: "Is my data safe?", text: "All rendering happens in your browser. No data is sent to any server." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "JSON Viewer", url: "https://everyfreetool.com/developer-tools/json-viewer",
        description: "View JSON as a collapsible tree. Navigate nested objects, copy JSON paths. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">JSON Viewer &mdash; Explore JSON Data in Tree View</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste JSON to explore it as an interactive, collapsible tree. Navigate deeply nested structures, expand/collapse nodes, and click any key to copy its JSON path.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Navigating Complex API Responses</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>API responses can be hundreds or thousands of lines long. Scrolling through formatted text to find a specific nested value is tedious. The tree view lets you collapse everything, then expand only the branches you need. It&apos;s like a file explorer for your data.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Copy JSON Paths</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Click any key in the tree to copy its full path to your clipboard. For example, clicking &ldquo;name&rdquo; under the first employee might copy <code>employees[0].name</code>. Paste this directly into your code to access that value.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your JSON below &mdash; the tree view is already active.</p>
          </div>
        </div>
      </div>
      <JsonFormatter title="JSON Viewer" subtitle="Explore JSON as an interactive, collapsible tree." defaultTab="tree" articleMode={true} />
    </>
  );
}
