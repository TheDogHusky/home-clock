import type { SettingsStore } from '~/types';
import { DateTime } from 'luxon';
import { formatDate } from '~/utils';

export const useClock = (settings: SettingsStore) => {
    const dateTime = ref(DateTime.now());

    // Update the dateTime every second
    onMounted(() => {
        setInterval(() => {
            dateTime.value = DateTime.now();
        }, 1000);
    });

    // Computed property to format the date based on settings
    const formattedDate = computed(() => {
        return formatDate(dateTime.value, settings);
    });

    return {
        dateTime,
        formattedDate
    };
};