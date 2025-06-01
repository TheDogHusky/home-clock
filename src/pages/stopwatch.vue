<script setup lang="ts">
import { formatStopwatchTime } from '~/utils';

const elapsedTime = ref(0);
let startTime: number | null = null;
let animationFrameId: number | null = null;
const running = ref(false);

function startStopwatch() {
    startTime = Date.now() - elapsedTime.value;
    running.value = true;
    updateStopwatch();
}

function stopStopwatch() {
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        running.value = false;
    }
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime.value = 0;
    startTime = null;
    running.value = false;
}

function updateStopwatch() {
    if (startTime !== null) {
        elapsedTime.value = Date.now() - startTime;
        // Update the display every frame, faster than setInterval and more efficient
        animationFrameId = requestAnimationFrame(updateStopwatch);
    }
}

onUnmounted(() => {
    stopStopwatch();
});

useHead({
    title: "Stopwatch"
});
</script>

<template>
    <h1 class="stopwatch">{{ formatStopwatchTime(elapsedTime) }}</h1>
    <div class="stopwatch-controls">
        <button @click="startStopwatch" class="btn btn-icon" v-if="!running">
            <Icon icon="nf-fa-play" />
        </button>
        <button @click="stopStopwatch" class="btn btn-icon" v-else>
            <Icon icon="nf-fa-pause" />
        </button>
        <button @click="resetStopwatch" class="btn btn-icon">
            <Icon icon="nf-fa-undo" />
        </button>
    </div>
</template>