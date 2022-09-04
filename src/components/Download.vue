<template>
<div class="root" @mouseup="response = 'foo'">
    <div v-if="state == 'working'" class="container working">
        <img src="/src/assets/loading.svg" class="image" />
        <p>Loading Event ...</p>
    </div>
    <div v-else-if="state == 'finished'" class="container finished">
        <div class="icon check"></div>
        <p>Download finished!</p>
    </div>
    <div v-else class="container failed">
        <div class="icon cross"></div>
        <p>Could not open event:<br />{{response}}</p>
    </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProject } from '../stores/project'
const project = useProject()

const response = ref('')
const state = ref('working')
const props = defineProps<{
    url: string
}>()
const emits = defineEmits<{
    (e: 'finished'): void
}>()

onMounted(() => {
    //Start download
    fetch(props.url)
    .then(res => {
        console.log(res.ok)
        if (!res.ok) {
            response.value = String(res.status) + ' ' + res.statusText
            throw new Error("Network response was not OK")
        }

        return res.arrayBuffer()
    })
    .then(buf => {
        state.value = 'finished'
        project.loadProject(buf)
    })
    .then(() => emits('finished'))
    .catch(err => {
        state.value = 'failed'
        console.log(state.value)
    })
})
</script>

<style scoped>
.root {
    width: 100%;
    height: 100%;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.4em;
    font-weight: bold;
    background-color: #2c2c2c;
}

.image {
    width: 200px;
    height: 200px;
}

.icon {
    width: 200px;
    height: 200px;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    background-color: white;
}

.check {
    mask-image: url(../assets/icons/check.svg);
    -webkit-mask-image: url(../assets/icons/check.svg);
}
.cross {
    mask-image: url(../assets/icons/xmark.svg);
    -webkit-mask-image: url(../assets/icons/xmark.svg);
}
</style>
