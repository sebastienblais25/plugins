export declare class PanelSettings {
    constructor(mapApi: any, panelManager: any, template: string, config: any);
    compileTemplate(template: any): JQuery<HTMLElement>;
    isOpen: boolean;
}
export interface PanelSettings {
    mapApi: any;
    open: boolean;
    settingsPanel: any;
}
