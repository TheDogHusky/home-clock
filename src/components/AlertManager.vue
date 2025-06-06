<script setup lang="ts">
import { useAlertsState } from '~/composables/alerts';
import { resolveAlert } from '~/composables/alerts';

const alerts = useAlertsState();

function handleClose(id: number, result: string) {
    resolveAlert(id, result)
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
                @close="handleClose(alert.id, 'close')"
                @action="val => handleClose(alert.id, val)"
                :type="alert.type"
            />
        </div>
    </Teleport>
</template>