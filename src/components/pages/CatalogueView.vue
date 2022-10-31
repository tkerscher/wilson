<template>
<div class="root">
    <input type="file" ref="dialog" @change="onFileSelected" />
    <div class="loading-screen" ref="loadingMessage">
        <div class="loading-message">
            <p>Loading...</p>
        </div>
    </div>
    <div class="header">
        <div class="banner">
            <img class="logo" v-if="theme.useDarkTheme" src="/p-one_blue_dark.svg" />
            <img class="logo" v-else src="/p-one_blue.svg" />
        </div>
        <div class="search-box">
            <SearchInput class="search-bar" v-model="searchQuery"/>            
        </div>
        <div class="action-bar">
            <div role="button" @mouseup="catalogue.saveCatalogue">
                <div class="icon-action icon-large download-icon"></div>
                Save
            </div>
            <div role="button" @mouseup="openDialog">
                <div class="icon-action icon-large upload-icon"></div>
                Open
            </div>
            <div role="button" @mouseup="theme.toggleTheme">
                <div :class="['icon-action', 'icon-large', theme.useDarkTheme ? 'moon-icon' : 'sun-icon']"></div>
                {{ theme.useDarkTheme ? 'Dark' : 'Light'}}
            </div>
        </div>
    </div>
    <div class="table-container">
        <div class="scroll-container scrollable">
            <table>
            <thead>
                <tr>
                    <th style="width: 30px"></th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Author</th>
                    <th>Duration</th>
                    <th style="width: 100px;"></th>
                </tr>
            </thead>
            <tbody>
                <template v-for="entry in filteredEntries">
                    <tr>
                        <td>
                            <div :class="['expand-button', 'icon-small', entry.expanded ? 'chevron-down-icon' : 'chevron-right-icon']"
                                 @mouseup="entry.expanded = !entry.expanded"></div>
                        </td>
                        <td>{{entry.meta.name}}</td>
                        <td>{{new Date(entry.meta?.date?.seconds ?? 0).toLocaleString()}}</td>
                        <td>{{entry.meta.author}}</td>
                        <td>{{((entry.meta?.endTime ?? 0) - (entry.meta?.startTime ?? 0)).toLocaleString('en-US')}}</td>
                        <td>
                            <button class="p-button" @click="loadProject(entry.filename)">
                                <div class="icon-button icon-medium play-icon"></div>Show
                            </button>
                        </td>
                    </tr>
                    <tr :style="{visibility: entry.expanded ? 'visible' : 'collapse'}">
                        <td colspan="6" class="description">{{entry.meta.description}}</td>
                    </tr>
                </template>
            </tbody>
        </table>
        </div>
    </div>
    <div class="footer">
        <span>{{catalogue.length}} total entries</span>
    </div>
</div>
</template>

<script setup lang="ts">
import SearchInput from '../input/SearchInput.vue';

import { computed, ref } from 'vue';
import { useCatalogue } from '../../stores/catalogue';
import { useTheme } from '../../stores/theme';
const catalogue = useCatalogue()
const theme = useTheme()

function createEntries() {
    return catalogue.entries.map(e => ({
        ...e,
        expanded: false
    }))    
}
let entries = ref(createEntries())
catalogue.$subscribe(() => entries.value = createEntries())

const searchQuery = ref('')
const filteredEntries = computed(() => entries.value.filter(
    e => e.filename.toLowerCase().includes(searchQuery.value.toLowerCase())))

const dialog = ref<HTMLInputElement|null>(null)
function onFileSelected(e: Event) {
    const fileInput = e.target! as HTMLInputElement
    if (fileInput.files) {
        fileInput.files[0].arrayBuffer().then(catalogue.openCatalogue)
    }
}
function openDialog() {
    dialog.value?.click()
}

const loadingMessage = ref<HTMLDivElement|null>(null)
function loadProject(file: string) {
    loadingMessage.value!.style.display = 'block'
    catalogue.loadProject(file)
}
</script>

<style scoped>
.root {
    width: 100%;
    height: 100%;
}
.header {
    position: absolute;
    top: 0;
    width: 100%;
    padding-right: 1em;
    padding-left: 1em;
    height: 75px;
    display: flex;
    align-items: center;
}
.header > div {
    flex: 1;
}
.table-container {
    height: 100%;
    padding: 0 2em;
    padding-top: 75px;
    padding-bottom: 40px;
    overflow: auto;
}
.footer {
    position: absolute;
    height: 30px;
    width: 100%;
    bottom: 0;
    padding: 0 1em;
    background-color: var(--highlight1-dark);
    text-align: left;
    display: flex;
    align-items: center;
    color: white;
}

.banner {
    display: flex;
}
.logo {
    height: 65px;
}

.search-box {
    height: 40px;
    border-radius: 999px;
    border: 2px solid var(--primary4);
    display: flex;
    align-items: center;
}
.search-bar {
    margin: 0 10px;
    width: 100%;
}

.action-bar {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    column-gap: 2px;
    color: white;
    font-weight: bold;
    user-select: none;
}
.action-bar > div:not(.separator) {
    height: 40px;
    width: 80px;
    background-color: var(--highlight1);
    display: flex;
    align-items: center;
    padding-right: 5px;
}
.action-bar > div:hover {
    cursor: pointer;
    background-color: var(--highlight1-light);
}
.action-bar > div:first-child {
    border-radius: 0 50px 50px 0;
}
.action-bar > div:last-child {
    border-radius: 50px 0 0 50px;
}
.icon-action {
    width: 26px;
    height: 26px;
    background-color: white;
    margin: 7px;
}

input[type="file"] {
    display: none;
}

.scroll-container {
    height: 100%;
    width: 100%;
    border: 1px solid var(--primary4);
}
table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

th, td {
    padding: 0.25em 0.5em 0.25em 1em;
}
th {
    background-color: var(--highlight1-dark);
    color: white;
    position: sticky;
    top: 0;
    z-index: 2;
}
tr:nth-child(4n),
tr:nth-child(4n - 1) {
    background-color: var(--primary2);
}

.description {
    padding: 10px 50px;
    white-space: pre;
}

.expand-button {
    background-color: var(--primary7);
}
.expand-button:hover {
    cursor: pointer;
}

.icon-button {
    background-color: white;
    margin-right: 5px;
}

.loading-screen {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    background-color: var(--overlay-background);
    display: none;
}
.loading-message {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.4em;
    font-weight: bold;
}
</style>
