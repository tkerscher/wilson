<template>
<div class="container">
    <div class="main-container">
        <div class="controller-container">
            <PlayerControl class="controller" />
        </div>
        <div class="scene-view">
            <SceneView />
        </div>
    </div>
    <div class="sidebar">
        <ResizableContainer
            store-key="sidebar"
            default-size="300px"
            grip-position="left"
            class="sidebar-resize">
            <div>
                <button>test</button>
            </div>
        </ResizableContainer>
    </div>
</div>
</template>

<script setup lang="ts">
import ResizableContainer from './ResizableContainer.vue'
import SceneView from './SceneView.vue'
import PlayerControl from './PlayerControl.vue'

import { onMounted } from 'vue'
import { usePlayer } from '../stores/player'
import { useProject } from '../stores/project'

const player = usePlayer()
const project = useProject()

function init() {
    player.$reset()
    player.$patch({
        startFrame: project.meta?.startTime ?? 0.0,
        endFrame: project.meta?.endTime ?? 0.0,
        isPlaying: true,
        isLooping: true
    })
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

.sidebar-resize {
    min-width: 100px;
    max-width: 40%;
}
.sidebar {
    max-width: 40%;
}
</style>
