<template>
  <div class="alpha-root">
    <input
      id="enableAlpha"
      ref="checkbox"
      type="checkbox"
      checked
      @change="onChanged"
    >
    <label for="enableAlpha">Enable Alpha Blending</label>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { SceneCommander } from "../../scene/bus/commandBus";

const checkbox: Ref<HTMLInputElement|null> = ref(null);
function onChanged() {
    if (checkbox.value)
        SceneCommander.SetAlphaBlendingEnabled(checkbox.value.checked);
}
</script>

<style scoped>
label {
    user-select: none;
}

.alpha-root {
    text-align: left;
}
.alpha-root > * {
    margin: 10px 0px 10px 20px;
}
</style>
