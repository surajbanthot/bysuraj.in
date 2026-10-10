"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import HeroBackdrop from "@/components/HeroBackdrop";
import StoryTimeline from "@/components/StoryTimeline";
import { Draggable, gsap, getLenis, useGSAP } from "@/lib/motion";
import { storyStore } from "@/lib/storyStore";
import type { StoryScene } from "@/lib/portfolioData";

// How each layer settles in when its scene starts (data-enter on the Layer).
// Short, soft moves — the piece should glide between shots, not jump.
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

// The piece is presented as a 60-second edit at 24fps.
const RUNTIME = 60;
const FPS = 24;
const timecode = (progress: number) => {
  const frames = Math.round(progress * RUNTIME * FPS);
  const seconds = Math.floor(frames / FPS);
  return [0, Math.floor(seconds / 60), seconds % 60, frames % FPS]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
};

/**
 * Turns the scenes into one scroll-driven motion piece. The section is tall;
 * the stage inside it is sticky, and a single GSAP timeline scrubbed by
 * ScrollTrigger plays the scenes — each shot dissolves into the next (the
 * outgoing layers drift up and fade while the incoming ones settle in), and
 * layers drift with parallax while a shot holds.
 *
 * Without motion (reduced motion or no JS) none of this runs: the scenes
 * simply stack, fully composed, one per screen.
 */
export default function StoryStage({ scenes, children }: { scenes: StoryScene[]; children: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const playhead = useRef<HTMLDivElement>(null);
  const timecodeEl = useRef<HTMLSpanElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const [live, setLive] = useState(false);
  const [markers, setMarkers] = useState<Record<string, number>>({});
  const [keyframes, setKeyframes] = useState<number[]>([]);
  const [active, setActive] = useState(scenes[0].id);
  const [craft, setCraft] = useState(false);
  const [playing, setPlaying] = useState(false);

  const jumpTo = (id: string) => {
    const st = timeline.current?.scrollTrigger;
    if (!st) return;
    const y = st.labelToScroll(id);
    const lenis = getLenis();
    setPlaying(false);
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y });
  };
  const jumpRef = useRef(jumpTo);
  useEffect(() => {
    jumpRef.current = jumpTo;
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = section.current!;
        const sceneEls = gsap.utils.toArray<HTMLElement>("[data-scene]", root);
        const sceneIds = sceneEls.map((el) => el.dataset.scene!);

        root.classList.add("story-live");
        gsap.set(sceneEls.slice(1), { autoAlpha: 0 });

        // Hand-drawn marks in later scenes start undrawn.
        sceneEls.slice(1).forEach((scene) =>
          scene.querySelectorAll<SVGPathElement>("[data-draw]").forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          }),
        );

        const cuts: number[] = [];
        const keys: number[] = [];
        let total = 1;
        let current = "";

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            onToggle: (self) => storyStore.set({ inStage: self.isActive }),
            onUpdate: (self) => {
              if (playhead.current) playhead.current.style.left = `${self.progress * 100}%`;
              if (timecodeEl.current) timecodeEl.current.textContent = timecode(self.progress);
              const t = self.progress * total;
              let scene = sceneIds[0];
              cuts.forEach((cut, i) => {
                if (cut <= t) scene = sceneIds[i];
              });
              if (scene !== current) {
                current = scene;
                setActive(scene);
                storyStore.set({ scene });
              }
            },
          },
        });

        sceneEls.forEach((scene, i) => {
          const id = sceneIds[i];
          if (i > 0) {
            // Dissolve: the last shot drifts up and fades; the new one settles
            // in underneath before the old one has fully gone, so there is
            // never an empty (or bright) frame.
            const prev = sceneEls[i - 1];
            const cut = tl.duration();
            tl.to(prev.querySelectorAll("[data-enter]"), {
              y: "-=40",
              autoAlpha: 0,
              duration: 0.32,
              stagger: 0.015,
              ease: "power1.in",
            }, cut);
            cuts.push(cut + 0.24);
            tl.set(scene, { autoAlpha: 1 }, cut + 0.22);

            scene.querySelectorAll<HTMLElement>("[data-enter]").forEach((layer, j) => {
              const at = cut + 0.24 + j * 0.035;
              keys.push(at);
              tl.from(layer, { ...enterFrom[layer.dataset.enter ?? "up"], duration: 0.45, ease: "power2.out" }, at);
            });
            tl.to(scene.querySelectorAll("[data-draw]"), { strokeDashoffset: 0, duration: 0.4, ease: "power1.inOut" }, cut + 0.38);
            tl.set(prev, { autoAlpha: 0 }, tl.duration());
          } else {
            cuts.push(0);
          }

          // Hold the shot: layers drift by depth while you read.
          tl.addLabel(id);
          tl.to(
            scene.querySelectorAll<HTMLElement>("[data-depth]"),
            { y: (_: number, el: HTMLElement) => `-=${70 * Number(el.dataset.depth)}`, duration: 0.55, ease: "none" },
            id,
          );
          tl.to(scene.querySelectorAll("[data-spin]"), { rotate: "+=90", duration: 0.55, ease: "none" }, id);
          scene.querySelectorAll<HTMLElement>("[data-move]").forEach((el) =>
            tl.to(el, { left: el.dataset.move, duration: 0.45, ease: "power3.inOut" }, id),
          );
        });
        tl.to({}, { duration: 0.25 });

        total = tl.duration();
        setMarkers(Object.fromEntries(sceneIds.map((id) => [id, tl.labels[id] / total])));
        setKeyframes(keys.map((k) => k / total));

        timeline.current = tl;
        storyStore.set({ live: true, scene: sceneIds[0] });
        setLive(true);

        // Pointer parallax: layers lean toward the cursor by depth.
        const onPointer = (e: PointerEvent) =>
          gsap.to(stage.current, {
            "--mx": (e.clientX / window.innerWidth) * 2 - 1,
            "--my": (e.clientY / window.innerHeight) * 2 - 1,
            duration: 1,
            ease: "power3.out",
            overwrite: "auto",
          });
        window.addEventListener("pointermove", onPointer);

        // Nav/marker links to a scene id scroll to that scene's label, not to
        // the (sticky) element. Capture phase so Lenis' anchor handler never sees it.
        const onClick = (e: MouseEvent) => {
          const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
          if (!link || link.pathname !== window.location.pathname) return;
          const id = link.hash.slice(1);
          if (!sceneIds.includes(id) || id === sceneIds[0]) return;
          e.preventDefault();
          e.stopPropagation();
          jumpRef.current(id);
        };
        window.addEventListener("click", onClick, true);

        return () => {
          window.removeEventListener("pointermove", onPointer);
          window.removeEventListener("click", onClick, true);
          root.classList.remove("story-live");
          storyStore.set({ live: false, inStage: false });
          timeline.current = null;
          setLive(false);
        };
      });

      // Pick-up-able scraps, for mice and trackpads.
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const draggables = Draggable.create(section.current!.querySelectorAll("[data-drag]"), {
          type: "x,y",
          bounds: stage.current,
          zIndexBoost: true,
          onPress() {
            gsap.to(this.target, { scale: 1.06, duration: 0.2 });
          },
          onRelease() {
            gsap.to(this.target, { scale: 1, duration: 0.3, ease: "back.out(3)" });
          },
          onDragEnd() {
            track("story_drag", { layer: (this.target as HTMLElement).closest<HTMLElement>("[data-layer]")?.dataset.layer ?? "" });
          },
        });
        return () => draggables.forEach((d) => d.kill());
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  // Any manual scroll input stops the reel.
  useEffect(() => {
    if (!playing) return;
    const stop = () => {
      const lenis = getLenis();
      lenis?.scrollTo(lenis.scroll, { immediate: true });
      setPlaying(false);
    };
    const opts = { once: true, passive: true } as const;
    window.addEventListener("wheel", stop, opts);
    window.addEventListener("touchstart", stop, opts);
    window.addEventListener("keydown", stop, opts);
    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [playing]);

  const togglePlay = () => {
    const lenis = getLenis();
    const st = timeline.current?.scrollTrigger;
    if (!lenis || !st) return;
    if (playing) {
      lenis.scrollTo(lenis.scroll, { immediate: true });
      setPlaying(false);
      return;
    }
    if (st.progress > 0.98) lenis.scrollTo(st.start, { immediate: true });
    const remaining = st.progress > 0.98 ? 1 : 1 - st.progress;
    lenis.scrollTo(st.end, {
      duration: Math.max(remaining * RUNTIME, 1),
      easing: (t) => t,
      onComplete: () => setPlaying(false),
    });
    setPlaying(true);
    track("story_play");
  };

  return (
    <section
      id="top"
      ref={section}
      data-craft={craft ? "on" : "off"}
      className="relative"
      style={{ "--scenes": scenes.length } as React.CSSProperties}
    >
      <div ref={stage} className="story-stage relative isolate">
        <HeroBackdrop />
        {children}

        {live && (
          <StoryTimeline
            scenes={scenes}
            markers={markers}
            keyframes={keyframes}
            active={active}
            craft={craft}
            playing={playing}
            canPlay={!!getLenis()}
            onJump={jumpTo}
            onToggleCraft={() => {
              setCraft((c) => !c);
              track("story_keyframes", { on: !craft });
            }}
            onTogglePlay={togglePlay}
            playheadRef={playhead}
            timecodeRef={timecodeEl}
          />
        )}
      </div>
    </section>
  );
}
