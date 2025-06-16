<script setup lang="ts">
import { useSettingsStore } from "~/stores/settings";

const props = defineProps<{
    active: boolean;
}>();
const route = useRoute();
const emits = defineEmits<{
    (e: 'close'): void;
}>();
const settingsStore = useSettingsStore();

const active = ref(props.active);
const currentCategory = ref((route.query.settingsPaneCategory as string) || 'general');

watch(() => props.active, (newValue) => {
    active.value = newValue;
});
watch(() => route.query.settingsPaneCategory, (newValue) => {
    currentCategory.value = newValue as string || 'general';
});

const classes = computed(() => {
    return {
        'settings-pane': true,
        'active': active.value
    };
});

const settingsPaneTitle = computed(() => {
    switch (currentCategory.value) {
        case 'general':
            return 'General Settings';
        case 'appearance':
            return 'Appearance Settings';
        case 'clock':
            return 'Clock Settings';
        case 'distractions':
            return 'Distractions Settings';
        default:
            return 'General Settings';
    }
});

function handleValueUpdate(key: string, value: any) {
    settingsStore.set(key, value);
}
</script>
<template>
    <section :class="classes">
        <IconButton
            icon="nf-fa-times"
            @click="$emit('close')"
            class="settings-pane-close-button"
        />
        <SettingsPaneSidebar :current-category="currentCategory" />
        <div class="settings-pane-content">
            <h2>{{ settingsPaneTitle }}</h2>
            <div class="settings-pane-category-content">
                <SettingsPaneGeneralSettings v-if="currentCategory === 'general'" :current-category="currentCategory" @valueUpdate="handleValueUpdate" />
                <SettingsPaneAppearanceSettings v-else-if="currentCategory === 'appearance'" :current-category="currentCategory" @valueUpdate="handleValueUpdate" />
                <SettingsPaneClockSettings v-else-if="currentCategory === 'clock'" :current-category="currentCategory" @valueUpdate="handleValueUpdate" />
                <SettingsPaneDistractionsSettings v-else-if="currentCategory === 'distractions'" :current-category="currentCategory" @valueUpdate="handleValueUpdate" />
                <div v-else>
                    <p>Select a valid category from the sidebar to view its settings.</p>
                </div>
            </div>
        </div>
    </section>
</template>