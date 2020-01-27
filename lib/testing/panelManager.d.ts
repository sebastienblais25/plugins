export declare class panel {
    ispanelshowing: boolean;
    _panel: any;
    _panelname: string;
    _panelTitle: string;
    _panelBottom: string;
    _panelWidth: string;
    createPanel(panel: any, mapApi: any, panelname?: string, paneltitle?: string, panelBottom?: string, panelwidth?: string): any;
}
export interface PanelManager {
    panel: any;
    mapApi: any;
    active: object;
}
