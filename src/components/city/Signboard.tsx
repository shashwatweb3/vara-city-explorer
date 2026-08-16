import type { Hotspot } from "@/lib/city-data";

export function Signboard({
  hotspot,
  onSelect,
  active,
  compact,
}: {
  hotspot: Hotspot;
  onSelect: (hotspot: Hotspot) => void;
  active?: boolean;
  compact?: boolean;
}) {
  // deterministic per-sign delay so lights never blink in unison
  const dotDelay = (hotspot.id.length * 0.9 + hotspot.x * 0.45) % 6;
  return (
    <button
      type="button"
      onClick={() => onSelect(hotspot)}
      aria-label={`Open ${hotspot.label} — ${hotspot.hint}`}
      className={`sign-plaque sign-plaque-hover group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-sm px-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-4 sm:py-2.5 ${
        active ? "border-primary/80" : ""
      } ${compact ? "mobile-sign-plaque" : ""}`}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        scale: "var(--sign-scale, 1)",
      }}
    >
      <span
        className={`block whitespace-nowrap font-bold ${compact ? "text-[11px]" : "text-xs sm:text-sm"}`}
      >
        {hotspot.label}
      </span>
      <span className="mt-0.5 flex items-center gap-1 text-[10px] tracking-[0.2em] text-primary/70 transition-colors group-hover:text-primary">
        Enter
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
      <span aria-hidden="true" className="sign-dot" style={{ animationDelay: `${dotDelay}s` }} />
    </button>
  );
}
