import { defineStore } from 'pinia';
import type { ClockFormat, Theme } from '~/types';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        theme: 'dark' as Theme, // Default theme
        clockFormat: 'TIME_SIMPLE' as ClockFormat, // Default clock format
        locale: 'en-US', // Default locale
        clockFont: 'Source Code Pro', // Default clock font
        clockFontSize: 85, // Default clock font size
        clockFontWeight: 'normal' as 'normal' | 'bold', // Default clock font weight
        clockFontStyle: 'normal' as 'normal' | 'italic', // Default clock font style
        clockFontColor: '#ffffff', // Default clock font color
        backgroundColor: 'var(--background-color)', // Default background color
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