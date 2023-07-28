import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Add this line
      include: "**/*.tsx",
    }),
    eslint(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: "@root-entry-name: default;",
      },
    },
  },
  define: {
    "import.meta.env.VITE_ENV": JSON.stringify("import.meta.env.VITE_ENV"),
  },
  server: {
    port: 4173,
  },
})
