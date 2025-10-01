import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1> Welcome to KiraVerse </h1>
        <p>Your gateway to the magical world of Anime & Manga</p>
      </section>

      {/* About Grid */}
      <div className="about-grid">
        <section className="about-card">
          <h2> What is Anime?</h2>
          <p>
            Anime is Japanese animation known for its unique art, expressive
            characters, and unforgettable stories. From action-packed adventures
            to heartwarming romances, anime has something for everyone.
          </p>
        </section>

        <section className="about-card">
          <h2> What is Manga?</h2>
          <p>
            Manga are Japanese comics, usually in black & white, read
            right-to-left. They explore every genre imaginable, inspiring anime
            and reaching global fans.
          </p>
        </section>

        <section className="about-card">
          <h2> Popular Genres</h2>
          <ul>
            <li><strong>Shonen</strong> – Action & adventure for young audiences</li>
            <li><strong>Shojo</strong> – Romance & drama with emotional depth</li>
            <li><strong>Seinen</strong> – Mature stories for adults</li>
            <li><strong>Slice of Life</strong> – Relatable daily life tales</li>
          </ul>
        </section>

        <section className="about-card">
          <h2> Global Impact</h2>
          <p>
            Anime & manga have shaped pop culture worldwide, influencing movies,
            fashion, games, and inspiring creators across the globe.
          </p>
        </section>

        <section className="about-card">
          <h2> Our Mission</h2>
          <p>
            At <strong>KiraVerse</strong>, we aim to help fans explore, track,
            and enjoy anime & manga through a curated and beautiful experience.
          </p>
        </section>

        <section className="about-card">
          <h2> Did You Know?</h2>
          <p>
            The word <strong>"anime"</strong> comes from the English word
            "animation", and <strong>"manga"</strong> simply means "whimsical
            pictures" in Japanese!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
