import './NavList.css';
import { Link } from 'react-router-dom';

const NavList = (props) => {
  return(
    <menu className={props.class}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/reservations">Reservations</Link>
      </li>
      <li>
        <Link to="/order">Order Online</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </menu>
  );
};
export default NavList;