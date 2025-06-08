import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '.';
import { AiOutlineBold } from 'react-icons/ai';

const meta: Meta<typeof IconButton> = {
  title: 'Example/IconButton',
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
    icon: <span>Icon</span>,
  },
};

export const BoldIcon: Story = {
  args: {
    label: 'BoldIcon',
    icon: <AiOutlineBold />,
  },
};
