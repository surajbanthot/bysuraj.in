"use client";

import { useEffect, useRef } from "react";

type PixelatedVideoBackgroundProps = {
    src: string;
    className?: string;
};

export default function PixelatedVideoBackground({
    src,
    className = "",
}: PixelatedVideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure video plays on mount
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.16;
            videoRef.current.play().catch(() => {
                // Autoplay may be blocked, that's okay
            });
        }
    }, []);

    return (
        <div className={`fixed inset-0 z-0 overflow-hidden ${className}`}>
            {/* Pixelation container - scales down then up for chunky pixels */}
            <div
                className="absolute inset-0"
                style={{
                    imageRendering: "pixelated",
                }}
            >
                {/* Video layer with cartoon pixelation effect */}
                <video
                    ref={videoRef}
                    className="absolute h-full w-full object-cover"
                    style={{
                        filter: "contrast(1.1) saturate(1.3) brightness(0.95)",
                        imageRendering: "pixelated",
                        // Scale down then up for chunky pixel effect
                        width: "calc(100% / 4)",
                        height: "calc(100% / 4)",
                        transform: "scale(4)",
                        transformOrigin: "top left",
                    }}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={(e) => {
                        e.currentTarget.playbackRate = 0.16;
                    }}
                />
            </div>

            {/* Dark gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />

            {/* Scanline effect for retro CRT feel */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)",
                }}
            />

            {/* Subtle vignette effect */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    boxShadow: "inset 0 0 150px 60px rgba(0,0,0,0.4)",
                }}
            />
        </div>
    );
}
