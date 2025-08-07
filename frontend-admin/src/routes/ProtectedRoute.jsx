import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setChecking(false);
      return;
    }

    async function verifyAuthToken() {
      try {
        const response = await fetch('http://localhost:3000/api/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      } finally {
        setChecking(false);
      }
    }

    verifyAuthToken();
  }, []);

  if (checking) return <p>Checking authentication...</p>;
  if (!isAuthenticated) return <Navigate to="/admin" replace />;
  return children;
}

export default ProtectedRoute;
