import React, { useEffect, useState } from "react";
import axios from "axios";
import "./anime.css";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Anime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    let url = "";
    if (searchTerm.trim() !== "") {
      url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
        searchTerm
      )}`;
    } else {
      url = `https://api.jikan.moe/v4/anime?page=${page}`;
    }
    axios
      .get(url)
      .then((response) => {
        setAnimeList(response.data.data);
        setHasNextPage(response.data.pagination?.has_next_page ?? false);
      })
      .catch((error) => {
        console.error("Error fetching the anime data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, searchTerm]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (hasNextPage) setPage(page + 1);
  };

  return (
    <div className="anime">
      <div>
        <input
          type="text"
          placeholder="Search Anime"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="animeSearch"
        />
      </div>
      <h1>Anime List</h1>
      {isLoading ? (
        <CircularProgress className="spinner" />
      ) : (
        <ul className="anime-list">
          {animeList.map((anime) => (
            <Link
              className="link_anime"
              to={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
            >
              <div className="card">
                <img src={anime.images.webp.image_url} alt={anime.title} loading="lazy" />
                <p className="anime-title">{anime.title}</p>
              </div>
            </Link>
          ))}
        </ul>
      )}
      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          {" "}
          <ArrowBackIosIcon />
        </button>
        <span> {page}</span>
        <button onClick={handleNext} disabled={!hasNextPage}>
          {" "}
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default Anime;
