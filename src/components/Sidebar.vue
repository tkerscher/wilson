<template>
<div class="root">
    <div class="header">
        <div
            role="button"
            :class="['header-button', showHidden ? 'hide-icon' : 'show-icon']"
            :title="showHidden ? 'Hide hidden objects' : 'Show hidden objects'"
            @mouseup="toggleShowHidden"
        ></div>
        <SearchInput class="search-box" v-model="searchQuery" />
    </div>
    <div class="tab-root">
        <div class="tab-list">
            <div
                v-for="(item, index) in tabIcons"
                :class="['tab-button', {'active-header' : activeTab == index}]"
                @mousedown="onSelectTab(index)"
            >
                <div :class="['tab-icon', item.icon]"></div>
                <div v-if="activeTab == index" class="tab-title">
                    {{ item.title }}
                </div>
            </div>
        </div>
        <div class="active-tab-container">
                <ObjectExplorer v-if="activeTab == 0" />
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
import InfoTab from './InfoTab.vue'
import ObjectExplorer from './ObjectExplorer.vue'
import SearchInput from './SearchInput.vue'
import { onBeforeMount, ref } from 'vue'
const searchQuery = ref('')

const showHidden = ref(false);
function toggleShowHidden() {
    showHidden.value = !showHidden.value
    localStorage.setItem('showHidden', showHidden.value ? 'true' : 'false')
}

const tabIcons = [
    { icon: 'cube-icon', title: 'Objects' },
    { icon: 'chart-icon', title: 'Graphs'},
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
    background-color: #2c2c2c;
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
    width: 20px;
    height: 20px;
    margin: 5px;
    background-color: lightgray;
    mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
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
    background-color: #2c2c2c;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    overflow-y: auto;
    scrollbar-color: #3497ff #d3d3d3;
    scrollbar-width: thin;
    overflow-y: scroll;
}
.active-tab-container::-webkit-scrollbar {
    width: 8px;
} 
.active-tab-container::-webkit-scrollbar-track {
    background-color: #d3d3d3;
    border-radius: 100px;
} 
.active-tab-container::-webkit-scrollbar-thumb {
    background-color: #3497ff;
    border-radius: 100px;
}

.tab-icon {
    width: 20px;
    height: 20px;
    margin: 5px;
    background-color: orange;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}
.tab-button {
    width: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    user-select: none;
    -webkit-user-select: none;
}
.tab-button:hover {
    cursor: pointer;
    background-color: white;
}
.active-header {
    width: 100px;
    background-color: #2c2c2c !important;
}

.chart-icon {
    mask-image: url(../assets/icons/chart.svg);
    -webkit-mask-image: url(../assets/icons/chart.svg);
}
.cube-icon {
    mask-image: url(../assets/icons/cube.svg);
    -webkit-mask-image: url(../assets/icons/cube.svg);
}
.film-icon {
    mask-image: url(../assets/icons/film.svg);
    -webkit-mask-image: url(../assets/icons/film.svg);
}
.info-icon {
    mask-image: url(../assets/icons/circle-info.svg);
    -webkit-mask-image: url(../assets/icons/circle-info.svg);
}
.hide-icon {
    mask-image: url(../assets/icons/eye.svg);
    -webkit-mask-image: url(../assets/icons/eye.svg);
}
.show-icon {
    mask-image: url(../assets/icons/eye-slash.svg);
    -webkit-mask-image: url(../assets/icons/eye-slash.svg);
}
</style>
