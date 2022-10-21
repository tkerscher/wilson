<template>
<div class="root" @keydown.stop @keyup.stop>
    <div class="header">
        <SearchInput class="search-box" v-model="searchQuery" />
    </div>
    <div class="tab-root">
        <div class="tab-list">
            <div
                v-for="(item, index) in tabIcons"
                :class="['tab-button', {'active-header' : activeTab == index}]"
                @mousedown="onSelectTab(index)"
            >
                <div :class="['tab-icon', 'icon-medium', item.icon]"></div>
                <div v-if="activeTab == index" class="tab-title">
                    {{ item.title }}
                </div>
            </div>
        </div>
        <div class="active-tab-container scrollable">
                <ObjectExplorer v-if="activeTab == 0" :search-query="searchQuery"/>
                <PathExplorer v-else-if="activeTab == 1" :search-query="searchQuery" />
                <InfoTab v-else-if="activeTab == 3" />
                <div v-else>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit a
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit a
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit a
                </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import InfoTab from './tabs/InfoTab.vue'
import ObjectExplorer from './tabs/ObjectExplorer.vue'
import PathExplorer from './tabs/PathExplorer.vue'
import SearchInput from './input/SearchInput.vue'
import { onBeforeMount, ref } from 'vue'
const searchQuery = ref('')

const tabIcons = [
    { icon: 'cube-icon', title: 'Objects' },
    { icon: 'curve-icon', title: 'Paths' },
    { icon: 'film-icon', title: 'Render'},
    { icon: 'info-icon', title: 'Info'}
]
const activeTab = ref(0)
function onSelectTab(index: number) {
    activeTab.value = index
    localStorage.setItem('activeTab', String(index))
}

onBeforeMount(() => {
    //restore active tab
    const active = localStorage.getItem('activeTab')
    if (active != null)
        activeTab.value = Number(active)
    //restore show hidden
    const _showHidden = localStorage.getItem('showHidden')
    if (_showHidden != null)
        showHidden.value = _showHidden === 'true'
})
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
