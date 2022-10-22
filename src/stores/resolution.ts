import { defineStore } from "pinia";

export const useResolution = defineStore('resolution', {
    state: () => ({
        fixed: false,
        width: 1920,
        height: 1080
    })
})
