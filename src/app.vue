<script setup lang="ts">
import { useSettingsStore } from "~/stores/settings";
import type { DebuggerEvent } from "vue";

const settingsStore = useSettingsStore();
// Set the body theme based on the settings automatically
settingsStore.$subscribe((mutation, state) => {
    if ((Array.isArray(mutation.events) && mutation.events.some(event => event.key === 'theme')) || (mutation.events as DebuggerEvent).key === 'theme') {
        document.documentElement.setAttribute('data-theme', state.theme);
    }
});

onMounted(() => {
    // Set the initial theme on mount
    document.documentElement.setAttribute('data-theme', settingsStore.theme);
});
</script>

<template>
    <NuxtLoadingIndicator color="linear-gradient(to right, var(--primary), var(--secondary)" />
    <Header />
    <NuxtPage />
    <Footer />
</template>
