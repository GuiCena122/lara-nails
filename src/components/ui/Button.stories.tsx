import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Luxury: Story = {
  args: {
    variant: 'luxury',
    children: 'Prendre Rendez-vous',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Voir les soins',
  },
};

export const Ivory: Story = {
  args: {
    variant: 'ivory',
    children: 'Connexion',
  },
};
