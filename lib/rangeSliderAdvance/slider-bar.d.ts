/**
 * ...
 */
export declare class SliderBar {
    private _slider;
    private static _instance;
    private constructor();
    static getInstance(LayersConfig?: any): SliderBar;
    lock: boolean;
    step(direction: string): void;
}
