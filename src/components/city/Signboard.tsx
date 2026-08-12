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
  return (
    <button
      type="button"
      onClick={() => onSelect(hotspot)}
      aria-label={`Open ${hotspot.label} — ${hotspot.hint}`}
      className={`sign-plaque sign-plaque-hover group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-sm px-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-4 sm:py-2.5 ${
        active ? "border-primary/80" : ""
      }`}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      <span
        className={`block whitespace-nowrap font-bold ${compact ? "text-[11px]" : "text-xs sm:text-sm"}`}
      >
        {hotspot.label}
      </span>
      <span className="mt-0.5 flex items-center gap-1 text-[10px] tracking-[0.2em] text-primary/70 transition-colors group-hover:text-primary">
        Enter <span aria-hidden="true">→</span>
      </span>
    </button>
  );
}