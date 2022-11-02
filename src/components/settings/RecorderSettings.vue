<template>
  <table>
    <tr>
      <td>FPS:</td>
      <NumberInput
        v-model="player.recorderFps"
        :min-value="5"
        :max-value="120"
      />
    </tr>
  </table>
</template>

<script setup lang="ts">
import NumberInput from "../input/NumberInput.vue";
import { usePlayer } from "../../stores/player";
const player = usePlayer();
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 6px;
    margin: 5px 0;
}
table tr td:nth-child(1) {
    width: 80px;
    text-align: right;
    vertical-align: top;
    user-select: none;
}
</style>
