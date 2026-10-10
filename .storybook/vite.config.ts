import { defineConfig } from "vite";

// Storybook's own Vite config. Without it the builder would load the root
// vite.config.ts, which is the vinext/Cloudflare build (RSC + Workers
// plugins) and crashes a Storybook bundle. The nextjs-vite framework adds the
// Next.js handling (next/font, next/image, next/link, @/ alias) itself.
export default defineConfig({});
