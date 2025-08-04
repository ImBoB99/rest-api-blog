import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import Home from '../pages/Home.jsx';
import Post from '../pages/Post.jsx';
import NotFound from '../pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: '/post/:id', element: <Post></Post> },
      { path: '*', element: <NotFound></NotFound> },
    ],
  },
]);

export default router;
