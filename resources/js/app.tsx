import '../css/app.css';

import { FloatingThemeProvider } from '@/components/floating-theme-provider';
import { initializeTheme, ThemeProvider } from '@/hooks/use-appearance';
import { createInertiaApp } from '@inertiajs/react';
import axios from 'axios';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from "@/components/ui/sonner"

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>
                <FloatingThemeProvider>
                    <App {...props} />
                    <Toaster richColors position='top-right'/>
                </FloatingThemeProvider>
            </ThemeProvider>,
        );
    },
});

// This will set light / dark mode on load...
initializeTheme();
