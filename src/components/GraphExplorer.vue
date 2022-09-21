<template>
<div class="root">
    <div class="search-header">
        <div class="button reset-icon"
            role="button"
            title="Reset Graphs"
            @mouseup="reset"></div>
        <div :class="['button', showHidden ? 'show-icon' : 'hide-icon']"
             :title="showHidden ? 'Show Hidden Graphs' : 'Hide Graphs'"
             role="button"
             @mouseup="showHidden = !showHidden"></div>
        <SearchInput class="search-box" v-model="searchQuery" />
    </div>
    <div class="list">
        <div
        v-for="graph in filteredGraphs"
        class="item">
        <div class="header"
             @mouseup.stop="graph.visible = !graph.visible">
            <span class="name">{{graph.name}}</span>
            <div v-if="graph.visible" class="icon visible-icon"></div>
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

const showHidden = ref(false)

const searchQuery = ref('')
const filteredGraphs = computed(() =>
    graphs.graphs.filter(g => g.name.includes(searchQuery.value) && //search query
     (showHidden.value || g.name.charAt(0) != ".")))                //hidden graphs

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
    margin: 0 5px;
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
.header:hover {
    cursor: pointer;
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

.button {
    width: 18px;
    height: 18px;
    margin: 4px;
    background-color: var(--primary7);
    mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
}
.button:hover {
    cursor: pointer;
    background-color: var(--primary7);
}

.icon {
    width: 12px;
    height: 12px;
    background-color: var(--primary7);
    mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
}

.hide-icon {
    mask-image: url(../assets/icons/eye.svg);
    -webkit-mask-image: url(../assets/icons/eye.svg);
}
.show-icon {
    mask-image: url(../assets/icons/eye-slash.svg);
    -webkit-mask-image: url(../assets/icons/eye-slash.svg);
}
.reset-icon {
    mask-image: url(../assets/icons/trash.svg);
    -webkit-mask-image: url(../assets/icons/trash.svg);
}
.visible-icon {
    mask-image: url(../assets/icons/eye.svg);
    -webkit-mask-image: url(../assets/icons/eye.svg);
}
</style>
