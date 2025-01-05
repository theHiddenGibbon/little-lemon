import './Header.css';
import { useState } from 'react';
import NavList from './NavList.js';
import Logo from '../images/logo.svg';
import Burger from '../images/hamburger-menu.svg';

const Header = ({ isLoggedIn }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const hideMenu = () => {
    if(menuVisible) setMenuVisible(false);
  };

  return(
    <header className="content-grid">
      <nav className="head-nav">
        <div className="logo-container">
          <button 
            className="burger" 
            onClick={toggleMenu} 
            aria-expanded={menuVisible} 
            aria-controls="main-menu"
          >
            <img src={Burger} alt="Menu icon" className="burger-icon" />
          </button>
          <img src={Logo} alt="Little Lemon logo" className="logo" />
        </div>
        <NavList 
          classname={`nav-bar ${menuVisible ? 'visible' : ''}`} 
          isLoggedIn={isLoggedIn} 
          onLinkClick={hideMenu} 
        />
      </nav>
    </header>
  );
};
export default Header;
