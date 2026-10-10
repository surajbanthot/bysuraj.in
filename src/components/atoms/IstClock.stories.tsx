import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IstClock from "@/components/atoms/IstClock";

const meta = {
  title: "Atoms/IstClock",
  component: IstClock,
  args: { className: "label" },
} satisfies Meta<typeof IstClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Label: Story = {};
export const Display: Story = { args: { className: "display text-4xl text-ink" } };
