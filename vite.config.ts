import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BUILD_ID =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ||
  process.env.GITHUB_SHA?.slice(0, 7) ||
  process.env.COMMIT_SHA?.slice(0, 7) ||
  "local";

const BUILD_TIME = new Date().toISOString();

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID),
    __BUILD_TIME__: JSON.stringify(BUILD_TIME),
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});