<template>
  <div
    :class="['number-input', { 'input-invalid': invalid, 'input-disabled': !!props.disabled } ]"
    :contenteditable="!props.disabled"
    @keydown.prevent.enter="endEdit"
    @keydown.prevent.esc="cancelEdit"
    @focusout="endEdit"
    @input="checkInput"
  >
    {{ props.modelValue }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    modelValue: number,
    minValue: number,
    maxValue: number,
    disabled?: boolean
}>();
const emits = defineEmits<{
    (e: "update:modelValue", value: number): void
}>();

const invalid = ref(false);
const value = ref(props.modelValue);

function cancelEdit() {
    //Restore value
    value.value = props.modelValue;
    invalid.value = false;
}
function endEdit() {
    //emit only if valid
    if (!invalid.value)
        emits("update:modelValue", value.value);
}

function checkInput(e: Event) {
    const div = e.target as HTMLDivElement;
    const x = Number.parseInt(div.innerHTML);
    //validate
    const valid = !isNaN(+div.innerHTML) && x >= props.minValue && x <= props.maxValue;
    invalid.value = !valid;
    if (valid)
        value.value = x;

}
</script>

<style scoped>
.number-input {
    background-color: transparent;
    border-bottom: 2px solid var(--highlight1);
    text-align: left;
}
.number-input:focus {
    outline: 0px solid transparent;
}
.input-disabled {
    border-bottom: 2px solid var(--primary5) !important;
    color: var(--primary5);
}
.input-invalid {
    border-bottom: 2px solid var(--error) !important;
}
</style>
