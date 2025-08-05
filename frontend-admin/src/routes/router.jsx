import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Posts from '../pages/Posts';

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
      { path: 'posts', element: <Posts /> },
    ],
  },
]);

export default router;
