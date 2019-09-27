export default class RangeSlider {
    init(mapApi: any): void;
    setLayer(layer: any, config: any, ids: string[]): void;
    setSliderBar(): void;
    setBarControls(controls: any): void;
    compileTemplate(template: any): JQuery<HTMLElement>;
}
export interface Range {
    min: number;
    max: number;
}
export default interface RangeSlider {
    mapApi: any;
    _RV: any;
    translations: any;
    panel: any;
    config: any;
    extendConfig: any;
    panelOptions: any;
    layerOptions: any;
    slider: any;
}
