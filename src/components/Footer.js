import Nav from "./Nav";
import Logo from '../images/logo white.png';

const Footer = () => {
  return(
    <footer>
      <img src={Logo} alt="Little Lemon logo" />
      <h4>Site Navigation</h4>
      <Nav />
      <h4>Contact Details</h4>
      <h4>Social Media</h4>
      <ul>
        <li>F</li>
        <li>X</li>
        <li>B</li>
        <li>I</li>
        <li>O</li>
        <li>A</li>
      </ul>
    </footer>
  );
};
export default Footer;