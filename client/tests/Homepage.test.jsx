import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../src/redux/store'; // Make sure you import your Redux store
import Homepage from '../src/pages/Homepage/Homepage';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

test('input element works correctly', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </Provider>
  );

  const input = screen.getByPlaceholderText('Search for a Place or Hotel');

  expect(input).toBeInTheDocument()

  // userEvent.type(input, 'New');
  fireEvent.change(input, { target: { value: 'New' } })



  await waitFor(() =>  expect(input).toHaveValue('New'))

  // expect(input).toHaveValue('New');
 
  userEvent.clear(input);

  // Check if the input value is cleared
  expect(input).toHaveValue('');
});


test('renders input and suggestions', async () => {
  // jest.useFakeTimers();
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </Provider>
  );

  const input = screen.getByPlaceholderText('Search for a Place or Hotel');
  expect(input).toBeInTheDocument();

  // Simulate typing in the input
  userEvent.type(input, 'New York');


  // Wait for suggestions to appear (assuming async fetch)
  await screen.findByText('Locations');

  // Assertions for rendering of suggestions
  const locationSuggestions = await screen.findAllByTestId('location-suggestion');
  expect(locationSuggestions).toHaveLength(5);


});


test('renders input and hotel suggestions', async () => {

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </Provider>
  );

  const input = screen.getByPlaceholderText('Search for a Place or Hotel');
  expect(input).toBeInTheDocument();

  // Simulate typing in the input
  userEvent.type(input, 'Guru');

  
  await screen.findByText('Hotels');

  // Assertions for rendering of suggestions

  const hotelSuggestions = await screen.findAllByTestId('hotel-suggestion');
  expect(hotelSuggestions).toHaveLength(7);


});