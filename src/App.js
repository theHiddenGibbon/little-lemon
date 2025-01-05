import './App.css';
import React, { useState } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (currentUser) => {
    setUser(currentUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Header isLoggedIn={!!user} />
      <Main 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout}
      />
      <Footer isLoggedIn={!!user} />
    </>
  );
}

export default App;
