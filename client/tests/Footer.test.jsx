import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Footer/Footer';


test('renders footer with copyright notice', () => {
  render(<Footer />);

  const copyrightElement = screen.getByText(
    `© ${new Date().getFullYear()} Amit Bishnoi. All rights reserved.`
  );
  expect(copyrightElement).toBeInTheDocument();
});