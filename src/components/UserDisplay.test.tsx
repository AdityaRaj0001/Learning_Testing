// components/UserDisplay.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import UserDisplay from './UserDisplay';
// 💡 We import the original function so we can mock it
import { fetchUserName } from '../utils/api';
import '@testing-library/jest-dom';

// 1. Mock the entire module before the tests run
//    This replaces the actual fetchUserName with a controllable Jest mock function.
jest.mock('../utils/api', () => ({
  fetchUserName: jest.fn(),
}));

// Cast the function to a Jest Mock type for easier access to mock methods
const mockedFetchUserName = fetchUserName as jest.Mock;

describe('UserDisplay Integration Test (Async)', () => {
  it('should display the user name after loading completes', async () => {
    const MOCK_USER_NAME = 'Anya Jenkins';

    // 2. Arrange: Tell the mocked function to resolve its promise with our mock data
    mockedFetchUserName.mockResolvedValue(MOCK_USER_NAME);

    // 3. Arrange: Render the component
    render(<UserDisplay />);

    // 4. Assert (Initial State): Check for the loading message immediately
    // This is a synchronous check.
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // 5. Assert (Final State - Async): Use waitFor to wait for the DOM to change
    //    We wait until the expected element is present.
    await waitFor(() => {
      // Find the heading by its role and the text content it should eventually have
      const userHeading = screen.getByRole('heading', {
        name: `User: ${MOCK_USER_NAME}`,
      });
      expect(userHeading).toBeInTheDocument();
    });

    // Optional: Confirm the loading message is gone
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
