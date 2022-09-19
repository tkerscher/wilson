<template>
<div class="root">
    <div class="search-header">
        <div class="reset-button"
             role="button"
             title="Reset Graphs"
             @mouseup="reset"></div>
        <SearchInput class="search-box" v-model="searchQuery" />
    </div>
    <div class="list">
        <div
        v-for="graph in filteredGraphs"
        class="item">
        <div class="header">
            <span class="name">{{graph.name}}</span>
            <div :class="['toggle', graph.visible ? 'hide-button' : 'show-button']"
                :title="graph.visible ? 'Remove Graph' : 'Draw Graph'"
                role="button"
                @mouseup.stop="graph.visible = !graph.visible"></div>
        </div>
    </div>
    </div>
</div>
</template>

<script setup lang="ts">
import SearchInput from './SearchInput.vue'

import { computed, ref } from "vue"
import { useGraphs } from '../stores/graphs'
const graphs = useGraphs()

const searchQuery = ref('')
const filteredGraphs = computed(() =>
    graphs.graphs.filter(g => g.name.includes(searchQuery.value)))

function reset() {
    graphs.graphs.forEach(g => g.visible = false)
}
</script>

<style scoped>
.root {
    width: 100%;
    height: 100%;
    padding: 6px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.search-header {
    width: 100%;
    height: 30px;
    min-height: 30px;
    background-color: var(--primary3);
    border-radius: 5px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    flex: 0 0 10px;
}
.search-box {
    flex: 1;
    margin-left: 5px;
}
.list {
    height: 100%;
    flex: 1;
    background-color: var(--primary3);
    border-radius: 5px;
    overflow-y: auto;
    scrollbar-color: #3497ff #d3d3d3;
    scrollbar-width: thin;
    overflow-y: scroll;
}
.list::-webkit-scrollbar {
    width: 8px;
} 
.list::-webkit-scrollbar-track {
    background-color: #d3d3d3;
    border-radius: 100px;
} 
.list::-webkit-scrollbar-thumb {
    background-color: #3497ff;
    border-radius: 100px;
}
.item {
    padding: 3px 10px;
    margin: 3px 0;
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

.toggle {
    width: 16px;
    height: 16px;
    cursor: pointer;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}

.reset-button {
    width: 18px;
    height: 18px;
    margin: 6px;
    background-color: var(--primary7);
    mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-image: url(../assets/icons/eye-slash.svg);
    -webkit-mask-image: url(../assets/icons/eye-slash.svg);
}
.reset-button:hover {
    cursor: pointer;
}

.show-button:hover {
    mask-image: url(../assets/icons/eye.svg);
    -webkit-mask-image: url(../assets/icons/eye.svg);
    background-color: var(--primary7);
}
.hide-button:hover {
    mask-image: url(../assets/icons/eye-slash.svg);
    -webkit-mask-image: url(../assets/icons/eye-slash.svg);
    background-color: var(--primary7);
}
.hide-button {
    mask-image: url(../assets/icons/eye.svg);
    -webkit-mask-image: url(../assets/icons/eye.svg);
    background-color: var(--primary7);
}
</style>
