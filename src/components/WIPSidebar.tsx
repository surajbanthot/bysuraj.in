"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const initialItems = [
    {
        title: "Portfolio Refinement",
        desc: "Polishing animations & adding pixel-perfect details.",
        icon: "✨",
        status: "Active"
    },
    {
        title: "F1 Experience",
        desc: "Optimizing the physics & interactivity of the race car.",
        icon: "🏎️",
        status: "Ship It"
    },
    {
        title: "Agentic Workflows",
        desc: "Exploring autonomous coding agents deeply.",
        icon: "🤖",
        status: "Research"
    },
];

export default function WIPSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState(initialItems);
    const [newTask, setNewTask] = useState("");

    // Only show on homepage
    const isHomePage = pathname === "/";

    // Check development environment safely
    const isDev = process.env.NODE_ENV === "development";

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const newItem = {
            title: newTask,
            desc: "",
            icon: "🚧",
            status: "Active"
        };

        const updatedItems = [newItem, ...items];
        setItems(updatedItems);
        setNewTask("");

        // Save to source file in dev mode
        if (isDev) {
            await saveToSource(updatedItems);
        }
    };

    const handleDeleteItem = async (index: number) => {
        const updatedItems = items.filter((_, idx) => idx !== index);
        setItems(updatedItems);

        // Save to source file in dev mode
        if (isDev) {
            await saveToSource(updatedItems);
        }
    };

    const saveToSource = async (itemsToSave: typeof items) => {
        try {
            await fetch("/api/wip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: itemsToSave }),
            });
        } catch (error) {
            console.error("Failed to save to source:", error);
        }
    };

    // Don't render on non-home pages
    if (!isHomePage) return null;

    return (
        <>
            {/* Trigger Button - Top Left (Fixed) */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-[5.5rem] left-4 z-40 flex items-center gap-3 rounded-md border border-zinc-500/20 bg-black/60 px-5 py-2.5 text-sm font-bold text-zinc-100 backdrop-blur-md transition-all hover:border-orange-500/50 hover:bg-black/80 hover:text-orange-500 sm:left-8 shadow-lg font-[family-name:var(--font-bungee)]"
            >
                <span className="absolute inset-0 rounded-md bg-zinc-500/20 animate-subtle-ping pointer-events-none"></span>
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
                WIP
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-96 transform border-r border-white/10 bg-zinc-950/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-spring ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-zinc-100">Current Focus</h2>
                        <p className="text-sm text-zinc-500 uppercase tracking-wider">What I'm building</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-full p-2 text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Tiles Grid (Scrollable) with gradient fade */}
                <div className="relative">
                    <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar-none pb-8">
                        {items.map((item, i) => (
                            <div key={i} className="group relative rounded-xl border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5">

                                {/* Status Badge */}
                                <div className="absolute top-3 right-3 rounded-full bg-black/40 px-3 py-1 text-xs uppercase font-bold text-zinc-400 border border-white/5 z-10">
                                    {item.status}
                                </div>

                                {/* Delete Button (dev mode, on hover) */}
                                {isDev && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteItem(i);
                                        }}
                                        className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 rounded-full p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/30 cursor-pointer"
                                        aria-label="Delete item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                )}

                                <div className="relative flex gap-4 pr-16">
                                    <div className="text-3xl pt-1 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-200 group-hover:text-orange-400 transition-colors">{item.title}</h3>
                                        {item.desc && <p className="text-base text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Bottom gradient fade overlay */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                </div>

                {/* Bottom Section: Input + Footer */}
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                    {/* Localhost Input Form */}
                    {isDev && (
                        <form onSubmit={handleAddItem} className="rounded-lg border border-white/10 bg-black/50 p-3">
                            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-2 block">Localhost Add</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="New WIP item..."
                                    className="flex-1 rounded-md border border-white/10 bg-black/60 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-orange-500/50 focus:outline-none transition-all"
                                />
                                <button
                                    type="submit"
                                    className="rounded-md bg-orange-500/20 border border-orange-500/30 px-3 py-2 text-orange-400 hover:bg-orange-500 hover:text-white transition-all font-bold text-xs"
                                >
                                    ADD
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Footer Quote */}
                    <div className="rounded-lg bg-orange-500/10 p-4 border border-orange-500/20">
                        <p className="text-sm text-orange-200/80 text-center leading-relaxed">
                            "I build things for the web, constantly shipping."
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
