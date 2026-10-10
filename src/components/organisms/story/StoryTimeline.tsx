"use client";

import type { RefObject } from "react";
import Button from "@/components/atoms/Button";
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
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 border-t border-border bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-5 py-3 sm:gap-5 sm:px-8">
        {canPlay && (
          <Button
            size="sm"
            variant="outline"
            iconOnly
            pressed={playing}
            onClick={onTogglePlay}
            aria-label={playing ? "Pause the reel" : "Play the reel"}
          >
            <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
          </Button>
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

        <Button size="sm" variant="outline" pressed={craft} onClick={onToggleCraft}>
          <span aria-hidden="true">◇</span>
          <span className="hidden sm:inline">Keyframes</span>
        </Button>
      </div>
    </div>
  );
}
