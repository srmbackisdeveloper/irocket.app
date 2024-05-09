import { createBrowserRouter } from 'react-router-dom'
import { RootPage } from '../pages/Root/RootPage'
import { Error } from '../pages/Root/Error'
import { HomePage } from '../pages/HomePage'
import Dashboard from '../pages/Dashboard/Dashboard'

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
      path: '/dashboard',
      element: <Dashboard />,
      errorElement: <Error />,
   }
])
