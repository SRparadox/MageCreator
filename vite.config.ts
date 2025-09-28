import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

import * as path from "path"

export default defineConfig({
    build: {
        outDir: "dist",
    },
    server: {
        port: 3000,
    },
    plugins: [react()],
    base: "/MageCreator/",
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src"),
        },
    },
})
