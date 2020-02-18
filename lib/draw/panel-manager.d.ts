import { DrawToolbar } from './toolbar';
export declare class PanelManager {
    private _mousemoveHandler;
    private _mouseclickHandler;
    private _controls;
    /**
     * Panel constructor
     * @constructor
     * @param {Any} mapApi the viewer api
     * @param {Object} config the viewer configuration
     */
    constructor(mapApi: any, config: object);
    /**
     * Set the tools inactive
     * @function setInactive
     * @param {Object} mapApi the viewer api
     * @param {Object} config the viewer configuration
     */
    setInactive(): void;
    /**
     * Create controls
     * @function makeControls
     * @param {Object} config the viewer configuration
     */
    makeControls(config: any): void;
    /**
     * Create Angular controls (buttons and controllers)
     * @function makeControls
     * @param {String[]} tools array of tools to create
     */
    angularControls(tools: string[]): void;
    /**
     * Create button icon
     * @function createIcon
     * @param {Control} control control to create icon for
     */
    createIcon(control: control, icon?: string): void;
    /**
     * Set controls sate
     * @function setActive
     * @param {Controls[]} controls controls array to mange state
     * @param {String} name control name to activate or deactivate
     * @param {Boolean} [forceDisable] do we force disable all controls
     */
    setActive(controls: control[], name: string, forceDisable?: boolean): void;
    /**
     * Manage keyDown jQuery event to let keyboard user use the plugins (WCAG)
     * @function keyDownHandler
     * @param {Any} event jQuery event on key down
     */
    keyDownHandler(event: any): void;
    /**
     * Manage mouse mouve event add measure on move and add point on click
     * @function mouseHandler
     * @param {Any} event jQuery event on mouse move
     * @param {DrawToolbar} drawToolbar esri draw toolbar
     */
    mouseHandler(event: any, drawToolbar: DrawToolbar): void;
    /**
     * Manage the show/hide measure click
     * @function measure
     * @param {Control} measure measure control
     * @param {PanelManager} that the class
     */
    measure(measure: control, that: PanelManager): void;
    /**
     * Compile template to link controller and html
     * @function compileTemplate
     * @param {String} template measure control
     * @return {JQuery<HTMLElement>} temp compile template
     */
    compileTemplate(template: string): JQuery<HTMLElement>;
}
export interface control {
    name: string;
    icon: string;
    active: boolean;
}
export interface PanelManager {
    panel: any;
    mapApi: any;
    active: object;
    drawToolbar: DrawToolbar;
}
