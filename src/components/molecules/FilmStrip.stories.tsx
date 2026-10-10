import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FilmStrip from "@/components/molecules/FilmStrip";
import ShaderFrame from "@/components/molecules/ShaderFrame";
import { filmFrames } from "@/lib/portfolioData";

const meta = {
  title: "Molecules/FilmStrip",
  component: FilmStrip,
  args: { children: null },
  render: () => (
    <FilmStrip className="max-w-xl">
      {filmFrames.slice(0, 3).map((f) => (
        <ShaderFrame key={f.title} seed={f.seed} alt={f.title} className="aspect-square flex-1" />
      ))}
    </FilmStrip>
  ),
} satisfies Meta<typeof FilmStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeFrames: Story = {};
