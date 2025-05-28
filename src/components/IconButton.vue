<script setup lang="ts">
const props = defineProps<{
    icon: string;
    label?: string;
    to?: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning' | 'info';
}>();

const classes = computed(() => {
    return `btn btn-icon btn-${props.variant || 'primary'}`;
});
</script>

<template>
    <button v-if="!to" :class="classes">
        <i :class="'nf ' + icon"></i>
        <span v-if="label">{{ label }}</span>
    </button>
    <NuxtLink v-else :to="to" :class="classes">
        <i :class="'nf' + icon"></i>
        <span v-if="label">{{ label }}</span>
    </NuxtLink>
</template>