<template>
<div class="root" @mouseup="objects.selectedObjectIdx = null">
    <GroupEntry
        v-for="group in objects.groups"
        :group="group"
        :search-query="props.searchQuery"
        v-model="objects.selectedObjectIdx"
    />
</div>
</template>

<script setup lang="ts">
import GroupEntry from './GroupEntry.vue'
import { useObjects } from '../../stores/objects'
const objects = useObjects()

const props = defineProps<{
    searchQuery: string
}>()
</script>

<style scoped>
.root {
    width: 100%;
}
</style>
