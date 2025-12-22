import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="copyright">&copy; {new Date().getFullYear()} YourNews. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/info#privacy">Privacy Policy</Link>
          <Link to="/info#terms">Terms of Service</Link>
          <Link to="/info#about">About Us</Link>
          <Link to="/info#contact">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;