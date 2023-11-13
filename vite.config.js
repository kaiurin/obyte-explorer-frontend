import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "https://explorer.obyte.org",
        changeOrigin: true,
        secure: false,
      },
      "/socket.io": {
        target: "https://explorer.obyte.org",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
