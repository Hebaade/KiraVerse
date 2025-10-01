import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = ({ theme = 'dark' }) => {
    return (
        <footer className={`footer ${theme === 'light' ? 'footer-light' : 'footer-dark'}`}>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>KiraVerse</h3>
                    <p>Dive into the anime & manga multiverse</p>
                </div>
                <div className="footer-section ">
                    <h4>Quick Links</h4>
                    <div className="footer-links">
                        <Link to="/anime">Anime</Link>
                        <Link to="/manga">Manga</Link>
                        <Link to="/reviews">Reviews</Link>
                        <Link to="/about">About</Link>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Connect With Us</h4>
                    <div className="social-links">
                        <a href="mailto:hebaadelali78@gmail.com" className="social-icon">
                            <EmailIcon />
                        </a>
                        <a href="https://github.com/Hebaade" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <GitHubIcon />
                        </a>
                        <a href="https://www.linkedin.com/in/heba-adel-24a583221/" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <LinkedInIcon  />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 hebaadelali78@gmail.com. All rights reserved.</p>
            </div>
        </footer>
    );
};




export default Footer;
