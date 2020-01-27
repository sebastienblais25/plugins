export declare class panelMod {
    ispanelshowing: boolean;
    _panel: any;
    _panelname: string;
    _panelTitle: string;
    _panelBottom: string;
    _panelWidth: string;
    createPanel(panel: any, mapApi: any, panelname?: string, paneltitle?: string, panelBottom?: string, panelwidth?: string): any;
    submitForm(_RV: any): void;
}
export interface PanelManager {
    panel: any;
    mapApi: any;
    active: object;
}
