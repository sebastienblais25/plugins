export declare class LayerConfig {
    static layerType: string[];
    static fieldType: {
        ESRI_NUMBER: string[];
        ESRI_DATE: string[];
    };
    private _range;
    private _limit;
    constructor(layer: any, config: any);
    setAttributes(): void;
    setFields(fields: [], fieldName: string): void;
    range: Range;
    limit: Range;
    readonly step: number;
    readonly id: string;
    readonly type: 'esriFeature' | 'esriDynamic' | 'wms' | 'wms-t';
    readonly activeField: Field;
    setActiveField(name: string): void;
}
interface Field {
    name: string;
    type: 'number' | 'date';
}
interface Fields {
    fields: Field[];
    active: Field;
}
export interface Range {
    min: number;
    max: number;
}
export interface LayerConfig {
    rangeL: Range;
    limitL: Range;
    stepL: number;
    fields: Fields;
    idL: string;
    type: 'esriFeature' | 'esriDynamic' | 'wms' | 'wms-t';
    defQuery: string;
}
export {};
