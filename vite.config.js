import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteSvgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  // --- Cho phép Vite sử dụng dc process.env, mặc định chỉ dùng được import.meta.env
  define: {
    'process.env': process.env
  },
  plugins: [react(), viteSvgr()],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  }
})
