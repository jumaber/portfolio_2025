import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingScreen } from "../other/LoadingScreen";

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  
  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
  
}