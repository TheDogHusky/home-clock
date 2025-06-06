import { getCurrentInstance } from 'vue';

export const useAlert = () => {
    const vm = getCurrentInstance();
    const app = vm?.appContext.app;
    const alertManager = app?.config.globalProperties.$alertManager;

    if (!alertManager) throw new Error('AlertManager not mounted.');

    return alertManager.showAlert;
}