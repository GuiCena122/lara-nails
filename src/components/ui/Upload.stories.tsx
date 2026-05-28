import type { Meta, StoryObj } from '@storybook/nextjs';
import { Upload } from './Upload';

const meta: Meta<typeof Upload> = {
  title: 'Luxury/Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const Default: Story = {
  args: {},
};
