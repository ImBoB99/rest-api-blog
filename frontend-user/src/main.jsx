import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { getPosts } from './helpers/postHelpers';
import { PostsContext } from './contexts/PostsContext';
import router from './routes/router.jsx';

export default function App() {
  const [postsArray, setPostsArray] = useState(null);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPostsArray(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <PostsContext.Provider value={postsArray}>
      <RouterProvider router={router} />
    </PostsContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App></App>
  </StrictMode>
);
