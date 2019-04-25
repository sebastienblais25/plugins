"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var take_1 = require("rxjs/internal/operators/take");
var slider_bar_1 = require("./slider-bar");
var layer_config_1 = require("./layer-config");
/**
 * ...
 */
var LayersConfig = /** @class */ (function () {
    function LayersConfig(mapApi, layersConfig) {
        var _this = this;
        this._layers = [];
        this.mapApi = mapApi;
        this.mapApi.layersObj.layerAdded.subscribe(function (layer) { return _this.addLayer(layer); });
        this._config = layersConfig;
    }
    LayersConfig.getInstance = function (mapApi, layersConfig) {
        if (!LayersConfig._instance) {
            LayersConfig._instance = new LayersConfig(mapApi, layersConfig);
        }
        return LayersConfig._instance;
    };
    LayersConfig.prototype.addLayer = function (layer) {
        var _this = this;
        // get configuration and if it exist, get the attributes
        var config = this.getConfiguration(layer.id);
        if (typeof config.id !== 'undefined') {
            var attrs = layer.getAttributes();
            if (attrs.length === 0) {
                // make sure all attributes are added before creating the layer
                this.mapApi.layers.attributesAdded.pipe(take_1.take(1)).subscribe(function (attrs) {
                    if (attrs.attributes.length > 0) {
                        layer.attributes = attrs;
                        _this._layers.push(new layer_config_1.LayerConfig(layer, config));
                        // initialiaze slider bar with active layer
                        slider_bar_1.SliderBar.getInstance(_this._layers[0]);
                    }
                });
            }
        }
    };
    LayersConfig.prototype.getConfiguration = function (id) {
        var layer = {};
        // loop trought array of layers to find if there is a configuration
        for (var _i = 0, _a = this._config; _i < _a.length; _i++) {
            var layerConfig = _a[_i];
            if (layerConfig.id === id) {
                layer.id = layerConfig.id;
                layer.field = layerConfig.field;
                if ('interval' in layerConfig) {
                    layer.interval = layerConfig.interval;
                }
                else {
                    layer.interval = 10;
                }
                if ('range' in layerConfig) {
                    layer.range = layerConfig.range;
                }
                else {
                    layer.range = { min: null, max: null };
                }
                if ('limit' in layerConfig) {
                    layer.limit = layerConfig.limit;
                }
                else {
                    layer.limit = { min: null, max: null };
                }
            }
        }
        return layer;
    };
    Object.defineProperty(LayersConfig.prototype, "rangeValues", {
        get: function () {
            return this._activeLayer.range;
        },
        set: function (range) {
            this._activeLayer.range = range;
        },
        enumerable: true,
        configurable: true
    });
    LayersConfig.prototype.setDefinitionQuery = function () {
        var myLayer = this.mapApi.layers.getLayersById(this._activeLayer.id)[0];
        var myProxy = myLayer._layerProxy; // cheating!
        myProxy.filter.setSql('myUniqueAppCode', this._activeLayer.field + " > " + this._activeLayer.range.min + " AND " + this._activeLayer.field + " <= " + this._activeLayer.range.max);
    };
    Object.defineProperty(LayersConfig.prototype, "layer", {
        get: function () {
            return this._activeLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayersConfig.prototype, "step", {
        get: function () {
            return this._activeLayer.step;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayersConfig.prototype, "activeLayer", {
        // set range(field: string) {
        //     console.log('range');
        // }
        set: function (id) {
        },
        enumerable: true,
        configurable: true
    });
    return LayersConfig;
}());
exports.LayersConfig = LayersConfig;
