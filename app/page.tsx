import Link from "next/link";
import JumpNav from "./components/JumpNav";

const categories = [
  {
    id: "money-business",
    emoji: "\uD83D\uDCB0",
    name: "Money & Business",
    tools: [
      { href: "/finance-tools/subscription-calculator", emoji: "\uD83D\uDCB3", title: "Subscription Audit Calculator", desc: "Check off your subscriptions from 80+ services and see what you really spend" },
      { href: "/business-tools/salary-negotiation-calculator", emoji: "\uD83D\uDCB8", title: "Salary Loss Calculator", desc: "See the shocking lifetime cost of not negotiating your salary \u2014 with compounding" },
      { href: "/business-tools/meeting-cost-calculator", emoji: "\u23F1\uFE0F", title: "Meeting Cost Calculator", desc: "See what meetings really cost with live timer, annual projections, and shareable results" },
      { href: "/business-tools/true-hourly-rate-calculator", emoji: "\uD83D\uDCB0", title: "True Hourly Rate Calculator", desc: "Your salary says one number, but your TRUE hourly rate factors in commute, overtime, and work expenses" },
      { href: "/business-tools/invoice-generator", emoji: "\uD83E\uDDFE", title: "Invoice Generator", desc: "Create professional invoices with your logo, line items, taxes & discounts. Download as PDF instantly. No signup required." },
    ],
  },
  {
    id: "developer-tools",
    emoji: "\uD83D\uDCBB",
    name: "Developer Tools",
    tools: [
      { href: "/developer-tools/json-formatter", emoji: "\uD83D\uDD27", title: "JSON Formatter & Validator", desc: "Format, validate, minify, and convert JSON \u2014 with tree view, diff tool, and auto-fix for common errors" },
      { href: "/developer-tools/base64-encoder-decoder", emoji: "\uD83D\uDD04", title: "Base64 Encoder & Decoder", desc: "Encode and decode Base64 text, files, and images instantly \u2014 with data URI output and live preview" },
      { href: "/developer-tools/url-encoder-decoder", emoji: "\uD83D\uDD17", title: "URL Encoder & Decoder", desc: "Encode, decode, and parse URLs with a visual breakdown of every component" },
      { href: "/developer-tools/hash-generator", emoji: "#\uFE0F\u20E3", title: "Hash Generator & Checksum Tool", desc: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes for text and files \u2014 with HMAC and checksum verification" },
      { href: "/developer-tools/regex-tester", emoji: "\uD83D\uDD0D", title: "Regex Tester & Debugger", desc: "Test, debug, and visualize regular expressions in real-time \u2014 with a common patterns library and plain-English explainer" },
    ],
  },
  {
    id: "math-conversion",
    emoji: "\uD83D\uDCD0",
    name: "Math & Conversion Tools",
    tools: [
      { href: "/conversion-tools/unit-converter", emoji: "\uD83D\uDCD0", title: "Universal Unit Converter", desc: "Convert 200+ units \u2014 length, weight, temperature, volume, speed, area, digital storage & more" },
    ],
  },
  {
    id: "everyday-tools",
    emoji: "\uD83D\uDD27",
    name: "Everyday Tools",
    tools: [
      { href: "/writing-tools/word-counter", emoji: "\uD83D\uDCDD", title: "Word & Character Counter", desc: "Count words, characters, sentences, and paragraphs \u2014 with reading time, keyword density, and social media limits" },
      { href: "/writing-tools/markdown-editor", emoji: "\u270D\uFE0F", title: "Markdown Editor", desc: "Write and preview Markdown in real-time with formatting toolbar, visual table builder, and rich text export" },
      { href: "/image-tools/image-compressor", emoji: "\uD83D\uDDBC\uFE0F", title: "Image Compressor & Toolkit", desc: "Compress, resize, convert, and crop images \u2014 all in your browser" },
      { href: "/utility-tools/qr-code-generator", emoji: "\uD83D\uDCF1", title: "QR Code Generator", desc: "Create custom QR codes with colors, logos, WiFi sharing, vCards, and batch generation \u2014 100% free" },
      { href: "/utility-tools/password-generator", emoji: "\uD83D\uDD10", title: "Password Generator & Strength Checker", desc: "Generate uncrackable passwords, memorable passphrases, and PINs \u2014 then check how long they\u2019d take to crack" },
      { href: "/design-tools/color-picker", emoji: "\uD83C\uDFA8", title: "Color Picker & Converter", desc: "Pick colors, convert between HEX/RGB/HSL, check contrast accessibility, and generate palettes" },
      { href: "/design-tools/pixel-art-editor", emoji: "\u270F\uFE0F", title: "Pixel Art Editor & Favicon Generator", desc: "Draw pixel art, design favicons, and export complete icon packages" },
      { href: "/design-tools/css-gradient-generator", emoji: "\uD83C\uDF08", title: "CSS Gradient Generator", desc: "Create linear, radial, conic & mesh gradients with live preview, 120+ presets, and instant CSS/Tailwind code" },
      { href: "/writing-tools/lorem-ipsum-generator", emoji: "\uD83D\uDCDC", title: "Lorem Ipsum Generator", desc: "Generate placeholder text in 10 styles — Classic Latin, Business, Tech, Hipster, Pirate & more. Copy as text, HTML, or Markdown." },
      { href: "/construction/concrete-calculator", emoji: "\uD83C\uDFD7\uFE0F", title: "Concrete Calculator", desc: "Calculate exactly how much concrete you need for any project" },
    ],
  },
];

export default function Home() {
  return (
    <main className="max-w-[1100px] mx-auto px-4 py-16">
      <h1
        className="text-4xl font-bold mb-4 text-center"
        style={{
          background: "linear-gradient(to right, #1a1a2e, #059669)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Free Online Tools
      </h1>
      <p className="mb-8 text-center" style={{ color: "var(--text-muted)", fontSize: "18px" }}>
        Instant-use calculators, converters, and tools. No signup required.
      </p>

      {/* Jump nav pills */}
      <JumpNav categories={categories.map(({ id, emoji, name }) => ({ id, emoji, name }))} />

      {/* Category sections */}
      <div className="space-y-16">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-heading`} style={{ scrollMarginTop: "80px" }}>
            <div className="flex items-center gap-3 mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <h2
                id={`${cat.id}-heading`}
                className="text-[22px] sm:text-[28px] font-semibold"
                style={{ color: "var(--text)" }}
              >
                {cat.emoji} {cat.name}
              </h2>
              <span
                className="font-medium rounded-full"
                style={{
                  padding: "3px 12px",
                  fontSize: "14px",
                  backgroundColor: "var(--surface)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {cat.tools.length} tools
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="text-2xl mb-2">{tool.emoji}</div>
                  <h3 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
                    {tool.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
