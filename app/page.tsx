import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-[1100px] mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
        Free Online Tools
      </h1>
      <p className="text-lg mb-12" style={{ color: "var(--text-muted)" }}>
        Instant-use calculators, converters, and tools. No signup required.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/business-tools/salary-negotiation-calculator"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">📉</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            Salary Negotiation Calculator
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            See the shocking lifetime cost of not negotiating your salary — with compounding
          </p>
        </Link>
        <Link
          href="/finance-tools/subscription-calculator"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">💸</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            Subscription Cost Calculator
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Check off your subscriptions from 80+ services and see what you really spend
          </p>
        </Link>
        <Link
          href="/business-tools/meeting-cost-calculator"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">💰</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            Meeting Cost Calculator
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            See what meetings really cost with live timer, annual projections, and shareable results
          </p>
        </Link>
        <Link
          href="/design-tools/pixel-art-editor"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">🎨</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            Pixel Art Editor & Favicon Generator
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Draw pixel art, design favicons, and export complete icon packages
          </p>
        </Link>
        <Link
          href="/image-tools/image-compressor"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">🖼️</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            Image Compressor & Toolkit
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Compress, resize, convert, and crop images — all in your browser
          </p>
        </Link>
        <Link
          href="/utility-tools/password-generator"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">🔐</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            Password Generator & Strength Checker
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Generate uncrackable passwords, memorable passphrases, and PINs — then check how long they&apos;d take to crack
          </p>
        </Link>
        <Link
          href="/writing-tools/word-counter"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">📝</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            Word & Character Counter
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Count words, characters, sentences, and paragraphs — with reading time, keyword density, and social media limits
          </p>
        </Link>
        <Link
          href="/developer-tools/json-formatter"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">🔧</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            JSON Formatter & Validator
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Format, validate, minify, and convert JSON — with tree view, diff tool, and auto-fix for common errors
          </p>
        </Link>
        <Link
          href="/construction/concrete-calculator"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">🧱</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            Concrete Calculator
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Calculate exactly how much concrete you need for any project
          </p>
        </Link>
        <Link
          href="/business-tools/true-hourly-rate-calculator"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">⏱️</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            True Hourly Rate Calculator
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Your salary says one number, but your TRUE hourly rate factors in commute, overtime, and work expenses
          </p>
        </Link>
        <Link
          href="/utility-tools/qr-code-generator"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">📱</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            QR Code Generator
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Create custom QR codes with colors, logos, WiFi sharing, vCards, and batch generation — 100% free
          </p>
        </Link>
        <Link
          href="/developer-tools/base64-encoder-decoder"
          className="block p-6 rounded-2xl border hover:shadow-lg transition-shadow"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="text-2xl mb-2">🔄</div>
          <h2 className="font-semibold text-lg mb-1" style={{ color: "var(--text)" }}>
            Base64 Encoder & Decoder
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Encode and decode Base64 text, files, and images instantly — with data URI output and live preview
          </p>
        </Link>
      </div>
    </main>
  );
}
