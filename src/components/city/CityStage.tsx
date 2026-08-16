import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { AmbientScene } from "./Ambient";
import { Signboard } from "./Signboard";
import type { Hotspot, Scene } from "@/lib/city-data";

type Focus = { x: number; y: number } | null;

/** Native artwork ratio (1920×1088). The canvas keeps it at every viewport so
 *  every sign, banner and ambient element stays anchored to the same spot in
 *  the illustration instead of drifting with the aspect ratio. */
const ART_RATIO = 1920 / 1088;

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
  // null until mounted so the first client render matches the SSR markup
  const [size, setSize] = useState<[number, number] | null>(null);

  useEffect(() => setIndex(0), [scene.id]);

  useEffect(() => {
    const onResize = () => setSize([window.innerWidth, window.innerHeight]);
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  // Subtle pointer parallax written straight to CSS variables (no re-renders).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced || isMobile) return;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty("--px", `${nx * 44}px`);
      el.style.setProperty("--py", `${ny * 22}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, isMobile]);

  const spots = scene.hotspots;

  // Camera in pixels against the artwork canvas. The canvas covers the viewport
  // (never smaller), so the artwork only ever crops — it never stretches or
  // shows edges — and the pan is clamped to keep it that way at any zoom.
  // Before mount the viewport is unknown; the SSR default keeps every scene in
  // free layout, which the first client render matches (no hydration drift).
  const [W, H] = size ?? [1280, 800];
  const kx = Math.max(1, (ART_RATIO * H) / W); // canvas width / viewport width
  const ky = Math.max(1, W / (ART_RATIO * H)); // canvas height / viewport height
  const cw = kx * W;
  const chh = ky * H;

  // Free layout shows every board at once. That works while each board fits in
  // the visible slice of artwork around its anchor; laptops manage with a
  // slight board shrink, phones and tall/narrow tablets cannot, so those fall
  // back to the sequential camera: one sign at a time, guided by ‹ ›.
  // All values below are in % of the artwork.
  const availX = 50 / kx;
  const availY = 50 / ky;
  let fit = 1;
  for (const h of spots) {
    const halfPct = ((h.label.length * 10.6 + 40) / 2 / cw) * 100;
    if (availX - (50 - h.x) < halfPct) fit = Math.min(fit, (availX - (50 - h.x)) / halfPct);
    if (availX - (h.x - 50) < halfPct) fit = Math.min(fit, (availX - (h.x - 50)) / halfPct);
  }
  const banner = scene.banner;
  if (banner) {
    // wide centred text; reserve ~14% of the artwork each side of its anchor
    if (availX - (50 - banner.x) < 14) fit = Math.min(fit, (availX - (50 - banner.x)) / 14);
    if (availX - (banner.x - 50) < 14) fit = Math.min(fit, (availX - (banner.x - 50)) / 14);
  }
  const lowest = Math.max(...spots.map((h) => h.y), banner?.y ?? 0);
  const sequential = isMobile || fit < 0.72 || availY - (lowest - 50) < 1.5;
  const fitScale = sequential ? 1 : fit;

  const mobileSpot = sequential ? spots[Math.min(index, spots.length - 1)] : undefined;
  const target: Focus = focus ?? (mobileSpot ? { x: mobileSpot.x, y: mobileSpot.y } : null);
  const zoom = focus ? (isMobile ? 1.25 : 1.9) : mobileSpot ? 1.2 : 1;

  let tx = 0;
  let ty = 0;
  if (target) {
    // In sequential mode park the active sign a little above centre so the
    // bottom nav never covers it.
    const anchorY = mobileSpot && !focus ? 0.44 : 0.5;
    tx = -zoom * ((target.x / 100) * cw - cw / 2);
    ty = (anchorY - 0.5) * H - zoom * ((target.y / 100) * chh - chh / 2);
    const lx = Math.max(0, (zoom * cw - W) / 2);
    const ly = Math.max(0, (zoom * chh - H) / 2);
    tx = Math.max(-lx, Math.min(lx, tx));
    ty = Math.max(-ly, Math.min(ly, ty));
  }
  // boards keep their pixel size against the camera zoom, and shrink slightly
  // on laptop ratios so the outermost boards never clip at the frame
  const signScale = String((1 / zoom) * (target || sequential ? 1 : fitScale));

  const parallax = (bx: number, by: number) => ({
    transform: `translate3d(calc(var(--px, 0px) * ${bx}), calc(var(--py, 0px) * ${by}), 0)`,
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <div
        ref={wrapRef}
        className="absolute inset-0"
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(${zoom})`,
          transition: reduced ? "none" : "transform 850ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {/* The preserved coordinate system: sized to the artwork ratio, covering
            the viewport. Everything inside is positioned in % of the artwork. */}
        <div className="scene-canvas">
          {/* background: artwork, paper grain, distant birds — moves very slowly */}
          <div className="absolute inset-0" style={parallax(0.45, 0.45)}>
            <img
              src={scene.image}
              alt={`Illustrated view of ${scene.name} in Vara City`}
              width={1920}
              height={1088}
              className="city-drift h-full w-full object-cover"
            />
            <div className="grain-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
            <AmbientScene sceneId={scene.id} plane="bg" />
          </div>

          {/* midground: environmental typography + tech data particles — moves a little more */}
          <div className="absolute inset-0" style={parallax(0.8, 0.8)}>
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
            <AmbientScene sceneId={scene.id} plane="mid" />
          </div>

          {/* foreground: crossing pedestrian + vehicle — moves with the mouse */}
          <div className="absolute inset-0" style={parallax(1.35, 1.35)}>
            <AmbientScene sceneId={scene.id} plane="fg" />
          </div>

          {/* interactive layer: signs sit on their buildings at every viewport */}
          <div className="absolute inset-0" style={{ ["--sign-scale" as string]: signScale }}>
            {(sequential ? spots.filter((_, i) => i === index) : spots).map((h) => (
              <Signboard
                key={h.id}
                hotspot={h}
                onSelect={onSelect}
                active={sequential}
                compact={sequential && isMobile}
              />
            ))}
          </div>
        </div>
      </div>

      {sequential && spots.length > 1 && (
        <div className="absolute left-1/2 z-20 flex -translate-x-1/2 flex-col items-center mobile-hotspot-nav">
          <div className="flex items-center gap-3">
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
          <span className="text-[10px] uppercase tracking-[0.32em] text-foreground/70 mobile-hotspot-name">
            {scene.name}
          </span>
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
