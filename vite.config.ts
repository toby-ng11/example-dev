import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
    const isDev = command === 'serve';

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        esbuild: {
            jsx: 'automatic',
        },
        resolve: {
            alias: {
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            },
        },
        server: isDev
            ? {
                  https: {
                      key: fs.readFileSync(resolve(__dirname, 'certs/p2q.key')),
                      cert: fs.readFileSync(resolve(__dirname, 'certs/p2q.crt')),
                  },
                  host: '0.0.0.0',
                  hmr: {
                      protocol: 'wss',
                      host: 'p2q.centura.local',
                  },
              }
            : undefined,
    };
});
