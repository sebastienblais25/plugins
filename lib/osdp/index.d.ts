export default class OSDP {
    static instances: {
        [id: string]: OSDP;
    };
    init(api: any): void;
    addLayerByUUID(uuid: string): void;
    setDefinitonQuery(mapId: string, layerId: string, query: string): void;
    resetDefinitionQuery(mapId: string, layerId: string): void;
    OnBoundingBoxChange(): void;
}
export default interface OSDP {
    api: any;
    translations: any;
    _RV: any;
    handler: any;
    panel: any;
    button: any;
}
