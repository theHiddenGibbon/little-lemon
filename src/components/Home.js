import Specials from './Highlights.js';
import Testimonials from './Testimonials.js';
import AboutUs from './AboutUs.js';

const Home = () => {
  return(
    <>
      <Specials />
      <Testimonials />
      <AboutUs shortVersion={true} />
    </>
  );
};
export default Home;