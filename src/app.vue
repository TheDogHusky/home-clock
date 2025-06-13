<script setup lang="ts">
import { useSettingsStore } from "~/stores/settings";
import { useApplyClockSettings } from "~/composables/applyClockSettings";
import { useApplyThemeSettings } from "~/composables/applyTheme";
import { useApplyAppearanceSettings } from "~/composables/applyAppearanceSettings";
import { useApplyDistractionsSettings } from "~/composables/applyDistractionsSettings";
import type { SettingsStoreStates } from "~/types";

const alertManagerRef = ref();

const settingsStore = useSettingsStore();
const { theme, clock, appearance, distractions } = storeToRefs(settingsStore);
useApplyClockSettings(clock);
useApplyThemeSettings(theme);
useApplyAppearanceSettings(appearance);
useApplyDistractionsSettings(distractions);

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

onMounted(() => {
    window.setSetting = (key: keyof SettingsStoreStates, value) => {
        settingsStore.set(key, value);
    };
})
</script>

<template>
    <Header />
    <div class="content">
        <NuxtPage />
    </div>
    <Footer />
    <ClientOnly>
        <AlertManager ref="alertManagerRef" />
    </ClientOnly>
</template>
