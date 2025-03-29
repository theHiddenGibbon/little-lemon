import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import BookingForm from './BookingForm.js';
import BookingConfirmed from './BookingConfirmed.js';
// import BookingDataViewer from './BookingDataViewer.js';
import scrollToSection from '../utils/scrollToSection';
import { fetchAPI, submitAPI } from '../data/api.js';

const timesReducer = (state, action) => {
  switch (action.type) {
    case 'update_times':
      return action.payload;
    default:
      return state;
  }
};

const getBookingsFromStorage = () => {
  return JSON.parse(localStorage.getItem('bookingData')) || [];
};

const BookingPage = ({ user, onLogin }) => {
  const [availableTimes, dispatch] = useReducer(timesReducer, []);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const location = useLocation();

  const initialiseTimes = (date, dispatch) => {
    const times = fetchAPI(new Date(date));
    dispatch({ type: 'update_times', payload: times });
  };

  const updateTimes = useCallback((date) => {
    initialiseTimes(date, dispatch);
  }, []);

  const handleConfirm = (data) => {
    setFormData(data);
    setIsConfirmed(true);
    const existingBookings = JSON.parse(localStorage.getItem('bookingData')) || [];
    const updatedBookings = [...existingBookings, { ...data }];
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const resetConfirm = () => {
    setIsConfirmed(false);
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    updateTimes(today);
  }, []);

  useEffect(() => {
    return () => {
      resetConfirm();
    };
  }, [location]);

  const submitForm = (formData) => {
    const result = submitAPI(formData);
    if (result) {
      handleConfirm(formData);
      scrollToSection("bookings");
    } else {
      alert('Error submitting form');
    }
  };

  useEffect(() => {
    const storedBookings = getBookingsFromStorage();
    setBookings(storedBookings);
  }, []);

  // const toggleBookings = () => {
  //   setShowBookings(!showBookings);
  // };

  return (
    <article id="bookings">
      <section className="booking-page">
        <h3 className="space1">Reserve a Table</h3>
        <p>We are open every day from midday to midnight. We have a table reservation system for evening bookings, starting from 5pm.</p>
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