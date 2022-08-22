<template>
<div class="root">
    <div class="header">
        <div :class="['button', expanded ? 'chevron-down-icon' : 'chevron-right-icon']"
             :title="expanded ? 'Collapse Group' : 'Expand Group'"
             role="button"
             @mouseup.stop="expanded = !expanded">
        </div>
        <div class="title">
            <span v-if="props.group.name.length > 0">{{ props.group.name }}</span>
            <span v-else class="empty-label">Ungrouped</span>
        </div>
        <div :class="['button', props.group.visible ? 'visible-icon' : 'hide-icon']"
             :title="props.group.visible ? 'Hide Group' : 'Show Group'"
             role="button"
             @mouseup.stop="props.group.visible = !props.group.visible">
        </div>
    </div>
    <div v-if="expanded" class="content">
        <div v-for="item in props.group.members"
             :class="['item', { 'item-selected': props.modelValue == item.id }]"
             @mouseup.stop="emits('update:modelValue', item.id)">
            <span>{{item.name}}</span>
            <p v-if="props.modelValue == item.id && item.description.length > 0" class="description">
                {{item.description}}
            </p>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Group } from '../stores/objects'

const props = defineProps<{
    group: Group,
    modelValue: number|null
}>()
const emits = defineEmits<{
    (e: 'update:modelValue', value: number|null): void
}>()

const expanded = ref(false)
</script>

<style scoped>
.root {
    width: 100%;
    color: white;
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
    height: 12px;
    width: 12px;
    margin-right: 10px;
    background-color: white;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
}
.button:hover {
    cursor: pointer;
}

.item {
    margin-left: 10px;
    padding: 5px 0px 5px 20px;
    border-left: 1px rgb(138, 138, 138) solid;
    text-align: left;
}
.item:hover {
    cursor: pointer;
    background-color: #3d3d3d;
}
.item-selected {
    background-color: #3d3d3d;
}

.description {
    margin-left: 10px;
    font-style: italic;
}

.chevron-right-icon {
    mask-image: url(../assets/icons/chevron-right.svg);
    -webkit-mask-image: url(../assets/icons/chevron-right.svg);
}
.chevron-down-icon {
    mask-image: url(../assets/icons/chevron-down.svg);
    -webkit-mask-image: url(../assets/icons/chevron-down.svg);
}
.visible-icon {
    mask-image: url(../assets/icons/eye.svg);
    -webkit-mask-image: url(../assets/icons/eye.svg);
}
.hide-icon {
    mask-image: url(../assets/icons/eye-slash.svg);
    -webkit-mask-image: url(../assets/icons/eye-slash.svg);
}
</style>
