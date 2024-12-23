import './Header.css';
import NavList from './NavList.js';
import Logo from '../images/logo.svg';
import Burger from '../images/hamburger-menu.svg';

const Header = () => {
  return(
    <header className="content-grid">
      <nav className="head-nav">
        <div className="logo-container">
          <img src={Burger} alt="Menu icon" className="burger" />
          <img src={Logo} alt="Little Lemon logo" className="logo" />
        </div>
        <NavList class="nav-bar" />
      </nav>
    </header>
  );
};
export default Header;
