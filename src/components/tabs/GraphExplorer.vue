<template>
  <div class="root">
    <div class="search-header">
      <div
        class="button icon-medium trash-icon"
        role="button"
        title="Reset Graphs"
        @mouseup="reset"
      />
      <div
        :class="['button', 'icon-medium', showHidden ? 'eye-slash-icon' : ' eye-icon']"
        :title="showHidden ? 'Show Hidden Graphs' : 'Hide Graphs'"
        role="button"
        @mouseup="showHidden = !showHidden"
      />
      <SearchInput
        v-model="searchQuery"
        class="search-box"
      />
    </div>
    <div class="list scrollable">
      <div
        v-for="graph in filteredGraphs"
        :key="graph.id"
        class="item"
      >
        <div
          class="header"
          @mouseup.stop="graph.visible = !graph.visible"
        >
          <span class="name">{{ graph.name }}</span>
          <div
            v-if="graph.visible"
            class="icon icon-small eye-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchInput from '../input/SearchInput.vue';

import { computed, ref } from "vue";
import { useGraphs } from '../../stores/graphs';
const graphs = useGraphs();

const showHidden = ref(false);

const searchQuery = ref('');
const filteredGraphs = computed(() =>
    graphs.graphs.filter(g => g.name.includes(searchQuery.value) && //search query
     (showHidden.value || g.name.charAt(0) != ".")));                //hidden graphs

function reset() {
    graphs.graphs.forEach(g => g.visible = false);
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

.button {
    margin: 4px;
    background-color: var(--primary7);
}
.button:hover {
    cursor: pointer;
    background-color: var(--primary7);
}

.icon {
    background-color: var(--primary7);
}
</style>
