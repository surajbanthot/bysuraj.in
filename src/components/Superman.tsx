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
            const minX = direction === 1 ? Math.floor(width * 0.12) : Math.floor(width * 0.48);
            const maxX = direction === 1 ? Math.floor(width * 0.52) : Math.floor(width * 0.88);
            const minY = 64;
            const maxY = Math.max(minY, height - 220);

            return {
                x: randomBetween(minX, maxX),
                y: randomBetween(minY, maxY),
            };
        };
        const getRandomEntryConfig = (spawn: Position, direction: HorizontalDirection): EntryConfig => {
            const width = window.innerWidth;
            const extraOffset = randomBetween(90, 180);
            const deltaX = direction === 1
                ? -(spawn.x + extraOffset)
                : width - spawn.x + extraOffset;
            const deltaY = randomBetween(-50, 50);
            const rotation = direction === 1
                ? randomBetween(-16, -6)
                : randomBetween(6, 16);
            const duration = randomBetween(700, 1200);

            return { deltaX, deltaY, rotation, duration };
        };
        const getRandomFlightConfig = (spawn: Position, direction: HorizontalDirection): FlightConfig => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const deltaX = direction === 1
                ? width - spawn.x + randomBetween(180, 360)
                : -(spawn.x + randomBetween(180, 360));
            const deltaY = randomBetween(-Math.floor(height * 0.5), Math.floor(height * 0.2));
            const rotation = direction === 1
                ? (deltaY < -100 ? -16 : deltaY > 60 ? 8 : -8)
                : (deltaY < -100 ? 16 : deltaY > 60 ? -8 : 8);
            const duration = randomBetween(1400, 2400);

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
                const floatDuration = randomBetween(700, 1700);

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
            className="fixed z-40 w-14 sm:w-16 pointer-events-auto cursor-pointer"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onClick={handleClick}
        >
            <div
                className={phase === "entering" ? "animate-superman-enter" : phase === "flying" ? "animate-superman-flyout" : ""}
                style={flyStyle}
            >
                <div style={directionStyle} className="opacity-25">
                    {/* Woosh trail effect */}
                    {showWoosh && (
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-14 h-1.5 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent rounded-full animate-superman-woosh" />
                    )}

                    <div className={phase === "floating" ? "animate-superman-float" : ""}>
                        {/* Superman SVG - Flying pose */}
                        <svg
                            viewBox="0 0 120 80"
                            className="w-full h-auto drop-shadow-[0_0_6px_rgba(59,130,246,0.25)]"
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
                    </div>

                    {/* Speed lines */}
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                        <div className="w-5 h-0.5 bg-blue-400/10 rounded-full" />
                        <div className="w-7 h-0.5 bg-blue-400/20 rounded-full" />
                        <div className="w-4 h-0.5 bg-blue-400/10 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
