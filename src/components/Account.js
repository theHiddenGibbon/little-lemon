import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = ({ user, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <article id="account" className="my-account">
      <h3>My Account</h3>
      <section className="my-details">
        <h4>My Details</h4>
        <p>Name: {user.firstname} {user.lastname}</p>
        <p>Email: {user.email}</p>
        <p>Tel: {user.telephone}</p>
        <p>
          Address:<br/>
          {user.address1}<br/>
          {user.address2}<br/>
          {user.address3}<br/>
          {user.state}, {user.zip}
        </p>
      </section>

      <section className="my-bookings">
        <h4>Reservations</h4>
        <p>Lorem ipsum adipisicing ullamco dolor ex labore amet ea consectetur.</p>
      </section>

      <section className="my-orders">
        <h4>My Orders</h4>
        <p>Lorem ipsum proident adipisicing excepteur quis do.</p>
      </section>

      <button 
        className="action-button" 
        onClick={handleLogout}
      >
        Logout
      </button>
    </article>
  );
};

export default Account;