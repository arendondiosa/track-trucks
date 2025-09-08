import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@vis.gl/react-google-maps"],
  },
  server: {
    host: true,
    allowedHosts: ['ec2-13-59-118-68.us-east-2.compute.amazonaws.com']
  }
})
