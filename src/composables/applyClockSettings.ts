import type { ClockSettings } from '~/types';

export const useApplyClockSettings = (clockSettings: Ref<ClockSettings>) => {
    const applySettings = () => {
        const el = document.body;
        if (!el) return;
        el.style.setProperty("--clock-font", "'" + clockSettings.value.font + "'");
        el.style.setProperty("--clock-font-weight", String(clockSettings.value.fontWeight));
        el.style.setProperty("--clock-font-size", `${clockSettings.value.fontSize}px`);
        el.style.setProperty("--clock-font-style", clockSettings.value.fontStyle);
        if (clockSettings.value.color) el.style.setProperty("--clock-font-color", clockSettings.value.color);
    };

    onMounted(applySettings);
    watch(clockSettings, applySettings, { deep: true });
};