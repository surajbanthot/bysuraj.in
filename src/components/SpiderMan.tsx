"use client";

import { useEffect, useState, useRef, useCallback, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

type SpiderPhase = "hidden" | "descending" | "posing" | "ascending";

type SpiderMotion = {
    descendY: number;
    descendDuration: number;
    ascendY: number;
    ascendDuration: number;
};

const HIDDEN_PATHS = new Set(["/hireme", "/code"]);

export default function SpiderMan() {
    const pathname = usePathname();
    const [phase, setPhase] = useState<SpiderPhase>("hidden");
    const [cyclePath, setCyclePath] = useState<string | null>(null);
    const [left, setLeft] = useState(0);
    const [motion, setMotion] = useState<SpiderMotion>({
        descendY: 50,
        descendDuration: 850,
        ascendY: -120,
        ascendDuration: 850,
    });
    const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

    const clearTimers = useCallback(() => {
        for (const timer of timersRef.current) clearTimeout(timer);
        timersRef.current = [];
    }, []);

    useEffect(() => {
        const randomBetween = (min: number, max: number) =>
            Math.floor(Math.random() * (max - min + 1)) + min;
        const queueTimer = (callback: () => void, delay: number) => {
            const timer = setTimeout(callback, delay);
            timersRef.current.push(timer);
        };

        const scheduleNextCycle = (isInitialRun: boolean) => {
            const delay = isInitialRun
                ? randomBetween(7000, 15000)
                : randomBetween(20000, 42000);

            queueTimer(() => {
                if (HIDDEN_PATHS.has(pathname)) return;

                const width = window.innerWidth;
                const nextLeft = randomBetween(Math.floor(width * 0.18), Math.floor(width * 0.82));
                const descendY = randomBetween(35, 60);
                const descendDuration = randomBetween(650, 950);
                const ascendY = -(descendY + randomBetween(70, 120));
                const ascendDuration = randomBetween(650, 950);
                const poseDuration = randomBetween(800, 1400);

                setLeft(nextLeft);
                setMotion({
                    descendY,
                    descendDuration,
                    ascendY,
                    ascendDuration,
                });
                setCyclePath(pathname);
                setPhase("descending");

                queueTimer(() => {
                    setPhase("posing");

                    queueTimer(() => {
                        setPhase("ascending");

                        queueTimer(() => {
                            setPhase("hidden");
                            setCyclePath(null);
                            scheduleNextCycle(false);
                        }, ascendDuration);
                    }, poseDuration);
                }, descendDuration);
            }, delay);
        };

        clearTimers();
        if (HIDDEN_PATHS.has(pathname)) return;

        scheduleNextCycle(true);
        return () => clearTimers();
    }, [clearTimers, pathname]);

    const handleClick = () => {
        track("spiderman_clicked", { page: pathname });
    };

    if (phase === "hidden" || HIDDEN_PATHS.has(pathname) || cyclePath !== pathname) return null;

    const styleVars: CSSProperties = {
        "--spider-descend-y": `${motion.descendY}px`,
        "--spider-descend-duration": `${motion.descendDuration}ms`,
        "--spider-ascend-y": `${motion.ascendY}px`,
        "--spider-ascend-duration": `${motion.ascendDuration}ms`,
    } as CSSProperties;

    return (
        <div
            className="fixed top-0 z-40 w-14 sm:w-16 pointer-events-auto cursor-pointer"
            style={{ left: `${left}px` }}
            onClick={handleClick}
        >
            <div
                className={`${phase === "descending" ? "animate-spider-descend" : phase === "ascending" ? "animate-spider-ascend" : ""} ${phase === "posing" ? "animate-spider-hang" : ""}`}
                style={styleVars}
            >
                {/* web line from top */}
                <div className="absolute left-1/2 -top-40 h-40 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-200/90 via-blue-300/70 to-blue-100/20" />

                <div className="relative opacity-40">
                    {phase === "posing" && (
                        <div className="absolute right-0 top-12 h-[2px] w-14 bg-gradient-to-r from-blue-200/60 via-white/90 to-transparent animate-spider-web-shoot" />
                    )}

                    <svg
                        viewBox="0 0 128 128"
                        className="w-full h-auto drop-shadow-[0_0_10px_rgba(59,130,246,0.35)]"
                        style={{ imageRendering: "pixelated" }}
                        shapeRendering="crispEdges"
                    >
                        <g transform="rotate(180 64 64)">
                            {/* back accents */}
                            <rect x="24" y="68" width="16" height="16" fill="#1D4ED8" />
                            <rect x="88" y="68" width="16" height="16" fill="#1D4ED8" />
                            <rect x="20" y="76" width="14" height="16" fill="#2563EB" />
                            <rect x="94" y="76" width="14" height="16" fill="#2563EB" />

                            {/* thighs / crouch */}
                            <rect x="36" y="78" width="22" height="16" fill="#1E3A8A" />
                            <rect x="70" y="78" width="22" height="16" fill="#1E3A8A" />
                            <rect x="30" y="88" width="24" height="14" fill="#1E40AF" />
                            <rect x="74" y="88" width="24" height="14" fill="#1E40AF" />

                            {/* lower legs / boots */}
                            <rect x="30" y="100" width="16" height="14" fill="#DC2626" />
                            <rect x="82" y="100" width="16" height="14" fill="#DC2626" />
                            <rect x="24" y="110" width="20" height="8" fill="#B91C1C" />
                            <rect x="84" y="110" width="20" height="8" fill="#B91C1C" />

                            {/* torso */}
                            <rect x="42" y="54" width="44" height="30" fill="#DC2626" />
                            <rect x="44" y="64" width="40" height="20" fill="#1D4ED8" />
                            <rect x="56" y="58" width="16" height="14" fill="#DC2626" />

                            {/* white chest emblem */}
                            <rect x="60" y="64" width="8" height="10" fill="#F8FAFC" />
                            <rect x="56" y="68" width="16" height="6" fill="#F8FAFC" />

                            {/* shoulders and arms */}
                            <rect x="28" y="56" width="16" height="14" fill="#DC2626" />
                            <rect x="84" y="56" width="16" height="14" fill="#DC2626" />
                            <rect x="18" y="62" width="16" height="12" fill="#1D4ED8" />
                            <rect x="94" y="62" width="16" height="12" fill="#1D4ED8" />
                            <rect x="10" y="70" width="14" height="10" fill="#DC2626" />
                            <rect x="104" y="68" width="14" height="10" fill="#DC2626" />
                            <rect x="110" y="62" width="6" height="6" fill="#DC2626" className={phase === "posing" ? "animate-spider-finger" : ""} />

                            {/* neck */}
                            <rect x="56" y="46" width="16" height="10" fill="#DC2626" />

                            {/* head silhouette */}
                            <rect x="42" y="22" width="44" height="30" fill="#DC2626" />
                            <rect x="46" y="18" width="36" height="8" fill="#DC2626" />
                            <rect x="48" y="24" width="32" height="24" fill="#EF4444" />
                            <rect x="42" y="22" width="44" height="2" fill="#111827" />
                            <rect x="42" y="50" width="44" height="2" fill="#111827" />

                            {/* eyes */}
                            <rect x="50" y="30" width="12" height="10" fill="#F8FAFC" />
                            <rect x="66" y="30" width="12" height="10" fill="#F8FAFC" />
                            <rect x="48" y="30" width="2" height="10" fill="#111827" />
                            <rect x="78" y="30" width="2" height="10" fill="#111827" />
                            <rect x="62" y="30" width="4" height="10" fill="#111827" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
