import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/footer/Footer';

const sampleColumns = [
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
    ],
  },
];

describe('Footer component', () => {
  it('renders logo, description, columns and note', () => {
    render(
      <Footer
        logo={{ image: '/logo.png', alt: 'Logo', description: 'Desc' }}
        columns={sampleColumns}
        copyright="©2025"
        footerNote="Legal text"
      />
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Benefits')).toBeInTheDocument();
    expect(screen.getByText('Customer Support')).toBeInTheDocument();
    expect(screen.getByText('Legal text')).toBeInTheDocument();
  });

  it('dispatches action when link button clicked', () => {
    const mockDispatch = vi.fn(() => Promise.resolve());
    const links = [
      { label: 'Test', onClick: { type: 'log' } } as any,
    ];
    render(<Footer columns={[{ items: links }]} dispatcher={{ dispatch: mockDispatch } as any} />);
    fireEvent.click(screen.getByText('Test'));
    expect(mockDispatch).toHaveBeenCalled();
  });
});