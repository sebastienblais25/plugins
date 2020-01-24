export declare class panel {
    ispanelshowing: boolean;
    createPanel(panel: any, mapApi: any, panelname?: string, paneltitle?: string): any;
}
export interface PanelManager {
    panel: any;
    mapApi: any;
    active: object;
}
