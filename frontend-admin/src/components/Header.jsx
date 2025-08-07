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
        const decoded = jwtDecode(token);
        setUserName(decoded.username);
      } else {
        setUserName(null);
      }
    }

    handleAuthChange(); // run once
    window.addEventListener('authChanged', handleAuthChange);
    return () => window.removeEventListener('authChanged', handleAuthChange);
  }, []);

  function logOut() {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('authChanged'));
      navigate('/admin', { replace: true });
    }
  }

  return (
    <header>
      <h2>Admin Panel</h2>
      {userName && (
        <div>
          <p>Logged in as: {userName}</p>
          <button type="button" onClick={logOut}>
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}
export default Header;
