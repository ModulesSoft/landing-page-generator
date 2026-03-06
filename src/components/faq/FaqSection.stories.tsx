import type { Meta, StoryObj } from '@storybook/react';
import type { FaqItem } from './FaqSection';
import FaqSection from './FaqSection';

const meta: Meta<typeof FaqSection> = {
  title: 'Components/FaqSection',
  component: FaqSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    faqs: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleFaqs: FaqItem[] = [
  {
    question: 'What is creatine monohydrate?',
    answer:
      'Creatine monohydrate is a naturally occurring compound used to support energy production in muscle cells.',
  },
  {
    question: 'Will creatine make me bulky?',
    answer:
      'No, creatine helps build lean muscle and does not cause bulkiness when taken as directed.',
  },
  {
    question: 'When will I see results?',
    answer:
      'Most users notice improvements in strength and endurance within 2–4 weeks of consistent use.',
  },
  {
    question: 'Is it safe for everyone?',
    answer:
      'Creatine is widely studied and generally safe for healthy adults; consult a physician if you have medical conditions.',
  },
];

export const Default: Story = {
  args: {
    heading: 'Your Questions Answered',
    subheading: 'Everything you need to know about our creatine gummies',
    faqs: sampleFaqs,
  },
};
