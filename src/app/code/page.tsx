import ScrollToTopButton from "@/components/ScrollToTopButton";

type SkillItem = {
    name: string;
    icon: string;
    color: string;
    link?: string;
};

type SkillGroup = {
    category: string;
    className: string;
    contentClass?: string;
    items: SkillItem[];
    footer?: React.ReactNode;
};

const skills: SkillGroup[] = [
    {
        category: "Design Tools",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        items: [
            { name: "Figma", icon: "🎨", color: "from-purple-400 to-pink-500", link: "https://www.figma.com/" },
            { name: "Framer", icon: "✨", color: "from-blue-400 to-blue-600", link: "https://www.framer.com/" },
        ],
    },
    {
        category: "3D & Motion",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        items: [
            { name: "Three.js", icon: "🔮", color: "from-purple-500 to-indigo-600", link: "https://threejs.org/" },
            { name: "Spline", icon: "🌀", color: "from-violet-400 to-purple-600", link: "https://spline.design/" },
            { name: "Rive", icon: "🎬", color: "from-orange-400 to-red-500", link: "https://rive.app/" },
        ],
    },
    {
        category: "Frontend",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        items: [
            { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500", link: "https://react.dev/" },
            { name: "Next.js", icon: "▲", color: "from-sky-700 to-sky-900 dark:from-sky-200 dark:to-sky-400", link: "https://nextjs.org/" },
            { name: "TypeScript", icon: "📘", color: "from-blue-500 to-blue-700", link: "https://www.typescriptlang.org/" },
            { name: "Tailwind CSS", icon: "🎨", color: "from-teal-400 to-cyan-500", link: "https://tailwindcss.com/" },
        ],
    },
    {
        category: "Backend & APIs",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        items: [
            { name: "Node.js", icon: "🟢", color: "from-green-500 to-green-700", link: "https://nodejs.org/" },
            { name: "Supabase", icon: "⚡", color: "from-emerald-400 to-green-600", link: "https://supabase.com/" },
            { name: "PostgreSQL", icon: "🐘", color: "from-blue-400 to-indigo-600", link: "https://www.postgresql.org/" },
            { name: "Postman", icon: "📮", color: "from-orange-500 to-orange-700", link: "https://www.postman.com/" },
        ],
    },
    {
        category: "Testing",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        items: [
            { name: "RTL", icon: "🧪", color: "from-red-400 to-orange-500" },
            { name: "Jest", icon: "🃏", color: "from-green-400 to-emerald-600" },
            { name: "Playwright", icon: "🎭", color: "from-green-500 to-teal-600" },
        ],
    },
    {
        category: "Workflow",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        items: [
            { name: "VS Code", icon: "💻", color: "from-blue-500 to-sky-600" },
            { name: "GitHub", icon: "🐙", color: "from-slate-600 to-sky-900 dark:from-slate-400 dark:to-slate-600" },
            { name: "Jira", icon: "🎫", color: "from-blue-600 to-blue-800" },
        ],
    },
    {
        category: "AI Tools",
        className: "col-span-1 md:col-span-2 lg:col-span-3",
        footer: (
            <div className="flex flex-col items-center justify-center text-center leading-tight">
                <span className="text-lg sm:text-xl">
                    More tool expertise will be added <span className="text-red-500">on</span>
                </span>
                <span className="mt-1 block text-xl font-bold sm:text-2xl">
                    Avengers <span className="text-green-500">DOOMSDAY...</span>
                </span>
            </div>
        ),
        items: [
            { name: "Antigravity", icon: "🚀", color: "from-blue-400 to-green-500" },
            { name: "Claude Code", icon: "🧠", color: "from-sky-500 to-amber-500" },
            { name: "OpenAI Codex", icon: "💡", color: "from-emerald-400 to-teal-600" },
            { name: "Cursor", icon: "🤖", color: "from-violet-400 to-purple-600" },
            { name: "Copilot", icon: "✨", color: "from-gray-500 to-gray-700" },
            { name: "Prompting", icon: "📝", color: "from-sky-400 to-blue-600" },
        ],
    },
];

const projects = [
    {
        title: "Coming Soon",
        description: "Exciting projects are in the works! Stay tuned.",
        link: "#",
        tags: ["Work in Progress"]
    }
];

export default function CodePage() {
    return (
        <main className="min-h-[calc(100vh-56px)] bg-sky-50 px-4 py-8 text-sky-900 dark:bg-sky-950 dark:text-sky-50 sm:px-8 sm:py-12">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                <header className="flex flex-col items-start gap-2">
                    <div>
                        <h1 className="font-[family-name:var(--font-bungee)] text-4xl font-normal tracking-tight sm:text-6xl">Code</h1>
                        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400 sm:text-xl">
                            My tech stack & tools
                        </p>
                    </div>
                </header>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skillGroup) => (
                        <div
                            key={skillGroup.category}
                            className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-sky-900/50 dark:hover:bg-sky-900/80 ${skillGroup.className} border border-sky-200/50 dark:border-sky-800`}
                        >
                            <h2 className="mb-6 text-xl font-medium uppercase tracking-widest text-slate-500 dark:text-sky-300">
                                {skillGroup.category}
                            </h2>
                            <div className={skillGroup.contentClass || "flex flex-wrap gap-4"}>
                                {skillGroup.items.map((skill) => {
                                    const Tag = skill.link ? "a" : "div";
                                    const props = skill.link
                                        ? { href: skill.link, target: "_blank", rel: "noreferrer" }
                                        : {};

                                    return (
                                        <Tag
                                            key={skill.name}
                                            {...props}
                                            className={`relative group/item flex flex-col items-center gap-2 ${skill.link ? "cursor-pointer" : ""}`}
                                        >
                                            <div className="relative">
                                                <div
                                                    className={`flex h-14 w-14 items-center justify-center rounded-none bg-gradient-to-br ${skill.color} text-2xl shadow-sm transition-all duration-300 group-hover:scale-105 group-hover/item:scale-110 group-hover/item:ring-2 group-hover/item:ring-sky-600 group-hover/item:ring-offset-2 dark:group-hover/item:ring-offset-sky-900 sm:h-16 sm:w-16 sm:text-3xl`}
                                                    title={skill.name}
                                                >
                                                    {skill.icon}
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-sky-700 dark:text-sky-200 sm:text-base">
                                                {skill.name}
                                            </span>
                                        </Tag>
                                    );
                                })}
                                {skillGroup.footer && (
                                    <div className="flex flex-1 items-center justify-center rounded-none px-6 py-4 text-center font-semibold text-slate-600 dark:text-sky-300">
                                        {skillGroup.footer}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20">
                    <h2 className="mb-8 text-3xl font-normal tracking-tight sm:text-4xl">Projects</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {projects.map((project) => (
                            <div key={project.title} className="group relative overflow-hidden rounded-3xl border border-sky-200/50 bg-white p-6 transition-all duration-300 hover:shadow-md dark:border-sky-800 dark:bg-sky-900/50 dark:hover:bg-sky-900/80">
                                <h3 className="text-xl font-medium text-sky-900 dark:text-sky-50">{project.title}</h3>
                                <p className="mt-2 text-slate-500 dark:text-slate-400">{project.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-sky-800 dark:text-slate-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

                <p className="text-center text-lg text-slate-500 dark:text-slate-400 sm:text-xl">
                    Always exploring new tools ✨
                </p>
            </div>

            <ScrollToTopButton />
        </main>
    );
}
