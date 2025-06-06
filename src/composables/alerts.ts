import type { AlertProps, AlertInstance } from '@/types';

export function useAlertsState() {
    return useState<AlertInstance[]>('alerts', () => [])
}

let idCounter = 0;
const resolvers = new Map<number, (value: string) => void>();

export const useAlert = () => {
    const alerts = useState<AlertInstance[]>('alerts', () => []);

    return (options: AlertProps): Promise<string> => {
        return new Promise(resolve => {
            const id = idCounter++;
            resolvers.set(id, resolve);
            alerts.value.push({ id, ...options });
        });
    }
}

export function resolveAlert(id: number, result: string) {
    const alerts = useState<AlertInstance[]>('alerts', () => []);
    alerts.value = alerts.value.filter(a => a.id !== id);

    const resolver = resolvers.get(id);
    if (resolver) {
        resolver(result);
        resolvers.delete(id);
    }
}