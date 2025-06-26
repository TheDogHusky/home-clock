<script setup lang="ts">
import type { SettingsPaneContentComponentProps } from "~/types";
import { useSettingsStore } from "~/stores/settings";

const props = defineProps<SettingsPaneContentComponentProps>();
const settingsStore = useSettingsStore();
const emits = defineEmits<{
    (e: 'valueUpdate', key: string, value: any): void;
}>();

const backgroundColorInput = ref(settingsStore.backgroundColor);
const clockFontColorInput = ref(settingsStore.clockFontColor);

watch(settingsStore.appearance, (newSettings) => {
    backgroundColorInput.value = newSettings.backgroundColor;
    clockFontColorInput.value = newSettings.clockFontColor;
});
</script>

<template>
    <form class="settings-pane-content-form" @submit.prevent>
        <div class="form-group">
            <label for="theme" class="setting-name">
                <span>Background Color</span>
                <VTooltip class="info-icon" aria-id="background-color-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will change the background color of the application. You can select any color you prefer.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <input type="color" id="theme" v-model="backgroundColorInput" @change="$emit('valueUpdate', 'appearance', { backgroundColor: backgroundColorInput })">
            </div>
        </div>
        <div class="form-group">
            <label for="theme" class="setting-name">
                <span>Clock Font Color</span>
                <VTooltip class="info-icon" aria-id="clock-font-color-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will change the font color of the clock displayed on the application. You can select any color you prefer.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <input type="color" id="theme" v-model="clockFontColorInput" @change="$emit('valueUpdate', 'appearance', { clockFontColor: clockFontColorInput })">
            </div>
        </div>
    </form>
</template>