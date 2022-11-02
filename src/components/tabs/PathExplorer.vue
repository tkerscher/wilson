<template>
  <div class="root">
    <div
      v-for="path in filtered"
      :key="path.id"
      class="item"
    >
      <div class="header">
        <span
          class="name"
          @mouseup.stop="toggleVisible(path)"
        >
          {{ path.name }}
        </span>
        <input
          v-if="path.visible"
          type="color"
          class="color-picker"
          :value="path.color"
          @change="e => changeColor(e, path)"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { SceneCommander } from '../../scene/bus/commandBus';
import { useProject } from '../../stores/project';
const project = useProject();

const props = defineProps<{
    searchQuery: string
}>();

const DefaultColor = '#ff8800'; //orange
interface PathHandle {
    name: string
    id: number
    color: string //hex
    visible: boolean
}

var paths = ref<PathHandle[]>([]);
function parseProject() {
    paths.value = project.paths.map(p => ({
        name: p.name,
        id: p.id,
        color: DefaultColor,
        visible: false}));
}
parseProject();
project.$subscribe(parseProject);

const filtered = computed(() => paths.value.filter(
    p => p.name.toLowerCase().includes(props.searchQuery.toLowerCase())));

function changeColor(e: Event, path: PathHandle) {
    const picker = e.target as HTMLInputElement;
    path.color = picker.value;
    SceneCommander.SetPathEnabled(path.id, path.visible, path.color);
}

function toggleVisible(path: PathHandle) {
    path.visible = !path.visible;
    SceneCommander.SetPathEnabled(path.id, path.visible, path.color);
}
</script>

<style scoped>
.root {
    width: 100%;
}
.item {
    padding: 3px 10px;
}
.item:hover {
    cursor: pointer;
    background-color: var(--primary5);
}
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.name {
    text-align: left;
    font-size: 0.8em;
    flex: 1;
}
.color-picker {
    width: 26px;
    height: 28px;
    margin-top: -4px;
    margin-bottom: -4px;
}
</style>
