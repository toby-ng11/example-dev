import '../css/app.css';

import { FloatingThemeProvider } from '@/components/floating-theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { initializeTheme, ThemeProvider } from '@/hooks/use-appearance';
import { createInertiaApp } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>
                <FloatingThemeProvider>
                    <QueryClientProvider client={queryClient}>
                        <App {...props} />
                        <Toaster richColors position="top-right" />
                    </QueryClientProvider>
                </FloatingThemeProvider>
            </ThemeProvider>,
        );
    },
});

// This will set light / dark mode on load...
initializeTheme();
