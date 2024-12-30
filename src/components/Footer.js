import './Footer.css'
import NavList from './NavList.js';
import Logo from '../images/logo-white.png';
import LocationIcon from '../icons/location-dot-solid.svg';
import PhoneIcon from '../icons/phone-solid.svg';
import EmailIcon from '../icons/envelope-solid.svg';
import FacebookIcon from '../icons/square-facebook-brands-solid.svg';
import TwitterIcon from '../icons/square-x-twitter-brands-solid.svg';
import InstagramIcon from '../icons/square-instagram-brands-solid.svg';
import PinterestIcon from '../icons/square-pinterest-brands-solid.svg';
import BlueSkyIcon from '../icons/square-bluesky-brands-solid.svg';
import WhatsAppIcon from '../icons/square-whatsapp-brands-solid.svg';

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
                      <a href="/" className="email-link">
                        <span className="no-wrap">not-real-email</span>
                        <span className="wrap">@</span>
                        <span className="no-wrap">little-lemon.not</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="no-wrap">Social Media</h5>
              <div className="socials">
                <ul className="social-list">
                  <li>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                      <img src={InstagramIcon} alt="Instagram icon" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
                      <img src={PinterestIcon} alt="Pinterest icon" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                      <img src={FacebookIcon} alt="Facebook icon" />
                    </a>
                  </li>
                </ul>
                <ul className="social-list">
                  <li>
                    <a href="https://bsky.app/" target="_blank" rel="noreferrer">
                      <img src={BlueSkyIcon} alt="BlueSky icon" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                      <img src={TwitterIcon} alt="Twitter icon" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.whatsapp.com" target="_blank" rel="noreferrer">
                      <img src={WhatsAppIcon} alt="WhatsApp icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </address>
        </div>
      </section>
    </footer>
  );
};
export default Footer;