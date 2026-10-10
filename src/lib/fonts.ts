import { Fraunces, Geist, Geist_Mono } from "next/font/google";

// Shared by the root layout and Storybook so components render in the real
// type everywhere. Exposes --font-geist-sans / --font-geist-mono / --font-fraunces.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

/** Class names that define the font CSS variables — put on <html> (or a story wrapper). */
export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`;
