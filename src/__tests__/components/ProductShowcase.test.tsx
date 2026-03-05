import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ProductShowcase from '@/components/product/ProductShowcase';

const safeRender = (ui: React.ReactElement) => {
  let result: ReturnType<typeof render>;
  act(() => {
    result = render(ui);
  });
  return result!;
};

describe('ProductShowcase component', () => {
  it('renders title, description and primary button', () => {
    safeRender(
      <ProductShowcase
        title="Test Product"
        description="A great product"
        primaryAction={{ label: 'Shop' }}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A great product')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });

  it('shows rating and reviews when provided', () => {
    safeRender(<ProductShowcase rating={3.5} reviews={120} />);
    // the rating and review text may be concatenated; use regex
    expect(screen.getByText(/120 reviews/)).toBeInTheDocument();
    expect(screen.getByText(/3\.5/)).toBeInTheDocument();
  });

  it('renders price options and allows selection', () => {
    const options = [
      { id: 'a', title: 'Option A', price: '$10' },
      { id: 'b', title: 'Option B', price: '$20' },
    ];
    safeRender(<ProductShowcase priceOptions={options} />);

    // both options should appear
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();

    // initial selection is first one (first radio should be checked)
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');

    // click second by clicking its title text
    fireEvent.click(screen.getByText('Option B'));
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('updates CTA label when different price option selected', () => {
    const options = [
      { id: 'a', title: 'A', price: '$10' },
      { id: 'b', title: 'B', price: '$20' },
    ];
    safeRender(
      <ProductShowcase
        priceOptions={options}
        primaryAction={{ label: 'Buy Now' }}
      />
    );

    const button = screen.getByRole('button', { name: /Buy Now/ });
    // initial should include price
    expect(button).toHaveTextContent('Buy Now - $10');

    // click the card text instead of radio
    fireEvent.click(screen.getByText('B'));
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(button).toHaveTextContent('Buy Now - $20');
  });  it('dispatches primary action when clicked', () => {
    const mockDispatch = vi.fn(() => Promise.resolve());
    safeRender(
      <ProductShowcase
        primaryAction={{ label: 'Buy', action: { type: 'navigate', url: '/buy' } }}
        dispatcher={{ dispatch: mockDispatch } as any}
      />
    );
    fireEvent.click(screen.getByText('Buy'));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'navigate', url: '/buy' });
  });
});
