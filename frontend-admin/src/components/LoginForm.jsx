import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    async function verifyToken() {
      try {
        const response = await fetch('http://localhost:3000/api/verify', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsLoggedIn(true);
          navigate('/admin/posts');
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
      }
    }

    verifyToken();
  }, []);

  async function userLogin(email, password) {
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Wrong email or password');
        } else {
          setError(`Login failed: ${response.status}`);
        }
        return null;
      }

      const loginData = await response.json();
      return loginData;
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('An error occurred. Please try again.');
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await userLogin(email, password);
    if (result?.token) {
      localStorage.setItem('token', result.token);
      setIsLoggedIn(true);
      window.dispatchEvent(new Event('authChanged'));
      navigate('/admin/posts');
    }
  }

  if (isLoggedIn) {
    return <p className="text-green-600 text-center">You are already logged in.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
        Login
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}

export default LoginForm;
