"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var panel_manager_1 = require("./panel-manager");
var Draw = /** @class */ (function () {
    function Draw() {
    }
    /**
     * Plugin init
     * @function init
     * @param {Object} mapApi the viewer api
     */
    Draw.prototype.init = function (mapApi) {
        this.mapApi = mapApi;
        // get draw config
        this.config = this._RV.getConfig('plugins').draw;
        this.config.language = this._RV.getCurrentLang();
        this.config.url = this._RV.getConfig('services').geometryUrl;
        // create mapnav panel
        this.panelManager = new panel_manager_1.PanelManager(mapApi, this.config);
        // create side menu button to toggle toolbar
        this.button = this.mapApi.mapI.addPluginButton(Draw.prototype.translations[this._RV.getCurrentLang()].menu, this.onMenuItemClick());
        this.button.isActive = true;
    };
    /**
     * Event to fire on side menu item click
     * @function onMenuItemClick
     * @return {function} the function to run
     */
    Draw.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            // geet if button is active or not and set all tools as inactive by default
            _this.button.isActive = !_this.button.isActive;
            _this.panelManager.setInactive();
            document.getElementsByClassName('rv-mapnav-draw-content')[0].style.display = _this.button.isActive ? 'block' : 'none';
        };
    };
    return Draw;
}());
exports.default = Draw;
Draw.prototype.translations = {
    'en-CA': {
        menu: 'Draw Toolbar',
        picker: 'Select colour',
        point: 'Draw point',
        line: 'Draw line',
        polygon: 'Draw polygon',
        measure: 'Show/Hide distances',
        extent: 'Erase selected graphics',
        write: 'Save graphics file',
        read: 'Upload graphics file'
    },
    'fr-CA': {
        menu: 'Barre de dessin',
        picker: 'Sélectionner la couleur',
        point: 'Dessiner point',
        line: 'Dessiner ligne',
        polygon: 'Dessiner polygon',
        measure: 'Afficher/Cacher les distances',
        extent: 'Effacer les graphiques sélectionnés',
        write: 'Sauvegarder le fichier de graphiques',
        read: 'Charger le fichier de graphiques'
    }
};
window.draw = Draw;
