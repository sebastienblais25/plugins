"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chart_pie_1 = require("./chart-pie");
const chart_bar_1 = require("./chart-bar");
const chartjs = require("chart.js");
/**
 * Creates and manages charts.
 */
class ChartLoader {
    constructor(mapApi, config, attrs) {
        this.mapApi = mapApi;
        this.panel = this.mapApi.panels.getById('chart');
        let chartOptions;
        if (config.type === 'pie') {
            chartOptions = new chart_pie_1.ChartPie(config, attrs);
        }
        else if (config.type === 'bar' || config.type === 'line') {
            chartOptions = new chart_bar_1.ChartBar(config, attrs);
        }
        this.draw(chartOptions);
        // subscribe to panel closing to destroy existing graph
        this.panel.closing.subscribe(() => {
            this.destroy();
        });
    }
    draw(opts) {
        // extend chart options with global ones
        const extendOptions = Object.assign({}, opts.options, this.getGlobalOptions(opts.title));
        this.panel.open();
        this.chart = new chartjs('rvChart', { type: opts.type, data: opts.data, options: extendOptions });
    }
    getGlobalOptions(title) {
        return {
            maintainAspectRatio: false,
            responsive: true,
            responsiveAnimationDuration: 1000,
            animation: {
                duration: 1000,
                animateRotate: true,
                animateScale: true
            },
            title: {
                display: true,
                text: title
            },
            showLines: true,
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 10,
                    hitRadius: 5000 // to make the hover/tooltip work as one item from each dataset some tweaking needs to be done. This need to be very high to contain the whole graph
                },
                line: {
                    spanGaps: false,
                    tension: 0.10,
                    fill: false,
                    borderWidth: 1
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true,
                axis: 'x' // this need to be set to select all values to a specified x
            },
            tooltips: {
                position: 'average',
                intersect: true,
                mode: 'nearest',
                axis: 'x',
                callbacks: {
                    title: (tooltipItem) => {
                        return tooltipItem[0].label.split(',').filter((item, index) => index < 2).join(', ');
                    },
                    label: (tooltipItem, data) => {
                        const item = data.datasets[tooltipItem.datasetIndex];
                        const temp = item.data[tooltipItem.index];
                        // for line and chart, use item.label, pie and doughnut use array of labels
                        const label = item.label !== '' ? item.label : data.labels[tooltipItem.index];
                        console.log(data);
                        // for line chart with time, value is an object, get the value
                        const value = typeof temp !== 'object' ? temp : temp.y;
                        return `${item.prefix} ${label}: ${value} ${item.suffix}`;
                    }
                }
            },
            tooltipEvents: ['mousemove', 'touchstart', 'touchmove', 'click']
        };
    }
    destroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
    static parse(config, attrs, colors = []) {
        const parsed = { datasets: [] };
        // loop trough datasets to add from config
        for (let data of config.data) {
            const fieldData = data.measure;
            const prefix = data.prefix;
            const suffix = data.suffix;
            const values = attrs.data.find(i => i.key === fieldData).value;
            // if regex is provided, it is because there is multiple datasets in the value field
            // only do this for single type where we can have more then 1 dataset by field
            // for combine, there is 2 values by field (x and y). We do not support mopre then 1 dataset
            let parseValues = (data.regex !== '' && data.type === 'single') ?
                values.replace(new RegExp(data.regex, 'g'), '*').split('*').filter(Boolean) : [values];
            // loop trough array of data inside a field values
            for (let [i, parse] of parseValues.entries()) {
                // add values and colors
                const item = {
                    data: [],
                    label: data.label.values !== '' ? this.getLabels(data.label, attrs, i)[i] : '',
                    backgroundColor: colors,
                    suffix: suffix,
                    prefix: prefix
                };
                // loop trough values
                if (data.type === 'single') {
                    parse = parse.toString().split(data.split);
                    for (let value of parse) {
                        item.data.push(value);
                    }
                }
                else if (data.type === 'combine') {
                    let parseCombValues = parse.replace(new RegExp(data.regex, 'g'), '*').split('*').filter(Boolean);
                    for (let val of parseCombValues) {
                        let splitVal = val.split(data.split);
                        item.data.push({ x: new Date(splitVal[0]), y: splitVal[1] });
                    }
                }
                parsed.datasets.push(item);
            }
        }
        return parsed;
    }
    static getLabels(config, attrs, index = 0) {
        let labels = config.split !== '' ? config.values.split(config.split) : config.values;
        if (config.type === 'field') {
            const field = (labels instanceof Array) ? labels[0] : labels;
            const temp = attrs.data.find(i => i.key === field).value;
            labels = config.split !== '' ? temp.split(config.split) : temp;
        }
        // labels needs to be an array, if not create an array of values
        // this mean we need to create an eaary of index length to make sure
        // to retreive the rieght value
        if (!Array.isArray(labels)) {
            labels = Array(index + 1).fill(labels);
        }
        return labels;
    }
}
ChartLoader.defaultColors = [
    '#e6194b',
    '#3cb44b',
    '#ffe119',
    '#4363d8',
    '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#bcf60c',
    '#fabebe',
    '#008080',
    '#e6beff',
    '#9a6324',
    '#fffac8',
    '#800000',
    '#aaffc3',
    '#808000',
    '#ffd8b1',
    '#000075',
    '#808080',
    '#ffffff',
    '#000000'
];
exports.ChartLoader = ChartLoader;
