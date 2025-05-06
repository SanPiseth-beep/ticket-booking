import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Logo and Brand */}
        <div>
          <Link to="/" className="nav-brand">
            <div className="nav-logo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <span className="nav-title">TicketBooking</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Events
          </Link>
          
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="theme-toggle"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          <Link 
            to="/cart" 
            className="cart-icon"
            aria-label="Shopping cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="cart-badge">
                {cart.length}
              </span>
            )}
          </Link>
          
          {currentUser ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link
                  to="/profile"
                  className="nav-link"
                >
                  My Tickets
                </Link>
                <button
                  onClick={logout}
                  className="btn"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link
                to="/login"
                className="nav-link"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-controls">
          <Link 
            to="/cart" 
            className="cart-icon mobile-cart"
            style={{ marginRight: '1rem' }}
            aria-label="Shopping cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="cart-badge">
                {cart.length}
              </span>
            )}
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="nav-menu-button"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`nav-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div>
          <Link
            to="/"
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Events
          </Link>
          
          {currentUser ? (
            <>
              <Link
                to="/profile"
                className={`mobile-nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
              >
                My Tickets
              </Link>
              <button
                onClick={logout}
                className="mobile-nav-link"
                style={{ color: 'var(--error)', width: '100%', textAlign: 'left' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`mobile-nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`mobile-nav-link ${location.pathname === '/signup' ? 'active' : ''}`}
              >
                Sign Up
              </Link>
            </>
          )}
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mobile-nav-link"
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <span>Dark Mode</span>
            <div className={`mobile-toggle-wrapper ${darkMode ? 'dark-mode' : ''}`}>
              <div className={`mobile-toggle-button ${darkMode ? 'dark-mode' : ''}`}></div>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .nav-links {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;