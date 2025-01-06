import './Booking.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Login from './Login';
import Calendar from  '../icons/calendar-regular.svg';
import Clock from '../icons/clock-regular.svg';
import Chair from '../icons/chair-solid.svg';
import Cake from '../icons/cake-candles-solid.svg';
import Note from '../icons/comment-dots-regular.svg';
import scrollToSection from '../utils/scrollToSection';

const BookingForm = ({ availableTimes, updateTimes, user, onLogin, submitForm }) => {
  const today = new Date().toISOString().split('T')[0];
  const formRef = useRef(null);
  const location = useLocation();

  const [formData, setFormData] = useState({
    guests: 1,
    date: today,
    time: '',
    occasion: 'None',
    note: '',
    firstname: user ? user.firstname : '',
    lastname: user ? user.lastname : '',
    email: user ? user.email : '',
    tel: user ? user.telephone : ''
  });

  const [step, setStep] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const resetForm = (today) => {
    setFormData({
      guests: 1,
      date: today,
      time: '',
      occasion: 'None',
      note: '',
      firstname: '',
      lastname: '',
      email: '',
      tel: ''
    });
    setShowLoginModal(false);
    setStep(1);
  };

  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        tel: user.telephone
      }));
    }
  }, [user]);

  useEffect(() => {
    if (location.pathname === '/bookings' && !user) {
      resetForm(today);
    }
  }, [location.key, user]);

  useEffect(() => {
    if (location.pathname === '/bookings') {
      setStep(1);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (showLoginModal && formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      const overlay = document.querySelector('.login-form-overlay');
      if (overlay) {
        overlay.style.width = `${rect.width}px`;
        overlay.style.height = `${rect.height}px`;
      }
    }
  }, [showLoginModal]);

  useEffect(() => {
    updateTimes(formData.date);
  }, [formData.date, updateTimes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newState = {
        ...prevData,
        [name]: value
      };
      return newState;
    });
  };

  const handleScrollToTop = () => {
    requestAnimationFrame(() => {
      scrollToSection("reservation-form");
    });
  };

  const validateFields = (fields) => {
    let isValid = true;
    for (const field of fields) {
      if (field.hasAttribute('required') && !field.value) {
        field.setCustomValidity('This field is required');
        field.reportValidity();
        field.classList.add('validation-required');
        isValid = false;
      } else {
        field.setCustomValidity('');
        field.classList.remove('validation-required');
      }
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFields = formRef.current.querySelectorAll('input, select, textarea');
    if (validateFields(allFields)) {
      submitForm(formData);
    } else {
      console.log('Form is invalid'); // error handling to be added
    }
  };

  const handleProceedClick = () => {
    const step1Fields = formRef.current.querySelectorAll('.step1 input, .step1 select, .step1 textarea');
    if (validateFields(step1Fields)) {
      setStep(2);
      handleScrollToTop();
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    setStep(1);
    handleScrollToTop();
  };

  return (
    <section id="reservation-form" className="reservation-form">
      {showLoginModal && (
        <>
          <div className="fullscreen-overlay" onClick={() => setShowLoginModal(false)}></div>
          <div className="login-form-overlay">
            <Login 
              isModal={true}
              onLogin={(loggedInUser) => {
                setShowLoginModal(false);
                setFormData(prevData => ({
                  ...prevData,
                  firstname: loggedInUser.firstname,
                  lastname: loggedInUser.lastname,
                  email: loggedInUser.email,
                  tel: loggedInUser.telephone
                }));
                onLogin(loggedInUser);
              }} 
            />
            <a 
              href="#" 
              className="cancel-link" 
              onClick={(e) => { e.preventDefault(); setShowLoginModal(false); }}
              >Cancel</a>
          </div>
        </>
      )}
      <form 
        className="booking" 
        onSubmit={handleSubmit} 
        ref={formRef}
      >
        {step === 1 && (
          <section className="step1">
            <h4>Reservation Details</h4>
            <div className="input-group">
              <label htmlFor="guests">
                <img src={Chair} alt="seat icon" />
                <span>Number of guests</span>
              </label>
              <input 
                type="number" 
                placeholder="2" 
                min="1" max="10" 
                id="guests" 
                name="guests" 
                value={formData.guests} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="res-date">
                <img src={Calendar} alt="" role="presentation" />
                <span>Date</span>
              </label>
              <input 
                type="date" 
                id="res-date" 
                name="date" 
                value={formData.date} 
                onChange={handleInputChange} 
                onClick={(e) => {
                  if (window.TouchEvent) {
                    e.target.click();
                  }
                }} 
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="res-time">
                <img src={Clock} alt="" role="presentation" />
                <span>Time</span>
              </label>
              <select 
                id="res-time" 
                name="time" 
                value={formData.time} 
                onChange={handleInputChange} 
                required
              >
                <option value="" disabled>select</option>
                {availableTimes.map((availableTime, index) => (
                  <option key={index} value={availableTime}>{availableTime}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="occasion">
                <img src={Cake} alt="" role="presentation" />
                <span>Occasion</span>
              </label>
              <select 
                id="occasion" 
                name="occasion" 
                value={formData.occasion} 
                onChange={handleInputChange}
              >
                <option>None</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Other (add note)</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="res-note">
                <img src={Note} alt="" role="presentation" />
                <span>Notes & Requests</span>
              </label>
              <textarea 
                type="text" 
                id="res-note" 
                name="note" 
                value={formData.note} 
                rows="4" 
                onChange={handleInputChange} 
                placeholder="Add special requests or notes here. Please contact us directly beforehand for important requests."
              />
              <p>[Optional]</p>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="step2">
            <h4>Customer Details</h4>
            {!user && 
              <p>If you are already registered with Little Lemon, you can <a 
                  href="#" 
                  onClick={(e) => {e.preventDefault(); setShowLoginModal(true);}}
                >login</a> to save time.</p>
            }
            <div className="input-group">
              <label htmlFor="first-name">First name</label>
              <input 
                type="text" 
                id="first-name" 
                name="firstname" 
                placeholder="first name" 
                value={formData.firstname} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last name</label>
              <input 
                type="text" 
                id="last-name" 
                name="lastname" 
                placeholder="last name" 
                value={formData.lastname} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="email address" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="input-group">
              <label htmlFor="tel">Telephone</label>
              <input 
                type="tel" 
                id="tel" 
                name="tel" 
                placeholder="telephone number" 
                value={formData.tel} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <p className="space1">Data is stored confidentially and will only be used for matters relating to your bookings and orders.</p>
          </section>
        )}

        <div className={`progress progress-step${step}`}>
          <div className="res-back">
            {step === 2 && <a href="#reservation-form" onClick={handleBackClick}>◀ Back</a>}
          </div>
          <p className="reservation-step">Step {step} of 2</p>
          {step === 1 
            ? <button 
                type="button" 
                className="action-button res-proceed" 
                onClick={handleProceedClick}
              >Proceed</button>
            : <input 
                type="submit" 
                value="Confirm" 
                className="action-button res-confirm" 
              />
          }
        </div>
      </form>
    </section>
  );
};

export default BookingForm;