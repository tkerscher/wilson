<template>
  <div
    ref="container"
    class="resize-container"
    :style="containerStyle"
  >
    <slot />
    <div
      :class="['grip', 'grip-' + props.gripPosition, {'grip-resizing': isResizing}]"
      @mousedown="startResize"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref, Ref } from "vue";

const isResizing = ref(false);
const container: Ref<HTMLElement|null> = ref(null);
const containerStyle = reactive({
    width: "100%",
    height: "100%"
});
const props = defineProps<{
    gripPosition: "top"|"left"|"right"|"bottom",
    storeKey?: string,
    defaultSize?: string
}>();

//retrieve stored size
onBeforeMount(() => {
    //set default size
    if (props.defaultSize != null) {
        if (props.gripPosition == "top" || props.gripPosition == "bottom") {
            containerStyle.height = props.defaultSize;
        }
        else {
            containerStyle.width = props.defaultSize;
        }
    }
    //check if persistent
    if (props.storeKey != null) {
        //check if there has been anything stored
        const size: string | null = localStorage.getItem(props.storeKey);
        if (size != null) {
            //store either as width or height
            if (props.gripPosition == "top" || props.gripPosition == "bottom") {
                containerStyle.height = size;
            }
            else {
                containerStyle.width = size;
            }
        }
    }
});

function updateSize(event: MouseEvent) {
    if (!container.value)
        return;

    const rect = container.value.getBoundingClientRect();
    var size = "";
    switch (props.gripPosition) {
    case "top":
        size = (rect.bottom - event.clientY) + "px";
        containerStyle.height = size;
        break;
    case "bottom":
        size = (event.clientY - rect.top) + "px";
        containerStyle.height = size;
        break;
    case "left":
        size = (rect.right - event.clientX) + "px";
        containerStyle.width = size;
        break;
    case "right":
        size = (event.clientX - rect.left) + "px";
        containerStyle.width = size;
        break;
    }
    //Store size if needed
    if (props.storeKey != null) {
        localStorage.setItem(props.storeKey, size);
    }
}

function startResize() {
    isResizing.value = true;

    document.addEventListener("mousemove", updateSize);
    document.addEventListener("mouseup", onMouseUp);
    if (props.gripPosition == "bottom" || props.gripPosition == "top") {
        document.body.style.cursor = "ns-resize";
    }
    else {
        document.body.style.cursor = "ew-resize";
    }
}
function onMouseUp() {
    isResizing.value = false;
    document.removeEventListener("mousemove", updateSize);
    document.removeEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "";
}
</script>

<style scoped>
.resize-container {
    position: relative;
}
.grip {
    position: absolute;
    z-index: 5;
}
.grip:hover, .grip-resizing {
    background-color: #3497ff;
}
.grip-left:hover, .grip-left.grip-resizing,
.grip-right:hover, .grip-right.grip-resizing {
    cursor: ew-resize;
}
.grip-top:hover, .grip-top.grip-resizing,
.grip-bottom:hover, .grip-bottom.grip-resizing {
    cursor: ns-resize;
}
.grip-top, .grip-bottom {
    width: 100%;
    height: 4px;
}
.grip-left, .grip-right {
    height: 100%;
    width: 4px;
}

.grip-top {
    top: 0;
    left: 0;
    right: 0;
}
.grip-bottom {
    bottom: 0;
    left: 0;
    right: 0;
}
.grip-left {
    top: 0;
    bottom: 0;
    left: 0;
}
.grip-right {
    top: 0;
    bottom: 0;
    right: 0;
}
</style>
