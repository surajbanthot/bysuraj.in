// Single source of truth for the Viewfinder single-page portfolio.
// Sections import from here so the JSX stays about layout, not data.

export const SITE = {
  name: "Suraj",
  role: "Design Engineer",
  tagline: "A design engineer who shoots medium-format film.",
  location: "Bengaluru, India",
  email: "surajcommercial@gmail.com",
  contra: "https://contra.com/suraj_kumar_b_c_0uicot57",
  // Drop a PDF named this into /public to wire up the résumé link.
  resume: "/Suraj-Banthot-Resume.pdf",
  estYear: "2018",
} as const;

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const socials: Social[] = [
  { label: "Instagram", handle: "@bysuraj.in", href: "https://www.instagram.com/bysuraj.in/" },
  { label: "X", handle: "@SurajBanthot", href: "https://x.com/SurajBanthot" },
  { label: "Threads", handle: "@bysuraj.in", href: "https://www.threads.com/@bysuraj.in" },
  { label: "Contra", handle: "for freelance", href: SITE.contra },
];

export type ExperienceEntry = {
  no: string;
  org: string;
  role: string;
  period: string;
  current?: boolean;
  notes: string[];
};

export const experience: ExperienceEntry[] = [
  {
    no: "06",
    org: "Quantzig",
    role: "Full Stack Developer",
    period: "Jun 2026 — Present",
    current: true,
    notes: [
      "Implementing a conversational AI that makes Shell's enterprise knowledge base instantly accessible through natural-language search.",
      "Building the full stack — from the RAG/LLM retrieval pipeline to the front-end chat interface.",
    ],
  },
  {
    no: "05",
    org: "Tech Mahindra",
    role: "Senior Software Engineer",
    period: "Feb 2024 — Sep 2025",
    notes: [
      "Developed scalable front-end components for Microsoft Teams using React.js.",
      "Optimised performance and ensured accessibility / WCAG compliance across the application.",
      "Shipped feature-rich updates with cross-functional teams in an agile environment.",
    ],
  },
  {
    no: "04",
    org: "Mirafra Technologies",
    role: "Senior Software Engineer",
    period: "Sep 2022 — Nov 2023",
    notes: [
      "Built interactive features for the digital storytelling platform PrathamBooks.org.",
      "Implemented pixel-perfect UI and smooth interactions alongside designers.",
      "Lifted engagement metrics through responsive design.",
    ],
  },
  {
    no: "03",
    org: "Liftoff LLC",
    role: "Front-end Developer (React.js)",
    period: "Nov 2021 — Feb 2022",
    notes: [
      "Developed core features for the Sphere Web platform using React and Redux.",
      "Integrated complex RESTful APIs and managed application state efficiently.",
    ],
  },
  {
    no: "02",
    org: "Broadridge Financial Solutions",
    role: "Front-end Developer (React.js)",
    period: "Jun 2018 — Oct 2020",
    notes: [
      "Worked on the Global Post Trade Management system for enterprise clients.",
      "Migrated legacy UI views to a modern, component-based React architecture.",
    ],
  },
  {
    no: "01",
    org: "Ramaiah Institute of Technology",
    role: "B.E. Information Science & Engineering",
    period: "Jun 2015 — May 2018",
    notes: ["Information science fundamentals and software engineering — 7.92 CGPA."],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { category: "Design", items: ["Figma", "Framer"] },
  { category: "3D & Motion", items: ["Three.js", "Spline", "Rive", "Blender 3D"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend & APIs", items: ["Node.js", "FastAPI", "Supabase", "PostgreSQL", "Postman"] },
  { category: "AI & LLM", items: ["LangChain", "RAG", "LLMs", "AI Agents", "Python"] },
  { category: "Testing", items: ["RTL", "Jest", "Playwright"] },
  { category: "Workflow", items: ["VS Code", "GitHub", "Jira", "Vercel"] },
  { category: "Motion Suite", items: ["After Effects", "Premiere Pro", "Illustrator"] },
];

export type Service = {
  no: string;
  title: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export const services: Service[] = [
  {
    no: "01",
    title: "Motion Graphics",
    blurb: "Compelling storytelling through motion and visual effects.",
    tags: ["Premiere Pro", "After Effects", "Illustrator", "Blender 3D"],
    links: [
      { label: "Contra", href: SITE.contra },
      { label: "Email", href: `mailto:${SITE.email}` },
    ],
  },
  {
    no: "02",
    title: "Rive Interactions",
    blurb: "High-performance interactive UI animations for the web.",
    tags: ["Rive", "State Machines", "Interactive UI", "Web Runtime"],
    links: [{ label: "Contra", href: SITE.contra }],
  },
  {
    no: "03",
    title: "AI Engineering",
    blurb: "Building intelligent applications with LLMs, RAG, and AI agents.",
    tags: ["Python", "Next.js", "LangChain", "RAG", "LLMs", "FastAPI"],
    links: [{ label: "Email", href: `mailto:${SITE.email}` }],
  },
  {
    no: "04",
    title: "Analogue Photography",
    blurb: "Portrait and editorial photography on medium-format film.",
    tags: ["Pentax 67II", "Medium Format", "Portrait", "Editorial"],
    links: [
      { label: "Email", href: `mailto:${SITE.email}` },
      { label: "Instagram", href: "https://www.instagram.com/bysuraj.in/" },
    ],
  },
];

// Anchor sections for the editorial nav (ids match each <section id>).
export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "services", label: "Services" },
  { id: "film", label: "Film" },
  { id: "contact", label: "Contact" },
] as const;
