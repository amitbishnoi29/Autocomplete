import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PlaceDetails from '../src/pages/PlaceDetails/PlaceDetails';
const mockStore = configureStore([]);


test('renders place details', async () => {
  // Mocking the response data
  const mockPlaceDetails = {
    result: {
      name: 'Sample Place',
      formatted_address: '123 Main St, City',
      url: 'https://maps.google.com/sample-place',
      geometry: {
        location: {
          lat: 123,
          lng: 456,
        },
        viewport: {
          northeast: { lat: 1.0, lng: 2.0 },
          southwest: { lat: -1.0, lng: -2.0 },
        },
      },
      website: 'https://sample-place-website.com',
    },
  };

  const mockState = {
    details: {
      placeDetails: mockPlaceDetails,
    },
  };

  const store = mockStore(mockState);

  
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/place/123']}>
          <PlaceDetails />
      </MemoryRouter>
    </Provider>
  );

  // Check if loading text is not displayed
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

  // Assertions for rendered place details
  const nameElement = screen.getByText('Sample Place');
  expect(nameElement).toBeInTheDocument();

  const addressElement = screen.getByText('123 Main St, City');
  expect(addressElement).toBeInTheDocument();

  const urlElement = screen.getByText('https://maps.google.com/sample-place');
  expect(urlElement).toBeInTheDocument();

  const latElement = screen.getByText('Lat : 123');
  expect(latElement).toBeInTheDocument();

  const lngElement = screen.getByText('Lng : 456');
  expect(lngElement).toBeInTheDocument();
});
