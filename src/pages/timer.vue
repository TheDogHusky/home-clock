<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';
import { useTimersStore } from '~/stores/timers';
import { useFullscreen } from '@vueuse/core';
import { DateTime } from 'luxon';
import { getFormatOptions } from '~/utils';

const settingsStore = useSettingsStore();
const timersStore = useTimersStore();
const { isFullscreen } = useFullscreen();

const newTimerActive = ref(false);
const newTimerName = ref('');
const newTimerHoursDuration = ref('');
const newTimerMinutesDuration = ref('');
const newTimerSecondsDuration = ref('');
const newTimerNameInput = useTemplateRef<HTMLInputElement>('newTimerNameInput');
const newTimerHoursDurationInput = useTemplateRef<HTMLInputElement>('newTimerHoursDurationInput');
const newTimerMinutesDurationInput = useTemplateRef<HTMLInputElement>('newTimerMinutesDurationInput');
const newTimerSecondsDurationInput = useTemplateRef<HTMLInputElement>('newTimerSecondsDurationInput');

const closeNewTimerModal = () => {
    newTimerActive.value = false;
    newTimerName.value = '';
    newTimerHoursDuration.value = '';
    newTimerMinutesDuration.value = '';
    newTimerSecondsDuration.value = '';
};

function triggerNewTimer() {
    newTimerActive.value = true;
}

function validateNewTimerInputs() {
    // TODO optimize this ugly validation code
    if (!newTimerName.value.trim()) {
        newTimerNameInput.value?.classList.add('is-invalid');
        newTimerNameInput.value?.setCustomValidity('Please enter a timer name.');
    } else {
        newTimerNameInput.value?.classList.remove('is-invalid');
        newTimerNameInput.value?.setCustomValidity('');
    }

    if (newTimerHoursDuration.value === '' || isNaN(newTimerHoursDuration.value)) {
        newTimerHoursDurationInput.value?.classList.add('is-invalid');
        newTimerHoursDurationInput.value?.setCustomValidity('Please enter a valid number of hours.');
    } else {
        newTimerHoursDurationInput.value?.classList.remove('is-invalid');
        newTimerHoursDurationInput.value?.setCustomValidity('');
    }

    if (newTimerMinutesDuration.value === '' || isNaN(newTimerMinutesDuration.value)) {
        newTimerMinutesDurationInput.value?.classList.add('is-invalid');
        newTimerMinutesDurationInput.value?.setCustomValidity('Please enter a valid number of minutes.');
    } else {
        newTimerMinutesDurationInput.value?.classList.remove('is-invalid');
        newTimerMinutesDurationInput.value?.setCustomValidity('');
    }

    if (newTimerSecondsDuration.value === '' || isNaN(newTimerSecondsDuration.value)) {
        newTimerSecondsDurationInput.value?.classList.add('is-invalid');
        newTimerSecondsDurationInput.value?.setCustomValidity('Please enter a valid number of seconds.');
    } else {
        newTimerSecondsDurationInput.value?.classList.remove('is-invalid');
        newTimerSecondsDurationInput.value?.setCustomValidity('');
    }
}

function addNewTimer() {
    validateNewTimerInputs();

    if (newTimerName.value && newTimerHoursDuration.value !== '' && newTimerMinutesDuration.value !== '' && newTimerSecondsDuration.value !== '') {
        timersStore.addTimer({
            name: newTimerName.value,
            duration: (parseInt(newTimerHoursDuration.value, 10) * 3600) +
                (parseInt(newTimerMinutesDuration.value, 10) * 60) +
                parseInt(newTimerSecondsDuration.value, 10),
        });
        closeNewTimerModal();
    }
}
</script>

<template>
    <h1 class="clock">{{ DateTime.now().toLocaleString(getFormatOptions(settingsStore.clockFormat), { locale: settingsStore.locale }) }}</h1>
    <ul class="timers">
        <li v-for="timer in timersStore.timers" :key="timer.id" class="timer">
            <span class="timer-name">{{ timer.name }}</span>
            <span class="timer-time"></span>
            <button class="btn btn-icon" @click="">
                <i class="nf nf-fa-play"></i>
            </button>
            <button class="btn btn-icon" @click="">
                <i class="nf nf-fa-pause"></i>
            </button>
            <button class="btn btn-icon" @click="">
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
    <Modal v-if="newTimerActive" @close="closeNewTimerModal">
        <template v-slot:header>
            <h2>New Timer</h2>
        </template>
        <template v-slot:content>
            <form @submit.prevent="">
                <input ref="newTimerNameInput" v-model="newTimerName" type="text" placeholder="Timer Name" required />
                <div class="timer-duration">
                    <span><input ref="newTimerHoursDurationInput" v-model="newTimerHoursDuration" type="number" placeholder="Duration (hours)" required /></span>
                    <span><input ref="newTimerMinutesDurationInput" v-model="newTimerMinutesDuration" type="number" placeholder="Duration (minutes)" required /></span>
                    <span><input ref="newTimerSecondsDurationInput" v-model="newTimerSecondsDuration" type="number" placeholder="Duration (seconds)" required /></span>
                </div>
            </form>
        </template>
        <template v-slot:footer>
            <button class="btn" @click="addNewTimer">Create</button>
            <button class="btn btn-danger" @click="closeNewTimerModal">Cancel</button>
        </template>
    </Modal>
</template>