import './Footer.css'
import NavList from './NavList.js';
import Logo from '../images/logo-white.png';
import LocationIcon from '../icons/location-dot-solid.svg';
import PhoneIcon from '../icons/location-dot-solid.svg';
import EmailIcon from '../icons/location-dot-solid.svg';

const Footer = () => {
  return(
    <footer className="content-grid">
      <section className="full-width bg-green">
        <div className="footer-grid">
          <img src={Logo} alt="Little Lemon logo" className="footer-logo" />
          <nav className="foot-nav">
            <h5 className="no-wrap">Site Navigation</h5>
            <NavList class="footer-nav"/>
          </nav>
          <address>
            <div>
              <h5 className="no-wrap">Contact Details</h5>
              <ul className="contact">
                <li className="contact-detail">
                  <img src={LocationIcon} alt="location icon" />
                  <p>
                    Little Lemon<br />
                    123, Lorem Ipsum St<br />
                    Chicago,  IL
                  </p>
                </li>
                <li>
                  <ul className="group-contact">
                    <li className="contact-detail">
                      <img src={PhoneIcon} alt="phone icon" />
                      <p>0123 456 789 012</p>
                    </li>
                    <li className="contact-detail">
                      <img src={EmailIcon} alt="email icon" />
                      <a href="mailto">
                        <span className="no-wrap">not-real-email</span>
                        <span className="wrap">@</span>
                        <span className="no-wrap">little-lemon.not</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="socials">
              <h5 className="no-wrap">Social Media</h5>
              <ul className="social-list">
                <li>F</li>
                <li>X</li>
                <li>B</li>
              </ul>
              <ul className="social-list">
                <li>I</li>
                <li>O</li>
                <li>A</li>
              </ul>
            </div>
          </address>
        </div>
      </section>
    </footer>
  );
};
export default Footer;