import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
const TopCharacters = () => {
    const [topCharacters, setTopCharacters] = useState([]);
    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/top/characters')
            .then(response => {
                console.log("top characters:", response.data);
                setTopCharacters(response.data.data);
            }
            )
            .catch(error => {
                console.error('Error fetching the top characters data:', error);
            });
    }, []);
    return (
        <div className="top-chars-container">
            <h2 className="top-chars-title">Top Anime Characters</h2>
            <div className="top-chars-list">
                {topCharacters.map(character => (
                    <div className="top-char-card" key={character.mal_id}>
                        <img loading="lazy" className="top-char-image" src={character.images?.webp.image_url} alt={character.name} />
                        <div className="top-char-name">{character.name}</div>
                        <div className="top-char-info">Favorites: {character.favorites}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import "./topchars.css";
export default TopCharacters;
