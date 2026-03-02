"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { marked } from "marked";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import sql from "highlight.js/lib/languages/sql";
import yaml from "highlight.js/lib/languages/yaml";
import markdown from "highlight.js/lib/languages/markdown";
import java from "highlight.js/lib/languages/java";
import php from "highlight.js/lib/languages/php";
import ruby from "highlight.js/lib/languages/ruby";
import csharp from "highlight.js/lib/languages/csharp";
import diff from "highlight.js/lib/languages/diff";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("md", markdown);
hljs.registerLanguage("java", java);
hljs.registerLanguage("php", php);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("rb", ruby);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("cs", csharp);
hljs.registerLanguage("diff", diff);

/* ────────────── types ────────────── */
type ViewMode = "split" | "editor" | "preview";
type PreviewTheme = "github" | "minimal" | "dark";
interface Props {
  title: string;
  subtitle: string;
  articleMode?: boolean;
  defaultPreviewBias?: boolean; // previewer variant: 65/35 preview/editor
  defaultShowHtmlPane?: boolean; // markdown-to-html variant
  defaultHtmlToMd?: boolean; // html-to-markdown variant
  defaultTableBuilder?: boolean; // table generator variant
  defaultContent?: string; // readme-editor variant
}

/* ────────────── default content ────────────── */
const DEFAULT_CONTENT = `# Welcome to the Markdown Editor \u2728

Start writing in **Markdown** and see it rendered in *real-time* in the preview pane \u2192

## Quick Start

Use the **formatting toolbar** above to insert Markdown syntax, or type it directly:

- **Bold**: \`**text**\` or Ctrl+B
- *Italic*: \`*text*\` or Ctrl+I
- \`Code\`: backticks or Ctrl+E
- [Links](https://everyfreetool.com): Ctrl+K

## Features

- [x] Live preview with scroll sync
- [x] Formatting toolbar for beginners
- [x] Visual table builder
- [x] Copy as rich text for Gmail & Docs
- [x] Export to HTML or .md file
- [x] 10 starter templates

## Try a Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}! Welcome to EveryFreeTool.\`;
}
\`\`\`

## Try a Table

| Feature | Status | Notes |
|---------|:------:|-------|
| Editor | \u2705 | Monospace with line numbers |
| Preview | \u2705 | GitHub-flavored Markdown |
| Export | \u2705 | HTML, Markdown, Rich Text |

> \uD83D\uDCA1 **Tip**: Click the **Table** button in the toolbar to build tables visually \u2014 no need to memorize the pipe syntax!

---

*Start fresh by clearing this content, or pick a **Template** from the dropdown above.*
`;

const README_TEMPLATE = `# Project Name

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

const TEMPLATES: { name: string; content: string }[] = [
  { name: "README.md", content: README_TEMPLATE },
  { name: "Blog Post", content: `# How to Build Better Software in 2026

*Published: February 28, 2026 \u2022 By Jane Developer*

## Introduction

Building software today is fundamentally different from five years ago. The tools are better, the frameworks are faster, and the expectations are higher. In this post, I\u2019ll share three principles that have transformed how our team ships code.

## 1. Start with the User\u2019s Problem

Before writing a single line of code, write down the problem you\u2019re solving in one sentence. If you can\u2019t, you\u2019re not ready to code.

> \u201CThe best code is the code you never have to write.\u201D \u2014 Jeff Atwood

### Example

**Bad**: \u201CBuild a notification system.\u201D
**Good**: \u201CUsers miss critical updates because they don\u2019t check the dashboard daily.\u201D

## 2. Ship Small, Ship Often

Break features into the smallest possible increments:

- [ ] Design the data model
- [ ] Build the API endpoint
- [ ] Create the UI component
- [ ] Add error handling
- [ ] Write tests
- [ ] Deploy to staging
- [ ] Get user feedback

## 3. Measure Everything

| Metric | Target | Why It Matters |
|--------|--------|---------------|
| Page Load | < 2s | Users leave after 3s |
| Error Rate | < 0.1% | Trust is fragile |
| Test Coverage | > 80% | Confidence to ship |

## Conclusion

Great software isn\u2019t about using the latest framework. It\u2019s about solving real problems, shipping quickly, and measuring what matters.

**What principles guide your team? Share in the comments below.**
` },
  { name: "Meeting Notes", content: `# Team Standup \u2014 February 28, 2026

**Date**: February 28, 2026
**Time**: 10:00 AM EST
**Attendees**: Alice, Bob, Carol, Dave

---

## Agenda

- [x] Sprint progress review
- [x] Blocker discussion
- [ ] Release planning for v2.4
- [ ] Design review for new dashboard

## Discussion Points

### Sprint Progress

**Alice** \u2014 Completed the authentication refactor. PR #342 is ready for review.

**Bob** \u2014 Working on the search API. Performance testing shows 40% improvement over current implementation.

**Carol** \u2014 Finished the mobile responsive updates. Need design approval on the tablet breakpoint.

**Dave** \u2014 Investigating the memory leak in the WebSocket connection. Root cause identified, fix in progress.

### Blockers

1. **API rate limiting** \u2014 Third-party API is throttling our requests during peak hours
   - *Action*: Bob to implement request queuing by Friday
2. **Design assets** \u2014 Waiting on updated icons from the design team
   - *Action*: Carol to follow up with design lead

## Action Items

| Action | Owner | Due Date |
|--------|-------|----------|
| Review PR #342 | Bob | Mar 1 |
| Implement request queuing | Bob | Mar 3 |
| Follow up on design assets | Carol | Mar 1 |
| Fix WebSocket memory leak | Dave | Mar 2 |

## Next Meeting

**March 3, 2026** at 10:00 AM EST
` },
  { name: "Changelog", content: `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2026-02-28

### Added
- Dark mode support across all pages
- Export to PDF functionality
- Real-time collaboration (beta)
- Keyboard shortcut reference panel

### Changed
- Improved search performance by 40%
- Updated authentication flow to use OAuth 2.0
- Redesigned settings page for better usability

### Fixed
- Fixed memory leak in WebSocket connections (#245)
- Fixed incorrect date formatting in reports (#251)
- Fixed mobile navigation menu not closing on link click (#253)

### Removed
- Removed deprecated v1 API endpoints
- Removed legacy browser support (IE 11)

## [2.3.1] - 2026-01-15

### Fixed
- Hot fix for login redirect loop on Safari
- Fixed CSV export missing header row

## [2.3.0] - 2026-01-10

### Added
- Batch processing for file uploads
- Custom webhook integrations
- Two-factor authentication support

### Changed
- Migrated database to PostgreSQL 16
- Updated all dependencies to latest versions
` },
  { name: "Technical Docs", content: `# API Documentation

## Overview

The EveryFreeTool API provides programmatic access to our suite of tools. All endpoints return JSON and use standard HTTP response codes.

**Base URL**: \`https://api.everyfreetool.com/v2\`

## Prerequisites

- API key (get one at [dashboard.everyfreetool.com](https://dashboard.everyfreetool.com))
- HTTPS required for all requests
- Rate limit: 100 requests/minute

## Authentication

Include your API key in the \`Authorization\` header:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.everyfreetool.com/v2/tools
\`\`\`

## Endpoints

### List Tools

\`\`\`
GET /v2/tools
\`\`\`

**Response**:
\`\`\`json
{
  "tools": [
    {
      "id": "word-counter",
      "name": "Word Counter",
      "category": "writing-tools",
      "status": "active"
    }
  ],
  "total": 15
}
\`\`\`

### Get Tool Details

\`\`\`
GET /v2/tools/:id
\`\`\`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Tool identifier |

## Error Handling

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request \u2014 check parameters |
| 401 | Unauthorized \u2014 invalid API key |
| 429 | Rate Limited \u2014 slow down |
| 500 | Server Error \u2014 try again later |

## Troubleshooting

### Common Issues

**401 Unauthorized**: Make sure your API key is valid and included in the Authorization header. Keys expire after 90 days.

**429 Rate Limited**: You\u2019re sending too many requests. Implement exponential backoff or contact support for higher limits.

## FAQ

**Q: Is there a sandbox environment?**
A: Yes, use \`https://sandbox.api.everyfreetool.com/v2\` with your test API key.

**Q: What\u2019s the maximum request body size?**
A: 10MB for file uploads, 1MB for JSON payloads.
` },
  { name: "Project Proposal", content: `# Project Proposal: Dashboard Redesign

## Executive Summary

We propose a complete redesign of the analytics dashboard to improve user engagement and reduce support tickets. The current dashboard has a 34% bounce rate and generates 50+ support tickets per month about data interpretation.

## Problem Statement

Our analytics dashboard was designed three years ago for power users. Since then, our user base has shifted:

- **68%** of users are non-technical managers
- **34%** bounce rate on dashboard (highest in the app)
- **50+** monthly support tickets asking \u201Cwhat does this chart mean?\u201D
- **NPS score** for dashboard: 23 (vs. 67 for the rest of the app)

## Proposed Solution

### Phase 1: Simplified Default View (4 weeks)
- Replace 12-chart default view with 4 key metrics
- Add plain-English summaries below each chart
- Implement guided tour for first-time users

### Phase 2: Customizable Dashboard (3 weeks)
- Drag-and-drop widget system
- Save custom dashboard layouts
- Share dashboards with team members

### Phase 3: Automated Insights (3 weeks)
- AI-generated weekly summary emails
- Anomaly detection with alerts
- Trend analysis with recommendations

## Timeline

| Phase | Duration | Start | End |
|-------|----------|-------|-----|
| Phase 1 | 4 weeks | Mar 1 | Mar 28 |
| Phase 2 | 3 weeks | Apr 1 | Apr 18 |
| Phase 3 | 3 weeks | Apr 21 | May 9 |
| Testing | 2 weeks | May 12 | May 23 |

## Budget

- **Engineering**: 2 developers \u00D7 12 weeks = $96,000
- **Design**: 1 designer \u00D7 6 weeks = $24,000
- **QA**: 1 tester \u00D7 4 weeks = $16,000
- **Total**: $136,000

## Risks

1. **Scope creep** \u2014 Mitigated by fixed phase deliverables
2. **User resistance to change** \u2014 Mitigated by keeping old view as \u201CClassic\u201D option
3. **Data migration** \u2014 Mitigated by maintaining backward compatibility
` },
  { name: "Release Notes", content: `# Release Notes \u2014 v2.4.0

**Release Date**: February 28, 2026

## \uD83C\uDF1F Highlights

This release introduces **dark mode**, **real-time collaboration**, and a **40% faster search**. These are the three most requested features from our user survey.

## \u2728 New Features

### Dark Mode
Toggle between light and dark themes from the settings menu or the header icon. The theme respects your system preference by default and remembers your choice.

### Real-Time Collaboration (Beta)
Share a document link and edit simultaneously with your team. Changes sync instantly. Cursors are color-coded per user. Access via the new \u201CShare\u201D button.

> \u26A0\uFE0F **Beta**: Collaboration supports up to 5 simultaneous editors. We\u2019re scaling this in v2.5.

### Export to PDF
One-click PDF export with customizable headers, footers, and page breaks. Supports all document types.

## \uD83D\uDC1B Bug Fixes

- Fixed memory leak in WebSocket connections that caused slowdowns after 30+ minutes (#245)
- Fixed incorrect date formatting in exported reports (#251)
- Fixed mobile navigation menu remaining open after clicking a link (#253)
- Fixed search results not updating when filters change (#249)

## \u26A0\uFE0F Known Issues

- Dark mode may not apply to embedded content from third-party integrations
- PDF export does not include interactive charts (static images used instead)

## \u2B06\uFE0F Upgrade Instructions

\`\`\`bash
# Update to the latest version
npm update @everyfreetool/core@2.4.0

# Run database migrations
npm run migrate

# Restart the application
npm run restart
\`\`\`

No breaking changes. All v2.3.x configurations are fully compatible.
` },
  { name: "Comparison Table", content: `# Markdown Editors Compared: 2026 Edition

## Introduction

Choosing the right Markdown editor depends on your workflow. Here\u2019s a detailed comparison of the most popular options available today.

## Feature Comparison

| Feature | EveryFreeTool | Typora | StackEdit | Dillinger | HackMD |
|---------|:---:|:---:|:---:|:---:|:---:|
| Free | \u2705 | \u274C | \u2705 | \u2705 | \u2705 |
| No Signup | \u2705 | \u2705 | \u274C | \u2705 | \u274C |
| Live Preview | \u2705 | \u2705 | \u2705 | \u2705 | \u2705 |
| GFM Support | \u2705 | \u2705 | \u2705 | \u2705 | \u2705 |
| Table Builder | \u2705 | \u274C | \u274C | \u274C | \u274C |
| Rich Text Copy | \u2705 | \u2705 | \u274C | \u274C | \u274C |
| Templates | \u2705 | \u274C | \u274C | \u274C | \u2705 |
| Offline | \u2705 | \u2705 | \u274C | \u274C | \u274C |
| Export HTML | \u2705 | \u2705 | \u2705 | \u2705 | \u2705 |

## Pros & Cons

### EveryFreeTool Markdown Editor
**Pros**: Free, no signup, visual table builder, rich text copy, 10 templates, works offline
**Cons**: Web-based (no native app), no cloud sync

### Typora
**Pros**: Beautiful WYSIWYG editing, native app performance, many export formats
**Cons**: Paid ($14.99), no web version, no collaboration

### StackEdit
**Pros**: Powerful features, Google Drive sync, workspace management
**Cons**: Requires account, can be slow, cluttered interface

## Conclusion

For quick Markdown editing without installation or signup, **EveryFreeTool** offers the best combination of features and simplicity. For heavy daily use, **Typora** justifies its one-time price. For team collaboration, consider **HackMD**.
` },
  { name: "Tutorial / How-To", content: `# How to Write Markdown: A Complete Beginner\u2019s Guide

## What You\u2019ll Learn

By the end of this tutorial, you\u2019ll be able to write formatted documents using Markdown \u2014 including headings, lists, links, images, code blocks, and tables.

## Prerequisites

- A text editor (you\u2019re in one right now!)
- 10 minutes of your time

## Step 1: Headings

Use \`#\` symbols to create headings. More \`#\` symbols = smaller heading:

\`\`\`markdown
# Heading 1 (largest)
## Heading 2
### Heading 3
#### Heading 4
\`\`\`

## Step 2: Text Formatting

Make text **bold**, *italic*, or ~~strikethrough~~:

\`\`\`markdown
**bold text**
*italic text*
~~strikethrough~~
\`\`\`

## Step 3: Lists

**Unordered list:**
- Item one
- Item two
  - Nested item

**Ordered list:**
1. First step
2. Second step
3. Third step

**Task list:**
- [x] Learn headings
- [x] Learn formatting
- [ ] Learn lists (you are here!)
- [ ] Learn code blocks
- [ ] Learn tables

## Step 4: Code

Inline code: \`const x = 42;\`

Code block with syntax highlighting:

\`\`\`python
def hello(name):
    print(f"Hello, {name}!")

hello("World")
\`\`\`

## Step 5: Links and Images

\`\`\`markdown
[Link text](https://example.com)
![Alt text](https://example.com/image.png)
\`\`\`

## Step 6: Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |

## Summary

You now know the fundamentals of Markdown! Practice by editing this document \u2014 change the headings, add items to the task list, and try creating your own table.

> \uD83D\uDCA1 **Next step**: Try the **Templates** dropdown above to see Markdown used in real documents like READMEs, changelogs, and blog posts.
` },
  { name: "Blank", content: "" },
];

/* ────────────── HTML to Markdown converter ────────────── */
function htmlToMarkdown(html: string): string {
  // Lightweight HTML to Markdown conversion
  let md = html;
  // Remove script/style tags
  md = md.replace(/<script[\s\S]*?<\/script>/gi, "");
  md = md.replace(/<style[\s\S]*?<\/style>/gi, "");
  // Headings
  for (let i = 6; i >= 1; i--) {
    const re = new RegExp(`<h${i}[^>]*>(.*?)<\\/h${i}>`, "gi");
    md = md.replace(re, (_, content) => `${"#".repeat(i)} ${content.replace(/<[^>]*>/g, "").trim()}\n\n`);
  }
  // Bold
  md = md.replace(/<(strong|b)>(.*?)<\/(strong|b)>/gi, "**$2**");
  // Italic
  md = md.replace(/<(em|i)>(.*?)<\/(em|i)>/gi, "*$2*");
  // Strikethrough
  md = md.replace(/<(del|s|strike)>(.*?)<\/(del|s|strike)>/gi, "~~$2~~");
  // Code
  md = md.replace(/<code>(.*?)<\/code>/gi, "`$1`");
  // Links
  md = md.replace(/<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");
  // Images
  md = md.replace(/<img\s+[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img\s+[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)");
  md = md.replace(/<img\s+[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");
  // Blockquote
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    return content.replace(/<[^>]*>/g, "").trim().split("\n").map((l: string) => `> ${l.trim()}`).join("\n") + "\n\n";
  });
  // Pre/code blocks
  md = md.replace(/<pre[^>]*><code[^>]*class="[^"]*language-(\w+)"[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, lang, code) => {
    return `\`\`\`${lang}\n${code.replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim()}\n\`\`\`\n\n`;
  });
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => {
    return `\`\`\`\n${code.replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim()}\n\`\`\`\n\n`;
  });
  // Unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content) => {
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__ : string, li: string) => `- ${li.replace(/<[^>]*>/g, "").trim()}\n`) + "\n";
  });
  // Ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content) => {
    let idx = 0;
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__: string, li: string) => `${++idx}. ${li.replace(/<[^>]*>/g, "").trim()}\n`) + "\n";
  });
  // Horizontal rule
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n\n");
  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, content) => `${content.replace(/<[^>]*>/g, "").trim()}\n\n`);
  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, "\n");
  // Strip remaining tags
  md = md.replace(/<[^>]*>/g, "");
  // Decode entities
  md = md.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
  // Clean up excessive newlines
  md = md.replace(/\n{3,}/g, "\n\n").trim();
  return md;
}

/* ────────────── COMPONENT ────────────── */
export default function MarkdownEditor({
  title: _title,
  subtitle: _subtitle,
  articleMode = false,
  defaultPreviewBias = false,
  defaultShowHtmlPane = false,
  defaultHtmlToMd = false,
  defaultTableBuilder = false,
  defaultContent,
}: Props) {
  // Dark mode
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
    const obs = new MutationObserver(() => setIsDark(html.classList.contains("dark")));
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Editor state
  const [content, setContent] = useState(() => {
    if (defaultContent) return defaultContent;
    if (defaultHtmlToMd) return "";
    return DEFAULT_CONTENT;
  });
  const [htmlInput, setHtmlInput] = useState(""); // for html-to-markdown
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [splitPos, setSplitPos] = useState(defaultPreviewBias ? 35 : 50);
  const [showTableBuilder, setShowTableBuilder] = useState(defaultTableBuilder);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showHtmlPane, setShowHtmlPane] = useState(defaultShowHtmlPane);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [showCodeLangMenu, setShowCodeLangMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

  // Settings
  const [fontSize, setFontSize] = useState(15);
  const [tabSize, setTabSize] = useState(2);
  const [autoClose, setAutoClose] = useState(true);
  const [showLineNums, setShowLineNums] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
  const [scrollSync, setScrollSync] = useState(true);

  // Find & Replace
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [findCaseSensitive, setFindCaseSensitive] = useState(false);

  // Table builder
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [tableCells, setTableCells] = useState<string[][]>(() => Array(3).fill(null).map(() => Array(3).fill("")));
  const [tableAligns, setTableAligns] = useState<("left" | "center" | "right")[]>(Array(3).fill("left"));

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-save
  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      try { localStorage.setItem("md-editor-content", content); } catch {}
    }, 30000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [content]);

  // Load saved content
  useEffect(() => {
    if (defaultContent || defaultHtmlToMd) return;
    try {
      const saved = localStorage.getItem("md-editor-content");
      if (saved) setContent(saved);
    } catch {}
  }, [defaultContent, defaultHtmlToMd]);

  // Toast
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }, []);

  // Configure marked
  useEffect(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
    const renderer = new marked.Renderer();
    renderer.code = function({ text, lang }: { text: string; lang?: string }) {
      let highlighted: string;
      if (lang && hljs.getLanguage(lang)) {
        try { highlighted = hljs.highlight(text, { language: lang }).value; } catch { highlighted = text.replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
      } else {
        highlighted = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      return `<pre style="background:${isDark ? "#282A36" : "#f6f8fa"};border-radius:8px;padding:16px;overflow-x:auto;margin:16px 0;border:1px solid ${isDark ? "#3B3D50" : "#d0d7de"}"><code class="hljs${lang ? ` language-${lang}` : ""}" style="font-family:'JetBrains Mono','Fira Code',monospace;font-size:14px;line-height:1.5">${highlighted}</code></pre>`;
    };
    marked.use({ renderer });
  }, [isDark]);

  // Render preview
  const renderedHtml = useMemo(() => {
    try { return marked.parse(content) as string; } catch { return ""; }
  }, [content, isDark]);

  // Render html-to-md
  const convertedMd = useMemo(() => {
    if (!defaultHtmlToMd || !htmlInput) return "";
    return htmlToMarkdown(htmlInput);
  }, [htmlInput, defaultHtmlToMd]);

  // Stats
  const stats = useMemo(() => {
    const text = content;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const lines = text.split("\n").length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const readTime = Math.max(1, Math.ceil(words / 200));
    const speakTime = Math.max(1, Math.ceil(words / 130));
    return { words, chars, charsNoSpace, lines, paragraphs, readTime, speakTime };
  }, [content]);

  // Line numbers
  const lineNumbers = useMemo(() => content.split("\n").length, [content]);

  // Scroll sync
  const handleEditorScroll = useCallback(() => {
    if (!scrollSync || !editorRef.current || !previewRef.current) return;
    const ed = editorRef.current;
    const ratio = ed.scrollTop / (ed.scrollHeight - ed.clientHeight || 1);
    const pr = previewRef.current;
    pr.scrollTop = ratio * (pr.scrollHeight - pr.clientHeight);
  }, [scrollSync]);

  // Insert text helper
  const insertAtCursor = useCallback((before: string, after = "", placeholder = "") => {
    const ta = editorRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);
    const text = selected || placeholder;
    const newContent = content.slice(0, start) + before + text + after + content.slice(end);
    setContent(newContent);
    requestAnimationFrame(() => {
      ta.focus();
      const cursorPos = start + before.length + (selected ? selected.length : 0);
      ta.setSelectionRange(
        selected ? start + before.length : start + before.length,
        selected ? start + before.length + selected.length : start + before.length + placeholder.length
      );
    });
  }, [content]);

  // Wrap selected or insert
  const wrapSelection = useCallback((wrapper: string, placeholder: string) => {
    insertAtCursor(wrapper, wrapper, placeholder);
  }, [insertAtCursor]);

  // Line prefix
  const prefixLine = useCallback((prefix: string) => {
    const ta = editorRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = content.lastIndexOf("\n", start - 1) + 1;
    const newContent = content.slice(0, lineStart) + prefix + content.slice(lineStart);
    setContent(newContent);
    requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(start + prefix.length, start + prefix.length); });
  }, [content]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const mod = e.metaKey || e.ctrlKey;

    // Tab
    if (e.key === "Tab") {
      e.preventDefault();
      insertAtCursor(" ".repeat(tabSize));
      return;
    }

    // Auto-indent on Enter
    if (e.key === "Enter") {
      const ta = editorRef.current;
      if (!ta) return;
      const pos = ta.selectionStart;
      const line = content.slice(content.lastIndexOf("\n", pos - 1) + 1, pos);
      const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s/);
      if (listMatch) {
        e.preventDefault();
        const indent = listMatch[1];
        const bullet = listMatch[2];
        const nextBullet = bullet.match(/^\d+\./) ? `${parseInt(bullet) + 1}.` : bullet;
        insertAtCursor("\n" + indent + nextBullet + " ");
      }
      return;
    }

    // Auto-close
    if (autoClose) {
      const pairs: Record<string, string> = { "`": "`", "*": "*", "[": "]", "(": ")", "{": "}" };
      if (pairs[e.key] && !mod) {
        const ta = editorRef.current;
        if (ta && ta.selectionStart === ta.selectionEnd) {
          e.preventDefault();
          insertAtCursor(e.key, pairs[e.key]);
          return;
        }
      }
    }

    if (!mod) return;

    if (e.key === "b") { e.preventDefault(); wrapSelection("**", "bold text"); }
    else if (e.key === "i") { e.preventDefault(); wrapSelection("*", "italic text"); }
    else if (e.key === "e") { e.preventDefault(); wrapSelection("`", "code"); }
    else if (e.key === "k") { e.preventDefault(); insertAtCursor("[", "](url)", "link text"); }
    else if (e.key === "s" && !e.shiftKey) { e.preventDefault(); try { localStorage.setItem("md-editor-content", content); } catch {} showToast("Saved!"); }
    else if (e.key === "s" && e.shiftKey) { e.preventDefault(); wrapSelection("~~", "strikethrough"); }
    else if (e.key === "h") { e.preventDefault(); setShowFindReplace(p => !p); }
    else if (e.key === "/") { e.preventDefault(); setShowShortcuts(p => !p); }
    else if (e.key === "1") { e.preventDefault(); prefixLine("# "); }
    else if (e.key === "2") { e.preventDefault(); prefixLine("## "); }
    else if (e.key === "3") { e.preventDefault(); prefixLine("### "); }
    else if (e.shiftKey && e.key === "U") { e.preventDefault(); prefixLine("- "); }
    else if (e.shiftKey && e.key === "O") { e.preventDefault(); prefixLine("1. "); }
    else if (e.shiftKey && e.key === "T") { e.preventDefault(); prefixLine("- [ ] "); }
    else if (e.shiftKey && e.key === "Q") { e.preventDefault(); prefixLine("> "); }
    else if (e.shiftKey && e.key === "C") { e.preventDefault(); insertAtCursor("\n```\n", "\n```\n", "code"); }
  }, [content, tabSize, autoClose, insertAtCursor, wrapSelection, prefixLine, showToast]);

  // Drag divider
  const handleDragStart = useCallback(() => { dragging.current = true; }, []);
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const container = document.getElementById("md-split-container");
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPos(Math.min(75, Math.max(25, pct)));
    };
    const handleUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => { window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseup", handleUp); };
  }, []);

  // Drag & drop .md file
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".md") || file.name.endsWith(".txt") || file.name.endsWith(".markdown"))) {
      const reader = new FileReader();
      reader.onload = (ev) => { if (ev.target?.result) { setContent(ev.target.result as string); showToast(`Loaded ${file.name}`); } };
      reader.readAsText(file);
    }
  }, [showToast]);

  // Export functions
  const copyMarkdown = useCallback(async () => {
    try { await navigator.clipboard.writeText(content); showToast("Markdown copied!"); } catch {}
  }, [content, showToast]);

  const copyHtml = useCallback(async () => {
    try { await navigator.clipboard.writeText(renderedHtml); showToast("HTML copied!"); } catch {}
  }, [renderedHtml, showToast]);

  const copyRichText = useCallback(async () => {
    try {
      const blob = new Blob([renderedHtml], { type: "text/html" });
      await navigator.clipboard.write([new ClipboardItem({ "text/html": blob, "text/plain": new Blob([content], { type: "text/plain" }) })]);
      showToast("Rich text copied \u2014 paste into Gmail, Docs, or Notion!");
    } catch { try { await navigator.clipboard.writeText(content); showToast("Copied as plain text (rich text not supported in this browser)"); } catch {} }
  }, [content, renderedHtml, showToast]);

  const downloadMd = useCallback(() => {
    const h1Match = content.match(/^#\s+(.+)/m);
    const filename = h1Match ? h1Match[1].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") + ".md" : "untitled.md";
    const blob = new Blob([content], { type: "text/markdown" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; a.click(); URL.revokeObjectURL(a.href);
    showToast(`Downloaded ${filename}`);
  }, [content, showToast]);

  const downloadHtml = useCallback(() => {
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Document</title><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.6;color:#24292e}h1{border-bottom:1px solid #eaecef;padding-bottom:.3em}h2{border-bottom:1px solid #eaecef;padding-bottom:.3em}pre{background:#f6f8fa;border-radius:6px;padding:16px;overflow-x:auto}code{font-family:'JetBrains Mono',monospace;font-size:85%}table{border-collapse:collapse;width:100%}th,td{border:1px solid #dfe2e5;padding:8px 12px}th{background:#f6f8fa}blockquote{border-left:4px solid #dfe2e5;padding:0 16px;color:#6a737d;margin:16px 0}img{max-width:100%}a{color:#059669}</style></head><body>${renderedHtml}</body></html>`;
    const blob = new Blob([fullHtml], { type: "text/html" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "document.html"; a.click(); URL.revokeObjectURL(a.href);
    showToast("Downloaded document.html");
  }, [renderedHtml, showToast]);

  const openFile = useCallback(() => {
    const input = document.createElement("input"); input.type = "file"; input.accept = ".md,.txt,.markdown";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) { const r = new FileReader(); r.onload = (e) => { if (e.target?.result) { setContent(e.target.result as string); showToast(`Loaded ${file.name}`); } }; r.readAsText(file); }
    };
    input.click();
  }, [showToast]);

  // Generate table markdown
  const tableMarkdown = useMemo(() => {
    if (tableCols === 0 || tableRows === 0) return "";
    const header = "| " + tableCells[0].map(c => c || " ").join(" | ") + " |";
    const sep = "| " + tableAligns.map(a => a === "center" ? ":---:" : a === "right" ? "---:" : "---").join(" | ") + " |";
    const rows = tableCells.slice(1).map(row => "| " + row.map(c => c || " ").join(" | ") + " |").join("\n");
    return header + "\n" + sep + (rows ? "\n" + rows : "");
  }, [tableCells, tableAligns, tableRows, tableCols]);

  const insertTable = useCallback(() => {
    insertAtCursor("\n" + tableMarkdown + "\n");
    setShowTableBuilder(false);
    showToast("Table inserted!");
  }, [tableMarkdown, insertAtCursor, showToast]);

  const updateTableCell = (r: number, c: number, val: string) => {
    setTableCells(prev => { const n = prev.map(row => [...row]); n[r][c] = val; return n; });
  };

  const addTableRow = () => { setTableRows(r => r + 1); setTableCells(p => [...p, Array(tableCols).fill("")]); };
  const addTableCol = () => { setTableCols(c => c + 1); setTableCells(p => p.map(r => [...r, ""])); setTableAligns(p => [...p, "left"]); };
  const deleteTableRow = (idx: number) => { if (tableRows <= 1) return; setTableRows(r => r - 1); setTableCells(p => p.filter((_, i) => i !== idx)); };
  const deleteTableCol = (idx: number) => { if (tableCols <= 1) return; setTableCols(c => c - 1); setTableCells(p => p.map(r => r.filter((_, i) => i !== idx))); setTableAligns(p => p.filter((_, i) => i !== idx)); };

  // Find & Replace
  const findMatches = useMemo(() => {
    if (!findText) return [];
    const flags = findCaseSensitive ? "g" : "gi";
    try {
      const re = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
      const ms: number[] = [];
      let m;
      while ((m = re.exec(content)) !== null) { ms.push(m.index); if (ms.length > 1000) break; }
      return ms;
    } catch { return []; }
  }, [content, findText, findCaseSensitive]);

  const doReplace = useCallback(() => {
    if (!findText) return;
    const flags = findCaseSensitive ? "g" : "gi";
    try {
      const re = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
      setContent(content.replace(re, replaceText));
      showToast("Replaced all matches");
    } catch {}
  }, [content, findText, replaceText, findCaseSensitive, showToast]);

  /* ── theme ── */
  const bg = isDark ? "#1a1a2e" : "#F8F7F5";
  const surface = isDark ? "#1f2937" : "#FFFFFF";
  const border = isDark ? "#374151" : "#E5E7EB";
  const textColor = isDark ? "#F3F4F6" : "#1F2937";
  const textMuted = isDark ? "#9CA3AF" : "#6B7280";
  const accent = "#059669";

  // Button style helper
  const btnStyle = (active = false): React.CSSProperties => ({
    backgroundColor: active ? accent + "20" : "transparent",
    color: active ? accent : textMuted,
    border: `1px solid ${active ? accent + "40" : "transparent"}`,
    borderRadius: "6px",
    padding: "6px 8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "32px",
    minHeight: "32px",
    fontSize: "15px",
    fontWeight: 600,
    transition: "all 0.15s",
  });

  const previewStyles = `
    .md-preview { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; font-size: 16px; color: ${textColor}; }
    .md-preview h1 { font-size: 2em; font-weight: 700; border-bottom: 1px solid ${border}; padding-bottom: 0.3em; margin: 1.5em 0 0.5em; }
    .md-preview h2 { font-size: 1.5em; font-weight: 600; border-bottom: 1px solid ${border}; padding-bottom: 0.3em; margin: 1.3em 0 0.5em; }
    .md-preview h3 { font-size: 1.25em; font-weight: 600; margin: 1.2em 0 0.4em; }
    .md-preview h4 { font-size: 1em; font-weight: 600; margin: 1em 0 0.3em; }
    .md-preview p { margin: 0.8em 0; }
    .md-preview a { color: ${accent}; text-decoration: none; }
    .md-preview a:hover { text-decoration: underline; }
    .md-preview blockquote { border-left: 4px solid ${isDark ? "#4B5563" : "#D1D5DB"}; padding: 0.5em 1em; margin: 1em 0; color: ${textMuted}; background: ${isDark ? "#1f293720" : "#F9FAFB"}; border-radius: 0 8px 8px 0; }
    .md-preview code { font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 85%; background: ${isDark ? "#282A36" : "#f0f0f0"}; padding: 2px 6px; border-radius: 4px; }
    .md-preview pre code { background: none; padding: 0; font-size: 14px; }
    .md-preview table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    .md-preview th, .md-preview td { border: 1px solid ${isDark ? "#4B5563" : "#D1D5DB"}; padding: 8px 12px; text-align: left; }
    .md-preview th { background: ${isDark ? "#374151" : "#F3F4F6"}; font-weight: 600; }
    .md-preview tr:nth-child(even) { background: ${isDark ? "#1f293740" : "#F9FAFB"}; }
    .md-preview img { max-width: 100%; border-radius: 8px; }
    .md-preview hr { border: none; border-top: 2px solid ${border}; margin: 2em 0; }
    .md-preview ul, .md-preview ol { padding-left: 1.5em; }
    .md-preview li { margin: 0.3em 0; }
    .md-preview input[type="checkbox"] { margin-right: 8px; accent-color: ${accent}; }
    .md-preview .task-list-item { list-style: none; margin-left: -1.5em; }
  `;

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: textColor }}>
      <style dangerouslySetInnerHTML={{ __html: previewStyles }} />
      <div style={{ maxWidth: articleMode ? "100%" : "1400px", margin: "0 auto", padding: articleMode ? 0 : "0 16px" }}>
        {/* Header bar */}
        <div className="flex items-center justify-between py-3 px-4" style={{ borderBottom: `1px solid ${border}` }}>
          <div className="flex items-center gap-3">
            {!articleMode && (
              <nav className="flex items-center gap-1 text-sm" style={{ color: textMuted }}>
                <a href="/" className="hover:underline" style={{ color: accent }}>Home</a>
                <span>/</span>
                <span>Writing Tools</span>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* View toggles (desktop) */}
            {!isMobile && (
              <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${border}` }}>
                {(["editor", "split", "preview"] as ViewMode[]).map(vm => (
                  <button key={vm} onClick={() => setViewMode(vm)} title={vm} style={{ ...btnStyle(viewMode === vm), borderRadius: 0, border: "none", padding: "4px 10px", fontSize: "15px" }}>
                    {vm === "editor" ? "\u270F\uFE0F" : vm === "split" ? "\u2B1C" : "\uD83D\uDC41\uFE0F"}
                  </button>
                ))}
              </div>
            )}
            {/* HTML pane toggle */}
            {!isMobile && (
              <button onClick={() => setShowHtmlPane(!showHtmlPane)} title="Toggle HTML" style={btnStyle(showHtmlPane)}>
                {"</>"}
              </button>
            )}
            {/* Dark mode toggle */}
            <button onClick={() => { document.documentElement.classList.toggle("dark"); document.documentElement.classList.toggle("light"); }} title="Toggle theme" style={btnStyle()}>
              {isDark ? "\u2600\uFE0F" : "\uD83C\uDF19"}
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 py-2 px-3 overflow-x-auto" style={{ borderBottom: `1px solid ${border}`, scrollbarWidth: "thin" }}>
          {/* Text formatting */}
          <button onClick={() => wrapSelection("**", "bold text")} title="Bold (Ctrl+B)" style={btnStyle()}><strong>B</strong></button>
          <button onClick={() => wrapSelection("*", "italic text")} title="Italic (Ctrl+I)" style={btnStyle()}><em>I</em></button>
          <button onClick={() => wrapSelection("~~", "strikethrough")} title="Strikethrough" style={btnStyle()}><s>S</s></button>
          <button onClick={() => wrapSelection("`", "code")} title="Inline Code (Ctrl+E)" style={btnStyle()}>&lt;/&gt;</button>

          <span style={{ width: 1, height: 20, backgroundColor: border, margin: "0 4px" }} />

          {/* Headings */}
          <div className="relative">
            <button onClick={() => setShowHeadingMenu(!showHeadingMenu)} title="Heading" style={btnStyle()}>H</button>
            {showHeadingMenu && (
              <div className="absolute top-full left-0 mt-1 rounded-lg shadow-lg border z-50 py-1" style={{ backgroundColor: surface, borderColor: border, minWidth: "160px" }}>
                {[1, 2, 3, 4, 5, 6].map(level => (
                  <button key={level} onClick={() => { prefixLine("#".repeat(level) + " "); setShowHeadingMenu(false); }}
                    className="block w-full text-left px-3 py-1.5 hover:opacity-80" style={{ fontSize: `${20 - level * 2}px`, fontWeight: level <= 2 ? 700 : 600, color: textColor }}>
                    {"#".repeat(level)} Heading {level}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => prefixLine("> ")} title="Blockquote" style={btnStyle()}>&ldquo;</button>
          <div className="relative">
            <button onClick={() => setShowCodeLangMenu(!showCodeLangMenu)} title="Code Block" style={btnStyle()}>{"{}"}</button>
            {showCodeLangMenu && (
              <div className="absolute top-full left-0 mt-1 rounded-lg shadow-lg border z-50 py-1 max-h-[200px] overflow-y-auto" style={{ backgroundColor: surface, borderColor: border, minWidth: "140px" }}>
                {["javascript", "typescript", "python", "html", "css", "bash", "json", "go", "rust", "sql", "yaml", "java", "php", "ruby", "csharp", "diff", ""].map(lang => (
                  <button key={lang} onClick={() => { insertAtCursor(`\n\`\`\`${lang}\n`, "\n```\n", "code here"); setShowCodeLangMenu(false); }}
                    className="block w-full text-left px-3 py-1 hover:opacity-80 text-sm" style={{ color: textColor }}>
                    {lang || "plain text"}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span style={{ width: 1, height: 20, backgroundColor: border, margin: "0 4px" }} />

          {/* Lists */}
          <button onClick={() => prefixLine("- ")} title="Unordered List" style={btnStyle()}>{"\u2022"}</button>
          <button onClick={() => prefixLine("1. ")} title="Ordered List" style={btnStyle()}>1.</button>
          <button onClick={() => prefixLine("- [ ] ")} title="Task List" style={btnStyle()}>{"\u2611"}</button>

          <span style={{ width: 1, height: 20, backgroundColor: border, margin: "0 4px" }} />

          {/* Insert */}
          <button onClick={() => insertAtCursor("[", "](url)", "link text")} title="Link (Ctrl+K)" style={btnStyle()}>{"\uD83D\uDD17"}</button>
          <button onClick={() => insertAtCursor("![", "](image-url)", "alt text")} title="Image" style={btnStyle()}>{"\uD83D\uDDBC\uFE0F"}</button>
          <button onClick={() => setShowTableBuilder(true)} title="Table" style={btnStyle()}>{"\u2B1C"}</button>
          <button onClick={() => insertAtCursor("\n---\n")} title="Horizontal Rule" style={btnStyle()}>&mdash;</button>

          <span style={{ width: 1, height: 20, backgroundColor: border, margin: "0 4px" }} />

          {/* Utility */}
          <button onClick={() => setShowFindReplace(p => !p)} title="Find & Replace (Ctrl+H)" style={btnStyle()}>{"\uD83D\uDD0D"}</button>

          <div className="flex-1" />

          {/* Right side: Templates, Settings, Shortcuts, Export */}
          <div className="relative">
            <button onClick={() => setShowTemplates(!showTemplates)} title="Templates" style={btnStyle()}>Templates</button>
            {showTemplates && (
              <div className="absolute top-full right-0 mt-1 rounded-lg shadow-lg border z-50 py-1" style={{ backgroundColor: surface, borderColor: border, minWidth: "200px" }}>
                {TEMPLATES.map((t, i) => (
                  <button key={i} onClick={() => {
                    if (content && t.content && !confirm("This will replace your current content. Continue?")) return;
                    setContent(t.content); setShowTemplates(false); showToast(`Loaded "${t.name}" template`);
                  }} className="block w-full text-left px-3 py-1.5 hover:opacity-80 text-sm" style={{ color: textColor }}>
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setShowSettings(!showSettings)} title="Settings" style={btnStyle()}>{"\u2699\uFE0F"}</button>
            {showSettings && (
              <div className="absolute top-full right-0 mt-1 rounded-xl shadow-lg border z-50 p-4 space-y-3" style={{ backgroundColor: surface, borderColor: border, minWidth: "240px" }}>
                <div className="text-sm font-semibold mb-2">Settings</div>
                <label className="flex items-center justify-between text-sm"><span>Font size: {fontSize}px</span><input type="range" min={12} max={24} value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-24" /></label>
                <label className="flex items-center justify-between text-sm"><span>Tab size</span><select value={tabSize} onChange={e => setTabSize(+e.target.value)} className="px-2 py-1 rounded border text-sm" style={{ backgroundColor: bg, borderColor: border, color: textColor }}><option value={2}>2 spaces</option><option value={4}>4 spaces</option></select></label>
                <label className="flex items-center justify-between text-sm"><span>Auto-close brackets</span><input type="checkbox" checked={autoClose} onChange={e => setAutoClose(e.target.checked)} /></label>
                <label className="flex items-center justify-between text-sm"><span>Line numbers</span><input type="checkbox" checked={showLineNums} onChange={e => setShowLineNums(e.target.checked)} /></label>
                <label className="flex items-center justify-between text-sm"><span>Word wrap</span><input type="checkbox" checked={wordWrap} onChange={e => setWordWrap(e.target.checked)} /></label>
                <label className="flex items-center justify-between text-sm"><span>Scroll sync</span><input type="checkbox" checked={scrollSync} onChange={e => setScrollSync(e.target.checked)} /></label>
              </div>
            )}
          </div>

          <button onClick={() => setShowShortcuts(!showShortcuts)} title="Keyboard Shortcuts" style={btnStyle()}>?</button>
        </div>

        {/* Find & Replace bar */}
        {showFindReplace && (
          <div className="flex flex-wrap items-center gap-2 px-4 py-2" style={{ borderBottom: `1px solid ${border}`, backgroundColor: isDark ? "#111827" : "#F9FAFB" }}>
            <input type="text" value={findText} onChange={e => setFindText(e.target.value)} placeholder="Find..." className="px-3 py-1.5 rounded-lg border text-sm outline-none" style={{ backgroundColor: surface, borderColor: border, color: textColor, minWidth: "150px" }} />
            <input type="text" value={replaceText} onChange={e => setReplaceText(e.target.value)} placeholder="Replace..." className="px-3 py-1.5 rounded-lg border text-sm outline-none" style={{ backgroundColor: surface, borderColor: border, color: textColor, minWidth: "150px" }} />
            <button onClick={() => setFindCaseSensitive(!findCaseSensitive)} style={btnStyle(findCaseSensitive)} title="Case sensitive">Aa</button>
            <button onClick={doReplace} className="px-3 py-1 rounded-lg font-semibold text-sm" style={{ backgroundColor: accent + "20", color: accent, border: `1px solid ${accent}40` }}>Replace All</button>
            <span style={{ color: textMuted }}>{findMatches.length} match{findMatches.length !== 1 ? "es" : ""}</span>
            <button onClick={() => setShowFindReplace(false)} style={btnStyle()}>{"\u2715"}</button>
          </div>
        )}

        {/* Mobile tabs */}
        {isMobile && (
          <div className="flex" style={{ borderBottom: `1px solid ${border}` }}>
            <button onClick={() => setMobileTab("edit")} className="flex-1 py-2 text-sm font-semibold text-center" style={{ backgroundColor: mobileTab === "edit" ? accent + "15" : "transparent", color: mobileTab === "edit" ? accent : textMuted, borderBottom: mobileTab === "edit" ? `2px solid ${accent}` : "none" }}>Edit</button>
            <button onClick={() => setMobileTab("preview")} className="flex-1 py-2 text-sm font-semibold text-center" style={{ backgroundColor: mobileTab === "preview" ? accent + "15" : "transparent", color: mobileTab === "preview" ? accent : textMuted, borderBottom: mobileTab === "preview" ? `2px solid ${accent}` : "none" }}>Preview</button>
          </div>
        )}

        {/* Main split pane */}
        {defaultHtmlToMd ? (
          /* HTML-to-Markdown mode */
          <div id="md-split-container" className="flex" style={{ height: "calc(100vh - 160px)" }}>
            <div style={{ width: isMobile ? "100%" : `${splitPos}%`, display: isMobile && mobileTab !== "edit" ? "none" : "flex", flexDirection: "column" }}>
              <div className="font-semibold text-sm px-3 py-1" style={{ color: textMuted, borderBottom: `1px solid ${border}` }}>HTML Input</div>
              <textarea
                value={htmlInput}
                onChange={e => setHtmlInput(e.target.value)}
                className="flex-1 w-full resize-none p-4 outline-none"
                style={{ backgroundColor: surface, fontFamily: "'JetBrains Mono', monospace", fontSize: `${fontSize}px`, lineHeight: "1.6", color: textColor, wordWrap: wordWrap ? "break-word" : "normal" }}
                placeholder="Paste your HTML here..."
                spellCheck={false}
              />
            </div>
            {!isMobile && <div className="w-[4px] cursor-col-resize hover:opacity-80" style={{ backgroundColor: border }} onMouseDown={handleDragStart} />}
            <div style={{ width: isMobile ? "100%" : `${100 - splitPos}%`, display: isMobile && mobileTab !== "preview" ? "none" : "flex", flexDirection: "column" }}>
              <div className="font-semibold text-sm px-3 py-1 flex items-center justify-between" style={{ color: textMuted, borderBottom: `1px solid ${border}` }}>
                <span>Markdown Output</span>
                <button onClick={() => { navigator.clipboard.writeText(convertedMd); showToast("Markdown copied!"); }} className="text-sm px-2 py-0.5 rounded" style={{ color: accent }}>Copy</button>
              </div>
              <pre className="flex-1 overflow-auto p-4" style={{ backgroundColor: surface, fontFamily: "'JetBrains Mono', monospace", fontSize: `${fontSize}px`, lineHeight: "1.6", color: textColor, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
                {convertedMd || "Converted Markdown will appear here..."}
              </pre>
            </div>
          </div>
        ) : (
          /* Normal editor mode */
          <div id="md-split-container" className="flex" style={{ height: "calc(100vh - 160px)" }}>
            {/* Editor */}
            {((!isMobile && viewMode !== "preview") || (isMobile && mobileTab === "edit")) && (
              <div style={{ width: isMobile ? "100%" : viewMode === "editor" ? "100%" : `${splitPos}%`, display: "flex", flexDirection: "column" }}
                onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
                <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: surface }}>
                  {/* Line numbers */}
                  {showLineNums && (
                    <div className="select-none text-right pr-2 pt-4 overflow-hidden" style={{ width: "40px", fontFamily: "'JetBrains Mono', monospace", fontSize: `${fontSize}px`, lineHeight: "1.6", color: isDark ? "#4B5563" : "#D1D5DB" }}>
                      {Array.from({ length: lineNumbers }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                  )}
                  <textarea
                    ref={editorRef}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onScroll={handleEditorScroll}
                    onKeyDown={handleKeyDown}
                    className="flex-1 resize-none p-4 outline-none"
                    style={{
                      backgroundColor: "transparent",
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      fontSize: `${fontSize}px`,
                      lineHeight: "1.6",
                      color: textColor,
                      wordWrap: wordWrap ? "break-word" : "normal",
                      overflowWrap: wordWrap ? "break-word" : "normal",
                      whiteSpace: wordWrap ? "pre-wrap" : "pre",
                      caretColor: accent,
                    }}
                    spellCheck={false}
                  />
                </div>
                {/* Stats bar */}
                <div className="flex flex-wrap items-center gap-3 px-3 py-1.5 text-sm" style={{ color: textMuted, borderTop: `1px solid ${border}`, backgroundColor: isDark ? "#111827" : "#F9FAFB" }}>
                  <span>{stats.words} words</span>
                  <span>{stats.chars} chars</span>
                  <span>{stats.lines} lines</span>
                  <span>~{stats.readTime} min read</span>
                  <span className="flex-1" />
                  <a href="/writing-tools/word-counter" className="hover:underline" style={{ color: accent }}>Detailed analysis &rarr;</a>
                </div>
              </div>
            )}

            {/* Divider */}
            {!isMobile && viewMode === "split" && (
              <div className="w-[4px] cursor-col-resize hover:opacity-80 flex-shrink-0" style={{ backgroundColor: border }} onMouseDown={handleDragStart} />
            )}

            {/* Preview */}
            {((!isMobile && viewMode !== "editor") || (isMobile && mobileTab === "preview")) && (
              <div style={{ width: isMobile ? "100%" : viewMode === "preview" ? "100%" : `${100 - splitPos}%`, display: "flex", flexDirection: "column" }}>
                <div ref={previewRef} className="flex-1 overflow-auto p-6 md-preview" style={{ backgroundColor: isDark ? "#0f172a" : "#FFFFFF" }} dangerouslySetInnerHTML={{ __html: renderedHtml }} />
              </div>
            )}

            {/* HTML pane */}
            {showHtmlPane && !isMobile && viewMode !== "editor" && (
              <>
                <div className="w-[4px] flex-shrink-0" style={{ backgroundColor: border }} />
                <div style={{ width: "30%", display: "flex", flexDirection: "column" }}>
                  <div className="font-semibold text-sm px-3 py-1 flex items-center justify-between" style={{ color: textMuted, borderBottom: `1px solid ${border}` }}>
                    <span>HTML Output</span>
                    <button onClick={copyHtml} className="text-sm px-2 py-0.5 rounded" style={{ color: accent }}>Copy</button>
                  </div>
                  <pre className="flex-1 overflow-auto p-4" style={{ backgroundColor: surface, fontFamily: "'JetBrains Mono', monospace", fontSize: "15px", lineHeight: "1.5", color: textMuted, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
                    {renderedHtml}
                  </pre>
                </div>
              </>
            )}
          </div>
        )}

        {/* Export bar */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-3" style={{ borderTop: `1px solid ${border}` }}>
          <button onClick={copyMarkdown} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: accent + "15", color: accent, border: `1px solid ${accent}40` }}>Copy Markdown</button>
          <button onClick={copyHtml} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: accent + "15", color: accent, border: `1px solid ${accent}40` }}>Copy HTML</button>
          <button onClick={copyRichText} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: accent + "15", color: accent, border: `1px solid ${accent}40` }}>Copy as Rich Text</button>
          <button onClick={downloadMd} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: textMuted, border: `1px solid ${border}` }}>Download .md</button>
          <button onClick={downloadHtml} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: textMuted, border: `1px solid ${border}` }}>Download .html</button>
          <button onClick={openFile} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: textMuted, border: `1px solid ${border}` }}>Open File</button>
        </div>
      </div>

      {/* Table Builder Modal */}
      {showTableBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={e => { if (e.target === e.currentTarget) setShowTableBuilder(false); }}>
          <div className="rounded-xl shadow-2xl border max-w-[90vw] max-h-[80vh] overflow-auto p-6" style={{ backgroundColor: surface, borderColor: border, minWidth: "400px" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Visual Table Builder</h3>
              <button onClick={() => setShowTableBuilder(false)} style={btnStyle()}>{"\u2715"}</button>
            </div>
            <div className="overflow-x-auto mb-4">
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "30px" }} />
                    {Array.from({ length: tableCols }, (_, ci) => (
                      <th key={ci} className="text-center" style={{ border: `1px solid ${border}`, padding: "4px 8px" }}>
                        <div className="flex items-center gap-1 justify-center">
                          <button onClick={() => setTableAligns(p => { const n = [...p]; n[ci] = n[ci] === "left" ? "center" : n[ci] === "center" ? "right" : "left"; return n; })}
                            className="text-sm px-1 rounded" style={{ color: accent }}>
                            {tableAligns[ci] === "left" ? "\u2190" : tableAligns[ci] === "center" ? "\u2194" : "\u2192"}
                          </button>
                          {tableCols > 1 && <button onClick={() => deleteTableCol(ci)} className="text-sm text-red-500 hover:text-red-700">{"\u2715"}</button>}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableCells.map((row, ri) => (
                    <tr key={ri}>
                      <td className="text-center">
                        {tableRows > 1 && <button onClick={() => deleteTableRow(ri)} className="text-sm text-red-500 hover:text-red-700">{"\u2715"}</button>}
                      </td>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ border: `1px solid ${border}`, padding: 0 }}>
                          <input type="text" value={cell} onChange={e => updateTableCell(ri, ci, e.target.value)}
                            placeholder={ri === 0 ? `Header ${ci + 1}` : ""} className="w-full px-2 py-1.5 outline-none text-sm"
                            style={{ backgroundColor: "transparent", color: textColor, minWidth: "80px" }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 mb-4">
              <button onClick={addTableRow} className="px-3 py-1 rounded-lg text-sm" style={{ color: accent, border: `1px solid ${accent}40` }}>+ Row</button>
              <button onClick={addTableCol} className="px-3 py-1 rounded-lg text-sm" style={{ color: accent, border: `1px solid ${accent}40` }}>+ Column</button>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-sm mb-1" style={{ color: textMuted }}>Generated Markdown:</div>
              <pre className="p-3 rounded-lg text-sm overflow-x-auto" style={{ backgroundColor: isDark ? "#111827" : "#F3F4F6", fontFamily: "monospace", color: textColor, whiteSpace: "pre-wrap" }}>{tableMarkdown}</pre>
            </div>
            <div className="flex gap-2">
              <button onClick={insertTable} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ backgroundColor: accent, color: "#FFF" }}>Insert Table</button>
              <button onClick={() => { navigator.clipboard.writeText(tableMarkdown); showToast("Table markdown copied!"); }} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ color: accent, border: `1px solid ${accent}40` }}>Copy Markdown</button>
            </div>
          </div>
        </div>
      )}

      {/* Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={e => { if (e.target === e.currentTarget) setShowShortcuts(false); }}>
          <div className="rounded-xl shadow-2xl border max-w-[500px] w-full max-h-[80vh] overflow-auto p-6" style={{ backgroundColor: surface, borderColor: border }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Keyboard Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} style={btnStyle()}>{"\u2715"}</button>
            </div>
            <div className="space-y-1 text-sm">
              {[
                ["Bold", "Ctrl+B"], ["Italic", "Ctrl+I"], ["Strikethrough", "Ctrl+Shift+S"], ["Link", "Ctrl+K"],
                ["Inline Code", "Ctrl+E"], ["Heading 1", "Ctrl+1"], ["Heading 2", "Ctrl+2"], ["Heading 3", "Ctrl+3"],
                ["Unordered List", "Ctrl+Shift+U"], ["Ordered List", "Ctrl+Shift+O"], ["Task List", "Ctrl+Shift+T"],
                ["Blockquote", "Ctrl+Shift+Q"], ["Code Block", "Ctrl+Shift+C"], ["Save", "Ctrl+S"],
                ["Find & Replace", "Ctrl+H"], ["Shortcuts Help", "Ctrl+/"],
              ].map(([action, shortcut]) => (
                <div key={action} className="flex justify-between py-1" style={{ borderBottom: `1px solid ${border}20` }}>
                  <span>{action}</span>
                  <kbd className="px-2 py-0.5 rounded text-sm font-mono" style={{ backgroundColor: isDark ? "#374151" : "#F3F4F6", color: textMuted }}>{shortcut}</kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-semibold" style={{ backgroundColor: accent, color: "#FFF" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
