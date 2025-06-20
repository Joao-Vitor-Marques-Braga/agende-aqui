import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // Melhorar tratamento de erros durante desenvolvimento
    hmr: {
      overlay: true
    }
  },
  define: {
    // Suprime alguns warnings desnecessários em desenvolvimento
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
  }
})
