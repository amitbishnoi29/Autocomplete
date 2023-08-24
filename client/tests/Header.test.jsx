import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header/Header';


test('renders header with logo and navigation', () => {
  render(<Header />);

  const logoElement = screen.getByText('Autocomplete');
  expect(logoElement).toBeInTheDocument();

  const homeLink = screen.getByText('Home');
  expect(homeLink).toBeInTheDocument();

  const contactLink = screen.getByText('Contact');
  expect(contactLink).toBeInTheDocument();
});