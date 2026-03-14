import React from 'react';
import { Link } from 'react-router-dom';  // Add this import
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>KalaKart</h3>
          <p>Connecting you with India's finest artisans</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            {/* Change these from <a> to <Link> */}
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            {/* External links can stay as <a> */}
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 KalaKart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;