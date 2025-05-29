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
    console.log('currentCategory.value', currentCategory.value, 'category', category);
    return {
        'settings-pane-link': true,
        'active': currentCategory.value === category
    };
});

// TODO fix the router exact path to also match query
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
                <NuxtLink :to="route.path + '?settingsPaneCategory=appearence'" :class="settingsPaneActiveLinkClasses('appearence').value">
                    <Icon icon="nf-fa-palette" />
                    <span>Appearence</span>
                </NuxtLink>
            </li>
        </ul>
        <div class="settings-pane-content">
            <h2>Coming soon..</h2>
        </div>
    </section>
</template>