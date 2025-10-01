import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MangaCharacters from "./MangaCharacters";
const MangaDetails = () => {
  const { id } = useParams();
  const [mangaDetails, setMangaDetails] = useState({});
  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/manga/${id}`)
      .then((response) => {
        console.log("manga details:", response.data);
        setMangaDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the manga details:", error);
      });
  }, [id]);
  return (
    <>
    <div className="anime-details-container">
     <div className="img-container">
      <img     className="anime-details-image" src={mangaDetails.images?.jpg.image_url} alt={mangaDetails.title} />
       </div>
      <div className="allDetails">
        <h1 className="anime-details-title">{mangaDetails.title_japanese}</h1>
      <h3>{mangaDetails.title}</h3>
      <p className="anime-details-description">{mangaDetails.synopsis}</p>
          <div className="anime-details-info">
        <span>Chapters: {mangaDetails.chapters}</span>
        <span>Volumes: {mangaDetails.volumes}</span>
        <span>Score: {mangaDetails.score}</span>
        <span>Rank: {mangaDetails.rank}</span>
        <span>Popularity: {mangaDetails.popularity}</span>
        <span>Members: {mangaDetails.members}</span>
        <span>Favorites: {mangaDetails.favorites}</span>
        <span>Type: {mangaDetails.type}</span>
        <span>Status: {mangaDetails.status}</span>
        <span>Published: {mangaDetails.published?.string}</span>
        <span>
          Genres: {mangaDetails.genres?.map((genre) => genre.name).join(", ")}
        </span>
        <span>
          Authors:{" "}
          {mangaDetails.authors?.map((author) => author.name).join(", ")}
        </span>
        <span>
          Serialization:{" "}
          {mangaDetails.serializations
            ?.map((serialization) => serialization.name)
            .join(", ")}
        </span>
        <span>Source: {mangaDetails.source}</span>
   </div>
      </div>
    </div>
      <MangaCharacters />
    </>
  );
};

export default MangaDetails;
