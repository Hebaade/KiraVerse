import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./topanimes.css";
const TopAnimes = () => {
  const [topAnimes, setTopAnimes] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/anime")
      .then((response) => {
        console.log("top animes:", response.data);
        setTopAnimes(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the top animes data:", error);
      });
  }, []);
  return (
    <div className="top-animes-container">
      <h2 className="top-animes-title">Top Animes</h2>
      <div className="top-animes-list">
        {topAnimes.map((anime) => (
          <div className="top-anime-card" key={anime.mal_id}>
            <img className="top-anime-image" src={anime.images?.webp.image_url} alt={anime.title} loading="lazy" />
            <div className="top-anime-title">{anime.title}</div>
            <div className="top-anime-score">Score: {anime.score}</div>
            <div className="top-anime-info">Rank: {anime.rank}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default TopAnimes;
