<template>
  <div
    class="root"
    @keydown.stop
    @keyup.stop
  >
    <div class="header">
      <SearchInput
        v-model="searchQuery"
        class="search-box"
      />
    </div>
    <div class="tab-root">
      <div class="tab-list">
        <div
          v-for="(item, index) in tabIcons"
          :key="item.id"
          :class="['tab-button', {'active-header' : activeTab == index}]"
          @mousedown="onSelectTab(index)"
        >
          <div :class="['tab-icon', 'icon-medium', item.icon]" />
          <div
            v-if="activeTab == index"
            class="tab-title"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="active-tab-container scrollable">
        <KeepAlive>
          <component
            :is="tabIcons[activeTab].tab"
            :search-query="searchQuery"
          />
        </KeepAlive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoTab from "./tabs/InfoTab.vue";
import ObjectExplorer from "./tabs/ObjectExplorer.vue";
import SettingsTab from "./tabs/SettingsTab.vue";
import PathExplorer from "./tabs/PathExplorer.vue";
import SearchInput from "./input/SearchInput.vue";
import { onBeforeMount, ref } from "vue";
const searchQuery = ref("");

const tabIcons = [
    { icon: "cube-icon",   title: "Objects",  id: 0, tab: ObjectExplorer },
    { icon: "curve-icon",  title: "Paths",    id: 1, tab: PathExplorer },
    { icon: "wrench-icon", title: "Settings", id: 2, tab: SettingsTab },
    { icon: "info-icon",   title: "Info",     id: 3, tab: InfoTab }
];
const activeTab = ref(0);
function onSelectTab(index: number) {
    activeTab.value = index;
    localStorage.setItem("activeTab", String(index));
}

onBeforeMount(() => {
    //restore active tab
    const active = localStorage.getItem("activeTab");
    if (active != null)
        activeTab.value = Number(active);
});
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
.header {
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
.tab-root {
    width: 100%;
    height: 100px;
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
}

.search-box {
    flex: 1;
    margin-left: 5px;
}

.header-button {
    margin: 5px;
    background-color: var(--primary7);
}
.header-button:hover {
    cursor: pointer;
}

.tab-list {
    height: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
}
.active-tab-container {
    height: 100%;
    flex: 1;
    background-color: var(--primary3);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.tab-icon {
    margin: 5px;
    background-color: var(--highlight2);
}
.tab-button {
    width: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--foreground1);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    user-select: none;
    -webkit-user-select: none;
}
.tab-button:hover {
    cursor: pointer;
    background-color: var(--primary3);
}
.active-header {
    width: 100px;
    background-color: var(--primary3) !important;
}
</style>
