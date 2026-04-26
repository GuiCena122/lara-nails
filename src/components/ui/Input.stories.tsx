import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Ex: lara@nails.fr',
    type: 'email',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Manucure Russe',
    readOnly: true,
  },
};
