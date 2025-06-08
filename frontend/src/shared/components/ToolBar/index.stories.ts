import type { Meta, StoryObj } from '@storybook/react';
import { ToolBar } from '.';

const meta: Meta<typeof ToolBar> = {
  title: 'Example/ToolBar',
  component: ToolBar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'ToolBar',
  },
};
