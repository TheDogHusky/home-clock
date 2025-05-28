<script setup lang="ts">
const props = defineProps<{
    icon: string;
}>();
</script>

<template>
    <i :class="'nf ' + props.icon"></i>
</template>