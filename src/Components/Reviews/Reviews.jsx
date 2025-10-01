import React from "react";
import MangaReviews from "./MangaReviews";
import AnimeReviews from "./AnimeReviews";
import "./reviews.css";
import { useState } from "react";

const Reviews = ({ user }) => {
  const [filter, setFilter] = useState("manga");

  return (
    <div className="reviews-container">
      <div className="reviews-filter-box">
        <label
          htmlFor="reviews-filter"
          className="reviews-filter-label"
        >
            Choose Review:
        </label>
        <select
          id="reviews-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="reviews-filter-select"
        >
          <option value="manga"> Manga Reviews</option>
          <option value="anime">Anime Reviews</option>
        </select>
      </div>
      {filter === "manga" && <MangaReviews user={user} />}
      {filter === "anime" && <AnimeReviews user={user} />}
    </div>
  );
};


export default Reviews;
