import './BookingForm.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Login from './Login';
import Calendar from  '../icons/calendar-regular.svg';
import Clock from '../icons/clock-regular.svg';
import Chair from '../icons/chair-solid.svg';
import Cake from '../icons/cake-candles-solid.svg';
import Note from '../icons/comment-dots-regular.svg';
import { useLocation } from 'react-router-dom';
import scrollToSection from '../utils/scrollToSection';


const BookingForm = ({ availableTimes, updateTimes, user, onLogin }) => {
  const today = new Date().toISOString().split('T')[0];
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('');
  const [occasion, setOccasion] = useState('None');
  const [note, setNote] = useState('');
  const [firstname, setFirstname] = useState(user ? user.firstname : '');
  const [lastname, setLastname] = useState(user ? user.lastname : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [tel, setTel] = useState(user ? user.telephone : '');
  const [step, setStep] = useState(2);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showLoginModal, setShowLoginModal] = useState(false);

  const resetForm = () => {
    setGuests(2);
    setDate(today);
    setTime('');
    setOccasion('None');
    setNote('');
    setFirstname('');
    setLastname('');
    setEmail('');
    setTel('');
    setPassword('');
    setConfirmPassword('');
    setShowLoginModal(false);
    setStep(1);
  };

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setTel(user.telephone);
    }
  }, [user]);

  useEffect(() => {
    if (location.pathname === '/bookings' && !user) {
      resetForm();
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

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    updateTimes(selectedDate);
  };

  const handleScrollToTop = () => {
    requestAnimationFrame(() => {
      scrollToSection("reservation-form");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      date,
      time,
      guests,
      occasion,
      note,
      firstname,
      lastname,
      email,
      tel
    });
    setStep(3);
    handleScrollToTop();
  };

  const handleProceedClick = () => {
    setStep(2);
    handleScrollToTop();
  }

  const handleBackClick = (e) => {
    e.preventDefault();
    setStep(1);
    handleScrollToTop();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      alert('Password must contain at least one uppercase letter');
      return;
    }
    if (!/[a-z]/.test(password)) {
      alert('Password must contain at least one lowercase letter');
      return;
    }
    if (!/[0-9]/.test(password)) {
      alert('Password must contain at least one number');
      return;
    }
    navigate('/login');
  };

  return (
    <article id="reservation-form" className="reservation-form">
      {showLoginModal && (
        <>
          <div className="fullscreen-overlay" onClick={() => setShowLoginModal(false)}></div>
          <div className="login-form-overlay">
            <Login 
              isModal={true}
              onLogin={(loggedInUser) => {
                setShowLoginModal(false);
                setFirstname(loggedInUser.firstname);
                setLastname(loggedInUser.lastname);
                setEmail(loggedInUser.email);
                setTel(loggedInUser.telephone);
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
        className="booking-form" 
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
                value={guests} 
                onChange={e => setGuests(e.target.value)} 
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
                value={date} 
                onChange={handleDateChange} 
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
                value={time} 
                onChange={e => setTime(e.target.value)} 
                required
              >
                <option value="" hidden>select</option>
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
                value={occasion} 
                onChange={e => setOccasion(e.target.value)}
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
                value={note} 
                rows="4"
                onChange={e => setNote(e.target.value)} 
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
                placeholder="first name"
                value={firstname} 
                onChange={e => setFirstname(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last name</label>
              <input 
                type="text" 
                id="last-name" 
                placeholder="last name"
                value={lastname} 
                onChange={e => setLastname(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="email address"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label htmlFor="tel">Telephone</label>
              <input 
                type="tel" 
                id="tel" 
                placeholder="telephone number"
                value={tel} 
                onChange={e => setTel(e.target.value)} 
              />
            </div>
            <p className="space1">Data is stored confidentially and will only be used for matters relating to your bookings and orders.</p>
          </section>
        )}

        {step < 3 && (
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
        )}

        {step === 3 && (
          <section className="res-confirmation">
            <h4>Your reservation has been confirmed!</h4>
            <div className="confirmation-details">
              <p>Thank you {firstname}, we look forward to seeing you at Little Lemon on:</p>
              <p>
                <strong>
                  {new Date(date).toLocaleDateString('en-GB', 
                    { weekday: 'long' }).slice(0, 3) + ", " + new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\s/g, '-')}
                </strong> at <strong>{time}</strong>.
              </p>
              <p>Your table is reserved for <strong>{guests}</strong> {guests > 1 ? 'guests' : 'person'}.</p>
            </div>
            {!user && (<div className="register-account">
              <h4>Register With Little Lemon</h4>
              <p className="lead-text">Why not register your account with us to save time on future transactions and make it easier to view and manage your reservations and orders.</p>
              <p>Just create a password below and click to create your account.</p>
              <div className="set-password">
                <div className="input-group">
                  <label htmlFor="user-email">Email</label>
                  <input 
                    type="text" 
                    id="user-email" 
                    value={email} 
                    disabled 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                  <label htmlFor="password-confirm">Confirm Password</label>
                  <input 
                    type="password" 
                    id="password-confirm" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </div>
                <p>Password must contain at minimum each of the following:</p>
                <ul>
                  <li className="pw-requirement">8+ characters</li>
                  <li className="pw-requirement">1+ upper case</li>
                  <li className="pw-requirement">1+ lower case</li>
                  <li className="pw-requirement">1+ number</li>
                </ul>
              </div>
              <input 
                type="submit" 
                value="Create Account"
                className="action-button create-account" 
                onClick={handleRegister} 
              />
            </div>)}
            <Link to="/" className="return-home">{!user ? 'No thanks, r' : 'R'}eturn to Home</Link>
          </section>
        )}
      </form>
    </article>
  );
};

export default BookingForm;