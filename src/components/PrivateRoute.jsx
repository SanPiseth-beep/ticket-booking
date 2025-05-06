import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PrivateRoute Component - Protects routes that require authentication
 * 
 * This component works by:
 * 1. Checking if there is a logged-in user via the AuthContext
 * 2. If a user is logged in, it renders the child components (protected route content)
 * 3. If no user is logged in, it redirects to the login page
 * 
 * Used to protect routes like /profile and /success in the application
 */
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;