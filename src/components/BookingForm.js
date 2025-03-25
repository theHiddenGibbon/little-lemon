import './Booking.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import Calendar from  '../icons/calendar-regular.svg';
import Clock from '../icons/clock-regular.svg';
import Chair from '../icons/chair-solid.svg';
import Cake from '../icons/cake-candles-solid.svg';
import Note from '../icons/comment-dots-regular.svg';
import scrollToSection from '../utils/scrollToSection';
import { validationConfig } from '../utils/validationConfig';

const getInitialFormData = (today, user) => ({
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

const getInitialFieldValidity = (user) => ({
  guests: true,
  date: true,
  time: false,
  occasion: true,
  note: true,
  firstname: user && user.firstname ? true : false,
  lastname: user && user.lastname ? true : false,
  email: user && user.email ? true : false,
  tel: user && user.telephone ? true : false
});

const BookingForm = ({ availableTimes, updateTimes, user, onLogin, submitForm }) => {
  const today = new Date().toISOString().split('T')[0];
  const formRef = useRef(null);
  const location = useLocation();

  const [formData, setFormData] = useState(getInitialFormData(today, user));
  const [fieldValidity, setFieldValidity] = useState(getInitialFieldValidity(user));
  const [batchValidating, setBatchValidating] = useState(false);
  const [step, setStep] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const resetForm = useCallback((today) => {
    setFormData(getInitialFormData(today, user));
    setFieldValidity(getInitialFieldValidity(user));
    setShowLoginModal(false);
    setStep(1);
  }, [user]);

  useEffect(() => {
    if (user) {
      const updatedFormData = getInitialFormData(today, user);
      setFormData(updatedFormData);
      const updatedFieldValidity = getInitialFieldValidity(user);
      setFieldValidity(updatedFieldValidity);
    }
  }, [user, today]);

  useEffect(() => {
    if (location.pathname === '/bookings' && !user) {
      resetForm(today);
    }
  }, [location.pathname, location.key, user, today, resetForm]);

  useEffect(() => {
    if (location.pathname === '/bookings') {
      setStep(1);
    }
  }, [location.pathname, location.key]);

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

  const handleScrollToTop = () => {
    scrollToSection(formRef.current);
  };

  const validateField = (field, batchValidating) => {
    const config = validationConfig[field.name];
    if (!config) return true;
    let isValid = true;
    let message = '';

    if (field.type === 'number' && (field.validity.badInput || isNaN(Number(field.value)))) {
      isValid = false;
      message = config.message;
    }
    else if (!field.value && config.required) {
      isValid = false;
      message = config.emptyMessage;
    }
    else if (field.value && config.pattern && !config.pattern.test(field.value)) {
      isValid = false;
      message = config.message;
    }
    else if (field.value && (config.min !== undefined || config.max !== undefined)) {
      if (field.type === 'date') {
        const value = new Date(field.value);
        const minDate = config.min ? new Date(config.min) : null;
        const maxDate = config.max ? new Date(config.max) : null;
        if ((minDate && value < minDate) || (maxDate && value > maxDate)) {
          isValid = false;
          message = config.message;
        }
      } else {
        const value = field.type === 'number' ? Number(field.value) : field.value.length;
        if ((config.min !== undefined && value < config.min) || 
            (config.max !== undefined && value > config.max)) {
          isValid = false;
          message = config.message;
        }
      }
    }
    return { isValid, message };
  };

  const validateStep = (form) => {
    if (!form) return false;
    const stepFields = Array.from(form.querySelectorAll(`.step${step} input, .step${step} select, .step${step} textarea`))
      .filter(field => field.type !== 'submit' && field.type !== 'button');
    let isValid = true;
    stepFields.forEach(field => {
      isValid = validateField(field, true) && isValid;
    });
    if (!isValid) {
      const firstInvalid = stepFields.find(field => 
        field.classList.contains('validation-required'));
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.reportValidity();
      }
    }
    return isValid;
  };

  const isStepValid = (step) => {
    if (step === 1) {
      return fieldValidity.guests && 
             fieldValidity.date && 
             fieldValidity.time && 
             fieldValidity.occasion &&
             fieldValidity.note;
    } 
    return fieldValidity.firstname && 
           fieldValidity.lastname && 
           fieldValidity.email && 
           fieldValidity.tel;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFieldValidity({
      ...fieldValidity,
      [name]: e.target.validity.valid
    });
  };

  useEffect(() => {
    if (!availableTimes.includes(formData.time)) {
      setFormData(prev => ({
        ...prev,
        time: ''
      }));
      setFieldValidity(prev => ({
        ...prev,
        time: false
      }));
    }
  }, [availableTimes, formData.time]);

  const displayValidity = (field) => {
    const isValid = field.validity.valid;
    if (!isValid) {
      field.classList.add('validation-required');
    } else {
      field.classList.remove('validation-required');
    }
  };

  const handleBlur = (e) => {
    if (!batchValidating) {
      displayValidity(e.target);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBatchValidating(true);
    if (validateStep(formRef.current)) {
      submitForm(formData);
    }
    setBatchValidating(false);
  };

  const handleProceed = () => {
    setBatchValidating(true);
    if (validateStep(formRef.current)) {
      setStep(2);
      scrollToSection(formRef.current);
    }
    setBatchValidating(false);
  };

  const handleBack = (e) => {
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
            <button
              type="button" 
              className="link-button" 
              onClick={(e) => { 
                e.preventDefault(); 
                setShowLoginModal(false); 
              }}
            >
              ◀ Cancel
            </button>
          </div>
        </>
      )}
      <form 
        className="booking" 
        onSubmit={handleSubmit} 
        noValidate 
        ref={formRef}
      >
        {step === 1 && (
          <section className="step1">
            <h4>Reservation Details</h4>
            <fieldset className="input-group">
              <label htmlFor="guests">
                <img src={Chair} alt="seat icon" />
                <span>Number of guests</span>
              </label>
              <input 
                type="number" 
                placeholder="2" 
                min="1" max="10" 
                maxLength="2" 
                id="guests" 
                name="guests" 
                value={formData.guests} 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
                pattern="^([1-9]|10)$" 
                title="Select a number, max 10"
                required 
              />
            </fieldset>
            <fieldset className="input-group">
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
                onBlur={handleBlur} 
                onClick={(e) => {
                  if (window.TouchEvent) {
                    e.target.click();
                  }
                }} 
                title="Select a date" 
                required 
              />
            </fieldset>
            <fieldset className="input-group">
              <label htmlFor="res-time">
                <img src={Clock} alt="" role="presentation" />
                <span>Time</span>
              </label>
              <select 
                id="res-time" 
                name="time" 
                value={formData.time} 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
                title="Select an available time" 
                required
              >
                <option value="" disabled>select</option>
                {availableTimes.map((availableTime, index) => (
                  <option key={index} value={availableTime}>{availableTime}</option>
                ))}
              </select>
            </fieldset>
            <fieldset className="input-group">
              <label htmlFor="occasion">
                <img src={Cake} alt="" role="presentation" />
                <span>Occasion</span>
              </label>
              <select 
                id="occasion" 
                name="occasion" 
                value={formData.occasion} 
                onBlur={handleBlur} 
                onChange={handleInputChange}
              >
                <option>None</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Other (add note)</option>
              </select>
            </fieldset>
            <fieldset className="input-group">
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
                maxLength="180" 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
                placeholder="Add special requests or notes here. Please contact us directly beforehand for important requests."
              />
              <p>[Optional]</p>
            </fieldset>
          </section>
        )}

        {step === 2 && (
          <section className="step2">
            <h4>Customer Details</h4>
            {!user && 
              <p>If you are already registered with Little Lemon, you can 
                <button
                  type="button" 
                  className="link-button" 
                  onClick={() => setShowLoginModal(true)}
                >
                  login
                </button>
                to save time.</p>
            }
            <fieldset className="input-group">
              <label htmlFor="first-name">First name</label>
              <input 
                type="text" 
                id="first-name" 
                name="firstname" 
                aria-label="first name" 
                placeholder="first name" 
                value={formData.firstname} 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
                minLength="2" maxLength="40" 
                pattern="[A-Za-z'\- ]+" 
                required 
              />
              <label htmlFor="last-name">Last name</label>
              <input 
                type="text" 
                id="last-name" 
                name="lastname" 
                aria-label="last name" 
                placeholder="last name" 
                value={formData.lastname} 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
                minLength="2" maxLength="40" 
                pattern="[A-Za-z'\- ]+" 
                required 
              />
            </fieldset>
            <fieldset className="input-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                aria-label="email address" 
                placeholder="email address" 
                value={formData.email} 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
                minLength="5" maxLength="254" 
                required 
              />
            </fieldset>
            <fieldset className="input-group">
              <label htmlFor="tel">Telephone</label>
              <input 
                type="tel" 
                id="tel" 
                name="tel" 
                aria-label="telephone number" 
                placeholder="telephone number" 
                value={formData.tel} 
                onChange={handleInputChange} 
                onBlur={handleBlur} 
                minLength="9" maxLength="18"
                required 
              />
            </fieldset>
            <p className="space1">Data is stored confidentially and will only be used for matters relating to your bookings and orders.</p>
          </section>
        )}

        <div className={`progress progress-step${step}`}>
          <div className="res-back">
            {step === 2 && <a href="#reservation-form" onClick={handleBack}>◀ Back</a>}
          </div>
          <p className="reservation-step">Step {step} of 2</p>
          {step === 1 
            ? <button 
                type="button" 
                className="action-button res-proceed" 
                onClick={handleProceed} 
                disabled={!isStepValid(1)}
              >Proceed</button>
            : <input 
                type="submit" 
                value="Confirm" 
                className="action-button res-confirm" 
                disabled={!isStepValid(2)} 
              />
          }
        </div>
      </form>
    </section>
  );
};

export default BookingForm;