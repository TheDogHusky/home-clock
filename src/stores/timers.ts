import { defineStore } from 'pinia';
import { getTimerTime } from '~/utils';

export const useTimersStore = defineStore('timers', {
    state: () => ({
        timers: [] as Array<{
            id: string;
            name: string;
            duration: number; // in seconds
            startTime: number; // timestamp when the timer started
            isActive: boolean; // whether the timer is currently running
        }>
    }),
    actions: {
        addTimer(name: string, duration: number) {
            const newTimer = {
                id: crypto.randomUUID(),
                name,
                duration,
                startTime: Date.now(),
                isActive: true
            };
            this.timers.push(newTimer);
        },
        removeTimer(id: string) {
            this.timers = this.timers.filter(timer => timer.id !== id);
        },
        toggleTimer(id: string) {
            const timer = this.timers.find(timer => timer.id === id);
            if (timer) {
                timer.isActive = !timer.isActive;
                if (timer.isActive) {
                    timer.startTime = Date.now();
                }
            }
        },
        watchTimer(id: string) {
            const timer = this.timers.find(timer => timer.id === id);
            if (timer) {
                return {
                    ...timer,
                    ...getTimerTime(timer.startTime, timer.duration)
                };
            }
            return null;
        }
    },
    persist: true
});