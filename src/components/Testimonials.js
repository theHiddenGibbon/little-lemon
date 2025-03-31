import React, { useState, useRef } from 'react';
import './Testimonials.css';
import Star from '../icons/star-solid.svg';
import QuoteLeft from '../icons/quote-left-solid.svg';
import QuoteRight from '../icons/quote-right-solid.svg';

const testimonialData = [
  {
    name: "Mira Williams",
    review: "Lorem ipsum dolor consectetur consectetur voluptate consequat consequat ea aute commodo ex qui occaecat.",
    rating: 5,
    image: "../../dynamic-images/user1.jpg"
  },
  {
    name: "Alan Bennett",
    review: "Lorem ipsum aliqua nostrud tempor pariatur ut est mollit laboris consequat fugiat esse.",
    rating: 5,
    image: "../../dynamic-images/user2.jpg"
  },
  {
    name: "David Smith",
    review: "Lorem ipsum elit qui deserunt officia veniam proident voluptate reprehenderit sint enim.",
    rating: 5,
    image: "../../dynamic-images/user3.jpg"
  },
  {
    name: "Olivia Johnson",
    review: "Lorem ipsum veniam mollit in eiusmod proident.",
    rating: 5,
    image: "../../dynamic-images/user4.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);

  const handleCardClick = (index) => {
    setActiveIndex(index);
    if (cardRefs.current[index]) {
      cardRefs.current[index].blur();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      handleCardClick(index);
    }
  };

  return (
    <section className="testimonials full-width" aria-live="polite">
      <h3 id="testimonials-heading">Testimonials</h3>
      <ul className="testimonial-list" aria-labelledby="testimonials-heading">
        {testimonialData.map((testimonial, index) => (
          <React.Fragment key={index}>
            <li
              className={`${index === activeIndex 
                ? 'testimonial-card-active' 
                : 'testimonial-card-inactive'
              } testimonial${index}`}
              onClick={() => handleCardClick(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              tabIndex={index === activeIndex ? -1 : 0}
              ref={el => cardRefs.current[index] = el}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <div className="user-card">
                <img src={testimonial.image} alt={`${testimonial.name}'s avatar`} />
                <h5>{testimonial.name}</h5>
              </div>
            </li>
            {index === activeIndex && (
              <li className={`review review${index} active`}>
                <div className="rating" aria-label={`Rating: ${testimonial.rating} out of 5`}>
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <img key={index} src={Star} alt="star" className="star" />
                  ))}
                </div>
                <p className="quote">
                  <img src={QuoteLeft} alt="open quotation mark" />
                  {testimonial.review}
                  <img src={QuoteRight} alt="close quotation mark" />
                </p>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;