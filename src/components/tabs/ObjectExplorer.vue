<template>
  <div
    class="root"
    @mouseup="SceneCommander.SelectObject(null)"
  >
    <GroupEntry
      v-if="props.searchQuery"
      :group="searchResult"
      expanded
    />
    <GroupEntry
      v-else
      :group="rootGroup"
      expanded
    />
  </div>
</template>

<script setup lang="ts">
import GroupEntry from "./ObjectGroup.vue";

import { onMounted, ref, watch } from "vue";
import { EmptyGroup, extractGroups, SceneGroup, SceneObject } from "./ObjectGroup";
import { SceneCommander } from "../../scene/bus/commandBus";
import { useProject } from "../../stores/project";
const project = useProject();

const props = defineProps<{
    searchQuery: string
}>();

const rootGroup = ref<SceneGroup>(EmptyGroup);
let objects: SceneObject[] = [];
function processGroups() {
    const result = extractGroups(project);
    rootGroup.value = result.group;
    objects = result.objects;
}

project.$subscribe(processGroups);
onMounted(() => processGroups());

const searchResult = ref<SceneGroup>({
    name: "Search Result",
    objects: [],
    subgroups: [],
    visible: true
});
watch(() => props.searchQuery, () => {
    searchResult.value.visible = true;
    searchResult.value.objects = objects.filter(
        o => o.name.toLowerCase().includes(props.searchQuery.toLowerCase()));
});
</script>

<style scoped>
.root {
    width: 100%;
}
</style>
