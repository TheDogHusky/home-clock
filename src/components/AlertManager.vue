<script setup lang="ts">
interface AlertOptions {
    title: string
    message: string
    actions?: { label: string; value: string }[]
    type: 'info' | 'warning' | 'error'
    resolve: (value: any) => void
}

// Initialize an array to hold active alerts
const alerts = ref<AlertOptions[]>([])

// We should parse the options to ensure they have default values
function parseOptions(options: Omit<AlertOptions, 'resolve'>): AlertOptions {
    return {
        title: options.title,
        message: options.message,
        actions: options.actions,
        type: options.type || 'info',
        resolve: () => {} // Placeholder, will be set when showAlert is called
    }
}

// Show an alert with the given options
function showAlert(options: Omit<AlertOptions, 'resolve'>) {
    // We return a promise that resolves when the alert is closed or any action button is pressed
    return new Promise(resolve => {
        alerts.value.push({ ...parseOptions(options), resolve });
    });
}

defineExpose({ showAlert });

// Close an alert and send a result back to the caller
function closeAlert(alert: AlertOptions, result: any) {
    alerts.value = alerts.value.filter(a => a !== alert)
    alert.resolve(result)
}
</script>

<template>
    <Teleport to="body">
        <div class="alert-container">
            <Alert
                v-for="alert in alerts"
                :key="alert.title + alert.message"
                :title="alert.title"
                :message="alert.message"
                :actions="alert.actions"
                @close="closeAlert(alert, 'close')"
                @action="val => closeAlert(alert, val)"
                :type="alert.type"
            />
        </div>
    </Teleport>
</template>