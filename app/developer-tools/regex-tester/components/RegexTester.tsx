"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";

/* ────────────────────── types ────────────────────── */
interface MatchResult {
  match: string;
  groups: (string | undefined)[];
  index: number;
  length: number;
  namedGroups: Record<string, string> | null;
}
interface WorkerResult {
  matches?: MatchResult[];
  executionTime?: number;
  error?: string;
  message?: string;
}
type Tab = "explainer" | "replace" | "patterns" | "cheatsheet";
interface Props {
  title: string;
  subtitle: string;
  defaultTab?: Tab;
  articleMode?: boolean;
}
interface PatternEntry {
  name: string;
  pattern: string;
  flags: string;
  desc: string;
  sample: string;
  category: string;
  emoji: string;
}
interface ExplainToken {
  token: string;
  desc: string;
  indent: number;
  type: "anchor" | "charclass" | "group" | "quantifier" | "escape" | "alternation" | "dot" | "literal";
}

/* ────────────── colors ────────────── */
const GROUP_BG = [
  "rgba(139,233,253,0.15)",
  "rgba(80,250,123,0.25)",
  "rgba(255,184,108,0.25)",
  "rgba(189,147,249,0.25)",
  "rgba(255,85,85,0.25)",
  "rgba(241,250,140,0.25)",
];
const GROUP_BORDER = ["#8BE9FD", "#50FA7B", "#FFB86C", "#BD93F9", "#FF5555", "#F1FA8C"];

/* ────────────── common patterns library ────────────── */
const PATTERNS: PatternEntry[] = [
  // Email & Contact
  { name: "Email Address", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", flags: "gm", desc: "Standard email validation", category: "Email & Contact", emoji: "\uD83D\uDCE7", sample: "Valid emails:\nuser@example.com\njohn.doe+test@company.co.uk\nadmin@localhost.dev\n\nInvalid emails:\nnot-an-email\n@missing-local.com\nuser@.com\nuser@com" },
  { name: "Phone (US)", pattern: "^(\\+1)?[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$", flags: "gm", desc: "US phone with optional country code", category: "Email & Contact", emoji: "\uD83D\uDCE7", sample: "Valid US phones:\n(555) 123-4567\n555-123-4567\n+1 555 123 4567\n5551234567\n\nInvalid:\n123\n555-12-4567\nabcdefghij" },
  { name: "Phone (International)", pattern: "^\\+?[1-9]\\d{1,14}$", flags: "gm", desc: "E.164 international phone format", category: "Email & Contact", emoji: "\uD83D\uDCE7", sample: "+14155551234\n+442071234567\n+61291234567\n\nInvalid:\n0123456\n+0123456789\nabc" },
  // URLs & Web
  { name: "URL (HTTP/HTTPS)", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)", flags: "g", desc: "Match HTTP/HTTPS URLs", category: "URLs & Web", emoji: "\uD83C\uDF10", sample: "Check these links:\nhttps://example.com\nhttp://www.google.com/search?q=regex\nhttps://sub.domain.co.uk/path/page?key=value#anchor\n\nNot URLs:\nftp://files.example.com\njust plain text\nexample.com (no protocol)" },
  { name: "Domain Name", pattern: "^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$", flags: "gm", desc: "Valid domain names", category: "URLs & Web", emoji: "\uD83C\uDF10", sample: "example.com\nsub.domain.co.uk\nmy-site.org\n\nInvalid:\n-invalid.com\n.com\na\ntest..com" },
  { name: "IPv4 Address", pattern: "^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$", flags: "gm", desc: "Standard IPv4 address", category: "URLs & Web", emoji: "\uD83C\uDF10", sample: "192.168.1.1\n10.0.0.1\n255.255.255.0\n127.0.0.1\n\nInvalid:\n256.1.1.1\n192.168.1\n1.2.3.4.5" },
  { name: "IPv6 Address", pattern: "^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$", flags: "gm", desc: "Full IPv6 address", category: "URLs & Web", emoji: "\uD83C\uDF10", sample: "2001:0db8:85a3:0000:0000:8a2e:0370:7334\nfe80:0000:0000:0000:0000:0000:0000:0001\n\nInvalid:\n2001:db8::1 (abbreviated)\n192.168.1.1" },
  { name: "Slug (URL path)", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", flags: "gm", desc: "URL-safe slug format", category: "URLs & Web", emoji: "\uD83C\uDF10", sample: "hello-world\nmy-blog-post\nregex101\n\nInvalid:\nHello World\nmy_post\n-leading-dash" },
  // Numbers & Math
  { name: "Integer", pattern: "^-?\\d+$", flags: "gm", desc: "Positive or negative whole number", category: "Numbers & Math", emoji: "\uD83D\uDD22", sample: "42\n-7\n0\n1000000\n\nNot integers:\n3.14\n1,000\nabc\n1.0" },
  { name: "Decimal Number", pattern: "^-?\\d*\\.?\\d+$", flags: "gm", desc: "Number with optional decimal", category: "Numbers & Math", emoji: "\uD83D\uDD22", sample: "3.14\n-0.5\n42\n0.001\n\nInvalid:\n1,000\n$50\n1.2.3\nabc" },
  { name: "Currency (USD)", pattern: "^\\$?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$", flags: "gm", desc: "US dollar format ($1,234.56)", category: "Numbers & Math", emoji: "\uD83D\uDD22", sample: "$1,234.56\n$100.00\n999\n$1,000,000.00\n\nInvalid:\n$1234.5\n1,23,456\n$-50" },
  { name: "Percentage", pattern: "^-?\\d+(\\.\\d+)?%$", flags: "gm", desc: "Percentage value", category: "Numbers & Math", emoji: "\uD83D\uDD22", sample: "100%\n50.5%\n-12%\n0.1%\n\nInvalid:\n50\n%50\n50% off" },
  { name: "Hex Number", pattern: "^0x[0-9a-fA-F]+$", flags: "gm", desc: "Hexadecimal number", category: "Numbers & Math", emoji: "\uD83D\uDD22", sample: "0xFF\n0x1A3F\n0x0\n0xDEADBEEF\n\nInvalid:\nFF\n0xGG\n#FF00FF" },
  // Dates & Times
  { name: "Date (YYYY-MM-DD)", pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$", flags: "gm", desc: "ISO 8601 date format", category: "Dates & Times", emoji: "\uD83D\uDCC5", sample: "2026-02-28\n2024-12-31\n2000-01-01\n\nInvalid:\n2026-13-01\n2026-02-30\n26-02-28\n2026/02/28" },
  { name: "Date (MM/DD/YYYY)", pattern: "^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}$", flags: "gm", desc: "US date format", category: "Dates & Times", emoji: "\uD83D\uDCC5", sample: "02/28/2026\n12/31/2024\n01/01/2000\n\nInvalid:\n13/01/2026\n2/28/2026\n02-28-2026" },
  { name: "Time (24h)", pattern: "^([01]\\d|2[0-3]):([0-5]\\d)(:([0-5]\\d))?$", flags: "gm", desc: "24-hour time (HH:MM or HH:MM:SS)", category: "Dates & Times", emoji: "\uD83D\uDCC5", sample: "14:30\n08:00:00\n23:59:59\n00:00\n\nInvalid:\n24:00\n8:30\n14:60" },
  { name: "ISO 8601 Datetime", pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\d{2}:\\d{2})?$", flags: "gm", desc: "Full ISO datetime", category: "Dates & Times", emoji: "\uD83D\uDCC5", sample: "2026-02-28T14:30:00Z\n2026-02-28T14:30:00.123+05:30\n2026-02-28T00:00:00-08:00\n\nInvalid:\n2026-02-28 14:30:00\n2026/02/28T14:30:00" },
  // Validation
  { name: "Password (Strong)", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", flags: "gm", desc: "8+ chars, upper, lower, digit, symbol", category: "Validation", emoji: "\uD83D\uDD10", sample: "P@ssw0rd!\nStr0ng&Safe\nMyP@ss123\n\nWeak passwords:\npassword\n12345678\nNoSymbol1\nno-upper-1!" },
  { name: "Username", pattern: "^[a-zA-Z0-9_-]{3,20}$", flags: "gm", desc: "3-20 chars, letters, numbers, underscores, hyphens", category: "Validation", emoji: "\uD83D\uDD10", sample: "john_doe\nuser-123\nAdmin\ntest_user_2026\n\nInvalid:\nab\nthis_username_is_way_too_long_for_validation\nuser name\nuser@name" },
  { name: "Credit Card", pattern: "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$", flags: "gm", desc: "Visa, Mastercard, Amex", category: "Validation", emoji: "\uD83D\uDD10", sample: "4111111111111111\n5500000000000004\n340000000000009\n\nInvalid:\n1234567890123456\n411111111111111\n0000000000000000" },
  { name: "SSN (US)", pattern: "^\\d{3}-?\\d{2}-?\\d{4}$", flags: "gm", desc: "US Social Security Number format", category: "Validation", emoji: "\uD83D\uDD10", sample: "123-45-6789\n123456789\n000-00-0000\n\nInvalid:\n12-345-6789\n123-4-56789\nabcdefghi" },
  { name: "ZIP Code (US)", pattern: "^\\d{5}(-\\d{4})?$", flags: "gm", desc: "US ZIP code with optional +4", category: "Validation", emoji: "\uD83D\uDD10", sample: "90210\n10001-1234\n00000\n\nInvalid:\n1234\n123456\nABCDE\n12345-12" },
  { name: "Hex Color", pattern: "^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$", flags: "gm", desc: "HEX color code", category: "Validation", emoji: "\uD83D\uDD10", sample: "#FF5733\n#fff\naabb00\n#FF000080\n\nInvalid:\n#GGGGGG\n#12\n#12345\nred" },
  // Text & Strings
  { name: "HTML Tag", pattern: "<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>", flags: "gs", desc: "Match HTML tags with content", category: "Text & Strings", emoji: "\uD83D\uDCDD", sample: '<div class="test">Hello</div>\n<p>Paragraph</p>\n<a href="/">Link text</a>\n<img src="photo.jpg" />\nPlain text without tags' },
  { name: "Whitespace Trim", pattern: "^\\s+|\\s+$", flags: "gm", desc: "Leading and trailing whitespace", category: "Text & Strings", emoji: "\uD83D\uDCDD", sample: "  leading spaces\ntrailing spaces   \n  both sides  \nno extra spaces\n\ttab indented" },
  { name: "Duplicate Words", pattern: "\\b(\\w+)\\s+\\1\\b", flags: "gi", desc: "Find repeated consecutive words", category: "Text & Strings", emoji: "\uD83D\uDCDD", sample: "This is is a test.\nThe the quick brown fox.\nNo duplicates here.\nShe said said hello hello." },
  { name: "Markdown Link", pattern: "\\[([^\\]]+)\\]\\(([^)]+)\\)", flags: "g", desc: "Match [text](url) markdown links", category: "Text & Strings", emoji: "\uD83D\uDCDD", sample: "Click [here](https://example.com) to visit.\nSee the [documentation](https://docs.example.com/guide).\nPlain text without links.\n[Another link](./page)" },
  { name: "Empty Lines", pattern: "^\\s*$", flags: "gm", desc: "Match blank/empty lines", category: "Text & Strings", emoji: "\uD83D\uDCDD", sample: "Line one\n\nLine three\n   \nLine five\n\n\nLine eight" },
  // Code & Dev
  { name: "CSS Hex Color", pattern: "#([0-9a-fA-F]{3}){1,2}\\b", flags: "g", desc: "Match CSS hex colors", category: "Code & Dev", emoji: "\uD83D\uDDA5\uFE0F", sample: "color: #FF5733;\nbackground: #fff;\nborder: 1px solid #aabbcc;\n/* Not a color: #GG1122 */\nopacity: 0.5;" },
  { name: "JSON Key", pattern: '"([^"]+)"\\s*:', flags: "g", desc: "Match JSON object keys", category: "Code & Dev", emoji: "\uD83D\uDDA5\uFE0F", sample: '{\n  "name": "John",\n  "age": 30,\n  "email": "john@example.com",\n  "active": true\n}' },
  { name: "Import Statement", pattern: "import\\s+.*\\s+from\\s+['\"](.+)['\"]", flags: "gm", desc: "ES6 import statements", category: "Code & Dev", emoji: "\uD83D\uDDA5\uFE0F", sample: 'import React from "react";\nimport { useState } from "react";\nimport type { Metadata } from "next";\nconst x = require("old-style");' },
  { name: "TODO Comment", pattern: "\\/\\/\\s*TODO:?\\s*(.*)", flags: "gm", desc: "Match TODO comments", category: "Code & Dev", emoji: "\uD83D\uDDA5\uFE0F", sample: "// TODO: Fix this bug\n// TODO Refactor the auth module\nconst x = 1; // TODO: optimize later\n// This is a normal comment\n// FIXME: also broken" },
  { name: "Semver", pattern: "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$", flags: "gm", desc: "Semantic versioning", category: "Code & Dev", emoji: "\uD83D\uDDA5\uFE0F", sample: "1.0.0\n2.1.3\n0.0.1-alpha\n1.0.0-beta.1+build.123\n\nInvalid:\n1.0\nv1.0.0\n01.0.0\n1.0.0." },
  { name: "File Extension", pattern: "\\.([a-zA-Z0-9]+)$", flags: "gm", desc: "Extract file extension", category: "Code & Dev", emoji: "\uD83D\uDDA5\uFE0F", sample: "document.pdf\nimage.png\nscript.min.js\narchive.tar.gz\nREADME\nno-extension" },
];

/* ────────────── cheat sheet data ────────────── */
const CHEAT = {
  Characters: [
    { p: ".", d: "Any character (except newline)", ex: "a.c", sample: "abc a1c aXc" },
    { p: "\\d", d: "Any digit (0-9)", ex: "\\d{3}", sample: "123 abc 456" },
    { p: "\\D", d: "Any non-digit", ex: "\\D+", sample: "abc 123 def" },
    { p: "\\w", d: "Word character (a-z, A-Z, 0-9, _)", ex: "\\w+", sample: "hello_42 world" },
    { p: "\\W", d: "Non-word character", ex: "\\W", sample: "hello world! @test" },
    { p: "\\s", d: "Whitespace (space, tab, newline)", ex: "\\s+", sample: "hello   world" },
    { p: "\\S", d: "Non-whitespace", ex: "\\S+", sample: "hello world" },
  ],
  Anchors: [
    { p: "^", d: "Start of string/line", ex: "^Hello", sample: "Hello world\nGoodbye" },
    { p: "$", d: "End of string/line", ex: "world$", sample: "Hello world\nGoodbye world" },
    { p: "\\b", d: "Word boundary", ex: "\\bcat\\b", sample: "the cat sat on concatenate" },
    { p: "\\B", d: "Non-word boundary", ex: "\\Bcat\\B", sample: "the cat sat on concatenate" },
  ],
  Quantifiers: [
    { p: "*", d: "Zero or more", ex: "ab*c", sample: "ac abc abbc" },
    { p: "+", d: "One or more", ex: "ab+c", sample: "ac abc abbc" },
    { p: "?", d: "Zero or one (optional)", ex: "colou?r", sample: "color colour" },
    { p: "{n}", d: "Exactly n times", ex: "\\d{3}", sample: "12 123 1234" },
    { p: "{n,}", d: "n or more times", ex: "\\d{2,}", sample: "1 12 123 1234" },
    { p: "{n,m}", d: "Between n and m times", ex: "\\d{2,4}", sample: "1 12 123 1234 12345" },
    { p: "*?, +?", d: "Lazy (as few as possible)", ex: "<.+?>", sample: "<b>bold</b>" },
  ],
  "Groups & References": [
    { p: "(abc)", d: "Capturing group", ex: "(\\w+)@(\\w+)", sample: "user@host" },
    { p: "(?:abc)", d: "Non-capturing group", ex: "(?:ab)+", sample: "ababab" },
    { p: "(?<name>abc)", d: "Named capturing group", ex: "(?<year>\\d{4})", sample: "2026" },
    { p: "\\1, \\2", d: "Back-reference to group", ex: "(\\w+) \\1", sample: "hello hello world world" },
    { p: "(?=abc)", d: "Positive lookahead", ex: "\\d+(?= dollars)", sample: "100 dollars 50 euros" },
    { p: "(?!abc)", d: "Negative lookahead", ex: "\\d+(?! dollars)", sample: "100 dollars 50 euros" },
    { p: "(?<=abc)", d: "Positive lookbehind", ex: "(?<=\\$)\\d+", sample: "$100 100" },
    { p: "(?<!abc)", d: "Negative lookbehind", ex: "(?<!\\$)\\d+", sample: "$100 200" },
  ],
  "Character Classes": [
    { p: "[abc]", d: "Match a, b, or c", ex: "[aeiou]", sample: "hello world" },
    { p: "[^abc]", d: "Match anything except a, b, c", ex: "[^aeiou]", sample: "hello" },
    { p: "[a-z]", d: "Match any lowercase letter", ex: "[a-z]+", sample: "Hello World" },
    { p: "[A-Z]", d: "Match any uppercase letter", ex: "[A-Z]+", sample: "Hello World" },
    { p: "[0-9]", d: "Match any digit", ex: "[0-9]+", sample: "abc 123 def" },
    { p: "[a-zA-Z0-9]", d: "Match any alphanumeric", ex: "[a-zA-Z0-9]+", sample: "hello-world_123!" },
  ],
  Flags: [
    { p: "g", d: "Global \u2014 find all matches", ex: "", sample: "" },
    { p: "i", d: "Case insensitive", ex: "", sample: "" },
    { p: "m", d: "Multiline \u2014 ^ and $ match line boundaries", ex: "", sample: "" },
    { p: "s", d: "DotAll \u2014 . matches newlines", ex: "", sample: "" },
    { p: "u", d: "Unicode support", ex: "", sample: "" },
    { p: "y", d: "Sticky \u2014 match from lastIndex", ex: "", sample: "" },
  ],
};

/* ────────────── regex explainer ────────────── */
function explainRegex(pattern: string): ExplainToken[] {
  const tokens: ExplainToken[] = [];
  let i = 0;
  let depth = 0;
  let groupNum = 0;

  while (i < pattern.length) {
    const ch = pattern[i];
    if (ch === "^") { tokens.push({ token: "^", desc: "Start of string (or line in multiline mode)", indent: depth, type: "anchor" }); i++; }
    else if (ch === "$") { tokens.push({ token: "$", desc: "End of string (or line in multiline mode)", indent: depth, type: "anchor" }); i++; }
    else if (ch === ".") { tokens.push({ token: ".", desc: "Match any character (except newline, unless s flag)", indent: depth, type: "dot" }); i++; }
    else if (ch === "|") { tokens.push({ token: "|", desc: "OR \u2014 match either the expression before or after", indent: depth, type: "alternation" }); i++; }
    else if (ch === "[") {
      let end = i + 1;
      if (end < pattern.length && pattern[end] === "^") end++;
      if (end < pattern.length && pattern[end] === "]") end++;
      while (end < pattern.length && pattern[end] !== "]") { if (pattern[end] === "\\") end++; end++; }
      const cls = pattern.slice(i, end + 1);
      const neg = pattern[i + 1] === "^";
      tokens.push({ token: cls, desc: `Match ${neg ? "any character NOT in" : "one of"}: ${cls}`, indent: depth, type: "charclass" });
      i = end + 1;
    }
    else if (ch === "(") {
      if (pattern.slice(i, i + 3) === "(?:") { tokens.push({ token: "(?:", desc: "Start of non-capturing group", indent: depth, type: "group" }); i += 3; }
      else if (pattern.slice(i, i + 3) === "(?=" ) { tokens.push({ token: "(?=", desc: "Start of positive lookahead", indent: depth, type: "group" }); i += 3; }
      else if (pattern.slice(i, i + 3) === "(?!") { tokens.push({ token: "(?!", desc: "Start of negative lookahead", indent: depth, type: "group" }); i += 3; }
      else if (pattern.slice(i, i + 4) === "(?<=") { tokens.push({ token: "(?<=", desc: "Start of positive lookbehind", indent: depth, type: "group" }); i += 4; }
      else if (pattern.slice(i, i + 4) === "(?<!") { tokens.push({ token: "(?<!", desc: "Start of negative lookbehind", indent: depth, type: "group" }); i += 4; }
      else if (pattern[i + 1] === "?" && pattern[i + 2] === "<" && pattern[i + 3] !== "=" && pattern[i + 3] !== "!") {
        const ne = pattern.indexOf(">", i + 3);
        const nm = pattern.slice(i + 3, ne);
        groupNum++;
        tokens.push({ token: pattern.slice(i, ne + 1), desc: `Start of named group "${nm}" (group ${groupNum})`, indent: depth, type: "group" });
        i = ne + 1;
      } else { groupNum++; tokens.push({ token: "(", desc: `Start of capturing group ${groupNum}`, indent: depth, type: "group" }); i++; }
      depth++;
    }
    else if (ch === ")") { depth = Math.max(0, depth - 1); tokens.push({ token: ")", desc: "End of group", indent: depth, type: "group" }); i++; }
    else if (ch === "+" || ch === "*" || ch === "?") {
      // Check for lazy modifier
      if (ch === "?" && i > 0 && (pattern[i - 1] === "+" || pattern[i - 1] === "*" || pattern[i - 1] === "}" || pattern[i - 1] === "?")) {
        // This is already handled
        tokens.push({ token: "?", desc: "Lazy modifier (match as few as possible)", indent: depth, type: "quantifier" }); i++;
      } else {
        const lazy = pattern[i + 1] === "?";
        const t = lazy ? ch + "?" : ch;
        const descMap: Record<string, string> = { "+": "One or more times", "*": "Zero or more times", "?": "Optional (zero or one)" };
        tokens.push({ token: t, desc: `${descMap[ch]}${lazy ? " (lazy)" : ""}`, indent: depth, type: "quantifier" });
        i += lazy ? 2 : 1;
      }
    }
    else if (ch === "{") {
      const end = pattern.indexOf("}", i);
      if (end === -1) { tokens.push({ token: ch, desc: `Match literal "${ch}"`, indent: depth, type: "literal" }); i++; continue; }
      const q = pattern.slice(i, end + 1);
      const inner = q.slice(1, -1);
      const lazy = pattern[end + 1] === "?";
      let desc: string;
      if (inner.includes(",")) {
        const [min, max] = inner.split(",");
        desc = max.trim() === "" ? `${min} or more times` : `Between ${min} and ${max.trim()} times`;
      } else { desc = `Exactly ${inner} times`; }
      tokens.push({ token: lazy ? q + "?" : q, desc: desc + (lazy ? " (lazy)" : ""), indent: depth, type: "quantifier" });
      i = end + 1 + (lazy ? 1 : 0);
    }
    else if (ch === "\\") {
      const nx = pattern[i + 1];
      if (!nx) { tokens.push({ token: "\\", desc: "Trailing backslash", indent: depth, type: "literal" }); i++; continue; }
      const escMap: Record<string, string> = {
        d: "Match any digit (0-9)", D: "Match any non-digit", w: "Match any word character (letter, digit, _)",
        W: "Match any non-word character", s: "Match any whitespace", S: "Match any non-whitespace",
        b: "Word boundary", B: "Non-word boundary", n: "Match newline", t: "Match tab", r: "Match carriage return",
        "0": "Match null character",
      };
      tokens.push({ token: `\\${nx}`, desc: escMap[nx] || `Match literal "${nx}" (escaped)`, indent: depth, type: "escape" });
      i += 2;
    }
    else { tokens.push({ token: ch, desc: `Match literal "${ch}"`, indent: depth, type: "literal" }); i++; }
  }
  return tokens;
}

/* ────────────── syntax-highlight regex in input ────────────── */
function syntaxHighlight(pattern: string): string {
  let out = "";
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (ch === "[") {
      let end = i + 1;
      if (end < pattern.length && pattern[end] === "^") end++;
      if (end < pattern.length && pattern[end] === "]") end++;
      while (end < pattern.length && pattern[end] !== "]") { if (pattern[end] === "\\") end++; end++; }
      out += `<span style="color:#8BE9FD">${esc(pattern.slice(i, end + 1))}</span>`;
      i = end + 1;
    } else if (ch === "(" || ch === ")") {
      out += `<span style="color:#50FA7B">${esc(ch)}</span>`;
      i++;
      // Check for non-capturing / lookahead markers
      if (ch === "(" && i < pattern.length && pattern[i] === "?") {
        let extra = "?";
        i++;
        if (i < pattern.length && (pattern[i] === ":" || pattern[i] === "=" || pattern[i] === "!")) { extra += pattern[i]; i++; }
        else if (i < pattern.length && pattern[i] === "<") {
          extra += "<"; i++;
          if (i < pattern.length && (pattern[i] === "=" || pattern[i] === "!")) { extra += pattern[i]; i++; }
          else {
            while (i < pattern.length && pattern[i] !== ">") { extra += pattern[i]; i++; }
            if (i < pattern.length) { extra += ">"; i++; }
          }
        }
        out += `<span style="color:#50FA7B">${esc(extra)}</span>`;
      }
    } else if (ch === "+" || ch === "*" || ch === "?" || ch === "{") {
      if (ch === "{") {
        const end = pattern.indexOf("}", i);
        if (end !== -1) {
          let q = pattern.slice(i, end + 1);
          if (pattern[end + 1] === "?") { q += "?"; out += `<span style="color:#FFB86C">${esc(q)}</span>`; i = end + 2; }
          else { out += `<span style="color:#FFB86C">${esc(q)}</span>`; i = end + 1; }
        } else { out += esc(ch); i++; }
      } else {
        let q = ch;
        if (ch !== "?" && pattern[i + 1] === "?") { q += "?"; }
        out += `<span style="color:#FFB86C">${esc(q)}</span>`;
        i += q.length;
      }
    } else if (ch === "^" || ch === "$") {
      out += `<span style="color:#BD93F9">${esc(ch)}</span>`;
      i++;
    } else if (ch === "\\") {
      const nx = pattern[i + 1] || "";
      out += `<span style="color:#F1FA8C">${esc("\\" + nx)}</span>`;
      i += 2;
    } else if (ch === "|") {
      out += `<span style="color:#FF5555">${esc(ch)}</span>`;
      i++;
    } else if (ch === ".") {
      out += `<span style="color:#8BE9FD">${esc(ch)}</span>`;
      i++;
    } else {
      out += esc(ch);
      i++;
    }
  }
  return out;
}

/* ────────────── escape HTML ────────────── */
function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* ────────────── highlight matches in test string ────────────── */
function buildHighlightHtml(text: string, matches: MatchResult[]): string {
  if (!matches.length) return escHtml(text);
  const sorted = [...matches].sort((a, b) => a.index - b.index);
  const parts: string[] = [];
  let last = 0;
  for (const m of sorted) {
    if (m.index < last) continue; // skip overlapping
    if (m.index > last) parts.push(escHtml(text.slice(last, m.index)));
    parts.push(`<mark style="background:${GROUP_BG[0]};border-bottom:2px solid ${GROUP_BORDER[0]};border-radius:2px;padding:0 1px">${escHtml(m.match)}</mark>`);
    last = m.index + m.length;
  }
  if (last < text.length) parts.push(escHtml(text.slice(last)));
  return parts.join("");
}

/* ────────────── COMPONENT ────────────── */
export default function RegexTester({ title, subtitle, defaultTab = "explainer", articleMode = false }: Props) {
  const [pattern, setPattern] = useState("(\\w+)\\s(\\w+)");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false, u: false, y: false });
  const [testStr, setTestStr] = useState("Hello World Foo Bar\nJane Doe\nRegex Testing 2026");
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [execTime, setExecTime] = useState(0);
  const [error, setError] = useState("");
  const [timeout, setTimeout_] = useState(false);
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [replaceWith, setReplaceWith] = useState("");
  const [replaceResult, setReplaceResult] = useState("");
  const [patternSearch, setPatternSearch] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [showReplaceRef, setShowReplaceRef] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const testRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Dark mode detection
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(!html.classList.contains("light"));
    const obs = new MutationObserver(() => setIsDark(!html.classList.contains("light")));
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Flag string
  const flagStr = useMemo(() => Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join(""), [flags]);

  // Check pattern validity
  const patternValid = useMemo(() => {
    try { new RegExp(pattern, flagStr); return true; } catch { return false; }
  }, [pattern, flagStr]);

  const patternError = useMemo(() => {
    try { new RegExp(pattern, flagStr); return ""; } catch (e) {
      const msg = (e as Error).message;
      if (msg.includes("Unterminated group")) return "You have an opening ( without a closing )";
      if (msg.includes("Nothing to repeat")) return "A quantifier (+, *, ?) needs something before it to repeat";
      if (msg.includes("Invalid escape")) return "The escape sequence is not recognized";
      if (msg.includes("Unterminated character class")) return "You have an opening [ without a closing ]";
      return msg.replace(/^Invalid regular expression: \/.*\/: /, "");
    }
  }, [pattern, flagStr]);

  // Run regex in Web Worker
  const runRegex = useCallback(() => {
    if (!pattern || !testStr || !patternValid) { setMatches([]); setExecTime(0); setError(""); setTimeout_(false); return; }

    // Terminate previous worker
    if (workerRef.current) { workerRef.current.terminate(); }
    if (timerRef.current) { clearTimeout(timerRef.current); }

    const code = `self.onmessage=function(e){var d=e.data;try{var r=new RegExp(d.pattern,d.flags);var ms=[];var m;var it=0;var mx=100000;var st=Date.now();var to=2000;if(d.flags.indexOf("g")>=0){while((m=r.exec(d.text))!==null&&it<mx){if(Date.now()-st>to){self.postMessage({error:"timeout",message:"Pattern execution timed out."});return}ms.push({match:m[0],groups:Array.prototype.slice.call(m,1),index:m.index,length:m[0].length,namedGroups:m.groups||null});if(m[0].length===0){r.lastIndex++}if(r.lastIndex>d.text.length)break;it++}}else{m=r.exec(d.text);if(m){ms.push({match:m[0],groups:Array.prototype.slice.call(m,1),index:m.index,length:m[0].length,namedGroups:m.groups||null})}}self.postMessage({matches:ms,executionTime:Date.now()-st})}catch(err){self.postMessage({error:"invalid",message:err.message})}}`;
    const blob = new Blob([code], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    workerRef.current = worker;

    timerRef.current = globalThis.setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(url);
      setMatches([]);
      setError("");
      setTimeout_(true);
      setExecTime(0);
    }, 2500);

    worker.onmessage = (e: MessageEvent<WorkerResult>) => {
      clearTimeout(timerRef.current);
      worker.terminate();
      URL.revokeObjectURL(url);
      workerRef.current = null;
      const d = e.data;
      if (d.error === "timeout") { setTimeout_(true); setMatches([]); setExecTime(0); setError(""); }
      else if (d.error) { setError(d.message || ""); setMatches([]); setExecTime(0); setTimeout_(false); }
      else { setMatches(d.matches || []); setExecTime(d.executionTime || 0); setError(""); setTimeout_(false); }
    };
    worker.onerror = () => {
      clearTimeout(timerRef.current);
      worker.terminate();
      URL.revokeObjectURL(url);
      workerRef.current = null;
    };
    worker.postMessage({ pattern, flags: flagStr, text: testStr });
  }, [pattern, flagStr, testStr, patternValid]);

  // Debounced regex execution
  useEffect(() => {
    const t = globalThis.setTimeout(runRegex, 150);
    return () => clearTimeout(t);
  }, [runRegex]);

  // Replace logic
  useEffect(() => {
    if (!patternValid || !pattern) { setReplaceResult(""); return; }
    try {
      const re = new RegExp(pattern, flagStr);
      setReplaceResult(testStr.replace(re, replaceWith));
    } catch { setReplaceResult(""); }
  }, [pattern, flagStr, testStr, replaceWith, patternValid]);

  // Sync scroll
  const handleTestScroll = () => {
    if (testRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = testRef.current.scrollTop;
      overlayRef.current.scrollLeft = testRef.current.scrollLeft;
    }
  };

  // Num capture groups
  const numGroups = useMemo(() => {
    try { return new RegExp(pattern, flagStr).exec("")?.length ?? 1; } catch { return 1; }
  }, [pattern, flagStr]);
  const groupCount = useMemo(() => {
    if (!matches.length) return 0;
    return matches[0].groups.length;
  }, [matches]);

  // Explain
  const explanations = useMemo(() => explainRegex(pattern), [pattern]);

  // Filtered patterns
  const filteredPatterns = useMemo(() => {
    if (!patternSearch) return PATTERNS;
    const q = patternSearch.toLowerCase();
    return PATTERNS.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [patternSearch]);

  // Pattern categories
  const patternCategories = useMemo(() => {
    const cats: Record<string, PatternEntry[]> = {};
    for (const p of filteredPatterns) { (cats[p.category] ??= []).push(p); }
    return cats;
  }, [filteredPatterns]);

  const toggleFlag = (f: string) => setFlags(prev => ({ ...prev, [f]: !prev[f as keyof typeof prev] }));

  const loadPattern = (p: PatternEntry) => {
    setPattern(p.pattern);
    setTestStr(p.sample);
    const newFlags = { g: false, i: false, m: false, s: false, u: false, y: false };
    for (const c of p.flags) { if (c in newFlags) (newFlags as Record<string, boolean>)[c] = true; }
    setFlags(newFlags);
    setTab("explainer");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadCheat = (ex: string, sample: string) => {
    if (!ex) return;
    setPattern(ex);
    setTestStr(sample);
    setFlags({ g: true, i: false, m: false, s: false, u: false, y: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text); } catch {} };

  // Replace count
  const replaceCount = useMemo(() => {
    if (!patternValid || !pattern || !replaceWith && replaceWith !== "") return 0;
    return matches.length;
  }, [matches, patternValid, pattern, replaceWith]);

  /* ── token type color ── */
  const tokenColor = (type: ExplainToken["type"]) => {
    switch (type) {
      case "anchor": return "#BD93F9";
      case "charclass": return "#8BE9FD";
      case "group": return "#50FA7B";
      case "quantifier": return "#FFB86C";
      case "escape": return "#F1FA8C";
      case "alternation": return "#FF5555";
      case "dot": return "#8BE9FD";
      default: return isDark ? "#F8F8F2" : "#333";
    }
  };

  /* ── theme vars ── */
  const bg = isDark ? "#1E1E2E" : "#FFFFFF";
  const surface = isDark ? "#282A36" : "#F5F5F5";
  const surfaceAlt = isDark ? "#2D2F3E" : "#EAEAEA";
  const text = isDark ? "#F8F8F2" : "#1a1a2e";
  const textMuted = isDark ? "#9CA3AF" : "#6B7280";
  const border = isDark ? "#3B3D50" : "#D4D4D4";
  const accent = "#8BE9FD";

  const flagDescs: Record<string, string> = { g: "Global \u2014 find all matches", i: "Case insensitive", m: "Multiline \u2014 ^ and $ match line boundaries", s: "DotAll \u2014 . matches newlines", u: "Unicode support", y: "Sticky \u2014 match from lastIndex" };

  const tabs: { key: Tab; label: string }[] = [
    { key: "explainer", label: "Explainer" },
    { key: "replace", label: "Replace" },
    { key: "patterns", label: "Common Patterns" },
    { key: "cheatsheet", label: "Cheat Sheet" },
  ];

  const monoFont = '"JetBrains Mono","Fira Code","Cascadia Code","Consolas","Monaco",monospace';

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: text }}>
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        {/* breadcrumb */}
        {!articleMode && (
          <nav className="flex items-center gap-1 text-xs mb-4" style={{ color: textMuted }}>
            <a href="/" className="hover:underline" style={{ color: accent }}>Home</a>
            <span>/</span>
            <span>Developer Tools</span>
          </nav>
        )}

        {!articleMode && (
          <>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-lg mb-8" style={{ color: textMuted }}>{subtitle}</p>
          </>
        )}

        {/* ── REGEX INPUT ── */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" style={{ color: textMuted }}>Regular Expression</label>
          <div className="relative rounded-xl border overflow-hidden" style={{ borderColor: error || patternError ? "#FF5555" : patternValid && pattern ? "#50FA7B40" : border, backgroundColor: surface }}>
            <div className="flex items-center">
              <span className="pl-4 text-lg select-none" style={{ color: textMuted, fontFamily: monoFont }}>/</span>
              <div className="relative flex-1 min-h-[48px]">
                {/* Highlight overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none whitespace-pre px-2 py-3 overflow-hidden"
                  style={{ fontFamily: monoFont, fontSize: "18px", lineHeight: "1.5", color: "transparent" }}
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(pattern) }}
                />
                {/* Actual input */}
                <textarea
                  value={pattern}
                  onChange={e => setPattern(e.target.value)}
                  rows={1}
                  className="w-full bg-transparent resize-none px-2 py-3 outline-none"
                  style={{ fontFamily: monoFont, fontSize: "18px", lineHeight: "1.5", color: isDark ? "#F8F8F220" : "#33333320", caretColor: text }}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </div>
              <span className="pr-4 text-lg select-none" style={{ color: textMuted, fontFamily: monoFont }}>/{flagStr}</span>
            </div>
          </div>

          {/* Validation */}
          <div className="flex items-center justify-between mt-2 min-h-[24px]">
            <div className="flex flex-wrap gap-2">
              {Object.keys(flags).map(f => (
                <button
                  key={f}
                  onClick={() => toggleFlag(f)}
                  title={flagDescs[f]}
                  className="px-3 py-1 rounded-full text-sm font-bold transition-colors"
                  style={{
                    fontFamily: monoFont,
                    backgroundColor: (flags as Record<string, boolean>)[f] ? accent + "30" : "transparent",
                    color: (flags as Record<string, boolean>)[f] ? accent : textMuted,
                    border: `1px solid ${(flags as Record<string, boolean>)[f] ? accent + "60" : border}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            {pattern && (
              <span className="text-xs font-medium" style={{ color: patternError ? "#FF5555" : "#50FA7B" }}>
                {patternError ? `\u274C ${patternError}` : "\u2705 Valid pattern"}
              </span>
            )}
          </div>
        </div>

        {/* ── TEST STRING ── */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" style={{ color: textMuted }}>Test String</label>
          <div className="relative rounded-xl border overflow-hidden" style={{ borderColor: border, backgroundColor: surface }}>
            {/* Highlight overlay */}
            <div
              ref={overlayRef}
              aria-hidden
              className="absolute inset-0 pointer-events-none whitespace-pre-wrap overflow-hidden p-4"
              style={{ fontFamily: monoFont, fontSize: "15px", lineHeight: "1.6", color: "transparent", wordBreak: "break-word" }}
              dangerouslySetInnerHTML={{ __html: buildHighlightHtml(testStr, matches) }}
            />
            {/* Textarea */}
            <textarea
              ref={testRef}
              value={testStr}
              onChange={e => setTestStr(e.target.value)}
              onScroll={handleTestScroll}
              className="relative w-full bg-transparent resize-y p-4 outline-none"
              style={{ fontFamily: monoFont, fontSize: "15px", lineHeight: "1.6", minHeight: "200px", color: isDark ? "#F8F8F240" : "#33333340", caretColor: text, wordBreak: "break-word" }}
              placeholder="Type or paste your test string here..."
              spellCheck={false}
            />
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-4 mt-2 text-xs" style={{ color: textMuted }}>
            {timeout ? (
              <span style={{ color: "#FFB86C" }}>{"\u26A0\uFE0F"} Pattern timed out after 2s. May indicate catastrophic backtracking.</span>
            ) : (
              <>
                <span style={{ color: matches.length ? "#50FA7B" : textMuted }}>
                  {matches.length ? `\u2705 ${matches.length} match${matches.length !== 1 ? "es" : ""} found` : "No matches"}
                </span>
                {groupCount > 0 && <span>{groupCount} capture group{groupCount !== 1 ? "s" : ""}</span>}
                {execTime > 0 && <span>Execution: {execTime < 1 ? "<1" : execTime}ms</span>}
                {execTime > 100 && <span style={{ color: "#FFB86C" }}>{"\u26A0\uFE0F"} Slow pattern</span>}
              </>
            )}
          </div>
        </div>

        {/* ── MATCH RESULTS ── */}
        {matches.length > 0 && (
          <div className="mb-6 rounded-xl border overflow-hidden" style={{ borderColor: border, backgroundColor: surface }}>
            <div className="p-3 text-sm font-semibold" style={{ borderBottom: `1px solid ${border}`, color: textMuted }}>
              Match Results
            </div>
            <div className="max-h-[300px] overflow-y-auto p-3 space-y-2" style={{ fontSize: "14px", fontFamily: monoFont }}>
              {matches.slice(0, 200).map((m, idx) => (
                <div key={idx} className="p-2 rounded-lg" style={{ backgroundColor: surfaceAlt }}>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-xs" style={{ color: accent }}>Match {idx + 1}</span>
                    <span style={{ color: textMuted, fontSize: "12px" }}>(index {m.index}&ndash;{m.index + m.length})</span>
                    <span className="px-2 py-0.5 rounded" style={{ backgroundColor: GROUP_BG[0], color: GROUP_BORDER[0], fontSize: "13px" }}>
                      &quot;{m.match}&quot;
                    </span>
                  </div>
                  {m.groups.length > 0 && m.groups.some(g => g !== undefined) && (
                    <div className="mt-1 pl-4 space-y-0.5">
                      {m.groups.map((g, gi) => g !== undefined && (
                        <div key={gi} className="flex items-baseline gap-2">
                          <span style={{ color: GROUP_BORDER[(gi + 1) % GROUP_BORDER.length], fontSize: "12px" }}>
                            {m.namedGroups && Object.entries(m.namedGroups).find(([, v]) => v === g)?.[0]
                              ? `Group "${Object.entries(m.namedGroups).find(([, v]) => v === g)![0]}"`
                              : `Group ${gi + 1}`}:
                          </span>
                          <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: GROUP_BG[(gi + 1) % GROUP_BG.length], fontSize: "13px" }}>
                            &quot;{g}&quot;
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {matches.length > 200 && (
                <p className="text-center text-xs" style={{ color: textMuted }}>Showing first 200 of {matches.length} matches</p>
              )}
            </div>
          </div>
        )}

        {/* ── TABS ── */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "thin" }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors"
              style={{
                backgroundColor: tab === t.key ? accent + "25" : "transparent",
                color: tab === t.key ? accent : textMuted,
                border: `1px solid ${tab === t.key ? accent + "50" : border}`,
                fontSize: "15px",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: EXPLAINER ── */}
        {tab === "explainer" && (
          <div className="rounded-xl border p-4 md:p-6 mb-8" style={{ borderColor: border, backgroundColor: surface }}>
            <h2 className="text-xl font-bold mb-4">Plain-English Breakdown</h2>
            {!pattern ? (
              <p style={{ color: textMuted }}>Enter a regex pattern above to see its explanation.</p>
            ) : (
              <div className="space-y-1" style={{ fontFamily: monoFont, fontSize: "14px" }}>
                {explanations.map((tok, idx) => (
                  <div key={idx} className="flex gap-4" style={{ paddingLeft: `${tok.indent * 20}px` }}>
                    <span className="shrink-0 font-bold" style={{ color: tokenColor(tok.type), minWidth: "clamp(80px, 20vw, 200px)" }}>
                      {tok.token}
                    </span>
                    <span style={{ color: textMuted, fontSize: "14px" }}>{tok.desc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: REPLACE ── */}
        {tab === "replace" && (
          <div className="rounded-xl border p-4 md:p-6 mb-8" style={{ borderColor: border, backgroundColor: surface }}>
            <h2 className="text-xl font-bold mb-4">Search & Replace</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1" style={{ color: textMuted }}>Replace with</label>
              <input
                type="text"
                value={replaceWith}
                onChange={e => setReplaceWith(e.target.value)}
                placeholder="$1, $2, $&, $<name>..."
                className="w-full p-3 rounded-lg border outline-none"
                style={{ backgroundColor: surfaceAlt, borderColor: border, fontFamily: monoFont, fontSize: "15px", color: text }}
              />
              <button
                onClick={() => setShowReplaceRef(!showReplaceRef)}
                className="text-xs mt-1 hover:underline"
                style={{ color: accent }}
              >
                {showReplaceRef ? "Hide reference" : "Show replacement reference"}
              </button>
              {showReplaceRef && (
                <div className="mt-2 p-3 rounded-lg text-xs space-y-1" style={{ backgroundColor: surfaceAlt, fontFamily: monoFont, color: textMuted }}>
                  <div><span style={{ color: accent }}>$1, $2...</span> &mdash; Captured group by number</div>
                  <div><span style={{ color: accent }}>{"$<name>"}</span> &mdash; Captured group by name</div>
                  <div><span style={{ color: accent }}>$&</span> &mdash; Entire match</div>
                  <div><span style={{ color: accent }}>$`</span> &mdash; Text before match</div>
                  <div><span style={{ color: accent }}>{"$'"}</span> &mdash; Text after match</div>
                  <div><span style={{ color: accent }}>$$</span> &mdash; Literal dollar sign</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: textMuted }}>&mdash; Original &mdash;</div>
                <div className="p-3 rounded-lg whitespace-pre-wrap" style={{ backgroundColor: surfaceAlt, fontFamily: monoFont, fontSize: "14px", minHeight: "100px", wordBreak: "break-word" }}>
                  {testStr}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold mb-1" style={{ color: textMuted }}>&mdash; Result &mdash;</div>
                <div className="p-3 rounded-lg whitespace-pre-wrap" style={{ backgroundColor: surfaceAlt, fontFamily: monoFont, fontSize: "14px", minHeight: "100px", wordBreak: "break-word" }}>
                  {replaceResult}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs" style={{ color: textMuted }}>
                {patternValid && matches.length > 0 ? `${matches.length} replacement${matches.length !== 1 ? "s" : ""} made` : "No replacements"}
              </span>
              <button
                onClick={() => copy(replaceResult)}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                style={{ backgroundColor: accent + "20", color: accent, border: `1px solid ${accent}40` }}
              >
                Copy Result
              </button>
            </div>
          </div>
        )}

        {/* ── TAB: COMMON PATTERNS ── */}
        {tab === "patterns" && (
          <div className="rounded-xl border p-4 md:p-6 mb-8" style={{ borderColor: border, backgroundColor: surface }}>
            <h2 className="text-xl font-bold mb-4">Common Regex Patterns</h2>
            <input
              type="text"
              value={patternSearch}
              onChange={e => setPatternSearch(e.target.value)}
              placeholder="Search patterns (email, phone, URL, date...)"
              className="w-full p-3 rounded-lg border outline-none mb-6"
              style={{ backgroundColor: surfaceAlt, borderColor: border, fontSize: "15px", color: text }}
            />
            <div className="space-y-8">
              {Object.entries(patternCategories).map(([cat, pats]) => (
                <div key={cat}>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: accent }}>{pats[0].emoji} {cat}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pats.map((p, idx) => (
                      <div key={idx} className="p-4 rounded-lg border" style={{ borderColor: border, backgroundColor: surfaceAlt }}>
                        <div className="font-semibold mb-1" style={{ fontSize: "15px" }}>{p.name}</div>
                        <div className="text-xs mb-2 truncate" style={{ fontFamily: monoFont, color: accent }}>{p.pattern}</div>
                        <div className="text-xs mb-3" style={{ color: textMuted }}>{p.desc}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadPattern(p)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                            style={{ backgroundColor: accent + "20", color: accent, border: `1px solid ${accent}40` }}
                          >
                            Load Pattern
                          </button>
                          <button
                            onClick={() => copy(p.pattern)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                            style={{ backgroundColor: "transparent", color: textMuted, border: `1px solid ${border}` }}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: CHEAT SHEET ── */}
        {tab === "cheatsheet" && (
          <div className="rounded-xl border p-4 md:p-6 mb-8" style={{ borderColor: border, backgroundColor: surface }}>
            <h2 className="text-xl font-bold mb-4">Regex Cheat Sheet</h2>
            <div className="space-y-8">
              {Object.entries(CHEAT).map(([cat, items]) => (
                <div key={cat}>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: accent }}>{cat}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" style={{ fontFamily: monoFont }}>
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${border}` }}>
                          <th className="text-left py-2 pr-4 font-semibold" style={{ color: textMuted, minWidth: "100px" }}>Pattern</th>
                          <th className="text-left py-2 pr-4 font-semibold" style={{ color: textMuted }}>Description</th>
                          {cat !== "Flags" && <th className="text-left py-2 font-semibold" style={{ color: textMuted, minWidth: "80px" }}>Example</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, idx) => (
                          <tr
                            key={idx}
                            className={item.ex ? "cursor-pointer hover:opacity-80" : ""}
                            onClick={() => item.ex && loadCheat(item.ex, item.sample)}
                            style={{ borderBottom: `1px solid ${border}20` }}
                          >
                            <td className="py-2 pr-4" style={{ color: accent }}>{item.p}</td>
                            <td className="py-2 pr-4" style={{ color: textMuted, fontFamily: "inherit" }}>{item.d}</td>
                            {cat !== "Flags" && (
                              <td className="py-2" style={{ color: "#50FA7B" }}>{item.ex || "\u2014"}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: textMuted }}>Click any row with an example to load it into the tester above.</p>
          </div>
        )}

        {/* ── TIMEOUT WARNING ── */}
        {timeout && (
          <div className="rounded-xl border p-4 mb-8" style={{ borderColor: "#FFB86C40", backgroundColor: "#FFB86C10" }}>
            <div className="font-semibold mb-1" style={{ color: "#FFB86C" }}>{"\u26A0\uFE0F"} Catastrophic Backtracking Detected</div>
            <p className="text-sm" style={{ color: textMuted }}>
              This pattern timed out after 2 seconds. Patterns like <code style={{ color: accent }}>(a+)+</code> can take exponentially long on certain inputs.
              Try restructuring your pattern to reduce ambiguity &mdash; for example, use non-capturing groups <code style={{ color: accent }}>(?:...)</code> or
              more specific character classes instead of greedy quantifiers.
            </p>
          </div>
        )}

        {/* ── SEO CONTENT & FAQS (on main page only, not articleMode) ── */}
        {!articleMode && (
          <>
            {/* SEO content */}
            <article className="space-y-6 mb-10 mt-8">
              <section className="rounded-xl border p-5" style={{ backgroundColor: surface, borderColor: border }}>
                <h2 className="font-bold mb-3" style={{ fontSize: "28px" }}>What Is a Regular Expression?</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: textMuted }}>
                  A regular expression (regex) is a pattern that describes a set of strings. Developers, data engineers, sysadmins, and QA testers use regex for
                  form validation, data extraction, log parsing, search-and-replace, and data cleaning. This tool lets you paste a pattern and test string, then see
                  matches highlighted instantly &mdash; no button clicks, no account needed, no data sent to any server. Everything runs in your browser.
                </p>
              </section>
              <section className="rounded-xl border p-5" style={{ backgroundColor: surface, borderColor: border }}>
                <h2 className="font-bold mb-3" style={{ fontSize: "28px" }}>Features</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: textMuted }}>
                  <strong style={{ color: text }}>Real-time matching</strong> with color-coded capture groups as you type.
                  A <strong style={{ color: text }}>plain-English explainer</strong> that breaks down any pattern token-by-token.
                  A <strong style={{ color: text }}>replace mode</strong> for testing search-and-replace with group references ($1, $2, $&amp;).
                  A <strong style={{ color: text }}>searchable library of 30+ common patterns</strong> for email, phone, URL, date, and more &mdash;
                  click to load and customize. Plus a complete <strong style={{ color: text }}>cheat sheet</strong> for quick reference.
                </p>
              </section>
              <section className="rounded-xl border p-5" style={{ backgroundColor: surface, borderColor: border }}>
                <h2 className="font-bold mb-3" style={{ fontSize: "28px" }}>JavaScript Regex Engine</h2>
                <p className="leading-relaxed" style={{ fontSize: "17px", color: textMuted }}>
                  This tool uses JavaScript&apos;s built-in RegExp engine &mdash; the same engine in Chrome, Firefox, Safari, Edge, and Node.js.
                  Patterns you test here work directly in your code. For other languages (Python, Java, PHP), most basic patterns are compatible, but
                  advanced features may differ. Regex execution runs in a <strong style={{ color: text }}>Web Worker</strong> with a 2-second timeout
                  to protect against catastrophic backtracking &mdash; your browser will never freeze.
                </p>
              </section>
            </article>

            {/* Related tools */}
            <div className="mb-10">
              <h2 className="font-bold mb-4" style={{ fontSize: "22px" }}>Related Developer Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { href: "/developer-tools/json-formatter", emoji: "\uD83D\uDD27", title: "JSON Formatter", desc: "Format, validate, and convert JSON" },
                  { href: "/developer-tools/base64-encoder-decoder", emoji: "\uD83D\uDD04", title: "Base64 Encoder/Decoder", desc: "Encode and decode Base64" },
                  { href: "/developer-tools/url-encoder-decoder", emoji: "\uD83D\uDD17", title: "URL Encoder/Decoder", desc: "Encode, decode, and parse URLs" },
                  { href: "/developer-tools/hash-generator", emoji: "#\uFE0F\u20E3", title: "Hash Generator", desc: "MD5, SHA-256, SHA-512 hashes" },
                  { href: "/design-tools/color-picker", emoji: "\uD83C\uDFA8", title: "Color Picker", desc: "Pick colors and convert formats" },
                  { href: "/utility-tools/password-generator", emoji: "\uD83D\uDD10", title: "Password Generator", desc: "Generate strong passwords" },
                ].map(tool => (
                  <a key={tool.href} href={tool.href} className="p-4 rounded-xl border hover:shadow-md transition-shadow" style={{ backgroundColor: surface, borderColor: border }}>
                    <span className="text-xl">{tool.emoji}</span>
                    <div className="font-semibold mt-1" style={{ fontSize: "15px" }}>{tool.title}</div>
                    <div className="text-xs" style={{ color: textMuted }}>{tool.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
