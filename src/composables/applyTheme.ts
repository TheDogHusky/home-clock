import type { Theme } from "~/types";

export const useApplyThemeSettings = (theme: Ref<Theme>) => {
    const applySettings = () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        document.documentElement.setAttribute(
            'data-theme',
            theme.value === 'system' ? (prefersDark ? 'dark' : 'light') : theme.value
        );
    };

    onMounted(applySettings);
    watch(theme, applySettings);
};