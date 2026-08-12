import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { CityStage } from "@/components/city/CityStage";
import { CityHud } from "@/components/city/CityHud";
import { Intro } from "@/components/city/Intro";
import { InteriorScene } from "@/components/city/InteriorScene";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  INTERIORS,
  SCENES,
  type Hotspot,
  type InteriorId,
  type SceneId,
} from "@/lib/city-data";

const TITLE = "Vara City — Explore the Vara Network, one building at a time";
const DESC =
  "Walk an illustrated city built around Vara Network: enter buildings to learn the actor model, delayed messages, gasless interactions, Wasm and Vara.eth, then visit real ecosystem projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Phase = "intro" | "city" | "interior";

function Index() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [leavingIntro, setLeavingIntro] = useState(false);
  const [sceneId, setSceneId] = useState<SceneId>("street");
  const [interiorId, setInteriorId] = useState<InteriorId | null>(null);
  const [focus, setFocus] = useState<{ x: number; y: number } | null>(null);
  const timers = useRef<number[]>([]);

  const later = useCallback(
    (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, reduced ? 0 : ms);
      timers.current.push(id);
    },
    [reduced],
  );

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
    },
    [],
  );

  const enterCity = useCallback(() => {
    setLeavingIntro(true);
    later(() => setPhase("city"), 700);
  }, [later]);

  useEffect(() => {
    if (phase !== "intro") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") enterCity();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, enterCity]);

  const goScene = useCallback((id: SceneId) => {
    setFocus(null);
    setInteriorId(null);
    setPhase("city");
    setSceneId(id);
  }, []);

  const onSelect = useCallback(
    (hotspot: Hotspot) => {
      setFocus({ x: hotspot.x, y: hotspot.y });
      if (hotspot.to.kind === "scene") {
        const next = hotspot.to.id;
        later(() => {
          setSceneId(next);
          setFocus(null);
        }, 780);
      } else {
        const next = hotspot.to.id;
        later(() => {
          setInteriorId(next);
          setPhase("interior");
        }, 820);
      }
    },
    [later],
  );

  const backToCity = useCallback(() => {
    const from = interiorId ? INTERIORS[interiorId].from : sceneId;
    setPhase("city");
    setSceneId(from);
    later(() => {
      setFocus(null);
      setInteriorId(null);
    }, 60);
  }, [interiorId, sceneId, later]);

  const interior = interiorId ? INTERIORS[interiorId] : null;

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink">
      <CityStage
        scene={SCENES[sceneId]}
        focus={focus}
        hidden={phase === "interior"}
        onSelect={onSelect}
      />

      <CityHud sceneId={sceneId} onGo={goScene} dim={phase !== "city"} />

      {phase === "interior" && interior && (
        <div className="absolute inset-0 z-30 animate-soft-rise">
          <InteriorScene interior={interior} onBack={backToCity} />
        </div>
      )}

      {phase === "intro" && <Intro onEnter={enterCity} leaving={leavingIntro} />}

      <h2 className="sr-only">Places in Vara City</h2>
      <ul className="sr-only">
        {Object.values(INTERIORS).map((i) => (
          <li key={i.id}>
            <a href={i.cta.href} target="_blank" rel="noreferrer noopener">
              {i.title}
            </a>
            : {i.body}
          </li>
        ))}
      </ul>
    </main>
  );
}
