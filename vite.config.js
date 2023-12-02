import path from "path";

import { defineConfig  } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default  defineConfig({
  build: {
    // Use the VITE_API_BASE_URL environment variable in your build config
    // base: import.meta.env.VITE_APP_API,
  },
  envDir: "./env",
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      // {
      //   '@': fileURLToPath(new URL('./src', import.meta.url))
      // }
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server: {
    base: '/',
    port: 8080,
    origin: 'localhost:8080',
    // port: import.meta.env.VITE_APP_WEB_PORT || 8080,
    // origin: import.meta.env.VITE_APP_WEB,
    cors: false,
    open: true,
    hmr: true,

    headers: {
      'Access-Control-Allow-Private-Network': false,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    proxy: {
      '/api': {
        // target: import.meta.env.VITE_APP_API,
        target: 'investand.com:24001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    }
  }
})

