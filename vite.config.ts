import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/* TODO: Remove this if styled components are used */
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
