import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import "./reviewCard.css";
import "./ReviewStyles.css";
const AnimeReviews = ({ user }) => {
  const [animeReviews, setAnimeReviews] = useState([]);
  // Like state
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('animeLikes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const [likedIds, setLikedIds] = useState(() => {
    const savedLikedIds = localStorage.getItem('animeLikedIds');
    return savedLikedIds ? JSON.parse(savedLikedIds) : [];
  });

  // Save to localStorage whenever likes or likedIds change
  useEffect(() => {
    localStorage.setItem('animeLikes', JSON.stringify(likes));
    localStorage.setItem('animeLikedIds', JSON.stringify(likedIds));
  }, [likes, likedIds]);

  const handleLike = (id) => {
    if (!user) return;
    if (likedIds.includes(id)) {
      setLikes((prev) => ({
        ...prev,
        [id]: Math.max((prev[id] || 1) - 1, 0),
      }));
      setLikedIds((prev) => prev.filter((likedId) => likedId !== id));
    } else {
      setLikes((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));
      setLikedIds((prev) => [...prev, id]);
    }
  };
  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/reviews/anime")
      .then((response) => {
        console.log("anime reviews:", response.data);
        setAnimeReviews(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the anime reviews data:", error);
      });
  }, []);
  return (
    <div>
      {animeReviews.map((review) => (
        <div key={review.mal_id} className="review-card">
          <h2 className="review-title">{review.entry.title}</h2>
          <p className="review-text">{review.review}</p>
            <p className="review-spoiler">
            Spoiler :
            <span style={{ color: review.is_spoiler ? "#ff6e7f" : "#bfe9ff", fontWeight: "bold", marginLeft: "8px" }}>
              {review.is_spoiler ? "Yes" : "No"}
            </span>
          </p>
          <p className="review-score">Score : {review.score}</p>
          <div>
            Tags:
            {review.tags && review.tags.length > 0 ? (
              review.tags.map((tag, idx) => <span key={idx} className="review-tag">{tag}</span>)
            ) : (
              <span className="review-tag">No tags</span>
            )}
          </div>
          <p className="review-user">by {review.user.username}</p>
          <button 
            className={`review-like-button ${likedIds.includes(review.mal_id) ? 'liked' : ''}`}
            onClick={() => handleLike(review.mal_id)}
          >
            {likedIds.includes(review.mal_id) ? (
              <ThumbUpAlt style={{ color: "#c77dff" }} />
            ) : (
              <ThumbUpAltOutlined />
            )}
            <span>{likes[review.mal_id] || 0}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AnimeReviews;
