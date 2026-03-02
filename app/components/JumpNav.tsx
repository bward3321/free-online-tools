"use client";

export default function JumpNav({ categories }: { categories: { id: string; emoji: string; name: string }[] }) {
  return (
    <nav className="flex justify-center gap-3 mb-12 flex-wrap">
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={`#${cat.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border transition-colors hover:border-[var(--color-accent,#8BE9FD)]"
          style={{
            padding: "8px 18px",
            fontSize: "15px",
            fontWeight: 500,
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <span>{cat.emoji}</span>
          <span>{cat.name}</span>
        </a>
      ))}
    </nav>
  );
}
