export default class SliderBasic {
    init(mapApi: any): void;
    setLayer(layer: any, config: any): void;
    setSliderBar(layer: any): void;
    setBarControls(controls: any): void;
    compileTemplate(template: any): JQuery<HTMLElement>;
}
export interface Range {
    min: number;
    max: number;
}
export default interface SliderBasic {
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
