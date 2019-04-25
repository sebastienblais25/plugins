import {
    INTERVAL_TEMPLATE,
    LIMITS_TEMPLATE,
    LAYERS_LIST_TEMPLATE,
    LAYERS_FIELDS_TEMPLATE,
    LAYERS_RANGE_TEMPLATE
} from './templates';

/*
 * ...
 */
export class PanelSettings {

    constructor(mapApi: any, panelManager: any, template: string, config: any) {
        this.mapApi = mapApi;
        this.open = config.open;
        this.settingsPanel = panelManager.body.find('.slider-content').prepend(template).find('.slider-settings');
        this.isOpen = this.open;

        // set global controls section
        const globalSection = this.settingsPanel.find('.slider-global');

        this.mapApi.agControllerRegister('IntervalCtrl', function() {
            // update slider interval
            this.updateInterval = () => { console.log(`updateInterval ${this.activeLayer.interval}`); }

            // set array of intervals
            this.intervals = Array.from(range(2, 100, 2)); //Array.apply(null, { length: 101 }).map(Number.call, Number).splice(2, 99);

            function* range(start: number, end: number, step: number) {
                while (start < end) {
                  yield start;
                  start += step;
                }
            }
        });

        this.mapApi.agControllerRegister('LimitCtrl', function() {
            this.selectedType = 'number';
        });

        globalSection.append(this.compileTemplate(INTERVAL_TEMPLATE));
        globalSection.append(this.compileTemplate(LIMITS_TEMPLATE));

        // set layers controls section
        const layersSection = this.settingsPanel.find('.slider-layers');

        this.mapApi.agControllerRegister('LayersListCtrl', function() {

        });

        this.mapApi.agControllerRegister('LayersFieldsCtrl', function() {

        });

        this.mapApi.agControllerRegister('RangeCtrl', function() {
            this.selectedType = 'number';
        });

        layersSection.append(this.compileTemplate(LAYERS_LIST_TEMPLATE));
        layersSection.append(this.compileTemplate(LAYERS_FIELDS_TEMPLATE));
        layersSection.append(this.compileTemplate(LAYERS_RANGE_TEMPLATE));

    }

    compileTemplate(template): JQuery<HTMLElement> {
        let temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    }

    set isOpen(isOpen: boolean) {
        this.open = isOpen;
        isOpen ? this.settingsPanel.show() : this.settingsPanel.hide();
    }

    get isOpen(): boolean {
        return this.open;
    }
}

export interface PanelSettings {
    mapApi: any,
    open: boolean;
    settingsPanel: any;
}
