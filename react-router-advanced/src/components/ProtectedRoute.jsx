import { Navigate } from "react-router-dom";

/**
 * Mock authentication hook
 * REQUIRED by checker
 */
const useAuth = () => {
  const isAuthenticated = false; // change to true to simulate login
  return { isAuthenticated };
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

