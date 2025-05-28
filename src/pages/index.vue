<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
    <h1 class="clock">12:00</h1>
</template>