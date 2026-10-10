import type { CSSProperties, ReactNode } from "react";

export type Enter = "up" | "down" | "left" | "right" | "scale" | "spin" | "drop" | "fade";

type LayerProps = {
  /** Layer name — shown in keyframe view, like an After Effects layer. */
  name: string;
  /** How the layer animates in when its scene starts. */
  enter?: Enter;
  /** Parallax depth 0–1: how far it drifts on scroll and with the pointer. */
  depth?: number;
  rotate?: number;
  /** Let visitors pick the layer up and move it (fine pointers only). */
  drag?: boolean;
  /** Positioning classes — layers are absolutely placed within their scene. */
  className?: string;
  children: ReactNode;
};

/**
 * One collage element on the story stage. Three nested boxes so three systems
 * never fight over the same transform: the outer one belongs to the scroll
 * timeline, the middle one to Draggable, the inner one to
 * pointer parallax + resting rotation.
 */
export default function Layer({ name, enter = "up", depth = 0.5, rotate = 0, drag, className = "", children }: LayerProps) {
  return (
    <div data-layer={name} data-enter={enter} data-depth={depth} className={`absolute ${className}`}>
      <div
        data-drag={drag || undefined}
        data-cursor={drag ? "Drag" : undefined}
        className={`h-full ${drag ? "touch-none" : ""}`}
      >
        <div className="layer-inner h-full" style={{ "--d": depth, rotate: `${rotate}deg` } as CSSProperties}>
          {children}
        </div>
      </div>
    </div>
  );
}
