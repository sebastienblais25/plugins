/**
 * ...
 */
export declare class PanelManager {
    constructor(mapApi: any, config: any);
    setAdvanceMode(config: any): void;
    setSettingPanel(config: any): void;
    setHistoPanel(config: any): void;
    setBarControls(controls: any): void;
    compileTemplate(template: any): JQuery<HTMLElement>;
}
export interface PanelManager {
    mapApi: any;
    panel: any;
}
