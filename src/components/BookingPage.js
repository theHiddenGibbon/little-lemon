import BookingForm from './BookingForm.js';

const BookingPage = (props) => {

  return(
    <article id="bookings">
      <h3>Reserve a Table</h3>
      <p>Use the form below to reserve your table at Little Lemon.</p>
      <p>We are open every day from midday to 11pm.</p>
      <BookingForm {...props} />
    </article>
  );
};
export default BookingPage;