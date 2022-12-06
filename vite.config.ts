import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        plot: resolve(__dirname, 'plot.html')
      }
    }
  },
  worker: {
    format: 'es'
  },
  base: ''
})
