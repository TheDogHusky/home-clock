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

export type Theme = 'dark' | 'light' | string;

export interface SettingsStore {
    theme: Theme;
    clock: {
        format: ClockFormat;
        font: string;
        fontSize: number;
        fontWeight: number;
        fontStyle: 'normal' | 'italic';
        showSeconds: boolean;
        customLuxonFormat: string;
    };
    appearance: {
        backgroundColor: string;
        clockFontColor: string;
    };
    distractions: {
        showClockInTimers: boolean;
        showClockInStopwatch: boolean;
        showClockInAlarms: boolean;
        showTimersControlOnFullscreen: boolean;
        showStopwatchControlOnFullscreen: boolean;
        showAlarmsControlOnFullscreen: boolean;
    };
}