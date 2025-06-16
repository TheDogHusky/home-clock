import type { _GettersTree, Store } from 'pinia';

declare global {
    interface Window {
        setSetting: (key: keyof SettingsStoreStates, value: any) => void;
    }
}

/**
 * ClockFormats from Luxon, as they do not define all available formats in their types.
 */
export type ClockFormat =
    | 'TIME_SIMPLE' // 12-hour format with AM/PM
    | 'TIME_WITH_SECONDS' // 24-hour format
    | 'TIME_WITH_SHORT_OFFSET' // Simple date format (e.g., MM/DD/YYYY)
    | 'TIME_WITH_LONG_OFFSET' // Long date format (e.g., Month Day, Year)
    | 'DATETIME_SHORT' // Simple date and time format
    | 'DATETIME_SHORT_WITH_SECONDS' // Short date and time format with seconds
    | 'DATETIME_MED' // Medium date and time format
    | 'DATETIME_MED_WITH_SECONDS' // Medium date and time format with seconds
    | 'DATETIME_FULL' // Long date and time format
    | 'DATETIME_FULL_WITH_SECONDS' // Long date and time format with seconds
    | string;

export type Theme = 'dark' | 'light' | 'system' | string;

// SettingsStore definitions

/**
 * Settings related to the clock display.
 */
export interface ClockSettings {
    /**
     * The format of the clock display.
     * Can be '12-hour', '24-hour', or a custom Luxon format defined in the customLuxonFormat setting.
     */
    format: ClockFormat;
    /**
     * The font used for the clock display.
     */
    font: string;
    /**
     * The font size for the clock display.
     */
    fontSize: number;
    /**
     * The font weight for the clock display.
     */
    fontWeight: number;
    /**
     * The font style for the clock display.
     * Can be 'normal' or 'italic'.
     */
    fontStyle: 'normal' | 'italic';
    /**
     * Whether to show seconds in the clock display.
     */
    showSeconds: boolean;
    /**
     * Whether to enable a custom Luxon format for the clock display.
     */
    enableCustomLuxonFormat: boolean;
    /**
     * The custom Luxon format string for the clock display.
     * This is used when enableCustomLuxonFormat is true.
     */
    customLuxonFormat: ClockFormat;
}

/**
 * Settings related to the appearance of the application.
 */
export interface AppearanceSettings {
    /**
     * The background color of the application.
     */
    backgroundColor: string;
    /**
     * The font color for the clock display.
     */
    clockFontColor: string;
}

/**
 * Settings related to distractions and controls in the application.
 */
export interface DistractionsSettings {
    /**
     * Whether to show the clock in the timers page.
     */
    showClockInTimers: boolean;
    /**
     * Whether to show the clock in the stopwatch page.
     */
    showClockInStopwatch: boolean;
    /**
     * Whether to show the clock in the alarms page.
     */
    showClockInAlarms: boolean;
    /**
     * Whether to show the timer controls when the application is in fullscreen mode.
     */
    showTimersControlOnFullscreen: boolean;
    /**
     * Whether to show the stopwatch controls when the application is in fullscreen mode.
     */
    showStopwatchControlOnFullscreen: boolean;
    /**
     * Whether to show the alarms controls when the application is in fullscreen mode.
     */
    showAlarmsControlOnFullscreen: boolean;
    /**
     * Whether to show the date alongside the clock.
     */
    showDate: boolean;
}

/**
 * SettingsStoreStates defines the structure of the settings state in the application following Pinia.
 */
export interface SettingsStoreStates {
    /**
     * The current theme of the application.
     */
    theme: Theme;
    clock: ClockSettings;
    appearance: AppearanceSettings
    distractions: DistractionsSettings

    [key: string]: any;
}

export type SettingsStore =  Store<"settings", SettingsStoreStates, SettingsStoreGetters, SettingsStoreActions>;

/**
 * SettingsStoreActions defines the actions available in the SettingsStore.
 */
export interface SettingsStoreActions {
    /**
     * Sets the theme of the application.
     * @param newTheme - The new theme to set, which can be 'dark' or 'light'
     */
    setTheme: (newTheme: Theme) => void;
    /**
     * Toggles the current theme between 'dark' and 'light'.
     */
    toggleTheme: () => void;
    set: <K extends keyof SettingsStoreStates>(key: K, value: SettingsStoreStates[K]) => void;
}

/**
 * SettingsStoreGetters defines the getters available in the SettingsStore.
 */
export interface SettingsStoreGetters extends _GettersTree<SettingsStoreStates> {
    /**
     * Checks if the current theme is 'dark'.
     * @returns true if the theme is 'dark', false otherwise.
     */
    isDarkTheme: (state: SettingsStoreStates) => boolean;
    /**
     * Checks if the current theme is 'light'.
     * @returns true if the theme is 'light', false otherwise.
     */
    isLightTheme: (state: SettingsStoreStates) => boolean;
}

// TimerStore definitions

/**
 * Timer interface defines the structure of a timer object.
 */
export interface Timer {
    id: string;
    name: string;
    duration: number; // in seconds
    startTime: number; // timestamp when the timer started
    isActive: boolean; // whether the timer is currently running
}

/**
 * TimerStoreStates defines the structure of the timer state in the application following Pinia.
 */
export interface TimerStoreStates {
    /**
     * An array of timers currently managed by the application.
     */
    timers: Timer[];
}

/**
 * TimerStoreActions defines the actions available in the TimerStore.
 */
export interface TimerStoreActions {
    /**
     * Adds a new timer with the specified name and duration.
     * @param name - The name of the timer.
     * @param duration - The duration of the timer in seconds.
     */
    addTimer: (name: string, duration: number) => void;
    /**
     * Removes a timer by its ID.
     * @param id - The ID of the timer to remove.
     */
    removeTimer: (id: string) => void;
    /**
     * Toggles the active state of a timer by its ID.
     * If the timer is active, it will be paused; if it is paused, it will be resumed.
     * @param id - The ID of the timer to toggle.
     */
    toggleTimer: (id: string) => void;
    /**
     * Watches a timer by its ID and returns its current state, including remaining time and elapsed time.
     * @param id - The ID of the timer to watch.
     * @returns The current state of the timer, or null if the timer does not exist.
     */
    watchTimer: (id: string) => (Timer & GetTimerTimeResult) | null;
    /**
     * Resets a timer by its ID, setting its start time to the current time and marking it as active.
     * @param id - The ID of the timer to reset.
     */
    resetTimer: (id: string) => void;
}

/**
 * TimerStoreGetters defines the getters available in the TimerStore.
 */
export interface TimerStoreGetters extends _GettersTree<TimerStoreStates> {}

export type TimerStore = Store<'timers', TimerStoreStates, TimerStoreGetters, TimerStoreActions>;

export type GetTimerTimeResult = {
    remaining: number; // Remaining time in seconds
    elapsed: number; // Elapsed time in seconds
}

// Alerts definitions

/**
 * Props passed to the Alert component.
 */
export interface AlertProps {
    type: 'info' | 'warning' | 'error';
    message: string;
    title: string;
    actions?: { label: string; value: string }[];
}

/**
 * AlertOptions extends AlertProps and includes a resolve function for handling the AlertManager logic.
 */
export interface AlertInstance extends AlertProps {
    id: number;
}

// Other types
export interface SettingsPaneContentComponentProps {
    currentCategory: string;
}