<script setup lang="ts">
import { useTimersStore } from '~/stores/timers';
import { useFullscreen } from '@vueuse/core';
import type { Timer } from '~/types';
import { formatDuration } from "~/utils";

const timersStore = useTimersStore();
const { isFullscreen } = useFullscreen();

// Initialize the values for the new timer modal
const newTimerActive = ref(false);
const newTimerName = ref('');
const newTimerHoursDuration = ref('0');
const newTimerMinutesDuration = ref('5');
const newTimerSecondsDuration = ref('0');
const newTimerNameInput = useTemplateRef<HTMLInputElement>('newTimerNameInput');
const newTimerHoursDurationInput = useTemplateRef<HTMLInputElement>('newTimerHoursDurationInput');
const newTimerMinutesDurationInput = useTemplateRef<HTMLInputElement>('newTimerMinutesDurationInput');
const newTimerSecondsDurationInput = useTemplateRef<HTMLInputElement>('newTimerSecondsDurationInput');

// Function to close the new timer modal and reset the input fields
const closeNewTimerModal = () => {
    newTimerActive.value = false;
    newTimerName.value = '';
    newTimerHoursDuration.value = '0';
    newTimerMinutesDuration.value = '5';
    newTimerSecondsDuration.value = '0';
};

// Function to trigger the new timer modal
function triggerNewTimer() {
    newTimerActive.value = true;
}

// Function to validate the inputs for the new timer
function validateNewTimerInputs() {
    // TODO optimize this ugly validation code

    // Check if the duration inputs are valid numbers
    if (newTimerHoursDuration.value === '' || isNaN(parseInt(newTimerHoursDuration.value, 10))) {
        newTimerHoursDurationInput.value?.classList.add('is-invalid');
        newTimerHoursDurationInput.value?.setCustomValidity('Please enter a valid number of hours.');
    } else {
        newTimerHoursDurationInput.value?.classList.remove('is-invalid');
        newTimerHoursDurationInput.value?.setCustomValidity('');
    }

    if (newTimerMinutesDuration.value === '' || isNaN(parseInt(newTimerMinutesDuration.value, 10))) {
        newTimerMinutesDurationInput.value?.classList.add('is-invalid');
        newTimerMinutesDurationInput.value?.setCustomValidity('Please enter a valid number of minutes.');
    } else {
        newTimerMinutesDurationInput.value?.classList.remove('is-invalid');
        newTimerMinutesDurationInput.value?.setCustomValidity('');
    }

    if (newTimerSecondsDuration.value === '' || isNaN(parseInt(newTimerSecondsDuration.value, 10))) {
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
    if (newTimerHoursDuration.value !== '' && newTimerMinutesDuration.value !== '' && newTimerSecondsDuration.value !== '') {
        timersStore.addTimer(
            newTimerName.value || '',
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
        acc[timer.id] = timersStore.watchTimer(timer.id)?.remaining || 0; // Get the remaining time for each timer
        if (acc[timer.id] <= 0 && timer.isActive) { // If the timer has finished, alert the user
            triggerAlert(timer);
        }
        return acc;
    }, {} as Record<string, number>);
});

// Function to trigger an alert when a timer finishes. Will later on be replaced with a more sophisticated notification system, with sound and everything
function triggerAlert(timer: Timer) {
    alert(`Timer "${timer.name}" has finished!`);
    timersStore.removeTimer(timer.id); // Stop the timer after alerting
}

useHead({
    title: "Timers"
});

function preventNegative(value: Ref<string>) {
    return () => {
        if (parseInt(value.value, 10) < 0) {
            value.value = '0'; // Prevent negative values
        }
    }
}

// Watchers to prevent negative values in the timer duration inputs
watch(newTimerHoursDuration, preventNegative(newTimerHoursDuration));
watch(newTimerMinutesDuration, preventNegative(newTimerMinutesDuration));
watch(newTimerSecondsDuration, preventNegative(newTimerSecondsDuration));
</script>

<template>
    <Clock />
    <ul class="timers">
        <ClientOnly>
            <li v-for="timer in timersStore.timers" :key="timer.id" class="timer">
                <div class="timer-headers">
                    <span class="timer-name" v-if="timer.name.length">{{ timer.name }}</span>
                    <span class="timer-time">{{ formatDuration(timersRemaining[timer.id]) }}</span>
                </div>
                <div class="timer-controls" v-if="!isFullscreen">
                    <!-- TODO Add timer controls logic -->
                    <!--<button class="btn btn-icon" @click="">
                        <i class="nf nf-fa-play"></i>
                    </button>
                    <button class="btn btn-icon" @click="">
                        <i class="nf nf-fa-pause"></i>
                    </button>-->
                    <button class="btn btn-icon" @click="timersStore.resetTimer(timer.id)">
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
                <h4>Duration:</h4>
                <div class="timer-duration">
                    <span>
                        <input ref="newTimerHoursDurationInput" id="newTimerHoursDurationInput" v-model="newTimerHoursDuration" type="number" placeholder="Duration (hours)" required />
                    </span>
                    <span>
                        <input ref="newTimerMinutesDurationInput" v-model="newTimerMinutesDuration" type="number" placeholder="Duration (minutes)" required />
                    </span>
                    <span>
                        <input ref="newTimerSecondsDurationInput" v-model="newTimerSecondsDuration" type="number" placeholder="Duration (seconds)" required />
                    </span>
                </div>
            </form>
        </template>
        <template v-slot:footer>
            <button class="btn" @click="addNewTimer">Create</button>
            <button class="btn btn-danger" @click="closeNewTimerModal">Cancel</button>
        </template>
    </Modal>
</template>