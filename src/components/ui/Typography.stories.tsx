import type { Meta, StoryObj } from '@storybook/nextjs';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    serif: true,
    children: 'L\'art de sublimer vos mains.',
    className: 'text-brand-ivory'
  },
};

export const GoldHeading: Story = {
  args: {
    variant: 'h2',
    serif: true,
    children: 'Signature Russe',
    className: 'gold-text'
  },
};

export const Body: Story = {
  args: {
    variant: 'p',
    children: 'Une expérience exclusive alliant expertise clinique et design artistique.',
    className: 'max-w-md text-brand-ivory/60'
  },
};
