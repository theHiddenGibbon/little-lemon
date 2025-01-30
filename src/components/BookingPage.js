import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import BookingForm from './BookingForm.js';
import BookingConfirmed from './BookingConfirmed.js';
import BookingDataViewer from './BookingDataViewer.js';
import api from '../data/api.js';
import scrollToSection from '../utils/scrollToSection';

const timesReducer = (state, action) => {
  switch (action.type) {
    case 'update_times':
      return action.payload;
    default:
      return state;
  }
};

// const getBookingsFromStorage = () => {
//   return JSON.parse(localStorage.getItem('bookingData')) || [];
// };

const BookingPage = ({ user, onLogin }) => {

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState(null);
  // const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false); // for testing purposes

  const [availableTimes, dispatch] = useReducer(timesReducer, []);
  const location = useLocation();

  const handleConfirm = (data) => {
    setFormData(data);
    setIsConfirmed(true);
    const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
    const updatedBookings = [...existingBookings, { ...data }];
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
    // setBookings(updatedBookings);
  };

  const resetConfirm = () => {
    setIsConfirmed(false);
  };

  useEffect(() => {
    return () => {
      resetConfirm();
    };
  }, [location]);

  const initialiseTimes = (date) => {
    api.fetchAPI(date)
      .then(result => {
        dispatch({ type: 'update_times', payload: result });
      })
      .catch(() => {
        dispatch({ type: 'update_times', payload: [] });
      });
  };

  const updateTimes = useCallback((date) => {
    initialiseTimes(date);
  }, []);

  const submitForm = (formData) => {
    const result = api.submitAPI(formData);
    if (result) {
      handleConfirm(formData);
      scrollToSection("bookings");
    } else {
      alert('Error submitting form'); // error handling to be added
    }
  };

  // useEffect(() => {
  //   const storedBookings = getBookingsFromStorage();
  //   setBookings(storedBookings);
  // }, []);

  const toggleBookings = () => {
    setShowBookings(!showBookings);
  };

  return(
    <article id="bookings">
      <section className="confirmation">
        <h3 className="space1">Reserve a Table</h3>
        <p>We are open every day from midday to 11pm. We have a table reservation system for evening bookings, starting from 5pm.</p>
        <p className="space1">Use the form below to reserve your table with us at Little Lemon.</p>
        {!showBookings && (
          !isConfirmed ? (
            <BookingForm 
              availableTimes={availableTimes} 
              updateTimes={updateTimes} 
              submitForm={submitForm} 
              user={user} 
              onLogin={onLogin} 
            />
          ) : (
            <BookingConfirmed 
              user={user} 
              submitForm={submitForm} 
              formData={formData} 
            />
          )
      )}
      </section>
      {/* <button onClick={toggleBookings}>
        {showBookings ? 'Hide Bookings' : 'View Bookings'}
      </button>
      <p>This booking data viewer is for testing purposes only.</p>
      {showBookings && (
        <aside className="booking">
          <BookingDataViewer />}
        </aside>
      )} */}
    </article>
  );
};
export default BookingPage;