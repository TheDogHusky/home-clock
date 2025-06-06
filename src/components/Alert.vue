<script setup lang="ts">
const props = defineProps<{
    type: 'info' | 'warning' | 'error';
    message: string;
    title: string;
    actions?: { label: string; value: string }[];
}>();

const classes = `alert alert-${props.type}`;

defineEmits<{
    (e: 'close'): void
    (e: 'action', value: string): void
}>();
</script>

<template>
    <div class="alert-backdrop" @click="$emit('close')">
        <div
            :class="classes"
            @click.stop
            aria-modal="true"
        >
            <button class="btn btn-icon alert-close-button" @click="$emit('close')">
                <i class="nf nf-fa-times"></i>
            </button>
            <div class="alert-header">
                <h2>{{ title }}</h2>
            </div>
            <div class="alert-content">
                <p>{{ message }}</p>
                <slot name="content"></slot>
            </div>
            <div class="alert-footer">
                <button class="btn btn-primary" @click="$emit('close')">Close</button>
                <button v-for="action in actions" :key="action.value" class="btn btn-secondary" @click="$emit('action', action.value)">
                    {{ action.label }}
                </button>
            </div>
        </div>
    </div>
</template>