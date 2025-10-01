import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './topmanga.css'

const TopManga = () => {
  const [mangaList, setMangaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://api.jikan.moe/v4/top/manga")
      .then((response) => {
        setMangaList(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the top manga data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="top-manga-container">
      <h2 className="top-manga-title">Top Manga</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="top-manga-list">
          {mangaList.map((manga) => (
            <li className="top-manga-card" key={manga.mal_id}>
              <Link
                to={`/manga/${manga.mal_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="top-manga-image"
                  src={manga.images?.webp.image_url}
                  alt={manga.title}
                  loading="lazy"
                />
                <div>
                <h2 className="top-manga-title-card">{manga.title}</h2>
                <p className="top-manga-info">Type: {manga.type}</p>
                <p className="top-manga-score">Score: {manga.score}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default TopManga;
