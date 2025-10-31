import { render, screen } from '@testing-library/react';
// 💡 We import userEvent from the installed package
import userEvent from '@testing-library/user-event';
import Counter from './Counter';
import '@testing-library/jest-dom';

describe('Counter Integration', () => {
  // 💡 The test function should be async to use await
  it('increments the count when the button is clicked', async () => {
    // Create an instance of userEvent once per test
    const user = userEvent.setup();

    // 1. Arrange (Render the component)
    render(<Counter />);

    // 2. Act (Find elements and simulate user interaction)
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const countDisplay = screen.getByTestId('count-display');

    // Check initial state
    expect(countDisplay).toHaveTextContent('Current Count: 0');

    // 3. Simulate a click (using the user utility and **await**)
    await user.click(incrementButton);

    // 4. Assert (Check if the state/display has updated correctly)
    expect(countDisplay).toHaveTextContent('Current Count: 1');
  });
});
