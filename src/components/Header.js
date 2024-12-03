import Nav from "./Nav";
import Logo from '../images/logo.svg';

const Header = () => {
  return(
    <header>
      <img src={Logo} alt="Little Lemon Logo" />
      <Nav />
    </header>
  );
};
export default Header;
