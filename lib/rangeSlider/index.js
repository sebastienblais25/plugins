"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("nouislider/distribute/nouislider.css");
var panel_manager_1 = require("./panel-manager");
var layers_config_1 = require("./layers-config");
var RangeSlider = /** @class */ (function () {
    function RangeSlider() {
        this._layers = [];
    }
    RangeSlider.prototype.init = function (mapApi) {
        this.mapApi = mapApi;
        // set layer object who will serve to initialize slider bar
        var config = this._RV.getConfig('plugins');
        this.layers = layers_config_1.LayersConfig.getInstance(mapApi, config.rangeSlider.layers);
        // set panels from configuration
        this.panel = new panel_manager_1.PanelManager(mapApi, config);
    };
    return RangeSlider;
}());
exports.default = RangeSlider;
RangeSlider.prototype.translations = {
    'en-CA': {
        bar: {
            lock: 'Lock left anchor',
            unlock: 'Unlock left anchor',
            previous: 'Previous',
            play: 'Play',
            pause: 'Pause',
            foward: 'Foward',
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
            previous: 'Précédent',
            play: 'Jouer',
            pause: 'Pause',
            foward: 'Suivant',
            delay: 'Délai',
            refresh: 'Rafraîchir',
            gif: 'GIF',
            tooltip: {
                gif: 'Cliquez sur Jouer pour démarrer, puis faites Pause pour exporter le GIF'
            }
        }
    }
    // ,slider.tooltip.svg,SVG graphic,0,Graphique SVG,0
    // ,slider.tooltip.gif,Click Play to start then Pause to export GIF,0,Cliquez sur Jouer pour démarrer, puis faites Pause pour exporter le GIF,0
    // ,slider.bar.lock,Lock left anchor,0,Verrouiller la molette gauche,0
    // ,slider.bar.unlock,Unlock left anchor,0,Déverrouiller la molette gauche,0
    // ,slider.bar.previous,Previous,0,Précédent,0
    // ,slider.bar.play,Play,0,Jouer,0
    // ,slider.bar.pause,Pause,0,Pause,0
    // ,slider.bar.foward,Foward,0,Suivant,0
    // ,slider.bar.delay,Delay,0,Délai,0
    // ,slider.bar.refresh,Refresh,0,Rafraîchir,0
    // ,slider.bar.gif,Export animated GIF,0,Exporter un GIF animé,0
    // ,slider.settings.interval,Interval,0,Intervalle,0
    // ,slider.settings.limitmin,Limit min,0,Limit min,0
    // ,slider.settings.limitmax,Limit max,0,Limit max,0
    // ,slider.settings.rangemin,Range min,0,Étendue min,0
    // ,slider.settings.rangemax,Range max,0,Étendue max,0
    // ,slider.settings.layer,Layer,0,Couche,0
    // ,slider.settings.field,Field,0,Champ,0
    // ,slider.settings.selected,Selected elements,0,Élements sélectionnés,0
};
window.rangeSlider = RangeSlider;
