import Home from '@pages/index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

it('should render home page', () => {
  render(<Home />);

  const heading = screen.getByText('Supabase + Next.js');
  expect(heading).toBeInTheDocument();

  const input = screen.getByPlaceholderText(/Your email/);
  userEvent.type(input, 'phongnguyentuan20@gmail.com');

  const button = screen.getByText(/Send magic link/);
  userEvent.click(button);
});
