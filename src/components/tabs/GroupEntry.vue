<template>
<div class="root" v-if="!empty">
    <div class="header">
        <div :class="['button', 'icon-small', expanded ? 'chevron-down-icon' : 'chevron-right-icon']"
             :title="expanded ? 'Collapse Group' : 'Expand Group'"
             role="button"
             @mouseup.stop="expanded = !expanded">
        </div>
        <div class="title">
            <span v-if="props.group.name.length > 0">{{ props.group.name }}</span>
            <span v-else class="empty-label">Ungrouped</span>
        </div>
        <div :class="['button', 'icon-small', props.group.visible ? 'eye-icon' : 'eye-slash-icon']"
             :title="props.group.visible ? 'Hide Group' : 'Show Group'"
             role="button"
             @mouseup.stop="props.group.visible = !props.group.visible">
        </div>
    </div>
    <div v-if="expanded" class="content" ref="contentDiv">
        <div v-for="item in filtered"
             :class="['item', { 'item-selected': props.modelValue == item.id }]"
             :name="'item'+item.id"
             @mouseup.stop="e => select(e, item.id)"
             @keydown.up.prevent="selectPrevious"
             @keydown.down.prevent="selectNext"
             tabindex="0">
            <span>{{item.name}}</span>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { Group } from '../../stores/objects'

const props = defineProps<{
    group: Group,
    modelValue: number|null,
    searchQuery: string
}>()
const emits = defineEmits<{
    (e: 'update:modelValue', value: number|null): void
}>()

const expanded = ref(false)
const filtered = computed(() => props.group.members.filter(
    m => m.name.toLowerCase().includes(props.searchQuery.toLowerCase())))
const empty = computed(() => filtered.value.length == 0)

function select(e: MouseEvent, id: number) {
    const foo = e.target as HTMLDivElement
    foo.focus()
    emits('update:modelValue', id)
}
function selectNext(e: KeyboardEvent) {
    //repeated is a bit wonky -> disable
    if (e.repeat)
        return
    
    const div = e.target as HTMLDivElement
    const next = div.nextElementSibling as HTMLDivElement
    if (!!next) {
        const name = next.getAttribute('name')!
        //name is of form 'name5053' -> select numbers
        const id = parseInt(name.substring(4))
        //update
        emits('update:modelValue', id)
    }
}
function selectPrevious(e: KeyboardEvent) {
    //repeated is a bit wonky -> disable
    if (e.repeat)
        return

    const div = e.target as HTMLDivElement
    const prev = div.previousElementSibling as HTMLDivElement
    if (!!prev) {
        const name = prev.getAttribute('name')!
        //name is of form 'name5053' -> select numbers
        const id = parseInt(name.substring(4))
        //update
        emits('update:modelValue', id)
    }
}

const contentDiv = ref<HTMLDivElement|null>(null)
watch(props, () => {
    if (props.modelValue == null)
        return
    
    //Check if the selected object is in this group
    if (!filtered.value.find(o => o.id == props.modelValue))
        return

    //Expand if necessary
    if (!expanded.value)
        expanded.value = true
    
    //Get corresponding div (wait for rendering)
    nextTick(() => {
        const div = contentDiv.value!
        const item = div.querySelector('[name=item'+props.modelValue+']')! as HTMLDivElement
        item.focus()
    })
})
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
