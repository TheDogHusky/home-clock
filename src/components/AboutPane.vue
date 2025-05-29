<script setup lang="ts">
const config = useRuntimeConfig();

const props = defineProps<{
    active: boolean;
}>();

const active = ref(props.active);
watch(() => props.active, (newValue) => {
    active.value = newValue;
});
</script>

<template>
    <div class="about-pane" :class="{ active }">
        <button class="btn btn-icon about-pane-close-btn" @click="$emit('close')">
            <Icon icon="nf-fa-times" />
        </button>
        <h2>About Home-Clock</h2>
        <div class="about-pane-content">
            <p>
                Home-Clock is a simple, focus-driven, minimalistic and customizable clock web application designed to help you keep track of time without distractions. It features a clean interface, multiple clock styles, and various timekeeping functionalities such as a timer and stopwatch, alongside almost full customization of what is shown on screen, giving you the possibility to remove anything you don't need and focus on what matters most to you.
            </p>
            <p>
                It has been built by Adam Billard, and is fully open source.
            </p>
        </div>
        <div class="about-pane-footer">
            <a href="https://github.com/TheDogHusky/home-clock">GitHub</a>
            <p>Version {{ config.public.version }}</p>
        </div>
    </div>
</template>