import type { SceneId } from "@/lib/city-data";

/**
 * Lightweight, purely decorative city life.
 * Every element is absolutely positioned, pointer-events-free, and animated
 * with CSS transform/opacity only. Nothing here ever blocks interaction.
 */

type BirdDef = {
  top: number;
  duration: number;
  delay: number;
  fromLeft?: boolean;
  tint?: string;
};

type ParticleDef = {
  x: number;
  y: number;
  count: number;
};

type CrossingDef = {
  top: number;
  duration: number;
  delay: number;
};

type AmbientConfig = {
  birds: BirdDef[];
  particles?: ParticleDef[];
  cross?: { pedestrian?: CrossingDef; vehicle?: CrossingDef };
};

const CONFIG: Record<SceneId, AmbientConfig> = {
  street: {
    birds: [
      { top: 12, duration: 40, delay: -6 },
      { top: 8, duration: 52, delay: -26, fromLeft: true, tint: "0.55" },
    ],
    cross: {
      pedestrian: { top: 92, duration: 44, delay: -8 },
      vehicle: { top: 86.5, duration: 60, delay: -40 },
    },
  },
  plaza: {
    birds: [
      { top: 12, duration: 44, delay: -12 },
      { top: 9, duration: 36, delay: -30, tint: "0.55" },
    ],
    cross: { pedestrian: { top: 91, duration: 46, delay: -12 } },
  },
  features: {
    birds: [
      { top: 9, duration: 42, delay: -10 },
      { top: 13, duration: 50, delay: -34, fromLeft: true, tint: "0.55" },
    ],
    particles: [
      { x: 32, y: 62, count: 5 },
      { x: 53, y: 63, count: 4 },
    ],
    cross: { pedestrian: { top: 92, duration: 46, delay: -20 } },
  },
  ecosystem: {
    birds: [
      { top: 11, duration: 46, delay: -16 },
      { top: 8, duration: 36, delay: -42, tint: "0.55" },
    ],
    cross: { pedestrian: { top: 92, duration: 42, delay: -4 } },
  },
  bridge: {
    birds: [
      { top: 10, duration: 42, delay: -4 },
      { top: 7, duration: 54, delay: -24, fromLeft: true, tint: "0.55" },
    ],
    particles: [{ x: 50, y: 62, count: 4 }],
  },
};

function Bird({ def }: { def: BirdDef }) {
  return (
    <div
      aria-hidden="true"
      className="ambient-cross"
      style={{
        top: `${def.top}%`,
        animationDuration: `${def.duration}s`,
        animationDelay: `${def.delay}s`,
        animationName: def.fromLeft ? "amb-lr" : "amb-rl",
      }}
    >
      <svg
        className="bird-body bird-svg block"
        width="24"
        height="10"
        viewBox="0 0 24 10"
        fill="none"
        style={{ color: `oklch(0.6 0.02 200 / ${def.tint ?? "0.75"})` }}
      >
        <path
          d="M1.5 5.5 Q5 0.5 12 5.5 Q19 0.5 22.5 5.5"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function ParticleCluster({ def }: { def: ParticleDef }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{ left: `${def.x}%`, top: `${def.y}%` }}
    >
      {Array.from({ length: def.count }, (_, i) => (
        <span
          key={i}
          className="data-particle"
          style={{
            left: `${(i * 13) % 22}px`,
            animationDelay: `${(i * 1.9) % 7.5}s`,
            animationDuration: `${4.4 + ((i * 1.7) % 3)}s`,
            ["--dx" as string]: `${6 + ((i * 5) % 12)}px`,
          }}
        />
      ))}
    </div>
  );
}

function Pedestrian({ def }: { def: CrossingDef }) {
  return (
    <div
      aria-hidden="true"
      className="ambient-cross"
      style={{
        top: `${def.top}%`,
        animationDuration: `${def.duration}s`,
        animationDelay: `${def.delay}s`,
        animationName: "amb-rl",
      }}
    >
      <svg
        className="ped-svg block"
        width="17"
        height="31"
        viewBox="0 0 17 31"
        style={{ color: "oklch(0.5 0.02 190 / 0.7)" }}
      >
        <circle cx="8.5" cy="5" r="3.8" fill="currentColor" />
        <rect x="5.6" y="8.5" width="5.8" height="10.5" rx="2.2" fill="currentColor" />
        <line
          x1="8.5"
          y1="19"
          x2="5.8"
          y2="30"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="ped-leg"
        />
        <line
          x1="8.5"
          y1="19"
          x2="11.2"
          y2="30"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="ped-leg"
          style={{ animationDelay: "-0.55s" }}
        />
      </svg>
    </div>
  );
}

function Vehicle({ def }: { def: CrossingDef }) {
  return (
    <div
      aria-hidden="true"
      className="ambient-cross"
      style={{
        top: `${def.top}%`,
        animationDuration: `${def.duration}s`,
        animationDelay: `${def.delay}s`,
        animationName: "amb-lr",
      }}
    >
      <svg className="car-svg block" width="62" height="21" viewBox="0 0 62 21">
        <path
          d="M6 16 Q6 13 9 13 H13 L16 5.4 Q16.8 4.2 18.4 4.2 H35.6 Q37.2 4.2 38 5.4 L41 13 H46 Q49 13 49.8 15 Q50.2 16.4 49 17.8 H46"
          fill="oklch(0.34 0.02 200 / 0.75)"
          stroke="oklch(0.78 0.02 190 / 0.4)"
          strokeWidth="1"
        />
        <rect
          x="17.4"
          y="5.2"
          width="19.6"
          height="8"
          rx="1.6"
          fill="oklch(0.52 0.03 200 / 0.75)"
        />
        <circle cx="17" cy="17.4" r="3" fill="oklch(0.14 0.012 200 / 0.9)" />
        <circle cx="39.5" cy="17.4" r="3" fill="oklch(0.14 0.012 200 / 0.9)" />
        <circle
          cx="49.5"
          cy="10.5"
          r="1.3"
          fill="oklch(0.78 0.13 178 / 0.95)"
          style={{ animation: "sign-pulse 2.8s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
}

export function AmbientScene({
  sceneId,
  plane,
}: {
  sceneId: SceneId;
  /** which parallax plane this overlay belongs to */
  plane: "bg" | "mid" | "fg";
}) {
  const config = CONFIG[sceneId];
  if (!config) return null;

  const birds = plane === "bg" ? config.birds : [];
  const particles = plane === "mid" ? (config.particles ?? []) : [];
  const pedestrian = plane === "fg" ? config.cross?.pedestrian : undefined;
  const vehicle = plane === "fg" ? config.cross?.vehicle : undefined;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {birds.map((def, i) => (
        <Bird key={`b${i}`} def={def} />
      ))}
      {particles.map((def, i) => (
        <ParticleCluster key={`p${i}`} def={def} />
      ))}
      {pedestrian && <Pedestrian def={pedestrian} />}
      {vehicle && <Vehicle def={vehicle} />}
    </div>
  );
}
