import { defineStore } from 'pinia';
import { getTimerTime } from '~/utils';
import type { TimerStoreActions, TimerStoreGetters, TimerStoreStates } from '~/types';

export const useTimersStore = defineStore<'timers', TimerStoreStates, TimerStoreGetters, TimerStoreActions>('timers', {
    state: () => ({
        timers: []
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
        },
        resetTimer(id: string) {
            const timer = this.timers.find(timer => timer.id === id);
            if (timer) {
                timer.startTime = Date.now();
                timer.isActive = true;
            }
        }
    },
    persist: true
});