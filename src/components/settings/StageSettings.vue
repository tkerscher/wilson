<template>
  <div class="container">
    <input
      id="dialog"
      type="file"
      accept=".glb"
      @change="openFile"
    >
    <label
      for="dialog"
      class="p-button"
    >
      <div class="icon icon-small upload-icon" />Open Stage
    </label>
    <div
      class="p-button"
      @mouseup="SceneCommander.RemoveStage()"
    >
      <div class="icon icon-small trash-icon" />
      Remove Stage
    </div>
    <div
      v-if="stage.error"
      class="message"
    >
      <div class="icon icon-small triangle-exclamation-icon" />
      {{ stage.error }}
    </div>
    <div
      v-else-if="stage.isDownloading"
      class="message"
    >
      <div class="icon icon-small spinner-icon" />
      Downloading stage file ({{ (stage.progress * 100).toFixed() }}%)...
    </div>
  </div>
</template>

<script setup lang="ts">
import { SceneCommander } from '../../scene/bus/commandBus';
import { useStage } from '../../stores/stage';
const stage = useStage();

async function openFile(e: Event) {
  if (!e.target)
    return;
  
  const fileInput = e.target as HTMLInputElement;
  if (fileInput.files) {
      stage.setStage(fileInput.files[0]);
  }
}
</script>

<style scoped>
.container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.message {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.icon {
    background-color: var(--primary7);
    margin-right: 5px;
}
.p-button {
    width: 130px;
}

input[type="file"] {
    display: none;
}
</style>
