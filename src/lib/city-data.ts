import sceneStreet from "@/assets/scene-street.jpg";
import scenePlaza from "@/assets/scene-plaza.jpg";
import sceneFeatures from "@/assets/scene-features.jpg";
import sceneEcosystem from "@/assets/scene-ecosystem.jpg";
import sceneBridge from "@/assets/scene-bridge.jpg";
import sceneBuilders from "@/assets/scene-builders.jpg";
import inActor from "@/assets/in-actor.jpg";
import inDelayed from "@/assets/in-delayed.jpg";
import inGasless from "@/assets/in-gasless.jpg";
import inWasm from "@/assets/in-wasm.jpg";
import inVaraEth from "@/assets/in-varaeth.jpg";
import inRivrdex from "@/assets/in-rivrdex.jpg";
import inSmartcup from "@/assets/in-smartcup.jpg";
import inGrowstreams from "@/assets/in-growstreams.jpg";
import inPolybaskets from "@/assets/in-polybaskets.jpg";
import inFaucet from "@/assets/in-faucet.jpg";
import inGovernance from "@/assets/in-governance.jpg";
import inSkills from "@/assets/in-skills.jpg";

export type Destination = { kind: "scene"; id: SceneId } | { kind: "interior"; id: InteriorId };

export type Hotspot = {
  id: string;
  label: string;
  hint: string;
  /** position of the signboard, in % of the scene artwork */
  x: number;
  y: number;
  to: Destination;
};

export type SceneId = "street" | "plaza" | "features" | "ecosystem" | "bridge" | "builders";

export type Scene = {
  id: SceneId;
  name: string;
  image: string;
  caption: string;
  banner?: { title: string; sub: string; x: number; y: number };
  hotspots: Hotspot[];
};

export const SCENES: Record<SceneId, Scene> = {
  street: {
    id: "street",
    name: "Main Street",
    image: sceneStreet,
    caption: "Main Street",
    banner: { title: "Vara City", sub: "Explore. Learn. Build.", x: 42, y: 25 },
    hotspots: [
      {
        id: "to-features",
        label: "Feature Street",
        hint: "Actor model, delayed messages, WASM",
        x: 13,
        y: 62,
        to: { kind: "scene", id: "features" },
      },
      {
        id: "to-plaza",
        label: "Vara Plaza",
        hint: "The city's centre",
        x: 54,
        y: 60,
        to: { kind: "scene", id: "plaza" },
      },
      {
        id: "to-ecosystem",
        label: "Ecosystem Street",
        hint: "Four projects built on Vara",
        x: 86,
        y: 62,
        to: { kind: "scene", id: "ecosystem" },
      },
      {
        id: "to-builders",
        label: "Builders Street",
        hint: "Faucet, governance, full-stack skills",
        x: 68,
        y: 40,
        to: { kind: "scene", id: "builders" },
      },
    ],
  },
  plaza: {
    id: "plaza",
    name: "Vara Plaza",
    image: scenePlaza,
    caption: "Vara Plaza",
    banner: { title: "Vara Plaza", sub: "Pick a direction", x: 50, y: 16 },
    hotspots: [
      {
        id: "plaza-features",
        label: "Features",
        hint: "Feature Street",
        x: 11,
        y: 47,
        to: { kind: "scene", id: "features" },
      },
      {
        id: "plaza-ecosystem",
        label: "Ecosystem",
        hint: "Ecosystem Street",
        x: 88,
        y: 44,
        to: { kind: "scene", id: "ecosystem" },
      },
      {
        id: "plaza-varaeth",
        label: "Vara.eth",
        hint: "The Ethereum bridge landmark",
        x: 68,
        y: 74,
        to: { kind: "scene", id: "bridge" },
      },
      {
        id: "plaza-street",
        label: "Main Street",
        hint: "Back to the entrance",
        x: 30,
        y: 78,
        to: { kind: "scene", id: "street" },
      },
      {
        id: "plaza-builders",
        label: "Builders Street",
        hint: "Start building for free",
        x: 50,
        y: 34,
        to: { kind: "scene", id: "builders" },
      },
    ],
  },
  features: {
    id: "features",
    name: "Feature Street",
    image: sceneFeatures,
    caption: "Feature Street",
    banner: { title: "Feature Street", sub: "One building, one idea", x: 50, y: 14 },
    hotspots: [
      {
        id: "b-actor",
        label: "Actor Model",
        hint: "Programs that message each other",
        x: 9,
        y: 70,
        to: { kind: "interior", id: "actor" },
      },
      {
        id: "b-delayed",
        label: "Delayed Messages",
        hint: "Work scheduled for later",
        x: 32,
        y: 70,
        to: { kind: "interior", id: "delayed" },
      },
      {
        id: "b-wasm",
        label: "Wasm Lab",
        hint: "Where programs are compiled",
        x: 53,
        y: 71,
        to: { kind: "interior", id: "wasm" },
      },
      {
        id: "b-gasless",
        label: "Gasless / Signless",
        hint: "Vouchers and sessions",
        x: 72,
        y: 71,
        to: { kind: "interior", id: "gasless" },
      },
      {
        id: "b-varaeth",
        label: "Vara.eth",
        hint: "High-performance apps on Ethereum",
        x: 92,
        y: 72,
        to: { kind: "interior", id: "varaeth" },
      },
    ],
  },
  ecosystem: {
    id: "ecosystem",
    name: "Ecosystem Street",
    image: sceneEcosystem,
    caption: "Ecosystem Street",
    banner: { title: "Vara Ecosystem", sub: "Real projects, real doors", x: 50, y: 14 },
    hotspots: [
      {
        id: "s-rivrdex",
        label: "RivrDEX",
        hint: "Exchange",
        x: 16,
        y: 36,
        to: { kind: "interior", id: "rivrdex" },
      },
      {
        id: "s-smartcup",
        label: "SmartCup League",
        hint: "Competition",
        x: 39,
        y: 36,
        to: { kind: "interior", id: "smartcup" },
      },
      {
        id: "s-growstreams",
        label: "GrowStreams",
        hint: "Streaming payments",
        x: 61,
        y: 36,
        to: { kind: "interior", id: "growstreams" },
      },
      {
        id: "s-polybaskets",
        label: "PolyBaskets",
        hint: "Thematic baskets",
        x: 84,
        y: 36,
        to: { kind: "interior", id: "polybaskets" },
      },
    ],
  },
  bridge: {
    id: "bridge",
    name: "The Ethereum Bridge",
    image: sceneBridge,
    caption: "The Ethereum Bridge",
    banner: { title: "Vara ⟷ Ethereum", sub: "One landmark, no crossing required", x: 50, y: 20 },
    hotspots: [
      {
        id: "bridge-varaeth",
        label: "Vara.eth",
        hint: "What this landmark stands for",
        x: 50,
        y: 70,
        to: { kind: "interior", id: "varaeth" },
      },
      {
        id: "bridge-plaza",
        label: "Vara Plaza",
        hint: "Back to the centre",
        x: 14,
        y: 76,
        to: { kind: "scene", id: "plaza" },
      },
    ],
  },
  builders: {
    id: "builders",
    name: "Builders Street",
    caption: "Builders Street",
    image: sceneBuilders,
    banner: { title: "Builders Street", sub: "Zero up-front cost", x: 50, y: 12 },
    hotspots: [
      {
        id: "b-faucet",
        label: "The Faucet",
        hint: "100 VARA to start building",
        x: 23,
        y: 42,
        to: { kind: "interior", id: "faucet" },
      },
      {
        id: "b-governance",
        label: "Referendum Hall",
        hint: "Have a real say in where Vara goes",
        x: 50,
        y: 39,
        to: { kind: "interior", id: "governance" },
      },
      {
        id: "b-skills",
        label: "Skills Workshop",
        hint: "Full dApp stack, one prompt",
        x: 84,
        y: 33,
        to: { kind: "interior", id: "skills" },
      },
      {
        id: "builders-plaza",
        label: "Vara Plaza",
        hint: "Back to the centre",
        x: 33,
        y: 88,
        to: { kind: "scene", id: "plaza" },
      },
    ],
  },
};

export type InteriorId =
  | "actor"
  | "delayed"
  | "gasless"
  | "wasm"
  | "varaeth"
  | "rivrdex"
  | "smartcup"
  | "growstreams"
  | "polybaskets"
  | "faucet"
  | "governance"
  | "skills";

export type Interior = {
  id: InteriorId;
  title: string;
  subtitle: string;
  body: string;
  flow: [string, string, string];
  points: string[];
  cta: { label: string; href: string };
  image: string;
  from: SceneId;
  badge?: string;
};

export const INTERIORS: Record<InteriorId, Interior> = {
  actor: {
    id: "actor",
    title: "Actor Model",
    subtitle: "Isolated programs, connected by messages",
    body: "Vara programs work as independent actors. Each keeps its own state and communicates with others only by sending and handling messages.",
    flow: ["Actor A", "Message", "Actor B"],
    points: [
      "Every actor owns its state — nothing is shared behind the scenes.",
      "Communication is asynchronous message passing.",
      "Actors can be programs or users of the network.",
    ],
    cta: { label: "Read docs", href: "https://wiki.vara.network/docs/gear/actor-model" },
    image: inActor,
    from: "features",
  },
  delayed: {
    id: "delayed",
    title: "Delayed Messages",
    subtitle: "Send it now, run it later",
    body: "A Vara program can schedule a message to be executed later, which lets logic continue without anyone pressing a button.",
    flow: ["Now", "Schedule", "Later"],
    points: [
      "Scheduled actions and automated state transitions.",
      "Cooldowns between moves.",
      "Timeouts when nobody responds.",
    ],
    cta: {
      label: "Learn more",
      href: "https://wiki.vara.network/docs/developing/build/gstd/delayed-messages",
    },
    image: inDelayed,
    from: "features",
  },
  gasless: {
    id: "gasless",
    title: "Gasless / Signless",
    subtitle: "Fewer steps between a person and a program",
    body: "Vara supports gasless interactions through mechanisms such as vouchers, and signless, session-based interaction patterns. This is something an application enables — not every transaction on Vara is automatically gasless.",
    flow: ["User", "App", "Vara program"],
    points: [
      "A voucher lets an application cover a user's fees for specific interactions.",
      "Signless sessions let an app act for a user for a limited time and scope.",
      "Both are opt-in patterns chosen by the application.",
    ],
    cta: {
      label: "Read docs",
      href: "https://wiki.vara.network/docs/vara-network/about/features/gassignless",
    },
    image: inGasless,
    from: "features",
  },
  wasm: {
    id: "wasm",
    title: "Wasm Lab",
    subtitle: "Where source becomes a program",
    body: "Vara programs run in a WebAssembly environment. Gear-based programs can be compiled from languages including Rust, C and C++.",
    flow: ["Code", "Wasm", "Vara program"],
    points: [
      "WebAssembly gives programs a fast, portable execution target.",
      "Rust, C and C++ can all be compiled to Wasm programs.",
      "Programs are uploaded and then run on the network.",
    ],
    cta: { label: "Build with Vara", href: "https://wiki.vara.network/docs/vara-network" },
    image: inWasm,
    from: "features",
  },
  varaeth: {
    id: "varaeth",
    title: "Vara.eth",
    subtitle: "High-performance applications on Ethereum",
    body: "Vara.eth brings high-performance execution directly into Ethereum's ecosystem — a bridgeless application platform rather than a separate chain.",
    flow: ["Ethereum", "Vara.eth", "Wasm programs"],
    points: [
      "Parallel execution and pre-confirmations for responsive applications.",
      "Reverse gas, so applications can carry the cost of their own logic.",
      "No new chain and no liquidity fragmentation.",
    ],
    cta: {
      label: "Explore Vara.eth",
      href: "https://wiki.vara.network/docs/vara-eth/start-here/what-is-vara-eth",
    },
    image: inVaraEth,
    from: "features",
  },
  rivrdex: {
    id: "rivrdex",
    title: "RivrDEX",
    subtitle: "Permissionless, non-custodial exchange",
    body: "RivrDEX describes itself as a permissionless, non-custodial decentralized exchange on Vara Network, with near-gasless token swaps, liquidity pools and permissionless market creation.",
    flow: ["Swap", "Pool", "Market"],
    points: [
      "Near-gasless token swaps on Vara Network.",
      "Liquidity pools open to anyone.",
      "Permissionless creation of trading pairs.",
    ],
    cta: { label: "Visit RivrDEX", href: "https://rivrdex.io/" },
    image: inRivrdex,
    from: "ecosystem",
    badge: "Built on Vara",
  },
  smartcup: {
    id: "smartcup",
    title: "SmartCup League",
    subtitle: "Live on Vara Mainnet",
    body: "SmartCup League is live on Vara Mainnet, as announced by Vara Network. Visit the project site for the current details of how it plays.",
    flow: ["Join", "Play", "Compete"],
    points: [
      "Announced live on Vara Mainnet by Vara Network.",
      "A competition-style application in the Vara ecosystem.",
      "The official site is the source of truth for how it works.",
    ],
    cta: { label: "Visit SmartCup", href: "https://smartcupleague.com/" },
    image: inSmartcup,
    from: "ecosystem",
    badge: "Built on Vara",
  },
  growstreams: {
    id: "growstreams",
    title: "GrowStreams",
    subtitle: "Per-second token streaming on Vara",
    body: "GrowStreams describes itself as a generalized token streaming protocol on Vara, with per-second payments for bounties, payroll, subscriptions, revenue share and grants.",
    flow: ["Open stream", "Per second", "Received"],
    points: [
      "Payments that flow continuously instead of in lumps.",
      "Bounties, payroll, subscriptions, revenue share and grants.",
      "Token-agnostic and composable, per the project.",
    ],
    cta: { label: "Visit GrowStreams", href: "https://growstreams.xyz/" },
    image: inGrowstreams,
    from: "ecosystem",
    badge: "Built on Vara",
  },
  polybaskets: {
    id: "polybaskets",
    title: "PolyBaskets",
    subtitle: "Thematic indexes for prediction markets",
    body: "PolyBaskets lets people bundle prediction markets into weighted, thematic indexes — trading a whole theme and following transparent, agent-managed strategies.",
    flow: ["Markets", "Basket", "Strategy"],
    points: [
      "Weighted baskets built from prediction markets.",
      "Trade a complete theme instead of single markets.",
      "Transparent strategies, human- or agent-managed.",
    ],
    cta: { label: "Visit PolyBaskets", href: "https://polybaskets.xyz/" },
    image: inPolybaskets,
    from: "ecosystem",
    badge: "Built on Vara",
  },
  faucet: {
    id: "faucet",
    title: "The Faucet",
    subtitle: "Building on Vara mainnet is free",
    body: "Take 100 VARA from the faucet, deploy a program, then cover your users' gas with vouchers — and ship an app people can actually use. Zero up-front cost.",
    flow: ["100 VARA", "Deploy", "Ship"],
    points: [
      "100 VARA from the faucet to get started.",
      "Deploy a program straight to Vara mainnet.",
      "Vouchers let your app cover your users' gas.",
    ],
    cta: { label: "Open Gear IDEA", href: "https://idea.gear-tech.io" },
    image: inFaucet,
    from: "builders",
    badge: "Zero up-front cost",
  },
  governance: {
    id: "governance",
    title: "Referendum Hall",
    subtitle: "A real say in where Vara goes",
    body: "97.6% of the community want a real say in Vara's direction — 43.9% on everything, 53.7% on the big decisions. So the question becomes concrete: if a referendum went live on Vara, what should it be about?",
    flow: ["Propose", "Community vote", "On-chain referendum"],
    points: [
      "Reply with one line: TOPIC — why it matters.",
      "The strongest proposals go to a community vote.",
      "Winners get drafted as real, on-chain referenda.",
    ],
    cta: { label: "Open SubSquare", href: "http://vara.subsquare.io" },
    image: inGovernance,
    from: "builders",
  },
  skills: {
    id: "skills",
    title: "Skills Workshop",
    subtitle: "Vara skills cover the full dApp stack",
    body: "Contract. Frontend. Wallet. Tokens. Indexer. One agent, one prompt, full stack — the Vara skills repository gives an agent everything it needs to build across the whole stack.",
    flow: ["One prompt", "One agent", "Full stack"],
    points: [
      "Contract, frontend and wallet covered together.",
      "Tokens and indexer included in the same stack.",
      "Open source on GitHub, ready for your agent.",
    ],
    cta: { label: "View vara-skills", href: "https://github.com/gear-foundation/vara-skills" },
    image: inSkills,
    from: "builders",
  },
};
