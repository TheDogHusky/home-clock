<script setup lang="ts">
const props = defineProps<{
    icon: string;
    label?: string;
    to?: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning' | 'info' | 'light';
}>();

const classes = computed(() => {
    return `btn btn-icon ${props.variant ? `btn-${props.variant}` : ''}`;
});
</script>

<template>
    <button v-if="!to" :class="classes">
        <Icon :icon="icon" />
        <span v-if="label">{{ label }}</span>
    </button>
    <NuxtLink v-else :to="to" :class="classes">
        <Icon :icon="icon" />
        <span v-if="label">{{ label }}</span>
    </NuxtLink>
</template>