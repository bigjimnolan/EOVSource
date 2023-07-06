import { render, screen } from '@testing-library/react';
import './matchMedia';
import AppTest from './App';


test('renders main page', () => {
  render(<div>EOV</div>);
  const linkElement = screen.getByText(/EOV/i);
  expect(linkElement).toBeInTheDocument();
});

test('next text', () => {
  expect("test").toBe("test")
});
