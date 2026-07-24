import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// base=/admin/:生产由 FastAPI/Nginx 在 /admin/ 下同源提供(见 api.py 懒挂载)。
// dev proxy:开发时前端 :5173,后端 :7860;/api 同源代理,cookie 才能带上。
export default defineConfig({
  base: "/admin/",
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": { target: "http://127.0.0.1:7860", changeOrigin: false },
    },
  },
  build: { outDir: "dist", sourcemap: false },
});
