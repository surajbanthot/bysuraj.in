"use client";

import { useEffect, useState, useRef, useCallback, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

type SupermanPhase = "hidden" | "entering" | "floating" | "flying";

type Position = {
    x: number;
    y: number;
};

type FlightConfig = {
    deltaX: number;
    deltaY: number;
    rotation: number;
    duration: number;
};

type EntryConfig = {
    deltaX: number;
    deltaY: number;
    rotation: number;
    duration: number;
};

type HorizontalDirection = -1 | 1;

const HIDDEN_PATHS = new Set(["/hireme", "/code"]);

export default function Superman() {
    const pathname = usePathname();
    const [phase, setPhase] = useState<SupermanPhase>("hidden");
    const [cyclePath, setCyclePath] = useState<string | null>(null);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [entryConfig, setEntryConfig] = useState<EntryConfig>({
        deltaX: -280,
        deltaY: 20,
        rotation: -12,
        duration: 900,
    });
    const [horizontalDirection, setHorizontalDirection] = useState<HorizontalDirection>(1);
    const [flightConfig, setFlightConfig] = useState<FlightConfig>({
        deltaX: 0,
        deltaY: 0,
        rotation: -12,
        duration: 2000,
    });
    const [showWoosh, setShowWoosh] = useState(false);
    const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

    const clearTimers = useCallback(() => {
        for (const timer of timersRef.current) {
            clearTimeout(timer);
        }
        timersRef.current = [];
    }, []);

    useEffect(() => {
        const randomBetween = (min: number, max: number) =>
            Math.floor(Math.random() * (max - min + 1)) + min;
        const queueTimer = (callback: () => void, delay: number) => {
            const timer = setTimeout(callback, delay);
            timersRef.current.push(timer);
        };
        const getRandomDirection = (): HorizontalDirection => (Math.random() > 0.5 ? 1 : -1);
        const getRandomSpawnPosition = (direction: HorizontalDirection): Position => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const minX = direction === 1 ? Math.floor(width * 0.08) : Math.floor(width * 0.44);
            const maxX = direction === 1 ? Math.floor(width * 0.48) : Math.floor(width * 0.92);
            const minY = 64;
            const maxY = Math.max(minY, height - 260);

            return {
                x: randomBetween(minX, maxX),
                y: randomBetween(minY, maxY),
            };
        };
        const getRandomEntryConfig = (spawn: Position, direction: HorizontalDirection): EntryConfig => {
            const width = window.innerWidth;
            const extraOffset = randomBetween(140, 260);
            const deltaX = direction === 1
                ? -(spawn.x + extraOffset)
                : width - spawn.x + extraOffset;
            const deltaY = randomBetween(-50, 50);
            const rotation = direction === 1
                ? randomBetween(-16, -6)
                : randomBetween(6, 16);
            const duration = randomBetween(650, 1100);

            return { deltaX, deltaY, rotation, duration };
        };
        const getRandomFlightConfig = (spawn: Position, direction: HorizontalDirection): FlightConfig => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const deltaX = direction === 1
                ? width - spawn.x + randomBetween(240, 460)
                : -(spawn.x + randomBetween(240, 460));
            const deltaY = randomBetween(-Math.floor(height * 0.5), Math.floor(height * 0.2));
            const rotation = direction === 1
                ? (deltaY < -100 ? -16 : deltaY > 60 ? 8 : -8)
                : (deltaY < -100 ? 16 : deltaY > 60 ? -8 : 8);
            const duration = randomBetween(1250, 2000);

            return { deltaX, deltaY, rotation, duration };
        };
        const scheduleNextCycle = (isInitialRun: boolean) => {
            const delay = isInitialRun
                ? randomBetween(5000, 12000)
                : randomBetween(16000, 32000);

            queueTimer(() => {
                if (HIDDEN_PATHS.has(pathname)) return;

                const direction = getRandomDirection();
                const spawn = getRandomSpawnPosition(direction);
                const nextEntryConfig = getRandomEntryConfig(spawn, direction);
                const nextFlightConfig = getRandomFlightConfig(spawn, direction);
                const floatDuration = randomBetween(800, 1600);

                setPosition(spawn);
                setHorizontalDirection(direction);
                setEntryConfig(nextEntryConfig);
                setFlightConfig(nextFlightConfig);
                setCyclePath(pathname);
                setShowWoosh(true);
                setPhase("entering");

                queueTimer(() => {
                    setShowWoosh(false);
                    setPhase("floating");

                    queueTimer(() => {
                        setShowWoosh(true);
                        setPhase("flying");

                        queueTimer(() => {
                            setPhase("hidden");
                            setCyclePath(null);
                            setShowWoosh(false);
                            scheduleNextCycle(false);
                        }, nextFlightConfig.duration);
                    }, floatDuration);
                }, nextEntryConfig.duration);
            }, delay);
        };

        clearTimers();

        if (HIDDEN_PATHS.has(pathname)) {
            return;
        }

        scheduleNextCycle(true);

        return () => {
            clearTimers();
        };
    }, [clearTimers, pathname]);

    const handleClick = () => {
        track("superman_clicked", { page: pathname });
    };

    if (HIDDEN_PATHS.has(pathname) || phase === "hidden" || cyclePath !== pathname) return null;

    const flyStyle: CSSProperties = {
        "--superman-enter-x": `${entryConfig.deltaX}px`,
        "--superman-enter-y": `${entryConfig.deltaY}px`,
        "--superman-enter-rot": `${entryConfig.rotation}deg`,
        "--superman-enter-duration": `${entryConfig.duration}ms`,
        "--superman-fly-x": `${flightConfig.deltaX}px`,
        "--superman-fly-y": `${flightConfig.deltaY}px`,
        "--superman-fly-rot": `${flightConfig.rotation}deg`,
        "--superman-fly-duration": `${flightConfig.duration}ms`,
    } as CSSProperties;
    const directionStyle: CSSProperties = horizontalDirection === -1 ? { transform: "scaleX(-1)" } : {};

    return (
        <div
            className="fixed z-40 w-20 sm:w-24 pointer-events-auto cursor-pointer"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onClick={handleClick}
        >
            <div
                className={phase === "entering" ? "animate-superman-enter" : phase === "flying" ? "animate-superman-flyout" : ""}
                style={flyStyle}
            >
                <div style={directionStyle} className="opacity-40">
                    {/* Woosh trail effect */}
                    {showWoosh && (
                        <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-20 h-2 bg-gradient-to-r from-transparent via-blue-400/35 to-transparent rounded-full animate-superman-woosh" />
                    )}

                    <div className={phase === "floating" ? "animate-superman-float" : ""}>
                        {phase === "floating" ? (
                            <svg
                                viewBox="0 0 96 96"
                                className="w-full h-auto drop-shadow-[0_0_10px_rgba(59,130,246,0.35)]"
                                style={{ imageRendering: "pixelated" }}
                                shapeRendering="crispEdges"
                            >
                                {/* cape */}
                                <g className="animate-superman-cape origin-top-left">
                                    <rect x="18" y="34" width="6" height="22" fill="#B91C1C" />
                                    <rect x="24" y="32" width="8" height="26" fill="#DC2626" />
                                    <rect x="32" y="34" width="8" height="24" fill="#EF4444" />
                                    <rect x="16" y="44" width="10" height="10" fill="#DC2626" />
                                </g>

                                {/* head */}
                                <rect x="44" y="18" width="12" height="10" fill="#F5D0A9" />
                                <rect x="44" y="16" width="12" height="3" fill="#1F2937" />
                                <rect x="54" y="17" width="3" height="4" fill="#1F2937" />

                                {/* torso */}
                                <rect x="40" y="30" width="18" height="20" fill="#2563EB" />
                                <rect x="42" y="33" width="14" height="9" fill="#DC2626" />
                                <rect x="46" y="36" width="6" height="4" fill="#FCD34D" />
                                <rect x="42" y="50" width="14" height="3" fill="#FCD34D" />

                                {/* arms */}
                                <rect x="34" y="32" width="6" height="16" fill="#2563EB" />
                                <rect x="58" y="32" width="6" height="16" fill="#3B82F6" />
                                <rect x="34" y="48" width="6" height="4" fill="#F5D0A9" />
                                <rect x="58" y="48" width="6" height="4" fill="#F5D0A9" />

                                {/* legs */}
                                <rect x="42" y="53" width="6" height="18" fill="#2563EB" />
                                <rect x="50" y="53" width="6" height="18" fill="#3B82F6" />

                                {/* boots */}
                                <rect x="42" y="71" width="6" height="5" fill="#DC2626" />
                                <rect x="50" y="71" width="6" height="5" fill="#DC2626" />
                            </svg>
                        ) : (
                            <svg
                                viewBox="0 0 120 80"
                                className="w-full h-auto drop-shadow-[0_0_10px_rgba(59,130,246,0.35)]"
                                style={{ imageRendering: "auto" }}
                            >
                                {/* Cape - Red, billowing */}
                                <g className="animate-superman-cape origin-top-left">
                                    <path
                                        d="M35 25 Q20 35 15 55 L25 50 Q30 40 40 30 Z"
                                        fill="#DC2626"
                                    />
                                    <path
                                        d="M40 30 Q25 45 22 60 L32 55 Q35 42 45 33 Z"
                                        fill="#B91C1C"
                                    />
                                </g>

                                {/* Body - Blue suit */}
                                <ellipse cx="55" cy="40" rx="20" ry="12" fill="#2563EB" />

                                {/* Chest with S Logo */}
                                <path
                                    d="M45 35 L50 32 L60 32 L65 35 L63 42 L47 42 Z"
                                    fill="#DC2626"
                                />
                                {/* S symbol */}
                                <text
                                    x="55"
                                    y="40"
                                    textAnchor="middle"
                                    fontSize="8"
                                    fontWeight="bold"
                                    fill="#FCD34D"
                                    fontFamily="serif"
                                >
                                    S
                                </text>

                                {/* Head */}
                                <circle cx="72" cy="35" r="8" fill="#F5D0A9" />
                                {/* Hair - Black curl */}
                                <path
                                    d="M66 30 Q68 25 72 26 Q76 25 78 28 L76 32 Q73 28 70 32 Z"
                                    fill="#1F2937"
                                />

                                {/* Forward arm (extended) */}
                                <ellipse cx="88" cy="35" rx="12" ry="4" fill="#2563EB" />
                                {/* Fist */}
                                <circle cx="100" cy="35" r="4" fill="#F5D0A9" />

                                {/* Back arm */}
                                <ellipse cx="40" cy="42" rx="8" ry="3" fill="#2563EB" />

                                {/* Legs - Extended back */}
                                <ellipse cx="30" cy="48" rx="15" ry="4" fill="#2563EB" transform="rotate(-10 30 48)" />
                                <ellipse cx="32" cy="55" rx="14" ry="4" fill="#2563EB" transform="rotate(5 32 55)" />

                                {/* Red boots */}
                                <ellipse cx="18" cy="50" rx="5" ry="3" fill="#DC2626" transform="rotate(-10 18 50)" />
                                <ellipse cx="22" cy="58" rx="5" ry="3" fill="#DC2626" transform="rotate(5 22 58)" />

                                {/* Belt */}
                                <rect x="43" y="41" width="24" height="3" fill="#FCD34D" rx="1" />
                            </svg>
                        )}
                    </div>

                    {/* Speed lines */}
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                        <div className="w-7 h-0.5 bg-blue-400/20 rounded-full" />
                        <div className="w-10 h-0.5 bg-blue-400/35 rounded-full" />
                        <div className="w-6 h-0.5 bg-blue-400/20 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
