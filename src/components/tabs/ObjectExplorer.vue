<template>
<div class="root" @mouseup="SceneCommander.SelectObject(null)">
    <GroupEntry
        v-for="group in groups"
        :group="group"
        :search-query="props.searchQuery"
    />
</div>
</template>

<script setup lang="ts">
import GroupEntry from './ObjectGroup.vue'

import { ref } from "vue"
import { extractGroups, Group } from "./ObjectGroup"
import { SceneCommander } from '../../scene/bus/commandBus'
import { useProject } from '../../stores/project'
const project = useProject()

const props = defineProps<{
    searchQuery: string
}>()

const groups = ref<Group[]>(extractGroups(project))
project.$subscribe(() => groups.value = extractGroups(project))
</script>

<style scoped>
.root {
    width: 100%;
}
</style>
