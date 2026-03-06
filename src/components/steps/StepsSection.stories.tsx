import type { Meta, StoryObj } from '@storybook/react';
import StepsSection from './StepsSection';
import type { StepItem } from './StepsSection';

const meta: Meta<typeof StepsSection> = {
  title: 'Components/StepsSection',
  component: StepsSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    steps: { control: 'object' },
    ctaLabel: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleSteps: StepItem[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-pill h-8 w-8 text-primary"
      >
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
    title: 'Take 3 Gummies Daily',
    description:
      'Simple, convenient, and delicious. Just 3 gummies a day—no mixing, no mess, no chalky taste.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-sparkles h-8 w-8 text-primary"
      >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
        <path d="M4 17v2" />
        <path d="M5 18H3" />
      </svg>
    ),
    title: 'Feel the Difference',
    description:
      'Most people notice increased energy and easier movement within 2-4 weeks of consistent use.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-trending-up h-8 w-8 text-primary"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: 'Build Lasting Results',
    description:
      'Continued improvement in strength, endurance, and overall vitality with ongoing daily use.',
  },
];

export const Default: Story = {
  args: {
    heading: '3 Simple Steps to Better Results',
    subheading:
      'Getting started is easy. No complicated routines—just consistent daily support for your body.',
    steps: sampleSteps,
    ctaLabel: 'Start Your Journey Today',
  },
};
