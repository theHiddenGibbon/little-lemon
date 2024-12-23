import './NavList.css';

const NavList = (props) => {
  return(
    <menu className={props.class}>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/">About</a>
      </li>
      <li>
        <a href="/">Menu</a>
      </li>
      <li>
        <a href="/">Reservations</a>
      </li>
      <li>
        <a href="/">Order Online</a>
      </li>
      <li>
        <a href="/">Login</a>
      </li>
    </menu>
  );
};
export default NavList;