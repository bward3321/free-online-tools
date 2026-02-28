import type { Metadata } from "next";
import JsonFormatter from "../json-formatter/components/JsonFormatter";

export const metadata: Metadata = {
  title: "JSON to YAML Converter — Convert JSON to YAML Online | EveryFreeTool",
  description: "Convert JSON to YAML format instantly. Perfect for Docker configs, Kubernetes manifests, CI/CD pipelines. Handles nested objects, arrays, all data types. Free, no signup.",
  openGraph: { title: "JSON to YAML Converter — Free Online", description: "Convert JSON to YAML for Docker, Kubernetes, and CI/CD. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function JsonToYamlPage() {
  const faqs = [
    { name: "When do I need JSON to YAML conversion?", text: "Docker Compose files, Kubernetes manifests, GitHub Actions workflows, and many CI/CD tools use YAML. If your data is in JSON, this converter produces the equivalent YAML." },
    { name: "How do the formats differ?", text: "JSON uses braces, brackets, and quotes. YAML uses indentation and is designed to be more human-readable. Both represent the same data structures (objects, arrays, strings, numbers, booleans, null)." },
    { name: "Is my data safe?", text: "All conversion happens in your browser. No data is sent to any server." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "JSON to YAML Converter", url: "https://everyfreetool.com/developer-tools/json-to-yaml",
        description: "Convert JSON to YAML format. Perfect for Docker, Kubernetes, CI/CD. Free, 100% client-side.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#8BE9FD" }}>Home</a><span>/</span><span>Developer Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">JSON to YAML Converter &mdash; Convert JSON to YAML Online</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Paste JSON and get clean YAML output instantly. Perfect for creating Docker Compose files, Kubernetes manifests, and CI/CD pipeline configs from JSON data.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">JSON vs. YAML</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Both formats represent the same data structures, but YAML uses <strong style={{ color: "var(--text)" }}>indentation instead of braces</strong> and is designed to be more human-readable. JSON is strict and unambiguous; YAML is flexible and concise. Many DevOps tools (Docker, Kubernetes, GitHub Actions) prefer YAML for configuration.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Common Use Cases</h2>
              <div className="space-y-2" style={{ fontSize: "16px", color: "var(--text-muted)" }}>
                {["Docker Compose files from API-generated configs", "Kubernetes manifests from infrastructure-as-code tools", "GitHub Actions workflows from JSON templates", "CI/CD pipeline configs (GitLab CI, CircleCI)", "Ansible playbooks from structured data"].map((use, i) => (
                  <div key={i} className="flex items-start gap-2"><span style={{ color: "#8BE9FD", flexShrink: 0 }}>&#x2713;</span><span>{use}</span></div>
                ))}
              </div>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#8BE9FD1a", borderColor: "#8BE9FD40" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Paste your JSON below &mdash; the YAML converter is already active.</p>
          </div>
        </div>
      </div>
      <JsonFormatter title="JSON to YAML Converter" subtitle="Convert JSON to clean YAML output instantly." defaultTab="json-to-yaml" articleMode={true} />
    </>
  );
}
