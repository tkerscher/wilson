<template>
<div class="dial-input-container">
    <div :class="['input-edit', valid ? 'input-valid' : 'input-invalid' ]" v-if="isEditing"
         ref="editDiv" contenteditable
         @keydown.prevent.enter="endEdit"
         @keydown.prevent.esc="cancelEdit"
         @focusout="endEdit"
         @input="checkInput">
    </div>
    <div class="dial-input" v-else
         tabindex="-1"
         @dblclick="startEdit"
         @mousedown="startDrag"
         @wheel="onWheel">
        {{(props.prefix ?? '') + props.modelValue.toFixed(2)}}
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

//Speeds for dragging units per pixel
const normalSpeed = 1.0
const fineSpeed = 0.01

const props = defineProps<{
    modelValue: number,
    minValue: number,
    maxValue: number,
    prefix: string,
}>()
const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const isEditing = ref(false)
const valid = ref(true)
const editDiv = ref<HTMLDivElement|null>(null)

function startEdit() {
    isEditing.value = true
    valid.value = true
    nextTick(() => {
        editDiv.value!.innerHTML = props.modelValue.toFixed(2)
        editDiv.value!.focus()
    })
}
function cancelEdit() {
    isEditing.value = false
}
function endEdit() {
    if (!isEditing.value) {
        return
    }

    if (valid.value) {
        emits('update:modelValue', Number(editDiv.value!.textContent))
    }

    isEditing.value = false
}

const numberExp = /^\d*(?:\.\d+)?$/
function checkInput() {
    const content = editDiv.value!.innerHTML
    valid.value = !!content.trim().match(numberExp)
}

function onWheel(e: WheelEvent) {
    //Only act if we have focus
    if (document.activeElement != e.target) {
        return
    }

    e.preventDefault()

    const delta = (e.altKey ? fineSpeed : normalSpeed) * (e.deltaY < 0 ? 1 : -1)
    var newValue = props.modelValue + delta
    if (newValue < props.minValue) {
        newValue = props.minValue
    }
    else if (newValue > props.maxValue) {
        newValue = props.maxValue
    }
    emits('update:modelValue', newValue)
}

function startDrag() {
    document.addEventListener('mousemove', dragging)
    document.addEventListener('mouseup', endDrag)
}
function endDrag() {
    document.removeEventListener('mousemove', dragging)
    document.removeEventListener('mouseup', endDrag)
}
function dragging(e: MouseEvent) {
    const delta = e.movementX * (e.altKey ? fineSpeed : normalSpeed)
    var newValue = props.modelValue + delta
    if (newValue < props.minValue) {
        newValue = props.minValue
    }
    else if (newValue > props.maxValue) {
        newValue = props.maxValue
    }
    emits('update:modelValue', newValue)
}
</script>

<style scoped>
.dial-input {
    color: white;
    user-select: none;
}
.dial-input:hover {
    cursor: ew-resize;    
}
.dial-input:focus {
    border-bottom: 2px solid #3497ff;
    margin-bottom: -2px;
}

.input-edit {
    background-color: white;
    height: 18px;
    border-radius: 50px;
    margin-bottom: -2px;
    overflow: hidden;
}
.input-edit:focus {    
    outline: 0px solid transparent;
}
.input-valid {
    border-bottom: 2px solid #3497ff;
}
.input-invalid {
    border-bottom: 2px solid red;
}
</style>
