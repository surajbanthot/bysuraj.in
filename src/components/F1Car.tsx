"use client";

import { useEffect, useState, useRef } from "react";

export default function F1Car() {
    const [isDriving, setIsDriving] = useState(false);
    const [isBurning, setIsBurning] = useState(false);
    const [isCrashed, setIsCrashed] = useState(false);
    const [tombstonePos, setTombstonePos] = useState({ x: 0, y: 0 });
    const [showFastMsg, setShowFastMsg] = useState(false);
    const [isSinking, setIsSinking] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>(null);
    const burnStartRef = useRef<NodeJS.Timeout>(null);
    const burnEndRef = useRef<NodeJS.Timeout>(null);
    const msgStartRef = useRef<NodeJS.Timeout>(null);
    const msgEndRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        // Initial start
        const startDelay = Math.random() * 5000 + 1000;
        timerRef.current = setTimeout(startSequence, startDelay);

        return () => {
            clearAllTimers();
        };
    }, []);

    const clearAllTimers = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (burnStartRef.current) clearTimeout(burnStartRef.current);
        if (burnEndRef.current) clearTimeout(burnEndRef.current);
        if (msgStartRef.current) clearTimeout(msgStartRef.current);
        if (msgEndRef.current) clearTimeout(msgEndRef.current);
    };

    const startSequence = () => {
        setIsDriving(true);
        setIsCrashed(false); // Reset crash state

        // Animation Duration is 6s total.
        // 0-30% (1.8s): Drive In
        // 30-70% (Wait): Wait Phase (until 4.2s)
        // Start burnout at 2.2s

        burnStartRef.current = setTimeout(() => setIsBurning(true), 2200);
        burnEndRef.current = setTimeout(() => setIsBurning(false), 3800);

        // Message "I'm fast AF boy!!" just before takeoff
        msgStartRef.current = setTimeout(() => setShowFastMsg(true), 2200);
        msgEndRef.current = setTimeout(() => setShowFastMsg(false), 3500);
    };

    const resetAndSchedule = (delay: number) => {
        setIsDriving(false);
        setIsBurning(false);
        setIsCrashed(false);
        setShowFastMsg(false);
        setIsSinking(false);

        clearAllTimers();
        timerRef.current = setTimeout(startSequence, delay);
    };

    const handleAnimationEnd = () => {
        // Normal end (drove off screen) - Random delay 10-30s
        const nextDelay = Math.random() * 20000 + 10000;
        resetAndSchedule(nextDelay);
    };

    const handleCrash = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isCrashed) return;

        // Force Tombstone in front of the car
        // Car width is w-20 (80px) to w-28 (112px).
        // scale is based on parent.
        const frontX = 100; // Place it ahead of the nose
        const groundY = 10; // Slightly adjusting for visual baseline

        setTombstonePos({ x: frontX, y: groundY });
        setIsCrashed(true);
        setIsSinking(false);
        setIsBurning(false); // Stop normal burnout
        setShowFastMsg(false); // Hide fast message if active
        clearAllTimers(); // Stop scheduling next phases

        // Start sink animation at 1.5s
        setTimeout(() => setIsSinking(true), 1500);

        // Full reset at 2.5s
        // Full reset at 2.5s -> Restart Immediately (500ms delay)
        setTimeout(() => resetAndSchedule(500), 2500);
    };

    if (!isDriving) return null;

    return (
        <div
            className={`fixed bottom-24 left-0 z-20 w-20 sm:w-28 origin-bottom animate-f1-sequence ${isCrashed ? "cursor-default" : "cursor-pointer pointer-events-auto"}`}
            style={{
                imageRendering: "pixelated",
                animationPlayState: isCrashed ? "paused" : "running"
            }}
            onAnimationEnd={isCrashed ? undefined : handleAnimationEnd}
            onClick={handleCrash}
        >
            {/* Massive Hitbox (Even bigger) */}
            <div className="absolute -top-64 -bottom-64 -left-64 -right-64 z-50 cursor-pointer" />



            {/* Tombstone Scene - Persists LONGER (Outside fade container) */}
            {isCrashed && (
                <>
                    {/* Pixel Ghost - Flies Up */}
                    <div
                        className="absolute z-50 -translate-x-1/2 -translate-y-1/2 animate-ghost"
                        style={{ left: tombstonePos.x, top: tombstonePos.y }}
                    >
                        <svg viewBox="0 0 24 24" className="h-10 w-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" shapeRendering="crispEdges">
                            <path d="M4 22 V10 A8 8 0 0 1 20 10 V22 L16 18 L12 22 L8 18 Z" fill="white" opacity="0.9" />
                            <rect x="7" y="9" width="3" height="3" fill="black" />
                            <rect x="14" y="9" width="3" height="3" fill="black" />
                        </svg>
                    </div>

                    <div
                        className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: tombstonePos.x, top: tombstonePos.y }}
                    >
                        <div className={isSinking ? "animate-sink" : ""}>
                            {/* Size 320x320 for detailed pixel art */}
                            <svg viewBox="0 0 320 320" shapeRendering="crispEdges" className="h-28 w-28 drop-shadow-2xl" style={{ overflow: "visible" }}>
                                {/* Soft glow behind tombstone */}
                                {/* Soft glow removed */}

                                {/* Tombstone Group - Tilted */}
                                <g transform="rotate(-6, 160, 260)">
                                    {/* outer dark edge */}
                                    <rect x="104" y="56" width="112" height="172" fill="#36424C" />
                                    <rect x="100" y="60" width="120" height="164" fill="#36424C" />
                                    <rect x="108" y="48" width="104" height="16" fill="#36424C" />
                                    <rect x="112" y="44" width="96" height="12" fill="#36424C" />
                                    <rect x="120" y="40" width="80" height="8" fill="#36424C" />

                                    {/* main stone */}
                                    <rect x="108" y="60" width="104" height="164" fill="#5B6B78" />
                                    <rect x="112" y="52" width="96" height="172" fill="#5B6B78" />
                                    <rect x="116" y="48" width="88" height="176" fill="#5B6B78" />
                                    <rect x="124" y="44" width="72" height="180" fill="#5B6B78" />

                                    {/* right-side depth */}
                                    <rect x="200" y="52" width="8" height="172" fill="#4A5761" />
                                    <rect x="204" y="60" width="8" height="164" fill="#3D4A53" />

                                    {/* highlights */}
                                    <rect x="124" y="60" width="8" height="164" fill="#7F92A3" opacity="0.65" />
                                    <rect x="132" y="68" width="8" height="148" fill="#7F92A3" opacity="0.35" />
                                    <rect x="140" y="76" width="8" height="132" fill="#7F92A3" opacity="0.20" />

                                    {/* Moss / vines on top */}
                                    <g>
                                        <rect x="132" y="44" width="8" height="8" fill="#2F6B3E" />
                                        <rect x="140" y="48" width="8" height="8" fill="#2F6B3E" />
                                        <rect x="148" y="52" width="8" height="8" fill="#2F6B3E" />
                                        <rect x="156" y="56" width="8" height="8" fill="#2F6B3E" />
                                        <rect x="164" y="52" width="8" height="8" fill="#3E8450" />
                                        <rect x="172" y="48" width="8" height="8" fill="#3E8450" />
                                        <rect x="180" y="44" width="8" height="8" fill="#3E8450" />

                                        {/* small drips */}
                                        <rect x="156" y="64" width="4" height="8" fill="#2F6B3E" />
                                        <rect x="160" y="72" width="4" height="8" fill="#2F6B3E" />
                                        <rect x="176" y="60" width="4" height="8" fill="#3E8450" />
                                        <rect x="180" y="68" width="4" height="8" fill="#3E8450" />
                                    </g>

                                    {/* Stone cracks */}
                                    <g opacity="0.55">
                                        <rect x="144" y="72" width="4" height="12" fill="#36424C" />
                                        <rect x="148" y="84" width="8" height="4" fill="#36424C" />
                                        <rect x="156" y="88" width="4" height="12" fill="#36424C" />
                                        <rect x="160" y="100" width="8" height="4" fill="#36424C" />
                                        <rect x="168" y="104" width="4" height="12" fill="#36424C" />
                                        <rect x="172" y="116" width="8" height="4" fill="#36424C" />
                                    </g>

                                    {/* Skull + crossbones (simple pixel motif) */}
                                    <g>
                                        {/* skull */}
                                        <rect x="148" y="96" width="24" height="20" fill="#E7EEF4" />
                                        <rect x="144" y="100" width="32" height="16" fill="#E7EEF4" />
                                        <rect x="148" y="112" width="24" height="12" fill="#E7EEF4" />

                                        {/* eyes */}
                                        <rect x="152" y="108" width="8" height="8" fill="#1E2328" />
                                        <rect x="164" y="108" width="8" height="8" fill="#1E2328" />

                                        {/* nose */}
                                        <rect x="160" y="118" width="4" height="4" fill="#1E2328" />

                                        {/* crossbones */}
                                        <rect x="132" y="136" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="140" y="140" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="148" y="144" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="156" y="148" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="164" y="152" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="172" y="156" width="8" height="4" fill="#E7EEF4" />

                                        <rect x="188" y="136" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="180" y="140" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="172" y="144" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="164" y="148" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="156" y="152" width="8" height="4" fill="#E7EEF4" />
                                        <rect x="148" y="156" width="8" height="4" fill="#E7EEF4" />
                                    </g>

                                    {/* Engraving lines */}
                                    <g opacity="0.45">
                                        <rect x="136" y="180" width="56" height="4" fill="#36424C" />
                                        <rect x="140" y="188" width="48" height="4" fill="#36424C" />
                                        <rect x="144" y="196" width="40" height="4" fill="#36424C" />
                                    </g>
                                </g>

                                {/* Ground + grass */}
                                <g>
                                    <rect x="84" y="224" width="156" height="20" fill="#1C1F22" />
                                    <rect x="76" y="240" width="176" height="12" fill="#15181B" />

                                    {/* tufts */}
                                    <rect x="92" y="216" width="8" height="8" fill="#2F6B3E" />
                                    <rect x="96" y="212" width="8" height="8" fill="#2F6B3E" />
                                    <rect x="104" y="216" width="8" height="8" fill="#3E8450" />

                                    <rect x="212" y="216" width="8" height="8" fill="#2F6B3E" />
                                    <rect x="216" y="212" width="8" height="8" fill="#2F6B3E" />
                                    <rect x="224" y="216" width="8" height="8" fill="#3E8450" />
                                </g>

                                {/* Subtle purple mist (pixel wisps) */}
                                <g opacity="0.55">
                                    <rect x="76" y="216" width="8" height="8" fill="#8D79FF" />
                                    <rect x="72" y="224" width="8" height="8" fill="#8D79FF" />
                                    <rect x="76" y="232" width="8" height="8" fill="#8D79FF" />

                                    <rect x="244" y="216" width="8" height="8" fill="#8D79FF" />
                                    <rect x="248" y="224" width="8" height="8" fill="#8D79FF" />
                                    <rect x="244" y="232" width="8" height="8" fill="#8D79FF" />
                                </g>

                                {/* Flowers next to tombstone (right side) */}
                                <g>
                                    {/* stems */}
                                    <rect x="252" y="220" width="4" height="20" fill="#2F6B3E" />
                                    <rect x="264" y="224" width="4" height="16" fill="#2F6B3E" />
                                    <rect x="276" y="218" width="4" height="22" fill="#2F6B3E" />

                                    {/* leaves */}
                                    <rect x="248" y="232" width="4" height="4" fill="#3E8450" />
                                    <rect x="256" y="236" width="4" height="4" fill="#3E8450" />

                                    <rect x="260" y="232" width="4" height="4" fill="#3E8450" />
                                    <rect x="268" y="236" width="4" height="4" fill="#3E8450" />

                                    <rect x="272" y="232" width="4" height="4" fill="#3E8450" />
                                    <rect x="280" y="236" width="4" height="4" fill="#3E8450" />

                                    {/* flower 1 (pink) */}
                                    <rect x="244" y="208" width="4" height="4" fill="#FF6FAE" />
                                    <rect x="252" y="204" width="4" height="4" fill="#FF6FAE" />
                                    <rect x="260" y="208" width="4" height="4" fill="#FF6FAE" />
                                    <rect x="252" y="212" width="4" height="4" fill="#FF6FAE" />
                                    <rect x="252" y="208" width="4" height="4" fill="#FFD34D" />

                                    {/* flower 2 (yellow) */}
                                    <rect x="260" y="212" width="4" height="4" fill="#FFD34D" />
                                    <rect x="264" y="208" width="4" height="4" fill="#FFD34D" />
                                    <rect x="268" y="212" width="4" height="4" fill="#FFD34D" />
                                    <rect x="264" y="216" width="4" height="4" fill="#FFD34D" />
                                    <rect x="264" y="212" width="4" height="4" fill="#FF6FAE" />

                                    {/* flower 3 (pink) */}
                                    <rect x="272" y="204" width="4" height="4" fill="#FF6FAE" />
                                    <rect x="276" y="200" width="4" height="4" fill="#FF6FAE" />
                                    <rect x="280" y="204" width="4" height="4" fill="#FF6FAE" />
                                    <rect x="276" y="208" width="4" height="4" fill="#FF6FAE" />
                                    <rect x="276" y="204" width="4" height="4" fill="#FFD34D" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </>
            )}

            {/* Inner container for crash fade out (Car only) */}
            <div className={isCrashed ? "animate-crash-sequence" : ""}>

                {/* Speech Bubble on Crash */}
                {isCrashed && (
                    <div className="absolute -top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap border-2 border-black bg-white px-2 py-1 text-xs font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-bounce font-mono sm:text-sm">
                        Damn you, human!!!
                        {/* Arrow */}
                        <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-black bg-white"></div>
                    </div>
                )}

                <div className={`relative ${isBurning ? "animate-f1-burnout" : ""}`}>
                    <svg viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                        {/* McLaren F1 Pixel Art Style */}

                        {/* Main Body - Papaya Orange */}
                        <path d="M12 10 H56 V16 H12 Z" fill="#FF8700" />

                        {/* Rear Wing/Spoiler */}
                        <rect x="2" y="4" width="8" height="12" fill="#FF8700" />
                        <rect x="4" y="6" width="4" height="4" fill="#111" opacity="0.5" />

                        {/* Cockpit Area */}
                        <path d="M30 6 H40 V10 H30 Z" fill="#FF8700" />
                        <rect x="34" y="6" width="4" height="4" fill="#222" /> {/* Driver */}
                        <rect x="35" y="5" width="2" height="2" fill="#FFD700" /> {/* Helmet */}

                        {/* Nose */}
                        <rect x="56" y="12" width="6" height="2" fill="#FF8700" />

                        {/* Wheels - Black */}
                        <circle cx="16" cy="16" r="5" fill="#111" />
                        <circle cx="16" cy="16" r="2" fill="#333" />

                        {/* Wheels - Black */}
                        <circle cx="50" cy="16" r="5" fill="#111" />
                        <circle cx="50" cy="16" r="2" fill="#333" />

                        {/* Decals/Details */}
                        <rect x="22" y="11" width="20" height="2" fill="#111" opacity="0.2" />
                        <rect x="42" y="8" width="2" height="2" fill="#111" /> {/* Mirror */}

                    </svg>

                    {/* Smoke Clouds - Only visible during burnout */}
                    {isBurning && !isCrashed && (
                        <div className="absolute bottom-0 -left-8 z-[-1] flex">
                            {/* Pixelated smoke particles */}
                            <div className="h-4 w-4 bg-zinc-300 animate-smoke-1 rounded-sm opacity-80" />
                            <div className="h-6 w-6 bg-zinc-400 animate-smoke-2 -ml-2 rounded-sm opacity-80" />
                            <div className="h-5 w-5 bg-zinc-200 animate-smoke-3 -ml-2 rounded-sm opacity-80" />
                        </div>
                    )}

                    {/* FIRE - Visible on Crash */}
                    {isCrashed && (
                        <div className="absolute -bottom-8 -left-4 z-50 h-32 w-32 animate-fire opacity-90 pointer-events-none">
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Pixel Fire */}
                                <rect x="10" y="10" width="12" height="12" fill="#EF4444" />
                                <rect x="12" y="8" width="8" height="4" fill="#F97316" />
                                <rect x="14" y="6" width="4" height="4" fill="#EAB308" />
                                <rect x="8" y="14" width="4" height="6" fill="#EF4444" />
                                <rect x="20" y="14" width="4" height="6" fill="#EF4444" />
                                <rect x="12" y="12" width="8" height="8" fill="#F97316" />
                                <rect x="14" y="14" width="4" height="4" fill="#FFF" opacity="0.5" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Engine Glow */}
                <div className="absolute bottom-2 left-2 h-1 w-4 bg-blue-400 blur-[2px]" />
            </div>
        </div>
    );
}
