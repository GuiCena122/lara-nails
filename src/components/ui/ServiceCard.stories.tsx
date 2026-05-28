import type { Meta, StoryObj } from '@storybook/nextjs';
import { ServiceCard } from './ServiceCard';

const meta: Meta<typeof ServiceCard> = {
  title: 'Luxury/ServiceCard',
  component: ServiceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  args: {
    title: 'Manucure Russe Signature',
    price: '50 €',
    duration: '60',
    description: 'Une technique exclusive pour des cuticules parfaites et une tenue prolongée.',
  },
};

export const Premium: Story = {
  args: {
    title: 'Extension Gel Prestige',
    price: '85 €',
    duration: '120',
    description: 'Allongement sur-mesure pour un résultat naturel e sophistiqué.',
  },
};
