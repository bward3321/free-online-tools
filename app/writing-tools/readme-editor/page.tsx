import type { Metadata } from "next";
import MarkdownEditor from "../markdown-editor/components/MarkdownEditor";

const README_CONTENT = `# Project Name

> A brief description of what this project does and who it\u2019s for.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/username/project-name.git

# Navigate to the project directory
cd project-name

# Install dependencies
npm install
\`\`\`

## Usage

\`\`\`javascript
const project = require('project-name');

// Basic usage
project.init({
  option1: 'value',
  option2: true
});
\`\`\`

## Features

- \u2728 Feature one with description
- \uD83D\uDE80 Feature two with description
- \uD83D\uDD12 Feature three with description

## Contributing

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

Distributed under the MIT License. See \`LICENSE\` for more information.

## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@example.com

Project Link: [https://github.com/username/project-name](https://github.com/username/project-name)
`;

export const metadata: Metadata = {
  title: "Free README Editor Online — GitHub README Generator | EveryFreeTool",
  description: "Write and preview GitHub README files with our free online editor. Includes README templates, badge generators, and live GitHub-flavored Markdown preview.",
  openGraph: { title: "Free README Editor \u2014 GitHub README Generator", description: "Write and preview GitHub READMEs online. Templates, live preview, GFM. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function ReadmeEditorPage() {
  const faqs = [
    { name: "What makes a good README?", text: "A great README has: a clear project title and description, installation instructions, usage examples with code, a features list, contribution guidelines, and a license. Include badges for build status, version, and license. Keep it concise but complete." },
    { name: "How do I add badges to my README?", text: "Use the shields.io service. Format: ![Badge](https://img.shields.io/badge/label-message-color). Common badges: build status, version, license, downloads, coverage. The README template includes badge examples you can customize." },
    { name: "Does this preview match GitHub's rendering?", text: "Yes. The preview uses GitHub-flavored Markdown with GitHub-style typography and formatting. Tables, code blocks, task lists, and badges all render as they would on GitHub." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "README Editor", url: "https://everyfreetool.com/writing-tools/readme-editor", description: "Write and preview GitHub READMEs online. Free, client-side.", applicationCategory: "UtilityApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })) }) }} />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <div className="max-w-[800px] mx-auto px-4 py-8 md:py-12">
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--text-muted)" }}><a href="/" className="hover:underline" style={{ color: "#059669" }}>Home</a><span>/</span><span>Writing Tools</span></nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free README.md Editor &mdash; Write Better GitHub READMEs</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>Write and preview your GitHub README with live rendering, pre-built templates, and GitHub-flavored Markdown support. Start with the template below and customize it for your project.</p>
          <article className="space-y-6 mb-10">
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">What Makes a Great README</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Your README is the first thing visitors see when they find your project. A great README answers four questions immediately: <strong style={{ color: "var(--text)" }}>What</strong> does this project do? <strong style={{ color: "var(--text)" }}>Why</strong> should I care? <strong style={{ color: "var(--text)" }}>How</strong> do I install and use it? <strong style={{ color: "var(--text)" }}>How</strong> do I contribute? The template pre-loaded in the editor covers all four with proper structure and formatting.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">GitHub README Best Practices</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>Start with a concise, descriptive title and a one-line summary. Add badges for build status, version, and license &mdash; they signal project health at a glance. Include a table of contents for longer READMEs. Use code blocks with language tags for installation and usage examples. Add contributing guidelines to welcome collaborators. Keep the README updated as your project evolves.</p>
            </section>
            <section className="rounded-xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-3">Badge Syntax</h2>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "var(--text-muted)" }}>GitHub badges use the shields.io format: <code style={{ color: "#059669" }}>![Label](https://img.shields.io/badge/label-message-color)</code>. Popular badges: build passing (green), version number (blue), license type (green), download count, code coverage percentage. The template includes customizable badge examples you can modify for your project.</p>
            </section>
          </article>
          <div className="rounded-xl border p-4 mb-8 text-center" style={{ backgroundColor: "#0596691a", borderColor: "#05966940" }}>
            <p className="font-semibold" style={{ fontSize: "16px" }}>Edit the README template below for your project.</p>
          </div>
        </div>
      </div>
      <MarkdownEditor title="README.md Editor" subtitle="Write better GitHub READMEs." defaultContent={README_CONTENT} articleMode={true} />
    </>
  );
}
