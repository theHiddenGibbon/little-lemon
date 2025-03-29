import './Booking.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BookingConfirmed = ({ user, formData }) => {

  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  const validatePasswordRequirements = (pwField) => {
    pwField.setCustomValidity('');
    pwField.classList.remove('validation-required');
    if (!Object.values(requirements).every(Boolean)) {
      pwField.setCustomValidity('Password requirements not met');
      pwField.classList.add('validation-required');
      return false;
    }
    return true;
  };

  const validatePasswordMatch = (pwConfirmField) => {
    pwConfirmField.setCustomValidity('');
    pwConfirmField.classList.remove('validation-required');
    if (password !== confirmPassword) {
      pwConfirmField.setCustomValidity('Passwords do not match');
      pwConfirmField.classList.add('validation-required');
      return false;
    }
    return true;
  };

  const handleBlur = (e) => {
    const field = e.target;
    if (field.name === 'password') {
      if (!validatePasswordRequirements(field)) {
        field.reportValidity();
      }
    }
    if (field.name === 'pwconfirm') {
      if (!validatePasswordMatch(field)) {
        field.reportValidity();
      }
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validatePasswordMatch(e.target.pwconfirm)) {
      e.target.pwconfirm.reportValidity();
      return;
    }
    if (!validatePasswordRequirements(e.target.password)) {
      e.target.password.reportValidity();
      return;
    }
    navigate('/login');
  };

  const checkValidation = (currentPassword, currentConfirmPassword) => {
    return Object.values(requirements).every(Boolean) && 
           currentPassword === currentConfirmPassword;
  };

  const checkRequirements = (password) => {
    const check = {
      length: password.length >= 8 && password.length <= 16,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password)
    };
    setRequirements(check);
    setIsValid(checkValidation(password, confirmPassword));
  };

  return(
    <section className="booking">
      <section className="res-confirmation">
        <h4>Your reservation has been confirmed!</h4>
        <div className="confirmation-details">
          <p>Thank you {formData.firstname}, we look forward to seeing you at Little Lemon on:</p>
          <p>
            <strong>
              {new Date(formData.date)
                .toLocaleDateString('en-GB',{ weekday: 'long' })
                .slice(0, 3) + ", " + 
                  new Date(formData.date)
                    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    .replace(/\s/g, '-')}
            </strong> at <strong>{formData.time}</strong>.
          </p>
          <p>Your table is reserved for <strong>
            {formData.guests}</strong> {formData.guests > 1 ? 'guests' : 'person'}.
          </p>
        </div>
      </section>
      {!user && (<section className="register-account">
        <h4>Register With Little Lemon</h4>
        <p className="lead-text">Why not register your account with us to save time on future transactions and make it easier to view and manage your reservations and orders.</p>
        <p>Just create a password below and click to create your account.</p>
        <form 
          onSubmit={handleRegister} 
          noValidate
        >
          <div className="set-password">
            <div className="input-group">
              <label htmlFor="user-email">Email</label>
              <input 
                type="text" 
                id="user-email" 
                value={formData.email} 
                disabled 
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkRequirements(e.target.value);
                }} 
                onBlur={handleBlur} 
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="pwconfirm">Confirm Password</label>
              <input 
                type="password" 
                id="pwconfirm" 
                name="pwconfirm" 
                value={confirmPassword} 
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setIsValid(checkValidation(password, e.target.value));
                }} 
                onBlur={handleBlur} 
                required
              />
            </div>
            <p>Passwords must contain:</p>
            <ul>
              <li className={`pw-requirement ${requirements.length ? 'met' : 'unmet'}`}>
                8-16 characters
              </li>
              <li className={`pw-requirement ${requirements.uppercase ? 'met' : 'unmet'}`}>
                1+ uppercase character
              </li>
              <li className={`pw-requirement ${requirements.lowercase ? 'met' : 'unmet'}`}>
                1+ lowercase character
              </li>
              <li className={`pw-requirement ${requirements.number ? 'met' : 'unmet'}`}>
                1+ numerical digit
              </li>
            </ul>
          </div>
          <input 
            type="submit" 
            value="Create Account"
            className="action-button create-account" 
            disabled={!isValid} 
          />
        </form>
      </section>)}
      <Link to="/" className="return-home">{!user ? 'No thanks, r' : 'R'}eturn to Home</Link>
    </section>
  );
};
export default BookingConfirmed;