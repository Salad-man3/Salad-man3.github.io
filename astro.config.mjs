// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://salad-man3.github.io",
  integrations: [react()],
  build: {
    assets: "astro",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
