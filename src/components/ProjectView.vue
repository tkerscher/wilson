<template>
<div class="container">
    <div class="main-container" ref="mainDiv">
        <PlayerControl class="controller" @toggleFullscreen="fullscreen"/>
        <SceneView class="scene-view"/>
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

import { onMounted, ref } from 'vue'
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
        isPlaying: true,
        isLooping: true
    })
    addEventListener('fullscreenchange', () => {
        //update gui
        player.isFullscreen = !!document.fullscreenElement
    })
}

function fullscreen() {
    if (!mainDiv || !mainDiv.value.requestFullscreen)
        return
    
    if (player.isFullscreen || document.fullscreenElement) {
        document.exitFullscreen()
    }
    else {
        mainDiv.value.requestFullscreen()
    }
}

onMounted(init)
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
    flex-direction: column-reverse;
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
    background-color: #1a1a1a;
}
</style>
