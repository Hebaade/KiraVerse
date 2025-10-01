import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./animechar.css";
const AnimeCharacters = () => {
  const { id } = useParams();
  const [charactersList, setCharactersList] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}/characters`)
      .then((response) => {
        console.log("characters:", response.data);
        setCharactersList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching the characters data:", error);
      });
  }, [id]);
  return (
    <div className="characters-container">
      <h1 className="characters-title">Anime Characters</h1>
      {charactersList.length === 0 ? (
        <p className="characters-title">No Characters</p>
      ) : (
        <div className="characters-list">
          {charactersList.map((character) => (
            <div className="character-card" key={character.character.mal_id}>
              <img
                className="character-img"
                src={
                  character.character.images?.webp?.image_url ||
                  "https://via.placeholder.com/120x120?text=No+Image"
                }
                alt={character.character.name}
                loading="lazy"
              />
              <div className="character-name">{character.character.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeCharacters;
