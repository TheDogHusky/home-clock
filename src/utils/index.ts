import type { ClockFormat } from '~/types';
import { DateTime } from 'luxon';
import type { SettingsStore } from '~/types';

// Define the mapping of ClockFormat to Luxon DateTime format options, as luxon does not provide a direct mapping
export const dateTimeFormatMap: Record<Exclude<ClockFormat, string>, Intl.DateTimeFormatOptions> = {
    TIME_SIMPLE: DateTime.TIME_SIMPLE,
    TIME_WITH_SECONDS: DateTime.TIME_WITH_SECONDS,
    TIME_WITH_SHORT_OFFSET: DateTime.TIME_WITH_SHORT_OFFSET,
    TIME_WITH_LONG_OFFSET: DateTime.TIME_WITH_LONG_OFFSET,
    DATETIME_SHORT: DateTime.DATETIME_SHORT,
    DATETIME_SHORT_WITH_SECONDS: DateTime.DATETIME_SHORT_WITH_SECONDS,
    DATETIME_MED: DateTime.DATETIME_MED,
    DATETIME_MED_WITH_SECONDS: DateTime.DATETIME_MED_WITH_SECONDS,
    DATETIME_FULL: DateTime.DATETIME_FULL,
    DATETIME_FULL_WITH_SECONDS: DateTime.DATETIME_FULL_WITH_SECONDS,
};

/**
 * Gets the Intl.DateTimeFormatOptions based on the provided ClockFormat from luxon.
 * @param format - The ClockFormat to get the options for.
 * @return The Intl.DateTimeFormatOptions corresponding to the ClockFormat.
 */
export const getFormatOptions = (format: ClockFormat): Intl.DateTimeFormatOptions => {
    return dateTimeFormatMap[format as keyof typeof dateTimeFormatMap] ?? DateTime.TIME_SIMPLE;
};

/**
 * Gets a luxon DateTime format based on the user's clock format settings.
 * @param settings - The user's settings from the SettingsStore.
 * @return A ClockFormat value that corresponds to the user's clock format settings.
 */
export const getClockFormat = (settings: SettingsStore): ClockFormat => {
    const settingsFormat = settings.clock.format; // "24-hour" or "12-hour" format
    const showSeconds = settings.clock.showSeconds; // Whether to show seconds in the clock

    // Determine the ClockFormat based on the settings
    if (settings.clock.customLuxonFormat) {
        return settings.clock.customLuxonFormat as ClockFormat;
    }

    if (settingsFormat === '24-hour') {
        return showSeconds ? 'TIME_24_WITH_SECONDS' : 'TIME_24_SIMPLE';
    } else if (settingsFormat === '12-hour') {
        return showSeconds ? 'TIME_WITH_SECONDS' : 'TIME_SIMPLE';
    }

    // Default to a simple time format if no valid format is found
    return 'TIME_SIMPLE';
};

/**
 * Formats a Luxon DateTime object based on the user's settings.
 * @param date - The Luxon DateTime object to format.
 * @param settings - The user's settings from the SettingsStore.
 * @return A formatted date string based on the specified clock format in the settings.
 */
export const formatDate = (date: DateTime, settings: SettingsStore): string => {
    const clockFormat = getClockFormat(settings);
    const formatOptions = getFormatOptions(clockFormat);

    // Use Luxon's toLocaleString method to format the date
    return date.toLocaleString(formatOptions);
};