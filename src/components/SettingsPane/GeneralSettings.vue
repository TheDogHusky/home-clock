<script setup lang="ts">
import type { SettingsPaneContentComponentProps } from "~/types";
import { useSettingsStore } from "~/stores/settings";

const props = defineProps<SettingsPaneContentComponentProps>();
const settingsStore = useSettingsStore();
const emits = defineEmits<{
    (e: 'valueUpdate', key: string, value: any): void;
}>();

const themeInput = ref(settingsStore.theme);
watch(() => settingsStore.theme, (newTheme) => {
    themeInput.value = newTheme;
});

function resetSettings() {
    settingsStore.$reset();
    themeInput.value = settingsStore.theme;
}
</script>

<template>
    <form class="settings-pane-content-form" @submit.prevent>
        <div class="form-group">
            <label for="theme" class="setting-name">
                <span>Theme</span>
                <VTooltip class="info-icon" aria-id="theme-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will change the overall theme of the application. The "System" option will follow your system's theme settings.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <select id="theme" v-model="themeInput" @change="$emit('valueUpdate', 'theme', themeInput)">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                </select>
            </div>
        </div>
    </form>
    <div class="settings-actions">
        <button @click="resetSettings" class="btn btn-danger">Reset Settings</button>
    </div>
</template>