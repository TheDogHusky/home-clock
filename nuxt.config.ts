import pkg from './package.json';

export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: false },
    srcDir: "src",
    css: [
        '~/assets/css/main.css',
        '~/assets/css/nerdfonts.css'
    ],
    modules: [
        '@vueuse/nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/fonts',
        'floating-vue/nuxt'
    ],
    fonts: {
        families: [
            {
                name: 'Source Code Pro',
                provider: 'google',
                subsets: ['latin'],
                weights: [100, 200, 300, 400, 500,600, 700, 800, 900]
            },
            {
                name: 'NerdFontsSymbols Nerd Font',
                provider: 'local',
                preload: true,
                styles: ['normal']
            },
            {
                name: 'Source Sans 3',
                provider: 'google',
                subsets: ['latin'],
                weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
            },
            {
                name: 'Roboto Mono',
                provider: 'google',
                subsets: ['latin'],
                weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
            },
            {
                name: 'Roboto',
                provider: 'google',
                subsets: ['latin'],
                weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
            }
        ]
    },
    runtimeConfig: {
        public: {
            version: pkg.version
        }
    }
});