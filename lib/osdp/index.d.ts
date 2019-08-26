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
    inputParsePoints(values: string): any;
    inputParsePolygons(values: string): any;
    addPointsGeometry(mapId: string, values: string): void;
    addPolygonsGeometry(mapId: string, values: string): void;
    removeGeometries(mapId: string): void;
    createExtentGeom(values: any): string;
    zoomPt(mapId: string, value: string): void;
    zoomPoly(mapId: string, value: string): void;
    zoomPoints(mapId: string, value: string): void;
    saveState(mapid: string): void;
    loadState(mapid: string): void;
    validate(values: string): boolean;
    reportErrors(errors: any): void;
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
