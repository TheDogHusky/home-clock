<script setup lang="ts">
import { useTimersStore } from '~/stores/timers';
import { useFullscreen } from '@vueuse/core';
import type { Timer } from '~/types';
import { formatDuration } from "~/utils";
import { useAlert } from '~/composables/alerts';
import { useSettingsStore } from "~/stores/settings";
import { type ReturnedValue, useSound } from '@vueuse/sound';

const showAlert = useAlert();

const timersStore = useTimersStore();
const { isFullscreen } = useFullscreen();
const settingsStore = useSettingsStore();

// Since @vueuse/sound does not support importing audio files inside a function (so dynamic imports), we need to store the audio files in a Map
const audioOptions = (volume?: number) => ({
    volume: volume || 0.5, // Set the default volume for all sounds
    autoplay: false, // Do not autoplay the sound
    loop: true, // Loop the sound
});

const clock = useSound('/alarms/clock.mp3', audioOptions);
const aggressive_clock = useSound('/alarms/aggressive_clock.mp3', audioOptions(0.25));
const lo_fi = useSound('/alarms/lo_fi.mp3', audioOptions(1));
const japan_eas = useSound('/alarms/japan_eas.mp3', audioOptions(0.25));
const oversimplified = useSound('/alarms/oversimplified.mp3', audioOptions(0.25));
const chiptune = useSound('/alarms/chiptune.mp3', audioOptions(0.25));

// Initialize the values for the new timer modal
const newTimerActive = ref(false);
const newTimerName = ref('');
const newTimerHoursDuration = ref('0');
const newTimerMinutesDuration = ref('5');
const newTimerSecondsDuration = ref('0');
const newTimerSound = ref('clock'); // Default sound for the new timer
const newTimerNameInput = useTemplateRef<HTMLInputElement>('newTimerNameInput');
const newTimerHoursDurationInput = useTemplateRef<HTMLInputElement>('newTimerHoursDurationInput');
const newTimerMinutesDurationInput = useTemplateRef<HTMLInputElement>('newTimerMinutesDurationInput');
const newTimerSecondsDurationInput = useTemplateRef<HTMLInputElement>('newTimerSecondsDurationInput');
const newTimerSoundInput = useTemplateRef<HTMLSelectElement>('newTimerSoundInput');

// Function to close the new timer modal and reset the input fields
const closeNewTimerModal = () => {
    newTimerActive.value = false;
    newTimerName.value = '';
    newTimerHoursDuration.value = '0';
    newTimerMinutesDuration.value = '5';
    newTimerSecondsDuration.value = '0';
    newTimerSound.value = 'clock';
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
async function addNewTimer() {
    // Validate the inputs before adding the timer
    validateNewTimerInputs();

    // If all inputs are valid, add the timer
    if (newTimerHoursDuration.value !== '' && newTimerMinutesDuration.value !== '' && newTimerSecondsDuration.value !== '') {
        console.log(timersStore.addTimer(
            newTimerName.value || '',
            // Concatenate the durations in seconds
            (parseInt(newTimerHoursDuration.value, 10) * 3600) +
                (parseInt(newTimerMinutesDuration.value, 10) * 60) +
                parseInt(newTimerSecondsDuration.value, 10),
            newTimerSound.value
        ));
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

const getSound = (timer: Timer): ReturnedValue => {
    // Return the sound based on the timer's name
    switch (timer.sound?.toLowerCase()) {
        case 'clock':
            return clock;
        case 'aggressive_clock':
            return aggressive_clock;
        case 'lo_fi':
            return lo_fi;
        case 'japan_eas':
            return japan_eas;
        case 'oversimplified':
            return oversimplified;
        case 'chiptune':
            return chiptune;
        default:
            return clock; // Default sound if no match is found
    }
};

// Function to trigger an alert when a timer finishes. Will later on be replaced with a more sophisticated notification system, with sound and everything
async function triggerAlert(timer: Timer) {

    const sound = getSound(timer);
    console.log(sound)
    sound.play(); // Play the sound for the timer
    timersStore.removeTimer(timer.id); // Stop the timer after alerting

    await showAlert({
        title: 'Timer Finished',
        message: timer.name.length > 0 ? `The timer "${timer.name}" has finished!` : 'Your timer has finished!',
        type: 'info'
    });

    sound.stop(); // Stop the sound after alerting
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
    <Clock v-if="settingsStore.distractions.showClockInTimers" />
    <ul class="timers">
        <ClientOnly>
            <li v-for="timer in timersStore.timers" :key="timer.id" class="timer">
                <div class="timer-headers">
                    <span class="timer-name" v-if="timer.name.length">{{ timer.name }}</span>
                    <span class="timer-time">{{ formatDuration(timersRemaining[timer.id]) }}</span>
                </div>
                <div class="timer-controls" v-if="!isFullscreen || settingsStore.distractions.showTimersControlOnFullscreen">
                    <button class="btn btn-icon" @click="timersStore.resumeTimer(timer.id)">
                        <i class="nf nf-fa-play"></i>
                    </button>
                    <button class="btn btn-icon" @click="timersStore.pauseTimer(timer.id)">
                        <i class="nf nf-fa-pause"></i>
                    </button>
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
    <div v-if="!isFullscreen || settingsStore.distractions.showTimersControlOnFullscreen">
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
                <h4>Sound</h4>
                <select ref="newTimerSoundInput" v-model="newTimerSound" required>
                    <option value="clock">Clock</option>
                    <option value="aggressive_clock">Aggressive Clock</option>
                    <option value="lo_fi">Lo-Fi</option>
                    <option value="japan_eas">Japan EAS</option>
                    <option value="oversimplified">Oversimplified</option>
                    <option value="chiptune">Chiptune</option>
                </select>
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