/**
 * Creates bar and line charts.
 */
export declare class ChartBar {
    constructor(config: any, attrs: any);
    setData(layerData: any, attrs: any, colors: string[]): void;
    setAxis(axe: string, config: any, attrs: any): {
        [k: string]: any;
    };
}
export interface ChartBar {
    options: any;
    type: string;
    data: any;
    title: string;
}
