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
  fullscreen: boolean;
  onJump: (id: string) => void;
  onSeek: (ratio: number) => void;
  onToggleCraft: () => void;
  onTogglePlay: () => void;
  onToggleFullscreen: () => void;
  playheadRef: RefObject<HTMLDivElement | null>;
  timecodeRef: RefObject<HTMLSpanElement | null>;
};

/**
 * The reel's editor-style controls under the frame: play/pause, timecode, a
 * track with a marker per chapter (click a marker to jump, the track to seek),
 * the playhead, the keyframe view toggle and fullscreen.
 */
export default function StoryTimeline({
  scenes,
  markers,
  keyframes,
  active,
  craft,
  playing,
  fullscreen,
  onJump,
  onSeek,
  onToggleCraft,
  onTogglePlay,
  onToggleFullscreen,
  playheadRef,
  timecodeRef,
}: StoryTimelineProps) {
  return (
    <div className="flex items-center gap-3 border-t border-border bg-paper-raised/60 px-4 pb-3 pt-4 sm:gap-5 sm:px-6">
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

      <span ref={timecodeRef} className="hidden font-mono text-sm tabular-nums text-ink sm:inline" aria-hidden="true">
        00:00:00:00
      </span>

      <div className="relative h-12 min-w-0 flex-1">
        {/* track — click anywhere to seek */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-6 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onSeek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
          }}
        >
          <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
        </div>

        {/* layer keyframes, only in keyframe view */}
        {craft &&
          keyframes.map((k, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute top-[15px] h-1.5 w-px bg-faint/70"
              style={{ left: `${k * 100}%` }}
            />
          ))}

        {/* chapter markers */}
        {scenes.map((s) =>
          markers[s.id] === undefined ? null : (
            <button
              key={s.id}
              type="button"
              onClick={() => onJump(s.id)}
              aria-label={`Jump to ${s.act}: ${s.marker}`}
              aria-current={active === s.id ? "step" : undefined}
              className="group absolute top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center"
              style={{ left: `${markers[s.id] * 100}%` }}
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 rotate-45 border transition-colors ${
                  active === s.id ? "border-accent bg-accent" : "border-faint bg-paper group-hover:border-accent"
                }`}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-6 hidden whitespace-nowrap font-mono text-sm transition-colors lg:block ${
                  active === s.id ? "text-accent" : "text-faint group-hover:text-ink"
                }`}
              >
                {s.marker}
              </span>
            </button>
          ),
        )}

        {/* playhead */}
        <div ref={playheadRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-6 w-px bg-accent">
          <span className="absolute -left-[5px] -top-1 h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-accent" />
        </div>
      </div>

      <Button size="sm" variant="outline" pressed={craft} onClick={onToggleCraft}>
        <span aria-hidden="true">◇</span>
        <span className="hidden sm:inline">Keyframes</span>
      </Button>
      <Button
        size="sm"
        variant="outline"
        iconOnly
        onClick={onToggleFullscreen}
        aria-label={fullscreen ? "Exit fullscreen" : "Watch fullscreen"}
        className="hidden sm:inline-flex"
      >
        <span aria-hidden="true">{fullscreen ? "⤡" : "⤢"}</span>
      </Button>
    </div>
  );
}
