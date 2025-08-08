import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleAuthChange() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserName(decoded.username);
        } catch {
          setUserName(null);
        }
      } else {
        setUserName(null);
      }
    }

    handleAuthChange(); // run once
    window.addEventListener('authChanged', handleAuthChange);
    return () => window.removeEventListener('authChanged', handleAuthChange);
  }, []);

  function logOut() {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChanged'));
    navigate('/admin', { replace: true });
  }

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h2 className="text-xl font-semibold">Admin Panel</h2>
      {userName && (
        <div className="flex items-center gap-4">
          <p className="text-sm">
            Logged in as: <span className="font-medium">{userName}</span>
          </p>
          <button
            type="button"
            onClick={logOut}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm transition"
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
