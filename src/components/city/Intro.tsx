import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { VaraMark } from "./VaraMark";

export function Intro({ onEnter, leaving }: { onEnter: () => void; leaving: boolean }) {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Welcome to Vara City"
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-ink px-6 text-center transition-all duration-700"
      style={{
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(1.12)" : "scale(1)",
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/vara-city-intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/76" />
        <div className="grain-overlay" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-full">
        <VaraMark
          className="mx-auto h-10 w-10 text-primary"
          style={reduced ? undefined : { animationDelay: "120ms" }}
          aria-hidden="true"
        />
        <h1
          className={`mt-8 font-display text-5xl font-bold uppercase leading-none tracking-[0.06em] text-foreground sm:text-7xl lg:text-8xl ${
            reduced ? "" : "animate-soft-rise"
          }`}
          style={reduced ? undefined : { animationDelay: "180ms" }}
        >
          Vara City
        </h1>
        <p
          className={`mt-5 text-xs uppercase tracking-[0.36em] text-primary sm:text-sm ${
            reduced ? "" : "animate-soft-rise"
          }`}
          style={reduced ? undefined : { animationDelay: "240ms" }}
        >
          Explore the network, one building at a time.
        </p>
        <button
          type="button"
          onClick={onEnter}
          className={`sign-plaque sign-plaque-hover mt-12 inline-flex min-h-12 items-center rounded-sm px-7 py-3.5 text-sm font-bold ${
            reduced ? "" : "animate-soft-rise"
          }`}
          style={reduced ? undefined : { animationDelay: "300ms" }}
        >
          Enter city{" "}
          <span aria-hidden="true" className="ml-3">
            →
          </span>
        </button>
        <p
          className={`mt-6 text-[10px] uppercase tracking-[0.3em] text-foreground/45 ${
            reduced ? "" : "animate-soft-rise"
          }`}
          style={reduced ? undefined : { animationDelay: "360ms" }}
        >
          Press enter or click to skip
        </p>
      </div>
    </section>
  );
}
