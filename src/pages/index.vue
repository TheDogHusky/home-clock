<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';
import { useClock } from '~/composables/clock';

const settingsStore = useSettingsStore();
const { formattedDate } = useClock(settingsStore);
</script>

<template>
    <h1 class="clock">{{ formattedDate }}</h1>
</template>