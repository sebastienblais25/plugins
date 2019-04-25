"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("./templates");
var slider_controls_1 = require("./slider-controls");
var slider_bar_1 = require("./slider-bar");
var take_1 = require("rxjs/internal/operators/take");
var SliderBasic = /** @class */ (function () {
    function SliderBasic() {
    }
    SliderBasic.prototype.init = function (mapApi) {
        var _this = this;
        this.mapApi = mapApi;
        this.panel = this.mapApi.panels.create('rangeSlider');
        this.panel.element.css(SliderBasic.prototype.panelOptions);
        this.panel.body = templates_1.SLIDER_TEMPLATE;
        // set slider bar controls
        this.config = this._RV.getConfig('plugins').rangeSlider;
        // set layer
        this.mapApi.layersObj.layerAdded.subscribe(function (layer) { return _this.setLayer(layer, _this.config.layers); });
    };
    SliderBasic.prototype.setLayer = function (layer, config) {
        var _this = this;
        // If it is the right layer, get the attributes
        if (config.id === layer.id) {
            this.extendConfig = __assign({}, SliderBasic.prototype.layerOptions, config);
            this.extendConfig.language = this._RV.getCurrentLang();
            var attrs = layer.getAttributes();
            if (attrs.length === 0) {
                // make sure all attributes are added before creating the slider
                this.mapApi.layers.attributesAdded.pipe(take_1.take(1)).subscribe(function (attrs) {
                    if (attrs.attributes.length > 0) {
                        // get attributes value for specified field
                        var values = [];
                        for (var _i = 0, _a = attrs.attributes; _i < _a.length; _i++) {
                            var row = _a[_i];
                            values.push(row[_this.extendConfig.field.name]);
                        }
                        // set limit and range if not set from configuration
                        var limits = { min: Math.min.apply(null, values), max: Math.max.apply(null, values) };
                        if (_this.extendConfig.limit.min === null) {
                            _this.extendConfig.limit = limits;
                        }
                        if (_this.extendConfig.range.min === null) {
                            _this.extendConfig.range = limits;
                        }
                        // set step
                        _this.extendConfig.step = (_this.extendConfig.range.max - _this.extendConfig.range.min);
                        // initialiaze slider bar with active layer
                        _this.extendConfig.layerRef = layer;
                        _this.slider = new slider_bar_1.SliderBar(_this.mapApi, _this.extendConfig);
                        // set bar controls then open the panel
                        _this.setBarControls(_this.config.controls);
                        _this.panel.open();
                    }
                });
            }
        }
    };
    SliderBasic.prototype.setBarControls = function (controls) {
        // set templates to initialize
        var templates = [
            templates_1.PLAY_BAR_TEMPLATE
        ];
        // add controls from configuration
        for (var _i = 0, controls_1 = controls; _i < controls_1.length; _i++) {
            var ctrl = controls_1[_i];
            if (ctrl === 'lock') {
                templates.unshift(templates_1.LOCK_BAR_TEMPLATE);
            }
            else if (ctrl === 'loop') {
                templates.push(templates_1.LOOP_BAR_TEMPLATE);
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
        this.panel.controls = new slider_controls_1.SliderControls(this.mapApi, this.panel, templates, this.slider);
    };
    SliderBasic.prototype.compileTemplate = function (template) {
        var temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    };
    return SliderBasic;
}());
exports.default = SliderBasic;
SliderBasic.prototype.panelOptions = {
    top: 'calc(100% - 165px)',
    height: '110px',
    'margin-right': '60px',
    'margin-left': '420px'
};
SliderBasic.prototype.layerOptions = {
    precision: 2,
    delay: 3000,
    lock: false,
    loop: false,
    export: false,
    range: { min: null, max: null },
    limit: { min: null, max: null }
};
SliderBasic.prototype.translations = {
    'en-CA': {
        bar: {
            lock: 'Lock left anchor',
            unlock: 'Unlock left anchor',
            loop: 'Animate in loop',
            unloop: 'Do not animate in loop',
            previous: 'Previous',
            play: 'Play',
            pause: 'Pause',
            foward: 'Next',
            delay: 'Delay',
            refresh: 'Refresh',
            gif: 'GIF',
            tooltip: {
                gif: 'Click Play to start then Pause to export GIF'
            }
        }
    },
    'fr-CA': {
        bar: {
            lock: 'Verrouiller la molette gauche',
            unlock: 'Déverrouiller la molette gauche',
            loop: 'animer en boucle',
            unloop: 'Ne pas animer en boucle',
            previous: 'Précédent',
            play: 'Jouer',
            pause: 'Pause',
            foward: 'Prochain',
            delay: 'Délai',
            refresh: 'Rafraîchir',
            gif: 'GIF',
            tooltip: {
                gif: 'Cliquez sur Jouer pour démarrer, puis faites Pause pour exporter le GIF'
            }
        }
    }
};
window.sliderBasic = SliderBasic;
