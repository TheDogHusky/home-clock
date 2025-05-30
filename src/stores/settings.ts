import { defineStore } from 'pinia';
import type { Theme } from '~/types';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        theme: 'dark' as Theme, // Default theme
        clock: { // Clock settings
            format: '24-hour' as '12-hour' | '24-hour', // Default clock format
            font: 'Source Code Pro', // Default clock font
            fontSize: 85, // Default clock font size
            fontWeight: 600 as number, // Default clock font weight
            fontStyle: 'normal' as 'normal' | 'italic', // Default clock font style
            showSeconds: true, // Show seconds in the clock
            customLuxonFormat: '' // Custom Luxon format for the clock
        },
        appearance: { // Appearance settings
            backgroundColor: 'var(--background-color)', // Default background color
            clockFontColor: '', // Default clock font color
        },
        distractions: {
            showClockInTimers: true, // Show clock in the timers page
            showClockInStopwatch: true, // Show clock in the stopwatch page
            showClockInAlarms: true, // Show clock in the alarms page
            showTimersControlOnFullscreen: true, // Show the timers controls when the app is in fullscreen mode
            showStopwatchControlOnFullscreen: true, // Show the stopwatch controls when the app is in fullscreen mode
            showAlarmsControlOnFullscreen: true, // Show the alarms controls when the app is in fullscreen mode
            showDate: true, // Show date in all pages on top of the clock
        }, // Distractions settings
    }),
    actions: {
        setTheme(newTheme: string) {
            if (newTheme === 'dark' || newTheme === 'light') {
                this.theme = newTheme;
            } else {
                console.warn('Invalid theme:', newTheme);
            }
        },
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
        }
    },
    getters: {
        isDarkTheme: (state) => state.theme === 'dark',
        isLightTheme: (state) => state.theme === 'light',
    },
    persist: true
});