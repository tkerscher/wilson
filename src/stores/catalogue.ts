import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { Reader } from "protobufjs/minimal";
import JSZip from "jszip";

import { ProjectMeta } from "../model/meta";
import { useProject } from "./project";
import { createDownload } from "../util/download";

const META_TAG = 1;

function extractMeta(data: Uint8Array): ProjectMeta|null {
    const reader = new Reader(data);
    //seek meta message
    while(reader.pos < reader.len) {
        const tag = reader.uint32();
        if (tag >>> 3 == META_TAG) {
            //found it -> decode and return
            return ProjectMeta.decode(reader, reader.uint32());
        }
        else {
            //not the right tag -> skip this one
            reader.skipType(tag & 7);
        }
    }
    //Nothing found
    return null;
}

export interface CatalogueEntry {
    filename: string
    meta: ProjectMeta
}

export const useCatalogue = defineStore("catalogue", () => {
    const project = useProject();
    let archive = new JSZip();  //start with empty catalogue
    let data: ArrayBuffer; //keep binary for download

    const entries = ref<CatalogueEntry[]>([]);
    const length = computed(() => entries.value.length);
    const isEmpty = computed(() => entries.value.length == 0);
    const currentIndex = ref(-1);

    function reset() {
        entries.value = [];
        currentIndex.value = -1;
    }

    function openCatalogue(buffer: ArrayBuffer): Promise<void> {
        reset();
        data = buffer;

        return JSZip.loadAsync(buffer).then(async zip => {
            //store archive
            archive = zip;

            //construct entries
            const proms = [] as Promise<void>[];
            archive.forEach((path, file) => {
                proms.push(file.async("uint8array").then(data => {
                    const meta = extractMeta(data);
                    if (meta) {
                        entries.value.push({
                            filename: path,
                            meta: meta
                        });
                    }
                }));
            });

            //if only one file open it right away
            if (proms.length == 1) {
                return proms[0].then(() => loadProject(entries.value[0].filename));
            }
            else {
                //Entries are totally random now => sort them by name to be deterministic
                return Promise.all(proms).then(() => entries.value.sort((a, b) => {
                    //thanks javascript...
                    if (a.filename < b.filename) return -1;
                    if (a.filename > b.filename) return 1;
                    return 0;
                })).then(() => undefined);
            }
        });
    }

    function loadProject(filename: string) {
        //get file
        const file = archive.file(filename);
        if (!file)
            return;

        currentIndex.value = entries.value.findIndex(v => v.filename == filename);

        //load project
        file.async("uint8array").then(project.loadProject);
    }
    function loadPreviousProject() {
        currentIndex.value = currentIndex.value > 0 ?
            currentIndex.value - 1 :
            entries.value.length - 1;
        const prev = entries.value[currentIndex.value];
        loadProject(prev.filename);
    }
    function loadNextProject() {
        currentIndex.value = currentIndex.value < entries.value.length - 1 ?
            currentIndex.value + 1 : 0;
        const next = entries.value[currentIndex.value];
        loadProject(next.filename);
    }

    function saveCatalogue() {
        const blob = new Blob([new Uint8Array(data)]);
        createDownload(blob, "catalogue.wlsn");
    }

    return {
        entries,
        isEmpty,
        length,
        currentIndex,
        openCatalogue,
        saveCatalogue,
        reset,
        loadProject,
        loadPreviousProject,
        loadNextProject
    };
});
