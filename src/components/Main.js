import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './Hero.js';
import Home from './Home.js';
import About from './AboutUs.js';
import Menu from './Menu.js';
import BookingPage from './BookingPage.js';
import Order from './Order.js';
import Login from './Login.js';
import Account from './Account.js';

const Main = ({ user, onLogin, onLogout }) => {
  return(
    <main className="content-grid">
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About shortVersion={false} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/bookings" element={
          <BookingPage 
            user={user} 
            onLogin={onLogin} 
          />} 
        />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/account" element={
          <Account 
            user={user} 
            onLogout={onLogout} 
          />} 
        />
      </Routes>
    </main>
  );
};
export default Main;