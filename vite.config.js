import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/Portfolio_01_Shoping_cart/',
  plugins: [react()],
})
