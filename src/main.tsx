import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthProvider } from './contexts/AuthContext'
import {
   QueryClient,
   QueryClientProvider,
 } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
               <AuthProvider>
                  <RouterProvider router={router} />
               </AuthProvider>
            </NextThemesProvider>
         </NextUIProvider>
      </QueryClientProvider>
   </React.StrictMode>,
)
