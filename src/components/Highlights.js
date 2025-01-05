import './Highlights.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel.js';

const Highlights = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/order'); // Navigate to the Order page
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.specials').clientWidth;
      if (carouselRef.current.scrollLeft === 0) {
        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollWidth,
          behavior: 'smooth'
        });
      } else {
        carouselRef.current.scrollBy({
          left: -cardWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.specials').clientWidth;
      if (carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth) {
        carouselRef.current.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        carouselRef.current.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="highlights breakout">
      <h3>Highlights</h3>
      <button onClick={handleButtonClick} className="action-button">Online Menu</button>
      <div className="breakout carousel-container">
        <div className="overlay scroll-left">
          <button className="left" onClick={scrollLeft} aria-label="Scroll left">◀</button>
        </div>
        <Carousel ref={carouselRef} />
        <div className="overlay scroll-right">
          <button className="right" onClick={scrollRight} aria-label="Scroll right">▶</button>
        </div>
      </div>
    </section>
  );
};

export default Highlights;