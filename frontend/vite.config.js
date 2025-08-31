// vite.config.js (opsi kompatibilitas minimum)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  },
  plugins: [react()],
  build: {
    commonjsOptions: { transformMixedEsModules: true },
  },
});
