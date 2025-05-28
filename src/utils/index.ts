import type { ClockFormat } from '~/types';
import { DateTime } from 'luxon';

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

export const getFormatOptions = (format: ClockFormat): Intl.DateTimeFormatOptions => {
    return dateTimeFormatMap[format as keyof typeof dateTimeFormatMap] ?? DateTime.TIME_SIMPLE;
};