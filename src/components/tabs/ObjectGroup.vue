<template>
  <div class="root">
    <div class="header">
      <div
        :class="['button', 'icon-small', expanded ? 'chevron-down-icon' : 'chevron-right-icon']"
        :title="expanded ? 'Collapse Group' : 'Expand Group'"
        role="button"
        @pointerup.stop="expanded = !expanded"
      />
      <div class="title">
        <span>{{ props.group.name }}</span>
      </div>
      <div
        class="button icon-small chart-icon"
        title="Show Graphs"
        role="button"
        @pointerup.stop="showGraphs(props.group.name)"
      />
      <div
        :class="['button', 'icon-small', props.group.visible ? 'eye-icon' : 'eye-slash-icon']"
        :title="props.group.visible ? 'Hide Group' : 'Show Group'"
        role="button"
        @pointerup.stop="toggleGroup(props.group)"
      />
    </div>
    <div
      v-show="expanded"
      class="content"
    >
      <div class="subgroup-div">
        <ObjectGroup
          v-for="sub in props.group.subgroups"
          :key="sub.name"
          :group="sub"
          @expand="expand"
        />
      </div>
      <div
        ref="itemsDiv"
        class="items-div"
      >
        <div
          v-for="item in props.group.objects"
          :key="item.id"
          :class="['item', { 'item-selected': selectedId == item.id}]"
          :name="'item'+item.id"
          tabindex="0"
          @pointerup.stop="e => select(e, item.id)"
          @dblclick="SceneCommander.TargetObject(item.id)"
          @keydown.up.prevent="selectPrevious"
          @keydown.down.prevent="selectNext"
        >
          <div class="title">
            <span>{{ item.name }}</span>
          </div>
          <div
            class="button icon-small chart-icon"
            title="Show Graphs"
            role="button"
            @pointerup.stop="showGraphs(item.name)"
            @dblclick.stop
          />
          <div
            :class="['button', 'icon-small', item.visible ? 'eye-icon' : 'eye-slash-icon']"
            :title="item.visible ? 'Hide Object' : 'Show Object'"
            role="button"
            @pointerup.stop="toggleItem(item)"
            @dblclick.stop
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { openPlot } from "../../plot/openPlot";
import { SceneCommander } from "../../scene/bus/commandBus";
import { SceneGroup, SceneObject } from "./ObjectGroup";

import { useProject } from "../../stores/project";
const project = useProject();

const props = defineProps<{
    group: SceneGroup,
    expanded?: boolean
}>();
const emits = defineEmits<{
    (e: "expand"): void
}>();
const expanded = ref(props.expanded);
const selectedId = ref<number|null>(null);

function expand() {
    expanded.value = true;
    emits("expand");
}

function showGraphs(filter: string) {
    openPlot(project.graphs, filter);
}

function toggleGroup(group: SceneGroup) {
    let ids: number[] = [];
    const enabled = !group.visible;

    //Collect all items to issue only one command
    function flattenGroup(group: SceneGroup) {
        ids.push(...group.objects.map(o => o.id));
        group.subgroups.forEach(sub => flattenGroup(sub));
    }
    flattenGroup(group);
    //Update scene
    SceneCommander.SetObjectsEnabled(ids, enabled);

    //update ui after scene, so we might have some multithreading bonus
    function updateRecursive(group: SceneGroup) {
        group.visible = enabled;
        group.objects.forEach(obj => obj.visible = enabled);
        group.subgroups.forEach(sub => updateRecursive(sub));
    }
    updateRecursive(group);
}
function toggleItem(item: SceneObject) {
    SceneCommander.SetObjectsEnabled([item.id], !item.visible);
    item.visible = !item.visible;
}

function select(e: MouseEvent, id: number) {
    const div = e.target as HTMLDivElement;
    div.focus();
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

// const itemsDiv = ref<HTMLDivElement|null>(null);
// function handleSelection(id: number|null) {
//     selectedId.value = id;

//     if (id == null)
//         return;

//     //Check if the selected object is in this group
//     if (!props.group.objects.find(o => o.id == id))
//         return;

//     //Expand
//     expand();

//     //Get corresponding div (wait for rendering)
//     nextTick(() => {
//         const item = itemsDiv.value?.querySelector("[name=item"+id+"]");
//         if (item) {
//             const div = item as HTMLDivElement;
//             div.focus();
//         }
//     });
// }
// onMounted(() => SceneEventBus.on("ObjectPicked", handleSelection));
// onBeforeUnmount(() => SceneEventBus.off("ObjectPicked", handleSelection));
</script>

<style scoped>
.root {
    width: 100%;
    font-size: 10pt;
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

.button {
    margin-right: 10px;
    background-color: var(--primary7);
}
.button:hover {
    cursor: pointer;
}

.content {
    margin-left: 10px;
    padding: 5px 0px 0px 5px;
    border-left: 1px var(--primary6) solid;
}

.subgroup-div > div {
    padding-top: 2px;
}

.item {
    padding: 4px 0px 4px 10px;
    text-align: left;
    outline: none;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.item:hover {
    cursor: pointer;
    background-color: var(--primary5);
}
.item-selected {
    background-color: var(--primary5);
}
</style>
