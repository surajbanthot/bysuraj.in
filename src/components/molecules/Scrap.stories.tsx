import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Scrap from "@/components/molecules/Scrap";

const meta = {
  title: "Molecules/Scrap",
  component: Scrap,
  args: { seed: 0.33, className: "w-56 p-5" },
  argTypes: { tone: { control: "inline-radio", options: ["light", "dark", "accent"] } },
  render: (args) => (
    <Scrap {...args}>
      <p className="display text-2xl leading-tight">Who is it for?</p>
    </Scrap>
  ),
} satisfies Meta<typeof Scrap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { args: { tone: "light" } };
export const Dark: Story = { args: { tone: "dark" } };
export const Accent: Story = { args: { tone: "accent" } };
