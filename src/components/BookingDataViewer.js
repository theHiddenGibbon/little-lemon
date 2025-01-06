import React from 'react';

const getBookingsFromStorage = () => {
  return JSON.parse(localStorage.getItem('bookingData')) || [];
};

const BookingDataViewer = () => {
  const bookings = getBookingsFromStorage();
  return (
    <div>
      <h4>Booking Data</h4>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            <p className="space1"><strong>Booking {index + 1}:</strong></p>
            <ul>
              {Object.entries(booking).map(([key, value]) => (
                <li key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BookingDataViewer;