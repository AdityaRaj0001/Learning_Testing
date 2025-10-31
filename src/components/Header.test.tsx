import { render, screen } from '@testing-library/react';
import Header from './Header';

// The describe block groups related tests
describe('Header', () => {
  // The it/test function is an individual test case
  it('renders the correct title passed in props', () => {
    const testTitle = 'My Test Application';

    // 1. Arrange (Render the component)
    render(<Header title={testTitle} />);

    // 2. Act (Find the element—React Testing Library prefers querying by roles for accessibility)
    // Here we find a heading element with the text of our title
    const headingElement = screen.getByRole('heading', {
      name: testTitle,
      level: 1,
    });

    // 3. Assert (Check if the element is in the document)
    expect(headingElement).toBeInTheDocument();
  });
});
