<template>
  <div class="root">
    <div
      v-for="group in groups"
      :key="group.id"
      class="group-header"
    >
      <div
        class="header"
        @mouseup.stop="group.expanded.value = !group.expanded.value"
      >
        <div
          :class="['button', 'icon-small', group.expanded.value ? 'chevron-down-icon' : 'chevron-right-icon']"
          :title="group.expanded.value ? 'Collapse Group' : 'Expand Group'"
          role="button"
        />
        <div class="title">
          <span>{{ group.name }}</span>
        </div>
      </div>
      <component
        :is="group.content"
        v-if="group.expanded.value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Recorder from "../settings/RecorderSettings.vue";
import Resolution from "../settings/ResolutionSettings.vue";
import Stage from "../settings/StageSettings.vue";
import { ref } from "vue";

const groups = [
    { name: "Resolution", id: 0, content: Resolution, expanded: ref(false) },
    { name: "Recording",  id: 1, content: Recorder, expanded: ref(false) },
    { name: "Stage",      id: 2, content: Stage, expanded: ref(false) }
];
</script>

<style scoped>
.root {
    font-size: 0.8em;
}
.header {
    width: 100%;
    height: 16px;
    margin: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.header:hover {
    cursor: pointer;
}
.title {
    flex: 1;
    text-align: left;
    user-select: none;
}

.button {
    margin-right: 10px;
    background-color: var(--primary7);
}
</style>
