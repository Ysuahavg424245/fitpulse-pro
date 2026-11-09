import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  base: './',
  plugins: [react(), VitePWA({
    strategies: 'generateSW', filename: 'sw.js', injectRegister: null, registerType: 'autoUpdate',
    includeAssets: ['icons/icon.svg'],
    manifest: {
      id: './', name: 'FitPulse Pro — Personal Fitness & Workout Tracker', short_name: 'FitPulse Pro',
      description: 'Personal fitness, daily workout and running tracker with offline support.',
      start_url: './', scope: './', display: 'standalone', orientation: 'portrait',
      background_color: '#090d16', theme_color: '#10b981',
      icons: [{ src: './icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }]
    },
    workbox: { globPatterns: ['**/*.{html,js,css,svg,webmanifest}'], navigateFallback: 'index.html', cleanupOutdatedCaches: true, clientsClaim: true, skipWaiting: true }
  })],
  build: { outDir: 'dist', sourcemap: true }
});