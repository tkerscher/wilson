<template>
<div class="drop-container"
     @dragenter.prevent.stop="onDragging">
    <slot></slot>
    <div :class="['drop-message', {'drop-message-allow': dragState == 'Allow', 'drop-message-error': isError}]"
         :style="{visibility: isDragging ? 'visible' : 'hidden'}">
        <div v-if="dragState == 'Allow'" class="message">
            <CloudUploadIcon class="icon" />
            <p>Drop the file here!</p>
        </div>
        <div v-else-if="dragState == 'Multiple'" class="message">
            <XIcon class="icon" />
            <p>You can only drop a single file!</p>
        </div>
        <div v-else-if="dragState == 'Missing'" class="message">
            <XIcon class="icon" />
            <p>You can only drop files!</p>
        </div>
        <div v-else-if="dragState == 'Unsupported'" class="message">
            <XIcon class="icon" />
            <p>The file is not supported!</p>
        </div>
    </div>
    <div class="drop-overlay"
         :style="{visibility: isDragging ? 'visible' : 'hidden'}"
         @dragover.prevent.stop="onDragging"
         @dragleave.prevent.stop="dragState = 'None'"
         @drop.prevent.stop="onDrop">
    </div>
</div>
</template>

<script setup lang="ts">
import { CloudUploadIcon, XIcon } from '@heroicons/vue/solid'
import { computed, ref } from 'vue'

type DragState = 'None' | 'Allow' | 'Multiple' | 'Missing' | 'Unsupported'

const dragState = ref<DragState>('None')
const isDragging = computed(() => dragState.value != 'None')
const isError = computed(() => dragState.value != 'None' && dragState.value != 'Allow')

const props = defineProps<{
    allowedFiles?: RegExp,
    errorDelay?: number //default 2000ms
}>()
const emit = defineEmits<{
    (e: 'fileDrop', file: File): void
}>()

function onDragging(e: DragEvent) {
    if (!e.dataTransfer || e.dataTransfer.items.length == 0) {
        //check if file missing
        dragState.value = 'Missing'
    }
    else if(e.dataTransfer.items.length > 1) {
        //multiple files
        dragState.value = 'Multiple'
    }
    else if(e.dataTransfer.items[0].kind != 'file') {
        //not a file
        dragState.value = 'Unsupported'
    }
    else {
        //Good to go
        dragState.value = 'Allow'
    }

    //Change cursor accordingly 
    if (e.dataTransfer) {
        if (dragState.value == 'Allow') {
            e.dataTransfer.dropEffect = 'copy'
            e.dataTransfer.effectAllowed = 'copyMove'
        }
        else {
            e.dataTransfer.effectAllowed = 'none'
        }
    }
}
function onDrop(e: DragEvent) {
    //Check if drop allowed
    if (dragState.value == 'Allow') {
        //check if file is valid
        if (props.allowedFiles && !props.allowedFiles.exec(e.dataTransfer!.files[0].name)) {
            //Not allowed
            dragState.value = 'Unsupported'
            setTimeout(() => {
                if (dragState.value == 'Unsupported') {
                    dragState.value = 'None'
                }
            }, props.errorDelay ? props.errorDelay : 2000)
        }
        else {
            emit('fileDrop', e.dataTransfer!.files[0])
            dragState.value = 'None'
        }
    }
    else {
        dragState.value = 'None'
    }
}
</script>

<style scoped>
.drop-container {
    width: 100%;
    height: 100%;
}

.drop-overlay {
    width: 100%;
    height: 100%;
    z-index: 5;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.drop-message {
    width: 100%;
    height: 100%;
    z-index: 3;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
}
.drop-message-allow {
    background-color: #3497ff85;
}
.drop-message-error {
    background-color: #d73a2985;
}
.icon {
    width: 80px;
    height: 80px;
}
</style>
