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

import { ref, watch } from "vue";
import { extractGroups, SceneGroup, SceneObject } from "./ObjectGroup";
import { SceneCommander } from "../../scene/bus/commandBus";
import { useProject } from "../../stores/project";
const project = useProject();

const props = defineProps<{
    searchQuery: string
}>();

const rootGroup = ref<SceneGroup>(extractGroups(project));
let flatObjectMap: SceneObject[] = [];
function flattenGroup(group: SceneGroup) {
    flatObjectMap.push(...group.objects);
    group.subgroups.forEach(sub => flattenGroup(sub));
}
flattenGroup(rootGroup.value);

project.$subscribe(() => {
    rootGroup.value = extractGroups(project);
    flatObjectMap = [];
    flattenGroup(rootGroup.value);
});

const searchResult = ref<SceneGroup>({
    name: "Search Result",
    objects: [],
    subgroups: [],
    visible: true
});
watch(() => props.searchQuery, () => {
    searchResult.value.visible = true;
    searchResult.value.objects = flatObjectMap.filter(
        o => o.name.toLowerCase().includes(props.searchQuery.toLowerCase()));
});
</script>

<style scoped>
.root {
    width: 100%;
}
</style>
