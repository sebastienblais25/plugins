"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nouislider = require("nouislider");
var layers_config_1 = require("./layers-config");
/**
 * ...
 */
var SliderBar = /** @class */ (function () {
    function SliderBar(LayersConfig) {
        this._slider = document.getElementById('nouislider');
        nouislider.create(this._slider, {
            start: [LayersConfig.range.min, LayersConfig.range.max],
            connect: true,
            range: {
                'min': LayersConfig.limit.min,
                //'25%': (LayersConfig.rangeValues.min / 4) * 3,
                '50%': LayersConfig.limit.min - (LayersConfig.limit.max / 2),
                //'75%': (LayersConfig.rangeValues.min / 4) * 3,
                'max': LayersConfig.limit.max
            },
            pips: {
                mode: 'range',
                density: 5
            }
        });
        this._slider.lock = true;
        console.log(LayersConfig.rangeValues);
    }
    SliderBar.getInstance = function (LayersConfig) {
        if (!SliderBar._instance && typeof LayersConfig !== 'undefined') {
            SliderBar._instance = new SliderBar(LayersConfig);
        }
        return SliderBar._instance;
    };
    Object.defineProperty(SliderBar.prototype, "lock", {
        get: function () {
            return this._slider.lock;
        },
        set: function (lock) {
            this._slider.lock = lock;
            console.log(this._slider.lock);
        },
        enumerable: true,
        configurable: true
    });
    SliderBar.prototype.step = function (direction) {
        console.log(direction);
        var layer = layers_config_1.LayersConfig.getInstance();
        console.log(layer.rangeValues.min);
        // get handles values
        var values = this._slider.noUiSlider.get().map(Number);
        var range = { min: values[0], max: 0 };
        range.max = (direction === 'up') ? values[1] + layer.step : values[1] - layer.step;
        this._slider.noUiSlider.set([range.min, range.max]);
        layer.rangeValues = range;
        layer.setDefinitionQuery();
        console.log(this._slider.noUiSlider.get());
    };
    return SliderBar;
}());
exports.SliderBar = SliderBar;
// export interface SliderBar {
//     lock: boolean
// }
