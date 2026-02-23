import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/config";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = still checking

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/me");
        if (res.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Still checking — show a loading state
  if (isAuthenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>
          Checking authentication...
        </p>
      </div>
    );
  }

  // Not logged in — redirect to sign-in
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // Logged in — render the protected page
  return children;
};

export default ProtectedRoute;
