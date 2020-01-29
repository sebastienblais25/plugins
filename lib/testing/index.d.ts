export default class Testing {
    /****** À enlever ******/
    _navigation: number;
    /*********** ***********/
    init(api: any): void;
    onMenuItemClick(): () => void;
    addLoginPanel(): void;
    connexionControls(navigation: number, panel: any, mapApi: any): void;
}
export default interface Testing {
    mapApi: any;
    _RV: any;
    config: any;
    button: any;
    translations: any;
    panel: any;
}
