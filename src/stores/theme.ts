import { defineStore } from "pinia";
import { ref } from "vue";

export const useTheme = defineStore('theme', () => {
    const useDarkTheme = ref(false)
    function toggleTheme() {
        useDarkTheme.value = !useDarkTheme.value
        //set data attribute
        document.documentElement.setAttribute('theme',
            useDarkTheme.value ? "dark" : "light")
        //save setting
        window.localStorage.setItem("theme",
            useDarkTheme.value ? "dark" : "light")
    }

    //see if user preference stored in local storage
    const _st = window.localStorage.getItem("theme")
    if (!!_st) {
        useDarkTheme.value = _st == "dark"
    }
    else {
        //query browser what to use
        useDarkTheme.value = window.matchMedia(
            '(prefers-color-scheme: dark)').matches
    }

    //tell css about the theme
    document.documentElement.setAttribute('theme',
            useDarkTheme.value ? "dark" : "light")

    //listen to storage event to keep this sync across windows
    addEventListener('storage', (ev: StorageEvent) => {
        if (ev.key == "theme" &&
            (ev.newValue == "dark") != useDarkTheme.value)
        {
            toggleTheme()
        }
    })

    //done
    return { useDarkTheme, toggleTheme }
})
