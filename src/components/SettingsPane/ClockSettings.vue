<script setup lang="ts">
import type { SettingsPaneContentComponentProps } from "~/types";

const props = defineProps<SettingsPaneContentComponentProps>();
const emits = defineEmits<{
    (e: 'valueUpdate', key: string, value: any): void;
}>();
</script>

<template>
    <form class="settings-pane-content-form"></form>
</template>