<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';
import { useTimersStore } from '~/stores/timers';
import { useFullscreen } from '@vueuse/core';
import { DateTime } from 'luxon';
import { getFormatOptions } from '~/utils';

const settingsStore = useSettingsStore();
const timersStore = useTimersStore();
const { isFullscreen } = useFullscreen();

function triggerNewTimer() {
    console.log('New timer triggered');
}
</script>

<template>
    <h1 class="clock">{{ DateTime.now().toLocaleString(getFormatOptions(settingsStore.clockFormat), { locale: settingsStore.locale }) }}</h1>
    <ul class="timers">
        <li v-for="timer in timersStore.timers" :key="timer.id" class="timer">
            <span class="timer-name">{{ timer.name }}</span>
            <span class="timer-time">{{ timer.time }}</span>
            <button class="btn btn-icon" @click="timer.start">
                <i class="nf nf-fa-play"></i>
            </button>
            <button class="btn btn-icon" @click="timer.stop">
                <i class="nf nf-fa-pause"></i>
            </button>
            <button class="btn btn-icon" @click="timer.reset">
                <i class="nf nf-fa-undo"></i>
            </button>
            <button class="btn btn-icon" @click="timersStore.removeTimer(timer.id)">
                <i class="nf nf-fa-trash"></i>
            </button>
        </li>
    </ul>
    <div v-if="!isFullscreen">
        <button class="btn btn-icon" @click="triggerNewTimer">
            <i class="nf nf-fa-plus"></i>
        </button>
    </div>
</template>