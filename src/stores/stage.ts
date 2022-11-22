import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { SceneCommander } from "../scene/bus/commandBus";

export const useStage = defineStore("stage", () => {
    let blob: Blob|null = null;
    let url = "";
    const progress = ref<number>(-1);
    const error = ref<string>("");

    const isDownloading = computed(() => progress.value >= 0);

    function loadStage(url: string) {
        //reset state
        progress.value = -1;
        error.value = "";

        //download asset
        fetch(url)
            .then(async res => {
                if (!res.ok || !res.body) {
                    error.value = String(res.status) + " " + res.statusText;
                    throw new Error("Network response was not OK");
                }

                //See if progress is possible to calculate
                const length = +(res.headers.get("Content-Length") ?? -1);
                if (length == -1)
                    return res.blob();

                //read download in chunks
                const reader = res.body.getReader();
                let received = 0;
                const chunks = [] as Uint8Array[];
                for(;;) {
                    const { done, value } = await reader.read();
                    if (done)
                        break;

                    chunks.push(value);
                    received += value.length;

                    progress.value = received / length;
                }

                //concat chunks
                const chunksAll = new Uint8Array(received);
                let position = 0;
                for(const chunk of chunks) {
                    chunksAll.set(chunk, position);
                    position += chunk.length;
                }

                //return
                return new Blob([chunksAll]);
            })
            .then(blob => {
                setStage(blob);
            });
    }
    function setStage(data: Blob) {
        //revoke earlier data
        removeStage();

        //reset state
        progress.value = -1;
        error.value = "";

        //save data and create url
        blob = data;
        url = URL.createObjectURL(blob);

        //notify controller
        applyStage();
    }
    function applyStage() {
        if (url)
            SceneCommander.SetStage(url);
    }
    function removeStage() {
        if (url) {
            SceneCommander.RemoveStage();
            URL.revokeObjectURL(url);
            url = "";
        }
    }

    return {
        error,
        progress,
        url,
        isDownloading,
        applyStage,
        loadStage,
        setStage,
        removeStage
    };
});
