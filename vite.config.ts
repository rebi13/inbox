import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "node:url";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      // Map `@` to the project `src` directory
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: mode !== "production" ? true : false,
    rollupOptions: {
      output: {
        // 청크 네이밍으로 흐름 파악 쉽게
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  define: {
    __APP_ENV__: JSON.stringify(process.env.APP_ENV ?? mode),
  },
}));
