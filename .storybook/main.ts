import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": {
    "name": "@storybook/nextjs-vite",
    "options": {
      // Keep the vinext/Cloudflare plugins in the root vite.config.ts out of Storybook.
      "builder": { "viteConfigPath": ".storybook/vite.config.ts" }
    }
  },
  "staticDirs": [
    "../public"
  ],
  // Storybook's own runtime chunks (React, axe for the a11y addon, the manager
  // UI) are ~0.5–1.3 MB. They're dev tooling and never ship to visitors.
  viteFinal: (config) => ({
    ...config,
    build: { ...config.build, chunkSizeWarningLimit: 1500 },
  }),
};
export default config;