<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';
import { DateTime } from 'luxon';
import { getFormatOptions } from '~/utils';

const settingsStore = useSettingsStore();
function getTime() {
    return DateTime.now().toLocaleString(getFormatOptions(settingsStore.clockFormat), { locale: settingsStore.locale });
}

let timer: number | undefined;
const currentTime = ref(getTime());

onMounted(() => {
    timer = window.setInterval(() => {
        currentTime.value = getTime();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
    <h1 class="clock">{{ currentTime }}</h1>
</template>