import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ================================
// VERA — Vite configuration
// ================================
export default defineConfig({
  plugins: [react()],
  build: { target: 'es2020' }
});
