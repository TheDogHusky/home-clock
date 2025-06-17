import { defineStore } from 'pinia';
import type { SettingsStoreActions, SettingsStoreGetters, SettingsStoreStates } from '~/types';

export const useSettingsStore = defineStore<"settings", SettingsStoreStates, SettingsStoreGetters, SettingsStoreActions>('settings', {
    state: () => ({
        theme: 'system',
        clock: {
            format: '24-hour',
            font: 'default',
            fontSize: 160,
            fontWeight: 'bold',
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
            showClockInStopwatch: false,
            showClockInAlarms: true,
            showTimersControlOnFullscreen: false,
            showStopwatchControlOnFullscreen: true,
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
        },
        set<K extends keyof SettingsStoreStates | string>(key: K, value: SettingsStoreStates[K]) {
            if (key in this) {
                // if the key refers to an object, we need to update only the specific property
                if (typeof this[key] === 'object' && this[key] !== null && typeof value === 'object') {
                    Object.assign(this[key], value);
                    return;
                }
                // otherwise, we can directly set the value
                (this as any)[key] = value;
            } else {
                console.warn(`Key "${key}" does not exist in settings store.`);
            }
        }
    },
    getters: {
        isDarkTheme: (state) => state.theme === 'dark',
        isLightTheme: (state) => state.theme === 'light',
    },
    persist: true
});