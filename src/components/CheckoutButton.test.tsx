// components/CheckoutButton.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutButton from './CheckoutButton';
import '@testing-library/jest-dom';

// Mock Router Setup (as defined above, repeated here for context)
const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    events: { on: jest.fn(), off: jest.fn() },
    isReady: true,
  }),
}));

describe('CheckoutButton Integration', () => {
  // Clear the mock function's history before each test
  beforeEach(() => {
    mockRouterPush.mockClear();
  });

  // --- Scenario 1: Successful Navigation ---
  it('calls router.push to /checkout when cartItemCount > 0', () => {
    const itemCount = 5;

    // 1. Arrange
    render(<CheckoutButton cartItemCount={itemCount} />);

    // 2. Act: Find the button and simulate a click (using fireEvent for simplicity)
    const button = screen.getByRole('link', {
      name: `Proceed to Checkout (${itemCount})`,
    });
    fireEvent.click(button);

    // 3. Assert (The crucial part: checking the mock function)
    // Assert 1: Check if the router.push function was called
    expect(mockRouterPush).toHaveBeenCalledTimes(1);

    // Assert 2: Check if it was called with the correct path
    expect(mockRouterPush).toHaveBeenCalledWith('/checkout');
  });

  // --- Scenario 2: No Navigation ---
  it('does NOT call router.push when cartItemCount is 0', () => {
    const itemCount = 0;

    // 1. Arrange
    render(<CheckoutButton cartItemCount={itemCount} />);

    // 2. Act: Find the button and attempt a click
    const button = screen.getByRole('link', {
      name: `Proceed to Checkout (${itemCount})`,
    });
    // Note: The component already disables the button, but testing the logic is good.
    fireEvent.click(button);

    // 3. Assert
    // Check that the mock function was *never* called
    expect(mockRouterPush).not.toHaveBeenCalled();

    // Check that the button is disabled (a good unit test check too)
    expect(button).toBeDisabled();
  });
});
