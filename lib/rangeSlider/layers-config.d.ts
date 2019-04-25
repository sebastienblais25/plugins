/**
 * ...
 */
export declare class LayersConfig {
    range: Range;
    limit: Range;
    private _config;
    private _layers;
    private _activeLayer;
    private static _instance;
    private constructor();
    static getInstance(mapApi?: any, layersConfig?: []): LayersConfig;
    addLayer(layer: any): void;
    getConfiguration(id: string): Layer;
    rangeValues: Range;
    setDefinitionQuery(): void;
    readonly layer: Layer;
    readonly step: number;
    activeLayer: string;
}
interface Layer {
    id: string;
    field: string;
    fields: [];
    limit: Range;
    range: Range;
    interval: number;
    step: number;
}
export interface Range {
    min: number;
    max: number;
}
export interface LayersConfig {
    mapApi: any;
}
export {};
