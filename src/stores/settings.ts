import { defineStore } from 'pinia';
import type { SettingsStoreActions, SettingsStoreGetters, SettingsStoreStates } from '~/types';

export const useSettingsStore = defineStore<"settings", SettingsStoreStates, SettingsStoreGetters, SettingsStoreActions>('settings', {
    state: () => ({
        theme: 'system',
        clock: {
            format: '24-hour',
            font: 'Source Code Pro',
            fontSize: 85,
            fontWeight: 600,
            fontStyle: 'normal',
            showSeconds: false,
            enableCustomLuxonFormat: false,
            customLuxonFormat: ''
        },
        appearance: {
            backgroundColor: '',
            clockFontColor: '',
        },
        distractions: {
            showClockInTimers: true,
            showClockInStopwatch: true,
            showClockInAlarms: true,
            showTimersControlOnFullscreen: false,
            showStopwatchControlOnFullscreen: false,
            showAlarmsControlOnFullscreen: false,
            showDate: false,
        }
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