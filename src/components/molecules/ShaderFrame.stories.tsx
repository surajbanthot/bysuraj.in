import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ShaderFrame from "@/components/molecules/ShaderFrame";

const meta = {
  title: "Molecules/ShaderFrame",
  component: ShaderFrame,
  args: { seed: 0.17, alt: "Placeholder frame", className: "aspect-[4/3] w-96" },
  argTypes: { seed: { control: { type: "range", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof ShaderFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Seeded placeholder used until a real cover or scan exists (set `src`). */
export const Placeholder: Story = {};
export const Seeds: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[0.11, 0.44, 0.83].map((seed) => (
        <ShaderFrame key={seed} seed={seed} alt={`Seed ${seed}`} className="aspect-square" />
      ))}
    </div>
  ),
};
export const WithImage: Story = { args: { src: "/og.png", alt: "Open Graph image" } };
