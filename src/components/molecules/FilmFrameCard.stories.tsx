import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FilmFrameCard from "@/components/molecules/FilmFrameCard";
import { filmFrames } from "@/lib/portfolioData";

const meta = {
  title: "Molecules/FilmFrameCard",
  component: FilmFrameCard,
  args: { frame: filmFrames[0], className: "w-72" },
} satisfies Meta<typeof FilmFrameCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Starts as an orange negative and develops when scrolled into view (or hovered). */
export const Default: Story = {};
