import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS plugin added
  ],
  server: {
    // Ensures direct navigation to /about, /faq, etc. works properly with React Router
    historyApiFallback: true,
  },
})