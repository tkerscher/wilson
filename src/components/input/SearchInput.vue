<template>
  <div class="container">
    <div class="label icon-small magnifying-glass-icon" />
    <input
      ref="input"
      type="search"
      class="search-box"
      placeholder="Filter (Ctrl+Q)"
      :value="props.modelValue"
      @input="onInput"
      @keyup.esc="clear"
      @keyup.enter="finish"
    >
    <div
      :style="{'visibility': nonEmpty ? 'visible' : 'hidden'}"
      class="button icon-small xmark-icon"
      role="button"
      @click="clear"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
const input = ref<HTMLInputElement|null>(null);

const props = defineProps<{
    modelValue: string
}>();
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();

const nonEmpty = computed(() => props.modelValue.length > 0);

function clear() {
    if (props.modelValue.length > 0) {
        emits('update:modelValue', '');
    }
    else {
        input.value?.blur();
    }
}

function finish() {
    input.value?.blur();
}

function onInput(e: Event) {
    emits('update:modelValue', (e.target as HTMLInputElement).value);
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
        e.preventDefault();

        input.value?.focus();
    }
}
onMounted(() => {
    document.addEventListener('keydown', focus);
});
onBeforeUnmount(() => {
    document.removeEventListener('keydown', focus);
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.search-box {
    flex: 1;
}

.label {
    background-color: var(--primary7);
    margin: 0 5px;
}
.button {
    background-color: var(--primary7);
    margin-right: 5px;
}
.button:hover {
    cursor: pointer;
}
</style>
