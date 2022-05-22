import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: "https://geordiep.github.io/spinner/",
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    outDir: "./docs",
  },
});
