import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
      include: /\.(jsx|js)$/,
      babel: {
        plugins: ["babel-plugin-styled-components"]
      }
    })
  ],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.js$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" }
    }
  },
  server: {
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:9000",
        rewrite: path => path.replace("/.netlify/functions", "")
      }
    }
  }
});
