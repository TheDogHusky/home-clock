<script setup lang="ts">
import { useSettingsStore } from "~/stores/settings";


const alertManagerRef = ref();

const settingsStore = useSettingsStore();
// Set the body theme based on the settings automatically
onMounted(() => {
    const app = useNuxtApp().vueApp;
    app.config.globalProperties.$alertManager = alertManagerRef.value;

    // Freak pinia, their docs talk about using subscriptions, with events and payloads, but it doesn't work (no payloads and events are undefined in prod)
    watch(
        () => settingsStore.theme,
        (newTheme) => {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            document.documentElement.setAttribute(
                'data-theme',
                newTheme === 'system' ? (prefersDark ? 'dark' : 'light') : newTheme
            );
        },
        { immediate: true }
    );
    // Set the initial theme on mount
    if(settingsStore.theme == 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else document.documentElement.setAttribute('data-theme', settingsStore.theme);
});

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Home-Clock` : 'Home-Clock';
    },
    script: [
        {
            src: "https://plausible.classydev.fr/js/script.js",
            defer: true,
            "data-domain": "clock.classydev.fr"
        }
    ],
    htmlAttrs: {
        class: "scroll-smooth",
        lang: "en"
    }
});

useSeoMeta({
    description: "Home-Clock is a modern, minimalistic, customizable and focus-driven clock app. It is designed to help you focus on your work, with a clean and simple interface, with minimal distraction.",
    themeColor: "#140c06",
    twitterCard: "summary_large_image",
    ogUrl: "https://clock.classydev.fr",
    ogType: "website",
    ogLocale: "en_US",
    ogSiteName: "Home-Clock",
    ogTitle: "Home-Clock",
    ogDescription: "Home-Clock is a modern, minimalistic, customizable and focus-driven clock app. It is designed to help you focus on your work, with a clean and simple interface, with minimal distraction.",
});
</script>

<template>
    <Header />
    <div class="content">
        <NuxtPage />
    </div>
    <Footer />
    <AlertManager ref="alertManagerRef" />
</template>
