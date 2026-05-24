/**
 * Expanded brand-book content — the sections beyond the core guide.
 *
 * Mirrors the section structure of the Figma brand guide book
 * (file bo3PrMRRjIgZATKME6knTe): Vision, Brand positioning, Brandfeel /
 * keywords, Imagery, Iconography & graphic elements, Layout & grid, and
 * Co-branding. Keyed by product id from `products.ts`.
 *
 * Each product supplies its unique strategy (vision, positioning, keywords,
 * imagery) and inherits shared CODED-system rules for iconography, layout,
 * and co-branding unless it overrides them.
 */

export type BrandExtras = {
  vision: string;
  positioning: string;
  /** Brandfeel — the words the brand should feel like. */
  keywords: string[];
  imagery: {
    style: string;
    dos: string[];
    donts: string[];
  };
  iconography: {
    style: string;
    motifs: string[];
  };
  layout: {
    grid: string;
    spacing: string;
    principles: string[];
  };
  coBranding: {
    rule: string;
    clearSpace: string;
    notes: string[];
  };
};

type BrandExtrasInput = Partial<BrandExtras> &
  Pick<BrandExtras, "vision" | "positioning" | "keywords" | "imagery">;

/* ---- Shared CODED-system defaults ---- */

const SHARED_ICONOGRAPHY: BrandExtras["iconography"] = {
  style:
    "Line icons drawn on a 24px grid with a 1.6px stroke, round caps and round joins. Single-weight, no fills — icons read as engineering schematics, not illustrations.",
  motifs: [
    "Square bracket [ ] — the CODED signature, used as an eyebrow and frame",
    "Monospace tags and node references for a build / terminal feel",
    "Dot grid for quiet background texture",
    "Radial glow behind a single focal element",
  ],
};

const SHARED_LAYOUT: BrandExtras["layout"] = {
  grid:
    "12-column grid, 1400px max content width, 24px gutters. Cards use a 16px radius; heroes 24px.",
  spacing:
    "8px base unit. Stack rhythm runs 8 / 12 / 16 / 24 / 40 / 64. Section breaks use 56–64px of vertical space.",
  principles: [
    "Lead with whitespace — let one element own each screen.",
    "Left-align long reading; centre only ceremonial covers.",
    "Tight tracking on display type (-0.01em), normal on body.",
    "One accent moment per view — don't compete with yourself.",
  ],
};

const SHARED_COBRANDING: BrandExtras["coBranding"] = {
  rule:
    "When CODED appears beside a partner mark, the two sit on a shared baseline separated by a thin vertical divider. Neither mark is scaled to dominate — match optical height, not bounding box.",
  clearSpace:
    "Keep at least one CODED mark-height between the divider and either logo. Never overlap the partner mark with the glow or pattern.",
  notes: [
    "CODED master mark leads on CODED-hosted surfaces; the partner leads on partner-hosted surfaces.",
    "Use the reversed CODED mark on dark partner backgrounds, primary on light.",
    "See the Sponsors module for full partner-tier lockups and exclusions.",
  ],
};

const RAW: Record<string, BrandExtrasInput> = {
  coded: {
    vision:
      "Become the most trusted name in technology education across the GCC — the institution a serious learner, employer, or government thinks of first.",
    positioning:
      "For ambitious learners and the organisations that hire them, CODED is the academy that runs production-grade programs — not lectures about code, but the practice of building it. We sit between a university (too slow, too theoretical) and a tutorial (too shallow) and own the ground in between.",
    keywords: ["Confident", "Technical", "Grown-up", "Trusted", "Precise", "Quiet"],
    imagery: {
      style:
        "Real people building — hands on keyboards, screens with real code, classrooms mid-session. Cool, true-to-life colour grade anchored on navy. Never staged stock handshakes.",
      dos: [
        "Shoot real cohorts and real workspaces.",
        "Favour candid, in-the-moment frames over posed portraits.",
        "Add a navy or white scrim when placing the logo over a photo.",
      ],
      donts: [
        "Don't use generic 'tech' stock (glowing brains, binary rain).",
        "Don't oversaturate or apply heavy filters.",
        "Don't crop faces awkwardly or hide the work being done.",
      ],
    },
  },

  "ai-app-developer": {
    vision:
      "Be the program engineers point to when someone asks where to learn to build real AI products — not prompt tricks, but shipped systems.",
    positioning:
      "For working engineers who already ship software, AI App Developer is the program that turns model curiosity into production capability — eval loops, retrieval, tool use, and deploys that survive contact with users.",
    keywords: ["Luminous", "Awake", "Technical", "Curious", "Cutting-edge"],
    imagery: {
      style:
        "Dark-glass UI, console glows, agent / graph diagrams, terminal output. Teal-and-cyan light on near-black. Abstract where photography would feel staged.",
      dos: [
        "Show real interfaces, eval dashboards, and architecture diagrams.",
        "Let cyan glow emanate from a single focal point.",
        "Pair code snippets (Plex / JetBrains Mono) with the imagery.",
      ],
      donts: [
        "Don't use humanoid-robot clichés.",
        "Don't put glow on light backgrounds — it dies.",
        "Don't mix in unrelated program accents.",
      ],
    },
    iconography: {
      style:
        "Same 24px line system as the master, but accents glow cyan on dark surfaces. Nodes and edges are a recurring motif.",
      motifs: [
        "Node-and-edge agent graphs",
        "Glowing cyan focal ring",
        "Monospace tags / tokens",
        "Dot grid on near-black",
      ],
    },
  },

  "data-science": {
    vision:
      "Produce data practitioners the region's teams actually trust with a model in production — not just a notebook.",
    positioning:
      "For analysts and engineers moving into ML, Data Science Bootcamp is the program built around the full lifecycle — cleaning, modelling, evaluation, and the dashboards stakeholders open — taught with the rigor of a working data team.",
    keywords: ["Analytical", "Rigorous", "Calm", "Clear", "Evidence-led"],
    imagery: {
      style:
        "Clean data visualisation, notebooks, charts with a single purple accent. Lots of white space; the data is the hero, not decoration.",
      dos: [
        "Use real (or realistic) charts and model outputs.",
        "Keep one accent — purple — per visualisation.",
        "Leave generous margins so figures breathe.",
      ],
      donts: [
        "Don't rainbow-colour a single chart.",
        "Don't use purple for body text or large fills.",
        "Don't fake implausible 'up-and-to-the-right' graphs.",
      ],
    },
  },

  cybersecurity: {
    vision:
      "Train defenders and breakers the region's security teams want to hire — people who understand both sides of the wire.",
    positioning:
      "For engineers and IT professionals entering security, Cybersecurity Bootcamp is the program that teaches blue and red together — defence that anticipates the attack, offence that respects the defence.",
    keywords: ["Vigilant", "Two-sided", "Serious", "Quiet", "Exact"],
    imagery: {
      style:
        "Midnight gradients, terminal output, network and topology diagrams. Blue-team frames stay calm; red-team frames carry one urgent red accent.",
      dos: [
        "Use terminal and SOC-style imagery grounded in real tools.",
        "Signal the side — blue for defence, red for offence.",
        "Keep red rare and meaningful.",
      ],
      donts: [
        "Don't use hacker-in-a-hoodie clichés.",
        "Don't flood a layout with red — it stops meaning 'alert'.",
        "Don't mix blue-team and red-team accents as primary in one frame.",
      ],
    },
    iconography: {
      style:
        "24px line icons with a security vocabulary — shields, locks, nodes — on the midnight surface. Mono labels for indicators.",
      motifs: [
        "Shield mark",
        "Network topology nodes",
        "Terminal / command prompt",
        "Blue vs. red split",
      ],
    },
  },

  "full-stack": {
    vision:
      "Become CODED's flagship route from zero to a deployed, full-stack product the learner owns end to end.",
    positioning:
      "(Draft) For builders who want the whole stack, Full Stack is the program that runs from web fundamentals to a production deploy — currently riding the CODED master identity while its own brand is in development.",
    keywords: ["Pragmatic", "Builder-first", "Modern", "Draft"],
    imagery: {
      style:
        "Until the dedicated identity ships, use CODED master imagery — real builders, navy grade, candid workspaces.",
      dos: [
        "Use master CODED photography and rules.",
        "Mark every surface 'draft' internally.",
      ],
      donts: [
        "Don't borrow another program's imagery as a stand-in.",
        "Don't publish externally before the identity is finalised.",
      ],
    },
  },

  "academy-x": {
    vision:
      "Be the partner-of-choice for executive and corporate technology education in the region.",
    positioning:
      "For executives and partner L&D teams, Academy-X is the premium, short-form program — focused, senior, and applied — that brings CODED's practice into the boardroom.",
    keywords: ["Premium", "Considered", "Concise", "Senior"],
    imagery: {
      style:
        "Restrained, editorial photography — boardrooms, one-to-one mentoring, partner sites. Purple accent used sparingly, never loud.",
      dos: [
        "Use polished but real partner and executive settings.",
        "Keep compositions calm and uncluttered.",
      ],
      donts: [
        "Don't use youthful or playful imagery.",
        "Don't combine coral and mint in the same frame.",
      ],
    },
  },

  "kuwait-codes": {
    vision:
      "Be the national front door to technology education in Kuwait — the platform a ministry, a university, and a parent all recognise.",
    positioning:
      "For Kuwait's public institutions and the next generation of Kuwaiti builders, Kuwait Innovation Group is the national initiative that turns a country's ambition into programs, partnerships, and pipelines.",
    keywords: ["Civic", "Optimistic", "Bilingual-first", "Ambitious", "National"],
    imagery: {
      style:
        "Kuwaiti people, places, and civic ambition on a deep-space canvas. Bilingual captions. One accent colour per composition.",
      dos: [
        "Centre Kuwaiti faces, landmarks, and institutions.",
        "Caption bilingually with equal weight.",
        "Add a deep-space scrim under the lockup on photos.",
      ],
      donts: [
        "Don't use non-local generic stock.",
        "Don't shrink the Arabic as if it were a translation.",
        "Don't stack more than three accent colours.",
      ],
    },
    layout: {
      grid:
        "12-column grid that mirrors cleanly for RTL Arabic layouts. 1400px max width, 24px gutters.",
      spacing:
        "8px base unit. Bilingual stacks add 0.5× extra space between the Arabic and English lines.",
      principles: [
        "Design RTL and LTR as equals — mirror, don't bolt on.",
        "Deep Space is the canvas; Sky is the civic anchor.",
        "One accent per composition.",
        "Lead bilingual; English-only is for international audiences.",
      ],
    },
  },

  unicode: {
    vision:
      "Be the most welcoming serious on-ramp into software for people starting from zero.",
    positioning:
      "For high-school graduates and career switchers, Unicode is the bridge program that takes someone with no code to a hireable junior developer — plain-spoken, encouraging, and genuinely rigorous.",
    keywords: ["Warm", "Encouraging", "Plain-spoken", "Serious", "Accessible"],
    imagery: {
      style:
        "Approachable, bright, beginner-positive — first lines of code, small wins, supportive peers. Navy base with a single warm orange accent.",
      dos: [
        "Show beginners succeeding and supported.",
        "Keep one orange accent as the warm moment.",
        "Favour clear, well-lit, friendly frames.",
      ],
      donts: [
        "Don't use intimidating 'elite engineer' imagery.",
        "Don't background whole frames in orange.",
      ],
    },
  },

  "coded-juniors": {
    vision:
      "Be the brand parents and schools trust to give children a joyful, safe first relationship with code.",
    positioning:
      "For children 8–14 and the adults who guide them, CODED Juniors is the program built around how kids actually learn — play first, confidence always, fundamentals underneath the fun.",
    keywords: ["Playful", "Bright", "Safe", "Joyful", "Confident"],
    imagery: {
      style:
        "Bright, joyful, age-appropriate — children building and laughing, bold flat colour shapes on white. Always parent-safe.",
      dos: [
        "Show real kids engaged and delighted.",
        "Use big, bold colour shapes on a white canvas.",
        "Keep every frame parent-safe and inclusive.",
      ],
      donts: [
        "Don't use dark, moody, or 'serious-tech' imagery.",
        "Don't place brights on brights — separate with white.",
        "Don't put logos on photos; keep them on flat colour.",
      ],
    },
    iconography: {
      style:
        "Rounded, chunky icons (≥2px stroke, generous corner radius) in the bright palette — friendly and immediately readable for young learners.",
      motifs: [
        "Rounded character chips per colour",
        "Big friendly shapes",
        "Playful stickers and badges",
        "Thick rounded strokes",
      ],
    },
    layout: {
      grid:
        "Generous, forgiving grid — fewer columns, bigger touch targets. 16–20px radii everywhere.",
      spacing:
        "12px base unit (larger than the master) for breathing room and bigger tap areas. Body type set one step up.",
      principles: [
        "Lead with white; brights are bold shapes on a calm canvas.",
        "Bigger type, bigger targets — built for younger readers.",
        "Rounded everything; nothing sharp.",
        "Joy first, then the lesson.",
      ],
    },
  },
};

export function getBrandExtras(productId: string): BrandExtras | undefined {
  const raw = RAW[productId];
  if (!raw) return undefined;
  return {
    vision: raw.vision,
    positioning: raw.positioning,
    keywords: raw.keywords,
    imagery: raw.imagery,
    iconography: raw.iconography ?? SHARED_ICONOGRAPHY,
    layout: raw.layout ?? SHARED_LAYOUT,
    coBranding: raw.coBranding ?? SHARED_COBRANDING,
  };
}
