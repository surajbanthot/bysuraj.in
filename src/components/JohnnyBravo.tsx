"use client";

import { useEffect, useState, useRef } from "react";

export default function JohnnyBravo() {
    const [isPeeking, setIsPeeking] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        // Initial start
        const startDelay = Math.random() * 8000 + 4000;
        timerRef.current = setTimeout(() => setIsPeeking(true), startDelay);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleAnimationEnd = () => {
        setIsPeeking(false);

        // Schedule next run (random 15-45s)
        const nextDelay = Math.random() * 30000 + 15000;

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsPeeking(true);
        }, nextDelay);
    };

    if (!isPeeking) return null;

    return (
        <div
            className="fixed bottom-0 right-0 z-50 w-48 sm:w-64 animate-johnny pointer-events-none origin-bottom-right"
            onAnimationEnd={handleAnimationEnd}
        >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                {/* Hair - Iconic Pompadour */}
                <path
                    d="M60 60 C40 20 100 -20 140 20 C170 0 190 40 160 70 L150 80 H60 L60 60 Z"
                    fill="#FFD700"
                    stroke="black"
                    strokeWidth="3"
                />

                {/* Face Shape (Jaw text-zinc-900) */}
                <path
                    d="M70 70 H140 V130 C140 150 120 160 105 160 C90 160 70 150 70 130 V70 Z"
                    fill="#F1C27D"
                    stroke="black"
                    strokeWidth="3"
                />

                {/* Ear */}
                <path d="M60 100 C50 100 50 130 70 125" fill="#F1C27D" stroke="black" strokeWidth="3" />

                {/* Shades (Black Rectangle with white glint) */}
                <path d="M80 90 H130 V110 C130 115 125 120 120 120 H90 C85 120 80 115 80 110 V90 Z" fill="black" />
                <line x1="105" y1="90" x2="105" y2="120" stroke="#333" strokeWidth="2" />
                {/* Glint on glasses */}
                <path d="M85 95 L100 95 L85 110 Z" fill="white" opacity="0.3" />

                {/* Smirk */}
                <path
                    d="M100 140 Q125 145 120 135"
                    stroke="black"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                <path d="M120 135 L115 137" stroke="black" strokeWidth="3" strokeLinecap="round" /> {/* Dimple */}

                {/* Neck */}
                <rect x="90" y="160" width="30" height="20" fill="#F1C27D" stroke="black" strokeWidth="3" />

                {/* Black T-Shirt Body */}
                <path d="M50 180 H160 V200 H50 Z" fill="black" stroke="black" strokeWidth="3" />

                {/* Muscles (Shoulders) */}
                <circle cx="50" cy="190" r="20" fill="#F1C27D" stroke="black" strokeWidth="3" />
            </svg>
        </div>
    );
}
