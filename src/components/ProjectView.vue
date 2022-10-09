<template>
<div class="container">
    <div class="main-container" ref="mainDiv">
        <SceneView class="scene-view"/>
        <PlayerControl class="controller" @toggleFullscreen="fullscreen"/>
    </div>
    <ResizableContainer
        grip-position="left"
        store-key="sidebar-width"
        default-size="300px"
        class="sidebar"
    >
        <div class="sidebar-content">
            <Sidebar />
        </div>
    </ResizableContainer>
</div>
</template>

<script setup lang="ts">
import ResizableContainer from './ResizableContainer.vue'
import SceneView from './SceneView.vue'
import Sidebar from './Sidebar.vue'
import PlayerControl from './PlayerControl.vue'

import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePlayer } from '../stores/player'
import { useProject } from '../stores/project'

const player = usePlayer()
const project = useProject()

const mainDiv = ref<HTMLDivElement|null>(null)

function init() {
    player.$reset()
    player.$patch({
        startFrame: project.meta?.startTime ?? 0.0,
        endFrame: project.meta?.endTime ?? 0.0,
        speedRatio: project.meta?.speedRatio ?? 1.0,
        isPlaying: true,
        isLooping: true
    })    
}

function onKeydown(e: KeyboardEvent) {
    if (e.code == "KeyF") {
        fullscreen()
    }
}
function fullscreen() {
    if (!mainDiv.value || !mainDiv.value.requestFullscreen)
        return
    
    if (player.isFullscreen || document.fullscreenElement) {
        document.exitFullscreen()
    }
    else {
        mainDiv.value.requestFullscreen()
    }
}
function onFullscreenChanged() {
    //update gui
    player.isFullscreen = !!document.fullscreenElement
}

onMounted(() => {
    init()
    addEventListener('fullscreenchange', onFullscreenChanged)
    document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
    removeEventListener('fullscreenchange', onFullscreenChanged)
    document.removeEventListener('keydown', onKeydown)
})
project.$subscribe((mutation, state) => init())
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: row;
}

.main-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #3d3d3d;
}

.controller {
    width: 100%;
}

.scene-view {
    width: 100%;
    flex: 1;
}

.sidebar {
    min-width: 200px;
}
.sidebar-content {
    height: 100%;
    width: 100%;
    background-color: var(--primary2);
}
</style>
