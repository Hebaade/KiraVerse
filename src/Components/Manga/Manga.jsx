import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./manga.css";
const Manga = () => {
  const [mangaList, setMangaList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    let url = "";
    if (searchTerm.trim() !== "") {
      url = `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(
        searchTerm
      )}`;
    } else {
      url = `https://api.jikan.moe/v4/manga?page=${page}`;
    }
    axios
      .get(url)
      .then((response) => {
        setMangaList(response.data.data);
        setHasNextPage(response.data.pagination?.has_next_page ?? false);
      })
      .catch((error) => {
        console.error("Error fetching the manga data:", error);
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
    <div className="manga">
      <div className="manga-search-box">
        <input
        className="manga-search-input"
          type="text"
          placeholder="Search Manga"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h1>Manga List</h1>
      {isLoading ? (
        <CircularProgress className="spinner" />
      ) : (
        <ul className="manga-list ">
          {mangaList.map((manga) => (
              <Link to={`/manga/${manga.mal_id}`} className="manga-link ">
               <div className="card">
                <img className="manga-img" loading="lazy" src={manga.images?.webp.image_url} alt={manga.title} />
                <h2 className="manga-title">{manga.title}</h2>
              </div>
              </Link>
          ))}
        </ul>
      )}
      <div className="pagination">
        <button
          className="manga-pagination-btn"
          onClick={handlePrev}
          disabled={page === 1}
        >
          <ArrowBackIosIcon />
        </button>
        <span >{page}</span>
        <button
          onClick={handleNext}
          disabled={!hasNextPage}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default Manga;
