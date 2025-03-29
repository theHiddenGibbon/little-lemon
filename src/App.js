import './App.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';

function App() {
  const [user, setUser] = useState(null);
  const mainRef = useRef();
  const headerRef = useRef();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogin = (currentUser) => {
    setUser(currentUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };

  const showHeader = useCallback((show) => {
    if (!headerRef.current) return;

    const header = headerRef.current;
    const headerHeight = header.offsetHeight;
    const isSticky = window.scrollY > headerHeight;

    if (show) {
      header.style.position = "sticky";
      header.style.transform = "translateY(0)";
      header.style.opacity = "1";
    } else {
      if (isSticky) {
        header.style.transform = "translateY(-100%)";
        header.style.opacity = "0";

        setTimeout(() => {
          header.style.position = "static";
          header.style.transform = "translateY(0)";
          header.style.opacity = "1";
        }, 400);
      } else {
        header.style.position = "static";
        header.style.opacity = "0";
        header.style.transform = "translateY(0)";
      }
    }
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <>
      <Header 
        isLoggedIn={!!user} 
        mainRef={mainRef} 
        headerRef={headerRef} 
        showHeader={showHeader} 
        headerHeight={headerHeight} 
        hideMenu={hideMenu} 
        menuVisible={menuVisible} 
        setMenuVisible={setMenuVisible} 
      />
      <Main 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        mainRef={mainRef} 
        headerHeight={headerHeight} 
      />
      <Footer 
        isLoggedIn={!!user} 
        mainRef={mainRef} 
        headerRef={headerRef} 
        showHeader={showHeader} 
        headerHeight={headerHeight} 
        hideMenu={hideMenu} 
      />
    </>
  );
}

export default App;