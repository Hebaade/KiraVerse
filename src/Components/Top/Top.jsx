import React from 'react';
import TopAnimes from './TopAnimes';
import TopCharacters from './TopCharacters';
import TopManga from './TopManga';
import './top.css'

import { useState } from 'react';

const Top = () => {
    const [filter, setFilter] = useState('anime');

    return (
        <div className='top-container'>
            <div className='top-filter-box' >
                <label htmlFor="top-filter" className='top-filter-label'> Choose :</label>
                <select
                    id="top-filter"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className='top-filter-select'
                >
                    <option value="anime"> Top Anime</option>
                    <option value="manga">Top Manga </option>
                    <option value="characters"> Top Character</option>
                </select>
            </div>
            {filter === 'anime' && <TopAnimes/>}
            {filter === 'manga' && <TopManga/>}
            {filter === 'characters' && <TopCharacters/>}
        </div>
    );
}

export default Top;
