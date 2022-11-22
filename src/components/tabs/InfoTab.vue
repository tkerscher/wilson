<template>
  <table>
    <tr>
      <td>Title:</td>
      <td>{{ title }}</td>
    </tr>
    <tr>
      <td>Author:</td>
      <td>{{ author }}</td>
    </tr>
    <tr>
      <td>Date:</td>
      <td>{{ date }}</td>
    </tr>
    <tr>
      <td>Timestamp:</td>
      <td>{{ timestamp }} ns</td>
    </tr>
    <tr>
      <td>Start:</td>
      <td>{{ eventStart }} ns</td>
    </tr>
    <tr>
      <td>End:</td>
      <td>{{ eventEnd }} ns</td>
    </tr>
    <tr>
      <td>Duration:</td>
      <td>{{ duration }} ns</td>
    </tr>
    <tr>
      <td>Description:</td>
      <td />
    </tr>
  </table>

  <p class="desc">
    {{ description }}
  </p>

  <div class="disclaimer">
    Wilson is an open source project under the MIT-License.<br>
    Checkout the project's <a href="https://github.com/tkerscher/wilson">sourcecode</a>.
  </div>

  <!--Force vue to update this tab. God knows why this is needed-->
  <div style="visibility:hidden">
    {{ project.meta?.name }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useProject } from "../../stores/project";
const project = useProject();

//Common tab api. Needed for component element probability
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    searchQuery: string
}>();

function getDefault(value: string|undefined, def: string): string {
    if (!value || value.length == 0)
        return def;
    else
        return value;
}

//data
//For whatever reason computed props do not work!?
const author = ref("");
const title = ref("");
const description = ref("");
const date = ref("");
const timestamp = ref("");
const eventStart = ref("");
const eventEnd = ref("");
const duration = ref("");

function updateData() {
    author.value = getDefault(project.meta?.author, "No Author");
    title.value = getDefault(project.meta?.name, "No Title");
    description.value = getDefault(project.meta?.description, "No description");
    date.value = new Date(project.meta?.date?.seconds ?? 0).toString();
    const nanos = project.meta?.date?.nanos ?? 0;
    timestamp.value = (nanos + 1e10).toLocaleString("en-US").slice(3);
    eventStart.value = (project.meta?.startTime ?? 0).toLocaleString("en-US");
    eventEnd.value = (project.meta?.endTime ?? 0).toLocaleString("en-US");
    duration.value = ((project.meta?.endTime ?? 0) - (project.meta?.startTime ?? 0)).toLocaleString("en-US");
}
updateData();
project.$subscribe(updateData);
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
    width: fit-content;
    margin: 5px 20px;
    text-align: left;
    white-space: pre;
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
