<template>
<div class="background-container">
    <div class="player-control-container">
        <div class="top-action-bar">
            <div class="left-action-group">
            </div>
            <div class="middle-action-group">
                <div class="action-button rewind-icon" role="button" title="Rewind 10 sec" @mouseup="player.backward"></div>
                <div :class="['action-button', 'play-button', player.isPlaying ? 'pause-icon' : 'play-icon']"
                     role="button" title="Play/Pause" @mouseup="player.togglePlaying"></div>
                <div class="action-button forward-icon" role="button" title="Forward 10 sec" @mouseup="player.forward"></div>
                <div :class="['action-button', 'repeat-icon', player.isLooping ? 'toggle-active' : '']"
                     role="button" title="Toggle Repeat" @mouseup="player.toggleLooping"></div>
            </div>
            <div class="right-action-group">
                <DialInput :min-value="0.01"
                           :max-value="1000"
                           prefix="x "
                           style="width: 80px"
                           v-model="player.speedRatio" />
                <div :class="['action-button', player.isFullscreen ? 'compress-icon' : 'expand-icon']"
                     role="button" title="Toggle Fullscreen" @mouseup="emits('toggleFullscreen')"></div>
            </div>
        </div>
        <div class="bottom-action-bar">
            <span class="frame-counter">{{player.currentFrame.toFixed(2)}}</span>
            <Slider :min-value="player.startFrame"
                    :max-value="player.endFrame"
                    v-model="player.currentFrame"
                    @scrubbing-start="emits('scrubbingStart')"
                    @scrubbing-end="emits('scrubbingEnd')" />
            <span class="frame-counter">{{player.endFrame.toFixed(2)}}</span>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import DialInput from './DialInput.vue'
import Slider from './Slider.vue'
import { usePlayer } from '../stores/player'
const player = usePlayer()

const emits = defineEmits<{
    (e: 'scrubbingStart'): void,
    (e: 'scrubbingEnd'): void
    (e: 'toggleFullscreen'): void
}>()
</script>

<style scoped>
.background-container {
    width: 100%;
    height: 90px;
    background-color: var(--primary2);
}
.player-control-container {
    width: 100%;
    max-width: 1500px;
    margin: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.top-action-bar {
    width: 100%;
    flex: 1;
    display: flex;
    box-sizing: border-box;
}
.top-action-bar > * {
    flex: 1;
    display: flex;
    align-items: center;
    column-gap: 16px;
}
.left-action-group {
    margin-left: 25px;
}
.middle-action-group {
    justify-content: center;
}
.right-action-group {
    justify-content: right;
    margin-right: 20px;
}
.bottom-action-bar {
    height: 20px;
    display: flex;
    /* color: white; */
    margin: 10px;
}

.frame-counter {
    width: 60px;
    text-align: center;
    user-select: none;
}

.action-button {
    width: 20px;
    height: 20px;
    background-color: var(--primary5);
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}
.action-button:hover {
    cursor: pointer;
    background-color: var(--primary7);
}

.play-button {
    width: 30px;
    height: 30px;
    margin: 5px 0;
}
.toggle-active {
    background-color: var(--highlight1) !important;
}

.compress-icon {
    mask-image: url(../assets/icons/compress.svg);
    -webkit-mask-image: url(../assets/icons/compress.svg);
}
.expand-icon {
    mask-image: url(../assets/icons/expand.svg);
    -webkit-mask-image: url(../assets/icons/expand.svg);
}
.forward-icon {
    mask-image: url(../assets/icons/forward-fast.svg);
    -webkit-mask-image: url(../assets/icons/forward-fast.svg);
}
.pause-icon {
    mask-image: url(../assets/icons/circle-pause.svg);
    -webkit-mask-image: url(../assets/icons/circle-pause.svg);
}
.play-icon {
    mask-image: url(../assets/icons/circle-play.svg);
    -webkit-mask-image: url(../assets/icons/circle-play.svg);
}
.repeat-icon {
    mask-image: url(../assets/icons/repeat.svg);
    -webkit-mask-image: url(../assets/icons/repeat.svg);
}
.rewind-icon {
    mask-image: url(../assets/icons/backward-fast.svg);
    -webkit-mask-image: url(../assets/icons/backward-fast.svg);
}
</style>
