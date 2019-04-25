import 'nouislider/distribute/nouislider.css';
export default class Slider {
    static instances: {
        [id: string]: Slider;
    };
    init(api: any): void;
    setPanel(): void;
}
export default interface slider {
    api: any;
    translations: any;
    _RV: any;
    handler: any;
    panel: any;
    button: any;
    extentbox: any;
}
