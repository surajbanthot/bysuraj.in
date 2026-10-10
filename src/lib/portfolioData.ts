// Single source of truth for the Darkroom portfolio.
// Sections and pages import from here so the JSX stays about layout, not data.

export const SITE = {
  name: "Suraj",
  fullName: "Suraj Banthot",
  role: "Design Engineer",
  headline: "I build interfaces, AI products and moving images.",
  intro:
    "Eight years shipping React at Microsoft Teams scale, now building conversational AI. On the side I make motion work and shoot medium-format film.",
  location: "Bengaluru, India",
  email: "surajcommercial@gmail.com",
  contra: "https://contra.com/suraj_kumar_b_c_0uicot57",
  instagram: "https://www.instagram.com/bysuraj.in/",
  // Drop the PDF at public/Suraj-Banthot-Resume.pdf to activate this link.
  resume: "/Suraj-Banthot-Resume.pdf",
  estYear: "2018",
} as const;

export const disciplines = ["Interfaces", "AI products", "Motion", "Film"] as const;

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const socials: Social[] = [
  { label: "Instagram", handle: "@bysuraj.in", href: SITE.instagram },
  { label: "X", handle: "@SurajBanthot", href: "https://x.com/SurajBanthot" },
  { label: "Threads", handle: "@bysuraj.in", href: "https://www.threads.com/@bysuraj.in" },
  { label: "Contra", handle: "for freelance", href: SITE.contra },
];

export type Project = {
  slug: string;
  no: string;
  title: string;
  client: string;
  period: string;
  role: string;
  summary: string;
  problem: string;
  approach: string[];
  outcome: string;
  tags: string[];
  /** Cover image in /public. Until one exists, a seeded generative frame renders instead. */
  cover?: string;
  /** Seed for the generative placeholder (colour + grain + leak position). */
  seed: number;
};

export const projects: Project[] = [
  {
    slug: "enterprise-knowledge-copilot",
    no: "01",
    title: "Enterprise Knowledge Copilot",
    client: "Quantzig × Shell",
    period: "2026",
    role: "Full-stack engineer — retrieval to interface",
    summary:
      "A conversational interface that turns a sprawling enterprise knowledge base into answers you can trace back to a source.",
    problem:
      "Shell's internal knowledge lived across thousands of documents. Finding the right answer meant knowing where to look, and trusting it meant reading the whole thing.",
    approach: [
      "Designed a RAG retrieval pipeline that chunks, embeds and ranks documents so answers stay grounded in sources.",
      "Orchestrated LLM calls behind a typed API layer, with streaming responses and citation metadata.",
      "Built the chat interface so every answer shows where it came from, which made people trust the tool enough to use it.",
    ],
    outcome:
      "Natural-language search over the knowledge base, with answers cited back to their source documents.",
    tags: ["Conversational AI", "RAG", "Next.js", "Python"],
    seed: 0.17,
  },
  {
    slug: "teams-at-enterprise-scale",
    no: "02",
    title: "Teams at enterprise scale",
    client: "Tech Mahindra × Microsoft",
    period: "2024—25",
    role: "Senior software engineer — front end",
    summary:
      "React interfaces inside Microsoft Teams built to feel fast, dependable and inclusive for a very large audience.",
    problem:
      "At Teams' scale, every component ships to a huge, varied audience. Performance regressions and accessibility gaps get noticed quickly.",
    approach: [
      "Built reusable React components that distributed teams could adopt without re-solving the same problems.",
      "Profiled and optimised render paths to keep interactions responsive.",
      "Made WCAG compliance part of the definition of done, covering keyboard paths, focus management and screen-reader semantics.",
    ],
    outcome:
      "Feature updates shipped with distributed product teams, with stronger accessibility compliance and faster interfaces.",
    tags: ["React", "Accessibility", "Design Systems", "Performance"],
    seed: 0.52,
  },
  {
    slug: "stories-for-every-screen",
    no: "03",
    title: "Stories built for every screen",
    client: "Mirafra × Pratham Books",
    period: "2022—23",
    role: "Senior software engineer — interaction",
    summary:
      "A digital storytelling platform that makes illustrated children's books inviting on any device.",
    problem:
      "Pratham Books' readers use everything from low-end phones to classroom projectors. The illustrations had to look right on all of them, and reading had to feel easy.",
    approach: [
      "Worked closely with designers to turn their visual direction into pixel-accurate interactions.",
      "Rebuilt layouts to be fully responsive, so reading feels right at every size.",
      "Made product changes aimed at engagement and measured their effect.",
    ],
    outcome:
      "A responsive reading experience that lifted engagement metrics across devices.",
    tags: ["Frontend", "Interaction", "Responsive UI", "Storytelling"],
    seed: 0.83,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export type ExperienceEntry = {
  org: string;
  role: string;
  period: string;
  current?: boolean;
  note: string;
};

export const experience: ExperienceEntry[] = [
  {
    org: "Quantzig",
    role: "Full Stack Developer",
    period: "2026 — Now",
    current: true,
    note: "Conversational AI over Shell's enterprise knowledge base, built end to end from the RAG pipeline to the chat UI.",
  },
  {
    org: "Tech Mahindra",
    role: "Senior Software Engineer",
    period: "2024 — 2025",
    note: "Scalable, accessible React components for Microsoft Teams.",
  },
  {
    org: "Mirafra Technologies",
    role: "Senior Software Engineer",
    period: "2022 — 2023",
    note: "Interactive storytelling features for PrathamBooks.org.",
  },
  {
    org: "Liftoff LLC",
    role: "Front-end Developer",
    period: "2021 — 2022",
    note: "Core features for the Sphere Web platform in React and Redux.",
  },
  {
    org: "Broadridge Financial Solutions",
    role: "Front-end Developer",
    period: "2018 — 2020",
    note: "Migrated a global post-trade management system to component-based React.",
  },
];

export type Lane = {
  id: "hire" | "commission";
  kicker: string;
  title: string;
  pitch: string;
  items: { title: string; detail: string }[];
  cta: { label: string; href: string }[];
};

export const lanes: Lane[] = [
  {
    id: "hire",
    kicker: "Full-time",
    title: "Hire me",
    pitch:
      "For design-engineer and product-engineer roles. I take a product from Figma to production and care about the last 10%: motion, accessibility and performance.",
    items: [
      { title: "Frontend", detail: "React · Next.js · TypeScript · Tailwind" },
      { title: "AI & LLM", detail: "RAG · LangChain · Agents · Python · FastAPI" },
      { title: "Craft", detail: "Design systems · WCAG · Performance · Testing" },
      { title: "Backend", detail: "Node.js · Supabase · PostgreSQL" },
    ],
    cta: [
      { label: "Résumé", href: SITE.resume },
      { label: "Email me", href: `mailto:${SITE.email}?subject=Role%20enquiry` },
    ],
  },
  {
    id: "commission",
    kicker: "Freelance",
    title: "Commission me",
    pitch:
      "For studios, founders and brands who need one person who can design it, animate it and ship it.",
    items: [
      { title: "Motion graphics", detail: "After Effects · Premiere · Blender" },
      { title: "Rive interactions", detail: "State machines for interactive UI" },
      { title: "AI builds", detail: "Chat products, RAG tools, prototypes" },
      { title: "Film portraits", detail: "Editorial & portrait on 6×7 film" },
    ],
    cta: [
      { label: "Start a project", href: "#contact" },
      { label: "Contra", href: SITE.contra },
    ],
  },
];

export type FilmFrame = {
  /** Scan in /public. Until one exists, a seeded generative frame renders instead. */
  src?: string;
  title: string;
  stock: string;
  seed: number;
};

export const filmFrames: FilmFrame[] = [
  { title: "Morning, Cubbon Park", stock: "Portra 400", seed: 0.11 },
  { title: "Window light", stock: "HP5+ @ 800", seed: 0.29 },
  { title: "Coastal geometry", stock: "Ektar 100", seed: 0.44 },
  { title: "Portrait, studio", stock: "Portra 160", seed: 0.63 },
  { title: "Old Bangalore", stock: "Tri-X 400", seed: 0.71 },
  { title: "Last light", stock: "Portra 800", seed: 0.92 },
];

export const camera = {
  name: "Pentax 67II",
  note: "A 6×7 system that handles like a large SLR and is built like a tank. Ten frames a roll makes every frame count.",
};

// Anchor sections on the home page (ids match each <section id>).
export const navSections = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "film", label: "Film" },
  { id: "contact", label: "Contact" },
] as const;
