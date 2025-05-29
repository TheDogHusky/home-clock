<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import { useSettingsStore } from "~/stores/settings";

const isSettingsPaneActive = ref(false);
const isAboutPaneActive = ref(false);

const settingsStore = useSettingsStore();
const { isFullscreen, enter } = useFullscreen();

const toggleSettingsPane = () => {
    isSettingsPaneActive.value = !isSettingsPaneActive.value;
};

const toggleAboutPane = () => {
    isAboutPaneActive.value = !isAboutPaneActive.value;
};
</script>

<template>
    <SettingsPane :active="isSettingsPaneActive" @close="isSettingsPaneActive = false" />
    <AboutPane :active="isAboutPaneActive" @close="isAboutPaneActive = false" />
    <header v-if="!isFullscreen">
        <nav class="menu">
            <ul>
                <Dropdown />
                <li class="menu-item">
                    <IconButton icon="nf-fa-expand" @click="enter" />
                </li>
                <li class="menu-item">
                    <IconButton icon="nf-fa-moon" v-if="settingsStore.isDarkTheme" @click="() => settingsStore.setTheme('light')" />
                    <IconButton icon="nf-fa-sun" v-else @click="() => settingsStore.setTheme('dark')" />
                </li>
                <li class="menu-item">
                    <IconButton icon="nf-fa-gear" @click="toggleSettingsPane" />
                </li>
                <li class="menu-item">
                    <IconButton icon="nf-fa-info" @click="toggleAboutPane" />
                </li>
            </ul>
        </nav>
    </header>
</template>