<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';
import { useTimersStore } from '~/stores/timers';
import { useFullscreen } from '@vueuse/core';

const settingsStore = useSettingsStore();
const timersStore = useTimersStore();
const { isFullscreen } = useFullscreen();

// Initialize the values for the new timer modal
const newTimerActive = ref(false);
const newTimerName = ref('');
const newTimerHoursDuration = ref('');
const newTimerMinutesDuration = ref('');
const newTimerSecondsDuration = ref('');
const newTimerNameInput = useTemplateRef<HTMLInputElement>('newTimerNameInput');
const newTimerHoursDurationInput = useTemplateRef<HTMLInputElement>('newTimerHoursDurationInput');
const newTimerMinutesDurationInput = useTemplateRef<HTMLInputElement>('newTimerMinutesDurationInput');
const newTimerSecondsDurationInput = useTemplateRef<HTMLInputElement>('newTimerSecondsDurationInput');

// Function to close the new timer modal and reset the input fields
const closeNewTimerModal = () => {
    newTimerActive.value = false;
    newTimerName.value = '';
    newTimerHoursDuration.value = '';
    newTimerMinutesDuration.value = '';
    newTimerSecondsDuration.value = '';
};

// Function to trigger the new timer modal
function triggerNewTimer() {
    newTimerActive.value = true;
}

// Function to validate the inputs for the new timer
function validateNewTimerInputs() {
    // TODO optimize this ugly validation code
    // Check if the new timer name is valid
    if (!newTimerName.value.trim()) {
        newTimerNameInput.value?.classList.add('is-invalid');
        newTimerNameInput.value?.setCustomValidity('Please enter a timer name.');
    } else {
        newTimerNameInput.value?.classList.remove('is-invalid');
        newTimerNameInput.value?.setCustomValidity('');
    }

    // Check if the duration inputs are valid numbers
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

// Function to add a new timer
function addNewTimer() {
    // Validate the inputs before adding the timer
    validateNewTimerInputs();

    // If all inputs are valid, add the timer
    if (newTimerName.value && newTimerHoursDuration.value !== '' && newTimerMinutesDuration.value !== '' && newTimerSecondsDuration.value !== '') {
        timersStore.addTimer(
            newTimerName.value,
            // Concatenate the durations in seconds
            (parseInt(newTimerHoursDuration.value, 10) * 3600) +
                (parseInt(newTimerMinutesDuration.value, 10) * 60) +
                parseInt(newTimerSecondsDuration.value, 10),
        );
        // Reset the input fields after adding the timer
        closeNewTimerModal();
    }
}

// This is dumb and probably not the best way to do this, but it works for now, and I haven't found any other solution to update the timers every second
const now = ref(Date.now());
let timerInterval: number;

onMounted(() => {
    timerInterval = window.setInterval(() => {
        now.value = Date.now();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(timerInterval);
});

const timersRemaining = computed(() => {
    // Using now.value to ensure the timers are updated every second
    now.value;
    return timersStore.timers.reduce((acc, timer) => {
        acc[timer.id] = timersStore.watchTimer(timer.id).remaining;
        return acc;
    }, {} as Record<string, number>);
});
</script>

<template>
    <Clock />
    <ul class="timers">
        <!-- TODO: Format this correctly -->
        <ClientOnly>
            <li v-for="timer in timersStore.timers" :key="timer.id" class="timer">
                <div class="timer-headers">
                    <span class="timer-name">{{ timer.name }}</span>
                    <span class="timer-time">{{ timersRemaining[timer.id] }}</span>
                </div>
                <div class="timer-controls" v-if="!isFullscreen">
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
                </div>
            </li>
        </ClientOnly>
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