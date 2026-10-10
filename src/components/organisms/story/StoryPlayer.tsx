"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import StoryTimeline from "@/components/organisms/story/StoryTimeline";
import { Draggable, gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import type { StoryScene } from "@/lib/portfolioData";

// How each layer settles in when its scene starts (data-enter on the Layer).
const enterFrom: Record<string, gsap.TweenVars> = {
  up: { y: 48, autoAlpha: 0 },
  down: { y: -48, autoAlpha: 0 },
  left: { x: -64, autoAlpha: 0 },
  right: { x: 64, autoAlpha: 0 },
  scale: { scale: 0.92, autoAlpha: 0 },
  spin: { rotate: -10, scale: 0.94, autoAlpha: 0 },
  drop: { y: -56, rotate: 3, autoAlpha: 0 },
  fade: { autoAlpha: 0 },
};

// Timing, in seconds of playback.
const EXIT = 0.6; // outgoing shot drifts up and fades
const OVERLAP = 0.45; // incoming shot starts before the old one has gone
const ENTER = 0.9; // each layer settling in
const STAGGER = 0.08;
const HOLD = 4.5; // time to read a composed shot

// Scenes are composed on a fixed canvas, then scaled to fit the frame — like
// a video. Wide frames get the desktop composition, narrow ones the portrait.
const CANVAS = {
  wide: { w: 1440, h: 900 },
  tall: { w: 390, h: 760 },
} as const;

const timecode = (seconds: number) => {
  const frames = Math.round(seconds * 24);
  const s = Math.floor(frames / 24);
  return [0, Math.floor(s / 60), s % 60, frames % 24].map((n) => String(n).padStart(2, "0")).join(":");
};

/**
 * The process reel. The scenes play as one GSAP timeline over time, inside a
 * framed canvas that scales like a video — so the story never takes over the
 * page scroll. Autoplays when mostly on screen (unless reduced motion), pauses
 * when scrolled away, and can be paused, scrubbed, jumped by chapter, opened
 * fullscreen, or flipped into keyframe view.
 */
export default function StoryPlayer({ scenes, children }: { scenes: StoryScene[]; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const playhead = useRef<HTMLDivElement>(null);
  const timecodeEl = useRef<HTMLSpanElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const userPaused = useRef(false);
  const inView = useRef(false);

  const [fit, setFit] = useState<{ w: number; h: number; scale: number } | null>(null);
  const [markers, setMarkers] = useState<Record<string, number>>({});
  const [keyframes, setKeyframes] = useState<number[]>([]);
  const [active, setActive] = useState(scenes[0].id);
  const [craft, setCraft] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Fit the canvas to the frame (and to the screen in fullscreen).
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      const isFull = document.fullscreenElement === root.current;
      const c = width >= 640 ? CANVAS.wide : CANVAS.tall;
      const scale = isFull ? Math.min(width / c.w, el.clientHeight / c.h) : width / c.w;
      setFit({ ...c, scale });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    const onFullscreen = () => {
      setFullscreen(document.fullscreenElement === root.current);
      measure();
    };
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      observer.disconnect();
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, []);

  const play = useCallback(() => {
    timeline.current?.play();
    setPlaying(true);
  }, []);
  const pause = useCallback(() => {
    timeline.current?.pause();
    setPlaying(false);
  }, []);

  // Build the timeline once the canvas has its composition (wide or tall).
  useGSAP(
    () => {
      if (!fit || !canvas.current) return;
      const stage = canvas.current;
      const sceneEls = gsap.utils.toArray<HTMLElement>("[data-scene]", stage);
      const sceneIds = sceneEls.map((el) => el.dataset.scene!);
      const reduced = prefersReducedMotion();

      gsap.set(sceneEls.slice(1), { autoAlpha: 0 });
      stage.querySelectorAll<SVGPathElement>("[data-draw]").forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const starts: number[] = [];
      const keys: number[] = [];
      let current = "";

      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 1,
        defaults: { ease: "power3.out" },
        onUpdate: () => {
          const t = tl.time();
          if (playhead.current) playhead.current.style.left = `${(t / tl.duration()) * 100}%`;
          if (timecodeEl.current) timecodeEl.current.textContent = timecode(t);
          let scene = sceneIds[0];
          starts.forEach((start, i) => {
            if (start <= t) scene = sceneIds[i];
          });
          if (scene !== current) {
            current = scene;
            setActive(scene);
          }
        },
      });

      sceneEls.forEach((scene, i) => {
        const layers = scene.querySelectorAll<HTMLElement>("[data-enter]");
        let start = 0.15;
        if (i > 0) {
          // Dissolve: the last shot drifts up and fades while this one settles in.
          const prev = sceneEls[i - 1];
          const cut = tl.duration();
          tl.to(prev.querySelectorAll("[data-enter]"), { y: "-=40", autoAlpha: 0, duration: EXIT, stagger: 0.03, ease: "power1.in" }, cut);
          start = cut + OVERLAP;
          tl.set(scene, { autoAlpha: 1 }, start - 0.05);
        }
        starts.push(start);

        layers.forEach((layer, j) => {
          keys.push(start + j * STAGGER);
          tl.from(layer, { ...enterFrom[layer.dataset.enter ?? "up"], duration: ENTER, ease: "power2.out" }, start + j * STAGGER);
        });
        tl.to(scene.querySelectorAll("[data-draw]"), { strokeDashoffset: 0, duration: 0.9, ease: "power1.inOut" }, start + 0.35);
        if (i > 0) tl.set(sceneEls[i - 1], { autoAlpha: 0 }, start + ENTER);

        // Composed: hold the shot while layers drift by depth.
        const composed = start + ENTER + layers.length * STAGGER;
        tl.addLabel(sceneIds[i], composed);
        tl.to(scene.querySelectorAll<HTMLElement>("[data-depth]"), { y: (_: number, el: HTMLElement) => `-=${30 * Number(el.dataset.depth)}`, duration: HOLD, ease: "none" }, composed);
        tl.to(scene.querySelectorAll("[data-spin]"), { rotate: "+=60", duration: HOLD, ease: "none" }, composed);
        scene.querySelectorAll<HTMLElement>("[data-move]").forEach((el) =>
          tl.to(el, { left: el.dataset.move, duration: 1.6, ease: "power3.inOut" }, composed + 0.3),
        );
      });
      // Fade the final shot out so the loop restarts cleanly.
      tl.to(sceneEls[sceneEls.length - 1].querySelectorAll("[data-enter]"), { autoAlpha: 0, duration: EXIT, ease: "power1.in" });

      const total = tl.duration();
      setMarkers(Object.fromEntries(sceneIds.map((id) => [id, tl.labels[id] / total])));
      setKeyframes(keys.map((k) => k / total));
      timeline.current = tl;

      // Reduced motion: show the first shot composed and wait for the visitor.
      if (reduced) tl.seek(sceneIds[0], false);
      else if (inView.current && !userPaused.current) play();

      return () => {
        timeline.current = null;
        tl.kill();
      };
    },
    { scope: canvas, dependencies: [fit?.w], revertOnUpdate: true },
  );

  // Autoplay while mostly on screen; pause when scrolled away.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (!entry.isIntersecting) pause();
        else if (!userPaused.current && !prefersReducedMotion()) play();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [play, pause]);

  // Pointer parallax + draggable scraps (fine pointers, motion allowed).
  useGSAP(
    () => {
      if (!fit) return;
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const stage = canvas.current!;
        const frame = viewport.current!;
        const onPointer = (e: PointerEvent) => {
          const rect = frame.getBoundingClientRect();
          gsap.to(stage, {
            "--mx": ((e.clientX - rect.left) / rect.width) * 2 - 1,
            "--my": ((e.clientY - rect.top) / rect.height) * 2 - 1,
            duration: 1,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        frame.addEventListener("pointermove", onPointer);
        const draggables = Draggable.create(stage.querySelectorAll("[data-drag]"), {
          type: "x,y",
          bounds: stage,
          zIndexBoost: true,
          onPress() {
            gsap.to(this.target, { scale: 1.06, duration: 0.2 });
          },
          onRelease() {
            gsap.to(this.target, { scale: 1, duration: 0.3, ease: "back.out(3)" });
          },
          onDragEnd() {
            track("reel_drag", { layer: (this.target as HTMLElement).closest<HTMLElement>("[data-layer]")?.dataset.layer ?? "" });
          },
        });
        return () => {
          frame.removeEventListener("pointermove", onPointer);
          draggables.forEach((d) => d.kill());
        };
      });
      return () => mm.revert();
    },
    { dependencies: [fit?.w] },
  );

  const togglePlay = () => {
    if (playing) {
      userPaused.current = true;
      pause();
    } else {
      userPaused.current = false;
      play();
      track("reel_play");
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else {
      root.current?.requestFullscreen?.();
      track("reel_fullscreen");
    }
  };

  return (
    <div
      ref={root}
      data-craft={craft ? "on" : "off"}
      className={`overflow-hidden border border-border bg-paper ${fullscreen ? "flex h-screen flex-col" : "rounded-sm"}`}
    >
      <div
        ref={viewport}
        className={`reel-viewport relative isolate overflow-hidden ${fullscreen ? "flex-1" : ""}`}
        style={fit && !fullscreen ? { height: fit.h * fit.scale } : fullscreen ? undefined : { aspectRatio: "16 / 10" }}
      >
        {/* Static safelight backdrop (the WebGL shader stays in the hero). */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_92%_8%,color-mix(in_srgb,var(--accent)_32%,transparent),transparent_55%),radial-gradient(ellipse_at_15%_85%,var(--paper-raised),transparent_60%)]" />
        <div
          ref={canvas}
          className={`@container absolute left-1/2 top-1/2 ${fit ? "" : "invisible"}`}
          style={
            fit
              ? { width: fit.w, height: fit.h, transform: `translate(-50%, -50%) scale(${fit.scale})` }
              : { width: CANVAS.wide.w, height: CANVAS.wide.h }
          }
        >
          {children}
        </div>
      </div>

      <StoryTimeline
        scenes={scenes}
        markers={markers}
        keyframes={keyframes}
        active={active}
        craft={craft}
        playing={playing}
        fullscreen={fullscreen}
        // suppressEvents=false so the playhead, timecode and chapter update while paused
        onJump={(id) => timeline.current?.seek(id, false)}
        onSeek={(ratio) => timeline.current?.progress(ratio, false)}
        onToggleCraft={() => {
          setCraft((c) => !c);
          track("reel_keyframes", { on: !craft });
        }}
        onTogglePlay={togglePlay}
        onToggleFullscreen={toggleFullscreen}
        playheadRef={playhead}
        timecodeRef={timecodeEl}
      />
    </div>
  );
}
