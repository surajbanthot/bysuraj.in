import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Tag from "@/components/atoms/Tag";

const meta = {
  title: "Atoms/Tag",
  component: Tag,
  args: { children: "Conversational AI" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Accent: Story = { args: { tone: "accent", children: "Send ↗" } };
export const List: Story = {
  render: () => (
    <ul className="flex flex-wrap gap-2">
      {["Conversational AI", "RAG", "Next.js", "Python"].map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  ),
};
