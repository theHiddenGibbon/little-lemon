import React from 'react';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import BookingForm from '../components/BookingForm.js';

test('Renders the BookingForm heading', () => {
  render(
    <MemoryRouter>
      <BookingForm />
    </MemoryRouter>
  );
  const headingElement = screen.getByText("Reservation Details");
  expect(headingElement).toBeInTheDocument();
});