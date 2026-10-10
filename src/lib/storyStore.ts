import { useSyncExternalStore } from "react";

// Tiny shared store so components outside the story stage (the nav) can
// follow which scene is on screen.
type StoryState = {
  /** The pinned, scroll-driven stage is running (motion allowed, JS loaded). */
  live: boolean;
  /** The stage currently fills the viewport. */
  inStage: boolean;
  /** Id of the scene on screen. */
  scene: string;
};

const initial: StoryState = { live: false, inStage: false, scene: "" };
let state = initial;
const listeners = new Set<() => void>();

export const storyStore = {
  get: () => state,
  set(patch: Partial<StoryState>) {
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export const useStory = () =>
  useSyncExternalStore(storyStore.subscribe, storyStore.get, () => initial);
