<template>
<table>
    <tr>
        <td>Title:</td>
        <td>{{title}}</td>
    </tr>
    <tr>
        <td>Author:</td>
        <td>{{author}}</td>
    </tr>
    <tr>
        <td>Date:</td>
        <td>{{date}}</td>
    </tr>
    <tr>
        <td>Timestamp:</td>
        <td>{{timestamp}} ns</td>
    </tr>
    <tr>
        <td>Start:</td>
        <td>{{eventStart}} ns</td>
    </tr>
    <tr>
        <td>End:</td>
        <td>{{eventEnd}} ns</td>
    </tr>
    <tr>
        <td>Duration:</td>
        <td>{{duration}} ns</td>
    </tr>
    <tr>
        <td>Description:</td>
        <td></td>
    </tr>
</table>

<span class="desc">{{ description }}</span>

<div class="disclaimer">
    P1ON is an open source project under the MIT-License.<br />
    Checkout the project's <a href="https://github.com/tkerscher/P1ON">sourcecode</a>.
</div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useProject } from '../stores/project'
const project = useProject()

const author = computed(() => getDefault(project.meta?.author, 'No Author'))
const title = computed(() => getDefault(project.meta?.name, 'No Title'))
const description = computed(() => getDefault(project.meta?.description, 'No description'))
const date = computed(() => new Date(project.meta?.date?.seconds ?? 0).toString())
const timestamp = computed(() => {
    const nanos = project.meta?.date?.nanos ?? 0
    return (nanos + 1e10).toLocaleString('en-US').slice(3)
})
const eventStart = computed(() => (project.meta?.startTime ?? 0).toLocaleString('en-US'))
const eventEnd = computed(() => (project.meta?.endTime ?? 0).toLocaleString('en-US'))
const duration = computed(() => (
    (project.meta?.endTime ?? 0) - (project.meta?.startTime ?? 0)).toLocaleString('en-US'))
function getDefault(value: string|undefined, def: string): string {
    if (!value || value.length == 0)
        return def
    else
        return value
}
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 12px 15px;
    margin-top: 10px;
    font-family: sans-serif;
}
table tr td:nth-child(1) {
    width: 60px;
    text-align: right;
    vertical-align: top;
    font-weight: bolder;
}
table tr td:nth-child(2) {
    text-align: left;
}

.desc {
    width: 100%;
    margin-left: 10px;
    text-align: left;
}

.disclaimer {
    width: fit-content;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    font-style: italic;
    font-weight: light;
    font-size: 0.8em;
    font-family: sans-serif;
    padding: 10px;
}
</style>
