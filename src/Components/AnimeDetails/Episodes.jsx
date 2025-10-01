import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import "./episodes.css";
const Episodes = () => {
  const { id } = useParams();
  const [episodesList, setEpisodesList] = useState([]);
  useEffect(() => {
    console.log("ddddd");
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}/episodes`)
      .then((response) => {
        console.log("ddddd");
        console.log("ep:", response.data);
        setEpisodesList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the episodes data:", error);
      });
  }, [id]);
  return (
    <div className="episodes-container">
      <h1 className="episodes-title">All Episodes</h1>
      {episodesList.length === 0 ? (
        <p className="episodes-title">No Episodes</p>
      ) : (
        <ul className="episodes-list">
          {episodesList.map((episode) => (
            <li className="episode-item" key={episode.mal_id}>
              <div className="episode-info">
                <span className="episode-number">Episode: {episode.mal_id}</span>
                <span className="episode-title">{episode.title || "No Title"}</span>
              </div>
              <a
                className="episode-link"
                href={episode.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch <Visibility/>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Episodes;
