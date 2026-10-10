import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SplitText from "@/components/atoms/SplitText";

const meta = {
  title: "Atoms/SplitText",
  component: SplitText,
  args: { text: "Suraj Banthot", letterClassName: "hero-letter", stagger: 28 },
  render: (args) => (
    <h1 className="display text-8xl text-ink">
      <SplitText {...args} />
    </h1>
  ),
} satisfies Meta<typeof SplitText>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Letters develop in with the hero animation; screen readers get the whole string once. */
export const Develop: Story = {};
export const WithTrailingDot: Story = {
  args: { trailing: <span className="hero-letter inline-block text-accent">.</span> },
};
