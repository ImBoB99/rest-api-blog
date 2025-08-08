import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Posts from '../pages/Posts';
import ProtectedRoute from '../routes/ProtectedRoute';
import AddPost from '../pages/AddPost';

import { Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/admin" replace />, // redirect for local dev, to avoid typing /admin
  },

  {
    path: '/admin',
    element: <MainLayout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: 'posts',
        element: (
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        ),
      },
      {
        path: 'add-post',
        element: (
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
