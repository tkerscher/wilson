<template>
<div class="container">
    <div class="scene-view">
        <SceneView />
    </div>
    <PlayerControl class="controller" />
</div>
</template>

<script setup lang="ts">
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
    height: 100%;
    display: flex;
    flex-direction: column;
}

.controller {
    position: fixed;
    bottom: 0;
}

.scene-view {
    width: 100%;
    flex: 1;
}
</style>
