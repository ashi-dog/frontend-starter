import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import viteEslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteEslint({
            failOnError: false,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    server: {
        host: true,
        port: 3030,
        watch: {
            usePolling: true,
        },
    },
});
