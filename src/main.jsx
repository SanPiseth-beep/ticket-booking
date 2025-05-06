import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import './index.css';

/**
 * Main Application Entry Point
 * 
 * This file configures and renders the entire React application with all necessary providers:
 * 
 * 1. React.StrictMode - Helps identify potential problems during development
 * 2. BrowserRouter - Enables client-side routing throughout the application
 * 3. AuthProvider - Manages authentication state for the entire app
 * 4. CartProvider - Manages shopping cart state for the entire app
 * 
 * The providers are nested so that any component in the app can access:
 * - Authentication state and methods (login, logout, etc.)
 * - Cart state and methods (add items, update quantities, etc.)
 * - Routing capabilities
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);