import type { AppearanceSettings } from "~/types";

export const useApplyAppearanceSettings = (appearance: Ref<AppearanceSettings>) => {
    const applySettings = () => {
        console.log("Applying appearance settings:", appearance.value);
        const el = document.body;
        if (!el) return;

        if (appearance.value.clockFontColor && appearance.value.clockFontColor.length > 2) el.style.setProperty("--clock-font-color", appearance.value.clockFontColor);
        else el.style.removeProperty("--clock-font-color");

        if (appearance.value.backgroundColor && appearance.value.backgroundColor.length > 2) el.style.setProperty("--background-color", appearance.value.backgroundColor);
        else el.style.removeProperty("--background-color");
    };

    onMounted(applySettings);
    watch(appearance, applySettings, { deep: true });
};