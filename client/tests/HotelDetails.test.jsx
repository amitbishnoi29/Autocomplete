import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import HotelDetails from '../src/pages/HotelDetails/HotelDetails';
// import store from '../src/redux/store';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);


test('renders hotel details', async () => {
    // Mocking the response data
    const mockHotelDetails = {
        title: 'Sample Hotel',
        address: '123 Main St, City',
        description: 'This is a sample hotel description.',
      };
    
      // Mock Redux store state
      const mockState = {
        details: {
          hotelDetails: mockHotelDetails,
        },
      };

      const store = mockStore(mockState);

    // Render the component with mock data and route params
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/hotel/123']}>
                <HotelDetails />
            </MemoryRouter>
        </Provider>
    );

    // Check if loading text is not displayed
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    // Assertions for rendered hotel details
    const titleElement = screen.getByText('Sample Hotel');
    expect(titleElement).toBeInTheDocument();

    const addressElement = screen.getByText('123 Main St, City');
    expect(addressElement).toBeInTheDocument();

    const descriptionElement = screen.getByText('This is a sample hotel description.');
    expect(descriptionElement).toBeInTheDocument();
});
