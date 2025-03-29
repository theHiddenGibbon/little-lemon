import './NavList.css';
import { useNavigate } from 'react-router-dom';

const NavList = ({ classname, isLoggedIn, hideMenu, mainRef, showHeader }) => {
  const navigate = useNavigate();

  const handleLinkClick = (e, targetPath) => {
    e.preventDefault();
    hideMenu();

    const children = Array.from(mainRef.current.children);
    children.forEach(child => {
      if (!child.classList.contains('hero')) {
        child.classList.remove('fade-in');
        child.classList.add('fade-out');
      }
    });

    window.scrollTo({
      top: mainRef.current.offsetTop - 1,
      behavior: "smooth",
    });

    setTimeout(() => {
      navigate(targetPath);
      mainRef.current.scrollIntoView({ behavior: "instant", block: "start" });
      children.forEach(child => {
        if (!child.classList.contains('hero')) {
          child.classList.remove('fade-out');
          child.classList.add('fade-in');
        }
      });
    }, 400);
    setTimeout(() => {
      mainRef.current.focus();
      showHeader(false);
    }, 500);
  };

  return (
    <menu className={classname}>
      <li><a href="/" onClick={(e) => handleLinkClick(e, "/")}>Home</a></li>
      <li><a href="/about" onClick={(e) => handleLinkClick(e, "/about")}>About</a></li>
      <li><a href="/menu" onClick={(e) => handleLinkClick(e, "/menu")}>Menu</a></li>
      <li><a href="/bookings" onClick={(e) => handleLinkClick(e, "/bookings")}>Reservations</a></li>
      <li><a href="/order" onClick={(e) => handleLinkClick(e, "/order")}>Order Online</a></li>
      <li>
        <a
          href={isLoggedIn ? "/account" : "/login"}
          onClick={(e) => handleLinkClick(e, isLoggedIn ? "/account" : "/login")}
        >
          {isLoggedIn ? "Account" : "Login"}
        </a>
      </li>
    </menu>
  );
};

export default NavList;