import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header>
      <Link to="/" className="logAdd">
        <h1 data-text="KiraVerse">KiraVerse</h1>
      </Link>
      <nav className={navOpen ? 'active' : ''}>
        <Link to="/" className="link">Home</Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/anime" className="link">Anime</Link>
        <Link to="/manga" className="link">Manga</Link>
        <Link to="/top" className="link">Top</Link>
        <Link to="/reviews" className="link">Reviews</Link>

        {!currentUser && (
          <Link to="/signin" className="link">
            <AccountCircleIcon />
          </Link>
        )}

        {currentUser && (
          <Link to="/user" className="link user-header-link">
            {currentUser.displayName ? currentUser.displayName : currentUser.email.split('@')[0]}
          </Link>
        )}
      </nav>
      <MenuIcon
        className="menu-icon"
        onClick={() => setNavOpen(!navOpen)}
      />
    </header>
  );
};

export default Header;
