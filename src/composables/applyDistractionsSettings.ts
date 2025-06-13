import type { DistractionsSettings } from "~/types";

export const useApplyDistractionsSettings = (distractions: Ref<DistractionsSettings>) => {
    const applySettings = () => {

    };

    onMounted(applySettings);
    watch(distractions, applySettings, { deep: true });
};