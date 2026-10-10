import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SectionHeading from "@/components/molecules/SectionHeading";

const meta = {
  title: "Molecules/SectionHeading",
  component: SectionHeading,
  args: {
    no: "08",
    title: (
      <>
        Two ways <em className="text-accent">in</em>
      </>
    ),
    kicker: "Roles · Commissions",
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutKicker: Story = { args: { kicker: undefined } };
