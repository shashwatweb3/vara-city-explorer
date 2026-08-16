import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { CityStage } from "@/components/city/CityStage";
import { CityHud } from "@/components/city/CityHud";
import { Intro } from "@/components/city/Intro";
import { InteriorScene } from "@/components/city/InteriorScene";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { INTERIORS, SCENES, type Hotspot, type InteriorId, type SceneId } from "@/lib/city-data";

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
  const [interiorLeaving, setInteriorLeaving] = useState(false);
  const [sceneId, setSceneId] = useState<SceneId>("street");
  const [interiorId, setInteriorId] = useState<InteriorId | null>(null);
  // scene the current interior was opened from, so "Back to city" returns
  // the visitor where they actually came from (e.g. the Bridge, not Feature Street)
  const [interiorFrom, setInteriorFrom] = useState<SceneId | null>(null);
  const [focus, setFocus] = useState<{ x: number; y: number } | null>(null);
  // during a scene-to-scene hop the city fades through ink — no hard cuts
  const [veil, setVeil] = useState(false);
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

  // Walk the city camera over to another scene: fade out, swap artwork, fade back in.
  const goScene = useCallback(
    (id: SceneId, viaFocus?: { x: number; y: number }) => {
      if (viaFocus) setFocus(viaFocus);
      if (viaFocus) {
        // let the camera begin its glide toward the sign, then crossfade
        later(() => setVeil(true), 560);
        later(() => {
          setSceneId(id);
          setFocus(null);
          setInteriorId(null);
          setInteriorFrom(null);
          setPhase("city");
        }, 840);
        later(() => setVeil(false), 1280);
      } else {
        setVeil(true);
        later(() => {
          setSceneId(id);
          setFocus(null);
          setInteriorId(null);
          setInteriorFrom(null);
          setPhase("city");
        }, 300);
        later(() => setVeil(false), 780);
      }
    },
    [later],
  );

  const onSelect = useCallback(
    (hotspot: Hotspot) => {
      if (hotspot.to.kind === "scene") {
        goScene(hotspot.to.id, { x: hotspot.x, y: hotspot.y });
      } else {
        const next = hotspot.to.id;
        setInteriorFrom(sceneId);
        setFocus({ x: hotspot.x, y: hotspot.y });
        later(() => {
          setInteriorId(next);
          setPhase("interior");
        }, 760);
      }
    },
    [goScene, later, sceneId],
  );

  const backToCity = useCallback(() => {
    const from = interiorFrom ?? (interiorId ? INTERIORS[interiorId].from : sceneId);
    setInteriorLeaving(true);
    later(() => {
      setPhase("city");
      setInteriorId(null);
      setInteriorFrom(null);
      setSceneId(from);
      setFocus(null);
    }, 320);
    later(() => setInteriorLeaving(false), 900);
  }, [interiorFrom, interiorId, sceneId, later]);

  const interior = interiorId ? INTERIORS[interiorId] : null;

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink">
      <CityStage
        scene={SCENES[sceneId]}
        focus={focus}
        hidden={phase === "interior" || veil}
        onSelect={onSelect}
      />

      <CityHud sceneId={sceneId} onGo={goScene} dim={phase !== "city"} />

      {phase === "interior" && interior && (
        <div
          className="absolute inset-0 z-30 animate-soft-rise transition-opacity duration-300"
          style={{
            opacity: interiorLeaving ? 0 : 1,
            pointerEvents: interiorLeaving ? "none" : "auto",
          }}
        >
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
