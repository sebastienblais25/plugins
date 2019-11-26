import { PanelManager } from './panel-manager';
export default class Collaboration {
    private _style;
    init(mapApi: any): void;
    onMenuItemClick(): () => void;
}
export default interface Collaboration {
    mapApi: any;
    _RV: any;
    config: any;
    translations: any;
    panelManager: PanelManager;
    button: any;
}
