<script setup lang="ts">
const props = defineProps<{
    active?: boolean;
}>();

const active = computed(() => props.active ?? false);
</script>

<template>
    <div class="modal-backdrop" :class="{ active }" @click="$emit('close')">
        <div class="modal" :class="{ active }" @click.stop>
            <button class="btn btn-icon modal-close-button" @click="$emit('close')">
                <i class="nf nf-fa-times"></i>
            </button>
            <div class="modal-header">
                <slot name="header"></slot>
            </div>
            <div class="modal-content">
                <slot name="content"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>