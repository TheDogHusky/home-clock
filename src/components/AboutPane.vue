<script setup lang="ts">
const config = useRuntimeConfig();

const props = defineProps<{
    active: boolean;
}>();

const active = ref(props.active);
const usingCredits = ref(false);

watch(() => props.active, (newValue) => {
    active.value = newValue;
});

function triggerCredits() {
    usingCredits.value = !usingCredits.value;
}
</script>

<template>
    <div v-if="!usingCredits" class="about-pane" :class="{ active }">
        <button class="btn btn-icon about-pane-close-btn" @click="$emit('close')">
            <Icon icon="nf-fa-times" />
        </button>
        <h2>About Home-Clock</h2>
        <div class="about-pane-content">
            <p>
                Home-Clock is a simple, focus-driven, minimalistic and customizable clock web application designed to help you keep track of time without distractions. It features a clean interface, multiple clock styles, and various timekeeping functionalities such as a timer and stopwatch, alongside almost full customization of what is shown on screen, giving you the possibility to remove anything you don't need and focus on what matters most to you.
            </p>
            <p>
                It has been built by Adam Billard, and is fully open source.
            </p>
            <button @click="triggerCredits" class="credits-button">Credits</button>
        </div>
        <div class="about-pane-footer">
            <a href="https://github.com/TheDogHusky/home-clock" target="_blank">GitHub</a>
            <p>Version {{ config.public.version }}</p>
            <p>Alarms by <a href="https://pixabay.com" target="_blank">Pixabay</a> (<span class="credits-button" @click="triggerCredits">more</span>)</p>
        </div>
    </div>
    <div v-else class="about-pane credits" :class="{ active }">
        <button class="btn btn-icon about-pane-close-btn" @click="triggerCredits">
            <Icon icon="nf-fa-times" />
        </button>
        <h2>Credits</h2>
        <div class="about-pane-content">
            <p>
                Home-Clock uses the following libraries and resources:
            </p>
            <ul>
                <li><a href="https://vuejs.org" target="_blank">Vue.js</a> - The JavaScript framework used to build this application.</li>
                <li><a href="https://nuxt.com" target="_blank">Nuxt.js</a> - The framework for building Vue.js applications.</li>
                <li><a href="https://pinia.vuejs.org/" target="_blank">Pinia</a> - The library responsible for holding states such as settings.</li>
                <li><a href="https://pixabay.com" target="_blank">Pixabay</a> - For providing free audio files for the projects.</li>
                <li>More on our <a href="https://github.com/TheDogHusky/home-clock/blob/master/package.json" target="_blank">package.json</a></li>
            </ul>
            <p>
                Here are the alarms used:
            </p>
            <ul>
                <li>"Oversimplified" by <a target="_blank" href="https://pixabay.com/users/lesiakower-25701529/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=113180">Lesiakower</a></li>
                <li>"Chiptune" by <a target="_blank" href="https://pixabay.com/users/lesiakower-25701529/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=113180">Lesiakower</a></li>
                <li>"Japan EAS" by <a target="_blank" href="https://pixabay.com/users/jeremayjimenez-28887262/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=277877">Jeremay Jimenez</a></li>
                <li>"Lo-Fi" by <a target="_blank" href="https://pixabay.com/users/lesiakower-25701529/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=113180">Lesiakower</a></li>
                <li>"Aggressive Clock" by <a target="_blank" href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=90867">freesound_community</a></li>
                <li>"Clock" by <a target="_blank" href="https://pixabay.com/users/u_inx5oo5fv3-49729779/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=327234">u_inx5oo5fv3</a></li>
            </ul>
            <p>
                Home-Clock is licensed under the <a href="https://github.com/TheDogHusky/home-clock/blob/master/LICENSE" target="_blank">GNU-GPL-3.0 License</a>.
            </p>
            <p>
                If you have any questions or suggestions, feel free to open an issue on the <a href="https://github.com/TheDogHusky/home-clock/issues" target="_blank">GitHub repository</a>.
            </p>
            <p>
                Thank you for using Home-Clock!
            </p>
            <button class="btn btn-primary w-fit-content" @click="triggerCredits">Close</button>
        </div>
        <div class="about-pane-footer">
            <p>Version {{ config.public.version }}</p>
        </div>
    </div>
</template>