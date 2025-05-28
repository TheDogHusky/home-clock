<script setup lang="ts">
const props = defineProps<{
    active: boolean;
}>();
const route = useRoute();

const active = ref(props.active);

watch(() => props.active, (newValue) => {
    active.value = newValue;
});

const classes = computed(() => {
    return {
        'settings-pane': true,
        'active': active.value
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
                <NuxtLink :to="route.path + '?settingsPaneCategory=general'" class="settings-pane-link">
                    <Icon icon="nf-fa-cog" />
                    <span>General</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="route.path + '?settingsPaneCategory=appearence'" class="settings-pane-link">
                    <Icon icon="nf-fa-cog" />
                    <span>Appearence</span>
                </NuxtLink>
            </li>
        </ul>
        <div class="settings-pane-content">
            <h2>Coming soon..</h2>
        </div>
    </section>
</template>