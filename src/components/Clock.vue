<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';
import { useClock } from '~/composables/clock';

const settingsStore = useSettingsStore();
const { formattedDate } = useClock(settingsStore);
</script>

<template>
    <!-- Ensure the clock is only on client side, otherwise it will cause hydration mismatches with the seconds enabled -->
    <ClientOnly>
        <h1 class="clock">
            {{ formattedDate }}
        </h1>
        <template #fallback>
            <h1 class="clock">
                {{ new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}
            </h1>
        </template>
    </ClientOnly>
</template>