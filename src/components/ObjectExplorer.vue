<template>
<div class="root" @mouseup="objects.selectedObjectIdx = null">
    <GroupEntry v-for="group in objects.groups" :group="group" v-model="objects.selectedObjectIdx"/>
</div>
</template>

<script setup lang="ts">
import GroupEntry from './GroupEntry.vue'
import { useObjects } from '../stores/objects'
const objects = useObjects()

</script>

<style scoped>
.root {
    width: 100%;
}
</style>
