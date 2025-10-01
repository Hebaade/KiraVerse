import { Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import Anime from './Components/Anime/Anime'
import AnimeDetails from './Components/AnimeDetails/AnimeDetails'
import Episodes from './Components/AnimeDetails/Episodes'
import Manga from './Components/Manga/Manga'
import MangaDetails from './Components/Manga/MangaDetails'
import Top from './Components/Top/Top'
import Reviews from './Components/Reviews/Reviews'
import Home from './Components/Home/Home'
import Header from './Components/Home/Header'
import SignIn from './Components/Auth/SignIn'
import SignUp from './Components/Auth/SignUp'
import Footer from './Components/Home/Footer'
import About from './Components/About/About'
import React, { useState } from 'react';
import { getAuth, signOut, sendPasswordResetEmail } from 'firebase/auth';
import NotFound from './Components/Not-Found/NotFound'
import UserPage from './Components/Home/UserPage'

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [resetMsg, setResetMsg] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetMsg("Password reset email sent!");
      setTimeout(() => setResetMsg(""), 4000);
    } catch {
      setResetMsg("Error sending reset email.");
      setTimeout(() => setResetMsg(""), 4000);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={theme === 'dark' ? 'theme-dark' : 'theme-light'}>
      <Header user={user} onLogout={handleLogout} />
      <div style={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 9999,
        display: 'flex',
        gap: '10px'
      }}>
        <button
          className="theme-button"
          style={{
            background: theme === 'dark' ? '#1f1f2e' : '#f1effa',
            color: theme === 'dark' ? '#fff' : '#1f1f2e',
            boxShadow: '0 2px 12px rgba(139,123,191,0.15)'
          }}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? '🌙' : '🌞'}
        </button>
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="scroll-button"
            style={{
              background: theme === 'dark' ? '#1f1f2e' : '#f1effa',
              color: theme === 'dark' ? '#fff' : '#1f1f2e',
              boxShadow: '0 2px 12px rgba(139,123,191,0.15)',
              fontSize: '20px'
            }}
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}
      </div>
  {resetMsg && <div className="snackbar">{resetMsg}</div>}
  <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/anime" element={<Anime/>} />
        <Route path="/anime/:id" element={<AnimeDetails/>} />
        <Route path="/anime/episodes/:id" element={<Episodes/>} />
        <Route path="/manga" element={<Manga/>} />
        <Route path='/manga/:id' element={<MangaDetails/>} />
        <Route path="/top" element={<Top/>}/>
        <Route path="/reviews" element={<Reviews user={user}/>} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound/>} />
          {user && <Route path="/user" element={<UserPage user={user} onLogout={handleLogout} onResetPassword={handleResetPassword} />} />}
      </Routes>
      <Footer theme={theme}/>
    </div>
  )
}

export default App
