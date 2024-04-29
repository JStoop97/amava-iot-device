import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY)
    },
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // 'url': path.resolve(__dirname, 'node_modules/url/url.js'),
        // 'util': path.resolve(__dirname, 'node_modules/util/util.js'),
        'aws-iot-device-sdk-v2': path.resolve(__dirname, 'node_modules/aws-iot-device-sdk-v2/dist/browser')
      }
    },
  // resolve: {
  //   alias: {
  //     'url': path.resolve(__dirname, 'node_modules/url/url.js'),
  //     'util': path.resolve(__dirname, 'node_modules/util/util.js'),
  //     'aws-iot-device-sdk-v2': path.resolve(__dirname, 'node_modules/aws-iot-device-sdk-v2/dist/browser')
  //   }
  // }
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true
            })
        ]
    }
  }
  }
})
