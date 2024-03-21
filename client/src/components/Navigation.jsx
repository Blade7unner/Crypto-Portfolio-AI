import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import CryptoData from './CryptoData'; 

function Navigation() {
  const location = useLocation();

  useEffect(() => {
    animatePageTransition();
  }, [location]);

  function animatePageTransition() {
    gsap.set('.page-container', { opacity: 0 });
    
    // Fade out animation
    gsap.to('.page-container', { opacity: 0, duration: 0.5, onComplete: loadNewPage });
  }

  function loadNewPage() {
    gsap.to('.page-container', { opacity: 1, duration: 0.5 });
  }

  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/AI">AI</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><CryptoData /></li> 
        {/* If you want to add additional navigation items, do it here */}
      </ul>
    </nav>
  );
}

export default Navigation;
