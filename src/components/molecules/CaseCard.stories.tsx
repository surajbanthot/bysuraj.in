import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CaseCard from "@/components/molecules/CaseCard";
import { projects } from "@/lib/portfolioData";

const meta = {
  title: "Molecules/CaseCard",
  component: CaseCard,
  args: { project: projects[0], captionSeed: 0.2 },
  render: (args) => (
    <div className="w-80">
      <CaseCard {...args} />
    </div>
  ),
} satisfies Meta<typeof CaseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllProjects: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-3 gap-6">
      {projects.map((p, i) => (
        <CaseCard key={p.slug} project={p} captionSeed={0.2 + i * 0.3} />
      ))}
    </div>
  ),
};
