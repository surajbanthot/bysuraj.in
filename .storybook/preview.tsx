import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/lib/fonts";

import "../src/app/globals.css";

// The font tokens (--font-display etc.) resolve on :root, so the next/font
// variables must live on <html> — exactly as the root layout does.
document.documentElement.classList.add(...fontVariables.split(" "));

const preview: Preview = {
  // Every story renders on the Darkroom canvas with the real fonts loaded.
  decorators: [
    (Story) => (
      <div className="min-h-full bg-paper p-8 font-sans text-ink">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
