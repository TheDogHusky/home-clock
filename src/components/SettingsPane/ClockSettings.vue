<script setup lang="ts">
import type { SettingsPaneContentComponentProps } from "~/types";
import { useSettingsStore } from "~/stores/settings";

const props = defineProps<SettingsPaneContentComponentProps>();
const emits = defineEmits<{
    (e: 'valueUpdate', key: string, value: any): void;
}>();
const settingsStore = useSettingsStore();

const format = ref(settingsStore.clock.format === '24-hour');
const showSeconds = ref(settingsStore.clock.showSeconds);
const enableCustomFormat = ref(settingsStore.clock.enableCustomLuxonFormat);
const font = ref(settingsStore.clock.font);
const fontSize = ref(settingsStore.clock.fontSize);
const fontWeight = ref(settingsStore.clock.fontWeight);
const fontStyle = ref(settingsStore.clock.fontStyle);
const customLuxonFormat = ref(settingsStore.clock.customLuxonFormat);

watch(settingsStore.clock, (newSettings) => {
    format.value = newSettings.format === '24-hour';
    showSeconds.value = newSettings.showSeconds;
    enableCustomFormat.value = newSettings.enableCustomLuxonFormat;
    font.value = newSettings.font;
    fontSize.value = newSettings.fontSize;
    fontWeight.value = newSettings.fontWeight;
    fontStyle.value = newSettings.fontStyle;
    customLuxonFormat.value = newSettings.customLuxonFormat;
});

function handleFormatChange(event: Event) {
    const newFormat = format.value === true ? '24-hour' : '12-hour';
    emits('valueUpdate', 'clock', { format: newFormat });
}
</script>

<template>
    <form class="settings-pane-content-form" @submit.prevent>
        <div class="form-group">
            <label for="format">Use 24-hours format</label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="format" v-model="format" @change="handleFormatChange">
                    <span class="slider"></span>
                </label>
                <VTooltip aria-id="format-tooltip" placement="bottom">
                    <IconButton
                        icon="nf-fa-info"
                        variant="light"
                    />
                    <template #popper>
                        Will change the format of the clock displayed on the application. You can choose between 12-hour and 24-hour formats.
                    </template>
                </VTooltip>
            </div>
        </div>
        <div class="form-group">
            <label for="show-seconds">Show Seconds</label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="show-seconds" v-model="showSeconds" @change="$emit('valueUpdate', 'clock', { showSeconds })">
                    <span class="slider"></span>
                </label>
                <VTooltip aria-id="show-seconds-tooltip" placement="bottom">
                    <IconButton
                        icon="nf-fa-info"
                        variant="light"
                    />
                    <template #popper>
                        Will enable or disable the display of seconds in the clock. If enabled, the clock will show seconds in addition to hours and minutes.
                    </template>
                </VTooltip>
            </div>
        </div>
        <div class="form-group">
            <label for="enable-luxon-custom-format">Enable Custom Clock Format</label>
            <div class="form-group-item">
                <label class="switch">
                    <input type="checkbox" id="enable-luxon-custom-format" v-model="enableCustomFormat" @change="$emit('valueUpdate', 'clock', { enableCustomLuxonFormat: enableCustomFormat })">
                    <span class="slider"></span>
                </label>
                <VTooltip aria-id="enable-luxon-custom-format-tooltip" placement="bottom">
                    <IconButton
                        icon="nf-fa-info"
                        variant="light"
                    />
                    <template #popper>
                        Enables the use of a custom Luxon format for the clock. If enabled, you can specify your own format string in the input below.
                    </template>
                </VTooltip>
            </div>
        </div>
        <div class="form-group" :class="{ disabled: !enableCustomFormat }">
            <label for="luxon-custom-format">Custom Clock Format <a target="_blank" href="https://moment.github.io/luxon/#/formatting?id=presets">Documentation</a></label>
            <div class="form-group-item">
                <input type="text" placeholder="TIME_24_SIMPLE" id="luxon-custom-format" v-model="customLuxonFormat" @change="$emit('valueUpdate', 'clock', { enableCustomLuxonFormat: enableCustomFormat })">

                <VTooltip aria-id="luxon-custom-format-tooltip" placement="bottom">
                    <IconButton
                        icon="nf-fa-info"
                        variant="light"
                    />
                    <template #popper>
                        Allows you to specify a custom Luxon format for the clock. You can use any valid Luxon format string, such as "TIME_24_SIMPLE" or "TIME_12_WITH_SECONDS". See <a href="https://moment.github.io/luxon/#/formatting?id=presets" target="_blank" rel="noopener noreferrer">Luxon documentation</a> for more details.
                    </template>
                </VTooltip>
            </div>
        </div>
        <div class="form-group">
            <label for="clock-font">Clock Font</label>
            <div class="form-group-item">
                <select id="clock-font" v-model="font" @change="$emit('valueUpdate', 'clock', { font })">
                    <option value="default">Default</option>
                    <option value="monospace">Monospace</option>
                    <option value="sans-serif">Sans-serif</option>
                    <option value="serif">Serif</option>
                    <option value="Source Code Pro">Source Code Pro</option>
                    <option value="Source Sans 3">Source Sans 3</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Arial">Arial</option>
                    <option value="Roboto Mono">Roboto Mono</option>
                </select>

                <VTooltip aria-id="clock-font-tooltip" placement="bottom">
                    <IconButton
                        icon="nf-fa-info"
                        variant="light"
                    />
                    <template #popper>
                        Will change the font of the clock displayed on the application. You can choose from a variety of fonts, including default, monospace, sans-serif, serif, and popular web fonts like Source Code Pro, Source Code Sans, and Roboto.
                    </template>
                </VTooltip>
            </div>
        </div>
        <div class="form-group">
            <label for="clock-font-size">Clock Font Size</label>
            <div class="form-group-item">
                <input type="number" id="clock-font-size" v-model="fontSize" @change="$emit('valueUpdate', 'clock', { fontSize })" min="10" max="200" step="1">
                <VTooltip aria-id="clock-font-size-tooltip" placement="bottom">
                    <IconButton
                        icon="nf-fa-info"
                        variant="light"
                    />
                    <template #popper>
                        Will change the font size of the clock displayed on the application. You can specify a value between 10 and 100 pixels.
                    </template>
                </VTooltip>
            </div>
        </div>
        <div class="form-group">
            <label for="clock-font-weight">Clock Font Weight</label>
            <div class="form-group-item">
                <select id="clock-font-weight" v-model="fontWeight" @change="$emit('valueUpdate', 'clock', { fontWeight })">
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="bolder">Bolder</option>
                    <option value="lighter">Lighter</option>
                </select>
                <VTooltip aria-id="clock-font-weight-tooltip" placement="bottom">
                    <IconButton
                        icon="nf-fa-info"
                        variant="light"
                    />
                    <template #popper>
                        Will change the font weight of the clock displayed on the application. You can choose from normal, bold, bolder, and lighter font weights.
                    </template>
                </VTooltip>
            </div>
        </div>
        <div class="form-group">
            <label for="clock-font-style">Clock Font Style</label>
            <div class="form-group-item">
                <select id="clock-font-style" v-model="fontStyle" @change="$emit('valueUpdate', 'clock', { fontStyle })">
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                    <option value="oblique">Oblique</option>
                </select>
                <VTooltip aria-id="clock-font-style-tooltip" placement="bottom">
                    <IconButton
                        icon="nf-fa-info"
                        variant="light"
                    />
                    <template #popper>
                        Will change the font style of the clock displayed on the application. You can choose from normal, italic, and oblique font styles.
                    </template>
                </VTooltip>
            </div>
        </div>
    </form>
</template>