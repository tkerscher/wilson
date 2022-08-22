<template>
<div class="container">
    <input
        ref="input"
        type="search"
        class="search-box"
        placeholder="Filter (Ctrl+Q)"
        :value="props.modelValue"
        @input="onInput"
        @keyup.esc="clear"
    />
</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
const input = ref<HTMLInputElement|null>(null)

const props = defineProps<{
    modelValue: string
}>()
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

function clear() {
    if (props.modelValue.length > 0) {
        emits('update:modelValue', '')
    }
    else {
        input.value!.blur()
    }
}

function onInput(e: Event) {
    emits('update:modelValue', (e.target as HTMLInputElement).value)
}

//handle global shortcut
function focus(e: KeyboardEvent) {
    //Check for Ctrl+Q
    if (e.ctrlKey &&
        !e.altKey &&
        !e.metaKey &&
        !e.shiftKey &&
        e.key == 'q')
    {
        e.preventDefault()

        input.value!.focus()
    }
}
onMounted(() => {
    document.addEventListener('keydown', focus)
})
onBeforeUnmount(() => {
    document.removeEventListener('keydown', focus)
})
</script>

<style scoped>
input {
    border: 0;
    width: 100%;
}
</style>
