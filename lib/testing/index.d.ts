import { panelMod } from './panelManager';
export default class Testing {
    _panel: panelMod;
    init(api: any): void;
    onMenuItemClick(): () => void;
    addPanel(): void;
    listenToAlert(): void;
    clickHandler(clickEvent: any): void;
}
export default interface Testing {
    mapApi: any;
    _RV: any;
    config: any;
    button: any;
    translations: any;
    panel: any;
    angular: any;
    buttonp: any;
}
