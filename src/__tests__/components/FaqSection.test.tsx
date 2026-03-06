import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import FaqSection from '@/components/faq/FaqSection';
import React from 'react';

// utility helper used in other tests as well
const safeRender = (ui: React.ReactElement) => {
  let result: ReturnType<typeof render>;
  act(() => {
    result = render(ui);
  });
  return result!;
};

const sampleFaqs = [
  { question: 'Q1', answer: '"A1"' },
];

describe('FaqSection component', () => {
  it('renders heading, subheading and questions', () => {
    safeRender(
      <FaqSection
        heading="H"
        subheading="S"
        faqs={sampleFaqs}
      />
    );
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });

  it('shows answer when question button clicked', () => {
    safeRender(<FaqSection faqs={sampleFaqs} />);
    expect(screen.queryByText(/"A1"/)).not.toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /Q1/ });
    fireEvent.click(btn);
    // the answer appears inside a paragraph; matching either with or without quotes
    expect(screen.getByText(/"?A1"?/)).toBeInTheDocument();
  });
});