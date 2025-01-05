import React, { useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './Hero.js';
import Home from './Home.js';
import About from './AboutUs.js';
import Menu from './Menu.js';
import BookingPage from './BookingPage.js';
import Order from './Order.js';
import Login from './Login.js';
import Account from './Account.js';

const initialiseTimes = () => {
  return [
    '16:00', 
    '17:00', 
    '18:00', 
    '19:00', 
    '20:00', 
    '21:00', 
    '22:00'
  ];
};

const timesReducer = (state, action) => {
  switch (action.type) {
    case 'update_times': return initialiseTimes();
    default: return state;
  }
};

const Main = ({ user, onLogin, onLogout }) => {

  const [availableTimes, dispatch] = useReducer(timesReducer, initialiseTimes());

  const updateTimes = (date) => {
    dispatch({ type: 'update_times', payload: date });
  };

  return(
    <main className="content-grid">
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About shortVersion={false} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/bookings" element={
          <BookingPage 
            availableTimes={availableTimes} 
            updateTimes={updateTimes} 
            user={user} 
            onLogin={onLogin} 
          />} 
        />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/account" element={<Account user={user} onLogout={onLogout} />} />
      </Routes>
    </main>
  );
};
export default Main;