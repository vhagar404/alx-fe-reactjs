import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  test('renders Home Page text', () => {
    render(<App />);
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
