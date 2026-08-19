import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Localement, Vite sert l'application à la racine. Sur GitHub Pages, le nom
// du dépôt devient automatiquement le chemin de base. Cette configuration
// reste donc valable si ce projet sert de modèle à un futur dépôt.
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").pop();
const base = process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : "/";

export default defineConfig({
  base,

  plugins: [react(), tailwindcss()],

  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
