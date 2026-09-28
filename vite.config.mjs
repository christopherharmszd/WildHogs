import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_PAGES_BASE || "/",
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: {
        main: "index.html",
        aktuelles: "aktuelles.html",
        kontakt: "kontakt.html",
        impressum: "impressum.html",
        datenschutz: "datenschutz.html",
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
