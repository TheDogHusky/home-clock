<script setup lang="ts">
import type { SettingsPaneContentComponentProps } from "~/types";
import { useSettingsStore } from "~/stores/settings";

defineProps<SettingsPaneContentComponentProps>();
const settingsStore = useSettingsStore();
defineEmits<{
    (e: 'valueUpdate', key: string, value: any): void;
}>();

const showClockInTimers = ref(settingsStore.distractions.showClockInTimers);
const showClockInStopwatch = ref(settingsStore.distractions.showClockInStopwatch);
const showClockInAlarms = ref(settingsStore.distractions.showClockInAlarms);
const showTimersControlsOnFullscreen = ref(settingsStore.distractions.showTimersControlOnFullscreen);
const showStopwatchControlsOnFullscreen = ref(settingsStore.distractions.showStopwatchControlOnFullscreen);
const showAlarmsControlsOnFullscreen = ref(settingsStore.distractions.showAlarmsControlOnFullscreen);
const showDate = ref(settingsStore.distractions.showDate);

watch(settingsStore.distractions, (newSettings) => {
    showClockInTimers.value = newSettings.showClockInTimers;
    showClockInStopwatch.value = newSettings.showClockInStopwatch;
    showClockInAlarms.value = newSettings.showClockInAlarms;
    showTimersControlsOnFullscreen.value = newSettings.showTimersControlOnFullscreen;
    showStopwatchControlsOnFullscreen.value = newSettings.showStopwatchControlOnFullscreen;
    showAlarmsControlsOnFullscreen.value = newSettings.showAlarmsControlOnFullscreen;
    showDate.value = newSettings.showDate;
});
</script>

<template>
    <form class="settings-pane-content-form">
        <div class="form-group">
            <label for="show-clock-in-timers" class="setting-name">
                <span>Show Clock in Timers</span>
                <VTooltip class="info-icon" aria-id="show-clock-in-timers-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will show the clock in the Timers page.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="show-clock-in-timers" v-model="showClockInTimers" @change="$emit('valueUpdate', 'distractions', { showClockInTimers })">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="show-clock-in-stopwatch" class="setting-name">
                <span>Show Clock in Stopwatch</span>
                <VTooltip class="info-icon" aria-id="show-clock-in-stopwatch-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will show the clock in the Stopwatch page.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="show-clock-in-stopwatch" v-model="showClockInStopwatch" @change="$emit('valueUpdate', 'distractions', { showClockInStopwatch })">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="show-clock-in-alarms" class="setting-name">
                <span>Show Clock in Alarms</span>
                <VTooltip class="info-icon" aria-id="show-clock-in-alarms-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will show the clock in the Alarms page.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="show-clock-in-alarms" v-model="showClockInAlarms" @change="$emit('valueUpdate', 'distractions', { showClockInAlarms })">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="show-timers-controls-on-fullscreen" class="setting-name">
                <span>Show Timers Controls on Fullscreen</span>
                <VTooltip class="info-icon" aria-id="show-timers-controls-on-fullscreen-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will show the controls of the timers when in fullscreen mode.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="show-timers-controls-on-fullscreen" v-model="showTimersControlsOnFullscreen" @change="$emit('valueUpdate', 'distractions', { showTimersControlOnFullscreen: showTimersControlsOnFullscreen })">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="show-stopwatch-controls-on-fullscreen" class="setting-name">
                <span>Show Stopwatch Controls on Fullscreen</span>
                <VTooltip class="info-icon" aria-id="show-stopwatch-controls-on-fullscreen-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will show the controls of the stopwatch when in fullscreen mode.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="show-stopwatch-controls-on-fullscreen" v-model="showStopwatchControlsOnFullscreen" @change="$emit('valueUpdate', 'distractions', { showStopwatchControlOnFullscreen: showStopwatchControlsOnFullscreen })">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="show-alarms-controls-on-fullscreen" class="setting-name">
                <span>Show Alarms Controls on Fullscreen</span>
                <VTooltip class="info-icon" aria-id="show-alarms-controls-on-fullscreen-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will show the controls of the alarms when in fullscreen mode.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="show-alarms-controls-on-fullscreen" v-model="showAlarmsControlsOnFullscreen" @change="$emit('valueUpdate', 'distractions', { showAlarmsControlOnFullscreen: showAlarmsControlsOnFullscreen })">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="show-date" class="setting-name">
                <span>Show Date</span>
                <VTooltip class="info-icon" aria-id="show-date-tooltip" placement="bottom">
                    <Icon icon="nf-fa-info"/>
                    <template #popper>
                        Will show the current date in the application alongside the clock.
                    </template>
                </VTooltip>
            </label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="show-date" v-model="showDate" @change="$emit('valueUpdate', 'distractions', { showDate })">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    </form>
</template>