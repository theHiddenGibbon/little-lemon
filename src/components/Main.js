import { Route, Routes } from 'react-router-dom';
import Hero from './Hero.js';
import Home from './Home.js';
import About from './AboutUs.js';
import Menu from './Menu.js';
import Reserve from './Reserve.js';
import Order from './Order.js';
import Login from './Login.js';
import ScrollToTop from './ScrollToTop.js';

const Main = () => {
  return(
    <main className="content-grid">
      <Hero />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About shortVersion={false} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reserve />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
};
export default Main;