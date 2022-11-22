<template>
  <div class="root">
    <div
      v-if="state == 'working'"
      class="container working"
    >
      <img
        src="/src/assets/loading.svg"
        class="image"
      >
      <p>Loading Catalogue {{ progress }}...</p>
    </div>
    <div
      v-else-if="state == 'finished'"
      class="container finished"
    >
      <div class="icon check-icon" />
      <p>Download finished!</p>
    </div>
    <div
      v-else
      class="container failed"
    >
      <div class="icon xmark-icon" />
      <p>Could not open catalogue!<br>{{ response }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCatalogue } from "../../stores/catalogue";
const catalogue = useCatalogue();

const progress = ref("");
const response = ref("");
const state = ref("working");
const props = defineProps<{
    url: string
}>();
const emits = defineEmits<{
    (e: "finished"): void
}>();

onMounted(() => {
    //Start download
    fetch(props.url)
        .then(async res => {
            if (!res.ok || !res.body) {
                response.value = String(res.status) + " " + res.statusText;
                throw new Error("Network response was not OK");
            }

            //See if progress is possible to calculate
            const length = +(res.headers.get("Content-Length") ?? -1);
            if (length == -1)
                return res.arrayBuffer();

            //read download in chunks
            const reader = res.body.getReader();
            let received = 0;
            let chunks = [] as Uint8Array[];
            for(;;) {
                const { done, value } = await reader.read();
                if (done)
                    break;

                chunks.push(value);
                received += value.length;

                progress.value = `${(received / length * 100).toFixed()}% `;
            }

            //concat chunks
            let chunksAll = new Uint8Array(received);
            let position = 0;
            for(let chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }

            //return
            return chunksAll.buffer;
        })
        .then(buf => {
            state.value = "finished";
            const prom = catalogue.openCatalogue(buf).catch(error => {
                response.value = "File is not a catalogue!";
                throw error;
            });

            //load event if specified
            const params = new URLSearchParams(window.location.search);
            const url = params.get("event");
            if (url) {
                return prom.then(() => catalogue.loadProject(url));
            }
            else {
                return prom;
            }
        })
        .then(() => {
            emits("finished");
        })
        .catch(() => {
            state.value = "failed";
        });
});
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
