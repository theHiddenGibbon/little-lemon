import './Header.css';
import { useState } from 'react';
import NavList from './NavList.js';
import Logo from '../images/logo.svg';
import Burger from '../images/hamburger-menu.svg';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return(
    <header className="content-grid">
      <nav className="head-nav">
        <div className="logo-container">
          <button className="burger" onClick={toggleMenu}>
            <img src={Burger} alt="Menu icon" className="burger-icon" />
          </button>
          <img src={Logo} alt="Little Lemon logo" className="logo" />
        </div>
        <NavList class={`nav-bar ${menuVisible ? 'visible' : ''}`} />
      </nav>
    </header>
  );
};
export default Header;
