import './Highlights.css';
import Carousel from './Carousel.js';

const Highlights = () => {
  return(
    <section className="highlights breakout">
      <h2>Highlights</h2>
      <div className="breakout carousel-container">
        <div className="overlay scroll-left">
          <button className="left">◀</button>
        </div>
        <Carousel />
        <div className="overlay scroll-right">
          <button className="right">▶</button>
        </div>
      </div>
      <button className="action-button">Online Menu</button>
    </section>
  );
};
export default Highlights;