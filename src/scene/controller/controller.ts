import { Project } from "../../model/project";
import { Theme } from "../theme";

export interface SceneController {

    /**
     * Loads the given project into the scene and replaces any already present
     * scene
     */
    load(project: Project): void

    /**
     * Loads the given mesh from the file at the provided url and adds it to
     * the scene. Expects a .glb file. This will persist through all loaded
     * projects.
     * @param url Path to stage file
     */
    loadStage(url: string): void
    /**
     * Removes the current stage.
     */
    removeStage(): void

    /**************************** Animation Control ***************************/

    /**
     * The current frame of the animation.
     */
    get currentFrame(): number
    /**
     * True, if the animation is currently playing
     */
    get isPlaying(): boolean
    /**
     * True, if the scene has no animations
     */
    get isStatic(): boolean
    /**
     * Gets or sets the speed ratio, i.e. the amount of frames per second
     */
    get speedRatio(): number
    set speedRatio(value: number)
    /**
     * Starts or resumes the animation
     */
    play(): void
    /**
     * Pauses the animation
     */
    pause(): void
    /**
     * Jumps to the specified frame in animation
     * @param frame Frame to animation should jump to
     */
    goToFrame(frame: number): void

    /**
     * Registers a callback function to be called on animation ticks, i.e. when
     * the current frame changes
     */
    registerOnFrameChanged(callback: (currentFrame: number) => void): void
    /**
     * Registers a callback function to be called once the animations is about
     * to loop.
     */
    registerOnAnimationLoop(callback: () => void): void

    /*************************** Scene Interaction ****************************/

    /**
     * Resets the camera to its initial position
     */
    resetCamera(): void
    /**
     * Selects a given object via its id or remove selection if null passed.
     * @param id Id of object
     */
    select(id: number|null): void
    /**
     * Pans the camera to target an object specified by its id
     * @param id Id of object to target
     */
    target(id: number): void
    /**
     * Shows or hides a group of objects via their group name
     * @param group Group name
     * @param enabled True, if the objects in the group should be shown
     */
    setGroupEnabled(group: string, enabled: boolean): void
    /**
     * Shows or hides a visualization of the path given by its id
     * @param id Id of path
     * @param enabled True, if the path should be shown
     * @param color Color in which the path should be drawn
     */
    setPathEnabled(id: number, enabled: boolean, color: string): void

    /**
     * Registers a callback function to be called when an object was picked by
     * the user. Provides either the objects unique id.
     */
    registerOnObjectPicked(callback: (objectId: number|null) => void): void

    /****************************** User Input ********************************/

    /**
     * Simulates a pointer down event on the scene
     * @param x X coordinate of the event relative to the canvas
     * @param y Y coordinate of the event relative to the canvas
     */
    simulatePointerDown(x: number, y: number): void
    /**
     * Simulates a pointer up event on the scene
     * @param x X coordinate of the event relative to the canvas
     * @param y Y coordinate of the event relative to the canvas
     */
    simulatePointerUp(x: number, y: number): void
    /**
     * Simulates a pointer move event on the scene
     * @param x X coordinate of the event relative to the canvas
     * @param y Y coordinate of the event relative to the canvas
     */
    simulatePointerMove(x: number, y: number): void

    /**************************** Camera Control ******************************/

    /**
     * Pans the camera relative to the screen surface
     * @param dx Horizontal distance
     * @param dy Vertical distance
     */
    panCamera(dx: number, dy: number): void

    /**
     * Rotates the camera around the current target relative to current
     * orientation
     * @param alpha horizontal rotation
     * @param beta vertical rotation
     */
    rotateCamera(alpha: number, beta: number): void

    /**
     * Zooms the camera either in or out depending on the sign of delta
     * @param delta Amount to zoom
     */
    zoomCamera(delta: number): void

    /**
     * Sets the camera target, i.e. origin of rotation
     * @param x
     * @param y
     * @param z
     */
    setCameraTarget(x: number, y: number, z: number): void

    /**
     * Sets the camera rotation
     * @param alpha
     * @param beta
     */
    setCameraRotation(alpha: number, beta: number): void

    /**
     * Sets the camera zoom
     * @param distance
     */
    setCameraZoom(distance: number): void

    /****************************** Appearance ********************************/

    /**
     * True, if the grid on the xy-plane is currently visible.
     */
    get isGridEnabled(): boolean
    /**
     * Shows or hides the grid on the xy-plane.
     * @param enabled Wether to show the grid
     */
    setGridEnabled(enabled: boolean):void
    /**
     * Resizes the underlying canvas
     * @param width
     * @param height
     */
    resize(width: number, height: number): void
    /**
     * Updates the scenes theme
     * @param theme Theme to apply
     */
    setTheme(theme: Theme): void

    /********************************* Other **********************************/

    /**
     * Frees allocated resources, thus invalidating this controller.
     */
    dispose(): void
    /**
     * Takes a screenshot of the scenes current state
     */
    screenshot(): void
    /**
     * Name under which screenshots should be saved.
     */
    screenshotFilename: string
}
