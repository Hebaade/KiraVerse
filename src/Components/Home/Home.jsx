import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";
const Home = () => {
  const [topfiveanime, setTopFiveAnime] = useState([]);
  const [topFiveManga, setTopFiveManga] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/anime?limit=4")
      .then((response) => {
        console.log("top five anime:", response.data);
        setTopFiveAnime(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the top five anime data:", error);
      });
    axios
      .get("https://api.jikan.moe/v4/top/manga?limit=4")
      .then((response) => {
        console.log("top five manga:", response.data);
        setTopFiveManga(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the top five manga data:", error);
      });
  }, []);
  return (
    <div>
    <div className="welcome">
  <div className="welcome-overlay"></div>
  <div className="welcome-content">
    <h1>Welcome to Anime World</h1>
    <p>Your ultimate destination for all things anime and manga!</p>
  </div>
</div>

      <div className="top5anime">
        <h2>Top 5 Anime</h2>
        <div className="anime-list">
        {topfiveanime.map((anime) => (
            <Link
            key={anime.mal_id}
              to={`/anime/${anime.mal_id}`}
              className="link_anime"
            >
              <div className="card">
              <img
                src={anime.images.webp.image_url}
                alt={anime.title}
               className="image"
               loading="lazy"
              />
              <h2 className="anime-title">{anime.title}</h2>
              </div>
             
            </Link>
            
        ))}
         </div>
      </div>
      <div className="top5manga">
        <h2>Top 5 Manga</h2>
        <div className="anime-list">
{topFiveManga.map((manga) => (
            <Link
              to={`/manga/${manga.mal_id}`}
               key={manga.mal_id}
                className="link_anime"
            >
              <div className="card">
              <img
                src={manga.images.webp.image_url}
                alt={manga.title}
                className="image"
                loading="lazy"
              />
              <h2 className="anime-title">{manga.title}</h2>
              </div>
            </Link>
          
        ))}
        </div>
        
      </div>
    </div>
  );
};

export default Home;
