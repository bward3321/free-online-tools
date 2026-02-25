# Free Online Tools — Project Standards

## Overview
This is a collection of free, instant-use online tools and calculators. Every tool must be polished, fast, mobile-perfect, and more useful than any competitor.

## Tech Stack
- Next.js 16 with App Router, static export (`output: "export"`)
- TypeScript
- Tailwind CSS v4
- Deployed via Vercel from this repo
- No backend required — all tools run client-side

## URL Structure
- /construction/concrete-calculator
- /construction/rebar-calculator
- /networking/subnet-calculator
- /dev-tools/regex-tester
- /image-tools/compress-image
- etc.

## Design Standards
- Clean, modern, professional aesthetic
- Light mode default, dark mode toggle
- Mobile-first responsive design
- All inputs update results in real-time (no "Calculate" button)
- Every tool must have: the tool itself, a pro tips section, SEO content with FAQs, and a related tools section
- Lighthouse 95+ on all metrics
- Every tool must work perfectly on mobile with touch-friendly inputs

## SEO Standards
- Unique title tag and meta description per tool
- H1 matches the tool name
- Schema.org WebApplication markup on every tool page
- Open Graph tags
- 600-800 words of genuinely helpful content below each tool
- FAQ section with 5-6 common questions
- Internal links to related tools

## Quality Bar
- Every tool must be the best version of that tool on the internet
- If a tool isn't better than the top Google result, it's not done
- Visual polish matters — this is not a side project aesthetic
- Interactions should feel smooth and satisfying (animations, transitions)
- No tool should require signup, payment, or any friction whatsoever

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Build static export
- `npm run lint` — Run ESLint
