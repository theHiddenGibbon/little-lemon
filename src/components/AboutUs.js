import './AboutUs.css'
import Brothers from '../images/mario-and-adrian.jpg';
import Chef from '../images/chef.jpg';

const AboutUs = () => {
  return(
    <section className="about-us">
      <h2>About Little Lemon</h2>
      <p>Based in Chicago, Illinois, Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
      <p>The chefs draw inspiration from Italian, Greek, and Turkish culture and have a menu of 12-15 items that they rotate seasonally. The restaurant has a rustic and relaxed atmosphere with moderate prices, making it a popular place for a meal any time of the day.</p>
      <a href="/">Read more about us ►</a>
      <div className="about-image-container">
        <img src={Chef} alt="A chef preparing food at Little Lemon" /> 
        <img src={Brothers} alt="The Little Lemon owners, Adrian and Mario" />
      </div>
    </section>
  );
};
export default AboutUs;