<template>
  <div class="res-root">
    <div>
      <input
        id="fit"
        v-model="radioValue"
        type="radio"
        name="resolution"
        value="fit"
      >
      <label for="fit">Fit to window size</label>
    </div>
    <div>
      <input
        id="fixed"
        v-model="radioValue"
        type="radio"
        name="resolution"
        value="fixed"
      >
      <label for="fixed">Fixed resolution</label>
    </div>
    <table class="res-table">
      <tr>
        <td>Width:</td>
        <td>
          <NumberInput
            v-model="resolution.width"
            :disabled="!resolution.fixed"
            :min-value="300"
            :max-value="8000"
          />
        </td>
      </tr>
      <tr>
        <td>Height:</td>
        <td>
          <NumberInput
            v-model="resolution.height"
            :disabled="!resolution.fixed"
            :min-value="300"
            :max-value="8000"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import NumberInput from "../input/NumberInput.vue";
import { ref, watch } from "vue";
import { useResolution } from "../../stores/resolution";
const resolution = useResolution();

const radioValue = ref(resolution.fixed ? "fixed" : "fit");
watch(radioValue, v => resolution.fixed = v == "fixed");
</script>

<style scoped>
label {
    margin-left: 5px;
    user-select: none;
}

.res-root {
    text-align: left;
}
.res-root > * {
    margin: 10px;
}

.res-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 6px;
    margin: 5px 0;
}
.res-table tr td:nth-child(1) {
    width: 80px;
    text-align: right;
    vertical-align: top;
    user-select: none;
}
</style>
