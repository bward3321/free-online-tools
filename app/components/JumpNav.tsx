"use client";

export default function JumpNav({ categories }: { categories: { id: string; emoji: string; name: string; count: number }[] }) {
  return (
    <nav className="flex justify-center gap-3 mb-12 flex-wrap">
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={`#${cat.id}`}
          className="jump-pill inline-flex items-center gap-1.5 rounded-full border transition-all duration-200"
          style={{
            padding: "8px 18px",
            fontSize: "15px",
            fontWeight: 500,
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "#059669";
            el.style.borderColor = "#059669";
            el.style.color = "#fff";
            el.style.transform = "scale(1.04)";
            el.style.boxShadow = "0 2px 8px rgba(5,150,105,0.25)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "var(--surface)";
            el.style.borderColor = "var(--border)";
            el.style.color = "var(--text)";
            el.style.transform = "scale(1)";
            el.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
          }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <span>{cat.emoji}</span>
          <span>{cat.name}</span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: "rgba(5,150,105,0.12)",
              color: "#059669",
              borderRadius: "9999px",
              padding: "1px 8px",
              minWidth: "22px",
              textAlign: "center",
              lineHeight: "20px",
              transition: "background-color 200ms, color 200ms",
            }}
            className="pill-count"
          >
            {cat.count}
          </span>
        </a>
      ))}
      <style>{`
        .jump-pill:hover .pill-count {
          background-color: rgba(255,255,255,0.25) !important;
          color: #fff !important;
        }
      `}</style>
    </nav>
  );
}
