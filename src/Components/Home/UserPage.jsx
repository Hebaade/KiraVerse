import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userpage.css';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
const UserPage = ({ onLogout, onResetPassword }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Load favorites from localStorage
        const userFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser.uid}`)) || [];
        setFavorites(userFavorites);
      } else {
        navigate('/signin');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const removeFavorite = (animeId) => {
    const newFavorites = favorites.filter(fav => fav.mal_id !== animeId);
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  if (!user) return null;

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const handleUpdateName = async () => {
    if (!newName.trim()) return;
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: newName.trim()
      });
      setUser({ ...user, displayName: newName.trim() });
      setIsEditingName(false);
      setNewName('');
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  return (
    <div className="user-page-container">
      <h2>User Profile</h2>
      <div className="user-info">
        <div className="name-section">
          {isEditingName ? (
            <div className="name-edit">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={user.displayName || "Enter your name"}
                className="name-input"
              />
              <div className="name-edit-buttons">
                <button onClick={handleUpdateName} className="save-name-btn">Save</button>
                <button onClick={() => {
                  setIsEditingName(false);
                  setNewName('');
                }} className="cancel-name-btn">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="name-display">
              <p><strong>Name:</strong> {user.displayName || "No name set"}</p>
              <button onClick={() => {
                setIsEditingName(true);
                setNewName(user.displayName || '');
              }} className="edit-name-btn">Edit Name</button>
            </div>
          )}
        </div>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="favorite-animes">
        <h3>My Favorite Animes</h3>
        {favorites.length === 0 ? (
          <p className="no-favorites">No favorite animes yet!</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((anime) => (
              <div key={anime.mal_id} className="favorite-anime-card">
                <div className="favorite-anime-image">
                  <img src={anime.image_url} alt={anime.title} />
                </div>
                <div className="favorite-anime-content">
                  <Link to={`/anime/${anime.mal_id}`}>
                    <h4>{anime.title}</h4>
                    <div className="anime-details">
                      <span className="anime-type">{anime.type}</span>
                      <span className="anime-score">★ {anime.score}</span>
                    </div>
                  </Link>
                  <button 
                    onClick={() => removeFavorite(anime.mal_id)}
                    className="remove-favorite-btn"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="user-actions">
        <button onClick={onResetPassword} className="user-reset-btn">
          Reset Password
        </button>
        <button onClick={handleLogoutClick} className="user-logout-btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserPage;
