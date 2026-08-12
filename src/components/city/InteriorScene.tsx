import type { Interior } from "@/lib/city-data";
import { VaraMark } from "./VaraMark";

export function InteriorScene({ interior, onBack }: { interior: Interior; onBack: () => void }) {
  return (
    <section className="absolute inset-0 overflow-y-auto bg-ink" aria-label={interior.title}>
      <div className="pointer-events-none absolute inset-0">
        <img
          src={interior.image}
          alt={`Illustrated interior of ${interior.title}`}
          loading="lazy"
          width={1920}
          height={1088}
          className="city-drift-slow h-full w-full object-cover"
        />
        <div className="grain-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/25" />
      </div>

      <div className="relative flex min-h-dvh flex-col justify-center px-5 py-24 sm:px-10 lg:px-20">
        <div className="max-w-xl animate-soft-rise">
          {interior.badge && (
            <p className="mb-4 inline-flex items-center gap-2 border border-primary/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-primary">
              <VaraMark className="h-3.5 w-3.5" /> {interior.badge}
            </p>
          )}
          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl">
            {interior.title}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.28em] text-primary">
            {interior.subtitle}
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/85 sm:text-lg">
            {interior.body}
          </p>

          <ul className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3" aria-label="How it flows">
            {interior.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-2 sm:gap-3">
                <span className="sign-plaque rounded-sm px-3 py-2 text-[11px] font-bold sm:text-xs">
                  {step}
                </span>
                {i < interior.flow.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="relative block h-px w-10 bg-primary/40 sm:w-14"
                  >
                    <span
                      className="absolute -top-[3px] left-0 block h-1.5 w-1.5 rounded-full bg-primary"
                      style={{
                        animation: "msg-travel 2.4s linear infinite",
                        animationDelay: `${i * 0.8}s`,
                        // @ts-expect-error custom property
                        "--travel": "44px",
                      }}
                    />
                  </span>
                )}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-[11px] uppercase tracking-[0.34em] text-foreground/60">
            Why it matters
          </h2>
          <ul className="mt-3 space-y-2 border-l border-primary/30 pl-4">
            {interior.points.map((p) => (
              <li key={p} className="text-sm leading-relaxed text-foreground/80">
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={interior.cta.href}
              target="_blank"
              rel="noreferrer noopener"
              className="sign-plaque sign-plaque-hover group inline-flex min-h-11 items-center rounded-sm px-5 py-3 text-xs font-bold"
            >
              {interior.cta.label}{" "}
              <span
                aria-hidden="true"
                className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex min-h-11 items-center rounded-sm border border-border px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <span
                aria-hidden="true"
                className="mr-2 inline-block transition-transform duration-200 ease-out group-hover:-translate-x-1"
              >
                ←
              </span>{" "}
              Back to city
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
