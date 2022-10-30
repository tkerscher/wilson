<template>
<div class="root" @mouseup="response = 'foo'">
    <div v-if="state == 'working'" class="container working">
        <img src="/src/assets/loading.svg" class="image" />
        <p>Loading Event ...</p>
    </div>
    <div v-else-if="state == 'finished'" class="container finished">
        <div class="icon check-icon"></div>
        <p>Download finished!</p>
    </div>
    <div v-else class="container failed">
        <div class="icon xmark-icon"></div>
        <p>Could not open event:<br />{{response}}</p>
    </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCatalogue } from '../../stores/catalogue'
const catalogue = useCatalogue()

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
    .then(async buf => {
        state.value = 'finished'
        const prom = catalogue.openCatalogue(buf)

        //load event if specified
        const params = new URLSearchParams(window.location.search)
        if (params.has('event')) {
            await prom
            catalogue.loadProject(params.get('event')!)
        }
    })
    .then(() => emits('finished'))
    .catch(err => {
        state.value = 'failed'
        console.log(err)
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
    font-size: 1.4em;
    font-weight: bold;
    background-color: var(--background);
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
    background-color: var(--primary7);
}
</style>
