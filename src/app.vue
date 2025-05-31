<script setup lang="ts">
import { useSettingsStore } from "~/stores/settings";

const settingsStore = useSettingsStore();
// Set the body theme based on the settings automatically
onMounted(() => {
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
</script>

<template>
    <Header />
    <NuxtPage />
    <Footer />
</template>
