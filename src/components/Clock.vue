<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';
import { useClock } from '~/composables/clock';

const settingsStore = useSettingsStore();
const { formattedDate } = useClock(settingsStore);
</script>

<template>
    <!-- Ensure the clock is only on client side, otherwise it will cause hydration mismatches with the seconds enabled -->
    <ClientOnly tag="h1" fallback="Loading..." class="clock">
        <h1 class="clock">
            {{ formattedDate }}
        </h1>
    </ClientOnly>
</template>