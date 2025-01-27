import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // seller on port 3001
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to backend on port 5000
    },
  },
});
