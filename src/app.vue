<script setup lang="ts">
import { useSettingsStore } from "~/stores/settings";
import type { DebuggerEvent } from "vue";

const settingsStore = useSettingsStore();
// Set the body theme based on the settings automatically
settingsStore.$subscribe((mutation, state) => {
    if (((Array.isArray(mutation.events) && mutation.events.some(event => event.key === 'theme')) || (mutation.events as DebuggerEvent).key === 'theme')) {
        if(state.theme == 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else document.documentElement.setAttribute('data-theme', state.theme);
    }
});

onMounted(() => {
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
