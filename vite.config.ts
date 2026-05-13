/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles:  ["./src/setupTests.ts"],
    globals:     true,       // ← This is the key fix
    reporter:    "verbose",
    coverage: {
      reporter: ["text", "html"],
      include:  ["src/**/*.{ts,tsx}"],
      exclude:  ["src/main.tsx"],
    },
  },
});