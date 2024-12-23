import Hero from './Hero.js';
import Specials from './Highlights.js';
import Testimonials from './Testimonials.js';
import AboutUs from './AboutUs.js';

const Main = () => {
  return(
    <main className="content-grid">
      <Hero />
      <Specials />
      <Testimonials />
      <AboutUs />
    </main>
  );
};
export default Main;