"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("./templates");
var panel_settings_1 = require("./panel-settings");
var panel_histo_1 = require("./panel-histo");
var slider_controls_1 = require("./slider-controls");
/**
 * ...
 */
var PanelManager = /** @class */ (function () {
    function PanelManager(mapApi, config) {
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
        this.panel.body = templates_1.SLIDER_TEMPLATE;
        // set slider bar controls
        this.setBarControls(config.rangeSlider.controls);
        // if advance mode, set controls
        if (config.rangeSlider.mode === 'advance') {
            this.setAdvanceMode(config.rangeSlider);
        }
        ;
        this.panel.open();
    }
    PanelManager.prototype.setAdvanceMode = function (config) {
        // create histogram panel and toggle control
        if (config.histo.enabled) {
            this.setHistoPanel(config.histo);
        }
        // create settings panel and toggle control
        if (config.settings.enabled) {
            this.setSettingPanel(config.settings);
        }
    };
    PanelManager.prototype.setSettingPanel = function (config) {
        // create settings panel
        this.panel.settings = new panel_settings_1.PanelSettings(this.mapApi, this.panel, templates_1.SETTINGS_PANEL_TEMPLATE, config);
        var that = this;
        // set control to toggle the panel
        this.mapApi.agControllerRegister('ToggleSettingCtrl', function () {
            // toggle settings panel
            this.toggleSettings = function () { that.panel.settings.isOpen = !that.panel.settings.isOpen; };
        });
        var togglePanel = this.panel.body.find('.toggle-control');
        togglePanel.prepend(this.compileTemplate(templates_1.TOGGLE_SETTINGS_TEMPLATE));
    };
    PanelManager.prototype.setHistoPanel = function (config) {
        // create histogram panel
        this.panel.histo = new panel_histo_1.PanelHisto(this.panel, templates_1.HISTO_PANEL_TEMPLATE, config);
        var that = this;
        // set control to toggle the panel
        this.mapApi.agControllerRegister('ToggleHistoCtrl', function () {
            // toggle histogram panel
            this.toggleHisto = function () { that.panel.histo.isOpen = !that.panel.histo.isOpen; };
        });
        var togglePanel = this.panel.body.find('.toggle-control');
        togglePanel.prepend(this.compileTemplate(templates_1.TOGGLE_HISTO_TEMPLATE));
    };
    PanelManager.prototype.setBarControls = function (controls) {
        // set templates to initialize
        var templates = [
            templates_1.PREVIOUS_BAR_TEMPLATE,
            templates_1.PLAY_BAR_TEMPLATE,
            templates_1.NEXT_BAR_TEMPLATE
        ];
        // add controls from configuration
        for (var _i = 0, controls_1 = controls; _i < controls_1.length; _i++) {
            var ctrl = controls_1[_i];
            if (ctrl === 'lock') {
                templates.unshift(templates_1.LOCK_BAR_TEMPLATE);
            }
            else if (ctrl === 'refresh') {
                templates.push(templates_1.REFRESH_BAR_TEMPLATE);
            }
            else if (ctrl === 'delay') {
                templates.push(templates_1.DELAY_BAR_TEMPLATE);
            }
            else if (ctrl === 'export') {
                templates.push(templates_1.EXPORT_BAR_TEMPLATE);
            }
        }
        // create slider bar controls
        this.panel.controls = new slider_controls_1.SliderControls(this.mapApi, this.panel, templates);
    };
    PanelManager.prototype.compileTemplate = function (template) {
        var temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    };
    return PanelManager;
}());
exports.PanelManager = PanelManager;
