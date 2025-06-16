<script setup lang="ts">
import type { SettingsPaneContentComponentProps } from "~/types";

const props = defineProps<SettingsPaneContentComponentProps>();
const route = useRoute();

const settingsPaneActiveLinkClasses = (category: string) => computed(() => {
    return {
        'settings-pane-link': true,
        'active': props.currentCategory === category
    };
});
</script>

<template>
    <ul class="settings-pane-sidebar">
        <li>
            <NuxtLink :to="route.path + '?settingsPaneCategory=general'" :class="settingsPaneActiveLinkClasses('general').value">
                <Icon icon="nf-fa-cog" />
                <span>General</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="route.path + '?settingsPaneCategory=appearance'" :class="settingsPaneActiveLinkClasses('appearance').value">
                <Icon icon="nf-fa-palette" />
                <span>Appearance</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="route.path + '?settingsPaneCategory=clock'" :class="settingsPaneActiveLinkClasses('clock').value">
                <Icon icon="nf-fa-clock" />
                <span>Clock</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink :to="route.path + '?settingsPaneCategory=distractions'" :class="settingsPaneActiveLinkClasses('distractions').value">
                <Icon icon="nf-fa-eye" />
                <span>Distractions</span>
            </NuxtLink>
        </li>
    </ul>
</template>