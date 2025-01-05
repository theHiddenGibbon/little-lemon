import './Hero.css';
import { useNavigate } from 'react-router-dom';
import Food from  '../images/restaurant-food.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/bookings');
  };

  return (
    <section className="full-width hero bg-green">
      <div className="hero-container">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <button onClick={handleButtonClick} className="action-button">Reserve a Table</button>
        <img src={Food} alt="A tasty dish being served at Little Lemon" />
      </div>
    </section>
  );
};
export default Hero;