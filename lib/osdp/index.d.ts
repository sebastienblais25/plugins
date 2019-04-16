export default class OSDP {
    static instances: {
        [id: string]: OSDP;
    };
    init(api: any): void;
    addLayerByUUID(uuid: string): void;
    addLayerByConfig(mapId: string, config: any): void;
    layersEvents(myFunction: any): void;
    setDefinitonQuery(mapId: string, layerId: string, query: string): void;
    resetDefinitionQuery(mapId: string, layerId: string): void;
    initUpdateExtentBox(): void;
    getExtentBox(): any;
    zoomPt(mapId: string, value: string): void;
    zoomPoly(mapId: string, value: string): void;
    saveState(mapid: string): void;
    loadState(mapid: string): void;
}
export default interface OSDP {
    api: any;
    translations: any;
    _RV: any;
    handler: any;
    panel: any;
    button: any;
    extentbox: any;
}
