import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
   server: {
      proxy: {
          '/api': {
              target: 'http://164.90.181.189',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
          }
      }
  },
   plugins: [
      react(),
      svgr({
         include: '**/*.svg',
      }),
      VitePWA({
         manifest: {
            icons: [
               {
                  src: '/public/favicon.ico', // Assuming your favicon is at the root
                  sizes: '192x192',
                  type: 'image/png',
                  purpose: 'any',
               },
            ],
         },
      }),
   ],
})
