import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { fetchAPI } from '../data/api';
import BookingForm from '../components/BookingForm';

const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00'];
const mockUpdateTimes = jest.fn(); // Mock function for updateTimes

let mockSubmitForm;

const renderBookingForm = (submitForm = jest.fn()) => {
  render(
    <MemoryRouter>
      <BookingForm
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={submitForm} // Pass the submitForm prop
      />
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
  mockSubmitForm = jest.fn(); // Define the mock function
  renderBookingForm(mockSubmitForm); // Pass it to renderBookingForm
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

const completeStep1 = () => {
  fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '2' } });
  fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2025-04-01' } });
  fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
  fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Birthday' } });
  const proceedButton = screen.getByText(/Proceed/i);
  expect(proceedButton).not.toBeDisabled();
  fireEvent.click(proceedButton);
};

test('Number of guests input has correct attributes', () => {
  const guestsInput = screen.getByRole('spinbutton', { name: /number of guests/i });
  expect(guestsInput).toHaveAttribute('type', 'number');
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
  expect(guestsInput).toHaveAttribute('required');
});

test('Date input has correct attributes', () => {
  const dateInput = screen.getByLabelText(/date/i); // Use the label text
  expect(dateInput).toHaveAttribute('type', 'date');
  expect(dateInput).toHaveAttribute('required');
});

test('Time select has correct attributes', () => {
  const timeSelect = screen.getByRole('combobox', { name: /time/i });
  expect(timeSelect).toHaveAttribute('required');
});


test('First name input has correct attributes', async () => {
  completeStep1();
  const firstNameInput = screen.getByLabelText(/First name/i);
  expect(firstNameInput).toBeInTheDocument();
  expect(firstNameInput).toHaveAttribute('type', 'text');
  expect(firstNameInput).toHaveAttribute('minLength', '2');
  expect(firstNameInput).toHaveAttribute('maxLength', '40');
  expect(firstNameInput).toHaveAttribute('pattern', "[A-Za-z'\\- ]+");
  expect(firstNameInput).toHaveAttribute('required');
});

test('Last name input has correct attributes', () => {
  completeStep1();
  const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
  expect(lastNameInput).toHaveAttribute('type', 'text');
  expect(lastNameInput).toHaveAttribute('minLength', '2');
  expect(lastNameInput).toHaveAttribute('maxLength', '40');
  expect(lastNameInput).toHaveAttribute('pattern', "[A-Za-z'\\- ]+");
  expect(lastNameInput).toHaveAttribute('required');
});

test('Email input has correct attributes', () => {
  completeStep1();
  const emailInput = screen.getByLabelText(/email/i); // Use getByLabelText
  expect(emailInput).toHaveAttribute('type', 'email');
  expect(emailInput).toHaveAttribute('minLength', '5');
  expect(emailInput).toHaveAttribute('maxLength', '254');
  expect(emailInput).toHaveAttribute('required');
});

test('Telephone input has correct attributes', () => {
  completeStep1();
  const telInput = screen.getByLabelText(/tel/i); // Use getByLabelText
  expect(telInput).toHaveAttribute('type', 'tel');
  expect(telInput).toHaveAttribute('minLength', '9');
  expect(telInput).toHaveAttribute('maxLength', '18');
  expect(telInput).toHaveAttribute('required');
});


test('First name input validation', async () => {
  completeStep1();

  const firstNameInput = screen.getByRole('textbox', { name: /first name/i });

  await userEvent.type(firstNameInput, '12345');
  fireEvent.blur(firstNameInput);
  await waitFor(() => {
    expect(firstNameInput).toHaveClass('validation-required');
  });

  await userEvent.clear(firstNameInput);
  await userEvent.type(firstNameInput, 'John');
  fireEvent.blur(firstNameInput);
  await waitFor(() => {
    expect(firstNameInput).not.toHaveClass('validation-required');
  });
});

test('Email input validation', async () => {
  await completeStep1();

  const emailInput = screen.getByRole('textbox', { name: /email/i });

  await userEvent.type(emailInput, 'invalid-email');
  fireEvent.blur(emailInput);
  await waitFor(() => {
    expect(emailInput).toHaveClass('validation-required');
  });

  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, 'john.doe@example.com');
  fireEvent.blur(emailInput);
  await waitFor(() => {
    expect(emailInput).not.toHaveClass('validation-required');
  });
});

test('Telephone input validation', async () => {
  await completeStep1();

  const telInput = screen.getByRole('textbox', { name: /tel/i });

  await userEvent.clear(telInput);
  fireEvent.blur(telInput);
  await waitFor(() => {
    expect(telInput).toHaveClass('validation-required');
  });

  await userEvent.clear(telInput);
  await userEvent.type(telInput, '1234567890');
  fireEvent.blur(telInput);
  await waitFor(() => {
    expect(telInput).not.toHaveClass('validation-required');
  });
});

test('Form submission validation', async () => {
  completeStep1();

  const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
  const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const telInput = screen.getByRole('textbox', { name: /tel/i });
  const submitButton = screen.getByRole('button', { name: /confirm/i });

  await userEvent.clear(firstNameInput);
  await userEvent.clear(lastNameInput);
  await userEvent.clear(emailInput);
  await userEvent.clear(telInput);
  expect(submitButton).toBeDisabled();

  await userEvent.type(firstNameInput, 'John');
  await userEvent.type(lastNameInput, 'Doe');
  await userEvent.type(emailInput, 'john.doe@example.com');
  await userEvent.type(telInput, '1234567890');
  expect(submitButton).not.toBeDisabled();

  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
    expect(mockSubmitForm).toHaveBeenCalledWith({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      tel: '1234567890',
      date: '2025-04-01',
      time: '18:00',
      guests: '2',
      occasion: 'Birthday',
      note: '',
    });
  });
});