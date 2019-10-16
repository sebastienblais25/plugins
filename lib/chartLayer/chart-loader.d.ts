/**
 * Creates and manages charts.
 */
export declare class ChartLoader {
    private chart;
    static defaultColors: string[];
    constructor(mapApi: any, config: any, attrs: any);
    draw(opts: any): void;
    getGlobalOptions(title: string): {
        maintainAspectRatio: boolean;
        responsive: boolean;
        responsiveAnimationDuration: number;
        animation: {
            duration: number;
            animateRotate: boolean;
            animateScale: boolean;
        };
        title: {
            display: boolean;
            text: string;
        };
        showLines: boolean;
        elements: {
            point: {
                radius: number;
                hoverRadius: number;
                hitRadius: number;
            };
            line: {
                spanGaps: boolean;
                tension: number;
                fill: boolean;
                borderWidth: number;
            };
        };
        hover: {
            mode: string;
            intersect: boolean;
            axis: string;
        };
        tooltips: {
            position: string;
            intersect: boolean;
            mode: string;
            axis: string;
            callbacks: {
                title: (tooltipItem: any) => string;
                label: (tooltipItem: any, data: any) => string;
            };
        };
        tooltipEvents: string[];
    };
    destroy(): void;
    static parse(config: any, attrs: any, colors?: any[]): {
        datasets: any[];
    };
    static getLabels(config: any, attrs: any, index?: number): string[];
}
export interface ChartLoader {
    mapApi: any;
    panel: any;
    defaultColors: string[];
}
