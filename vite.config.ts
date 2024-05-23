import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
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
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
      BASE_URL: process.env.BASE_URL
    },
  };
});
