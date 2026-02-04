import Link from "next/link";

export default function SocialPage() {
    return (
        <main className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center bg-zinc-50 px-4 py-20 text-center dark:bg-black text-zinc-900 dark:text-zinc-50">
            <div className="max-w-2xl space-y-8 animate-in fade-in zoom-in duration-500">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Let's Connect! 🚀
                </h1>

                <p className="text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl leading-relaxed">
                    I'm actively creating content on <strong>YouTube</strong> and sharing daily updates on <strong>Instagram</strong>.
                    <br />
                    Follow along for coding tutorials, behind-the-scenes, and design tips!
                </p>

                <div className="grid gap-6 sm:grid-cols-2 mt-8">
                    <a
                        href="https://www.youtube.com/@bysuraj"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-md hover:scale-105 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500 transition group-hover:bg-red-600 group-hover:text-white">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">YouTube</h2>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Subscribe for tutorials</p>
                        </div>
                    </a>

                    <a
                        href="https://www.instagram.com/bysuraj.in/"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-md hover:scale-105 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-500 transition group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-red-500 group-hover:to-purple-500 group-hover:text-white">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Instagram</h2>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Follow for daily updates</p>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    )
}
