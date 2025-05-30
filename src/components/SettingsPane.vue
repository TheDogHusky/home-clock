<script setup lang="ts">
const props = defineProps<{
    active: boolean;
}>();
const route = useRoute();

const active = ref(props.active);
const currentCategory = ref(route.query.settingsPaneCategory || 'general');

watch(() => props.active, (newValue) => {
    active.value = newValue;
});
watch(() => route.query.settingsPaneCategory, (newValue) => {
    currentCategory.value = newValue || 'general';
});

const classes = computed(() => {
    return {
        'settings-pane': true,
        'active': active.value
    };
});

const settingsPaneActiveLinkClasses = (category: string) => computed(() => {
    return {
        'settings-pane-link': true,
        'active': currentCategory.value === category
    };
});
</script>
<template>
    <section :class="classes">
        <IconButton
            icon="nf-fa-times"
            @click="$emit('close')"
            class="settings-pane-close-button"
        />
        <ul class="settings-pane-sidebar">
            <li>
                <NuxtLink :to="route.path + '?settingsPaneCategory=general'" :class="settingsPaneActiveLinkClasses('general').value">
                    <Icon icon="nf-fa-cog" />
                    <span>General</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="route.path + '?settingsPaneCategory=appearance'" :class="settingsPaneActiveLinkClasses('appearance').value">
                    <Icon icon="nf-fa-palette" />
                    <span>Appearance</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="route.path + '?settingsPaneCategory=clock'" :class="settingsPaneActiveLinkClasses('clock').value">
                    <Icon icon="nf-fa-clock" />
                    <span>Clock</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="route.path + '?settingsPaneCategory=distractions'" :class="settingsPaneActiveLinkClasses('distractions').value">
                    <Icon icon="nf-fa-eye" />
                    <span>Distractions</span>
                </NuxtLink>
            </li>
        </ul>
        <div class="settings-pane-content">
            <h2>Coming soon..</h2>
        </div>
    </section>
</template>