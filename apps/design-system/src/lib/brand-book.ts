/**
 * Per-product brand-book content.
 *
 * The colors live in src/brand.json; everything here is the rest of the
 * guideline — identity, typography, logo system, usage rules, applications,
 * and tone of voice. Keyed by product id from `products.ts`.
 *
 * Source: Figma — CODED Brand guide book (file bo3PrMRRjIgZATKME6knTe).
 */

export type TypeScaleEntry = {
  name: string;
  size: string;
  lineHeight: string;
  usage: string;
};

export type BrandBookEntry = {
  identity: {
    intro: string;
    mission: string;
    audience: string;
    personality: string[];
  };
  typography: {
    primary: { family: string; weights: string; usage: string };
    secondary?: { family: string; weights: string; usage: string };
    scale: TypeScaleEntry[];
  };
  logo: {
    primaryMark: string;
    variants: { name: string; usage: string }[];
    clearSpace: string;
    minSize: string;
    background: { surface: string; allowed: boolean; note: string }[];
  };
  usage: {
    dos: string[];
    donts: string[];
  };
  applications: {
    title: string;
    description: string;
    surface: "dark" | "light" | "accent";
  }[];
  voice?: { word: string; meaning: string }[];
};

const SHARED_TYPOGRAPHY = {
  primary: {
    family: "Neufile Grotesk",
    weights: "Regular · Medium · Bold · Black",
    usage: "All CODED-brand display, body, and UI copy. Default tracking is tight (-0.01em).",
  },
  secondary: {
    family: "IBM Plex Sans Arabic",
    weights: "Regular · Medium · Bold",
    usage: "Arabic counterpart for bilingual layouts. Pair 1:1 with Neufile.",
  },
};

const DEFAULT_SCALE: TypeScaleEntry[] = [
  { name: "Display", size: "56 / 72", lineHeight: "1.05", usage: "Hero, full-page titles. Use sparingly." },
  { name: "H1", size: "36 / 44", lineHeight: "1.1", usage: "Page titles." },
  { name: "H2", size: "24 / 28", lineHeight: "1.2", usage: "Section headers." },
  { name: "Body", size: "15 / 16", lineHeight: "1.55", usage: "Primary reading text." },
  { name: "Caption", size: "12 / 12.5", lineHeight: "1.4", usage: "Meta, eyebrows, labels." },
];

export const brandBooks: Record<string, BrandBookEntry> = {
  /* ------------------------------------------------------------------ */
  coded: {
    identity: {
      intro:
        "CODED is the parent academy — the constant that anchors every program. The master brand reads as confident, technical, and grown-up. It carries weight on its own and recedes politely when a program needs to lead.",
      mission:
        "Train the next generation of builders across the GCC by running serious, modern, production-grade programs in software, data, AI, and security.",
      audience:
        "Career-switchers, recent graduates, partners, sponsors, governments, and the press. Anyone who needs to trust the institution before they look at a course.",
      personality: ["Confident", "Technical", "Grown-up", "Quiet", "Precise"],
    },
    typography: {
      ...SHARED_TYPOGRAPHY,
      scale: DEFAULT_SCALE,
    },
    logo: {
      primaryMark:
        "Square mark in Navy Blue + wordmark set in Neufile Bold. The square is the brand's unit of measure.",
      variants: [
        { name: "Primary lockup", usage: "Default on light surfaces — square + wordmark, navy on white." },
        { name: "Reversed", usage: "On navy/black surfaces — square + wordmark in white." },
        { name: "Mark only", usage: "Avatars, favicons, watermark corners — when the wordmark would be too small to read." },
        { name: "Wordmark only", usage: "Sponsor strips, footers, dense layouts — when the mark already appears nearby." },
      ],
      clearSpace: "Reserve one mark-height of clear space on every side. Nothing — not text, image, or another logo — enters this margin.",
      minSize: "Mark: 24px digital / 8mm print. Lockup: 96px digital / 24mm print.",
      background: [
        { surface: "Basic White", allowed: true, note: "Primary lockup." },
        { surface: "Navy Blue", allowed: true, note: "Reversed lockup." },
        { surface: "Brand Blue", allowed: true, note: "Reversed lockup only." },
        { surface: "Photography", allowed: true, note: "Only with sufficient contrast — add a navy or white scrim if needed." },
        { surface: "Program color", allowed: false, note: "Use the program's own master, not CODED's." },
      ],
    },
    usage: {
      dos: [
        "Lead with navy. Treat it as the anchor of every layout.",
        "Use Brand Blue for accent glows and decorative gradient pairs.",
        "Keep type left-aligned for long reading; centered only for ceremonial covers.",
        "Pair Neufile Grotesk Bold for headlines with Regular for body — no third weight in the same block.",
      ],
      donts: [
        "Don't rotate, stretch, or recolor the wordmark.",
        "Don't place CODED Navy on Cybersecurity Midnight or Kuwait Deep Space — contrast collapses.",
        "Don't use program accent colors as the master color on CODED-branded surfaces.",
        "Don't add drop shadows, bevels, or glow to the primary mark.",
      ],
    },
    applications: [
      { title: "Institutional deck", description: "Navy cover, white body, navy mark top-left.", surface: "dark" },
      { title: "Annual report", description: "White paper, navy ink, brand-blue chart accents.", surface: "light" },
      { title: "Partner one-pager", description: "Navy header band, white body, program colors as small chips only.", surface: "light" },
    ],
    voice: [
      { word: "Direct", meaning: "Short sentences. Subject-verb-object. No filler." },
      { word: "Earned", meaning: "Claims are backed by alumni outcomes, not adjectives." },
      { word: "Bilingual", meaning: "Arabic and English carry equal weight, never translated as an afterthought." },
    ],
  },

  /* ------------------------------------------------------------------ */
  "ai-app-developer": {
    identity: {
      intro:
        "AI App Developer is CODED's most forward-leaning program. The brand reads like a console — fluorescent teal on dark glass, glowing edges, code-adjacent. Where CODED master is institutional, AI App Developer is a workshop at 2am.",
      mission:
        "Take engineers who can ship a CRUD app and turn them into engineers who can ship a production agent — eval loops, tool use, retrieval, deploys.",
      audience: "Mid-level engineers and senior students who already write code and want to build AI products.",
      personality: ["Luminous", "Technical", "Curious", "Awake"],
    },
    typography: {
      ...SHARED_TYPOGRAPHY,
      scale: DEFAULT_SCALE,
    },
    logo: {
      primaryMark: "AI lockup on Stormy Teal field with a Strong Cyan glow ring.",
      variants: [
        { name: "Glow lockup", usage: "Dark surfaces, hero panels, social — default presentation." },
        { name: "Flat reversed", usage: "Print and small sizes where glow renders poorly." },
        { name: "Mark only", usage: "Avatars, IDE-style badges, watermarks." },
      ],
      clearSpace: "One mark-height of clear space, plus the glow halo (an extra 0.25× radius).",
      minSize: "Mark: 28px digital / 9mm print. Lockup: 112px digital.",
      background: [
        { surface: "Stormy Teal", allowed: true, note: "Default — primary lockup." },
        { surface: "Coded Navy", allowed: true, note: "Reversed with cyan accent only." },
        { surface: "Aquamarine", allowed: false, note: "Glow collapses — use flat reversed instead." },
        { surface: "Photography", allowed: true, note: "Only on dark or low-saturation imagery." },
      ],
    },
    usage: {
      dos: [
        "Treat Stormy Teal as the program's anchor surface. Light Sea Green is the primary, but it lives best on teal.",
        "Use Strong Cyan and Aquamarine for glow and detail — never as a body-text background.",
        "Pair monospace (JetBrains Mono) snippets with Neufile body for code-rich layouts.",
        "Animate slowly. Pulse glows, don't flicker.",
      ],
      donts: [
        "Don't use Aquamarine on white — it disappears.",
        "Don't combine more than two accents in the same composition.",
        "Don't apply gradients to text smaller than 32px.",
        "Don't pair with red teams' Cybersecurity red — it muddies the palette story.",
      ],
    },
    applications: [
      { title: "Course landing page", description: "Dark teal hero, cyan glow ring, agent-graph illustration.", surface: "dark" },
      { title: "Eval results dashboard", description: "Navy chrome, cyan data, teal as the accent column.", surface: "dark" },
      { title: "Demo day slide", description: "Black backdrop, lockup in glow, code snippet in Plex Mono.", surface: "dark" },
    ],
    voice: [
      { word: "Precise", meaning: "API-doc voice — exact, not breezy." },
      { word: "Confident", meaning: "We've shipped this. We're not guessing." },
      { word: "Code-fluent", meaning: "Drop a snippet when prose stalls." },
    ],
  },

  /* ------------------------------------------------------------------ */
  "data-science": {
    identity: {
      intro:
        "Data Science Bootcamp is the brand at its most analytical. A single purple primary against quiet greys — the palette of a notebook in dark mode, the rigor of a regression plot.",
      mission:
        "Turn analysts and engineers into practitioners who can ship deployed models — cleaning, modeling, evaluation, and the dashboards stakeholders actually open.",
      audience: "Analysts, engineers, and graduates moving into ML/data roles.",
      personality: ["Analytical", "Rigorous", "Calm", "Clear"],
    },
    typography: {
      ...SHARED_TYPOGRAPHY,
      scale: DEFAULT_SCALE,
    },
    logo: {
      primaryMark: "DS lockup in purple on white. On dark surfaces, the wordmark switches to white and the mark keeps its purple.",
      variants: [
        { name: "Primary", usage: "Default on white — purple mark + navy wordmark." },
        { name: "Reversed", usage: "Navy surfaces — white wordmark, purple mark." },
        { name: "Monochrome", usage: "When color reproduction can't be trusted — print on news stock, fax." },
      ],
      clearSpace: "One mark-height of clear space on every side.",
      minSize: "Mark: 24px digital. Lockup: 96px digital.",
      background: [
        { surface: "White", allowed: true, note: "Default." },
        { surface: "Navy", allowed: true, note: "Reversed." },
        { surface: "Purple", allowed: false, note: "Mark disappears into the surface." },
        { surface: "Photography", allowed: true, note: "On high-contrast scientific imagery only." },
      ],
    },
    usage: {
      dos: [
        "Lead with whitespace. The palette is small on purpose — let charts breathe.",
        "Use purple to pull the eye to a single moment in a layout (a CTA, a key insight).",
        "Use grey-soft gradients to separate sections without hard rules.",
        "When showing data, pick one accent — purple. Don't multi-color a single chart.",
      ],
      donts: [
        "Don't pair purple with teal or red in the same composition — it dilutes the data-mode identity.",
        "Don't use purple for body text.",
        "Don't add gradients to the purple mark — it's flat by design.",
      ],
    },
    applications: [
      { title: "Course syllabus", description: "White paper, navy headers, purple accent rule per module.", surface: "light" },
      { title: "Model card", description: "Soft-grey canvas, purple metric chip, navy body.", surface: "light" },
      { title: "Cohort announcement", description: "Navy background, purple mark, white headline.", surface: "dark" },
    ],
  },

  /* ------------------------------------------------------------------ */
  cybersecurity: {
    identity: {
      intro:
        "Cybersecurity Bootcamp lives on a midnight-to-navy gradient — a console at the end of a long shift. The palette splits intentionally: a calm Blue Team and an urgent Red Team, never on screen at the same time without reason.",
      mission:
        "Train defenders and breakers — SOC analysts, red-team operators, and the engineers who need to understand both.",
      audience: "Engineers, IT professionals, and graduates entering security roles.",
      personality: ["Vigilant", "Two-sided", "Serious", "Quiet"],
    },
    typography: {
      ...SHARED_TYPOGRAPHY,
      scale: DEFAULT_SCALE,
    },
    logo: {
      primaryMark: "Shield mark on midnight gradient. Wordmark in white Neufile Bold.",
      variants: [
        { name: "Blue Team", usage: "Defender-side materials — labs, SOC content, blue-team CTFs." },
        { name: "Red Team", usage: "Offensive-side materials — pentests, red-team CTFs, exploit walk-throughs." },
        { name: "Neutral", usage: "Program-wide communication — admissions, hero pages, syllabus." },
      ],
      clearSpace: "One shield-height of clear space.",
      minSize: "Shield: 28px digital. Lockup: 112px digital.",
      background: [
        { surface: "Midnight gradient", allowed: true, note: "Default — the brand surface." },
        { surface: "Deep Space", allowed: true, note: "Alt dark surface for split-team content." },
        { surface: "White", allowed: true, note: "Allowed for print invitations and certificates." },
        { surface: "Red Team red", allowed: false, note: "Reserved as accent only — not a logo surface." },
      ],
    },
    usage: {
      dos: [
        "Use the midnight gradient as your canvas — it's the visual identity, not a background.",
        "Pick a side. Blue or Red — never both as primary in the same layout.",
        "Reserve red for offensive content, alerts, or moments that genuinely need urgency.",
        "Use mono type for terminal snippets, command examples, and indicators.",
      ],
      donts: [
        "Don't use Red Team red as a brand-wide accent — it loses meaning.",
        "Don't use the lockup on photography unless you control the underlying image.",
        "Don't pair with Juniors brights — wrong audience, wrong tone.",
      ],
    },
    applications: [
      { title: "Course hero", description: "Midnight gradient canvas, shield top-left, white H1.", surface: "dark" },
      { title: "Blue-team lab card", description: "Navy surface, blue-team accent rule, terminal preview.", surface: "dark" },
      { title: "Red-team challenge", description: "Deep-space surface, red-team accent border, mono CTA.", surface: "dark" },
    ],
    voice: [
      { word: "Quiet", meaning: "Security speaks softly. Loud claims undermine credibility." },
      { word: "Exact", meaning: "We name the CVE, the version, the platform." },
      { word: "Two-sided", meaning: "Always acknowledge both defender and attacker context." },
    ],
  },

  /* ------------------------------------------------------------------ */
  "kuwait-codes": {
    identity: {
      intro:
        "Kuwait Innovation Group is the national initiative — a partner brand that lives on a deep-space canvas with a sky-blue civic anchor. It carries more visual weight than a single program because it speaks for a country, not a cohort.",
      mission:
        "Be Kuwait's national platform for technology education — a public-facing front door for partner ministries, universities, and the next generation of Kuwaiti builders.",
      audience: "Government partners, university leadership, parents, sponsors, national press.",
      personality: ["Civic", "Optimistic", "Bilingual-first", "Ambitious"],
    },
    typography: {
      ...SHARED_TYPOGRAPHY,
      scale: DEFAULT_SCALE,
    },
    logo: {
      primaryMark: "Kuwait Codes wordmark in Sky on Deep Space, accompanied by the bilingual Arabic lockup.",
      variants: [
        { name: "Bilingual lockup", usage: "Default — Arabic + English stacked or side-by-side." },
        { name: "English only", usage: "International press, partner co-branding strips." },
        { name: "Arabic only", usage: "Domestic ministry communications." },
      ],
      clearSpace: "One wordmark-height of clear space on every side, plus an additional 0.5× below the bilingual line.",
      minSize: "Lockup: 112px digital. Bilingual: 144px digital for legibility.",
      background: [
        { surface: "Deep Space", allowed: true, note: "Default canvas." },
        { surface: "Sky", allowed: true, note: "Reversed wordmark in Deep Space." },
        { surface: "Photography", allowed: true, note: "On Kuwaiti civic imagery only, with a Deep-Space scrim." },
      ],
    },
    usage: {
      dos: [
        "Treat Deep Space as the canvas. Sky is the civic anchor.",
        "Use Magenta/Purple/Cyan/Orange as small, deliberate accents — never together.",
        "Set Arabic in IBM Plex Sans Arabic at the same visual weight as the English Neufile pair.",
        "Lead with bilingual layouts. English-only versions are for international audiences only.",
      ],
      donts: [
        "Don't reduce the Arabic wordmark in size as if it were a translation.",
        "Don't combine more than three accent colors in one composition.",
        "Don't use the palette for unrelated CODED programs.",
      ],
    },
    applications: [
      { title: "National launch site", description: "Deep-space hero, bilingual headline, single accent strip.", surface: "dark" },
      { title: "Ministry one-pager", description: "Deep-space header, white body, accent chip per pillar.", surface: "dark" },
      { title: "Press release header", description: "Sky band, bilingual lockup, Deep-Space body.", surface: "accent" },
    ],
    voice: [
      { word: "National", meaning: "We speak as Kuwait, not as a vendor." },
      { word: "Bilingual", meaning: "Arabic and English are co-equal — never an afterthought." },
      { word: "Forward", meaning: "Always pointed at what comes next for the country." },
    ],
  },

  /* ------------------------------------------------------------------ */
  unicode: {
    identity: {
      intro:
        "Unicode is the bridge program — the on-ramp from high school or a non-technical background into serious software. The palette pairs CODED Navy with a single Unicode Orange — confident, warm, unambiguous.",
      mission:
        "Take a learner with no prior code and bring them to a hireable junior-developer level inside one program.",
      audience: "Recent high-school graduates and adult switchers entering tech for the first time.",
      personality: ["Warm", "Encouraging", "Plain-spoken", "Serious"],
    },
    typography: {
      ...SHARED_TYPOGRAPHY,
      scale: DEFAULT_SCALE,
    },
    logo: {
      primaryMark: "Unicode wordmark — Navy base, Orange accent letter.",
      variants: [
        { name: "Primary", usage: "On white — navy wordmark with orange accent." },
        { name: "Reversed", usage: "On navy — white wordmark with orange accent." },
        { name: "Mono orange", usage: "Single-color event print — orange on white only." },
      ],
      clearSpace: "One x-height of clear space.",
      minSize: "Lockup: 96px digital.",
      background: [
        { surface: "White", allowed: true, note: "Default." },
        { surface: "Navy", allowed: true, note: "Reversed." },
        { surface: "Orange", allowed: false, note: "Use navy or white instead — orange-on-orange disappears." },
      ],
    },
    usage: {
      dos: [
        "Use Orange sparingly — it's the moment, not the canvas.",
        "Pair plain navy with generous whitespace for application materials.",
        "Use Unicode Blue for secondary CTAs and link styles.",
        "Write copy at a 9th-grade reading level. Plain, encouraging, exact.",
      ],
      donts: [
        "Don't background entire sections in Orange.",
        "Don't combine Orange with Juniors Red — they compete and confuse the audience.",
      ],
    },
    applications: [
      { title: "Open-day banner", description: "Navy background, orange accent shape, white H1.", surface: "dark" },
      { title: "Application portal", description: "White surface, navy chrome, orange CTA.", surface: "light" },
      { title: "Cohort certificate", description: "White paper, navy header, single orange seal.", surface: "light" },
    ],
  },

  /* ------------------------------------------------------------------ */
  "academy-x": {
    identity: {
      intro:
        "Academy-X is the executive and partner program — short-form, senior-audience, premium. The palette leans into a confident purple with coral and mint as small, deliberate punctuation.",
      mission:
        "Deliver focused executive and corporate-partner programs: AI for leaders, governance, applied research collaborations.",
      audience: "Executives, partner-company L&D teams, senior contributors.",
      personality: ["Premium", "Considered", "Concise"],
    },
    typography: {
      ...SHARED_TYPOGRAPHY,
      scale: DEFAULT_SCALE,
    },
    logo: {
      primaryMark: "Academy-X wordmark on white or navy — purple-X accent.",
      variants: [
        { name: "Primary", usage: "Default — navy wordmark with purple X." },
        { name: "Reversed", usage: "On navy — white wordmark with purple X." },
      ],
      clearSpace: "One X-height of clear space.",
      minSize: "Lockup: 96px digital.",
      background: [
        { surface: "White", allowed: true, note: "Default." },
        { surface: "Navy", allowed: true, note: "Reversed." },
        { surface: "Purple", allowed: false, note: "Use white or navy — purple-on-purple flattens." },
      ],
    },
    usage: {
      dos: [
        "Use Coral and Mint as accents — one per layout, not both at once.",
        "Keep type confident and quiet — generous tracking, plenty of negative space.",
        "Treat the X as a typographic accent, not an ornament.",
      ],
      donts: [
        "Don't pair with Juniors brights or Cybersecurity red.",
        "Don't add gradients to the wordmark.",
      ],
    },
    applications: [
      { title: "Executive program brochure", description: "Navy cover, purple-X mark, coral accent rule.", surface: "dark" },
      { title: "Partner case study", description: "White paper, navy headers, mint metric chips.", surface: "light" },
    ],
  },

  /* ------------------------------------------------------------------ */
  "coded-juniors": {
    identity: {
      intro:
        "CODED Juniors is the youngest brand in the system — and on purpose, the loudest. A pure red primary with a full set of bright supporting colors, white surfaces, and rounded type rhythms. It must feel safe, joyful, and immediately readable to an 8-year-old.",
      mission:
        "Introduce coding fundamentals to children aged 8–14 through programs designed around their attention, their humor, and their parents' trust.",
      audience: "Children 8–14, their parents, schools, and after-school programs.",
      personality: ["Playful", "Bright", "Safe", "Confident"],
    },
    typography: {
      ...SHARED_TYPOGRAPHY,
      scale: [
        { name: "Display", size: "64 / 80", lineHeight: "1.0", usage: "Hero — chunky, friendly." },
        { name: "H1", size: "40 / 48", lineHeight: "1.05", usage: "Page titles." },
        { name: "H2", size: "26 / 30", lineHeight: "1.2", usage: "Section headers." },
        { name: "Body", size: "16 / 18", lineHeight: "1.6", usage: "Always set body large for younger readers." },
        { name: "Caption", size: "13 / 14", lineHeight: "1.4", usage: "Meta and labels." },
      ],
    },
    logo: {
      primaryMark: "Juniors wordmark in Red on White, with the optional sub-mark in Navy.",
      variants: [
        { name: "Primary", usage: "Red on white — default for almost every surface." },
        { name: "Reversed", usage: "White on red — used for hero panels and merch." },
        { name: "Winter Camp", usage: "Winter-Blue lockup — only for the winter program window." },
      ],
      clearSpace: "One wordmark-height of clear space — Juniors needs more breathing room than the master brand.",
      minSize: "Lockup: 96px digital. Don't shrink below this — readability matters for kids and parents.",
      background: [
        { surface: "White", allowed: true, note: "Default canvas." },
        { surface: "Juniors Red", allowed: true, note: "Reversed lockup only." },
        { surface: "Winter Blue", allowed: true, note: "Reserved for winter camp only." },
        { surface: "Photography", allowed: false, note: "Always place the lockup on a flat brand color, never a photo." },
      ],
    },
    usage: {
      dos: [
        "Lead with white. Brights live as bold shapes on a calm canvas.",
        "Use rounded corners (radius ≥ 12) and chunky strokes — the brand has weight.",
        "Set body type one step larger than the master brand defaults.",
        "Use the full bright palette across a layout — yellow, green, blue, pink, orange — but balance them.",
      ],
      donts: [
        "Don't use thin type weights — children read better with weight.",
        "Don't put red on red, or red on green. Always separate brights with white.",
        "Don't add CODED Navy as a large surface — Juniors lives on white.",
      ],
    },
    applications: [
      { title: "Activity workbook cover", description: "White, oversized red wordmark, two bright character chips.", surface: "light" },
      { title: "Sticker pack", description: "Each character color as one die-cut tile, white border.", surface: "accent" },
      { title: "Parent-facing email", description: "White surface, navy body, single red accent rule.", surface: "light" },
    ],
    voice: [
      { word: "Playful", meaning: "Speak to curiosity, not productivity." },
      { word: "Encouraging", meaning: "Celebrate the attempt, not just the result." },
      { word: "Parent-safe", meaning: "Tone always works when a parent is reading over a shoulder." },
    ],
  },

  /* ------------------------------------------------------------------ */
  // Full Stack uses the master CODED palette (draft program — no dedicated palette yet)
  "full-stack-draft": {
    identity: {
      intro:
        "Full Stack is the upcoming web-development bootcamp. It currently rides on the CODED master palette while its dedicated identity is in development.",
      mission:
        "Move learners from web fundamentals to a deployed, full-stack product they own.",
      audience: "Engineers and graduates who want a full-stack web bootcamp.",
      personality: ["Pragmatic", "Builder-first", "Modern"],
    },
    typography: {
      ...SHARED_TYPOGRAPHY,
      scale: DEFAULT_SCALE,
    },
    logo: {
      primaryMark: "Draft lockup — the CODED master mark with a 'Full Stack' descender.",
      variants: [
        { name: "Master + descriptor", usage: "Until the dedicated identity ships, use the CODED master lockup with a 'Full Stack' caption." },
      ],
      clearSpace: "One mark-height — same as the master brand.",
      minSize: "Lockup: 96px digital.",
      background: [
        { surface: "White", allowed: true, note: "Default." },
        { surface: "Navy", allowed: true, note: "Reversed." },
      ],
    },
    usage: {
      dos: [
        "Use CODED master colors and rules until the dedicated palette lands.",
        "Mark every surface clearly as 'draft' internally — this brand is not public-ready.",
      ],
      donts: [
        "Don't borrow other programs' palettes as a stand-in.",
        "Don't ship Full Stack-branded materials externally until the dedicated identity is published.",
      ],
    },
    applications: [
      { title: "Internal teaser", description: "Master CODED layout with 'Full Stack — coming soon' caption.", surface: "dark" },
    ],
  },
};

export function getBrandBook(productId: string): BrandBookEntry | undefined {
  if (productId === "full-stack") return brandBooks["full-stack-draft"];
  return brandBooks[productId];
}

// Sanity check that all expected product ids resolve. Keep in sync with products.ts.
export const BRAND_BOOK_PRODUCT_IDS = [
  "coded",
  "ai-app-developer",
  "data-science",
  "cybersecurity",
  "full-stack",
  "academy-x",
  "kuwait-codes",
  "unicode",
  "coded-juniors",
];
