import { KeyMap } from "./keyMap";

export interface Catalogue {
    loadNextProject(): void
    loadPreviousProject(): void
}

export class CatalogueControl {
    #handlerOnce: (e: KeyboardEvent) => void;

    constructor(c: Catalogue) {
        //create hotkeys
        const hotKeysOnce = new KeyMap([
            ["KeyI", () => c.loadPreviousProject()],
            ["KeyO", () => c.loadNextProject()]
        ]);

        //create handler
        this.#handlerOnce = e => {
            if (!e.repeat)
                hotKeysOnce.exec(e);
        };

        //register handler
        document.addEventListener("keydown", this.#handlerOnce);
    }

    dispose() {
        document.removeEventListener("keydown", this.#handlerOnce);

        this.#handlerOnce = () => undefined;
    }
}
