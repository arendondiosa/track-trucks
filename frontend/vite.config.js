import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@vis.gl/react-google-maps"],
  },
  host: "0.0.0.0",
  allowedHosts: "all",
})
