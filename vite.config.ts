import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { SFCFluentPlugin } from 'unplugin-fluent-vue/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    SFCFluentPlugin({
      blockType: 'fluent',
      checkSyntax: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: './postcss.config.ts',
  },
  optimizeDeps: {
    include: [
      '@tanstack/vue-table',
      'vue',
      'vue-router',
    ],
    exclude: ['vue-demi']
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    watch: {
      usePolling: true,
    },
  }
})