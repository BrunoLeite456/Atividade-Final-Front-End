import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração simples do Vite para o projeto React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
