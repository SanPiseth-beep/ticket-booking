import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import './index.css';

/**
 * App Component - The main application component
 * 
 * This component defines:
 * 1. The application's navigation bar, shown on all pages
 * 2. The routing structure with public and protected routes
 * 
 * Route Structure:
 * - / (Home): Public route for browsing all events
 * - /event/:eventId: Public route for viewing a specific event's details
 * - /cart: Public route for viewing and managing the shopping cart
 * - /success: Protected route for order confirmation (requires login)
 * - /login: Public route for user authentication
 * - /signup: Public route for new user registration
 * - /profile: Protected route for viewing user's booking history (requires login)
 */
function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
