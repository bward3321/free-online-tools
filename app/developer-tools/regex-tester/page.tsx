import type { Metadata } from "next";
import RegexTester from "./components/RegexTester";

export const metadata: Metadata = {
  title: "Regex Tester — Test Regular Expressions in Real-Time | EveryFreeTool",
  description: "Test, debug, and visualize regular expressions in real-time. Color-coded capture groups, plain-English explainer, replace mode, 30+ common patterns library. 100% client-side.",
  openGraph: { title: "Regex Tester — Real-Time Regular Expression Testing", description: "Test and debug regex patterns with instant match highlighting, explainer, and common patterns library. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function RegexTesterPage() {
  const faqs = [
    { name: "What regex engine does this tool use?", text: "This tool uses JavaScript's built-in RegExp engine, the same engine used in all modern browsers (Chrome, Firefox, Safari, Edge) and Node.js. It supports named capture groups, lookaheads, lookbehinds, and Unicode matching. Some PCRE features (atomic groups, possessive quantifiers) are not available in JavaScript." },
    { name: "How do I test a regex pattern?", text: "Type or paste your regular expression in the pattern input at the top. Then type or paste your test string in the text area below. Matches highlight in real-time as you type — no button needed. Each capture group gets a different color. The match list shows every match with its position and groups." },
    { name: "What are capture groups and how do I use them?", text: "Capture groups are portions of your regex in parentheses (). They capture matched text for references in replacements ($1, $2) or code. Named groups (?<name>...) use names instead of numbers. Non-capturing groups (?:...) group without capturing. Each group gets a unique color in this tool." },
    { name: "Why did my regex freeze the page?", text: "Some patterns cause catastrophic backtracking — the regex engine tries exponentially many paths. Common culprits: (a+)+, (a*)*, (a|aa)+. This tool runs regex in a Web Worker with a 2-second timeout to prevent freezes. If your pattern times out, try restructuring to reduce ambiguity." },
    { name: "What's the difference between global (g) and non-global matching?", text: "Without the g flag, regex finds only the first match. With g, it finds all matches in the string. The g flag is essential for 'find all' tasks. This tool enables global matching by default since it's what most users expect." },
    { name: "How do I use regex for search and replace?", text: "Switch to the Replace tab, enter your replacement string. Use $1, $2 to reference captured groups. For example, (\\w+), (\\w+) with replacement $2 $1 transforms 'Doe, John' into 'John Doe'. Results update in real-time." },
    { name: "Can I use regex from this tool in my code?", text: "Yes. JavaScript regex works the same in browsers and Node.js. For other languages (Python, Java, PHP), most basic patterns are compatible but advanced features may differ. When using in code strings, remember to escape backslashes (\\d becomes \\\\d in a JS string)." },
    { name: "What is the regex explainer?", text: "The explainer breaks down any regex pattern token-by-token into plain English. For example, ^\\d{3}-\\d{4}$ becomes: Start of string → Any digit, exactly 3 times → Literal hyphen → Any digit, exactly 4 times → End of string." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Regex Tester & Debugger",
        url: "https://everyfreetool.com/developer-tools/regex-tester",
        description: "Test, debug, and visualize regular expressions in real-time with match highlighting, explainer, replace mode, and common patterns library.",
        applicationCategory: "DeveloperApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: ["Real-time regex matching", "Capture group highlighting", "Plain-English explainer", "Search and replace", "Common patterns library", "Regex cheat sheet", "Web Worker execution", "Catastrophic backtracking protection"],
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <RegexTester
        title="Regex Tester — Test Regular Expressions in Real-Time"
        subtitle="Test, debug, and visualize regular expressions with instant match highlighting, a plain-English explainer, replace mode, and a searchable library of 30+ common patterns. All processing happens in your browser."
      />
    </>
  );
}
