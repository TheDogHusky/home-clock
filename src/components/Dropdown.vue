<script setup lang="ts">
const isActive = ref(false);

const toggleDropdown = () => {
    isActive.value = !isActive.value;
};

const classes = computed(() => {
    return {
        'dropdown': true,
        'menu-item': true,
        'active': isActive.value
    };
});

onMounted(() => {
    document.addEventListener('click', () => {
        const target = event.target as HTMLElement;
        if (!target.closest('.dropdown') || target.closest('.dropdown-item')) {
            isActive.value = false;
        }
    });
});
</script>

<template>
    <li :class="classes">
        <slot name="button">
            <IconButton icon="nf-fa-plus" class="dropdown-button" @click="toggleDropdown" />
        </slot>
        <slot name="content">
            <div class="dropdown-content">
                <ul>
                    <li class="dropdown-item">
                        <NuxtLink to="/">
                            <Icon icon="nf-fa-clock" />
                            <span>Clock</span>
                        </NuxtLink>
                    </li>
                    <li class="dropdown-item">
                        <NuxtLink to="/timer">
                            <Icon icon="nf-fa-calendar" />
                            <span>Timer</span>
                        </NuxtLink>
                    </li>
                    <li class="dropdown-item">
                        <NuxtLink to="/stopwatch">
                            <Icon icon="nf-fa-stopwatch" />
                            <span>Stopwatch</span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </slot>
    </li>
</template>