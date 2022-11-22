<template>
  <div
    v-if="!empty"
    class="root"
  >
    <div class="header">
      <div
        :class="['button', 'icon-small', expanded ? 'chevron-down-icon' : 'chevron-right-icon']"
        :title="expanded ? 'Collapse Group' : 'Expand Group'"
        role="button"
        @mouseup.stop="expanded = !expanded"
      />
      <div class="title">
        <span v-if="props.group.name.length > 0">{{ props.group.name }}</span>
        <span
          v-else
          class="empty-label"
        >Ungrouped</span>
      </div>
      <div
        :class="['button', 'icon-small', props.group.visible ? 'eye-icon' : 'eye-slash-icon']"
        :title="props.group.visible ? 'Hide Group' : 'Show Group'"
        role="button"
        @mouseup.stop="toggleGroup(props.group)"
      />
    </div>
    <div
      v-if="expanded"
      ref="contentDiv"
      class="content"
    >
      <div
        v-for="item in filtered"
        :key="item.id"
        :class="['item', { 'item-selected': selectedId == item.id }]"
        :name="'item'+item.id"
        tabindex="0"
        @mouseup.stop="e => select(e, item.id)"
        @dblclick="SceneCommander.TargetObject(item.id)"
        @keydown.up.prevent="selectPrevious"
        @keydown.down.prevent="selectNext"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { Group } from "./ObjectGroup";
import { SceneCommander } from "../../scene/bus/commandBus";
import { SceneEventBus } from "../../scene/bus/eventBus";

const selectedId = ref<number|null>(null);
const props = defineProps<{
    group: Group,
    searchQuery: string
}>();

const expanded = ref(false);
const filtered = computed(() => props.group.members.filter(
    m => m.name.toLowerCase().includes(props.searchQuery.toLowerCase())));
const empty = computed(() => filtered.value.length == 0);

function select(e: MouseEvent, id: number) {
    const foo = e.target as HTMLDivElement;
    foo.focus();
    SceneCommander.SelectObject(id);
}
function selectNext(e: KeyboardEvent) {
    //repeated is a bit wonky -> disable
    if (e.repeat)
        return;

    const div = e.target as HTMLDivElement;
    if (div.nextElementSibling) {
        const next = div.nextElementSibling as HTMLDivElement;
        const name = next.getAttribute("name");
        if (name) {
            //name is of form 'name5053' -> select numbers
            const id = parseInt(name.substring(4));
            //update
            SceneCommander.SelectObject(id);
        }
    }
}
function selectPrevious(e: KeyboardEvent) {
    //repeated is a bit wonky -> disable
    if (e.repeat)
        return;

    const div = e.target as HTMLDivElement;
    if (div.previousElementSibling) {
        const prev = div.previousElementSibling as HTMLDivElement;
        const name = prev.getAttribute("name");
        if (name) {
            //name is of form 'name5053' -> select numbers
            const id = parseInt(name.substring(4));
            //update
            SceneCommander.SelectObject(id);
        }
    }
}

function toggleGroup(group: Group) {
    group.visible = !group.visible;
    SceneCommander.SetGroupEnabled(group.name, group.visible);
}

const contentDiv = ref<HTMLDivElement|null>(null);
function handleSelection(id: number|null) {
    selectedId.value = id;

    if (id == null)
        return;

    //Check if the selected object is in this group
    if (!filtered.value.find(o => o.id == id))
        return;

    //Expand if necessary
    if (!expanded.value)
        expanded.value = true;

    //Get corresponding div (wait for rendering)
    nextTick(() => {
        const item = contentDiv.value?.querySelector("[name=item"+id+"]");
        if (item) {
            const div = item as HTMLDivElement;
            div.focus();
        }
    });
}
onMounted(() => SceneEventBus.on("ObjectPicked", handleSelection));
onBeforeUnmount(() => SceneEventBus.off("ObjectPicked", handleSelection));
</script>

<style scoped>
.root {
    width: 100%;
    font-size: 0.8em;
}
.header {
    width: 100%;
    height: 16px;
    margin: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.title {
    flex: 1;
    text-align: left;
}
.empty-label {
    font-style: italic;
}

.button {
    margin-right: 10px;
    background-color: var(--primary7);
}
.button:hover {
    cursor: pointer;
}

.item {
    margin-left: 10px;
    padding: 5px 0px 5px 20px;
    border-left: 1px var(--primary6) solid;
    text-align: left;
    outline: none;
}
.item:hover {
    cursor: pointer;
    background-color: var(--primary5);
}
.item-selected {
    background-color: var(--primary5);
}
</style>
