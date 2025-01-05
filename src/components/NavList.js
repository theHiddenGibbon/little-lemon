import './NavList.css';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import scrollToSection from '../utils/scrollToSection';
import scrollToTop from '../utils/scrollToTop';

const NavList = ({ classname, isLoggedIn, onLinkClick }) => {

  const location = useLocation();

  const sectionMap = {
    '/': 'home',
    '/about': 'about-full',
    '/menu': 'menu',
    '/bookings': 'bookings',
    '/order': 'order',
    '/login': 'login',
    '/account': 'account'
  };

  useEffect(() => {
    const sectionId = sectionMap[location.pathname];
    if (sectionId === "home") {
      scrollToTop();
    } else {
      if (sectionId) {
        scrollToSection(sectionId);
      }
    }
  }, [location]);

  const handleLinkClick = () => {
    if (onLinkClick && classname.includes('nav-bar')) {
      onLinkClick();
    }
  };

  return (
    <menu className={classname}>
      <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
      <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
      <li><Link to="/menu" onClick={handleLinkClick}>Menu</Link></li>
      <li><Link to="/bookings" onClick={handleLinkClick}>Reservations</Link></li>
      <li><Link to="/order" onClick={handleLinkClick}>Order Online</Link></li>
      <li>
        <Link 
          to={isLoggedIn ? "/account" : "/login"} 
          onClick={handleLinkClick}
        >
          {isLoggedIn ? "Account" : "Login"}
        </Link>
      </li>
    </menu>
  );
};

export default NavList;