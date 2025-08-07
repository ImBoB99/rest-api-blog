import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/posts');
    }
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
      console.log('User is logged in');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;
