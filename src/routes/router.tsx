import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { Error } from '../pages/Root/Error';
import Dashboard from '../pages/Dashboard/Dashboard';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { Shops } from '../pages/Dashboard/Shops';
import { Products } from '../pages/Dashboard/Products';
import { Analytics } from '../pages/Dashboard/Analytics';
import { Workers } from '../pages/Dashboard/Workers';
import DashboardContent from '../pages/Dashboard/DashboardContent';
import { Profile } from '../pages/Dashboard/Profile';
import PrivateRoute from './PrivateRoute'; 
import AuthRedirect from './AuthRedirect'; 

export const router = createBrowserRouter([
  {
    path: '/login',
    element: 
      <AuthRedirect>
        <LoginPage />
      </AuthRedirect>,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element:
      <AuthRedirect>
        <RegisterPage />
      </AuthRedirect>,
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: <PrivateRoute />, // Use PrivateRoute for /dashboard and its children
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        errorElement: <Error />,
        children: [
          {
            path: '',
            element: <DashboardContent />,
            errorElement: <Error />,
          },
          {
            path: 'shops',
            element: <Shops />,
            errorElement: <Error />,
          },
          {
            path: 'products',
            element: <Products />,
            errorElement: <Error />,
          },
          {
            path: 'analytics',
            element: <Analytics />,
            errorElement: <Error />,
          },
          {
            path: 'workers',
            element: <Workers />,
            errorElement: <Error />,
          },
          {
            path: 'profile',
            element: <Profile />,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
    errorElement: <Error />,
  },
] as RouteObject[]);
