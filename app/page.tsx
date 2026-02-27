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
      </div>
    </main>
  );
}
