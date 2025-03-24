import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { fetchAPI } from '../data/api';
import BookingForm from '../components/BookingForm';

const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00'];
const mockUpdateTimes = jest.fn(); // Mock function for updateTimes

const renderBookingForm = () => {
  render(
    <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        updateTimes={mockUpdateTimes} 
      />
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = ''; // Clear the DOM
  renderBookingForm();
});

test('Renders the BookingForm heading', () => {
  const headingElement = screen.getByText("Reservation Details");
  expect(headingElement).toBeInTheDocument();
});

jest.mock('../data/api', () => ({
  fetchAPI: jest.fn(),
}));

describe('initialiseTimes', () => {
  it('should fetch and dispatch the correct times', () => {
    fetchAPI.mockImplementation(() => mockAvailableTimes);
    const mockDispatch = jest.fn();
    const initialiseTimes = (date, dispatch) => {
      const times = fetchAPI(new Date(date));
      dispatch({ type: 'update_times', payload: times });
    };
    const date = '2025-04-01';
    initialiseTimes(date, mockDispatch);

    expect(fetchAPI).toHaveBeenCalledWith(new Date(date));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'update_times',
      payload: mockAvailableTimes,
    });
  });
});

describe('updateTimes', () => {
  it('should call initialiseTimes and update the state with the correct times', () => {
    fetchAPI.mockImplementation(() => mockAvailableTimes);
    const mockDispatch = jest.fn();
    const initialiseTimes = (date, dispatch) => {
      const times = fetchAPI(new Date(date));
      dispatch({ type: 'update_times', payload: times });
    };
    const updateTimes = (date) => {
      initialiseTimes(date, mockDispatch);
    };
    const date = '2025-04-01';
    updateTimes(date);
    expect(fetchAPI).toHaveBeenCalledWith(new Date(date));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'update_times',
      payload: mockAvailableTimes,
    });
  });
});

describe('handleConfirm', () => {
  it('should write booking data to localStorage', () => {
    const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
    const mockBookingData = {
      guests: 2,
      date: '2025-04-01',
      time: '18:00',
      occasion: 'Birthday',
      note: '',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      tel: '1234567890',
    };
    const existingBookings = [
      { 
        guests: 1, 
        date: '2025-03-31', 
        time: '17:00', 
        occasion: 'None', 
        note: '' 
      },
    ];
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(existingBookings));
    const handleConfirm = (data) => {
      const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
      const updatedBookings = [...existingBookings, { ...data }];
      localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
    };
    handleConfirm(mockBookingData);
    expect(setItemMock).toHaveBeenCalledWith(
      'bookingData',
      JSON.stringify([...existingBookings, mockBookingData])
    );
    setItemMock.mockRestore();
  });
});

describe('getBookingsFromStorage', () => {
  it('should read booking data from localStorage', () => {
    const mockBookings = [
      { 
        guests: 2, 
        date: '2025-04-01', 
        time: '18:00', 
        occasion: 'Birthday', 
        note: '' 
      },
    ];
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockBookings));
    const getBookingsFromStorage = () => {
      return JSON.parse(localStorage.getItem('bookingData')) || [];
    };
    const result = getBookingsFromStorage();
    expect(localStorage.getItem).toHaveBeenCalledWith('bookingData');
    expect(result).toEqual(mockBookings);
    localStorage.getItem.mockRestore();
  });
});

// test('Number of guests input has correct attributes', () => {
//   const guestsInput = screen.getByLabelText(/Number of guests/i);
//   expect(guestsInput).toHaveAttribute('type', 'number');
//   expect(guestsInput).toHaveAttribute('min', '1');
//   expect(guestsInput).toHaveAttribute('max', '10');
//   expect(guestsInput).toHaveAttribute('required');
// });

// test('Date input has correct attributes', () => {
//   const dateInput = screen.getByLabelText(/Date/i);
//   expect(dateInput).toHaveAttribute('type', 'date');
//   expect(dateInput).toHaveAttribute('required');
// });

// test('Time select has correct attributes', () => {
//   const timeSelect = screen.getByLabelText(/Time/i);
//   expect(timeSelect).toHaveAttribute('required');
// });

// test('First name input has correct attributes', async () => {
//   completeStep1();
//   const firstNameInput = screen.getByLabelText(/First name/i);
//   expect(firstNameInput).toBeInTheDocument();
//   expect(firstNameInput).toHaveAttribute('type', 'text');
//   expect(firstNameInput).toHaveAttribute('minLength', '2');
//   expect(firstNameInput).toHaveAttribute('maxLength', '40');
//   expect(firstNameInput).toHaveAttribute('pattern', "[A-Za-z'\\- ]+");
//   expect(firstNameInput).toHaveAttribute('required');
// });

// test('Last name input has correct attributes', () => {
//   completeStep1();
//   const lastNameInput = screen.getByLabelText(/Last name/i);
//   expect(lastNameInput).toHaveAttribute('type', 'text');
//   expect(lastNameInput).toHaveAttribute('minLength', '2');
//   expect(lastNameInput).toHaveAttribute('maxLength', '40');
//   expect(lastNameInput).toHaveAttribute('pattern', "[A-Za-z'\\- ]+");
//   expect(lastNameInput).toHaveAttribute('required');
// });

// test('Email input has correct attributes', () => {
//   completeStep1();
//   const emailInput = screen.getByLabelText(/Email/i);
//   expect(emailInput).toHaveAttribute('type', 'email');
//   expect(emailInput).toHaveAttribute('minLength', '5');
//   expect(emailInput).toHaveAttribute('maxLength', '254');
//   expect(emailInput).toHaveAttribute('required');
// });

// test('Telephone input has correct attributes', () => {
//   completeStep1();
//   const telInput = screen.getByLabelText(/Telephone/i);
//   expect(telInput).toHaveAttribute('type', 'tel');
//   expect(telInput).toHaveAttribute('minLength', '9');
//   expect(telInput).toHaveAttribute('maxLength', '18');
//   expect(telInput).toHaveAttribute('required');
// });

// test('First name input validation', async () => {
//   completeStep1();

//   const firstNameInput = screen.getByLabelText(/first name/i);

//   // Step 1: Ensure field starts without the validation class
//   expect(firstNameInput).not.toHaveClass("validation-required");

//   // Step 2: Simulate blur event with invalid input
//   fireEvent.change(firstNameInput, { target: { value: "A" } }); // Too short
//   fireEvent.blur(firstNameInput);

//   // Step 3: Check if the class is added
//   await waitFor(() => {
//     expect(firstNameInput).toHaveClass("validation-required");
//   });
// });

// test('Email input validation', async () => {
//   completeStep1();
//   await waitFor(() => {
//     const emailInput = screen.getByLabelText(/Email/i);
//     fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
//     expect(emailInput.validity.valid).toBe(false);
//     fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
//     expect(emailInput.validity.valid).toBe(true);
//   });
// });

// test('Telephone input validation', async () => {
//   completeStep1();
//   await waitFor(() => {
//     const telInput = screen.getByLabelText(/Telephone/i);
//     fireEvent.change(telInput, { target: { value: '123' } });
//     expect(telInput.validity.valid).toBe(false);
//     fireEvent.change(telInput, { target: { value: '1234567890' } });
//     expect(telInput.validity.valid).toBe(true);
//   });
// });