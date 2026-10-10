import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextLink from "@/components/atoms/TextLink";

const meta = {
  title: "Atoms/TextLink",
  component: TextLink,
  args: { href: "/film", children: "Open the contact sheet →" },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mono: Story = { args: { mono: true } };
export const External: Story = { args: { mono: true, href: "https://www.instagram.com/bysuraj.in/", children: "More frames on Instagram ↗" } };
export const Inline: Story = {
  render: (args) => (
    <p className="display max-w-xl text-4xl text-ink">
      I take portrait and editorial commissions on 6×7.{" "}
      <TextLink {...args} className="text-accent" />
    </p>
  ),
  args: { href: "/#contact", children: "Book a shoot →" },
};
