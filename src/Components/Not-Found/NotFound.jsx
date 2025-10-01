import React from "react";
import "./notfound.css";

const NotFound = () => (
  <div className="notfound-container">
    <h1>404</h1>
    <p>Sorry, the page you’re looking for doesn’t exist.</p>
    <a href="/" className="notfound-link">Go Home</a>
  </div>
);

export default NotFound;