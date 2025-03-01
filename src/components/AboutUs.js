import './AboutUs.css'
import React from 'react';
import { Link } from 'react-router-dom';
import Brothers from '../images/mario-and-adrian.jpg';
import Chef from '../images/chef.jpg';
import Restaurant from '../images/restaurant.jpg';
import Interior from '../images/interior.jpg';

const AboutUs = ({ shortVersion }) => {

  return(
    <section 
      id={shortVersion ? "about-short" : "about-full"} 
      className="about-us"
    >
      <h3>About Little Lemon</h3>
      <p>Based in Chicago, Illinois, Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
      <p>The chefs draw inspiration from Italian, Greek, and Turkish culture and have a menu of 12-15 items that they rotate seasonally. The restaurant has a rustic and relaxed atmosphere with moderate prices, making it a popular place for a meal any time of the day.</p>
      {shortVersion 
        ? <Link to="/about" className="about-link">More about us ►</Link> 
        : <div className="about-long">
            <p>Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant.</p>
            <p>To craft the menu, Mario relies on family recipes and his experience as a chef in Italy. Adrian does all the marketing for the restaurant and led the effort to expand the menu beyond classic Italian to incorporate additional cuisines from the Mediterranean region.</p>
            <h5>Opening Hours</h5>
            <p>The restaurant is open every day from midday to 11pm. <Link to="/bookings" className="about-link reserve">Reservation</Link> is recommended for lunch and evening meals.</p>
          </div>
      }
      <div className={`about-image-container${shortVersion ? ' short' : ''}`}>
        <img src={Chef} alt="Little Lemon chef preparing food at Little Lemon" /> 
        <img src={Brothers} alt="The Little Lemon owners, Adrian and Mario" />
        <img src={Restaurant} alt="Little Lemon's outside seating terrace" />
        {!shortVersion && 
          <img src={Interior} alt="Inside Little Lemon dining room" />
        }
      </div>
    </section>
  );
};
export default AboutUs;