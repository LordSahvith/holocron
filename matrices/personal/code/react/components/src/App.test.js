import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react modal with open button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Open/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders and checks for modal', () => {
  render(<App />);
  const modalMain = document.querySelector('.modal-main')
  expect(modalMain).toBeInTheDocument();
});
