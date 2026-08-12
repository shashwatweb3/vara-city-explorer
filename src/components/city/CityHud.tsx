import { SCENES, type SceneId } from "@/lib/city-data";
import { VaraMark } from "./VaraMark";

const ROUTE: SceneId[] = ["street", "plaza", "features", "ecosystem", "bridge"];

export function CityHud({
  sceneId,
  onGo,
  dim,
}: {
  sceneId: SceneId;
  onGo: (id: SceneId) => void;
  dim: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
      style={{ opacity: dim ? 0 : 1 }}
    >
      <div className="pointer-events-auto absolute left-4 top-4 flex items-center gap-2 sm:left-7 sm:top-6">
        <VaraMark className="h-5 w-5 text-primary" />
        <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-foreground">
          Vara City
        </span>
      </div>

      <nav
        aria-label="Vara links"
        className="pointer-events-auto absolute right-4 top-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-foreground/70 sm:right-7 sm:top-6"
      >
        <a href="https://vara.network/" target="_blank" rel="noreferrer noopener" className="hover:text-primary">
          Vara
        </a>
        <a href="https://wiki.vara.network/" target="_blank" rel="noreferrer noopener" className="hover:text-primary">
          Docs
        </a>
        <a href="https://eth.vara.network/" target="_blank" rel="noreferrer noopener" className="hover:text-primary">
          Eth
        </a>
      </nav>

      <nav
        aria-label="Places in Vara City"
        className="pointer-events-auto absolute bottom-5 left-4 flex flex-wrap gap-x-4 gap-y-2 pr-24 sm:left-7 sm:bottom-7"
      >
        {ROUTE.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onGo(id)}
            aria-current={id === sceneId ? "true" : undefined}
            className={`font-display text-[10px] font-bold uppercase tracking-[0.24em] transition-colors ${
              id === sceneId ? "text-primary" : "text-foreground/55 hover:text-foreground"
            }`}
          >
            {SCENES[id].caption}
          </button>
        ))}
      </nav>

      <p className="absolute bottom-5 right-4 text-[10px] uppercase tracking-[0.32em] text-foreground/45 sm:bottom-7 sm:right-7">
        Explore
      </p>
    </div>
  );
}