import {
    SLIDER_TEMPLATE,
    SETTINGS_PANEL_TEMPLATE,
    HISTO_PANEL_TEMPLATE,
    TOGGLE_SETTINGS_TEMPLATE,
    TOGGLE_HISTO_TEMPLATE,
    LOCK_BAR_TEMPLATE,
    NEXT_BAR_TEMPLATE,
    PREVIOUS_BAR_TEMPLATE,
    PLAY_BAR_TEMPLATE,
    REFRESH_BAR_TEMPLATE,
    DELAY_BAR_TEMPLATE,
    EXPORT_BAR_TEMPLATE
} from './templates';

import { PanelSettings } from './panel-settings';
import { PanelHisto } from './panel-histo';
import { SliderControls } from './slider-controls';

/**
 * ...
 */
export class PanelManager {

    constructor(mapApi: any, config: any) {
        this.mapApi = mapApi;
        this.mapApi = mapApi;
        this.panel = this.mapApi.panels.create('rangeSlider');
        this.panel.element.css({
            top: 'calc(100% - 220px)',
            width: '70%',
            height: '200px',
            margin: ' 0 auto',
            'max-width': '1800px'
        });


        this.panel.body = SLIDER_TEMPLATE;

        // set slider bar controls
        this.setBarControls(config.rangeSlider.controls);

        // if advance mode, set controls
        if (config.rangeSlider.mode === 'advance') { this.setAdvanceMode(config.rangeSlider) };

        this.panel.open();
    }

    setAdvanceMode(config: any): void {
        // create histogram panel and toggle control
        if (config.histo.enabled) { this.setHistoPanel(config.histo); }
        
        // create settings panel and toggle control
        if (config.settings.enabled) { this.setSettingPanel(config.settings); }
    }

    setSettingPanel(config: any): void {
        // create settings panel
        this.panel.settings = new PanelSettings(this.mapApi, this.panel, SETTINGS_PANEL_TEMPLATE, config);
        const that = this;

        // set control to toggle the panel
        this.mapApi.agControllerRegister('ToggleSettingCtrl', function() {
            // toggle settings panel
            this.toggleSettings = () => { that.panel.settings.isOpen = !that.panel.settings.isOpen; }
        });

        const togglePanel = this.panel.body.find('.toggle-control');
        togglePanel.prepend(this.compileTemplate(TOGGLE_SETTINGS_TEMPLATE));
    }

    setHistoPanel(config: any): void {
        // create histogram panel
        this.panel.histo = new PanelHisto(this.panel, HISTO_PANEL_TEMPLATE, config);
        const that = this;

        // set control to toggle the panel
        this.mapApi.agControllerRegister('ToggleHistoCtrl', function() {
            // toggle histogram panel
            this.toggleHisto = () => { that.panel.histo.isOpen = !that.panel.histo.isOpen; }
        });

        const togglePanel = this.panel.body.find('.toggle-control');
        togglePanel.prepend(this.compileTemplate(TOGGLE_HISTO_TEMPLATE));
    }
    
    setBarControls(controls: any): void {
        // set templates to initialize
        const templates = [
            PREVIOUS_BAR_TEMPLATE,
            PLAY_BAR_TEMPLATE,
            NEXT_BAR_TEMPLATE
        ];
    
        // add controls from configuration
        for (let ctrl of controls) {
            if (ctrl === 'lock') { templates.unshift(LOCK_BAR_TEMPLATE); }
            else if (ctrl === 'refresh') { templates.push(REFRESH_BAR_TEMPLATE); }
            else if (ctrl === 'delay') { templates.push(DELAY_BAR_TEMPLATE); }
            else if (ctrl === 'export') { templates.push(EXPORT_BAR_TEMPLATE); }
        }

        // create slider bar controls
        this.panel.controls = new SliderControls(this.mapApi, this.panel, templates);
    }

    compileTemplate(template): JQuery<HTMLElement> {
        let temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    }
}

export interface PanelManager {
    mapApi: any;
    panel: any;
}
