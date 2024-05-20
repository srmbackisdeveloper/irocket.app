import { createBrowserRouter } from 'react-router-dom'
import { RootPage } from '../pages/Root/RootPage'
import { Error } from '../pages/Root/Error'
import { HomePage } from '../pages/HomePage'
import Dashboard from '../pages/Dashboard/Dashboard'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { Shops } from '../pages/Dashboard/Shops'
import { Products } from '../pages/Dashboard/Products'
import { Analytics } from '../pages/Dashboard/Analytics'
import { Workers } from '../pages/Dashboard/Workers'
import DashboardContent from '../pages/Dashboard/DashboardContent'
import { Profile } from '../pages/Dashboard/Profile'

export const router = createBrowserRouter([
   {
      path: '/',
      element: <RootPage />,
      errorElement: <Error />,
      children: [
         {
            path: '/',
            element: <HomePage />,
         },
      ],
   },
   {
      path: '/login',
      element: <LoginPage />,
      errorElement: <Error />,
   },
   {
      path: '/register',
      element: <RegisterPage />,
      errorElement: <Error />,
   },
   {
      path: '/dashboard',
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
])
