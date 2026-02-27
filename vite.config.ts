import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.tsx",
      formats: ["iife"],
      name: "SmartyrEmbeds",
      fileName: () => "index.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: "index[extname]",
      },
    },
    sourcemap: false,
  },
});
