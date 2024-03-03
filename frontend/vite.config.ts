import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://intertwine-server.onrender.com',
        // target: 'http://localhost:6000',
        changeOrigin: true,
        secure: true,
        headers: {
          origin: 'https://intertwine-server.onrender.com',
        },
      },
    },
  },
});
