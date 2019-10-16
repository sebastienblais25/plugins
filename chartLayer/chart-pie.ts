import { ChartLoader } from './chart-loader';

/**
 * Creates pie and doughnut charts.
 */
export class ChartPie {

   constructor(config, attrs) {
        // set chart options
        this.title = config.title;
        this.type = config.type;
        this.options = this.setOptions(config.options.cutOut);

        // set data options
        // TODO: deal with layer id
        const layerData = config.layers.find(i => i.id === '0');
        this.data = ChartLoader.parse(layerData, attrs, config.colors);

        // set labels options
        // if more labels are provided then the first datasets number of values, they will be striketrought
        this.data.labels = ChartLoader.getLabels(config.labelsPie, attrs);

        // add default colors if not set from config or data
        const colors = config.options.colors === '' ? ChartLoader.defaultColors : config.options.colors.split(';');
        this.setColors(this.data.datasets, colors);
    }

    setOptions(cutOut: number): object {
        const config = {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderAlign: 'center',
            borderColor: '#fff',
            borderWidth: 3,
            hoverBackgroundColor: '#fff',
            hoverBorderColor: '#fff',
            cutoutPercentage: cutOut,
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }

        return config
    }

    setColors(datasets: any, colors: string[]) {
        for (let dataset of datasets) {
            if (typeof dataset.backgroundColor === 'undefined' || dataset.backgroundColor.length === 0) {
                dataset.backgroundColor = colors;
            }
        }
    }
}

export interface ChartPie {
    options: any;
    type: string;
    data: any;
    title: string;
}
