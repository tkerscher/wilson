<template>
<div class="root">
    <div
        v-for="(path, index) in filtered"
        class="item">
        <div class="header"
            @mouseup.stop="path.visible = !path.visible">
            <span class="name">{{path.name}}</span>
            <input v-if="path.visible"
                   type="color"
                   class="color-picker"
                   :value="path.color"
                   @change="e => changeColor(e, index)" />
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePaths } from '../stores/paths'
const paths = usePaths()

const props = defineProps<{
    searchQuery: string
}>()
const filtered = computed(() => paths.paths.filter(
    p => p.name.toLowerCase().includes(props.searchQuery.toLowerCase())))

function changeColor(e: Event, index: number) {
    const picker = e.target as HTMLInputElement;
    paths.$patch((state) => {
        state.paths[index].color = picker.value
    })
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
    background-color: transparent;
    width: 20px;
    height: 22px;
    margin-top: -3px;
    margin-bottom: -3px;
    border: none;
}
.color-picker::-webkit-color-swatch {
    border-radius: 999px;
    padding: 0;
    border: none;
}
.color-picker::-moz-color-swatch {
    border-radius: 999px;
    padding: 0;
    border: none;
}
</style>
