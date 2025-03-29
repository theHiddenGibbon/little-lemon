import './Header.css';
import { useEffect, useRef } from 'react';
import NavList from './NavList.js';
import Logo from '../images/logo.svg';
import Burger from '../images/hamburger-menu.svg';

const Header = ({ isLoggedIn, mainRef, headerRef, showHeader, hideMenu, menuVisible, setMenuVisible  }) => {

  const lastScrollY = useRef(0);
  const isMenuToggling = useRef(false);

  const toggleMenu = () => {
    isMenuToggling.current = true;
    setMenuVisible(!menuVisible);

    setTimeout(() => {
      isMenuToggling.current = false;
    }, 200);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuToggling.current) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > headerRef.current.offsetHeight) {
        if (currentScrollY > lastScrollY.current) {
          showHeader(false);
        } else {
          showHeader(true);
        }
      } else {
        showHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showHeader]);

  return (
    <header
      ref={headerRef}
      className="content-grid header"
    >
      <nav className="head-nav">
        <div className="logo-container">
          <button
            className="burger" 
            onClick={toggleMenu} 
            aria-expanded={menuVisible} 
            aria-controls="main-menu" 
            aria-label={menuVisible ? "Close navigation menu" : "Open navigation menu"} 
            title={menuVisible ? "Close navigation menu" : "Open navigation menu"} 
          >
            <img src={Burger} alt="Menu icon" className="burger-icon" />
          </button>
          <a href="/" onClick={handleLogoClick} className="logo-link">
            <img src={Logo} alt="Little Lemon logo" className="logo" />
          </a>
        </div>
        <NavList
          classname={`nav-bar ${menuVisible ? 'visible' : ''}`} 
          isLoggedIn={isLoggedIn} 
          mainRef={mainRef} 
          headerRef={headerRef} 
          showHeader={showHeader} 
          hideMenu={hideMenu} 
        />
      </nav>
    </header>
  );
};

export default Header;