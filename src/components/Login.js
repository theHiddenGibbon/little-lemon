import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { users } from '../data/users';
import './Login.css';

const Login = ({ onLogin, isModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setError('');
      onLogin(user);
      navigate('/Account');
    } else {
      setError('Invalid email or password');
    }
  };

  return(
    <section 
      id={isModal ? "login-modal" : "login"} 
      className={`login-section ${isModal ? 'modal' : ''}`}
    >
      <h3>Login</h3>
      {location.state?.message && <p className="success-message">{location.state.message}</p>}      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="action-button">Login</button>
      </form>
    </section>
  );
};

export default Login;