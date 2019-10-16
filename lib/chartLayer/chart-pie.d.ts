/**
 * Creates pie and doughnut charts.
 */
export declare class ChartPie {
    constructor(config: any, attrs: any);
    setOptions(cutOut: number): object;
    setColors(datasets: any, colors: string[]): void;
}
export interface ChartPie {
    options: any;
    type: string;
    data: any;
    title: string;
}
