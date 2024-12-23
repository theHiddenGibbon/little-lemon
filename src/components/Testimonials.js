import React from 'react';
import './Testimonials.css';

const testimonialData = [
  {
    name: "user #1",
    review: "Lorem ipsum dolor consectetur consectetur voluptate consequat consequat ea aute commodo ex qui occaecat.",
    rating: 5,
    image: "../../dynamic-images/user1.jpg"
  },
  {
    name: "username",
    review: "Lorem ipsum aliqua nostrud tempor pariatur ut est mollit laboris consequat fugiat esse.",
    rating: 5,
    image: "../../dynamic-images/user2.jpg"
  },
  {
    name: "user person",
    review: "Lorem ipsum elit qui deserunt officia veniam proident voluptate reprehenderit sint enim.",
    rating: 5,
    image: "../../dynamic-images/user3.jpg"
  },
  {
    name: "another user",
    review: "Lorem ipsum veniam mollit in eiusmod proident.",
    rating: 5,
    image: "../../dynamic-images/user4.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials full-width">
      <h2>Testimonials</h2>
      <ul className="testimonial-list">
        {testimonialData.map((testimonial, index) => (
          <React.Fragment key={index}>
            <li className={`testimonial-card-inactive testimonial${index}`}>
              <div className="user-card">
                <img src={testimonial.image} alt="user avatar" />
                <h3>{testimonial.name}</h3>
              </div>
            </li>
            <li className={`review review${index}`}>
              <h4>{testimonial.rating}*</h4>
              {testimonial.review}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;