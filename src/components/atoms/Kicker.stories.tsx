import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Kicker from "@/components/atoms/Kicker";

const meta = {
  title: "Atoms/Kicker",
  component: Kicker,
  args: { no: "09", children: "Credits" },
} satisfies Meta<typeof Kicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithNumber: Story = {};
export const NumberOnly: Story = { args: { children: undefined, no: "08" } };
export const Plain: Story = { args: { no: undefined, children: "Contact sheet · Pentax 67II" } };
