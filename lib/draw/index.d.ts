import { PanelManager } from './panel-manager';
export default class Draw {
    /**
     * Plugin init
     * @function init
     * @param {Object} mapApi the viewer api
     */
    init(mapApi: any): void;
    /**
     * Event to fire on side menu item click
     * @function onMenuItemClick
     * @return {function} the function to run
     */
    onMenuItemClick(): () => void;
}
export default interface Draw {
    mapApi: any;
    _RV: any;
    config: any;
    translations: any;
    panelManager: PanelManager;
    button: any;
}
