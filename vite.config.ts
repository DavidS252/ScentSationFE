import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import fs from "fs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    server: {
      https: {
        key: fs.readFileSync('./client-key.pem'),
        cert: fs.readFileSync('./client-cert.pem'),
      },
      host: 'localhost',
      port: 443, // Change if needed
    },
    plugins: [react(), TanStackRouterVite(), nodePolyfills( {
      overrides: {
        // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
        fs: 'memfs',
      }
    },)],
  };
});
