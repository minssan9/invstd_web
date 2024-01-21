import path from "path";

import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default  defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      // Use the VITE_API_BASE_URL environment variable in your build config
      // base: import.meta.env.VITE_APP_API,
    },
    // define: {
    //   'process.env': env,
    // },
    envDir: "./env",
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      // @quasar/plugin-vite options list:
      // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
      quasar({
        autoImportComponentCase: 'combined',
        sassVariables: 'src/sass/quasar-variables.sass'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, "./src")
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    server: {
      base: '/',
      port: 8080,
      public: 'dev.investand.net',
      host: '0.0.0.0',
      // origin: 'dev.investand.net',
      // port: import.meta.env.VITE_APP_WEB_PORT || 8080,
      // origin: import.meta.env.VITE_APP_WEB,
      cors: false,
      open: true,
      hmr: true,
      sourcemap: true,

      headers: {
        'Access-Control-Allow-Private-Network': false,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      proxy: {
        '/api': {
          // target: import.meta.env.VITE_APP_API,
          target: 'investand.com:24000',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
          ws: true
        }
      }
    }
  }
})

