import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "@/components/atoms/Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: { children: "Start a project", variant: "primary", size: "md" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "outline", "accent", "quiet"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { icon: "→" } };
export const Outline: Story = { args: { variant: "outline", href: "https://contra.com", icon: "↗", children: "Contra" } };
export const Large: Story = { args: { size: "lg", icon: "↗", children: "Send" } };
export const Disabled: Story = { args: { size: "lg", disabled: true, children: "Send" } };

/** Toggles (contact form intent, timeline controls) switch to accent while pressed. */
export const Toggle: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="quiet" pressed>
        Commission a project
      </Button>
      <Button variant="quiet" pressed={false}>
        Hiring for a role
      </Button>
    </div>
  ),
};

export const TimelineControls: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm" variant="outline" iconOnly aria-label="Play the reel">
        <span aria-hidden="true">▶</span>
      </Button>
      <Button size="sm" variant="outline" iconOnly pressed aria-label="Pause the reel">
        <span aria-hidden="true">❚❚</span>
      </Button>
      <Button size="sm" variant="outline" pressed>
        ◇ Keyframes
      </Button>
    </div>
  ),
};
