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
    <div v-if="expanded" class="content">
        <div v-for="item in filtered"
             :class="['item', { 'item-selected': props.modelValue == item.id }]"
             @mouseup.stop="emits('update:modelValue', item.id)">
            <span>{{item.name}}</span>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Group } from '../stores/objects'

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
}
.item:hover {
    cursor: pointer;
    background-color: var(--primary5);
}
.item-selected {
    background-color: var(--primary5);
}
</style>
