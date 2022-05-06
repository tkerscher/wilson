<template>
<div class="player-control-container">
    <div class="top-action-bar">
        <div class="left-action-group">
            <div :class="['action-button', player.isCameraLocked ? 'camera-fixed-icon' : 'camera-icon']"
                 role="button" title="Fix Camera" @mouseup="player.toggleCameraLocked"></div>
            <div class="action-button info-icon" role="button" title="Show Project Info" @mouseup="emits('OpenInfoClicked')"></div>
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
            <div :class="['action-button', player.isFullscreen ? 'compress-icon' : 'expand-icon']"
                 role="button" title="Toggle Fullscreen" @mouseup="player.toggleFullscreen"></div>
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
</template>

<script setup lang="ts">
import Slider from './Slider.vue'
import { usePlayer } from '../stores/player'
const player = usePlayer()

const emits = defineEmits<{
    (e: 'OpenInfoClicked'): void,
    (e: 'scrubbingStart'): void,
    (e: 'scrubbingEnd'): void
}>()
</script>

<style scoped>
.player-control-container {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    background-color: #2c2c2c;
}

.top-action-bar {
    width: 100%;
    flex: 2;
    display: flex;
}
.top-action-bar > * {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 10px;
    column-gap: 16px;
}
.middle-action-group {
    justify-content: center;
    padding-left: 30px;
}
.right-action-group {
    justify-content: right;
}
.bottom-action-bar {
    flex: 1;
    display: flex;
    color: white;
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
    background-color: lightgray;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}
.action-button:hover {
    cursor: pointer;
    background-color: white;
}

.play-button {
    width: 30px;
    height: 30px;
    margin: 5px 0;
}
.toggle-active {
    background-color: #3497ff !important;
}

.camera-icon {
    mask-image: url(../assets/icons/video.svg);
    -webkit-mask-image: url(../assets/icons/video.svg);
}
.camera-fixed-icon {
    mask-image: url(../assets/icons/video-slash.svg);
    -webkit-mask-image: url(../assets/icons/video-slash.svg);
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
    -mask-image: url(../assets/icons/forward-fast.svg);
}
.info-icon {
    mask-image: url(../assets/icons/circle-info.svg);
    -webkit-mask-image: url(../assets/icons/circle-info.svg);
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
