const BookingDataViewer = ({ bookings }) => {
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