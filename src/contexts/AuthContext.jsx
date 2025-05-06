import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';

// Create a context for authentication
const AuthContext = createContext();

/**
 * AuthProvider Component - Manages authentication state throughout the application
 * 
 * This provider:
 * 1. Tracks the current user's authentication state
 * 2. Provides login, signup, and logout functions
 * 3. Updates the current user when auth state changes (via Firebase)
 */
export const AuthProvider = ({ children }) => {
  // State to hold the currently authenticated user (null if not logged in)
  const [currentUser, setCurrentUser] = useState(null);

  // Set up listener for authentication state changes when the component mounts
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function that we'll use for cleanup
    const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user));
    // Clean up subscription on unmount
    return unsubscribe;
  }, []);

  // Authentication methods that will be provided to components
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  // Provide auth state and methods to child components
  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth - Custom hook to access authentication context
 * 
 * Makes it easy for any component to access auth state and functions:
 * - currentUser: The currently logged in user or null
 * - login: Function to log in with email/password
 * - signup: Function to create a new account
 * - logout: Function to sign out
 */
export const useAuth = () => useContext(AuthContext);
