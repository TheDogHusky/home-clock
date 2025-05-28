<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';

const { isFullscreen } = useFullscreen();
</script>

<template>
    <footer v-if="!isFullscreen">
        <p>Made with love by <a href="https://classydev.fr" target="_blank">Adam Billard</a></p>
    </footer>
</template>