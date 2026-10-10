import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Halftone from "@/components/atoms/Halftone";
import Keyframe from "@/components/atoms/Keyframe";
import Scribble from "@/components/atoms/Scribble";
import Stamp from "@/components/atoms/Stamp";
import Tape from "@/components/atoms/Tape";

// The small collage marks used across the story scenes.
const meta = {
  title: "Atoms/Collage marks",
  component: Halftone,
} satisfies Meta<typeof Halftone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HalftoneDisc: Story = {
  render: () => (
    <div className="flex gap-8">
      <Halftone className="aspect-square w-48" />
      <Halftone tone="ink" className="aspect-square w-48" />
    </div>
  ),
};

export const RubberStamp: Story = {
  render: () => <Stamp text="EST · 2018 · BENGALURU · INDIA · " className="w-40" />,
};

export const MaskingTape: Story = {
  render: () => (
    <div className="relative h-32 w-64 bg-paper-raised">
      <Tape className="-top-3 left-8" rotate={-6} />
      <Tape className="-bottom-3 right-8" rotate={5} seed={0.9} />
    </div>
  ),
};

export const HandDrawn: Story = {
  render: () => (
    <Scribble
      viewBox="0 0 1000 60"
      className="h-12 w-full max-w-2xl"
      d={["M10 30 C 120 -10, 200 70, 300 30 S 480 -10, 590 30 S 780 70, 880 30 L 985 30", "M960 14 L 988 30 L 960 46"]}
    />
  ),
};

export const Keyframes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Keyframe />
      <Keyframe filled={false} />
      <Keyframe />
    </div>
  ),
};
