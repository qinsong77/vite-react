import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 自动导入全局样式
        additionalData: "@import '@src/styles/variable.less';"
      }
    }
  },
  plugins: [
    react(),
    // antd 按需加载
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`
        },
      ],
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@src': path.resolve(__dirname, 'src'), // src 路径
      '@api': path.resolve(__dirname, 'src/api'), // src 路径
      '@components': path.resolve(__dirname, 'src/components'), // src/api 路径
      '@common': path.resolve(__dirname, 'src/common'), // src/common 路径
      '@config': path.resolve(__dirname, 'src/config') // src/config 路径
    }
  },
  server: {
    hmr: {
      // overlay: false,
    }, // 禁止服务器错误遮罩
    port: 9000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
      }
    },
  }
})
