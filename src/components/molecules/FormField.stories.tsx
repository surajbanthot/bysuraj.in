import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FormField from "@/components/molecules/FormField";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  args: { id: "name", label: "Name *", placeholder: "Your name", className: "max-w-md" },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {};
export const Email: Story = { args: { id: "email", label: "Email *", type: "email", placeholder: "you@example.com" } };
export const Multiline: Story = {
  args: { id: "message", label: "Message", multiline: true, rows: 4, placeholder: "What are we making?" },
};
