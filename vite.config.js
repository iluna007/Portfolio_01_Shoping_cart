import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/Portfolio_01_Shopping_cart/',
  plugins: [react()],
})
