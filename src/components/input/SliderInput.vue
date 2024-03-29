<template>
  <div
    class="slider-container"
    role="slider"
  >
    <div
      ref="timeline"
      class="timeline"
      @mousedown="timelineDown"
    >
      <div
        class="elapsed-bar"
        :style="{ width: ratio}"
      />
      <div class="thumb" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
    modelValue: number
    minValue: number,
    maxValue: number
}>();
const emits = defineEmits<{
    (e: "update:modelValue", value: number): void
    (e: "scrubbingStart"): void
    (e: "scrubbingEnd"): void
}>();

const timeline = ref<HTMLDivElement|null>(null);
const ratio = computed(() => (props.modelValue - props.minValue) / (props.maxValue - props.minValue) * 100 + "%");

function timelineDown(e: MouseEvent) {
    if (!timeline.value)
        return;

    emits("scrubbingStart");

    const newRatio = e.offsetX / timeline.value.clientWidth;
    const newValue = newRatio * (props.maxValue - props.minValue) + props.minValue;
    emits("update:modelValue", newValue);

    document.addEventListener("mousemove", timelineMove);
    document.addEventListener("mouseup", timelineUp);
}
function timelineUp() {
    emits("scrubbingEnd");

    document.removeEventListener("mousemove", timelineMove);
    document.removeEventListener("mouseup", timelineUp);
}
function timelineMove(e: MouseEvent) {
    if (!timeline.value)
        return;

    //We're listening on the document -> reconstruct x relative to timeline div
    const rect = timeline.value.getBoundingClientRect();
    const offsetX = e.pageX - rect.left;

    //Mouse might be outside the timeline -> clamp value
    if (offsetX < 0) {
        emits("update:modelValue", props.minValue);
    }
    else if(offsetX > rect.width) {
        emits("update:modelValue", props.maxValue);
    }
    else {
        const newRatio = offsetX / rect.width;
        const newValue = newRatio * (props.maxValue - props.minValue) + props.minValue;
        emits("update:modelValue", newValue);
    }
}
</script>

<style scoped>
.slider-container {
    height: 20px;
    width: 100%;

    display: flex;
    justify-content: center;
}

.timeline {
    height: 8px;
    width: 100%;
    margin: auto 10px;
    background-color: var(--primary6);
    border-radius: 9999px; /** It's over 9000! */

    display: flex;
    align-items: center;
}
.timeline:hover {
    height: 10px;
    cursor: pointer;
}
.elapsed-bar {
    background-color: var(--highlight1);
    height: 100%;
    border-radius: 9999px;
}

.thumb {
    height: 18px;
    width: 18px;

    margin-left: -9px;

    border-radius: 10px;
    background-color: var(--highlight1);
}
</style>
