// @ts-nocheck

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { dependencies } from './package.json';
import polyfillNode from 'rollup-plugin-node-polyfills';
import inject from '@rollup/plugin-inject';
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import removeConsole from 'vite-plugin-remove-console';

const renderChunks = (deps: Record<string, string>) => {
  const chunks: any = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom', 'stream-browserify'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
};

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    exclude: ['web3', 'gsap'],
  },
  server: {
    host: true,
  },
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      store: path.resolve('./src/store'),
      constants: path.resolve('./src/constants'),
      components: path.resolve('./src/components'),
      hooks: path.resolve('./src/hooks'),
      pages: path.resolve('./src/pages'),
      resources: path.resolve('./src/resources'),
      services: path.resolve('./src/services'),
      utils: path.resolve('./src/utils'),
      connectors: path.resolve('./src/connectors'),
      language: path.resolve('./src/language'),
      hoc: path.resolve('./src/hoc'),
    },
  },
  plugins: [react(), removeConsole()],
  build: {
    manifest: true,
    sourcemap: false,
    outDir: path.join(__dirname, 'build'),
    rollupOptions: {
      // output: {
      //   manualChunks: {
      //     vendor: ['react', 'react-router-dom', 'react-dom', 'stream-browserify'],
      //     ...renderChunks(dependencies),
      //   },
      // },

      input: {
        main: resolve(__dirname, 'index.html'),
        trade: resolve(__dirname, 'trade.html'),
        earn: resolve(__dirname, 'earn.html'),
        nft: resolve(__dirname, 'nft.html'),
        win: resolve(__dirname, 'win.html'),
      },
      plugins: [
        polyfillNode(),
        inject({ Buffer: ['buffer', 'Buffer'] }),
        inject({ process: ['process', 'process/browser'] }),
        NodeModulesPolyfills(),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
