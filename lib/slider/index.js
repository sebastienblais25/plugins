"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("./templates");
var nouislider = require("nouislider");
require("nouislider/distribute/nouislider.css");
// import { PanelLoader } from './panel-loader';
var Slider = /** @class */ (function () {
    function Slider() {
    }
    Slider.prototype.init = function (api) {
        this.api = api;
        this.api.agControllerRegister('ToggleSettingCtrl', function () {
            // clear all column filters
            this.toggleSettings = function () { console.log('test'); };
        });
        // set panel
        this.setPanel();
        // set slider
        var drawing = document.getElementById('drawing');
        nouislider.create(drawing, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });
        //slider.instances[this.api.id] = this;
    };
    Slider.prototype.setPanel = function () {
        this.panel = this.api.panelRegistryObj.create('time-slider');
        this.panel.element.css({
            bottom: '0em',
            top: '60%',
            width: '600px',
            left: '500px'
        });
        this.panel.element.addClass('mobile-fullscreen');
        this.panel.body = templates_1.SLIDER_TEMPLATE;
        this.panel.open();
    };
    // a store of the instances of slider, 1 per map
    Slider.instances = {};
    return Slider;
}());
exports.default = Slider;
Slider.prototype.translations = {
    'en-CA': {
        settings: 'Layer settings',
        histo: 'Histogram'
    },
    'fr-CA': {
        settings: 'Paramètres de la couche',
        histo: 'Histogramme'
    }
    //     ,slider.tooltip.layers,Layer settings,0,Paramètres de la couche,0
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
window.slider = Slider;
