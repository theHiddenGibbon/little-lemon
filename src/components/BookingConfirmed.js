import './Booking.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BookingConfirmed = ({ user, formData }) => {

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      <section>
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
                value={formData.email} 
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
      </section>
      <Link to="/" className="return-home">{!user ? 'No thanks, r' : 'R'}eturn to Home</Link>
    </section>
  );
};
export default BookingConfirmed;