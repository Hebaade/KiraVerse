import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./animeDetails.css";
import AnimeCharacters from "./AnimeCharacters";
import { getAuth } from 'firebase/auth';
const AnimeDetails = () => {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        // Check if this anime is in favorites
        const favorites = JSON.parse(localStorage.getItem(`favorites_${user.uid}`)) || [];
        setIsFavorite(favorites.some(fav => fav.mal_id === parseInt(id)));
      }
    });
    return () => unsubscribe();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!user) {
      alert("Please sign in to add favorites!");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem(`favorites_${user.uid}`)) || [];
    
    if (isFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter(fav => fav.mal_id !== animeDetails.mal_id);
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      const newFavorite = {
        mal_id: animeDetails.mal_id,
        title: animeDetails.title,
        image_url: animeDetails.images?.jpg.image_url,
        score: animeDetails.score,
        type: animeDetails.type
      };
      const newFavorites = [...favorites, newFavorite];
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    // Fetch anime details using the id
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`)
      .then((response) => {
        console.log(response.data);
        setAnimeDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the anime details:", error);
      });
  }, [id]);
  return (
    <>
      <div className="anime-details-container">
        <div className="img-container">
          <img
            className="anime-details-image"
            src={animeDetails.images?.jpg.image_url}
            alt={animeDetails.title}
          />
        </div>
        <div className="allDetails">
          <h1 className="anime-details-title">{animeDetails.title_japanese}</h1>
          <h3>English Title:{animeDetails.title_english}</h3>
          <p className="anime-details-description">{animeDetails.synopsis}</p>
          <div className="anime-details-info">
            <span>Episodes: {animeDetails.episodes}</span>
            <span>Score: {animeDetails.score}</span>
            <span>Rank: {animeDetails.rank}</span>
            <span>Popularity: {animeDetails.popularity}</span>
            <span>Members: {animeDetails.members}</span>
            <span>Favorites: {animeDetails.favorites}</span>
            <span>Type: {animeDetails.type}</span>
            <span>Status: {animeDetails.status}</span>
            <span>Aired: {animeDetails.aired?.string}</span>
            <span>Duration: {animeDetails.duration}</span>
            <span>Rating: {animeDetails.rating}</span>
            <span>Year: {animeDetails.year}</span>
            <span>
              Genres:{" "}
              {animeDetails.genres?.map((genre) => genre.name).join(", ")}
            </span>
            <span>
              Studios:{" "}
              {animeDetails.studios?.map((studio) => studio.name).join(", ")}
            </span>
            <span>Source: {animeDetails.source}</span>
          </div>
          <div className="button-group">
            <Link to={`/anime/episodes/${animeDetails.mal_id}`}>
              <button className="watch-btn">Watch</button>
            </Link>
            {user && (
              <button
                className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="character-container">
        <AnimeCharacters />
      </div>
    </>
  );
};

export default AnimeDetails;
