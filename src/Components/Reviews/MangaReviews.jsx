import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import './reviewCard.css';
import './ReviewStyles.css';
const MangaReviews = ({ user }) => {
  const [mangaReviews, setMangaReviews] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/reviews/manga")
      .then((response) => {
        console.log("manga reviews:", response.data);
        setMangaReviews(response.data.data); 
      })
      .catch((error) => {
        console.error("Error fetching the manga reviews data:", error);
      });
  }, []);

  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('mangaLikes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const [likedIds, setLikedIds] = useState(() => {
    const savedLikedIds = localStorage.getItem('mangaLikedIds');
    return savedLikedIds ? JSON.parse(savedLikedIds) : [];
  });

  // Save to localStorage whenever likes or likedIds change
  useEffect(() => {
    localStorage.setItem('mangaLikes', JSON.stringify(likes));
    localStorage.setItem('mangaLikedIds', JSON.stringify(likedIds));
  }, [likes, likedIds]);

  const handleLike = (id) => {
    if (!user) return;
    if (likedIds.includes(id)) {
      // Remove like
      setLikes((prev) => ({
        ...prev,
        [id]: Math.max((prev[id] || 1) - 1, 0),
      }));
      setLikedIds((prev) => prev.filter((likedId) => likedId !== id));
    } else {
      // Add like
      setLikes((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));
      setLikedIds((prev) => [...prev, id]);
    }
  };

  return (
    <div>
      {mangaReviews.map((review) => (
        <div className="review-card" key={review.mal_id}>
          <h2 className="review-title">{review.entry.title}</h2>
          <p className="review-text">{review.review}</p>
          <p className="review-spoiler">
            Spoiler :
            <span style={{ color: review.is_spoiler ? "#ff6e7f" : "#bfe9ff", fontWeight: "bold", marginLeft: "8px" }}>
              {review.is_spoiler ? "Yes" : "No"}
            </span>
          </p>
          <p className="review-score">Score : {review.score}</p>
          <div className="review-tags">
            Tags:
            {review.tags && review.tags.length > 0 ? (
              review.tags.map((tag, idx) => (
                <span className="review-tag" key={idx}>{tag}</span>
              ))
            ) : (
              <span className="review-tag">No tags</span>
            )}
          </div>
          <p className="review-user">by {review.user.username}</p>
          {user && (
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
          )}
        </div>
      ))}
    </div>
  );
};

export default MangaReviews;
