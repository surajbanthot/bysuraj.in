"use client";

import type { RefObject } from "react";
import type { StoryScene } from "@/lib/portfolioData";

type StoryTimelineProps = {
  scenes: StoryScene[];
  /** Where each scene's marker sits on the track, 0–1. */
  markers: Record<string, number>;
  /** Layer keyframe positions, 0–1 — shown in keyframe view. */
  keyframes: number[];
  active: string;
  craft: boolean;
  playing: boolean;
  canPlay: boolean;
  onJump: (id: string) => void;
  onToggleCraft: () => void;
  onTogglePlay: () => void;
  playheadRef: RefObject<HTMLDivElement | null>;
  timecodeRef: RefObject<HTMLSpanElement | null>;
};

/**
 * The editor chrome along the bottom of the stage: timecode, a track with a
 * marker per scene (click to jump), the playhead, and toggles for playing the
 * piece hands-free and for showing the keyframes and layers behind it.
 */
export default function StoryTimeline({
  scenes,
  markers,
  keyframes,
  active,
  craft,
  playing,
  canPlay,
  onJump,
  onToggleCraft,
  onTogglePlay,
  playheadRef,
  timecodeRef,
}: StoryTimelineProps) {
  const button =
    "inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-3 font-mono text-sm uppercase tracking-wider transition-colors";

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 border-t border-border bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-5 py-3 sm:gap-5 sm:px-8">
        {canPlay && (
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={playing ? "Pause the reel" : "Play the reel"}
            className={`${button} w-9 justify-center !px-0 ${playing ? "border-accent bg-accent text-paper" : "border-border text-ink hover:border-accent"}`}
          >
            <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
          </button>
        )}

        <span ref={timecodeRef} className="hidden font-mono text-sm tabular-nums text-ink sm:inline" aria-hidden="true">
          00:00:00:00
        </span>

        <div className="relative h-9 min-w-0 flex-1">
          {/* track */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-border" />

          {/* layer keyframes, only in keyframe view */}
          {craft &&
            keyframes.map((k, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute top-[calc(50%+6px)] h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-faint"
                style={{ left: `${k * 100}%` }}
              />
            ))}

          {/* scene markers */}
          {scenes.map((s) =>
            markers[s.id] === undefined ? null : (
              <button
                key={s.id}
                type="button"
                onClick={() => onJump(s.id)}
                aria-label={`Jump to ${s.act}: ${s.marker}`}
                aria-current={active === s.id ? "step" : undefined}
                className="group absolute top-0 flex h-9 -translate-x-1/2 flex-col items-center justify-center"
                style={{ left: `${markers[s.id] * 100}%` }}
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rotate-45 border transition-colors ${
                    active === s.id ? "border-accent bg-accent" : "border-faint bg-paper group-hover:border-accent"
                  }`}
                />
                <span
                  className={`pointer-events-none absolute -top-7 hidden whitespace-nowrap font-mono text-sm transition-colors lg:block ${
                    active === s.id ? "text-accent" : "text-faint group-hover:text-ink"
                  }`}
                >
                  {s.marker}
                </span>
              </button>
            ),
          )}

          {/* playhead */}
          <div ref={playheadRef} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-px bg-accent">
            <span className="absolute -left-[5px] -top-1 h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-accent" />
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleCraft}
          aria-pressed={craft}
          className={`${button} ${craft ? "border-accent bg-accent text-paper" : "border-border text-ink hover:border-accent"}`}
        >
          <span aria-hidden="true">◇</span>
          <span className="hidden sm:inline">Keyframes</span>
        </button>
      </div>
    </div>
  );
}
