import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';
import type { FooterProps } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    logo: { control: 'object' },
    columns: { control: 'object' },
    copyright: { control: 'text' },
    footerNote: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleColumns: FooterProps['columns'] = [
  {
    heading: 'Quick Links',
    items: [
      { label: 'Benefits' },
      { label: 'How It Works' },
      { label: 'FAQs' },
      { label: 'Shop Now' },
    ],
  },
  {
    heading: 'Customer Support',
    items: [
      { label: '30-Day Money-Back Guarantee', plain: true },
      { label: 'Free Domestic Shipping', plain: true },
      { label: 'Made in FDA-Registered Facility', plain: true },
      { label: 'Third-Party Tested', plain: true },
    ],
  },
];

// legacy flat link set used in some stories
const sampleLinks: FooterProps['links'] = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

export const Default: Story = {
  args: {
    logo: {
      image: 'https://via.placeholder.com/150x50?text=Logo',
      alt: 'Company logo',
      description: 'Premium creatine gummies designed to help you build strength, boost energy, and feel amazing.',
    },
    columns: sampleColumns,
    copyright: '© 2025 All rights reserved.',
    footerNote: 'These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.',
  },
};

export const WithImageLogo: Story = {
  args: {
    logo: {
      image: 'https://via.placeholder.com/150x50?text=Logo',
    },
    newsletter: {
      title: 'Join Our Community',
      description: 'Get exclusive content and early access to new features.',
      placeholder: 'your@email.com',
      submitButton: {
        label: 'Join Now',
        onClick: { type: 'analytics', event: 'newsletter_signup' },
      },
    },
    links: sampleLinks,
    copyright: '© 2024 MyBrand. All rights reserved.',
  },
};

export const Minimal: Story = {
  args: {
    links: sampleLinks,
    copyright: '© 2024 MyBrand. All rights reserved.',
  },
};