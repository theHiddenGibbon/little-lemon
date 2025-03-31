// import { type } from "@testing-library/user-event/dist/type";

const today = new Date().toISOString().split('T')[0];
const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3))
    .toISOString().split('T')[0];

export const validationConfig = {

  guests: {
    required: true,
    type: 'number',
    pattern: /^([1-9]|10)$/,
    min: 1,
    max: 10,
    message: 'Please enter the number of guests, max 10. Contact us directly for bookings of more than 10.',
    emptyMessage: 'Number of guests is required'
  },

  date: {
    required: true,
    type: 'date',
    min: today,
    max: maxDate,
    message: 'Please select a valid date, up to 3 months ahead',
    emptyMessage: 'Date is required'
  },
  time: {
    required: true,
    type: 'string',
    message: 'Please select an available time',
    emptyMessage: 'Please select an available time'
  },
  occasion: {
    required: false,
    type: 'select',
    message: 'Please select an occasion'
  },
  note: {
    required: false,
    type: 'string',
    maxLength: 180,
    message: 'Note cannot exceed 180 characters'
  },

  firstname: {
    required: true,
    type: 'string',
    pattern: /^[A-Za-z'\- ]+$/,
    minLength: 2,
    maxLength: 40,
    message: 'Please enter first name. (Letters, hyphen, apostrophe and space only)',
    emptyMessage: 'First name is required'
  },
  lastname: {
    required: true,
    type: 'string',
    pattern: /^[A-Za-z'\- ]+$/,
    minLength: 2,
    maxLength: 40,
    message: 'Please enter last name. (Letters, hyphen, apostrophe and space only)',
    emptyMessage: 'Last name is required'
  },
  email: {
    required: true,
    type: 'string',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    minLength: 5,
    maxLength: 254,
    message: 'Please enter a valid email address',
    emptyMessage: 'Email is required'
  },
  tel: {
    required: false,
    type: 'string',
    pattern: /^\+?[\d\s-]{9,18}$/,
    minLength: 9,
    maxLength: 18,
    message: 'Please enter a valid phone number (9-18 digits)',
    emptyMessage: 'Phone number is required'
  }
};