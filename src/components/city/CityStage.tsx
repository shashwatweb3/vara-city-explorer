import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Signboard } from "./Signboard";
import type { Hotspot, Scene } from "@/lib/city-data";

type Focus = { x: number; y: number } | null;

export function CityStage({
  scene,
  focus,
  hidden,
  onSelect,
}: {
  scene: Scene;
  focus: Focus;
  hidden: boolean;
  onSelect: (hotspot: Hotspot) => void;
}) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [scene.id]);

  // Subtle pointer parallax written straight to CSS variables (no re-renders).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced || isMobile) return;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty("--px", `${nx * 22}px`);
      el.style.setProperty("--py", `${ny * 12}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, isMobile]);

  const spots = scene.hotspots;
  const mobileSpot = isMobile ? spots[Math.min(index, spots.length - 1)] : undefined;
  const target: Focus = focus ?? (mobileSpot ? { x: mobileSpot.x, y: mobileSpot.y } : null);
  const zoom = focus ? (isMobile ? 1.9 : 1.9) : mobileSpot ? 1.55 : 1;

  // Keep the camera inside the artwork so scene edges never show.
  // translate() is applied before scale(), so on-screen shift is tx * zoom.
  const limit = ((zoom - 1) * 50) / zoom;
  const clamp = (v: number) => Math.max(-limit, Math.min(limit, v));
  const tx = target ? clamp((50 - target.x) * zoom) : 0;
  const ty = target ? clamp((50 - target.y) * zoom) : 0;
  const signScale = String(1 / zoom);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <div
        ref={wrapRef}
        className="absolute inset-0"
        style={{
          transform: `translate(${tx}%, ${ty}%) scale(${zoom})`,
          transition: reduced ? "none" : "transform 850ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {/* background / midground artwork */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translate3d(calc(var(--px, 0px) * 0.35), calc(var(--py, 0px) * 0.35), 0)",
          }}
        >
          <img
            src={scene.image}
            alt={`Illustrated view of ${scene.name} in Vara City`}
            width={1920}
            height={1088}
            className="h-full w-full scale-[1.06] object-cover"
          />
          <div className="grain-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
        </div>

        {/* foreground layer: signage + interactive buildings */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)",
            ["--sign-scale" as string]: signScale,
          }}
        >
          {scene.banner && (
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{
                left: `${scene.banner.x}%`,
                top: `${scene.banner.y}%`,
                scale: "var(--sign-scale, 1)",
              }}
            >
              <p className="font-display text-2xl font-bold uppercase leading-none tracking-[0.16em] text-primary sm:text-4xl lg:text-5xl">
                {scene.banner.title}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-foreground/70 sm:text-xs">
                {scene.banner.sub}
              </p>
            </div>
          )}

          {(isMobile ? spots.filter((_, i) => i === index) : spots).map((h, i) => (
            <Signboard
              key={h.id}
              hotspot={h}
              onSelect={onSelect}
              active={isMobile}
              compact={isMobile}
            />
          ))}
        </div>
      </div>

      {isMobile && spots.length > 1 && (
        <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          <button
            type="button"
            aria-label="Look at the previous place"
            onClick={() => setIndex((i) => (i - 1 + spots.length) % spots.length)}
            className="sign-plaque flex min-h-11 min-w-11 items-center justify-center rounded-full text-base"
          >
            ‹
          </button>
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/70">
            {index + 1} / {spots.length}
          </span>
          <button
            type="button"
            aria-label="Look at the next place"
            onClick={() => setIndex((i) => (i + 1) % spots.length)}
            className="sign-plaque flex min-h-11 min-w-11 items-center justify-center rounded-full text-base"
          >
            ›
          </button>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-ink transition-opacity duration-500"
        style={{ opacity: hidden ? 1 : 0 }}
      />
    </div>
  );
}