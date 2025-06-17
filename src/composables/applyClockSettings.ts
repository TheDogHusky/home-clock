import type { ClockSettings } from '~/types';

export const useApplyClockSettings = (clockSettings: Ref<ClockSettings>) => {
    const applySettings = () => {
        const el = document.body;
        if (!el) return;
        if (clockSettings.value.font !== "default") el.style.setProperty("--clock-font", "'" + clockSettings.value.font + "'");
        el.style.setProperty("--clock-font-weight", "'" + clockSettings.value.fontWeight + "'");
        el.style.setProperty("--clock-font-size", `${clockSettings.value.fontSize}px`);
        el.style.setProperty("--clock-font-style", clockSettings.value.fontStyle);
    };

    onMounted(applySettings);
    watch(clockSettings, applySettings, { deep: true });
};