import { panel } from './panelManager';
export default class Testing {
    _panel: panel;
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
    buttonp: any;
}
